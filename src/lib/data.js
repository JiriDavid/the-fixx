import { hasMongo } from "./env";
import { safeConnect } from "./mongodb";
import ClassModel from "@/models/Class";
import TrainerModel from "@/models/Trainer";
import TestimonialModel from "@/models/Testimonial";

const localImages = [
  "/men-women-squarting.png",
  "/woman-stretching.png",
  "/man-lifting.png",
];

const fallbackClasses = [
  {
    _id: "c1",
    title: "NeuroPulse HIIT",
    slug: "neuropulse-hiit",
    tagline: "Light-guided interval bursts with biometric coaching",
    description:
      "Explosive 30-second intervals fuelled by adaptive lighting and real-time metabolic feedback. Build strength and endurance with precision pacing.",
    focus: "Metabolic Conditioning",
    intensity: "high",
    durationMinutes: 45,
    schedule: ["Mon 6:00", "Wed 19:30", "Sat 9:00"],
    thumbnail: localImages[0],
    technologyStack: ["Biometric Mesh", "Reactive Lighting", "Spatial Audio"],
    metrics: { calories: 650, effortIndex: 92 },
  },
  {
    _id: "c2",
    title: "Gravity Surge Strength Lab",
    slug: "gravity-surge-strength-lab",
    tagline: "AI-loaded resistance with iso-kinetic control",
    description:
      "Harness smart racks that auto-calibrate load curves and tempo to your nervous system response. Build dense, resilient muscle safely.",
    focus: "Strength & Power",
    intensity: "moderate",
    durationMinutes: 60,
    schedule: ["Tue 7:00", "Thu 18:00"],
    thumbnail: localImages[1],
    technologyStack: [
      "Servo Resistance",
      "Motion Capture",
      "Neuromorphic Coach",
    ],
    metrics: { calories: 480, effortIndex: 78 },
  },
  {
    _id: "c3",
    title: "AeroFlow Breath Lab",
    slug: "aeroflow-breath-lab",
    tagline: "Rhythmic breath training inside immersive climate domes",
    description:
      "Synchronize breath, movement, and focus for sustained recovery. Guided vagal activation and red-light therapy accelerate regeneration.",
    focus: "Recovery & Mobility",
    intensity: "low",
    durationMinutes: 50,
    schedule: ["Wed 12:30", "Sun 10:00"],
    thumbnail: localImages[2],
    technologyStack: ["Climate Pod", "Photobiomodulation", "Biofeedback"],
    metrics: { calories: 280, effortIndex: 54 },
  },
  {
    _id: "c4",
    title: "Quantum Ride Arena",
    slug: "quantum-ride-arena",
    tagline: "Mixed-reality cycling with live tactic gamification",
    description:
      "Race inside cinematic worlds rendered from your own biometric telemetry. Squad up for synchronized climbs and real-time rival modes.",
    focus: "Endurance & Cardio",
    intensity: "high",
    durationMinutes: 40,
    schedule: ["Fri 18:30", "Sat 8:30"],
    thumbnail: localImages[0],
    technologyStack: ["XR Dome", "Tactile Wind", "Dynamic Peloton AI"],
    metrics: { calories: 720, effortIndex: 95 },
  },
];

const fallbackTrainers = [
  {
    _id: "t1",
    name: "Nova Reyes",
    role: "Chief Performance Architect",
    bio: "Former aerospace engineer turned elite coach. Designs strength programs that adapt to neural feedback loops in real time.",
    avatar: localImages[1],
    accolades: ["Ex-NASA biomech", "MSc Applied Neuroscience"],
    specialties: ["Biomechanics", "Neuro Strength"],
  },
  {
    _id: "t2",
    name: "Atlas Chen",
    role: "Metabolic Systems Lead",
    bio: "Data-scientist coach blending metabolic analytics, nutrition, and adaptive conditioning for explosive performance breakthroughs.",
    avatar: localImages[2],
    accolades: ["Former UCI pro", "Certified Metabolic Analyst"],
    specialties: ["Endurance", "Conditioning"],
  },
  {
    _id: "t3",
    name: "Lina Sol",
    role: "Recovery & Breathwork Director",
    bio: "Guides high performers through somatic reset, breath recalibration, and sleep optimization protocols.",
    avatar: localImages[0],
    accolades: ["Clinical Breath Specialist", "RYT500"],
    specialties: ["Breathwork", "Recovery"],
  },
];

