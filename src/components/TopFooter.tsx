import React from "react";
import { Truck, Headset, ShieldCheck } from "lucide-react";

const TopFooter = () => {
  return (
    <div>
      <div className="flex p-20 flex-col lg:flex-row gap-10 lg:gap-0">
        <div className="flex flex-col items-center justify-center lg:w-1/3 gap-3">
          <span className="bg-black p-2 w-fit rounded-full outline-6 outline-[#C1C1C1]">
            <Truck stroke="white" strokeWidth={1.5} className="w-5 h-5 lg:w-8 lg:h-8"/>
          </span>
          <h2 className="text-center text-sm sm:text-base">
            FREE AND FAST DELIVERY
          </h2>
          <h6 className="text-xs text-[#3D3D3D] text-center">
            free delivery for all orders above ₹500
          </h6>
        </div>
        <div className="flex flex-col items-center justify-center lg:w-1/3 gap-3">
          <span className="bg-black p-2 w-fit rounded-full outline-6 outline-[#C1C1C1]">
            <Headset stroke="white" strokeWidth={1.5} className="w-5 h-5 lg:w-8 lg:h-8"/>
          </span>
          <h2 className="text-center text-sm sm:text-base">
            24/7 CUSTOMER SERVICE
          </h2>
          <h6 className="text-xs text-[#3D3D3D] text-center">
            Friendly 24/7 customer support
          </h6>
        </div>
        <div className="flex flex-col items-center justify-center lg:w-1/3 gap-3">
          <span className="bg-black p-2 w-fit rounded-full outline-6 outline-[#C1C1C1]">
            <ShieldCheck stroke="white" strokeWidth={1.5} className="w-5 h-5 lg:w-8 lg:h-8"/>
          </span>
          <h2 className="text-center text-sm sm:text-base">
            MONEY BACK GUARANTEE
          </h2>
          <h6 className="text-xs text-[#3D3D3D] text-center">
            We return money within 30 days
          </h6>
        </div>
      </div>
    </div>
  );
};

export default TopFooter;
