const express = require('express');
const dotenv = require('dotenv').config()


const app = express();
const port = process.env.PORT

app.get('/', (req:any, res:any) => {
  res.status(400).json({message:'hello'})
})

app.listen(port, () =>{
})