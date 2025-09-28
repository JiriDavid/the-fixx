import { getClasses, getTestimonials, getTrainers } from "@/lib/data";

const statCards = [
  {
    title: "Immersive Programs",
    description: "Live and on-demand experiences currently in rotation.",
    key: "classesCount",
  },
  {
    title: "Performance Architects",
    description: "Elite coaches leading the futuristic floor.",
    key: "trainersCount",
  },
  {
    title: "Member Signals",
    description: "Testimonial pulses curated for the public site.",
    key: "testimonialsCount",
  },
];

export default async function AdminDashboardPage() {
  const [classes, trainers, testimonials] = await Promise.all([
    getClasses(),
    getTrainers(),
    getTestimonials(),
  ]);

  const summary = {
    classesCount: classes.length,
    trainersCount: trainers.length,
    testimonialsCount: testimonials.length,
  };

  return (
    <div className="space-y-10">
      <section className="grid gap-5 lg:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/18 via-amber-400/12 to-yellow-400/12 p-6"
          >
            <div className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {summary[card.key]}
            </div>
            <div className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-white/50">
              {card.title}
            </div>
            <p className="mt-3 text-sm text-white/60">{card.description}</p>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.22),_transparent_60%)]" />
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Latest Classes
          </h2>
          <p className="text-sm text-white/50">
            Quick pulse on new immersive experiences.
          </p>
        </div>
        <div className="grid gap-4">
          {classes.slice(0, 4).map((klass) => (
            <article
              key={klass.id ?? klass._id ?? klass.slug}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">{klass.title}</h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
                    {klass.focus}
                  </p>
                </div>
                <span className="self-start rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/65 sm:self-center">
                  {klass.intensity} intensity
                </span>
              </div>
              <p className="mt-3 text-sm text-white/60 line-clamp-2">
                {klass.description}
              </p>
            </article>
          ))}
          {classes.length === 0 && (
            <p className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-white/50">
              No classes yet. Add your first immersive session.
            </p>
          )}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Pilot Trainers</h2>
          <ul className="mt-4 space-y-4">
            {trainers.slice(0, 5).map((trainer) => (
              <li
                key={trainer.id ?? trainer._id}
                className="flex items-center gap-3"
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{trainer.name}</p>
                  <p className="text-xs text-white/50">{trainer.role}</p>
                </div>
              </li>
            ))}
            {trainers.length === 0 && (
              <li className="text-sm text-white/60">
                No trainers yet. Add talent via the Trainers workspace.
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Signal Boost</h2>
          <div className="mt-4 space-y-4">
            {testimonials.slice(0, 3).map((item) => (
              <blockquote
                key={item.id ?? item._id}
                className="text-sm text-white/60"
              >
                “{item.quote}”
                <span className="mt-2 block text-xs text-white/40">
                  — {item.name}, {item.role}
                </span>
              </blockquote>
            ))}
            {testimonials.length === 0 && (
              <p className="text-sm text-white/60">
                No testimonials yet. Capture stories from members and add them
                here.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
