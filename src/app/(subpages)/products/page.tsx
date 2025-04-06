"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import RelatedProducts from "@/components/products/RelatedProducts";
import { Heart, Minus, Plus, TruckIcon, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";

interface card {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  category: string;
  discount: number;
  sizes: string[];
  colors: string[];
  description: string;
}

const page = () => {
  const { data: session } = useSession();
  const [addToWishlist, setaddToWishlist] = useState<boolean>(false);
  const [productColor, setproductColor] = useState<string>();
  const [Quantity, setQuantity] = useState<number>(1);
  const searchParams = useSearchParams();
  const product_id = searchParams.get("product_id");
  const productName = searchParams.get("productName");
  const productImage = searchParams.get("productImage");
  const productPrice = searchParams.get("productPrice");
  const discount = searchParams.get("discount");
  const description = searchParams.get("description");
  const colors = searchParams.get("colors");
  const category = searchParams.get("category");
  // const sizes = searchParams.get("sizes");

  // const AddToCart = async (product_id: string | null) => {};

  const AddItemToCart = (product_id: string | null) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(session?.user);
    const raw = JSON.stringify({
      customer_id: `${session?.user.customer_id}`,
      product_id: `${product_id}`,
    });
    // console.log(raw);

    fetch("http://localhost:3000/api/cartDetails", {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result: { message: string }) =>
        toast(result.message, {
          duration: 2000,
        })
      )
      .catch((error) => console.error(error));
  };

  return (
    <div className="px-5 sm:px-20 py-10 flex flex-col gap-10">
      <Toaster richColors={true} />
      <div className="text">
        <span className="text-[#4D4D4D]">Home / Products / </span>
        {productName}
      </div>
      <div className="grid grid-cols-4 w-full gap-5 mt-10">
        <div className="col-span-full sm:col-span-1"></div>
        <div className="col-span-full sm:col-span-2">
          {productImage && (
            <Image
              priority={true}
              src={productImage}
              alt="Product Image"
              height={300}
              width={300}
              className="rounded object-contain object-center"
            ></Image>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
          <span className="text-2xl font-semibold capitalize">
            {productName}
          </span>
          <span className="text-2xl font-light">₹{productPrice}</span>
          <p className="text-xs">{description}</p>
          <hr className="border border-[#7F7F7F]" />
          <span className="space-x-2 flex gap-2 items-center">
            <span className="text-xl">Colors :</span>
            {colors?.split(",").map((color, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setproductColor(color)}
                  className="flex gap-1 cursor-pointer"
                >
                  <label htmlFor="productColor">{color}</label>
                  <input
                    readOnly
                    type="radio"
                    value={productColor}
                    checked={productColor === color}
                  />
                </div>
              );
            })}
          </span>
          {/* {Product?.sizes[0] && (
            <span className="space-x-2 w-full">
              <span>Size :</span>
              {Product?.sizes.map((size, index) => {
                return (
                  <span
                    key={index}
                    className="hover:bg-[#D33333] hover:text-white text-black border border-[#B3B3B3] rounded text-xs p-2 uppercase"
                  >
                    {size}
                  </span>
                );
              })}
            </span>
          )} */}
          <span className="flex justify-between my-5">
            <span className="flex border border-[#B3B3B3] w-fit rounded items-center">
              <Minus
                onClick={() => {
                  if (Quantity !== 0) setQuantity(Quantity - 1);
                }}
                className="p-1 hover:bg-[#D33333] hover:text-white text-black h-full"
              />
              <span className="w-10 text-center p-1 border-l border-l-[#B3B3B3] border-r border-r-[#B3B3B3]">
                {Quantity}
              </span>
              <Plus
                onClick={() => {
                  if (Quantity < 20) setQuantity(Quantity + 1);
                }}
                className="p-1 hover:bg-[#D33333] hover:text-white text-black h-full"
              />
            </span>
            <button
              onClick={() => AddItemToCart(product_id)}
              className="bg-[#D33333] text-white rounded px-4 text-xs pointer py-1"
            >
              Add To Cart
            </button>
            <span
              className="border border-[#B3B3B3] rounded h-fit w-fit px-2 py-1"
              onClick={() => {
                !addToWishlist &&
                  toast.success("Item Add to Wishlist!", { duration: 2000 });
                setaddToWishlist(!addToWishlist);
              }}
            >
              <Heart width={15} fill={addToWishlist ? "#D33333" : "white"} />
            </span>
          </span>
          <span className="border w-fit mx-auto border-[#B3B3B3] flex flex-col text-xs rounded">
            <span className="flex justify-between items-center p-4 w-fit">
              <TruckIcon />
              <span className="space-y-2">
                <h1>Free Delivery</h1>
                <p className="text-[8px] hover:underline">
                  Enter Your Postal Code to check for delivery availability
                </p>
              </span>
            </span>
            <hr className="border border-[#B3B3B3]" />
            <span className="flex justify-between items-center p-4 w-fit">
              <RefreshCcw />
              <span className="space-y-2">
                <h1>Free Delivery</h1>
                <p className="text-[8px] hover:underline">
                  Enter Your Postal Code to check for delivery availability
                </p>
              </span>
            </span>
          </span>
        </div>
      </div>
      {category && <RelatedProducts category={category} />}
    </div>
  );
};

export default page;
