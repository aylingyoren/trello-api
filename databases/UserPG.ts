import { Request, Response } from "express";
import { pool as db } from "../config/pgDBCon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Roles } from "../config/roles";
import { MAX_AGE } from "../config/UserDatabase";
import {
  foundUserByAccessTokenQuery,
  foundUserByNameQuery,
  updateAccessTokenQuery,
  updateUserQuery,
  updateAccessTokenQueryToNull,
} from "../helpers/pgUserQueries";

export class UserPG {
  constructor() {}

  async findUser() {}

  async authUser(req: Request, res: Response) {
    const { name, pwd } = req.body;

    const foundUserQuery = await db.query(foundUserByNameQuery, [name]);

    if (!foundUserQuery.rowCount) {
      return res.status(401).json({ message: "You need to sign up!" });
    }
    const foundUser = foundUserQuery.rows[0];
    const match: boolean = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      const roles: Roles[] = foundUser.roles;
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
      await db.query(updateAccessTokenQuery, [accessToken, name]);
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
    const duplicateQuery = await db.query(foundUserByNameQuery, [name]);
    if (duplicateQuery.rowCount) {
      return res.status(409).json({ message: `User ${name} already exists.` });
    } else {
      const hashedPwd: string = await bcrypt.hash(pwd, 10);
      const result = await db.query(updateUserQuery, [name, hashedPwd]);
      res.status(201).json(result.rows[0]); // ?
    }
  }

  async logoutUser(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const accessToken: string = cookies.jwt;
    const foundUserQuery = await db.query(foundUserByAccessTokenQuery, [
      accessToken,
    ]);
    if (!foundUserQuery) {
      res.clearCookie("jwt", {
        httpOnly: true,
        maxAge: MAX_AGE,
      });
      res.json({ message: "You are logged out." });
    }
    await db.query(updateAccessTokenQueryToNull, [accessToken]);
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: MAX_AGE,
    });
    res.json({ message: "You are logged out." });
  }
}
