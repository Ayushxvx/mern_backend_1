import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDb = async () => {
    try{
        // console.log("MONGO_URI =", process.env.MONGO_URI);
        // console.log(`PORT = ${process.env.PORT}`)
    await mongoose.connect(process.env.MONGO_URI);
console.log(`Connected to DB successfully ✅`)
}
catch(error){
    console.log(`Error = ${error.message}`);
    process.exit(1);
}
}


export default connectToDb;