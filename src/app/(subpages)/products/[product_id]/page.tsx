import React from "react";
import MainPage from "@/components/products/MainPage";

export default async function page({
  params,
}: {
  params: Promise<{ product_id: string }>;
}) {
  const { product_id } = await params;

  return (
    <div>
      <MainPage product_id={product_id}/>
    </div>
  );
}
