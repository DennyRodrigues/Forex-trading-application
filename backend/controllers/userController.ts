import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User = require("../models/userModel");
import {generateToken} from "../helpers/generateToken";
const bcrypt = require("bcrypt");

// Register a user
exports.registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Response reject if not all fields are filled
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if user already exists
  const userExists = await User.findOne({email});
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
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: email,
      wallet: 10000,
    }) ;
  }
  else {
    res.status(400);
    throw new Error("Invalid user data");
  }

});

// Authenticate a user
exports.loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
  
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      status: "success",
      result: {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  }
  else {
    res.status(400)
    throw new Error("Invalid credentials");
    
    
  }

});

// Get user data
exports.getUserData = asyncHandler(async (req: any, res: Response) => {
  // The user ID in the request came from the authMiddleware
  const { id, name, email, wallet } = await User.findById(req.user.id);

  res.status(200).json({
    status: "sucess",
    data: {
      id: id,
      name,
      email,
      wallet
    },
  });
});

// GENERATE TOKEN


