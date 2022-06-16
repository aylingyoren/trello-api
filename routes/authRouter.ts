import express from "express";
const authRouter = express.Router();
import handleLogin from "../controllers/authController";
import dataValidator from "../middleware/dataValidator";
import { UserSchema } from "../model/schemas";

authRouter.post("/", dataValidator(UserSchema), handleLogin);

export default authRouter;
