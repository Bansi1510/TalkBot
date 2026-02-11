import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string | number;
    }
  }
}

const JWT = process.env.JWT;
if (!JWT) {
  throw new Error("Not Found JWT");
}
const isAutheticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token
    console.log(token)
    if (!token) {
      res.status(400).json({
        success: false,
        message: "please login frist"
      })
      return;
    }
    const verifyToken = await jwt.verify(token, JWT) as JwtPayload;
    req.userId = verifyToken.userId;
    next();
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: "authetication failed"
    })
  }
}

export default isAutheticated;