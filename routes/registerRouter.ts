import express from "express";
const registerRouter = express.Router();
import { handleNewUser } from "../controllers/userController";
import dataValidator from "../middleware/dataValidator";
import { UserSchema } from "../databases/schemas";

registerRouter.post("/", dataValidator(UserSchema), handleNewUser);

export default registerRouter;
