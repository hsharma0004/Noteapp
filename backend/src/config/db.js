import mongoose from "mongoose";

export const connectDB = async()=>{
  try{
     await mongoose.connect(process.env.MONGO_URL);
     console.log("DB Connected");
  }
  catch(error){
    console.error("Error connecting to DB",error);
    process.exit(1) // 1 means exit with failure
  }
}