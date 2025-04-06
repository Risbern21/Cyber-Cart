"use client";
import Card from "./Card";
import React from "react";
import { useRef } from "react";
import TopCardSection, { TopCardSectionProps } from "./TopCardSection";
// import { createContext } from "react";

interface product {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  discount: number;
  sizes: string[];
  colors: string[];
  description: string;
  category: string;
}

interface mapperProps {
  Title: string;
  Type?: string;
  date?: string;
  cards: product[];
}

const Mapper = ({ cards, Title, Type, date }: mapperProps) => {
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
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
      />
      <div className="flex w-full gap-5 flex-col mb-10 mt-5">
        {/* <button onClick={() => scrollLeft()}>left</button>
        <button onClick={() => scrollRight()}>right</button> */}
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
