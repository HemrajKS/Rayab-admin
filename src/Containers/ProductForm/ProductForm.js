import Dropdown from "@/Components/Dropdown/Dropdown";
import Input from "@/Components/Input/Input";
import Textarea from "@/Components/Textarea/Textarea";
import makeHttpRequest from "@/app/services/apiCall";
import { sanitizeProduct } from "@/utils/utils";
import React, { useEffect, useRef, useState } from "react";
import Upload from "@/Components/Uploader/Upload";
import Button from "@/Components/Button/Button";
import { Close, Remove } from "@mui/icons-material";
import _ from "lodash";

const ProductForm = ({ data, edit, submitData }) => {
  const fieldsToRemove = [
    "addedBy",
    "__v",
    "createdAt",
    "updatedAt",
    "reviews",
    "rating",
  ];

  const [categories, setCategories] = useState([]);
  const [categoriesload, setCategoriesLoad] = useState([]);
  const [submitObj, setSubmitObj] = useState(
    sanitizeProduct(data, fieldsToRemove)
  );
  const [uploadImgLoading, setUploadImgLoading] = useState(false);
  const [uploadImgUrlLoading, setUploadImgUrlLoading] = useState(false);
  const [activeInfo, setActiveInfo] = useState("dimensions");

  const shipping = ["dimensions", "shippingCost", "weight"];

  const featureRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubmitObj({
      ...submitObj,
      [name]: value,
    });
  };

  useEffect(() => {
    categoryApi();
  }, []);

  useEffect(() => {
    submitData(submitObj);
  }, [submitObj]);

  const categoryApi = () => {
    setCategoriesLoad(true);
    makeHttpRequest(`/api/categories`, "get")
      .then((res) => {
        setCategoriesLoad(false);
        if (res.status === 200) {
          if (res?.data?.categories) {
            setCategories(res?.data?.categories);
          }
        }
      })
      .catch((err) => {
        setCategoriesLoad(false);
        console.log(err);
      });
  };

  const onDropHandler = (acceptedFiles, type) => {
    {
      mainImage: setUploadImgUrlLoading(true);
      otherImages: setUploadImgLoading(true);
    }
    [type];
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", "Product Image");

      makeHttpRequest(`/api/upload`, "post", formData)
        .then((res) => {
          if (res.status === 200) {
            if (res?.data?.data) {
              if (type === "mainImage") {
                setSubmitObj({
                  ...submitObj,
                  imageUrl: res?.data?.data,
                });
                setUploadImgLoading(false);
                setUploadImgUrlLoading(false);
              } else if (type === "otherImages") {
                const newState = { ...submitObj };
                if (!newState.images) {
                  newState.images = [];
                }
                newState.images.push(res?.data?.data);
                setSubmitObj(newState);
                setUploadImgLoading(false);
                setUploadImgUrlLoading(false);
              }
            }
          }
        })
        .catch((err) => {
          setUploadImgLoading(false);
          setUploadImgUrlLoading(false);
          console.log(err);
        });
    } else {
      alert("Only one file can be uploaded at once");
    }
  };

  const addFeature = () => {
    if (featureRef.current) {
      const feature = featureRef.current.value;
      if (feature !== "") {
        const newState = { ...submitObj };
        if (!newState.features) {
          newState.features = [];
        }

        newState.features.push(feature);
        setSubmitObj(newState);
      }
    } else {
      console.error("Input element not found.");
    }
  };

  const deleteFeature = (i) => {
    if (i !== -1) {
      const newState = { ...submitObj };
      newState.features.splice(i, 1);
      setSubmitObj(newState);
    }
  };

  const addShippingInfo = (e) => {
    setSubmitObj({
      ...submitObj,
      shippingInfo: {
        ...submitObj.shippingInfo,
        [activeInfo]: e.target.value,
      },
    });
  };

  return (
    <form className="flex gap-x-[20px] flex-wrap">
      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"name"}
          label={"Name"}
          value={submitObj.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)]">
        <Dropdown
          name={"category"}
          value={submitObj.category}
          onChange={handleChange}
          list={categories}
          label="Category"
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)]">
        <Textarea
          name={"description"}
          label={"Description"}
          value={submitObj.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"currency"}
          label={"Currency"}
          // value={submitObj.currency}
          value={"INR"}
          // onChange={handleChange}
          disabled
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"price"}
          label={"Price"}
          value={submitObj.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"stock"}
          label={"Stock"}
          value={submitObj.stock}
          onChange={handleChange}
          type={"number"}
          required
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"model"}
          label={"Model"}
          value={submitObj.model}
          onChange={handleChange}
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"color"}
          label={"Color"}
          value={submitObj.color}
          onChange={handleChange}
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"dimensions"}
          label={"Dimensions"}
          value={submitObj.dimensions}
          onChange={handleChange}
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"weight"}
          label={"Weight"}
          value={submitObj.weight}
          onChange={handleChange}
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"warranty"}
          label={"Warranty"}
          value={submitObj.warranty}
          onChange={handleChange}
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] ">
        <Input
          name={"manufacturer"}
          label={"Manufacturer"}
          value={submitObj.manufacturer}
          onChange={handleChange}
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] mb-[20px]">
        <div className="flex items-center gap-[20px]">
          <Input name={"features"} label={"Features"} inputRef={featureRef} />
          <Button name={"Add"} type={"button"} onClick={addFeature} />
        </div>
        {submitObj?.features?.map((feat, i) => {
          return (
            <div
              key={i}
              className="pl-[14px] min-w-[450px]  xl:max-w-[calc(50%-10px)] flex justify-between gap-[20px] pr-[14px]"
            >
              <span>
                {i + 1}. {feat}
              </span>{" "}
              <span
                onClick={() => {
                  deleteFeature(i);
                }}
                className="cursor-pointer text-[#e47e52]"
              >
                <Close />
              </span>
            </div>
          );
        })}
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)] mb-[20px]">
        {" "}
        <div>
          <Input
            name={"shippingInfo"}
            label={"Shipping Info"}
            value={
              submitObj?.shippingInfo && submitObj.shippingInfo[activeInfo]
            }
            onChange={addShippingInfo}
          />
          {/* <Button name={'Add'} type={'button'} /> */}
        </div>
        <div className="flex gap-[10px]">
          {shipping.map((item, i) => {
            return (
              <div
                key={i}
                className={`cursor-pointer px-[8px] py-[4px] rounded-md ${
                  item === activeInfo && "bg-[#e47e52] text-[white]"
                }`}
                onClick={() => {
                  setActiveInfo(item);
                }}
              >
                {_.startCase(item)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)]">
        <Upload
          onDropHandler={onDropHandler}
          url={submitObj.imageUrl}
          uploadImgLoading={uploadImgUrlLoading}
          type={"mainImage"}
          label={"Main Image"}
        />
      </div>

      <div className="min-w-[450px] w-full xl:max-w-[calc(50%-10px)]">
        <Upload
          onDropHandler={onDropHandler}
          url={submitObj.imageUrl}
          images={submitObj.images}
          uploadImgLoading={uploadImgLoading}
          type={"otherImages"}
          label={"Other Images"}
        />
      </div>
    </form>
  );
};

export default ProductForm;
