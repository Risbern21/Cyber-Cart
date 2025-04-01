"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

type FormValues = {
  productName: String;
  productImage: String;
  ProductPrice: Number;
  sellerName: String;
  stars: Number;
  sizes: String;
  colors: String;
  description: String;
  category: String;
};

const SellForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const sizes = Array.from(data.sizes.split(","));
    const colors = Array.from(data.colors.split(","));

    const raw = JSON.stringify({
      productName: data.productName.replaceAll(" ", "%20"),
      productImage: data.productImage,
      productPrice: data.ProductPrice,
      sellerName: data.sellerName,
      sizes: sizes,
      colors: colors,
      description: data.description,
      category: data.category,
    });

    fetch("http://localhost:3000/api/sellProducts", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        toast.success(result.message, {
          duration: 2000,
        });
        setTimeout(() => {
          router.push(`/products/${data.productName}`);
        }, 2000);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Toaster richColors={true} />
      <input
        type="text"
        placeholder="productName"
        {...register("productName", { required: true })}
        className="bg-[#F5F5F5] p-2 rounded"
      />
      <input
        type="text"
        placeholder="productImage"
        {...register("productImage", { required: true })}
        className="bg-[#F5F5F5] p-2 rounded"
      />
      <input
        type="text"
        placeholder="ProductPrice"
        {...register("ProductPrice", { required: true })}
        className="bg-[#F5F5F5] p-2 rounded"
      />
      <input
        type="text"
        placeholder="sellerName"
        {...register("sellerName", { required: true })}
        className="bg-[#F5F5F5] p-2 rounded"
      />
      <input
        type="text"
        placeholder="sizes(ex:xl,xxl)"
        {...register("sizes", {})}
        className="bg-[#F5F5F5] p-2 rounded"
      />
      <input
        type="text"
        placeholder="colors(ex:white,blue or hex colors)"
        {...register("colors", {})}
        className="bg-[#F5F5F5] p-2 rounded"
      />
      <textarea
        placeholder="Description"
        {...register("description", { required: true, maxLength: 500 })}
        className="bg-[#F5F5F5] p-2 rounded resize-none w-full"
      />
      <input
        type="text"
        placeholder="category"
        {...register("category", { required: true })}
        className="bg-[#F5F5F5] p-2 rounded "
      />
      <input type="submit" className="border border-[#B3B3B3] hover:bg-[#D33333] hover:text-white rounded py-2"/>
    </form>
  );
};

export default SellForm;
