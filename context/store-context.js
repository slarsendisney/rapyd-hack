import React, { useState, useContext, useMemo, useEffect } from "react";
import LoadingSpinner from "../components/root/LoadingSpinner";

const StoreContext = React.createContext();

const getSubdomain = () => {
  const { hostname } = window.location;
  const domainParts = hostname.split(".");
  if (domainParts.length >= 2 && domainParts[0] !== "www") {
    const [subdomain] = domainParts;
    return subdomain;
  }
  return null;
};

export const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);
  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    (async () => {
      const newSubdomain = getSubdomain();
      setSubdomain(newSubdomain);
      if (newSubdomain) {
        await fetch("/api/store-probe", {
          method: "POST",
          body: JSON.stringify({ subdomain: newSubdomain }),
        })
          .then((res) => res.json())
          .then((data) => setStore(data))
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      }
      setLoading(false);
    })();
  }, []);

  const defaultTheme = "theme-sub-standard";

  useEffect(() => {
    const root = document.body;
    if (store && store.theme) {
      root.classList.remove(defaultTheme);
      root.classList.add(`theme-${store.theme}`);
    } else {
      root.classList.add(defaultTheme);
    }
  }, [store, defaultTheme]);

  if (loading) {
    return <LoadingSpinner text="Loading your store..." />;
  }

  return (
    <StoreContext.Provider value={{ store, subdomain }}>
      <div>{children}</div>
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

export default StoreContext;
