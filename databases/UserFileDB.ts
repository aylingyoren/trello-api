import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
const fsPromises = fs.promises;
import path from "path";
import { ROLES, Roles } from "../config/roles";
import { MAX_AGE, UserI } from "../config/UserDatabase";

let users = require("./mockDB/usersDB.json");
const setUsers = (data: UserI[]): UserI[] => (users = data);

export class UserFileDB {
  async authUser(req: Request, res: Response) {
    const { name, pwd } = req.body;
    const foundUser: UserI = users.find(({ userName }) => userName === name);
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
      const otherUsers: UserI[] = users.filter(
        ({ userName }) => userName !== foundUser.userName
      );
      const currentUser: UserI = { ...foundUser, accessToken };
      setUsers([...otherUsers, currentUser]);
      await fsPromises.writeFile(
        path.join(__dirname, "mockDB", "usersDB.json"),
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
  }

  async regUser(req: Request, res: Response) {
    const { name, pwd } = req.body;
    const duplicate: UserI = users.find(({ userName }) => userName === name);
    if (duplicate)
      return res.status(409).json({ message: `User ${name} already exists.` });
    const hashedPwd: string = await bcrypt.hash(pwd, 10);
    const newUser: UserI = {
      userName: name,
      roles: { User: ROLES.USER },
      password: hashedPwd,
    };
    setUsers([...users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "mockDB", "usersDB.json"),
      JSON.stringify(users)
    );
    res.status(201).json({ success: `New user ${name} created!` });
  }

  async logoutUser(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const accessToken: string = cookies.jwt;
    const foundUser: UserI = users.find((p) => p.accessToken === accessToken);
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        maxAge: MAX_AGE,
      });
      return res.status(204).json({ message: "You are logged out." });
    }
    const otherUsers: UserI[] = users.filter(
      ({ userName }) => userName !== foundUser.userName
    );
    const currentUser: UserI = { ...foundUser, accessToken: "" };
    setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "mockDB", "usersDB.json"),
      JSON.stringify(users)
    );
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: MAX_AGE,
    });
    res.status(204).json({ message: "You are logged out." });
  }
}
