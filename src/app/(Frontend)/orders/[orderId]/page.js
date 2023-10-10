"use client";

import { urls } from "@/app/constants/constants";
import makeHttpRequest from "@/app/services/apiCall";
import { ArrowBack, Delete, Edit, LocationOn, Star } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Alert, Rating, Snackbar } from "@mui/material";
import RatingTable from "@/Containers/RatingTable/RatingTable";
import BasicModal from "@/Components/Modal/Modal";
import Link from "next/link";
import Pagination from "@/Components/Pagination/Pagination";
import { CircularIndeterminate } from "@/Components/Loaders/Loaders";
import ProductCards from "@/Containers/ProductCards/ProductCards";
import Dropdown from "@/Components/Dropdown/Dropdown";
import FullScreenLoader from "@/Components/FullScreenLoader/FullScreenLoader";

const OrderId = ({ params }) => {
  const router = useRouter();
  console.log(params);

  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productLoading, setProductLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [delLoading, setDelLoading] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [statusData, setStatusData] = useState("");
  const [toastStatus, setToastStatus] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const productsPerPage = 5;

  const totalPages = Math.ceil(
    ((data && data.products && data.products.length) || 0) / productsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        setProducts([]);
      }
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const pageProducts =
      data && data.products && data.products.slice(startIndex, endIndex);

    const fetchProductDetails = async (productId, qty) => {
      setProductLoading(true);
      setProducts([]);
      try {
        makeHttpRequest(`${urls.products}?id=${productId}`, "get")
          .then((res) => {
            setProductLoading(false);
            if (res.status === 200) {
              if (res?.data?.products) {
                return setProducts((prevProducts) => [
                  ...prevProducts,
                  { ...res?.data?.products, quantity: qty },
                ]);
              }
            }
          })
          .catch((err) => {
            setProductLoading(false);
            console.log(err);
          });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (pageProducts) {
      (async () => {
        for (const product of pageProducts) {
          await fetchProductDetails(product.product, product.quantity);
        }
      })();
    }
  }, [currentPage, data.products]);

  useEffect(() => {
    orderApi();
  }, []);

  const orderApi = () => {
    setLoading(true);
    makeHttpRequest(`${urls.getOrders}?id=${params.orderId}`, "get")
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (res?.data?.orders) {
            setData(res?.data?.orders);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const deleteOder = () => {
    setDelLoading(true);
    makeHttpRequest(`${urls.deleteOrder}`, "post", { id: params.orderId })
      .then((res) => {
        setDelLoading(false);
        if (res.status === 200) {
          router.push("/orders");
        }
      })
      .catch((err) => {
        setDelLoading(false);
        console.log(err);
        setToastStatus({
          open: true,
          message: err.message || "Could not Delete Order",
          severity: "success",
        });
      });
  };

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;

    for (const product of data.products) {
      totalQuantity += product.quantity;
    }
    return totalQuantity;
  };

  const orderStatusFunc = () => {
    setDelLoading(true);
    makeHttpRequest(`${urls.orderStatus}`, "post", {
      id: params.orderId,
      status: statusData,
    })
      .then((res) => {
        setDelLoading(false);
        if (res.status === 200) {
          setToastStatus({
            open: true,
            message: res.status.message || "Status updated successfully",
            severity: "success",
          });
          orderApi();
        }
      })
      .catch((err) => {
        setDelLoading(false);
        console.log(err);
        setToastStatus({
          open: true,
          message: err.message || "Could not Update Order",
          severity: "error",
        });
      });
  };

  return (
    <div className="overflow-auto h-full text-[#0b1c48] ">
      <div className="pl-[25px] pr-[20px] relative mb-[25px]">
        <div className="flex justify-between items-center">
          <div
            className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              router.push("/orders");
            }}
          >
            <ArrowBack sx={{ color: "#e47e52", fontSize: "26px" }} />
          </div>
          <div className="flex gap-[20px] items-center">
            {data.status && (
              <div>
                <Dropdown
                  name="status"
                  value={data.status}
                  onChange={(e) => {
                    setStatusData(e.target.value);
                    setStatusModal(true);
                  }}
                  list={[
                    { name: "pending" },
                    { name: "rejected" },
                    { name: "completed" },
                  ]}
                  customStyle={{ marginBottom: 0 }}
                />
              </div>
            )}
            <div
              className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <Delete sx={{ color: "#f05454", fontSize: "26px" }} />
            </div>
          </div>
        </div>
        {JSON.stringify(data) !== "{}" ? (
          <div className="mt-[20px]">
            <div className="flex gap-[20px] flex-wrap">
              <div className="bg-white rounded-[16px] flex flex-col shadow-md max-h-[calc(100vh-106px)] min-w-[450px] w-full xl:max-w-[calc(50%-10px)] h-[100%] p-[20px]">
                <div className="flex items-start flex-col ">
                  <div className="text-bold text-2xl mb-[10px]">
                    ID: {data._id}
                  </div>
                  {data.name && (
                    <div className="text-bold text-[18px] mb-[14px] mt-[10px]">
                      Ordered By:{" "}
                      <span className=" text-[#e47e52]">{data.name}</span>
                    </div>
                  )}
                  {data.totalPrice && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Worth:{" "}
                      <span className=" text-[#e47e52]">
                        {" "}
                        {data.currency ? data.currency : "INR"}{" "}
                        {data.totalPrice}
                      </span>
                    </div>
                  )}

                  {data.email && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Email Id:{" "}
                      <span className=" text-[#e47e52]"> {data.email}</span>
                    </div>
                  )}

                  {data.phone1 && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Phone No #1:{" "}
                      <span className=" text-[#e47e52]"> {data.phone1}</span>
                    </div>
                  )}

                  {data.phone2 && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Phone No #2:{" "}
                      <span className=" text-[#e47e52]"> {data.phone2}</span>
                    </div>
                  )}

                  {data.orderDate && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Ordered Date:{" "}
                      <span className=" text-[#e47e52]">
                        {" "}
                        {new Date(data.orderDate).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {data.updatedAt && (
                    <div className="text-bold text-[18px] mb-[14px]">
                      Last Updated:{" "}
                      <span className=" text-[#e47e52]">
                        {" "}
                        {new Date(data.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-[16px] flex flex-col shadow-md max-h-[calc(100vh-106px)] min-w-[450px] w-full xl:max-w-[calc(50%-10px)] h-[100%] p-[20px]">
                <div className="flex items-start flex-col overflow-auto max-h-[379px]">
                  <div className="text-bold text-2xl">Other Details</div>
                  {data.customerQuery && (
                    <div className="text-bold text-[18px] mb-[10px] mt-[10px]">
                      Customer Query:{" "}
                      <span className=" text-[#e47e52]">
                        {data.customerQuery}
                      </span>
                    </div>
                  )}

                  {data.address && (
                    <>
                      {data.address.country && (
                        <div className="text-bold text-[18px] mb-[8px]">
                          Country:{" "}
                          <span className=" text-[#e47e52]">
                            {data.address.country}
                          </span>
                        </div>
                      )}
                      {data.address.city && (
                        <div className="text-bold text-[18px] mb-[8px]">
                          City:{" "}
                          <span className=" text-[#e47e52]">
                            {data.address.city}
                          </span>
                        </div>
                      )}

                      {data.address.street && (
                        <div className="text-bold text-[18px] mb-[8px]">
                          Street:{" "}
                          <span className=" text-[#e47e52]">
                            {data.address.street}
                          </span>
                        </div>
                      )}

                      {data.address.postalCode && (
                        <div className="text-bold text-[18px] mb-[8px]">
                          Postal Code:{" "}
                          <span className=" text-[#e47e52]">
                            {data.address.postalCode}
                          </span>
                        </div>
                      )}

                      {data.address.coordinates && (
                        <a
                          href={`https://maps.google.com/?q=${data.address.coordinates.latitude},${data.address.coordinates.longitude}`}
                          target="_blank"
                          className="mb-[10px]"
                        >
                          <div className="rounded-full z-[999]  bg-slate-100 shadow-md w-[50px] h-[50px] flex items-center justify-center cursor-pointer">
                            <LocationOn
                              sx={{ color: "#f05454", fontSize: "26px" }}
                            />
                          </div>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[16px] shadow-md mt-[20px] p-[20px]">
              <div className="flex items-center justify-between">
                <div className="text-[26px] font-bold">Items</div>
                <div className="flex gap-[8px] items-center text-[#e47e52] text-bold text-[20px]">
                  Total Items: {calculateTotalQuantity()}
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-[20px] mt-[15px]">
                {products &&
                  products.length > 0 &&
                  products.map((prod, i) => (
                    <ProductCards
                      data={prod}
                      key={i}
                      index={i}
                      qty={prod.quantity}
                    />
                  ))}
              </div>
              {productLoading && <CircularIndeterminate />}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        ) : (
          !loading && (
            <div className="h-[calc(100vh-106px)] flex items-center justify-center text-[#e47e52] text-[26px]">
              Product Not Found..!
            </div>
          )
        )}
      </div>
      <BasicModal
        open={deleteModal}
        message={"Are you sure, you want to delete this Order?"}
        func={deleteOder}
        cancel={() => {
          setDeleteModal(false);
        }}
      />
      <BasicModal
        open={statusModal}
        message={`Are you sure, you want to change the status of this Order to ${statusData}?`}
        func={orderStatusFunc}
        cancel={() => {
          setStatusModal(false);
        }}
      />
      <FullScreenLoader open={delLoading} />
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

export default OrderId;
