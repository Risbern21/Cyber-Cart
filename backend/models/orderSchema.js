import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  customer_id: String,
  product_id: String,
  productName: String,
  productQuantity: Number,
  name: String,
  email: String,
  address: String,
  amount: Number,
  isPaid: Boolean,
});

export default mongoose.models.order || model("order", OrderSchema);
