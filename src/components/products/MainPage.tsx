"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import RelatedProducts from "@/components/products/RelatedProducts";
import { Heart, Minus, Plus, TruckIcon, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { ProductInterface } from "@/types";

interface mainPageProps {
  product_id: string;
}

const mainPage = ({ product_id }: mainPageProps) => {
  const { data: session } = useSession();
  const [addToWishlist, setaddToWishlist] = useState(false);
  const [product, setproduct] = useState<ProductInterface>();
  const [quantity, setquantity] = useState(1);

  const AddItemToCart = (product_id: string | null) => {
    let status: number;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((result) => {
        if (status == 200)
          toast.success(result.message, {
            duration: 2000,
          });
        else
          toast.error(result.message, {
            duration: 2000,
          });
      })
      .catch((error) => console.error(error));
  };

  const addItemToWishlist = async (product_id: string) => {
    toast.success("item added to cart successfully", { duration: 2000 });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      customer_id: session?.user.customer_id,
      product_id: product_id,
    });

    fetch("http://localhost:3000/api/wishlistProducts", {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => toast(result.message, { duration: 2000 }))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(
      `http://localhost:3000/api/products/getProductById?product_id=${product_id}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result: ProductInterface) => setproduct(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <Toaster richColors={true} />
      <div className="text">
        <span className="text-[#4D4D4D]">Home / Products / </span>
        {product?.productName}
      </div>
      <div className="grid grid-cols-4 w-full gap-5 mt-10">
        <div className="col-span-full sm:col-span-1"></div>
        <div className="col-span-full sm:col-span-2">
          {product && (
            <Image
              priority={true}
              src={product.productImage}
              alt="Product Image"
              height={300}
              width={300}
              className="rounded object-contain object-center"
            ></Image>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-full sm:col-span-1">
          <span className="text-2xl font-semibold capitalize">
            {product?.productName}
          </span>
          <span className="text-2xl font-light">₹{product?.productPrice}</span>
          <p className="text-xs">{product?.description}</p>
          <hr className="border border-[#7F7F7F]" />
          {product?.colors && product.colors[0] && (
            <span className="space-x-2 flex gap-2 items-center">
              <span className="text-xl">Colors :</span>
              {product?.colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    // onClick={() => setproductColor(color)}
                    className="flex gap-1 cursor-pointer"
                  >
                    <label htmlFor="productColor">{color}</label>
                    <input
                      readOnly
                      type="radio"
                      // value={productColor}
                      // checked={productColor === color}
                    />
                  </div>
                );
              })}
            </span>
          )}
          {product?.sizes && product.sizes[0] && (
            <span className="space-x-2 w-full">
              <span>Size :</span>
              {product.sizes.map((size, index) => {
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
          )}
          <span className="flex justify-between my-5">
            <span className="flex border border-[#B3B3B3] w-fit rounded items-center">
              <Minus
                onClick={() => {
                  if (quantity !== 0) setquantity(quantity - 1);
                }}
                className="p-1 hover:bg-[#D33333] hover:text-white text-black h-full"
              />
              <span className="w-10 text-center p-1 border-l border-l-[#B3B3B3] border-r border-r-[#B3B3B3]">
                {quantity}
              </span>
              <Plus
                onClick={() => {
                  if (quantity < 20) setquantity(quantity + 1);
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
                !addToWishlist && setaddToWishlist(!addToWishlist);
                addItemToWishlist(product_id);
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
      {product && <RelatedProducts category={product.category} />}
    </div>
  );
};

export default mainPage;
