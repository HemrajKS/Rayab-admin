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
  //

  return <div>Hello</div>;
};

export default OrderId;
