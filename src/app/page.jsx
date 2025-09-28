import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import TrainerSpotlight from "@/components/TrainerSpotlight";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import ExperienceBlueprint from "@/components/ExperienceBlueprint";
import MembershipCta from "@/components/MembershipCta";
import { getClasses, getTestimonials, getTrainers } from "@/lib/data";

export const metadata = {
  title: "THE FIXX | High-Voltage Performance Club",
  description:
    "Experience immersive training, personalized programs, and intelligent wellness at THE FIXX.",
};

export default async function HomePage() {
  const [classes, trainers, testimonials] = await Promise.all([
    getClasses(6),
    getTrainers(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <Programs classes={classes} />
      <ExperienceBlueprint />
      <TrainerSpotlight trainers={trainers} />
      <TestimonialMarquee testimonials={testimonials} />
      <MembershipCta />
    </>
  );
}
