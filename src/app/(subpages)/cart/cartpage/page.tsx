"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { ProductInterface } from "@/app/api/products/route";

const page = () => {
  const { data: session } = useSession();
  const [quantity, setquantity] = useState(1);

  const [cartProducts, setcartProducts] = useState<ProductInterface[]>();
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(
      `http://localhost:3000/api/cartDetails?customer_id=${session?.user.customer_id}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => setcartProducts(result))
      .catch((error) => console.error(error));
  }, [session]);

  // console.log(cartProducts);

  return (
    <div className="px-5 lg:px-20 py-10 capitalize">
      <div className="text">
        <span className="text-[#4D4D4D]">Home / </span>Contact
      </div>
      <div className="flex flex-col gap-5">
        <ul className="shadow-sm p-4 rounded flex justify-between">
          <li className="w-1/6">Product</li>
          <li className="w-1/6">Price</li>
          <li className="w-1/6">Quantity</li>
          <li>Subtotal</li>
        </ul>
        {cartProducts &&
          cartProducts.map((cartProduct, index) => {
            return (
              <ul
                className="shadow-sm p-4 rounded flex justify-between"
                key={index}
              >
                <li className="flex gap-2 items-center text-sm w-1/6">
                  <Image
                    src={cartProduct.productImage}
                    alt="image of product"
                    width={50}
                    height={50}
                  ></Image>
                  <span className="w-20">{cartProduct.productName}</span>
                </li>
                <li className="w-1/6">₹{cartProduct.productPrice}</li>
                <li className="w-1/6">
                  <button
                    onClick={() => {}}
                    className="p-2  border border-[#828282] rounded w-15 flex items-center justify-center"
                  >
                    <input readOnly value={quantity} className="w-5" />
                    <span>
                      <span
                        onClick={() => {
                          if (quantity !== 20) setquantity(quantity + 1);
                        }}
                        className="hover:bg-[#B3B3B3] cursor-pointer p-0.5 rounded flex"
                      >
                        <ChevronUp width={15} height={15} />
                      </span>
                      <span
                        onClick={() => {
                          if (quantity !== 0) setquantity(quantity - 1);
                        }}
                        className="hover:bg-[#B3B3B3] cursor-pointer p-0.5 rounded flex"
                      >
                        <ChevronDown width={15} height={15} />
                      </span>
                    </span>
                  </button>
                </li>
                <li>
                  ₹
                  <input
                  readOnly
                  value={cartProduct.productPrice * quantity}
                  className="w-10"
                />
                </li>
              </ul>
            );
          })}
        <section className="flex flex-col gap-10 w-full">
          <div className="flex justify-between">
            <button className="hover:bg-[#DB4444] border border-[#7F7F7F] text-black hover:text-white p-2 rounded text-sm mt-5 pointer">
              Return To Shop
            </button>
            <button className="hover:bg-[#DB4444] border border-[#7F7F7F] text-black hover:text-white p-2 rounded text-sm mt-5 pointer">
              Update Cart
            </button>
          </div>
          <div className="flex lg:justify-end sm:justify-center">
            <div className="border-2 p-4 rounded text-sm w-full sm:w-1/2 lg:w-1/3">
              <div className="text-base">Cart Total</div>
              <div className="flex justify-between items-center my-3 border-b border-b-[#7F7F7F] py-2">
                <div>subtotal:</div>
                <div>₹1750</div>
              </div>
              <div className="flex justify-between items-center my-3 border-b border-b-[#7F7F7F] py-2">
                <div>Shipping:</div>
                <div>Free</div>
              </div>
              <div className="flex justify-between items-center my-3">
                <div>total:</div>
                <div>₹1750</div>
              </div>
              <div className="flex justify-center">
                <Link href={"/cart/checkout"}>
                  <button className="bg-[#DB4444] pointer text-white px-5 sm:px-10 py-2.5 rounded sm:text-sm w-fit mx-auto text-xs">
                    Proceed To Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
