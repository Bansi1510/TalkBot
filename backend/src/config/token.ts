import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Types } from "mongoose";
dotenv.config()
const JWT_SECRET = process.env.JWT
if (!JWT_SECRET) {
  throw new Error("JWT not found ")
}
export const genToken = async (userId: Types.ObjectId) => {
  try {
    const token = await jwt.sign({ userId }, JWT_SECRET, { expiresIn: "10d" })
    return token;
  } catch (error) {
    console.log(error)
  }
}