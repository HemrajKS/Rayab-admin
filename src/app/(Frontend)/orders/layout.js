"use client";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();
  console.log(router);
  return <>{children}</>;
}
