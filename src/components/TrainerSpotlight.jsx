"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function TrainerSpotlight({ trainers }) {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay" />
      <div className="absolute inset-x-0 top-1/2 -z-20 h-[480px] -translate-y-1/2 bg-[radial-gradient(circle,_rgba(249,115,22,0.25),_transparent_65%)]" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.4em] text-amber-200/80">
              Coaching Team
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              The people behind every transformation.
            </h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Our trainers blend certifications, lived experience, and real
              empathy—guiding weight changes, strength breakthroughs, and body
              recomposition with accountability you can feel.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/65">
            <Sparkles className="h-4 w-4 text-amber-300" />
            Progress-Obsessed Mentors
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(!trainers || trainers.length === 0) && (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-white/60">
              Add your performance architects in the admin console to unlock
              this spotlight.
            </div>
          )}
          {trainers?.map((trainer, index) => (
            <motion.article
              key={trainer.id ?? trainer._id ?? index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={trainer.avatar}
                    alt={trainer.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold">{trainer.name}</h3>
                  <p className="text-sm text-white/60">{trainer.role}</p>
                  {trainer.accolades?.length > 0 && (
                    <p className="mt-2 text-xs text-white/40">
                      {trainer.accolades.join(" · ")}
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-5 text-sm text-white/70 text-balance">
                {trainer.bio}
              </p>

              {trainer.specialties?.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-white/50 sm:justify-start">
                  {trainer.specialties.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.3em]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
