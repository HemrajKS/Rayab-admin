"use client";
import FullScreenLoader from "@/Components/FullScreenLoader/FullScreenLoader";
import ProductForm from "@/Containers/ProductForm/ProductForm";
import { urls } from "@/app/constants/constants";
import makeHttpRequest from "@/app/services/apiCall";
import { ArrowBack } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = {
    productId: searchParams.get("productId"),
  };

  const productId = params.productId;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitObj, setSubmitObj] = useState({});

  useEffect(() => {
    productApi();
  }, []);

  const productApi = () => {
    setLoading(true);
    makeHttpRequest(`${urls.products}?id=${params.productId}`, "get")
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (res?.data?.products) {
            setData({ ...res?.data?.products, currency: "INR" });
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const submitData = (object) => {
    setSubmitObj(object);
  };

  const editApi = () => {
    setLoading(true);
    if (
      submitObj.name !== "" &&
      submitObj.description !== "" &&
      submitObj.category !== "" &&
      submitObj.price !== "" &&
      submitObj.currency !== "" &&
      submitObj.stock !== "" &&
      submitObj.imageUrl !== ""
    ) {
      makeHttpRequest(`${urls.updateProduct}`, "patch", {
        ...submitObj,
        id: productId,
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            if (res?.data?.data) {
              router.push(`/products?productId=${productId}`);
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      alert("Please enter all the required fields..!");
    }
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48] ">
      <div className="ml-[25px] mr-[20px] relative mb-[25px]">
        <div className="flex justify-between items-center">
          <div
            className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              router.push(`/products?productId=${productId}`);
            }}
          >
            {" "}
            <ArrowBack sx={{ color: "#e47e52", fontSize: "26px" }} />
          </div>
          <div
            className="cursor-pointer bg-[#e47e52] rounded-md text-white font-bold text-[18px] px-[18px] py-[6px] tracking-[1.5px]"
            onClick={() => {
              editApi();
            }}
          >
            Save
          </div>
        </div>
        <div className=" bg-white rounded-[16px] shadow-md my-[20px] p-[20px] h-[calc(100vh-192px)] overflow-auto">
          {JSON.stringify(data) !== "{}" ? (
            <div className="h-full ">
              <ProductForm data={data} edit submitData={submitData} />
            </div>
          ) : (
            !loading && (
              <div className="flex items-center justify-center text-[#e47e52] text-[26px] h-full">
                Product Not Found..!
              </div>
            )
          )}
        </div>
      </div>
      <FullScreenLoader open={loading} />
    </div>
  );
};

export default Page;
