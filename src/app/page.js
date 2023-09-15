"use client";
import PrivateRoute from "@/contexts/PrivateRoute";

export default function Home() {

  return (
    <PrivateRoute>
      <h1>Welcome to home page</h1>
    </PrivateRoute>
  );
}
