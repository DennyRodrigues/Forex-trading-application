const express = require('express')
var cors = require("cors");
const tradeRouter = require('./routes/tradeRouter')
const userRouter = require("./routes/userRouter");
const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");


// Middlewares to change request 
// Add CORS
app.use(cors());
// Parse body request to JSON
app.use(express.json());



// ROUTES

// Make trade, receive value back
app.use('/api/v1/trades', tradeRouter);
app.use('/api/v1/users', userRouter)

app.use(errorMiddleware);

export default app;