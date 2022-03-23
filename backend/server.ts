const dotenv = require('dotenv').config({path:__dirname+'/./../.env'})
import app from './app'
import startWebScocketServer from "./socket/webSocketServer";

const port = process.env.PORT_1

app.listen(port, () => {
  console.log("API Server is up & running", port);
})
startWebScocketServer();
