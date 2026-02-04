import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/login", login);
authRouter.get("/log-out", logout);

export default authRouter;