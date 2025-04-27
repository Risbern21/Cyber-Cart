import React from "react";
import MainPage from "@/components/orders/MainPage";

const page = async ({
  params,
}: {
  params: Promise<{ customer_id: string }>;
}) => {
  const { customer_id } = await params;

  return <MainPage customer_id={customer_id} />;
};

export default page;
