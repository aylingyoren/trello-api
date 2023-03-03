import express from "express";
const logoutRouter = express.Router();
import { handleLogout } from "../controllers/userController";

logoutRouter.get("/", handleLogout);

export default logoutRouter;
