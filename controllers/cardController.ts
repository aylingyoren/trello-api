import { Request, Response } from "express";
import _ from "lodash";
import CardModel from "../model/Card";
import logger from "../config/logger";

export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await CardModel.find();
    if (!cards) return res.status(204).json({ message: "No cards found" });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const cardsDocs = await CardModel.find();
    const cards = Array.from(cardsDocs);
    const lastCard = cards[cards.length - 1];
    const { name, description, estimate, status, dueDate, labels, boardId } =
      req.body;
    const result = await CardModel.create({
      id: _.isEmpty(cards) ? 1 : lastCard.id + 1,
      name,
      description,
      estimate,
      status,
      dueDate,
      labels,
      boardId,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const updateCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  if (!cardId) return res.status(400).json({ message: "Card ID is required." });
  try {
    const { name, description, estimate, status, dueDate, labels } = req.body;
    const card = await CardModel.findOne({ id: cardId }).exec();
    if (!card) {
      return res.status(204).json({ message: `No card matches ID ${cardId}` });
    }
    if (name) card.name = name;
    if (description) card.description = description;
    if (estimate) card.estimate = estimate;
    if (status) card.status = status;
    if (dueDate) card.dueDate = dueDate;
    if (labels) card.labels = labels;
    const result = await card.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  if (!cardId) return res.status(400).json({ message: "Card ID is required." });
  try {
    const card = await CardModel.findOne({ id: cardId }).exec();
    if (!card) {
      return res.status(204).json({ message: `No card matches ID ${cardId}` });
    }
    const result = await card.deleteOne({ id: cardId });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const getCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  if (!cardId) return res.status(400).json({ message: "Card ID is required." });
  try {
    const card = await CardModel.findOne({ id: cardId }).exec();
    if (!card) {
      return res.status(204).json({ message: `No card matches ID ${cardId}` });
    }
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
