import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user.model";
import generateToken from "../utils/generateToken";

export interface AuthRequest extends Request {
  user?: typeof User.prototype;
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({ username, email, password: hashedPassword });
    
    const user = await newUser.save();

    const token = generateToken(user._id.toString(), res);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, username: newUser.username, email: newUser.email },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id.toString(), res);

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const logoutUser = async (_: Request, res: Response) => {
    res.cookie('token', "", { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const checkAuthUser = async(req: AuthRequest, res: Response) => {
    res.status(200).json((req.user));
}
