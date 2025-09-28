import mongoose, { Schema } from "mongoose";

const TrainerSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    avatar: { type: String },
    accolades: [{ type: String }],
    specialties: [{ type: String }],
    social: {
      instagram: { type: String },
      x: { type: String },
      youtube: { type: String },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const TrainerModel =
  mongoose.models.Trainer ?? mongoose.model("Trainer", TrainerSchema);

export default TrainerModel;
