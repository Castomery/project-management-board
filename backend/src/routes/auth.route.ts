import express from "express";
import { checkAuthUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller";
import { authProtectRoute } from "../middleware/auth.middleware";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout",logoutUser);
authRouter.post("/check-auth", authProtectRoute, checkAuthUser);

export default authRouter;