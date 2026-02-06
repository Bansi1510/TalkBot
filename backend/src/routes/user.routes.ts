import express from "express"
import isAutheticated from "../middlewares/isAutheticated.js";
import { askToAssistant, getUser, updateUserAssistant } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/", isAutheticated, getUser);
userRouter.post("/update", isAutheticated, upload.single("assistantImage"), updateUserAssistant);
userRouter.post("/ask-gemini", isAutheticated, askToAssistant);

export default userRouter;