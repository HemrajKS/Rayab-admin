"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookieValue = getCookie("logged-in");
    if (cookieValue === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  // const login = () => {
  //   setIsLoggedIn(true);
  //   // You may also set user information here if needed
  // };

  // const logout = () => {
  //   setIsLoggedIn(false);
  //   // Clear user information if necessary
  // };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        // , login, logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
