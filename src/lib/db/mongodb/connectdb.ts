import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MDB_CONNECTION_STRING!);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
