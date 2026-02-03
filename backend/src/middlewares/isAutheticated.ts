import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT = process.env.JWT;
if (!JWT) {
  throw new Error("Not Found JWT");
}
const isAutheticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token
    if (!token) {
      res.status(400).json({
        success: false,
        message: "please login frist"
      })
    }
    const verifyToken = await jwt.verify(token, JWT);

  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "authetication failed"
    })
  }
}

export default isAutheticated;