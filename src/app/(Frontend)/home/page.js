"use client";
import MultiSelectDropdown from "@/Components/CheckBox/CheckBox";
import FullScreenLoader from "@/Components/FullScreenLoader/FullScreenLoader";
import Upload from "@/Components/Uploader/Upload";
import ProductCards from "@/Containers/ProductCards/ProductCards";
import { urls } from "@/app/constants/constants";
import makeHttpRequest from "@/app/services/apiCall";
import { Close, Edit, Save } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [homeData, setHomeData] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploadImgLoading, setUploadImgLoading] = useState(false);
  const [fullScrenLoad, setFullScreenLoad] = useState(false);
  const [toastStatus, setToastStatus] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const divRef = useRef(null);

  useEffect(() => {
    fetchHomeDetails();
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchHomeDetails = async () => {
    setFetchLoading(true);
    try {
      makeHttpRequest(`${urls.home}`, "get")
        .then((res) => {
          setFetchLoading(false);
          if (res.status === 200) {
            setHomeData(res.data?.data);
          }
        })
        .catch((err) => {
          setFetchLoading(false);
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching home details:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      makeHttpRequest(`${urls.products}`, "get")
        .then((res) => {
          if (res.status === 200) {
            setProducts(res.data?.products);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      makeHttpRequest(`${urls.categories}`, "get")
        .then((res) => {
          if (res.status === 200) {
            setCategories(res.data?.categories);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleDivClick = () => {
    setEditing(true);
    if (divRef.current) {
      divRef.current.contentEditable = "true";
      divRef.current.focus();
    }
  };

  const handleSaveClick = () => {
    if (divRef.current) {
      setEditing(false);
      divRef.current.contentEditable = "false";
      setHomeData((prev) => {
        return { ...prev, about: divRef.current.textContent };
      });
    }
  };

  const updateItem = (item, label) => {
    if (homeData[label].some((e) => e._id === item._id)) {
      const updatedProducts = homeData[label].filter(
        (product) => product._id !== item._id
      );

      setHomeData((prev) => {
        return { ...prev, [label]: updatedProducts };
      });
    } else {
      setHomeData((prev) => {
        return { ...prev, [label]: [...prev[label], item] };
      });
    }
  };

  const removeImg = (img) => {
    const updatedBanner = homeData?.banner.filter(
      (image) => image.banner !== img.banner
    );
    setHomeData((prev) => {
      return { ...prev, banner: updatedBanner };
    });
  };

  const onDropHandler = (acceptedFiles, type) => {
    setFullScreenLoad(true);
    console.log(acceptedFiles);
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", "Product Image");

      makeHttpRequest(`/api/upload`, "post", formData)
        .then((res) => {
          if (res.status === 200) {
            if (res?.data?.data) {
              const newState = { ...homeData };
              if (!newState.images) {
                newState.images = [];
              }
              newState.banner.push({ banner: res?.data?.data });
              setHomeData(newState);
              setFullScreenLoad(false);
            }
          }
        })
        .catch((err) => {
          setFullScreenLoad(false);
          console.log(err);
        });
    } else {
      alert("Only one file can be uploaded at once");
    }
  };

  const submit = () => {
    setFullScreenLoad(true);
    makeHttpRequest(`/api/home/update`, "patch", homeData)
      .then((res) => {
        setFullScreenLoad(false);
        if (res.status === 200) {
          setHomeData(res?.data?.data);
          setToastStatus({
            open: true,
            message: res?.data?.message || "Home Page Updated Successfully",
            severity: "success",
          });
        }
      })
      .catch((err) => {
        setFullScreenLoad(false);
        setToastStatus({
          open: true,
          message: err.message || "Couldn't update Home Page",
          severity: "error",
        });
        console.log(err);
      });
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48] overflow-x-hidden">
      <div className="pl-[25px] pr-[20px] flex  flex-col w-full justify-between">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <div className="text-[28px] font-bold ">Home Page</div>
            <div className="text-[18px] text-[#e47e52] ">
              Customize landing page here
            </div>
          </div>
          <div
            onClick={submit}
            className="cursor-pointer bg-[#e47e52] px-[16px] hover:scale-105 transition-all ease-in shadow-md py-[4px] text-white text-[20px] rounded-[6px]"
          >
            Save
          </div>
        </div>
        <div className="flex flex-col mt-[18px] bg-white shadow-lg rounded-[14px] p-[24px]">
          <div className="text-[24px] font-[600] flex items-center justify-between gap-[24px] mb-[12px]">
            <span>Banner</span>
          </div>
          <div className="text-[#e47e52]">
            *Please upload images having aspect ratio 2:1
          </div>
          <Upload
            onDropHandler={onDropHandler}
            uploadImgLoading={uploadImgLoading}
            type={"otherImages"}
            label={"Other Images"}
          />
          <div className="flex flex-wrap gap-[20px]">
            {homeData?.banner?.map((img, i) => (
              <div key={i} className="relative">
                <Image src={img.banner} alt="banner" width={300} height={200} />
                <div
                  onClick={() => {
                    removeImg(img);
                  }}
                  className="absolute top-[-10px] right-[-10px] bg-[#e47e52] cursor-pointer shadow-md rounded-[50%]"
                >
                  <Close sx={{ color: "white" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-[18px] bg-white shadow-lg rounded-[14px] p-[24px]">
          <div className="text-[24px] font-[600] flex items-center justify-between gap-[24px] mb-[12px]">
            <span> About Us </span>
            {isEditing ? (
              <button
                onClick={handleSaveClick}
                className="shadow-md p-[10px] h-[46px] w-[46px] rounded-[50%] flex items-center justify-center"
              >
                <Save style={{ color: "#e47e52" }} />
              </button>
            ) : (
              <button
                onClick={handleDivClick}
                className="shadow-md p-[10px] h-[46px] w-[46px] rounded-[50%] flex items-center justify-center"
              >
                <Edit
                  style={{
                    color: "#e47e52",
                  }}
                />
              </button>
            )}
          </div>
          <div>
            <div
              ref={divRef}
              onClick={handleDivClick}
              contentEditable={isEditing}
              dangerouslySetInnerHTML={{ __html: homeData.about }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col mt-[18px] bg-white shadow-lg rounded-[14px] p-[24px]">
          <div className="text-[24px] font-[600] flex items-center justify-between gap-[24px] mb-[12px]">
            <span>Top Products</span>
          </div>
          <MultiSelectDropdown
            originalItem={products || []}
            item={homeData?.products || []}
            label="products"
            updateItem={updateItem}
          />
          <div className="flex gap-[20px] flex-wrap pt-[20px]">
            {homeData?.products?.map((item, i) => {
              return <ProductCards data={item} key={i} />;
            })}
          </div>
        </div>
        <div className="flex flex-col mt-[18px] bg-white shadow-lg rounded-[14px] p-[24px] mb-[24px]">
          <div className="text-[24px] font-[600] flex items-center justify-between gap-[24px] mb-[12px]">
            <span>Top Categories</span>
          </div>
          <MultiSelectDropdown
            originalItem={categories || []}
            item={homeData?.categories || []}
            label="categories"
            updateItem={updateItem}
          />
          <div className="flex gap-[20px] flex-wrap pt-[20px]">
            {homeData?.categories?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="text-[18px]  cursor-pointer text-white max-[768px]:!text-[15px] bg-[#e47e52] px-[10px] rounded-md shadow-md hover:scale-105 transition-all ease-in py-[4px]"
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <FullScreenLoader open={fullScrenLoad} />
      <Snackbar
        open={toastStatus.open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => {
          setToastStatus({
            open: false,
            severity: "",
            message: "",
          });
        }}
      >
        <Alert severity={toastStatus.severity} sx={{ width: "100%" }}>
          {toastStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
