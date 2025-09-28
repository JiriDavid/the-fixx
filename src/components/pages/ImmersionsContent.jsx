"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, GaugeCircle, Waves } from "lucide-react";

const intensityIcons = {
  high: GaugeCircle,
  moderate: Cpu,
  low: Waves,
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.12 },
  }),
};

const defaultExperiences = [
  {
    title: "1 Train",
    tagline: "One-on-one coaching for body recomposition goals.",
    description:
      "Dialed-in strength sessions, cardio conditioning, and meal coaching that adapts to your progress each week.",
    thumbnail: "/man-lifting.png",
    focus: "Individual Coaching",
    durationMinutes: 60,
    intensity: "moderate",
    metrics: { calories: 500 },
    schedule: ["Flexible booking", "Weekly check-ins"],
    technologyStack: ["Strength cycles", "Macro planning", "Progress tracking"],
  },
  {
    title: "Bring a Buddy",
    tagline: "Partner energy with synchronized programming.",
    description:
      "Train with your friend or partner. You’ll share workouts, swap accountability, and still receive personalized nutrition guidance.",
    thumbnail: "/men-women-squarting.png",
    focus: "Partner Format",
    durationMinutes: 55,
    intensity: "moderate",
    metrics: { calories: 460 },
    schedule: ["Shared sessions", "Bi-weekly consults"],
    technologyStack: [
      "Dual progress logs",
      "Shared meal plans",
      "Coach messaging",
    ],
  },
  {
    title: "We Train",
    tagline: "Small group sessions for teams of three or more.",
    description:
      "High-energy group work with personal cues, strength rotations, and conditioning finishers designed to build together.",
    thumbnail: "/woman-stretching.png",
    focus: "Team Fitness",
    durationMinutes: 75,
    intensity: "high",
    metrics: { calories: 620 },
    schedule: ["Team blocks", "Weekend intensives"],
    technologyStack: [
      "Group accountability",
      "Recovery homework",
      "Leaderboards",
    ],
  },
  {
    title: "E-Training",
    tagline: "Remote coaching with structured routines and diet support.",
    description:
      "Receive weekly video breakdowns, app-based support, and nutrition planning so you can train anywhere with confidence.",
    thumbnail: "/window.svg",
    focus: "Virtual Coaching",
    durationMinutes: 45,
    intensity: "low",
    metrics: { calories: 380 },
    schedule: ["Weekly live calls", "Daily accountability"],
    technologyStack: [
      "Mobile coaching app",
      "Video feedback",
      "Habit tracking",
    ],
  },
];

export default function ImmersionsContent({ classes = [] }) {
  const baseClasses = Array.isArray(classes) ? classes : [];
  const experiences = baseClasses.length > 0 ? baseClasses : defaultExperiences;

  return (
    <div className="relative isolate overflow-hidden pb-20 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[420px] bg-[radial-gradient(circle,_rgba(249,115,22,0.24),_transparent_70%)]" />

      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-5 pt-20 sm:px-6 sm:pt-24">
        <motion.div
          className="space-y-6 text-center"
          initial="hidden"
          animate="visible"
          variants={fade}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-200">
            Coaching Formats
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Choose the support style that fits your life
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-300 text-pretty sm:text-lg">
            Whether you thrive alone, with a partner, in a team, or online, our
            coaching, diet planning, and accountability adapt to your schedule
            and the goals you’ve set.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-5 sm:mt-12 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {experiences.map((experience, index) => {
            const IntensityIcon =
              intensityIcons[experience.intensity] ?? GaugeCircle;
            return (
              <motion.article
                key={experience.id ?? experience.slug ?? index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fade}
                custom={index}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:border-white/20"
              >
                <div className="flex flex-col gap-6 p-6 sm:p-7">
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-56 lg:h-64">
                    <Image
                      src={experience.thumbnail}
                      alt={experience.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 240px"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/10" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-white">
                          {experience.title}
                        </h2>
                        <p className="mt-1 text-sm text-white/60">
                          {experience.tagline}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                        <IntensityIcon className="h-4 w-4 text-amber-300" />
                        {experience.intensity}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 text-balance">
                      {experience.description}
                    </p>

                    <div className="grid gap-3 text-xs text-white/50 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                        <p className="uppercase tracking-[0.3em]">Focus</p>
                        <p className="mt-1 text-sm text-white/80">
                          {experience.focus}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                        <p className="uppercase tracking-[0.3em]">Duration</p>
                        <p className="mt-1 text-sm text-white/80">
                          {experience.durationMinutes} mins
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                        <p className="uppercase tracking-[0.3em]">Calories</p>
                        <p className="mt-1 text-sm text-white/80">
                          {experience.metrics?.calories ?? "—"} kcal
                        </p>
                      </div>
                    </div>

                    {experience.technologyStack?.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-xs text-white/60">
                        {experience.technologyStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.3em]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {experience.schedule?.length > 0 && (
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Weekly cadence · {experience.schedule.join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-5 sm:mt-20 sm:px-6">
        <motion.div
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-slate-950/60 to-slate-900/35 p-8 text-center sm:p-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fade}
        >
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
              <ArrowRight className="h-4 w-4" />
              Next step
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Ready to lock in your coaching lane?
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-white/60 text-balance">
              Book a consult and we’ll map weight goals, diet planning, strength
              work, and accountability into a plan that fits your calendar.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:shadow-xl hover:shadow-amber-500/30"
            >
              Join the Waitlist
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/15 bg-white/10 px-8 py-3 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
            >
              Coordinate a Concierge Call
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
