import express from "express";
import { checkAuthUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller";
import { authProtectRoute } from "../middleware/auth.middleware";

const authRouter = express.Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout",logoutUser);
authRouter.get("/check-auth", authProtectRoute, checkAuthUser);

export default authRouter;