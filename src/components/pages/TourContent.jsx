"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPinned, Play, Sparkles } from "lucide-react";

const fallbackImages = [
  "/men-women-squarting.png",
  "/woman-stretching.png",
  "/man-lifting.png",
];

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: i * 0.12 },
  }),
};

function pickImage(source, index = 0) {
  if (typeof source === "string" && source.length > 0) {
    return source;
  }
  return fallbackImages[index % fallbackImages.length];
}

export default function TourContent({
  classes = [],
  trainers = [],
  testimonials = [],
}) {
  const heroStops = [
    {
      title: classes[0]?.title ?? "Goal Mapping Studio",
      description:
        classes[0]?.tagline ??
        "Review your lifestyle, weight targets, and nutrition habits with your coach so every step feels intentional.",
      image: pickImage(classes[0]?.thumbnail, 0),
    },
    {
      title: trainers[0]?.name ?? "Strength & Sculpt",
      description:
        trainers[0]?.bio ??
        "Move through tailored strength blocks, conditioning finishers, and coaching cues that match your goals.",
      image: pickImage(trainers[0]?.avatar, 1),
    },
    {
      title: testimonials[0]?.name ?? "Accountability & Wins",
      description:
        testimonials[0]?.quote ??
        "See progress reviews, nutrition adjustments, and the celebrations that keep our members consistent.",
      image: pickImage(testimonials[0]?.avatar, 2),
    },
  ];

  const waypoints = [
    {
      label: "001",
      title: "Consult & Strategy",
      copy: "We talk goals, habits, and timelines to build a realistic strength and nutrition strategy.",
    },
    {
      label: "002",
      title: "Coaching Experience",
      copy: "Step into the training space or virtual session for tailored programming and live coaching cues.",
    },
    {
      label: "003",
      title: "Accountability Loop",
      copy: "Check-ins, progress tracking, and nutrition tweaks keep you building momentum every week.",
    },
  ];

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
            Guided Tour
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            See how your personalized coaching journey flows
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-300 text-pretty sm:text-lg">
            Preview the path from your first consultation through training
            sessions, nutrition adjustments, and accountability touchpoints so
            you know exactly what to expect.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-5 sm:mt-12 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {heroStops.map((stop, index) => (
            <motion.article
              key={stop.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fade}
              custom={index}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={stop.image}
                  alt={stop.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 320px"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
              </div>
              <div className="space-y-2 px-6 py-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Stage {index + 1}
                </p>
                <h2 className="text-lg font-semibold text-white">
                  {stop.title}
                </h2>
                <p className="text-sm text-white/60 text-balance">
                  {stop.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-5 sm:mt-20 sm:px-6">
        <motion.div
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/40 p-6 sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fade}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
                <Sparkles className="h-4 w-4" />
                Tour Path
              </p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                The flow your concierge will guide you through
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 self-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white md:self-auto"
            >
              Book Your Visit
              <MapPinned className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
            {waypoints.map((point, index) => (
              <motion.div
                key={point.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fade}
                custom={index + 3}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-amber-200/80">
                  {point.label}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm text-white/60">{point.copy}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-5 sm:mt-20 sm:px-6">
        <motion.div
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fade}
        >
          <div className="relative h-56 w-full md:h-72">
            <Image
              src="/men-women-squarting.png"
              alt="Virtual tour preview"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
                <Play className="h-4 w-4" />
                Immersive Preview
              </span>
              <p className="max-w-xl text-base text-white/80 text-pretty sm:text-lg">
                Stream a guided walkthrough with our team and watch how goal
                setting, training sessions, and nutrition touchpoints come
                together for results.
              </p>
              <Link
                href="/contact?interest=virtual-tour"
                className="rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:shadow-xl hover:shadow-amber-500/30"
              >
                Schedule a Live Stream
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
