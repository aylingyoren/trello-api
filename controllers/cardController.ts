import { Request, Response } from "express";
import _ from "lodash";
import { Database } from "../config/Database";
import { CardMongoDB } from "../databases/CardMongoDB";
import logger from "../config/logger";

const dbClass = new Database(new CardMongoDB());

export const getAllCards = async (req: Request, res: Response) => {
  try {
    await dbClass.getAllItems(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    await dbClass.createItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    await dbClass.updateItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    await dbClass.deleteItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const getCard = async (req: Request, res: Response) => {
  try {
    await dbClass.getItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
