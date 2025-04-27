"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type FormValues = {
  product_id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  sellerName: string;
  sizes: string;
  colors: string;
  description: string;
  category: string;
};

const SellForm = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const sizes = Array.from(data.sizes.split(","));
    const colors = Array.from(data.colors.split(","));

    const raw = JSON.stringify({
      product_id: uuidv4(),
      productName: data.productName.replaceAll(" ", "%20"),
      productImage: data.productImage,
      productPrice: data.productPrice,
      sellerName: data.sellerName,
      discount: Math.round(0 + Math.random() * 45),
      sizes: sizes,
      colors: colors,
      description: data.description,
      category: data.category,
    });

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
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
      })
      .catch((error) => {
        toast.error(error);
      });

    reset();
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
        {...register("productPrice", { required: true })}
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
      <select
        required
        defaultValue={"default"}
        {...register("category", { required: true })}
        className="bg-[#F5F5F5] p-2 rounded "
      >
        <option value="default" disabled>
          Select product category
        </option>
        <option value="electronics">electronics</option>
        <option value="lifestyle">lifestyle</option>
        <option value="perfumes">perfumes</option>
        <option value="bicycle">bicycle</option>
        <option value="speakers">speaker</option>
        <option value="watches">watch</option>
        <option value="laptops&pcs">laptops & PC&apos;s</option>
        <option value="headphones">headphones</option>
        <option value="cameras">cameras</option>
        <option value="smartphones">smartphones</option>
        <option value="fitnessequipment">fitnessequipment</option>
        <option value="health&fitness">healthfitness</option>
        <option value="mens fashion">mens fashion</option>
        <option value="womens fashion">womens fashion</option>
      </select>
      <input
        type="submit"
        className="border border-[#B3B3B3] hover:bg-[#D33333] hover:text-white rounded py-2"
      />
    </form>
  );
};

export default SellForm;
