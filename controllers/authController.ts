import { Request, Response } from "express";
import logger from "../config/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
const fsPromises = fs.promises;
import path from "path";
import { User } from "../types/User";
import { Roles } from "../config/roles";
let users = require("../model/users.json");
dotenv.config();

const setUsers = (data: User[]): User[] => (users = data);
const MAX_AGE: number = 24 * 60 * 60 * 1000;

const handleLogin = async (req: Request, res: Response) => {
  try {
    const { name, pwd } = req.body;
    const foundUser: User = users.find(({ userName }) => userName === name);
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
      const otherUsers: User[] = users.filter(
        ({ userName }) => userName !== foundUser.userName
      );
      const currentUser: User = { ...foundUser, accessToken };
      setUsers([...otherUsers, currentUser]);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(users)
      );
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

export default handleLogin;
