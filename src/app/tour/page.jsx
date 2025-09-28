import TourContent from "@/components/pages/TourContent";
import { getClasses, getTestimonials, getTrainers } from "@/lib/data";

export const metadata = {
  title: "Tour | THE FIXX",
  description:
    "Take a guided look inside THE FIXX's luminous arenas, recovery labs, and neural coaching suites before you arrive.",
};

export default async function TourPage() {
  const [classes, trainers, testimonials] = await Promise.all([
    getClasses(),
    getTrainers(),
    getTestimonials(),
  ]);

  return (
    <TourContent
      classes={classes}
      trainers={trainers}
      testimonials={testimonials}
    />
  );
}
