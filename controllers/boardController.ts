import { Request, Response } from "express";
import { boardDbClass } from "../config/dbClasses";
import logger from "../config/logger";

export const getAllBoards = async (req: Request, res: Response) => {
  try {
    await boardDbClass.getAllItems(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const createBoard = async (req: Request, res: Response) => {
  try {
    await boardDbClass.createItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    await boardDbClass.updateItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  try {
    await boardDbClass.deleteItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const getBoard = async (req: Request, res: Response) => {
  try {
    await boardDbClass.getItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
