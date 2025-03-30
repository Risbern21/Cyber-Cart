"use client";
import React from "react";
import { cartProducts } from "./CartData";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="px-5 lg:px-20 py-10 capitalize">
      <div className="text">
        <span className="text-[#4D4D4D]">Home / </span>Contact
      </div>
      <div className="flex flex-col gap-5">
        <ul className="shadow-sm p-4 rounded flex justify-between">
          <li className="w-1/6">price</li>
          <li className="w-1/6">product</li>
          <li className="w-1/6">subtotal</li>
          <li>quantity</li>
        </ul>
        {cartProducts.map((cartProduct, index) => {
          return (
            <ul
              className="shadow-sm p-4 rounded flex justify-between"
              key={index}
            >
              <li className="flex gap-2 items-center text-sm w-1/6">
                <Image
                  src={cartProduct.cardLink}
                  alt="image of product"
                  width={50}
                  height={50}
                ></Image>
                <span className="w-20">{cartProduct.cardName}</span>
              </li>
              <li className="w-1/6">₹{cartProduct.cardPrice}</li>
              <li className="w-1/6 ">
                <button
                  onClick={() => {}}
                  className="p-2  border border-[#828282] rounded w-15"
                >
                  {cartProduct.quantity}
                </button>
              </li>
              <li>₹{cartProduct.cardPrice * cartProduct.quantity}</li>
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
