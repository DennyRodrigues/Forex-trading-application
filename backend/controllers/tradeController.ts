import { getExchangeRate } from "../helpers/getExchangeRate"
import asyncHandler from "express-async-handler";
import User from "../database/models/userModel";
import { Request, Response } from "express"

let ObjectID = require("mongodb").ObjectID;
exports.postTrade = asyncHandler(async (req: any, res: Response) => {
  const entryValue = Number(req.body.value);
  const UserId = req.user.id;
  console.log(UserId);
  if (!isNaN(entryValue)) {
    const ExchangeRate = getExchangeRate();
    ExchangeRate.then(async (response: any) => {
      const user = await User.findById(UserId);
      user.trades.push( {
              _id: new ObjectID(),
              date: response.date,
              exchangeSymbol: "GBPUSD",
              exchangeRate: response.rate,
              entryAmount: entryValue,
              exchangeAmout: entryValue * response.rate,
      })
      user.save();
      res.status(200).json({
        status: "success",
        results: {
          date: response.date,
          exchangeSymbol: "GBPUSD",
          exchangeRate: response.rate,
          entryAmount: entryValue,
          exchangeAmout: entryValue * response.rate,
        },
      });
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "request body needs a valid value property",
    });
  }
});

exports.getTrade = asyncHandler(async (req: any, res: Response) => {
  const { trades } = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    result: {
      trades
    },
  });
})