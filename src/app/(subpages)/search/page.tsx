"use client";
import { ProductInterface } from "@/types";
import Card from "@/components/Card";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  // const searchParams = useSearchParams();
  // const productName = searchParams.get("productName");
  const [products, setproducts] = useState<ProductInterface[]>();
  const [searchText, setsearchText] = useState<string>("");

  const fetchProducts = async (searchText: string) => {
    console.log("fetching");
    fetch(`http://localhost:3000/api/products?productName=${searchText}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result: ProductInterface[]) => setproducts(result))
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="px-2 rounded-md flex w-full bg-[#F5F5F5] items-center">
        <input
          type="text"
          value={searchText}
          className="focus:none px-2 py-2 w-full focus:outline-none text-foreground"
          onChange={(e) => setsearchText(e.target.value)}
          placeholder="What are you looking for?"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchProducts(searchText);
            }
          }}
        />
      </div>
      <div className="grid grid-cols-[repeat(4,auto)] xl:grid-cols-5 2xl:grid-cols-7 gap-x-8 gap-y-5 justify-center">
        {products &&
          products.length > 0 &&
          products.map((product) => {
            return (
              <div
                key={product.product_id}
                className="col-span-2 sm:col-span-1 xl:col-span-1"
              >
                <Card {...product} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default page;
