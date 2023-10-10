"use client";
import { useSearchParams } from "next/navigation";

export default function Layout({ orderId, orders }) {
  const searchParams = useSearchParams();
  const order = searchParams.get("orderId");

  return <>{Boolean(order) ? orderId : orders}</>;
}
