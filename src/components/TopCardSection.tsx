"use client";
import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRef } from "react";

export interface TopCardSectionProps {
  Title: string;
  Type?: string;
  date?: string;
  showBtns?: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
}

const TopCardSection = ({
  Title,
  Type,
  date,
  scrollLeft,
  scrollRight,
  showBtns,
}: TopCardSectionProps) => {
  return (
    <div className="p-2 flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="text-[#D33333]">
          <span className=" bg-[#DB4444] rounded p-2 mr-2" />
          {Title}
        </div>
        {showBtns && (
          <span className="flex gap-2">
            <span
              className="flex p-1 bg-[#F5F5F5] hover:bg-[#B3B3B3] rounded-full pointer"
              onClick={() => scrollLeft()}
            >
              <ArrowLeft strokeWidth={1.5} />
            </span>
            <span
              className="flex p-1 bg-[#F5F5F5] hover:bg-[#B3B3B3] rounded-full pointer"
              onClick={() => scrollRight()}
            >
              <ArrowRight strokeWidth={1.5} />
            </span>
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <>
          {Type && <span className="font-bold text-xs sm:text-xl">{Type}</span>}
          {date && (
            <span className="text-xs sm:text-base">
              Ends On :
              <span className="font-bold"> {new Date(date).toUTCString()}</span>
            </span>
          )}
        </>
      </div>
    </div>
  );
};

export default TopCardSection;
