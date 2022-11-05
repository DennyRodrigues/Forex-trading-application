import { config } from 'dotenv'
import { app } from './app'
import { connectDB } from './database/connectDB'
import { runWebSocketServer } from './socket/runWebSocketServer'

config()

const port = process.env.PORT
console.log(process.env.NODE_ENV)
// Connect to Database

runWebSocketServer().then(() => {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log('API Server is up & running on port:', port)
    })
  })
})

// Backend RESTFUL API
