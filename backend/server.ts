import { config } from 'dotenv'
config()
import { app } from './app'
import { connectDB } from './database/connectDB'
import { runWebSocketServer } from './socket/runWebSocketServer'

const port = process.env.PORT

// Initialize the startup routine
runWebSocketServer().then(() => {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log('API Server is up & running on port:', port)
    })
  })
})
