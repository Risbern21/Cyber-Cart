"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { ProductInterface } from "@/types";

const page = () => {
  const { data: session } = useSession();
  const [quantity, setquantity] = useState(1);

  const [cartProducts, setcartProducts] = useState<ProductInterface[]>();
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      customer_id: session?.user.customer_id,
    });

    if (session) {
      fetch(`http://localhost:3000/api/cartDetails/getProducts`, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => setcartProducts(result))
        .catch((error) => console.error(error));
    }
  }, []);

  console.log(cartProducts);

  return (
    <div className="capitalize">
      <div className="text">
        <span className="text-[#4D4D4D]">Home / </span>Contact
      </div>
      <div className="flex flex-col gap-5">
        {cartProducts ? (
          cartProducts?.map((cartProduct, index) => {
            return (
              <div key={index}>
                <ul className="shadow-sm p-4 rounded grid grid-cols-4">
                  <li className="text-left">Product</li>
                  <li className="text-center">Price</li>
                  <li className="text-center">Quantity</li>
                  <li className="text-center">Subtotal</li>
                </ul>
                <ul className="shadow-sm p-4 rounded grid grid-cols-4 items-center">
                  <li className="flex gap-2 items-center text-sm flex-col sm:flex-row">
                    <Image
                      src={cartProduct.productImage}
                      alt="image of product"
                      width={50}
                      height={50}
                    ></Image>
                    <span className="">
                      {cartProduct.productName.replaceAll("%20", " ")}
                    </span>
                  </li>
                  <li className="text-center">₹{cartProduct.productPrice}</li>
                  <li className="flex items-center justify-center">
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
                  <li className="text-center">
                    ₹{cartProduct.productPrice * quantity}
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <div className="mt-30 flex flex-col items-center justify-center">
            <div className="font-bold text-2xl text-center">
              You have no products in your cart
            </div>
            <Link href={"/"}>
              <button className="hover:bg-[#DB4444] border border-[#7F7F7F] text-black hover:text-white p-2 rounded text-sm mt-5 pointer">
                Return To Shop
              </button>
            </Link>
          </div>
        )}
        {session?.user.customer_id && (
          <section className="flex flex-col gap-10 w-full">
            <div className="flex justify-between">
              <Link href={"/"}>
                <button className="hover:bg-[#DB4444] border border-[#7F7F7F] text-black hover:text-white p-2 rounded text-sm mt-5 pointer">
                  Return To Shop
                </button>
              </Link>
              {session?.user.customer_id && (
                <button className="hover:bg-[#DB4444] border border-[#7F7F7F] text-black hover:text-white p-2 rounded text-sm mt-5 pointer">
                  Update Cart
                </button>
              )}
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
        )}
      </div>
    </div>
  );
};

export default page;
