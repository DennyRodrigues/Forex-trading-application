import { config } from 'dotenv'
config()
import { app } from './app'
import { connectDB } from './database/connectDB'

const port = process.env.PORT

// Initialize the startup routine
connectDB().then(() => {
  app.listen(port, () => console.log('Server is up and running on port:', port))
  console.log(app)
})
