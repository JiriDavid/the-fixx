import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { hasMongo } from "@/lib/env";
import TrainerModel from "@/models/Trainer";
import { trainerInputSchema } from "@/lib/validation";
import { normalizeDocument } from "@/lib/utils";
import { getTrainers } from "@/lib/data";

const updateSchema = trainerInputSchema.partial();

function buildQuery(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { _id: id };
  }
  return { _id: id };
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
    const fallback = (await getTrainers()).find(
      (trainer) => trainer._id === id || trainer.id === id
    );
    if (!fallback) {
      return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
    }
    return NextResponse.json({ trainer: fallback });
  }

  await connectToDatabase();
  const doc = await TrainerModel.findOne(buildQuery(id)).lean();

  if (!doc) {
    return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
  }

  return NextResponse.json({ trainer: normalizeDocument(doc) });
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

  const doc = await TrainerModel.findOne(buildQuery(id));

  if (!doc) {
    return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
  }

  Object.assign(doc, parsed.data);
  await doc.save();

  return NextResponse.json({ trainer: normalizeDocument(doc) });
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

  const deleted = await TrainerModel.findOneAndDelete(buildQuery(id));

  if (!deleted) {
    return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
