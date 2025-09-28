import mongoose, { Schema } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
    avatar: { type: String },
    highlight: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TestimonialModel =
  mongoose.models.Testimonial ??
  mongoose.model("Testimonial", TestimonialSchema);

export default TestimonialModel;
