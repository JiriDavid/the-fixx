"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "Clients Transformed", value: "425" },
  { label: "Custom Meal Maps", value: "310" },
  { label: "Team Sessions Led", value: "180" },
];

const videos = [
  "/vid-1.mp4",
  "/vid-2.mp4",
  "/vid-3.mp4",
  "/vid-4.mp4",
  "/vid-5.mp4",
  "/vid-6.mp4",
];

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <section className="relative isolate overflow-hidden pt-4 pb-20 sm:pb-24">
      <div className="absolute inset-0 -z-20">
        <video
          key={currentVideo}
          src={videos[currentVideo]}
          autoPlay
          muted
          loop={false}
          onEnded={handleVideoEnd}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay" />
      <div className="absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="h-[280px] w-[280px] rounded-full bg-gradient-to-br from-orange-500/35 via-amber-400/30 to-yellow-400/25 blur-[140px] sm:h-[360px] sm:w-[360px] sm:blur-[150px] md:h-[420px] md:w-[420px]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/60 backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            Lifestyle-Centered Coaching
          </motion.span>
          <motion.h1
            className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          >
            The result of our work isn’t what we get—it’s who you become.
          </motion.h1>
          <motion.p
            className="mt-6 text-base text-white/70 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
          >
            Weight gain or loss, dialed-in diet planning, progressive strength
            training, and complete body re-composition—we design your program
            around the lifestyle you live and the goals you’ve promised
            yourself.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
          >
            <Link
              href="/register"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:shadow-xl hover:shadow-amber-500/30"
            >
              Choose Your Path
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/tour"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:text-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
                <Play className="h-4 w-4" />
              </span>
              Enter The Tour
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              className="glass rounded-3xl p-6 text-center sm:text-left"
            >
              <div className="text-3xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
