import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Userschema = new Schema({
  customer_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.models.User || model("User", Userschema);
