import { Request, Response } from "express";
import _ from "lodash";

let cards = require("./mockDB/cardsDB.json");

export interface CardI {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  estimate: string;
  status: string;
  dueDate: Date;
  labels: string[];
  boardId: number;
}

const setCards = (data: CardI[]) => (cards = data);

export class CardFileDB {
  constructor() {}

  async getAllItems(req: Request, res: Response) {
    if (!cards) return res.status(400).json({ message: "No cards found" });
    res.json(cards);
  }

  async createItem(req: Request, res: Response) {
    if (!req?.body)
      return res.status(400).json({ message: "Card details are required." });
    const lastCard: CardI = cards[cards.length - 1];
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
    res.status(201).json(newCard);
  }

  async updateItem(req: Request, res: Response) {
    const { cardId } = req.params;
    const card: CardI = cards.find(({ id }) => id === Number(cardId));
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
    const filteredArray: CardI[] = cards.filter(
      ({ id }) => id !== Number(cardId)
    );
    const unsortedArray: CardI[] = [...filteredArray, card];
    setCards(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    res.json(card);
  }

  async deleteItem(req: Request, res: Response) {
    const { cardId } = req.params;
    const card: CardI = cards.find(({ id }) => id === Number(cardId));
    if (!card) {
      return res.status(400).json({ message: `Card ID ${cardId} not found` });
    }
    const filteredArray: CardI[] = cards.filter(({ id }) => id !== card.id);
    setCards([...filteredArray]);
    res.json(card);
  }

  async getItem(req: Request, res: Response) {
    const { cardId } = req.params;
    const card: CardI = cards.find(({ id }) => id === Number(cardId));
    if (!card) {
      return res.status(400).json({ message: `Card ID ${cardId} not found` });
    }
    res.json(card);
  }
}
