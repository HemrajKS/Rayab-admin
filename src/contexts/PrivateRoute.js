"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const query = useSearchParams();
  const redirect = query.get("redirect");

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        if (pathname !== "/login") {
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
      } else {
        if (pathname === "/login") {
          if (redirect) {
            router.push(redirect);
          } else {
            router.push("/dashboard");
          }
        } else if (pathname === "/") {
          router.push("/dashboard");
        }
      }
    }
  }, [isLoggedIn, isLoading]);

  return isLoading ? "Loading..." : children;
};

export default PrivateRoute;
