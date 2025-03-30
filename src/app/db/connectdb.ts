import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/CyberCart"
    );
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
