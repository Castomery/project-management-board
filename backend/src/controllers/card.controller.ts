import { Request, Response } from "express";
import mongoose from "mongoose";
import { Card, ICard } from "../models/card.model";
import { List } from "../models/list.model";
import { Board } from "../models/board.model";

interface CardRequest extends Request {
  user?: { id: string }; // from auth middleware
}

export const createCard = async (req: CardRequest, res: Response) => {
  try {
    const { title, description, dueDate, labels } = req.body;
    const { id: listId } = req.params;
    const userId = req.user?.id;

    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    const board = await Board.findById(list.board);
    if (!board) return res.status(404).json({ error: "Board not found" });

    const lastCard = await Card.findOne({ list: listId }).sort("-position");
    const newPosition = lastCard ? lastCard.position + 1 : 0;

    const newCard = new Card({
      title,
      description,
      position: newPosition,
      list: list._id,
      board: board._id,
      createdBy: userId,
      createdAt: Date.now(),
      assignedTo: null,
      dueDate: dueDate ? new Date(dueDate) : null,
      labels: labels || [],
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getCardsByList = async (req: CardRequest, res: Response) => {
  try {
    const { id: listId } = req.params;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    const board = await Board.findById(list.board);
    if (!board) return res.status(404).json({ error: "Board not found" });

    if (!board.members.map((m) => m.toString()).includes(userId)) {
      return res.status(403).json({ error: "Not allowed to view this list" });
    }

    const cards = await Card.find({ list: listId }).sort("position");
    res.json(cards);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const updateCard = async (req: CardRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ error: "Card not found" });

    const board = await Board.findById(card.board);
    if (!board) return res.status(404).json({ error: "Board not found" });

    if (!board.members.map((m) => m.toString()).includes(userId)) {
      return res.status(403).json({ error: "Not allowed to update this card" });
    }

    const updatedCard = await Card.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.json(updatedCard);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const deleteCard = async (req: CardRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ error: "Card not found" });

    const board = await Board.findById(card.board);
    if (!board) return res.status(404).json({ error: "Board not found" });

    if (!board.members.map((m) => m.toString()).includes(userId)) {
      return res.status(403).json({ error: "Not allowed to delete this card" });
    }

    await Card.findByIdAndDelete(id);
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
