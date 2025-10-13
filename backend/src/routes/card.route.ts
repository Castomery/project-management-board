import express from "express";
import { authProtectRoute } from "../middleware/auth.middleware";
import { createCard, deleteCard, getCardsByList, updateCard } from "../controllers/card.controller";

const cardRouter = express.Router();

cardRouter.use(authProtectRoute);

cardRouter.post("/create/:id", createCard);
cardRouter.get("/list/:id", getCardsByList);
cardRouter.delete("/:id", deleteCard);
cardRouter.put("/:id", updateCard);

export default cardRouter;