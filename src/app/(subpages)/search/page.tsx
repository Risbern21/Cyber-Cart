"use client";
import { ProductInterface } from "@/types";
import Card from "@/components/Card";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const category = searchParams.getAll("category");

  const [products, setproducts] = useState<ProductInterface[]>();
  const [searchText, setsearchText] = useState<string>(category[0]);

  // if (category) setsearchText(category[0]);

  const fetchProducts = async (searchText: string) => {
    let status: number;
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?productName=${searchText}`,
      {
        method: "GET",
        redirect: "follow",
      }
    )
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((result) => {
        if (status == 200) setproducts(result);
        else toast.error(result.message, { duration: 2000 });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchProducts(searchText);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Toaster richColors={true} />
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

export default Page;
