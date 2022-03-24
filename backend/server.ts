const dotenv = require('dotenv').config({path:__dirname+'/./../.env'})
import app from './app'
import startWebScocketServer from "./socket/webSocketServer";
const connectDB = require("./database/db");
const port = process.env.PORT_1

// Database Mongodb
connectDB();

// Backend websocket
startWebScocketServer();

// Backend RESTFUL API
app.listen(port, () => {
  console.log("API Server is up & running", port);
})
