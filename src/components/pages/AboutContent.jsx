"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    title: "Goal-Driven Coaching",
    description:
      "Every plan starts with who you want to become. We reverse engineer your weight, strength, or definition target and map the steps to get there.",
  },
  {
    title: "Nutrition That Fits Life",
    description:
      "Flexible diet planning brings structure without stealing joy—groceries, social plans, and travel all get baked into the strategy.",
  },
  {
    title: "Community Accountability",
    description:
      "Train solo, with a buddy, or as a team—either way, you’ll have a coach and community tracking the wins with you.",
  },
];

const timeline = [
  {
    year: "2018",
    headline: "Built on Client Results",
    copy: "We launched as a small coaching studio focused on weight loss transformations and quickly earned a reputation for sustainable outcomes.",
  },
  {
    year: "2020",
    headline: "Nutrition Meets Strength",
    copy: "Dietitians joined the team, our strength lab opened, and members started seeing complete recomposition—not just scale changes.",
  },
  {
    year: "2023",
    headline: "Teams & Online Coaching",
    copy: "Buddy formats, team sessions, and fully online coaching let us serve members wherever they are in the world.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.1 },
  }),
};

export default function AboutContent() {
  return (
    <div className="relative isolate overflow-hidden pb-20 sm:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[-1] blur-3xl">
        <div className="mx-auto h-64 w-[36rem] bg-gradient-to-r from-orange-500/35 via-amber-400/25 to-yellow-400/18 opacity-80" />
      </div>

      <section className="mx-auto flex max-w-5xl flex-col gap-12 px-5 pt-20 sm:px-6 sm:pt-24">
        <motion.div
          className="space-y-6 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-200">
            About THE FIXX
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            The result of our work is not what we get—it’s what you become.
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/75 sm:text-lg">
            From weight gain or loss to muscle definition and lifestyle
            upgrades, we blend coaching, nutrition, and mentorship so your
            habits match the vision you have for yourself.
          </p>
        </motion.div>

        <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:gap-8 sm:p-8 sm:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={index + 1}
            >
              <h3 className="text-lg font-semibold text-white">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70 text-balance">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-5 sm:mt-20 sm:px-6">
        <motion.div
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-slate-950/60 to-slate-900/35 p-8 shadow-[0_0_60px_-20px_rgba(249,115,22,0.32)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Why clients trust us with their goals
          </h2>
          <p className="mt-4 max-w-3xl text-base text-white/70 text-pretty">
            We don’t chase trends—we chase proof. A mix of certified coaches,
            nutrition strategists, and fitness consultants stay connected to
            each member so you feel guided every rep and every meal.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-5 sm:mt-20 sm:px-6">
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-3">
          {timeline.map((milestone, index) => (
            <motion.article
              key={milestone.year}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={index + 1}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
                {milestone.year}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {milestone.headline}
              </h3>
              <p className="mt-3 text-sm text-slate-300">{milestone.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
