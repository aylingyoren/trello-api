import express from "express";
const loginRouter = express.Router();
import { handleLogin } from "../controllers/userController";
import dataValidator from "../middleware/dataValidator";
import { UserSchema } from "../databases/schemas";

loginRouter.post("/", dataValidator(UserSchema), handleLogin);

export default loginRouter;
