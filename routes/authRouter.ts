import express from "express";
const authRouter = express.Router();
import { handleLogin } from "../controllers/userController";
import dataValidator from "../middleware/dataValidator";
import { UserSchema } from "../databases/schemas";

authRouter.post("/", dataValidator(UserSchema), handleLogin);

export default authRouter;
