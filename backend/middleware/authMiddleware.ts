const jwt = require("jsonwebtoken");
import asyncHandler from "express-async-handler";
import User = require("../models/userModel");
import {Response, NextFunction } from "express";

const protect = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token and add user information to request 
        req.user = await User.findById(decoded.id).select("id");
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not Authorized");
      }
        
    }
    else if (!token) {
        res.status(401);
        throw new Error("Not Authorized");

    }
  }

);

export = protect;
