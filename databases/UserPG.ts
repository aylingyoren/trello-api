import { Request, Response } from "express";
import User, { UserMap } from "./pgUserModel";
import { sequelize } from "./pgIndex";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookieConfig } from "../config/UserDatabase";

export class UserPG {
  constructor() {}

  async findUserByToken(token: string) {
    UserMap(sequelize);
    return await User.findOne({ where: { accesstoken: token } });
  }

  async authUser(req: Request, res: Response) {
    const { name, pwd } = req.body;
    UserMap(sequelize);
    const foundUser = await User.findOne({ where: { username: name } });

    if (!foundUser) {
      return res.status(401).json({ message: "You need to sign up!" });
    }
    const match: boolean = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      const roles = foundUser.roles;
      const accessToken: string = jwt.sign(
        {
          userInfo: {
            username: foundUser.username,
            roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      await User.update(
        { accesstoken: accessToken },
        { where: { username: name } }
      );
      res.cookie("jwt", accessToken, cookieConfig);
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  }

  async regUser(req: Request, res: Response) {
    const { name, pwd } = req.body;
    UserMap(sequelize);
    const duplicate = await User.findOne({ where: { username: name } });
    if (duplicate) {
      return res.status(409).json({ message: `User ${name} already exists.` });
    } else {
      const hashedPwd: string = await bcrypt.hash(pwd, 10);
      await User.create({ username: name, password: hashedPwd });
      res
        .status(201)
        .json({ message: `User ${name} has been successfully created.` });
    }
  }

  async logoutUser(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.status(400).json({ message: "No cookie found." });
    const accessToken: string = cookies.jwt;
    const foundUser = await User.findOne({
      where: { accesstoken: accessToken },
    });
    if (!foundUser) {
      res.clearCookie("jwt", cookieConfig);
      res.json({ message: "You are logged out." });
    }
    await User.update(
      { accesstoken: "" },
      { where: { accesstoken: accessToken } }
    );
    res.clearCookie("jwt", cookieConfig);
    res.json({ message: "You are logged out." });
  }
}
