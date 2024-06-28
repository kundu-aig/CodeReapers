import mongoose from "mongoose";
import {MONGO_URL } from '../config.js'

export const connectToMongo =async()=>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connect successfully")
      } catch (error) {
       console.error(error)
      }
}

await connectToMongo()






