import Card from "./Card";
import React from "react";

interface product {
  productName: string;
  productImage: string;
  productPrice: number;
  discount: number;
}

interface cardContainer {
  title?: string;
  remainingTime?: number;
  buttondata?: string;
  cards: product[];
}

const Mapper = ({ title, remainingTime, cards, buttondata }: cardContainer) => {
  return (
    <div className="flex w-full gap-5 flex-col mb-10 mt-5">
      <div className="cardcontainer flex gap-5 overflow-x-auto w-full">
        {cards.map((card, index) => {
          return (
            <div key={index}>
              <Card {...card} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mapper;
