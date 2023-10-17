"use client";
import MultiSelectDropdown from "@/Components/CheckBox/CheckBox";
import Upload from "@/Components/Uploader/Upload";
import ProductCards from "@/Containers/ProductCards/ProductCards";
import { urls } from "@/app/constants/constants";
import makeHttpRequest from "@/app/services/apiCall";
import { Edit, Save } from "@mui/icons-material";
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

  const divRef = useRef(null);

  useEffect(() => {
    fetchHomeDetails();
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("object123", homeData);
  }, [homeData]);

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

  const onDropHandler = (acceptedFiles, type) => {
    setUploadImgLoading(true);

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
              setUploadImgLoading(false);
            }
          }
        })
        .catch((err) => {
          setUploadImgLoading(false);
          console.log(err);
        });
    } else {
      alert("Only one file can be uploaded at once");
    }
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48] overflow-x-hidden">
      <div className="pl-[25px] pr-[20px] flex  flex-col w-full justify-between">
        <div className="text-[28px] font-bold ">Home Page</div>
        <div className="text-[18px] text-[#e47e52] ">
          Customize landing page here
        </div>
        <div className="flex flex-col mt-[18px] bg-white shadow-lg rounded-[14px] p-[24px]">
          <div className="text-[24px] font-[600] flex items-center justify-between gap-[24px] mb-[12px]">
            <span>Banner</span>
          </div>
          <Upload
            onDropHandler={onDropHandler}
            // images={homeData?.banner?.map((obj) => {
            //   obj.banner;
            // })}
            uploadImgLoading={uploadImgLoading}
            type={"otherImages"}
            label={"Other Images"}
          />
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
        </div>
      </div>
    </div>
  );
};

export default Home;
