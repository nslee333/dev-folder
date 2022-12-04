import mongoose from "mongoose";
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);

        console.log(`MongoDB Connected: ${conn.connection.host}`.magenta.underline)
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}

module.exports = connectDB;