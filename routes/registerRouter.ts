import express from "express";
const registerRouter = express.Router();
import handleNewUser from "../controllers/registerController";
import dataValidator from "../middleware/dataValidator";
import { UserSchema } from "../model/schemas";

registerRouter.post("/", dataValidator(UserSchema), handleNewUser);

export default registerRouter;
