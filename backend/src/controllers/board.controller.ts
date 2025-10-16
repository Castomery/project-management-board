import {Board, IBoard } from "../models/board.model";
import { Request, Response } from "express";

interface BoardRequest extends Request {
  user?: { id: string };
}

export const createNewBoard = async (req: BoardRequest, res: Response) => {
  try {
    const { title } = req.body;
    const owner = req.user?.id;

    if (!title || !owner) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newBoard: IBoard = new Board({
      title,
      owner,
      members: [owner],
      lists: [],
    });

    const board = await newBoard.save();
    res.status(201).json(board);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBoards = async (req: BoardRequest, res: Response) => {
  try {
    const owner = req.user?.id;
    const boards = await Board.find({ members: owner })

    res.json(boards);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBoard = async (req: BoardRequest, res: Response) => {
  try {
    const { id } = req.params;
    const owner = req.user?.id;

    if (!owner) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const board = await Board.findById(id);

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    if (board.owner.toString() !== owner) {
      return res
        .status(403)
        .json({ error: "You are not allowe to delete this board" });
    }

    await Board.findByIdAndDelete(id);

    res.status(200).json({message: "Board was successfully deleted"});

  } catch (error : any) {
    res.status(500).json({error: error.message})
  }
};
