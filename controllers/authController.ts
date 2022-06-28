import { Request, Response } from "express";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Roles } from "../config/roles";
import { UserI } from "../types/UserI";
import logger from "../config/logger";

const MAX_AGE: number = 24 * 60 * 60 * 1000;

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { name, pwd } = req.body;
    const foundUser = await User.findOne({ userName: name }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: "You need to sign up!" });
    }
    const match: boolean = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      const roles: Roles[] = Object.values(foundUser.roles);
      const accessToken: string = jwt.sign(
        {
          userInfo: {
            userName: foundUser.userName,
            roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      foundUser.accessToken = accessToken;
      const result: UserI = await foundUser.save();

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: MAX_AGE,
      });
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
