'use client';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookieValue = getCookie('logged-in');
    if (cookieValue === 'true') {
      setIsLoggedIn(true);
      setIsLoading(false);
      localStorage.setItem('logged-in', 'true');
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);

  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const login = () => {
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
