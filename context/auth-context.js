import React, { useState, useContext, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import Login from "../components/full-page/Login/Login";
import LoadingSpinner from "../components/root/LoadingSpinner";
import Layout from "../components/layout/Layout";
import useFirebase from "../hooks/useFirebase";

const AuthContext = React.createContext();

const publicRoutes = ["/"];

export const AuthProvider = ({ ...props }) => {
  const router = useRouter();
  useFirebase();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const authRequired = useMemo(() => {
    if (publicRoutes.includes(router.pathname)) {
      return false;
    }
    return true;
  }, [router.pathname]);

  const logout = () => {
    auth.signOut();
  }

  console.log(user)
  return (
    <AuthContext.Provider
      value={{
        logout,
        user,
      }}
    >
      {loading ? (
        <Layout noLinks>
          <LoadingSpinner text="Loading..." />
        </Layout>
      ) : !user && authRequired ? (
        <Login />
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
