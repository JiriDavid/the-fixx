"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const ronnieQuotes = [
  {
    name: "Ronnie Coleman",
    role: "8× Mr. Olympia",
    quote:
      "Everybody wants to be a bodybuilder, but don’t nobody want to lift no heavy-ass weights.",
    avatar: "/man-lifting.png",
    highlight: true,
  },
  {
    name: "Ronnie Coleman",
    role: "8× Mr. Olympia",
    quote: "The real workout starts when you want to stop.",
    avatar: "/woman-stretching.png",
  },
  {
    name: "Ronnie Coleman",
    role: "8× Mr. Olympia",
    quote: "Ain’t nothing to it but to do it.",
    avatar: "/men-women-squarting.png",
  },
];

export default function TestimonialMarquee({ testimonials }) {
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  const combined = useMemo(
    () => [...safeTestimonials, ...ronnieQuotes],
    [safeTestimonials]
  );
  const items = useMemo(() => combined.concat(combined), [combined]);

  return (
    <section
      id="tour"
      className="relative isolate overflow-hidden py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay" />
      <div className="absolute inset-x-0 top-0 -z-20 h-[320px] bg-[radial-gradient(circle,_rgba(249,115,22,0.24),_transparent_65%)]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.4em] text-amber-200/80">
              Member Signals & Motivation
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Proof from our community with words to keep you moving.
            </h2>
            <p className="mt-4 text-balance text-white/70 sm:text-pretty">
              Transformation stories sit alongside timeless motivation from
              Ronnie Coleman—fuel for your next session, no matter where you are
              in the journey.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-hidden sm:mt-12">
        {combined.length > 0 && (
          <motion.div
            className="flex gap-5 sm:gap-6"
            animate={{ x: [0, -320 * combined.length] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {items.map((item, index) => (
              <article
                key={`${item.id ?? item._id ?? index}-${index}`}
                className="relative w-[260px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:w-[320px] sm:p-6"
              >
                <Quote className="h-10 w-10 text-amber-300/60" />
                <p className="mt-4 text-sm text-white/70">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-white/50">{item.role}</p>
                  </div>
                </div>
                {item.highlight && (
                  <span className="absolute right-4 top-4 rounded-full bg-amber-400/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-200">
                    Highlight
                  </span>
                )}
              </article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
