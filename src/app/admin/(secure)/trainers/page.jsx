"use client";

import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, Plus, Trash2, UploadCloud } from "lucide-react";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch trainers");
  }
  return response.json();
};

const defaultValues = {
  name: "",
  role: "",
  bio: "",
  avatar: "",
  accolades: "",
  specialties: "",
};

const toList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default function AdminTrainersPage() {
  const { data, isLoading, error, mutate } = useSWR("/api/trainers", fetcher, {
    revalidateOnFocus: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ loading: false, message: "" });

  const onSubmit = async (values) => {
    setStatus({ loading: true, message: "" });

    const payload = {
      name: values.name,
      role: values.role,
      bio: values.bio,
      avatar: values.avatar || undefined,
      accolades: toList(values.accolades),
      specialties: toList(values.specialties),
    };

    try {
      const response = await fetch("/api/trainers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(
          body.error ? JSON.stringify(body.error) : "Failed to add trainer"
        );
      }

      reset(defaultValues);
      setStatus({ loading: false, message: "Trainer added" });
      await mutate();
    } catch (submissionError) {
      setStatus({ loading: false, message: submissionError.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this trainer?")) return;

    try {
      const response = await fetch(`/api/trainers/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete trainer");
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
    formData.append("folder", "the-fixx/trainers");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const { asset } = await response.json();
      setValue("avatar", asset.url, { shouldValidate: true });
      setStatus({ loading: false, message: "Avatar uploaded" });
    } catch (uploadError) {
      alert(uploadError.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8">
        <div>
          <h2 className="text-xl font-semibold">Add Trainer</h2>
          <p className="text-sm text-white/50">
            Spotlight the minds orchestrating THE FIXX experiences.
          </p>
        </div>

        <form
          className="mt-6 grid gap-6 md:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Name
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Nova Reyes"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Role
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Metabolic Systems Lead"
              {...register("role", { required: "Role is required" })}
            />
            {errors.role && (
              <p className="mt-1 text-xs text-red-400">{errors.role.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Bio
            </label>
            <textarea
              className="mt-2 h-28 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Tell the story behind the coach"
              {...register("bio", { required: "Bio is required" })}
            />
            {errors.bio && (
              <p className="mt-1 text-xs text-red-400">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Avatar URL
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                placeholder="https://res.cloudinary.com/..."
                {...register("avatar")}
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
              <p className="mt-1 text-xs text-amber-200">Uploading…</p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Accolades
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Ex-NASA biomech, MSc Applied Neuroscience"
              {...register("accolades")}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Specialties
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Biomechanics, Neuro Strength"
              {...register("specialties")}
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/60">{status.message}</div>
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
              <span>{status.loading ? "Saving" : "Add Trainer"}</span>
            </motion.button>
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Current Team</h2>
          <p className="text-sm text-white/50">
            Manage the humans guiding the experience.
          </p>
        </div>

        {error && (
          <p className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Unable to load trainers. Check connection.
          </p>
        )}

        {isLoading ? (
          <div className="flex items-center gap-2 text-white/60">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading trainers…
          </div>
        ) : (
          <div className="grid gap-4">
            {data?.trainers?.map((trainer) => (
              <div
                key={trainer.id ?? trainer._id}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full border border-white/10">
                    <img
                      src={trainer.avatar}
                      alt={trainer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{trainer.name}</h3>
                    <p className="text-sm text-white/60">{trainer.role}</p>
                    {trainer.specialties?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/50">
                        {trainer.specialties.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-amber-500/10 px-3 py-1 uppercase tracking-[0.2em] text-amber-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(trainer.id ?? trainer._id)}
                  className="flex items-center gap-2 self-start rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-200 transition hover:border-red-500/50 md:self-auto"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ))}
            {data?.trainers?.length === 0 && (
              <p className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-sm text-white/50">
                No trainers yet. Add your first profile above.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
