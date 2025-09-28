import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().url().optional(),
  MONGODB_DB: z.string().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD_HASH: z.string().min(10).optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.warn(
    "[env] Invalid environment variables detected",
    parsed.error.flatten().fieldErrors
  );
}

export const env = parsed.success
  ? parsed.data
  : {
      MONGODB_URI: process.env.MONGODB_URI,
      MONGODB_DB: process.env.MONGODB_DB,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    };

export const hasMongo = Boolean(env.MONGODB_URI && env.MONGODB_DB);
export const hasCloudinary = Boolean(
  env.CLOUDINARY_CLOUD_NAME &&
    env.CLOUDINARY_API_KEY &&
    env.CLOUDINARY_API_SECRET
);
export const hasAdminCredentials = Boolean(
  env.ADMIN_EMAIL && env.ADMIN_PASSWORD_HASH
);
