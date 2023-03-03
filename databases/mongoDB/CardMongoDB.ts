import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import _ from "lodash";

const cardSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  estimate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    default: new Date(),
  },
  labels: {
    type: [String],
    required: true,
  },
  board_id: {
    type: String,
    required: true,
  },
});

const CardModel = mongoose.model("Card", cardSchema);

type CardFilterQueryItem = mongoose.FilterQuery<{
  name: string;
  description: string;
  estimate: string;
  status: string;
  labels: string[];
  board_id: string;
  due_date?: Date;
  id?: number;
  created_at?: Date;
}>;

export class CardMongoDB {
  constructor() {}

  async getAllItems(req: Request, res: Response) {
    const cards = await CardModel.find();
    if (!cards) return res.status(400).json({ message: "No cards found" });
    res.json(cards);
  }

  async createItem(req: Request, res: Response) {
    if (!req?.body)
      return res.status(400).json({ message: "Card details are required." });
    const cardsDocs = await CardModel.find();
    const cards = Array.from(cardsDocs);
    const lastCard = cards[cards.length - 1];
    const { name, description, estimate, status, due_date, labels, board_id } =
      req.body;
    const card = await CardModel.create({
      id: _.isEmpty(cards) ? 1 : lastCard.id + 1,
      name,
      description,
      estimate,
      status,
      due_date,
      labels,
      board_id,
    });
    res.status(201).json(card);
  }

  async updateItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    const { name, description, estimate, status, due_date, labels } = req.body;
    const card = await this.findItem({ id: cardId });
    if (!card) {
      return res.status(204).json({ message: `No card matches ID ${cardId}.` });
    }
    if (name) card.name = name;
    if (description) card.description = description;
    if (estimate) card.estimate = estimate;
    if (status) card.status = status;
    if (due_date) card.due_date = due_date;
    if (labels) card.labels = labels;
    const result = await this.saveItem(card);
    res.json(result);
  }

  async findItem(item: CardFilterQueryItem) {
    return await CardModel.findOne(item).exec();
  }

  async deleteItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    const card = await this.findItem({ id: cardId });
    if (!card) {
      return res.status(204).json({ message: `No card matches ID ${cardId}.` });
    }
    const result = await card.deleteOne({ id: cardId });
    res.json(result);
  }

  async saveItem(item: Document) {
    return await item.save();
  }

  async getItem(req: Request, res: Response) {
    const { cardId } = req.params;
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    const card = await this.findItem({ id: cardId });

    if (!card) {
      return res.status(204).json({ message: `No card matches ID ${cardId}.` });
    }
    res.json(card);
  }
}
