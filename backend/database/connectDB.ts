import mongoose from 'mongoose'

export async function connectDB() {
  const MONGO_URL: string = process.env.MONGO_URL!
  try {
    await mongoose.connect(MONGO_URL)
    console.log('mongoDB connected successfully.')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
