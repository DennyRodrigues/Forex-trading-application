import express from "express";
import cors  from "cors";
import { tradeRouter }  from "./routes/tradeRouter";
import { userRouter }  from "./routes/userRouter";
import {errorMiddleware}  from "./middleware/errorMiddleware";
import path from "path";

export const app = express();


// Middlewares
// Add CORS
app.use(cors());
// Parse body request to JSON
app.use(express.json());


// APIS
// POST trade to make a trade, or GET to receive all trades back
app.use("/api/v1/trades", tradeRouter);

// /Register to register a new user, /login to receive a token back and /me to get user information
app.use("/api/v1/users", userRouter);

if (process.env.NODE_ENV === "development") {
    app.use(
      express.static(path.join(__dirname, "..", "frontend", "build"))
    );
    app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "..", "frontend", "build", "index.html")
      );
    });
}
else {
      app.use(
      express.static(path.join(__dirname, "..", "..", "frontend", "build"))
    );
    app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "..", "..", "frontend", "build", "index.html")
      );
    });
}

// Middlewares
// Handle error
app.use(errorMiddleware);

