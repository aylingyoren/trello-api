import { Request, Response } from "express";
import { UserDatabase } from "../config/UserDatabase";
import { UserPG } from "../databases/UserPG";
import logger from "../config/logger";

const dbClass = new UserDatabase(new UserPG());

export const handleNewUser = async (req: Request, res: Response) => {
  try {
    await dbClass.regUser(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    await dbClass.authUser(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  try {
    await dbClass.logoutUser(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
