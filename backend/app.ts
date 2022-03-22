const express = require('express')

const tradeRouter = require('./routes/tradeRouter')

const app = express();

// Middlewares to change request 
// Parse body request to JSON
app.use(express.json());
// Add date 
app.use((req:any, res:any, next:any) => {
  req.requestTime = new Date().toISOString();
  next();
});


// ROUTES
app.get('/', (req:any, res:any) => {
  res.status(400).json({message:'hello'})
})

// Make trade, receive value back
app.use('/api/v1/trade', tradeRouter);


export default app;