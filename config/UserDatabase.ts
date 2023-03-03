import { Request, Response } from "express";
import { UserMongoDB } from "../databases/mongoDB/UserMongoDB";
import { UserFileDB } from "../databases/fileDB/UserFileDB";
import { UserPG } from "../databases/pgDB/UserPG";

const MAX_AGE: number = 24 * 60 * 60 * 1000;
export const cookieConfig = { httpOnly: true, maxAge: MAX_AGE };

export interface UserI {
  userName: string;
  roles?: any;
  password: string;
  accessToken?: string;
}

export type UserDBType = UserMongoDB | UserFileDB | UserPG;

export class UserDatabase {
  db: UserDBType;
  constructor(db: UserDBType) {
    this.db = db;
  }

  findUserByToken(token: string) {
    return this.db.findUserByToken(token);
  }

  loginUser(req: Request, res: Response) {
    return this.db.loginUser(req, res);
  }

  regUser(req: Request, res: Response) {
    return this.db.regUser(req, res);
  }

  logoutUser(req: Request, res: Response) {
    return this.db.logoutUser(req, res);
  }
}
