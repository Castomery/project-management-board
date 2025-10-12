import express from "express";
import { authProtectRoute } from "../middleware/auth.middleware";
import { createNewBoard, deleteBoard, getBoards } from "../controllers/board.controller";

const boardRouter = express.Router();

boardRouter.use(authProtectRoute);

boardRouter.get("/getboards", getBoards);
boardRouter.post("/create", createNewBoard);
boardRouter.post("/delete", deleteBoard);

export default boardRouter;