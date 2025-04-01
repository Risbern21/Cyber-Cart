import mongoose, { Mongoose } from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  product_id: String,
  productName: String,
  productImage: String,
  productPrice: Number,
  sellerName: String,
  discount: Number,
  stars: Number,
  sizes: Array<String>,
  colors: Array<String>,
  description: String,
  category: String,
});

export default mongoose.models.products || model("products", ProductSchema);
