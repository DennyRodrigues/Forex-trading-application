import mongoose from "mongoose";


const connectDB = () => {
  const MONGO_URL:string = process.env.MONGO_URL!;
  try {
    const connect = mongoose.connect(MONGO_URL);
    console.log("mongoDB connected:",);
  }
  catch (error){
    console.log(error)
    process.exit(1)
  }
}

export { connectDB };
