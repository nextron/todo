import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    mongoose.set("debug", true);
    await mongoose.connect(MONGO_URI!, {});
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
