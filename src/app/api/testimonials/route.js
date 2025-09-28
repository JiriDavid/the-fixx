import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { hasMongo } from "@/lib/env";
import TestimonialModel from "@/models/Testimonial";
import { testimonialInputSchema } from "@/lib/validation";
import { normalizeDocument } from "@/lib/utils";
import { getTestimonials } from "@/lib/data";

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return null;
  }
  return session;
}

export async function GET() {
  const testimonials = await getTestimonials();
  return NextResponse.json({ testimonials });
}

export async function POST(request) {
  if (!hasMongo) {
    return NextResponse.json(
      { error: "MongoDB is not configured. Set MONGODB_URI and MONGODB_DB." },
      { status: 503 }
    );
  }

  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = testimonialInputSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const created = await TestimonialModel.create(parsed.data);

  return NextResponse.json(
    { testimonial: normalizeDocument(created) },
    { status: 201 }
  );
}
