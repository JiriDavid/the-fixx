import mongoose from "mongoose";
import { env, hasMongo } from "./env";

const globalForMongoose = globalThis;

const cached = globalForMongoose._mongoose ?? {
  conn: null,
  promise: null,
};

globalForMongoose._mongoose = cached;

export async function connectToDatabase() {
  if (!hasMongo) {
    throw new Error("MongoDB environment variables are not configured.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(env.MONGODB_URI, {
        dbName: env.MONGODB_DB,
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function safeConnect() {
  try {
    return await connectToDatabase();
  } catch (error) {
    console.warn("[mongo] Connection skipped:", error.message);
    return null;
  }
}
