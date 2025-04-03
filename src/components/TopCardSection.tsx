"use client";
import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface TopCardSectionProps {
  Title: string;
  Type?: string;
  date?: string;
}

const TopCardSection = ({ Title, Type, date }: TopCardSectionProps) => {
  return (
    <div className="p-2 flex flex-col gap-5">
      <div className="text-[#D33333]">
        <span className=" bg-[#DB4444] rounded p-2 mr-2" />
        {Title}
      </div>
      <div className="flex items-center justify-between">
        <>
          <span className="font-bold text-xs sm:text-xl">{Type}</span>
          {date && (
            <span className="text-xs sm:text-base">
              Ends On :
              <span className="font-bold"> {new Date(date).toUTCString()}</span>
            </span>
          )}
        </>
        <span className="flex gap-2">
          <span className="flex p-1 bg-[#F5F5F5] hover:bg-[#B3B3B3] rounded-full">
            <ArrowLeft strokeWidth={1.5} />
          </span>
          <span className="flex p-1 bg-[#F5F5F5] hover:bg-[#B3B3B3] rounded-full">
            <ArrowRight strokeWidth={1.5} />
          </span>
        </span>
      </div>
    </div>
  );
};

export default TopCardSection;
