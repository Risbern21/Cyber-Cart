import Card from "./Card";
import React from "react";

interface card {
  cardName: string;
  cardLink: string;
  cardPrice: number;
  stars?: number;
  reviews: number;
  discount: number;
  eye: boolean;
}

interface cardContainer {
  title?: string;
  remainingTime?: number;
  buttondata?: string;
  cards: card[];
}

const Mapper = ({ title, remainingTime, cards, buttondata }: cardContainer) => {
  return (
    <div className="flex w-full gap-5 flex-col mb-10 ">
      <div className="flex justify-between items-center my-2">
        <div>
          <span className=" bg-[#DB4444] rounded p-2 mr-2" />
          {title ? title : ""}
        </div>
        {buttondata && (
          <button className="border border-[#7F7F7F] rounded px-4 py-2 hover:bg-[#D33333] hover:text-white pointer">
            {buttondata}
          </button>
        )}
      </div>
      <div className="cardcontainer flex gap-5 overflow-x-auto w-full p-2">
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
