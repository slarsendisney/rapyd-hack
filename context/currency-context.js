import React, { useState, useContext, useMemo, useEffect } from "react";

const CurrencyContext = React.createContext();

export const CurrencyProvider = ({ ...props }) => {
  const [preferredCurrency, setPreferredCurrency] = useState(false);
  useEffect(() => {
    (async () => {
      const { chargeCurrency } = await fetch("/api/currency-probe").then(
        (res) => res.json()
      );
      console.log({chargeCurrency})
      setPreferredCurrency(chargeCurrency);
    })();
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        preferredCurrency,
      }}
      {...props}
    />
  );
};

export const useCurrency = () => useContext(CurrencyContext);

export default CurrencyContext;