const fallbackTestimonials = [
  {
    _id: "w1",
    name: "Jordan Vega",
    role: "Pro Drift Athlete",
    quote:
      "THE FIXX's biometric coaching shaved 0.6 seconds off my reaction time in four weeks. The data feedback is just insane.",
    avatar: localImages[2],
  },
  {
    _id: "w2",
    name: "Dr. Maya Chen",
    role: "Longevity Physician",
    quote:
      "The precision recovery pods and breath labs pushed my HRV to elite levels. This is the future of preventative performance medicine.",
    avatar: localImages[0],
  },
  {
    _id: "w3",
    name: "Zane Idris",
    role: "Esports Captain",
    quote:
      "Cognitive sprint training inside the XR arena gave our team the focus advantage we needed before finals.",
    avatar: localImages[1],
  },
];

function normalize(doc) {
  if (!doc) return doc;
  const json = JSON.parse(JSON.stringify(doc));
  json.id = json._id?.toString?.() ?? json._id ?? json.slug;
  delete json._id;
  delete json.__v;
  return json;
}

export async function getClasses(limit) {
  if (!hasMongo) {
    return typeof limit === "number"
      ? fallbackClasses.slice(0, limit)
      : fallbackClasses;
  }

  try {
    await safeConnect();
    const query = ClassModel.find({ active: true }).sort({ createdAt: -1 });
    if (limit) {
      query.limit(limit);
    }
    const docs = await query.lean();
    return docs.map(normalize);
  } catch (error) {
    console.warn("[data] Failed to load classes from MongoDB", error.message);
    return typeof limit === "number"
      ? fallbackClasses.slice(0, limit)
      : fallbackClasses;
  }
}

export async function getClassBySlug(slug) {
  if (!hasMongo) {
    return fallbackClasses.find((item) => item.slug === slug) ?? null;
  }

  try {
    await safeConnect();
    const doc = await ClassModel.findOne({ slug }).lean();
    return doc ? normalize(doc) : null;
  } catch (error) {
    console.warn("[data] Failed to load class", error.message);
    return fallbackClasses.find((item) => item.slug === slug) ?? null;
  }
}

export async function getTrainers() {
  if (!hasMongo) {
    return fallbackTrainers;
  }

  try {
    await safeConnect();
    const docs = await TrainerModel.find({ active: true })
      .sort({ createdAt: -1 })
      .lean();
    return docs.map(normalize);
  } catch (error) {
    console.warn("[data] Failed to load trainers", error.message);
    return fallbackTrainers;
  }
}

export async function getTestimonials() {
  if (!hasMongo) {
    return fallbackTestimonials;
  }

  try {
    await safeConnect();
    const docs = await TestimonialModel.find().sort({ createdAt: -1 }).lean();
    return docs.map(normalize);
  } catch (error) {
    console.warn("[data] Failed to load testimonials", error.message);
    return fallbackTestimonials;
  }
}

export async function getContentSummary() {
  const [classes, trainers, testimonials] = await Promise.all([
    getClasses(),
    getTrainers(),
    getTestimonials(),
  ]);

  return {
    classesCount: classes.length,
    trainersCount: trainers.length,
    testimonialsCount: testimonials.length,
  };
}

export const seedData = {
  classes: fallbackClasses,
  trainers: fallbackTrainers,
  testimonials: fallbackTestimonials,
};
