const express = require('express')
var cors = require("cors");
const tradeRouter = require('./routes/tradeRouter')
const app = express();
const errorHandler = require("./middleware/errorHandler");


// Middlewares to change request 
// Add CORS
app.use(cors());
// Parse body request to JSON
app.use(express.json());



// ROUTES

// Make trade, receive value back
app.use('/api/v1/trade', tradeRouter);


app.use(errorHandler);

export default app;