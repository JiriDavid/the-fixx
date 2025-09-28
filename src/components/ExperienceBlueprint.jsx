"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Dumbbell,
  Scale,
  Sparkles,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";

const pillars = [
  {
    title: "Weight Gain & Loss",
    description:
      "Smart periodization and metabolic tracking guide you toward a body composition that feels like home.",
    icon: Scale,
  },
  {
    title: "Diet Planning",
    description:
      "Flexible meal maps and macro coaching align with how you live while delivering sustainable results.",
    icon: UtensilsCrossed,
  },
  {
    title: "Strength Training",
    description:
      "Progressive strength builds to keep you lifting safely, powerfully, and with purpose every week.",
    icon: Dumbbell,
  },
  {
    title: "Fitness Consulting",
    description:
      "Strategy sessions, lifestyle audits, and habit systems ensure every effort turns into momentum.",
    icon: ClipboardCheck,
  },
  {
    title: "Body Shape & Tone",
    description:
      "Sculpting blocks and conditioning finishers sharpen definition while keeping joints protected.",
    icon: Sparkles,
  },
  {
    title: "Team Fitness",
    description:
      "Bring your crew—small group formats, accountability threads, and shared wins keep energy high.",
    icon: UsersRound,
  },
];

export default function ExperienceBlueprint() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.4em] text-white/50">
              Services Blueprint
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Every pathway you need to transform.
            </h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Whether you are chasing mass, definition, endurance, or
              confidence, we combine coaching, nutrition, and accountability to
              move you from intention to proof.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/30 via-amber-400/20 to-yellow-400/25 sm:mb-6 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 text-amber-200 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm text-white/70 sm:mt-3">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
