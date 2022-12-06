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
    if (!boards.rowCount) return res.json({ message: "No boards found" });
    res.json(boards.rows);
  }

  async createItem(req: Request, res: Response) {
    const { name, color, description } = req.body;
    if (!name && !color && !description)
      return res.status(400).json({ message: "Board details are required." });
    await db.query(createBoardQuery, [name, color, description]);
    res.status(201).json({
      message: `New board with name "${name}", color "${color}" and description "${description}" has been created.`,
    });
  }

  async updateItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const { name, color, description } = req.body;
    await db.query(updateBoardQuery, [name, color, description, boardId]);
    res.json({ message: `Board ${boardId} has been updated.` });
  }

  async deleteItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    await db.query(deleteBoardQuery, [boardId]);
    res.json({ message: `Board ${boardId} has been deleted.` });
  }

  async getItem(req: Request, res: Response) {
    const { boardId } = req.params;
    if (!boardId)
      return res.status(400).json({ message: "Board ID is required." });
    const board = await db.query(getBoardQuery, [boardId]);
    res.json(board.rows[0]);
  }
}
