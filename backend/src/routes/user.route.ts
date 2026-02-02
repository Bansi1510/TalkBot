import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const userRouter = express.Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);
userRouter.get("/log-out", logout);

export default userRouter;