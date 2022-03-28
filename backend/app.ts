import express from "express";
import cors  from "cors";
import { tradeRouter }  from "./routes/tradeRouter";
import { userRouter }  from "./routes/userRouter";
import {errorMiddleware}  from "./middleware/errorMiddleware";
import { setHeadersMiddleware } from "./middleware/setHeadersMiddleware";

export const app = express();


// Middlewares
// Add CORS
app.use(cors());
// Parse body request to JSON
app.use(express.json());


// ROUTES
// POST trade to make a trade, or GET to receive all trades back
app.use("/api/v1/trades", tradeRouter);

// /Register to register a new user, /login to receive a token back and /me to get user information
app.use("/api/v1/users", userRouter);


 
app.use(setHeadersMiddleware);


// Middlewares
// Handle error
app.use(errorMiddleware);

