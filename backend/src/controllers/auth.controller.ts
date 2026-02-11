import type { Request, Response } from "express"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../config/token.js";


export const signUp = async (req: Request, res: Response) => {
  try {
    console.log("hello")
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "Required All fields "
      })
    }
    const existUser = await User.find({ email });

    if (existUser.length > 0) {

      return res.status(400).json({
        success: false,
        message: "These Email is already registed"
      })
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be 6 characters"
      })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name, email, password: hashPassword
    })

    const token = await genToken(user._id);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction
    });

    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: `Sign up error ${error}` });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Required all fields "
      })
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "These email id not registered yet"
      })
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "wrong password"
      })
    }
    const token = await genToken(user._id);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction
    });

    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: `login error ${error}` });
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    return res.clearCookie("token").json({
      success: true,
      message: "log out successfully"
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: `logout error ${error}` });
  }
}