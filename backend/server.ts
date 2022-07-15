import { config } from 'dotenv';
import { app } from './app'
import { startWebScocketServer } from "./socket/webSocketServer";
import { connectDB } from "./database/connectDB";

config();

const port = process.env.PORT_1

// Connect to Database 
connectDB();
// Connect Websocket on backend 
startWebScocketServer()
// Backend RESTFUL API
app.listen(port, () => {
  console.log("API Server is up & running", port);
})



