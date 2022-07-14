import { useState } from "react";
import { useBooking } from "../../../context/booking-context";
var countries = require("country-data").countries;
var currencies = require("country-data").currencies;

const currencyDropdown = currencies.all.map(({ symbol, code, name }) => ({
  symbol,
  code,
  name,
}));

const CurrencyChoice = () => {
  const { nextStep, data } = useBooking();
  const currency = countries[data.region].currencies[0];
  const currencyName = currencies[currency].name;

  const [userDesiredCurrency, setUserDesiredCurrency] = useState(currency);

  const [userSelectCurrency, setUserSelectCurrency] = useState(false);

  const onSubmit = () => {
    nextStep({
      currency: userDesiredCurrency,
    });
  };

  return (
    <div>
      {userSelectCurrency ? (
        <div className="bg-gray-900 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg leading-6 font-medium ">
                Want currency would you like to use?
              </h3>
            </div>
            <div className="mt-2 max-w-xl text-sm text-gray-300">
              <p>
                Please select your desired currency from the following dropdown.
              </p>
            </div>
            <div>
              <select
                id="location"
                name="location"
                className="input"
                placeholder="Select your country"
                value={userDesiredCurrency}
                onChange={(e) => setUserDesiredCurrency(e.target.value)}
              >
                {currencyDropdown.map((currency) => (
                  <option key={currency.symbol} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                onClick={() => onSubmit()}
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Pay in {userDesiredCurrency}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg leading-6 font-medium ">
                Want to pay in {currencyName}?
              </h3>
            </div>
            <div className="mt-2 max-w-xl text-sm text-gray-300">
              <p>
                As you have told us you are in{" "}
                <span className="font-bold">{countries[data.region].name}</span>
                , we assume you want to pay in {currencyName}. Is that correct?
              </p>
            </div>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                onClick={() => setUserSelectCurrency(true)}
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                No 👎
              </button>
              <button
                onClick={() => onSubmit()}
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Yes 👍
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyChoice;
