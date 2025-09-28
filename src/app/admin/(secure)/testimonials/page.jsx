"use client";

import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, Plus, Trash2, UploadCloud } from "lucide-react";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }
  return response.json();
};

const defaultValues = {
  name: "",
  role: "",
  quote: "",
  avatar: "",
  highlight: false,
};

export default function AdminTestimonialsPage() {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/testimonials",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
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
      quote: values.quote,
      avatar: values.avatar || undefined,
      highlight: values.highlight,
    };

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(
          body.error ? JSON.stringify(body.error) : "Failed to add testimonial"
        );
      }

      reset(defaultValues);
      setStatus({ loading: false, message: "Testimonial added" });
      await mutate();
    } catch (submissionError) {
      setStatus({ loading: false, message: submissionError.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this testimonial?")) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
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
    formData.append("folder", "the-fixx/testimonials");

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
          <h2 className="text-xl font-semibold">Capture Testimonial</h2>
          <p className="text-sm text-white/50">
            Amplify the voices that validate THE FIXX vision.
          </p>
        </div>

        <form className="mt-6 grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Name
              </label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                placeholder="Jordan Vega"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Role
              </label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                placeholder="Pro Drift Athlete"
                {...register("role", { required: "Role is required" })}
              />
              {errors.role && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Quote
            </label>
            <textarea
              className="mt-2 h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              placeholder="Share their experience"
              {...register("quote", { required: "Quote is required" })}
            />
            {errors.quote && (
              <p className="mt-1 text-xs text-red-400">
                {errors.quote.message}
              </p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
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

            <label className="flex items-center gap-3 self-start text-xs uppercase tracking-[0.3em] text-white/50 md:self-end">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5"
                {...register("highlight")}
              />
              Highlight
            </label>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              <span>{status.loading ? "Saving" : "Add Testimonial"}</span>
            </motion.button>
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Signals</h2>
          <p className="text-sm text-white/50">
            Stories currently amplifying THE FIXX.
          </p>
        </div>

        {error && (
          <p className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Unable to load testimonials.
          </p>
        )}

        {isLoading ? (
          <div className="flex items-center gap-2 text-white/60">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading testimonials…
          </div>
        ) : (
          <div className="grid gap-4">
            {data?.testimonials?.map((item) => (
              <blockquote
                key={item.id ?? item._id}
                className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-white/50">{item.role}</p>
                    </div>
                  </div>
                  {item.highlight && (
                    <span className="rounded-full bg-amber-500/12 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-200">
                      Highlight
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/60">“{item.quote}”</p>
                <button
                  onClick={() => handleDelete(item.id ?? item._id)}
                  className="flex items-center gap-2 self-start rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-200 transition hover:border-red-500/50"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </blockquote>
            ))}
            {data?.testimonials?.length === 0 && (
              <p className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-sm text-white/50">
                No testimonials yet. Add the first beacon above.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
