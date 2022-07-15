import asyncHandler from "express-async-handler";
import User from "../database/models/userModel";
import { Request, Response } from "express"

import { RequestWithUser } from "../types/custom.request";

let ObjectID = require("mongodb").ObjectID;
exports.postTrade = asyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const {
      date,
      entrySymbol,
      exitSymbol,
      exchangeRate,
      value,
    } = req.body;

    // Convert entry amount to number
    const entryAmount = Number(value);

    // Get user ID from auth Middleware
    const UserId = req.user.id;

    

    // Check if user has send all the property of the trade
    if (!date || !entrySymbol || !exitSymbol || !exchangeRate || !value) {
       res.status(400).json({
        status: "fail",
        message: "request body is missing property",
       });
      return;
    }
    // Check if entry Amount is a positive number 
      if (!isNaN(entryAmount) && entryAmount > 0) {
        const user = await User.findById(UserId);
        const exitAmount = entryAmount * exchangeRate;

        // Validation on wallet user


        // Check if the wallet has the entry symbol and exit symbol
        if (
          typeof user.wallet[entrySymbol] === "undefined" ||
          typeof user.wallet[exitSymbol] === "undefined"
        ) {
          res.status(400).json({
            status: "fail",
            message: "not a valid  symbol on wallet to make transaction",
          });
          return;
        }


        
        // Check if the wallet has enough money on entry symbol
        if (Number(user.wallet[entrySymbol]) < entryAmount) {
          res.status(400).json({
            status: "fail",
            message: "not enough money on wallet to make transaction",
          });
          return
        }

        // Substract entry value on user wallet
        user.wallet[entrySymbol] = Number(user.wallet[entrySymbol]) - entryAmount;

       

        // Add exit value on user wallet
        user.wallet[exitSymbol] = Number(user.wallet[exitSymbol]) + exitAmount;
        // Add trade inside trades array
        user.trades.push({
          _id: new ObjectID(),
          date: date,
          entrySymbol: entrySymbol,
          exitSymbol: exitSymbol,
          exchangeRate: exchangeRate,
          entryAmount: value,
          exitAmount: value * exchangeRate,
        });

        // Save changes on database
        user.save();

        res.status(201).json({
          status: "success",
          results: {
            date: date,
            entrySymbol: entrySymbol,
            exitSymbol: exitSymbol,
            exchangeRate: exchangeRate,
            entryAmount: value,
            exitAmount: value * exchangeRate,
          },
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: "request body is missing property",
        });
      }
  }
);

exports.getTrade = asyncHandler(async (req: RequestWithUser, res: Response) => {
  const { trades } = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    result: {
      trades,
    },
  });
});
