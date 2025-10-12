import { Request, Response } from "express";
import List from "../models/list.model";
import Board from "../models/board.model";
import mongoose from "mongoose";

interface ListRequest extends Request {
  user?: { id: string };
}


export const createList = async (req: ListRequest, res:Response) => {

    try {
        
        const {title} = req.body;
        const {id: boardId} = req.params;
        const userId = req.user?.id;

        if(!title){
            return res.status(400).json({error: "Title is required"});
        }

        const board = await Board.findById(boardId);
        if(!board){
            return res.status(404).json({error: "Board not found"});
        }

        if(!board.members.includes(new mongoose.Types.ObjectId(userId))){
            return res.status(403).json({error: "Not allowed to add list to this board"});
        }

        const lastList = await List.findOne({ board: boardId }).sort("-position");
        const newPosition = lastList ? lastList.position + 1 : 0;

        const newList = new List({
            title,
            board: boardId,
            position:newPosition,
        });

        await newList.save();

        res.status(201).json(newList);
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }

}

export const deleteList = async(req: ListRequest, res:Response) => {
    try {
        
        const {id: listId} = req.params;
        const userId = req.user?.id;

        if(!userId){
            return res.status(401).json({error: "Unauthorized"});
        }

        const list = await List.findById(listId);
        if(!list){
            return res.status(404).json({error: "List not found"});
        }

        const board = await Board.findById(list.board);
        if(!board){
            return res.status(404).json({error: "Board not found"});
        }

        if(!board.members.includes(new mongoose.Types.ObjectId(userId))){
            return res.status(403).json("Not allowed to delete list");
        }

        await List.findByIdAndDelete(listId);

        res.status(200).json({message: "List deleted successfully"});

    } catch (error:any) {
        res.status(500).json({error: error.message});
    }
}

export const getListsByBoard = async (req: ListRequest, res:Response)=> {

    try {
        
        const {id: boardId} = req.params;
        const userId = req.user?.id;

        if(!userId){
            return res.status(401).json({error: "Unauthorized"});
        }

        const board = await Board.findById(boardId);
        if(!board){
            return res.status(404).json({error: "Board not found"});
        }

        if (!board.members.map(m => m.toString()).includes(userId)) {
            return res.status(403).json({ error: "Not allowed to view this board" });
        }

        const lists = await List.find({board:boardId}).sort("position");

        res.status(200).json(lists);

    } catch (error: any) {
        res.status(500).json({error: error.message});
    }

}
