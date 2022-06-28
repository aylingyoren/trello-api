import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../model/User";
import { UserI } from "../types/UserI";
import logger from "../config/logger";

export const handleNewUser = async (req: Request, res: Response) => {
  const { name, pwd } = req.body;
  const duplicate: UserI = await User.findOne({ userName: name }).exec();
  if (duplicate)
    return res.status(409).json({ message: `User ${name} already exists.` });
  try {
    const hashedPwd: string = await bcrypt.hash(pwd, 10);
    const result: UserI = await User.create({
      userName: name,
      password: hashedPwd,
    });
    res.status(201).json({ success: `New user ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
