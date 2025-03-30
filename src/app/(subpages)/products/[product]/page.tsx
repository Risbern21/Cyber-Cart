"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import RelatedProducts from "@/components/products/RelatedProducts";
import { Heart, Minus, Plus, TruckIcon, RefreshCcw } from "lucide-react";

interface card {
  cardName: string;
  category: string;
  cardLink: string;
  cardPrice: number;
  discount: number;
  stars: number;
  sizes: string[];
  colors: string[];
  description: string;
}

const page = () => {
  const [Product, setProduct] = useState<card>();
  const [Quantity, setQuantity] = useState<number>(1);
  const params = useParams<{ product: string }>();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      cardName: params.product.replaceAll(" ", "%20"),
    });

    fetch("http://localhost:3000/api/searchProducts", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result: card) => {
        setProduct(result);
      })
      .catch((error: string) => {});
  }, []);

  return (
    <div className="px-20 py-10 flex flex-col gap-10">
      <Toaster richColors={true} />
      <div className="text">
        <span className="text-[#4D4D4D]">Home / Products / </span>
        {Product?.cardName.replaceAll("%20", " ")}
      </div>
      <div className="grid grid-cols-4 w-full gap-5 mt-10">
        <div className="col-span-1"></div>
        <div className="col-span-2">
          {Product && (
              <Image
                priority={true}
                src={Product.cardLink}
                alt="Product Image"
                height={400}
                width={400}
                className="rounded"
              ></Image>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-semibold capitalize">
            {Product?.cardName.replaceAll("%20", " ")}
          </span>
          <span className="text-2xl font-light">₹{Product?.cardPrice}</span>
          <p className="text-xs">{Product?.description}</p>
          <hr className="border border-[#7F7F7F]" />
          <span className="space-x-2">
            <span className="text-xl">Colors :</span>
            {Product?.colors?.map((color, index) => {
              return (
                <input
                  type="radio"
                  style={{ accentColor: `#${color}` }}
                  key={index}
                ></input>
              );
            })}
          </span>
          <span className="space-x-2 w-full">
            <span>Size :</span>
            {Product?.sizes?.map((size, index) => {
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
            <button className="bg-[#D33333] text-white rounded px-4 text-xs pointer py-1">
              Buy Now
            </button>
            <span className="border border-[#B3B3B3] rounded h-fit w-fit px-2 py-1">
              <Heart width={15} />
            </span>
          </span>
          <span className="border border-[#B3B3B3] flex flex-col text-xs rounded">
            <span className="flex justify-between items-center p-4">
              <TruckIcon />
              <span className="space-y-2">
                <h1>Free Delivery</h1>
                <p className="text-[8px] hover:underline">
                  Enter Your Postal Code to check for delivery availability
                </p>
              </span>
            </span>
            <hr className="border border-[#B3B3B3]" />
            <span className="flex justify-between items-center p-4">
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
      <RelatedProducts category="gaming" />
    </div>
  );
};

export default page;
