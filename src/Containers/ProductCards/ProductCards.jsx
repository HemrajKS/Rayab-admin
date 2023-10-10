import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCards = ({ data, index, qty }) => {
  const router = useRouter();
  return (
    <div
      key={index}
      className="bg-white flex cursor-pointer w-[100%] max-w-[calc(20%-16px)] min-w-[200px] p-[16px] rounded-[14px] shadow-md items-center flex-col"
      onClick={() => {
        router.push(`/products?productId=${data._id}`);
      }}
    >
      <div className="h-[130px] relative">
        <Image
          src={data.imageUrl}
          blurDataURL={data.imageUrl}
          alt={data.name}
          loading="lazy"
          placeholder="blur"
          width={500}
          height={450}
          className="rounded-[10px] h-full object-cover"
        />
        <div
          className={`absolute top-[6px] right-[6px] ${
            qty ? "text-[#0b1c48]" : "text-white"
          } bg-[#e47e52] py-[1.5px] px-[8px] rounded-[6px]`}
        >
          {qty ? qty : data.stock}
        </div>
      </div>
      <div className="font-bold text-[16px] mt-[10px] truncate w-full text-center">
        {" "}
        {data.name}
      </div>
      <div className="font-thin text-[14px] text-gray-400 truncate w-full text-center">
        {data.category}
      </div>
    </div>
  );
};

export default ProductCards;
