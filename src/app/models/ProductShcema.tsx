import mongoose, { Mongoose } from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  cardName: String,
  cardLink: String,
  cardPrice: Number,
  sellerName: String,
  discount: Number,
  stars: Number,
  sizes: Array<String>,
  colors: Array<String>,
  description: String,
  category: String,
});

export default mongoose.models.products || model("products", ProductSchema);
