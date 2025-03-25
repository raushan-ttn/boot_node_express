import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Members from "../models/Members";
// Load environment variables
dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

export const memberSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await Members.getMember(email);
  if (!user) {
    res.status(401).json({ message: "User not exist or wrong password" });
  }
  //   Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res
      .status(401)
      .json({ message: "Invalid credentials or user not exists." });
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "1h", // Token expires in 1 hour
  });

  res.json({ message: "Login successful", token });
};

/**
 * Member registration.
 * @param req
 * @param res
 * @returns
 */
export const memberSignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirm_password, age } = req.body;

    // Validate inputs
    if (!name || !email || !password || !confirm_password || !age) {
      res.status(400).json({ message: "All fields are required" });
    }

    // check age should be number.
    if (isNaN(Number(age))) {
      res.status(400).json({ message: "age should be number." });
    }
    // Validate confirm password.
    if (password !== confirm_password) {
      res
        .status(400)
        .json({ message: "Password and confirm password should match." });
    }
    // Check member exist or not
    const isExistMember = await Members.isMemberExist(email, name);
    if (isExistMember) {
      res.status(400).json({
        message: "Member already exist, please use another email or name.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user (replace with DB logic)
    const member = await Members.createMember(name, email, hashedPassword, age);
    if (member) {
      res
        .status(201)
        .json({ message: "User registered successfully", user: member });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};
