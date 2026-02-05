import express from "express"
import isAutheticated from "../middlewares/isAutheticated.js";
import { getUser, updateUserAssistant } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/", isAutheticated, getUser);
userRouter.post("/update", isAutheticated, upload.single("assistantImage"), updateUserAssistant)

export default userRouter;