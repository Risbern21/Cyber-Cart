"use client";
import React, { useEffect, useState } from "react";
import Mapper from "../Mapper";

interface relatedProductsProps {
  category: string;
}

interface card {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  category: string;
  stars?: number;
  reviews: number;
  discount: number;
  eye: boolean;
}

const relatedProducts = ({ category }: relatedProductsProps) => {
  const [relatedProducts, setrelatedProducts] = useState<Array<card>>([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      category: category,
    });

    fetch("http://localhost:3000/api/searchRelatedProducts", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setrelatedProducts(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {relatedProducts && (
        <Mapper title="Related Items" cards={relatedProducts} />
      )}
    </div>
  );
};

export default relatedProducts;
