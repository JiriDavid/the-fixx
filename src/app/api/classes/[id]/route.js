import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { hasMongo } from "@/lib/env";
import ClassModel from "@/models/Class";
import { classInputSchema } from "@/lib/validation";
import { normalizeDocument, slugify } from "@/lib/utils";
import { getClassBySlug } from "@/lib/data";

const updateSchema = classInputSchema.partial();

function buildQuery(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { _id: id };
  }
  return { slug: id };
}

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return null;
  }
  return session;
}

export async function GET(request, { params }) {
  const { id } = params;

  if (!hasMongo) {
    const fallback = await getClassBySlug(id);
    if (!fallback) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }
    return NextResponse.json({ class: fallback });
  }

  await connectToDatabase();
  const doc = await ClassModel.findOne(buildQuery(id)).lean();

  if (!doc) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  return NextResponse.json({ class: normalizeDocument(doc) });
}

export async function PUT(request, { params }) {
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

  const { id } = params;
  const payload = await request.json();
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const query = buildQuery(id);
  const existing = await ClassModel.findOne(query);

  if (!existing) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  const update = { ...parsed.data };

  if (update.title && !update.slug) {
    update.slug = slugify(update.title);
  }

  if (update.slug) {
    update.slug = slugify(update.slug);
    const conflict = await ClassModel.findOne({
      slug: update.slug,
      _id: { $ne: existing._id },
    });
    if (conflict) {
      return NextResponse.json(
        { error: "Slug already in use." },
        { status: 409 }
      );
    }
  }

  Object.assign(existing, update);
  await existing.save();

  return NextResponse.json({ class: normalizeDocument(existing) });
}

export async function DELETE(request, { params }) {
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

  const { id } = params;

  await connectToDatabase();

  const deleted = await ClassModel.findOneAndDelete(buildQuery(id));

  if (!deleted) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
