import { Request, Response } from "express";
import _ from "lodash";
let cards = require("../model/cards.json");
import logger from "../config/logger";
import { Card } from "../types/Card";

const setCards = (data: Card[]) => (cards = data);

export const getAllCards = async (req: Request, res: Response) => {
  try {
    await res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const lastCard: Card = cards[cards.length - 1];
    const { name, description, estimate, status, dueDate, labels, boardId } =
      req.body;
    const newCard = {
      id: _.isEmpty(cards) ? 1 : lastCard.id + 1,
      name,
      description,
      createdAt: new Date().toISOString(),
      estimate,
      status,
      dueDate,
      labels,
      boardId: Number(boardId),
    };
    setCards([...cards, newCard]);
    await res.status(201).json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const updateCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const card: Card = cards.find(({ id }) => id === Number(cardId));
    if (!card) {
      return res.status(400).json({ message: `Card ID ${cardId} not found` });
    }
    const { name, description, estimate, status, dueDate, labels } = req.body;
    if (name) card.name = name;
    if (description) card.description = description;
    if (estimate) card.estimate = estimate;
    if (status) card.status = status;
    if (dueDate) card.dueDate = dueDate;
    if (labels) card.labels = labels;
    const filteredArray: Card[] = cards.filter(
      ({ id }) => id !== Number(cardId)
    );
    const unsortedArray: Card[] = [...filteredArray, card];
    setCards(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const card: Card = cards.find(({ id }) => id === Number(cardId));
    if (!card) {
      return res.status(400).json({ message: `Card ID ${cardId} not found` });
    }
    const filteredArray: Card[] = cards.filter(({ id }) => id !== card.id);
    setCards([...filteredArray]);
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const getCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const card: Card = cards.find(({ id }) => id === Number(cardId));
    if (!card) {
      return res.status(400).json({ message: `Card ID ${cardId} not found` });
    }
    await res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
