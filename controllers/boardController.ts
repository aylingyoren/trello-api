import { Request, Response } from "express";
import { Database } from "../config/Database";
import { BoardPG } from "../databases/BoardPG";
import logger from "../config/logger";

const dbClass = new Database(new BoardPG());

export const getAllBoards = async (req: Request, res: Response) => {
  try {
    await dbClass.getAllItems(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const createBoard = async (req: Request, res: Response) => {
  try {
    await dbClass.createItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    await dbClass.updateItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  try {
    await dbClass.deleteItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const getBoard = async (req: Request, res: Response) => {
  try {
    await dbClass.getItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
