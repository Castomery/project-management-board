import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoose from "mongoose";
import { connect } from "http2";
import { connectToDB } from "./configs/mongoDb";
import { ENV } from "./configs/env";

const app = express();

connectToDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());


app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.listen(ENV.PORT, () => {
    console.log("Server is runnign on port:", ENV.PORT);
});

