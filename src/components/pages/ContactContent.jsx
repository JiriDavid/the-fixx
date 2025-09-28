"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

const studios = [
  {
    city: "New York",
    address: "101 Hudson Yards, Level 36",
    phone: "+1 (212) 555-0110",
  },
  {
    city: "Los Angeles",
    address: "9100 Wilshire Blvd, Suite 500E",
    phone: "+1 (310) 555-0165",
  },
  {
    city: "Singapore",
    address: "88 Market Street, Sky Tower 22F",
    phone: "+65 6812 4455",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.12 },
  }),
};

const conciergeSignals = [
  { label: "Response Time", value: "<4 min" },
  { label: "Studios", value: "3 global" },
  { label: "Event Slots", value: "12/mo" },
];

export default function ContactContent() {
  return (
    <div className="relative isolate overflow-hidden pb-20 sm:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] blur-3xl">
        <div className="mx-auto h-72 w-[38rem] bg-gradient-to-r from-orange-500/32 via-amber-400/24 to-yellow-400/18 opacity-85" />
      </div>

      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-5 pt-20 sm:px-6 sm:pt-24">
        <motion.div
          className="space-y-6 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-200">
            Connect
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Start the transformation conversation
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-300 text-pretty sm:text-lg">
            Tell us whether you need weight gain or loss support, detailed diet
            planning, strength coaching, or a team session. We’ll match you to
            the right coach and roadmap the next steps.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="w-fit rounded-2xl bg-orange-500/10 p-3 text-amber-300">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold text-white">
                  Concierge Intake
                </h2>
                <p className="mt-2 text-sm text-slate-300 text-balance">
                  Share your goals and schedule—weight change, strength, body
                  shaping, or consulting. We’ll reply with a plan covering
                  coaching format, nutrition, and check-ins.
                </p>
              </div>
            </div>

            <form
              className="grid gap-4"
              action="https://formspree.io/f/moqgbqwa"
              method="POST"
            >
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Aurora Stone"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 focus:bg-slate-950/70"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="aurora@futuremail.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 focus:bg-slate-950/70"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your training ambitions, and we’ll curate the perfect introduction."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 focus:bg-slate-950/70"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/15 transition hover:shadow-xl hover:shadow-amber-500/25"
              >
                Initiate Contact
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </form>
          </motion.div>

          <motion.div
            className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/40 p-6 sm:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            custom={2}
          >
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeIn}
              custom={2}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/28 via-amber-400/16 to-transparent" />
              <div className="relative h-44 w-full sm:h-40">
                <Image
                  src="/woman-stretching.png"
                  alt="Immersive recovery pod"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              </div>
              <div className="relative grid gap-4 px-6 pb-6 pt-4">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
                    Intake Snapshot
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    Your plan starts with a conversation
                  </h3>
                  <p className="text-xs text-white/60">
                    We review your goals, daily routine, and nutrition habits so
                    the first session already feels like momentum.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-white/70 sm:gap-3 sm:text-xs">
                  {conciergeSignals.map((signal) => (
                    <div
                      key={signal.label}
                      className="rounded-2xl border border-white/10 bg-white/8 px-2 py-3"
                    >
                      <div className="text-sm font-semibold text-white">
                        {signal.value}
                      </div>
                      <div className="mt-1 uppercase tracking-[0.3em] text-white/40">
                        {signal.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeIn}
              custom={3}
            >
              <h3 className="text-base font-semibold text-white">
                Direct Channels
              </h3>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-300" />{" "}
                  hello@thefixx.studio
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-amber-300" /> +1 (800) 555-FIXX
                </p>
              </div>
            </motion.div>
            <div className="h-px w-full bg-white/10" />
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeIn}
              custom={4}
            >
              <h3 className="text-base font-semibold text-white">Studios</h3>
              <div className="space-y-4">
                {studios.map((studio, index) => (
                  <motion.div
                    key={studio.city}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeIn}
                    custom={index + 5}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
                      {studio.city}
                    </p>
                    <p className="mt-2 flex items-start gap-2 text-sm text-slate-200">
                      <MapPin className="mt-0.5 h-4 w-4 text-amber-300" />
                      {studio.address}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-200">
                      <Phone className="h-4 w-4 text-amber-300" />
                      {studio.phone}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
