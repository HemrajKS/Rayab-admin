import PrivateRoute from "@/contexts/PrivateRoute";
import Image from "next/image";

export default function Home() {
  return (
    <PrivateRoute>
      <h1>Welcome to dashboard page</h1>
    </PrivateRoute>
  );
}
