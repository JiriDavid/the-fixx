"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

function LoginContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState({ loading: false, error: "" });

  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const onSubmit = async (data) => {
    setStatus({ loading: true, error: "" });
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });

    if (result?.error) {
      setStatus({ loading: false, error: "Invalid credentials" });
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-lg"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mb-10 text-center">
          <motion.div
            className="mx-auto mb-6 h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <h1 className="text-2xl font-semibold tracking-wide">
            Admin Control Access
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Protected interface for THE FIXX curators.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Email
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              type="email"
              autoComplete="email"
              placeholder="admin@thefixx.studio"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">Email is required.</p>
            )}
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              Password
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">Password is required.</p>
            )}
          </div>

          {status.error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {status.error}
            </p>
          )}

          <motion.button
            type="submit"
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 px-4 py-3 text-sm font-medium tracking-wide text-slate-950 shadow-lg shadow-orange-500/20"
            whileTap={{ scale: 0.98 }}
            disabled={status.loading}
          >
            <span className="relative z-10">
              {status.loading ? "Authorizing…" : "Enter Admin Grid"}
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ translateX: "-100%" }}
              animate={{ translateX: "100%" }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-sm text-white/60">Preparing admin console…</p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
