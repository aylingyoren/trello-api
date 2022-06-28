import express from "express";
const logoutRouter = express.Router();
import { handleLogout } from "../controllers/logoutController";

logoutRouter.get("/", handleLogout);

export default logoutRouter;
