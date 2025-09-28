import mongoose, { Schema } from "mongoose";

const ClassSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String },
    description: { type: String, required: true },
    focus: { type: String, required: true },
    intensity: {
      type: String,
      enum: ["low", "moderate", "high"],
      default: "moderate",
    },
    durationMinutes: { type: Number, default: 45 },
    schedule: [{ type: String }],
    thumbnail: { type: String },
    gallery: [{ type: String }],
    technologyStack: [{ type: String }],
    metrics: {
      calories: { type: Number },
      effortIndex: { type: Number },
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const ClassModel =
  mongoose.models.Class ?? mongoose.model("Class", ClassSchema);

export default ClassModel;
