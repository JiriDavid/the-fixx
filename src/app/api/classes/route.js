import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { hasMongo } from "@/lib/env";
import ClassModel from "@/models/Class";
import { getClasses } from "@/lib/data";
import { classInputSchema } from "@/lib/validation";
import { normalizeDocument, slugify } from "@/lib/utils";

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return null;
  }
  return session;
}

export async function GET() {
  const classes = await getClasses();
  return NextResponse.json({ classes });
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
  const parsed = classInputSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const { title } = parsed.data;
  const slug = parsed.data.slug ? slugify(parsed.data.slug) : slugify(title);

  const existing = await ClassModel.findOne({ slug });
  if (existing) {
    return NextResponse.json(
      { error: "A class with this slug already exists." },
      { status: 409 }
    );
  }

  const created = await ClassModel.create({ ...parsed.data, slug });

  return NextResponse.json(
    { class: normalizeDocument(created) },
    { status: 201 }
  );
}
