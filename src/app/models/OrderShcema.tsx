import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  oid: String,
  customer_id: String,
  product_id: String,
  productQuantity: Number,
  Name: String,
  email: String,
  address: String,
  amount: Number,
  cod: Boolean,
  is_paid: Boolean,
});

export default mongoose.models.order || model("order", OrderSchema);
