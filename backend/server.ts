import { config } from 'dotenv'
import { createServer } from 'http'
config()
import { app } from './app'
import { connectDB } from './database/connectDB'
import { setupWebSocketServer } from './socket/setupWebSocketServer'

const port = process.env.PORT
const server = createServer(app)

// Initialize the startup routine
connectDB().then(() => {
  app.listen(port, () => {
    setupWebSocketServer(server).catch((e) => {
      console.error(e)
    })
  })
})
