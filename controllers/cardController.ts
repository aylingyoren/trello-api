import { Request, Response } from "express";
import _ from "lodash";
import { cardDbClass } from "../config/dbClasses";
import logger from "../config/logger";

export const getAllCards = async (req: Request, res: Response) => {
  try {
    await cardDbClass.getAllItems(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    await cardDbClass.createItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    await cardDbClass.updateItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    await cardDbClass.deleteItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const getCard = async (req: Request, res: Response) => {
  try {
    await cardDbClass.getItem(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
