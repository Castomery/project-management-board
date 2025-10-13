import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { connectToDB } from "./configs/mongoDb";
import { ENV } from "./configs/env";
import authRouter from "./routes/auth.route";
import boardRouter from "./routes/board.route";
import listRouter from "./routes/list.route";
import cardRouter from "./routes/card.route";

const app = express();

connectToDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/boards", boardRouter)
app.use("/api/lists", listRouter);
app.use("/api/cards", cardRouter);


app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.listen(ENV.PORT, () => {
    console.log("Server is runnign on port:", ENV.PORT);
});

