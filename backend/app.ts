const express = require('express')
var cors = require("cors");
const tradeRouter = require('./routes/tradeRouter')

const app = express();



// Middlewares to change request 
// Add CORS
app.use(cors());
// Parse body request to JSON
app.use(express.json());
// Add date 
app.use((req:any, res:any, next:any) => {
  req.requestTime = new Date().toISOString();
  next();
});


// ROUTES

// Make trade, receive value back
app.use('/api/v1/trade', tradeRouter);


export default app;