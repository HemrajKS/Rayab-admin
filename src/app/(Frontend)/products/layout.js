"use client";
import { usePathname, useSearchParams } from "next/navigation";

export default function Layout({ product, productId, editProd }) {
  const searchParams = useSearchParams();
  const prod = searchParams.get("productId");
  const edit = searchParams.get("edit");
  console.log(Boolean(edit));
  return <>{Boolean(prod) ? (edit ? editProd : productId) : product}</>;
}
