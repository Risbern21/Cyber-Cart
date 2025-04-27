"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ChevronDown, ChevronUp, Minus, Plus, Trash2 } from "lucide-react";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { ProductInterface } from "@/types";
import { toast, Toaster } from "sonner";

const page = () => {
  const { data: session } = useSession();
  const [quantity, setquantity] = useState(1);
  const [showLoader, setshowLoader] = useState(true);

  const [cartProducts, setcartProducts] = useState<ProductInterface[]>();

  const updateCart = async (cartProducts: ProductInterface[] | undefined) => {
    const options = {
      product_ids: cartProducts?.map((cartProduct) => cartProduct.product_id),
      customer_id: session?.user.customer_id,
    };

    if (cartProducts) {
      await axios
        .put<{}, { status: number; message: string }>(
          "http://localhost:3000/api/cartDetails/removeProduct",
          options
        )
        .then((response) => {
          if (response.status === 200) toast.success(response.message);
          toast.error(response.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeFromCart = (product_id: string) => {
    setcartProducts(
      cartProducts?.filter((cartProduct) => {
        if (cartProduct.product_id !== product_id) return cartProduct;
      })
    );
  };

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
        .then((result) => {
          setcartProducts(result);
          setshowLoader(false);
        })
        .catch((error) => console.error(error));
    }

    if (cartProducts)
      localStorage.setItem("cartDetails", JSON.stringify(cartProducts));
  }, [session]);

  return (
    <div className="capitalize mb-10">
      <Toaster richColors={true} />
      <div className="text">
        <span className="text-[#4D4D4D]">Home / </span>Cart
      </div>
      <div className="flex flex-col gap-5">
        {cartProducts && (
          <ul className="shadow-sm p-4 rounded grid grid-cols-4">
            <li className="text-left">Product</li>
            <li className="text-center">Price</li>
            <li className="text-center">Quantity</li>
            <li className="text-center">Subtotal</li>
          </ul>
        )}
        {cartProducts ? (
          cartProducts?.map((cartProduct, index) => {
            return (
              <div key={index}>
                <ul
                  className="shadow-sm p-4 rounded grid grid-cols-4 items-center hover:shadow-md"
                  style={{
                    background:
                      cartProduct.productName === "ronaldo"
                        ? "linear-gradient(#C0C0C0,#FFD700)"
                        : cartProduct.productName === "messi"
                        ? "linear-gradient(#C0C0C0,#45b6fe)"
                        : "",
                  }}
                >
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
                    <span
                      onClick={() => {}}
                      className="border-2 border-[#D33333] rounded w-20 h-10 flex items-center justify-between"
                    >
                      <button className="pointer">
                        <Minus />
                      </button>
                      {quantity}
                      <button
                        onClick={() => {
                          setquantity((q) => {
                            if (q != 10) return q + 1;
                            return q;
                          });
                        }}
                        className="pointer"
                      >
                        <Plus />
                      </button>
                    </span>
                  </li>
                  <li className="text-center flex justify-center items-center">
                    <span>₹{cartProduct.productPrice * quantity}</span>
                    <span
                      onClick={() => {
                        removeFromCart(cartProduct.product_id);
                      }}
                      className="p-2 hover:bg-[#F5F5F5] absolute right-10 rounded-full"
                    >
                      <Trash2 />
                    </span>
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <>
            {showLoader ? (
              <Loader />
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
          </>
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
                <button
                  onClick={() => updateCart(cartProducts)}
                  className="hover:bg-[#DB4444] border border-[#7F7F7F] text-black hover:text-white p-2 rounded text-sm mt-5 pointer"
                >
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
                  <Link href={`/cart/checkout`}>
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
