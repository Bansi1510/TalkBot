import express from "express"
import isAutheticated from "../middlewares/isAutheticated.js";
import { getUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", isAutheticated, getUser);

export default userRouter;