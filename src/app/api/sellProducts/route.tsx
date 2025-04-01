import products from "@/app/models/ProductShcema";
import connectDB from "@/app/db/mongodb/connectdb";
import { v4 as uuidv4 } from "uuid";

interface ProductInterface {
  productName: String;
  productImage: String;
  productPrice: Number;
  sellerName: String;
  discount: Number;
  stars: Number;
  sizes: String;
  colors: String;
  description: String;
  category: String;
}

export async function POST(Request: Request) {
  const body: ProductInterface = await Request.json();

  await connectDB();

  const is_created: ProductInterface = await products.create({
    product_id:uuidv4(),
    productName: body.productName,
    productImage: body.productImage,
    productPrice: body.productPrice,
    sellerName: body.sellerName,
    discount: 0,
    stars: 0,
    sizes: body.sizes,
    colors: body.colors,
    description: body.description,
    category: body.category,
  });

  if (is_created) {
    return Response.json({
      message: "Your Product Has Been Listed!",
    });
  }
  return Response.json({
    error: "There was an error",
  });
}
