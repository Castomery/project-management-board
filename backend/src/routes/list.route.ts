import express from "express";
import { authProtectRoute } from "../middleware/auth.middleware";
import { createList, deleteList, getListsByBoard } from "../controllers/list.controller";

const listRouter = express.Router();

listRouter.use(authProtectRoute);

listRouter.post("/create/:id", createList);
listRouter.delete("/:id", deleteList);
listRouter.get("/board/:id", getListsByBoard);

export default listRouter;
