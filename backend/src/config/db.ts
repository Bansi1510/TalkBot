import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectionStr = process.env.MONGODB;

if (!connectionStr) {
  throw new Error("Connection String undfined");
}
export const connectDB = async () => {
  try {
    await mongoose.connect(connectionStr);
    console.log("Data base connected ");
  } catch (error) {
    console.log("DB connection error", error);
  }
};
