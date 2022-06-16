import { Request, Response } from "express";
import _ from "lodash";
let boards = require("../model/board.json");
import { Board } from "../types/Board";
import logger from "../config/logger";

const setBoards = (data: Board[]) => (boards = data);

export const getAllBoards = async (req: Request, res: Response) => {
  try {
    await res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const createBoard = async (req: Request, res: Response) => {
  try {
    const lastBoard: Board = boards[boards.length - 1];
    const { name, color, description } = req.body;
    const newBoard = {
      id: _.isEmpty(boards) ? 1 : lastBoard.id + 1,
      name,
      color,
      description,
      createdAt: new Date().toISOString(),
    };
    setBoards([...boards, newBoard]);
    await res.status(201).json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  try {
    const board: Board = boards.find(({ id }) => id === Number(boardId));
    if (!board) {
      return res.status(400).json({ message: `Board ID ${boardId} not found` });
    }
    const { name, color, description } = req.body;
    if (name) board.name = name;
    if (color) board.color = color;
    if (description) board.description = description;
    const filteredArray: Board[] = boards.filter(
      ({ id }) => id !== Number(boardId)
    );
    const unsortedArray: Board[] = [...filteredArray, board];
    setBoards(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  try {
    const board: Board = boards.find(({ id }) => id === Number(boardId));
    if (!board) {
      return res.status(400).json({ message: `Board ID ${boardId} not found` });
    }
    const filteredArray: Board[] = boards.filter(({ id }) => id !== board.id);
    setBoards([...filteredArray]);
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

export const getBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  try {
    const board: Board = boards.find(({ id }) => id === Number(boardId));
    if (!board) {
      return res.status(400).json({ message: `Board ID ${boardId} not found` });
    }
    await res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};
