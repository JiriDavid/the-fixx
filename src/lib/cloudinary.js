import { v2 as cloudinary } from "cloudinary";
import { env, hasCloudinary } from "./env";

let configured = false;

export function getCloudinary() {
  if (!hasCloudinary) {
    throw new Error("Cloudinary environment variables are not configured.");
  }

  if (!configured) {
    cloudinary.config({
      cloud_name: env.CLOUDINARY_CLOUD_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }

  return cloudinary;
}
