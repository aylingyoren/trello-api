import { Request, Response } from "express";
import { UserMongoDB } from "../databases/UserMongoDB";
import { UserFileDB } from "../databases/UserFileDB";
import { UserPG } from "../databases/UserPG";

const MAX_AGE: number = 24 * 60 * 60 * 1000;
export const cookieConfig = { httpOnly: true, maxAge: MAX_AGE };

export interface UserI {
  userName: string;
  roles?: any;
  password: string;
  accessToken?: string;
}

type UserDBType = UserMongoDB | UserFileDB | UserPG;

export class UserDatabase {
  db: UserDBType;
  constructor(db: UserDBType) {
    this.db = db;
  }

  findUserByToken(token: string) {
    return this.db.findUserByToken(token);
  }

  authUser(req: Request, res: Response) {
    return this.db.authUser(req, res);
  }

  regUser(req: Request, res: Response) {
    return this.db.regUser(req, res);
  }

  logoutUser(req: Request, res: Response) {
    return this.db.logoutUser(req, res);
  }
}
