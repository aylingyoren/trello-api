import { Request, Response } from "express";
import BoardModel from "../model/Board";
import logger from "../config/logger";

export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const boards = await BoardModel.find();
    if (!boards) return res.status(204).json({ message: "No boards found" });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const createBoard = async (req: Request, res: Response) => {
  if (!req?.body)
    return res.status(400).json({ message: "Board details are required." });
  try {
    const { name, color, description } = req.body;
    const result = await BoardModel.create({
      name,
      color,
      description,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  if (!boardId)
    return res.status(400).json({ message: "Board ID is required." });
  try {
    const { name, color, description } = req.body;
    const board = await BoardModel.findOne({ _id: boardId }).exec();

    if (!board) {
      return res
        .status(204)
        .json({ message: `No board matches ID ${boardId}.` });
    }
    if (name) board.name = name;
    if (color) board.color = color;
    if (description) board.description = description;
    const result = await board.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  if (!boardId)
    return res.status(400).json({ message: "Board ID is required." });
  try {
    const board = await BoardModel.findOne({ _id: boardId }).exec();
    if (!board) {
      return res
        .status(204)
        .json({ message: `No board matches ID ${boardId}.` });
    }
    const result = await board.deleteOne({ _id: boardId });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const getBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  if (!boardId)
    return res.status(400).json({ message: "Board ID is required." });
  try {
    const board = await BoardModel.findOne({ _id: boardId }).exec();
    if (!board) {
      return res
        .status(204)
        .json({ message: `No board matches ID ${boardId}.` });
    }
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
