"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, GaugeCircle, Waves } from "lucide-react";

const iconMap = {
  high: GaugeCircle,
  moderate: Cpu,
  low: Waves,
};

const defaultPrograms = [
  {
    title: "1 Train",
    tagline: "Solo coaching for the athlete who battles the mirror.",
    description:
      "Personalized strength plans, tailored cardio, and structured nutrition check-ins for members who thrive on individual focus and measurable milestones.",
    thumbnail: "/man-lifting.png",
    focus: "Individual Coaching",
    durationMinutes: 60,
    intensity: "moderate",
    metrics: { calories: 500, effortIndex: 78 },
    schedule: ["Flexible booking"],
    technologyStack: [
      "Progress tracking",
      "Habit coaching",
      "Weekly check-ins",
    ],
  },
  {
    title: "Bring a Buddy",
    tagline: "Tag team accountability with matched programming.",
    description:
      "Train alongside your partner or best friend with synced workouts, shared diet planning, and dual progress dashboards that keep both of you locked in.",
    thumbnail: "/men-women-squarting.png",
    focus: "Partner Format",
    durationMinutes: 55,
    intensity: "moderate",
    metrics: { calories: 460, effortIndex: 72 },
    schedule: ["Two-on-one sessions"],
    technologyStack: [
      "Shared meal maps",
      "Paired challenges",
      "Coach messaging",
    ],
  },
  {
    title: "We Train",
    tagline: "Small-team energy with big transformations.",
    description:
      "Build strength, reshape physiques, and stay motivated inside high-energy group formats where three or more members get individualized cues and joint nutrition support.",
    thumbnail: "/woman-stretching.png",
    focus: "Team Training",
    durationMinutes: 75,
    intensity: "high",
    metrics: { calories: 620, effortIndex: 84 },
    schedule: ["Team blocks", "Weekend camps"],
    technologyStack: [
      "Group accountability",
      "Skill rotations",
      "Weekly recovery plans",
    ],
  },
  {
    title: "E-Training",
    tagline: "Structured online coaching from anywhere.",
    description:
      "Access progressive routines, habit reminders, and dialed-in diet planning completely online. Perfect for remote athletes who still want expert oversight.",
    thumbnail: "/man-lifting.png",
    focus: "Virtual Coaching",
    durationMinutes: 45,
    intensity: "low",
    metrics: { calories: 380, effortIndex: 65 },
    schedule: ["Weekly live calls", "On-demand guides"],
    technologyStack: [
      "Video breakdowns",
      "Macro tracking",
      "App-based support",
    ],
  },
];

export default function Programs({ classes }) {
  const baseList = Array.isArray(classes) ? classes : [];
  const list = [...defaultPrograms, ...baseList];
  return (
    <section id="programs" className="relative isolate py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.4em] text-amber-200/80">
              Training Paths
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Coaching that sculpted hundreds of transformations.
            </h2>
            <p className="mt-4 max-w-xl text-white/70">
              From personal breakthroughs to squad energy and online support,
              pick the pathway that meets your season of life, your body, and
              your goals.
            </p>
          </div>
          <div className="text-sm text-white/60 text-center sm:text-right">
            Nutrition planning included · Measurable progress every phase
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
          {list.map((klass, index) => {
            const IntensityIcon = iconMap[klass.intensity] ?? GaugeCircle;
            return (
              <motion.article
                key={klass.id ?? klass.slug ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 sm:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-56 lg:h-64">
                    <Image
                      src={klass.thumbnail}
                      alt={klass.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {klass.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/60">
                          {klass.tagline}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                        <IntensityIcon className="h-4 w-4 text-orange-300" />
                        {klass.intensity}
                      </span>
                    </div>

                    <p className="text-sm text-white/70">{klass.description}</p>

                    <div className="flex flex-wrap gap-2 text-xs text-white/60">
                      <span className="rounded-full bg-orange-500/15 px-3 py-1 uppercase tracking-[0.3em] text-amber-200">
                        {klass.focus}
                      </span>
                      <span className="rounded-full bg-amber-500/15 px-3 py-1 uppercase tracking-[0.3em] text-amber-200">
                        {klass.durationMinutes} min
                      </span>
                      {klass.metrics?.calories && (
                        <span className="rounded-full bg-white/10 px-3 py-1 uppercase tracking-[0.3em] text-white/60">
                          {klass.metrics.calories} kcal
                        </span>
                      )}
                      {klass.metrics?.effortIndex && (
                        <span className="rounded-full bg-white/10 px-3 py-1 uppercase tracking-[0.3em] text-white/60">
                          Effort {klass.metrics.effortIndex}
                        </span>
                      )}
                    </div>

                    {klass.technologyStack?.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-xs text-white/50">
                        {klass.technologyStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.3em]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {klass.schedule?.length > 0 && (
                      <div className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Slots · {klass.schedule.join(" · ")}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
