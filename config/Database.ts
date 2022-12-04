import { Request, Response } from "express";
import { BoardMongoDB } from "../databases/BoardMongoDB";
import { CardMongoDB } from "../databases/CardMongoDB";
import { BoardFileDB } from "../databases/BoardFileDB";
import { CardFileDB } from "../databases/CardFileDB";
import { BoardPG } from "../databases/BoardPG";
import { CardPG } from "../databases/CardPG";

type DBType =
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
