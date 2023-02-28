import { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import _ from "lodash";

const boardSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  color: {
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
});

const BoardModel = mongoose.model("Board", boardSchema);

type BoardFilterQueryItem = mongoose.FilterQuery<{
  name: string;
  description: string;
  color: string;
  id?: number;
  created_at?: Date;
}>;

export class BoardMongoDB {
  constructor() {}

  async getAllItems(req: Request, res: Response) {
    const boards = await BoardModel.find();
    if (!boards) return res.status(204).json({ message: "No boards found" });
    res.json(boards);
  }

  async createItem(req: Request, res: Response) {
    if (!req?.body)
      return res.status(400).json({ message: "Board details are required." });
    const boardsDocs = await BoardModel.find();
    const boards = Array.from(boardsDocs);
    const lastBoard = boards[boards.length - 1];
    const { name, color, description } = req.body;
    const board = await BoardModel.create({
      name,
      color,
      description,
      id: _.isEmpty(boards) ? 1 : lastBoard.id + 1,
    });
    res.status(201).json(board);
  }

  async updateItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const { name, color, description } = req.body;
    const board = await this.findItem({ id: boardId });

    if (!board) {
      return res
        .status(204)
        .json({ message: `No board matches ID ${boardId}.` });
    }
    if (name) board.name = name;
    if (color) board.color = color;
    if (description) board.description = description;
    const result = await this.saveItem(board);
    res.json(result);
  }

  async findItem(item: BoardFilterQueryItem) {
    return await BoardModel.findOne(item).exec();
  }

  async deleteItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const board = await this.findItem({ id: boardId });
    if (!board) {
      return res
        .status(204)
        .json({ message: `No board matches ID ${boardId}.` });
    }
    const result = await board.deleteOne({ _id: boardId });
    res.json(result);
  }

  async saveItem(item: Document) {
    return await item.save();
  }

  async getItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const board = await this.findItem({ id: boardId });

    if (!board) {
      return res
        .status(204)
        .json({ message: `No board matches ID ${boardId}.` });
    }
    res.json(board);
  }
}
