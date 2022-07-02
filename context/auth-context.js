import React, { useState, useContext, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import Login from "../components/full-page/Login/Login";

const AuthContext = React.createContext();

const publicRoutes = ["/"];

export const AuthProvider = ({ ...props }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  const authRequired = useMemo(() => {
    if (publicRoutes.includes(router.pathname)) {
      return false;
    }
    return true;
  }, [router.pathname]);
  if (!isLoggedIn && authRequired) {
    return <Login login={login} />;
  }
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
      }}
      {...props}
    />
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
