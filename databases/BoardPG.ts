import { Request, Response } from "express";
import { pool as db } from "../config/pgDBCon";
import {
  createBoardQuery,
  deleteBoardQuery,
  getAllBoardsQuery,
  getBoardQuery,
  updateBoardQuery,
} from "../helpers/pgBoardQueries";

export class BoardPG {
  constructor() {}

  async getAllItems(req: Request, res: Response) {
    const boards = await db.query(getAllBoardsQuery);
    if (!boards) return res.status(204).json({ message: "No boards found" });
    res.json(boards.rows);
  }

  async createItem(req: Request, res: Response) {
    if (!req?.body)
      return res.status(400).json({ message: "Board details are required." });
    const { name, color, description } = req.body;
    const newBoard = await db.query(createBoardQuery, [
      name,
      color,
      description,
    ]);
    res.json(newBoard.rows[0]);
  }

  async updateItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const { name, color, description } = req.body;
    const board = await db.query(updateBoardQuery, [
      name,
      color,
      description,
      boardId,
    ]);
    res.json(board.rows[0]);
  }

  async deleteItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const board = await db.query(deleteBoardQuery, [boardId]);
    res.json(board.rows[0]);
  }

  async getItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const board = await db.query(getBoardQuery, [boardId]);
    res.json(board.rows[0]);
  }
}
