"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MembershipCta() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle,_rgba(249,115,22,0.22),_transparent_70%)]" />

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-orange-500/25 via-amber-400/15 to-yellow-400/18 p-8 text-center backdrop-blur-xl sm:p-12"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-2xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/75">
              Hello Summer Promotion
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Pay for 2 months. Train for 3.
            </h2>
            <p className="text-base text-white/70 sm:text-lg">
              Commit to your journey today. Invest in two months of coaching
              upfront and we’ll gift you a third month on us—more sessions, more
              accountability, more results.
            </p>
            <p className="text-sm text-white/60 sm:text-base">
              Weight gain or loss, strength building, online programs, or team
              training—we’ll tailor the extra month to the goals you want to
              smash this summer.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:shadow-xl hover:shadow-amber-500/30"
            >
              Claim the Offer
            </Link>
            <Link
              href="mailto:hello@thefixx.studio"
              className="rounded-full border border-amber-400/40 bg-white/10 px-8 py-3 text-sm font-semibold text-amber-200 transition hover:border-amber-300 hover:text-white"
            >
              Talk With A Coach
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
