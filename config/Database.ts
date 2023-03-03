import { Request, Response } from "express";
import { BoardMongoDB } from "../databases/mongoDB/BoardMongoDB";
import { CardMongoDB } from "../databases/mongoDB/CardMongoDB";
import { BoardFileDB } from "../databases/fileDB/BoardFileDB";
import { CardFileDB } from "../databases/fileDB/CardFileDB";
import { BoardPG } from "../databases/pgDB/BoardPG";
import { CardPG } from "../databases/pgDB/CardPG";

export type DBType =
  | BoardMongoDB
  | CardMongoDB
  | BoardFileDB
  | CardFileDB
  | BoardPG
  | CardPG;

export class Database {
  db: DBType;
  constructor(db: DBType) {
    this.db = db;
  }
  getAllItems(req: Request, res: Response) {
    return this.db.getAllItems(req, res);
  }
  createItem(req: Request, res: Response) {
    return this.db.createItem(req, res);
  }
  updateItem(req: Request, res: Response) {
    return this.db.updateItem(req, res);
  }
  deleteItem(req: Request, res: Response) {
    return this.db.deleteItem(req, res);
  }
  getItem(req: Request, res: Response) {
    return this.db.getItem(req, res);
  }
}
