import React, { useState, useContext, useMemo, useEffect } from "react";

const CurrencyContext = React.createContext();

export const CurrencyProvider = ({ ...props }) => {
  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [region, setRegion] = useState("US")
  const [currencies, setCurrencies] = useState(["USD"])
  useEffect(() => {
    (async () => {
      const { chargeCurrency, availableCurrencies, region} = await fetch("/api/currency-probe").then(
        (res) => res.json()
      );
      setPreferredCurrency(chargeCurrency);
      setCurrencies(availableCurrencies)
      setRegion(region)
    })();
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        preferredCurrency,
        currencies,
        region
      }}
      {...props}
    />
  );
};

export const useCurrency = () => useContext(CurrencyContext);

export default CurrencyContext;
