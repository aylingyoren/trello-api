import { Request, Response } from "express";
import fs from "fs";
const fsPromises = fs.promises;
import path from "path";
let users = require("../model/users.json");
import { User } from "../types/User";
import logger from "../config/logger";

const setUsers = (data: User[]) => (users = data);

export const handleLogout = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const accessToken: string = cookies.jwt;
    const foundUser: User = users.find((p) => p.accessToken === accessToken);
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(204).json({ message: "You are logged out." });
    }
    const otherUsers: User[] = users.filter(
      ({ userName }) => userName !== foundUser.userName
    );
    const currentUser: User = { ...foundUser, accessToken: "" };
    setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(users)
    );
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(204).json({ message: "You are logged out." });
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
