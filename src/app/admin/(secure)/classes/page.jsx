"use client";

import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, Plus, Trash2, UploadCloud } from "lucide-react";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to load");
  }
  return res.json();
};

const defaultValues = {
  title: "",
  tagline: "",
  focus: "",
  intensity: "moderate",
  description: "",
  durationMinutes: 45,
  schedule: "",
  thumbnail: "",
  technologyStack: "",
  calories: "",
  effortIndex: "",
};

const parseList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default function AdminClassesPage() {
  const { data, error, isLoading, mutate } = useSWR("/api/classes", fetcher, {
    revalidateOnFocus: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  const [status, setStatus] = useState({ loading: false, message: "" });
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (values) => {
    setStatus({ loading: true, message: "" });

    const metrics = {};
    const caloriesValue =
      values.calories === "" ? null : Number(values.calories);
    const effortValue =
      values.effortIndex === "" ? null : Number(values.effortIndex);

    if (caloriesValue !== null && !Number.isNaN(caloriesValue)) {
      metrics.calories = caloriesValue;
    }

    if (effortValue !== null && !Number.isNaN(effortValue)) {
      metrics.effortIndex = effortValue;
    }

    const payload = {
      title: values.title,
      tagline: values.tagline,
      focus: values.focus,
      intensity: values.intensity,
      description: values.description,
      durationMinutes: Number(values.durationMinutes),
      schedule: parseList(values.schedule),
      thumbnail: values.thumbnail || undefined,
      technologyStack: parseList(values.technologyStack),
      ...(Object.keys(metrics).length ? { metrics } : {}),
    };

    try {
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(
          body.error ? JSON.stringify(body.error) : "Failed to create class"
        );
      }

      reset(defaultValues);
      setStatus({ loading: false, message: "Class added successfully" });
      await mutate();
    } catch (submissionError) {
      setStatus({
        loading: false,
        message: submissionError.message ?? "Failed",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Remove this class?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/classes/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete class");
      }
      await mutate();
    } catch (deleteError) {
      alert(deleteError.message);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "the-fixx/classes");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const { asset } = await response.json();
      setValue("thumbnail", asset.url, { shouldValidate: true });
      setStatus({ loading: false, message: "Thumbnail uploaded" });
    } catch (uploadError) {
      alert(uploadError.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Create New Immersive Class
            </h2>
            <p className="text-sm text-white/50">
              Define sensory-driven training labs that appear on the public
              site.
            </p>
          </div>
        </div>

        <form
          className="mt-6 grid gap-6 md:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Title
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-amber-400 focus:outline-none"
              placeholder="NeuroPulse HIIT"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Tagline
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Light-guided interval bursts"
              {...register("tagline")}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Focus
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Metabolic Conditioning"
              {...register("focus", { required: "Focus is required" })}
            />
            {errors.focus && (
              <p className="mt-1 text-xs text-red-400">
                {errors.focus.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Intensity
            </label>
            <select
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              {...register("intensity")}
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Description
            </label>
            <textarea
              className="mt-2 h-28 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Describe the immersive experience"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Duration (minutes)
            </label>
            <input
              type="number"
              min={10}
              max={180}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              {...register("durationMinutes", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Schedule (comma separated)
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Mon 6:00, Wed 19:30"
              {...register("schedule")}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Thumbnail URL
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                placeholder="https://res.cloudinary.com/..."
                {...register("thumbnail")}
              />
              <label className="grid h-12 w-12 place-items-center rounded-2xl border border-dashed border-amber-400/60 bg-amber-400/10 text-amber-200 hover:border-amber-300">
                <UploadCloud size={20} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </label>
            </div>
            {uploading && (
              <p className="mt-1 text-xs text-amber-200">
                Uploading to Cloudinary…
              </p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Technology Stack (comma separated)
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Biometric Mesh, Reactive Lighting"
              {...register("technologyStack")}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Calories Burn
            </label>
            <input
              type="number"
              min={0}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              {...register("calories")}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Effort Index
            </label>
            <input
              type="number"
              min={0}
              max={100}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              {...register("effortIndex")}
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/60">
              {status.message && <span>{status.message}</span>}
            </div>
            <motion.button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/15"
              whileTap={{ scale: 0.97 }}
              disabled={status.loading}
            >
              {status.loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span>{status.loading ? "Publishing" : "Publish Class"}</span>
            </motion.button>
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Live Experiences</h2>
          <p className="text-sm text-white/50">
            Update or retire classes as the floor evolves.
          </p>
        </div>

        {error && (
          <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Failed to load classes. Ensure your API is reachable.
          </p>
        )}

        {isLoading ? (
          <div className="flex items-center gap-2 text-white/60">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading classes…
          </div>
        ) : (
          <div className="grid gap-4">
            {data?.classes?.map((klass) => (
              <div
                key={klass.id ?? klass._id}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{klass.title}</h3>
                  <p className="text-sm text-white/60">
                    {klass.tagline || klass.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-amber-500/15 px-3 py-1 uppercase tracking-[0.2em] text-amber-200">
                      {klass.focus}
                    </span>
                    <span className="rounded-full bg-orange-500/15 px-3 py-1 uppercase tracking-[0.2em] text-amber-100">
                      {klass.intensity} intensity
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(klass.id ?? klass._id)}
                  className="flex items-center gap-2 self-start rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-200 transition hover:border-red-500/50 md:self-auto"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ))}
            {data?.classes?.length === 0 && (
              <p className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-sm text-white/50">
                No classes yet. Publish one above to activate your futurist
                grid.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
