import ImmersionsContent from "@/components/pages/ImmersionsContent";
import { getClasses } from "@/lib/data";

export const metadata = {
  title: "Immersions | THE FIXX",
  description:
    "Preview the immersive training studios at THE FIXX and discover the tech powering every session.",
};

export default async function ImmersionsPage() {
  const classes = await getClasses();

  return <ImmersionsContent classes={classes} />;
}
