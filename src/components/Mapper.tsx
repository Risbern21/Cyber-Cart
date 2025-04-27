"use client";
import Card from "./Card";
import React from "react";
import { useRef } from "react";
import TopCardSection from "./TopCardSection";
import { ProductInterface } from "@/types";

interface mapperProps {
  Title: string;
  Type?: string;
  date?: string;
  showBtns?: boolean;
  cards: ProductInterface[];
}

const Mapper = ({ cards, Title, Type, date, showBtns = true }: mapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    ref.current?.scrollBy({ left: -400, behavior: "smooth" });
  };
  const scrollRight = () => {
    ref.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <>
      <TopCardSection
        Title={Title}
        Type={Type}
        date={date}
        showBtns={showBtns}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
      />
      <div className="flex w-full gap-5 flex-col mb-10 mt-5">
        <div
          ref={ref}
          className="cardcontainer flex gap-5 overflow-x-auto w-full"
        >
          {cards &&
            cards.map((card, index) => {
              return (
                <div key={index}>
                  <Card {...card} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Mapper;
