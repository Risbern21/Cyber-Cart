import React from "react";
import CheckoutForm from "@/components/checkout/checkoutForm";

const page = () => {
  return (
    <div className="capitalize">
      <div className="text">
        <span className="text-[#4D4D4D]">Home / Cart / </span>Checkout
      </div>
      <div className="mt-10">
        <h1 className="text-2xl">Billing Details</h1>
        <CheckoutForm />
      </div>
    </div>
  );
};

export default page;
