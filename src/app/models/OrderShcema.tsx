import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  Name: String,
  email: String,
  address: String,
  amount: Number,
  cod: Boolean,
  is_paid: Boolean,
});

export default mongoose.models.order || model("order", OrderSchema);
