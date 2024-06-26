import mongoose from 'mongoose';
import "dotenv/config";


const connectDb =async()=>{
    try {
        await mongoose.connect("mongodb://localhost:6638/restaurant")
        console.log("connected to mongodb")
    } catch (error) {
        console.log({error})
        console.log("error connecting to mongodb")
    }
}

export default connectDb;
