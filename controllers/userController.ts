import { Request, Response } from "express";
import { userDbClass } from "../config/dbClasses";
import logger from "../config/logger";

export const handleNewUser = async (req: Request, res: Response) => {
  try {
    await userDbClass.regUser(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    await userDbClass.authUser(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  try {
    await userDbClass.logoutUser(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
