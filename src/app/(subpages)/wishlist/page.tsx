import React from "react";
import { CardsContainers } from "./WishlistCardData";
import Mapper from "@/components/Mapper";

const page = () => {
  return (
    <div className="px-5 sm:px-20 py-5">
      <div className="flex flex-col mt-10">
        {CardsContainers.map((CardsContainer, index) => {
          return (
            <div key={index} className="flex justify-center">
              <Mapper {...CardsContainer} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
