"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { cartProducts } from "@/app/(subpages)/cart/cartpage/CartData";
import Image from "next/image";
import { StoreOrderData } from "./storeOrderData";
import Script from "next/script";
import { Toaster, toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type FormValues = {
  Name: string;
  email: string;
  address: string;
};

export default function CheckoutForm() {
  const [onlinePayment, setonlinePayment] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [is_paid, setIs_paid] = useState(false);

  const subTotal = cartProducts.reduce((currentPrice, cartProduct) => {
    return cartProduct.productPrice + currentPrice;
  }, 0);

  const handleOnlinePayment = async () => {
    const AMOUNT = 100;
    try {
      const response = await fetch("/api/createOrder", { method: "POST" });
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: AMOUNT * 100,
        currency: "INR",
        name: "Cyber Cart",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: function (respone: any) {
          // console.log("Payment Successfull", response);
        },
        prefill: {
          name: "John Doe",
          email: "John@email.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (onlinePayment) {
      setIsProcessing(true);
      await handleOnlinePayment();
      setIs_paid(true);
    }
    toast.success(await StoreOrderData(data, 2000, !onlinePayment, is_paid), {
      duration: 2000,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between my-5"
    >
      <Toaster richColors={true} />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <ul className="flex flex-col gap-5 w-1/2">
        <li className="flex flex-col text-sm">
          <label className="text-[#999999]" htmlFor="firstName">
            Name*
          </label>
          <input
            type="text"
            {...register("Name", { required: true, maxLength: 80 })}
            className="bg-[#F5F5F5] rounded text-black w-3/4 p-2"
          />
        </li>
        <li className="flex flex-col text-sm">
          <label className="text-[#999999]" htmlFor="email">
            Email*
          </label>
          <input
            type="text"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="bg-[#F5F5F5] rounded text-black w-3/4 p-2"
          />
        </li>
        <li className="flex flex-col text-sm">
          <label className="text-[#999999]" htmlFor="address">
            Address*
          </label>
          <input
            type="text"
            {...register("address", { maxLength: 150, required: true })}
            className="bg-[#F5F5F5] rounded text-black w-3/4 p-2"
          />
        </li>
        <li className="flex gap-2">
          <input type="checkbox" className="accent-[#D33333] w-4" />
          <label htmlFor="checkbox" className="text-sm">
            Save this info for easy checkout the next time
          </label>
        </li>
      </ul>
      <div className="w-1/2 flex flex-col">
        <div className="flex flex-col gap-3">
          {cartProducts.map((cartProduct, index) => {
            return (
              <div
                className="flex justify-between h-15 items-center"
                key={index}
              >
                <span className="flex gap-2 items-center text-sm">
                  <Image
                    className="rounded"
                    src={cartProduct.productImage}
                    alt={"cart product image"}
                    width={50}
                    height={50}
                  ></Image>
                  <span>{cartProduct.productName}</span>
                </span>
                <span>₹{cartProduct.productPrice}</span>
              </div>
            );
          })}
          <div className="rounded text-sm">
            <div className="flex justify-between items-center my-3 border-b border-b-[#7F7F7F] py-2">
              <div>subtotal:</div>
              <div>₹{subTotal}</div>
            </div>
            <div className="flex justify-between items-center my-3 border-b border-b-[#7F7F7F] py-2">
              <div>Shipping:</div>
              <div>Free</div>
            </div>
            <div className="flex justify-between items-center my-3">
              <div>total:</div>
              <div>₹{subTotal}</div>
            </div>
            <div className="flex flex-col gap-3 my-5">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-3">
                  <span
                    className="flex items-center gap-2"
                    onClick={() => setonlinePayment(true)}
                  >
                    <input
                      type="radio"
                      id="Razorpay"
                      readOnly={true}
                      checked={onlinePayment}
                    />
                    <label htmlFor="Razorpay">Razorpay</label>
                  </span>
                  <span
                    onClick={() => {
                      setonlinePayment(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      id="COD"
                      readOnly={true}
                      checked={!onlinePayment}
                    />
                    <label htmlFor="COD">Cash On Delivery</label>
                  </span>
                </div>
                <Image
                  src={"/cardcompanies.svg"}
                  alt="card companies"
                  width={200}
                  height={100}
                ></Image>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border rounded border-[#B3B3B3] px-4 py-2 w-fit h-fit"
                />
                <button className="bg-[#DB4444] text-white px-2.5 py-2 rounded text-sm w-fit h-fit pointer">
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>
          <input
            value={"Place Order"}
            type="submit"
            className="bg-[#DB4444] pointer text-white px-10 py-2.5 rounded text-sm w-fit self-start"
          />
        </div>
      </div>
    </form>
  );
}
