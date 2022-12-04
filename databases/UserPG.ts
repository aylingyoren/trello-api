import { Request, Response } from "express";
import { pool as db } from "../config/pgDBCon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Roles } from "../config/roles";
import { MAX_AGE } from "../config/UserDatabase";
import {
  foundUserByAccessTokenQuery,
  foundUserByNameQuery,
  updateUserQuery,
} from "../helpers/pgUserQueries";

// FINISH
export class UserPG {
  constructor() {}

  async findUser() {}

  async authUser(req: Request, res: Response) {
    const { name, pwd } = req.body;
    const foundUserQuery = await db.query(foundUserByNameQuery(name));
    if (!foundUserQuery) {
      return res.status(401).json({ message: "You need to sign up!" });
    }
    const foundUser = foundUserQuery.rows[0];
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

      const updatedUserQuery = await db.query(
        `UPDATE users SET accessToken = ${accessToken} WHERE userName = ${name}`
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
    const duplicateQuery = await db.query(foundUserByNameQuery(name));
    if (duplicateQuery)
      return res.status(409).json({ message: `User ${name} already exists.` });
    const hashedPwd: string = await bcrypt.hash(pwd, 10);
    const result = await db.query(updateUserQuery, [name, hashedPwd]);
    res.status(201).json(result.rows[0]);
  }

  async logoutUser(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const accessToken: string = cookies.jwt;
    const foundUserQuery = await db.query(
      foundUserByAccessTokenQuery(accessToken)
    );
    if (!foundUserQuery) {
      res.clearCookie("jwt", {
        httpOnly: true,
        maxAge: MAX_AGE,
      });
      res.status(204).json({ message: "You are logged out." });
    }
    const updatedUserQuery = await db.query(
      `UPDATE users SET accessToken = null WHERE accessToken = ${accessToken}`
    );

    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: MAX_AGE,
    });
    res.status(204).json({ message: "You are logged out." });
  }
}
