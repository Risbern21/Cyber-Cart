"use client";
import React, { useEffect, useState } from "react";
import Mapper from "../Mapper";
import { ProductInterface } from "@/types";

interface relatedProductsProps {
  category: string;
}

const relatedProducts = ({ category }: relatedProductsProps) => {
  const [relatedProducts, setrelatedProducts] = useState<
    Array<ProductInterface>
  >([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(`http://localhost:3000/api/relatedProducts?category=${category}`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result: ProductInterface[]) => {
        if (result) setrelatedProducts(result);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {relatedProducts[0] && (
        <Mapper cards={relatedProducts} Title="Related Items" />
      )}
    </div>
  );
};

export default relatedProducts;
