import mongoose from 'mongoose'

export const connectDB = () => {
  const MONGO_URL: string = process.env.MONGO_URL!
  try {
    mongoose.connect(MONGO_URL)
    console.log('mongoDB connected:')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
