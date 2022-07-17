import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../database/models/userModel";
import { generateToken } from "../helpers/generateToken";
import bcrypt from "bcrypt";
import { RequestWithUser } from "../types/custom.request";

// Register a user
exports.registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Response reject if not all fields are filled
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: email,
      wallet: {
        JPY: 5000,
        USD: 5000,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login a user, returns a token
exports.loginUser = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      status: "success",
      result: {
        _id: user.id,
        name: user.name,
        email: user.email,
        wallet: user.wallet,
        token: generateToken(user.id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Get user data
exports.getUserData = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    // The user ID to be finded  came from the authMiddleware
    const { id, name, email, wallet } = await User.findById(req.user.id);

    res.status(200).json({
      status: "success",
      result: {
        id: id,
        name,
        email,
        wallet,
      },
    });
  }
);

// GENERATE TOKEN
