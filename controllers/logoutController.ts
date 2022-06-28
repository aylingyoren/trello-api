import { Request, Response } from "express";
import User from "../model/User";
import { UserI } from "../types/UserI";
import logger from "../config/logger";

const MAX_AGE: number = 24 * 60 * 60 * 1000;

export const handleLogout = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const accessToken: string = cookies.jwt;
    const foundUser = await User.findOne({ accessToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        maxAge: MAX_AGE,
      });
      return res.status(204).json({ message: "You are logged out." });
    }

    foundUser.accessToken = "";
    const result: UserI = await foundUser.save();

    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: MAX_AGE,
    });
    res.status(204).json({ message: "You are logged out." });
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
