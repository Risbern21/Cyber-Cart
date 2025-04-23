"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Script from "next/script";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { OrderInfo, ProductInterface, UserData } from "@/types";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const cart_id = searchParams.get("cart_id");
  const [onlinePayment, setonlinePayment] = useState(true);
  const [is_paid, setIs_paid] = useState(false);
  const [saveBillingDetails, setsaveBillingDetails] = useState<boolean>(false);

  const [cartProducts, setcartProducts] = useState<ProductInterface[]>();

  const subTotal = cartProducts?.reduce((currentPrice, cartProduct) => {
    return cartProduct.productPrice + currentPrice;
  }, 0);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const { register, handleSubmit, getValues, reset, setValue } =
    useForm<UserData>();

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    if (onlinePayment) {
      await onPayment(cart_id!);
      setIs_paid(true);
    }
    reset();
  };

  const onPayment = async (cart_id: string) => {
    try {
      const options = {
        product_id: 1,
      };
      const response = await axios.post(
        "http://localhost:4000/api/createOrder",
        options
      );

      const data = response.data;

      const paymentObject = new (window as any).Razorpay({
        key: "rzp_test_d8YKANxJMewfrX",
        order_id: data.id,
        ...data,
        handler: function (response: any) {
          console.log(response);

          const options2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          axios
            .post("http://localhost:4000/api/verifyPayment", options2)
            .then((res) => {
              console.log(res.data);
              if (res.data.success) alert("Payment successfull");
              else alert("Paymnet failed");
            });
        },
      });

      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between my-5"
    >
      <Toaster richColors={true} />

      <ul className="flex flex-col gap-5 w-1/2">
        <li className="flex flex-col text-sm">
          <label className="text-[#999999]" htmlFor="firstName">
            Name*
          </label>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 80 })}
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
        <li
          className="flex gap-2"
          onClick={() => {
            if (!saveBillingDetails) {
              localStorage.setItem(
                "billingDetails",
                JSON.stringify(getValues())
              );
            }
            setsaveBillingDetails(!saveBillingDetails);
          }}
        >
          <input
            readOnly
            type="checkbox"
            className="accent-[#D33333] w-4"
            checked={saveBillingDetails}
          />
          <label htmlFor="checkbox" className="text-sm">
            Save this info for easy checkout the next time
          </label>
        </li>
      </ul>
      <div className="w-1/2 flex flex-col">
        <div className="flex flex-col gap-3">
          {cartProducts?.map((cartProduct, index) => {
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
                  src={"/svgs/cardcompanies.svg"}
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
