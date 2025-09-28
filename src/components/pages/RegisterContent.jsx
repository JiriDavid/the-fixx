"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const memberships = [
  {
    title: "1 Train",
    price: "$189/mo",
    description:
      "Solo coaching for members who thrive on challenging the person in the mirror. Training, conditioning, and diet planning tuned to your pace.",
    features: [
      "Weekly 1:1 sessions",
      "Custom meal planning",
      "Progress benchmarks every 4 weeks",
    ],
  },
  {
    title: "Bring a Buddy",
    price: "$329/mo",
    description:
      "Partner up with a friend or loved one. Shared workouts, individual nutrition guidance, and accountability you can celebrate together.",
    features: [
      "Two-person coaching sessions",
      "Joint check-ins + chat access",
      "Paired habit challenges",
    ],
  },
  {
    title: "We Train",
    price: "$459/mo",
    description:
      "Teams of three or more get high-energy coaching, synchronized programming, and the spark of collective progress.",
    features: [
      "Small team sessions",
      "Group meal strategy",
      "Monthly performance reports",
    ],
  },
  {
    title: "E-Training",
    price: "$149/mo",
    description:
      "Remote coaching with structured routines, video feedback, and nutrition planning. Perfect for staying consistent anywhere.",
    features: [
      "Weekly virtual check-ins",
      "App-based workout delivery",
      "Macro tracking + grocery guides",
    ],
  },
];

const fade = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.1 },
  }),
};

const onboardingPhases = [
  {
    step: "01",
    title: "Goal & Lifestyle Audit",
    copy: "We learn how you live, eat, move, and recover so the plan fits real life—not an ideal week.",
  },
  {
    step: "02",
    title: "Personalized Coaching Plan",
    copy: "Training blocks, nutrition strategy, and accountability cadence are mapped with clear milestones.",
  },
  {
    step: "03",
    title: "Momentum & Check-ins",
    copy: "Your coach tracks progress, adjusts programming, and keeps you focused on who you’re becoming.",
  },
];

export default function RegisterContent() {
  return (
    <div className="relative isolate overflow-hidden pb-20 sm:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] blur-3xl">
        <div className="mx-auto h-72 w-[40rem] bg-gradient-to-r from-orange-500/32 via-amber-400/22 to-yellow-400/18 opacity-80" />
      </div>

      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-5 pt-20 sm:px-6 sm:pt-24">
        <motion.div
          className="space-y-6 text-center"
          initial="hidden"
          animate="visible"
          variants={fade}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-200">
            Memberships
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Select the training lane that matches your ambition
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-300 text-pretty sm:text-lg">
            Every option includes diet planning, progressive strength work, and
            relentless accountability. Train solo, with a buddy, as a team, or
            completely online—we’ll guide you through each milestone.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {memberships.map((tier, index) => (
            <motion.div
              key={tier.title}
              className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fade}
              custom={index + 1}
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-200/90">
                  {tier.title}
                </p>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  {tier.price}
                </h3>
                <p className="text-sm text-white/70">{tier.description}</p>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-amber-300">
                      •
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={{ pathname: "/contact", query: { interest: tier.title } }}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-5 py-2.5 text-sm font-semibold text-amber-200 transition hover:border-amber-300 hover:text-white"
              >
                Begin Consultation
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-5 sm:mt-20 sm:px-6">
        <motion.div
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-slate-950/60 to-slate-900/35 p-6 sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fade}
          custom={4}
        >
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            What happens after you register?
          </h2>
          <div className="mt-6 grid gap-5 sm:gap-6 sm:grid-cols-3">
            {onboardingPhases.map((phase, index) => (
              <motion.div
                key={phase.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fade}
                custom={index + 5}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
                  {phase.step}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300">{phase.copy}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
