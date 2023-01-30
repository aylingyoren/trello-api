import { Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Roles } from "../config/roles";
import { cookieConfig, UserI } from "../config/UserDatabase";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: String,
      default: "user",
    },
    Admin: String,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: String,
});

const UserModel = mongoose.model("User", userSchema);

export class UserMongoDB {
  constructor() {}
  async findUser(user: Object) {
    return await UserModel.findOne(user).exec();
  }
  async findUserByToken(token: string) {
    return await this.findUser({ accessToken: token });
  }
  async authUser(req: Request, res: Response) {
    const { name, pwd } = req.body;
    const foundUser = await this.findUser({ userName: name });
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
        { expiresIn: "1h" }
      );

      foundUser.accessToken = accessToken;
      const result: UserI = await foundUser.save();

      res.cookie("jwt", accessToken, cookieConfig);
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  }

  async regUser(req: Request, res: Response) {
    const { name, pwd } = req.body;
    const duplicate: UserI = await this.findUser({ userName: name });
    if (duplicate)
      return res.status(409).json({ message: `User ${name} already exists.` });
    const hashedPwd: string = await bcrypt.hash(pwd, 10);
    const result: UserI = await UserModel.create({
      userName: name,
      password: hashedPwd,
    });
    res.status(201).json({ success: `New user ${name} created!` });
  }

  async logoutUser(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.status(400).json({ message: "No cookie found." });
    const accessToken: string = cookies.jwt;
    const foundUser = await this.findUser({ accessToken });
    if (!foundUser) {
      res.clearCookie("jwt", cookieConfig);
      res.status(204).json({ message: "You are logged out." });
    }

    foundUser.accessToken = "";
    const result: UserI = await foundUser.save();
    res.clearCookie("jwt", cookieConfig);
    res.status(204).json({ message: "You are logged out." });
  }
}
