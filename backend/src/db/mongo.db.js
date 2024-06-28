import mongoose from "mongoose";
import {MONGO_URL } from '../config.js'
const uri = "mongodb+srv://ritesh973mishra:9NjDEiZgOskoAheX@cluster0.rt7wnhp.mongodb.net/?appName=Cluster0";

export const connectToMongo =async()=>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connect successfully")
      } catch (error) {
       console.error(error)
      }
}

await connectToMongo()






