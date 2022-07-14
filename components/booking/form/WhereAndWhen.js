import { useState } from "react";
import { useBooking } from "../../../context/booking-context";
import { useCurrency } from "../../../context/currency-context";
var countries = require("country-data").countries;

const countryDropdown = countries.all
  .filter(({ emoji }) => emoji)
  .map(({ alpha2, name, emoji }) => ({ alpha2, name, emoji }));

const WhereAndWhen = () => {
  const { region } = useCurrency();
  const { nextStep } = useBooking();
  const [userDesiredRegion, setUserDesiredRegion] = useState(region);
  const [userSelectRegion, setUserSelectRegion] = useState(false);
  const onSubmit = () => {
    nextStep({
      region: userDesiredRegion,
    });
  };

  return (
    <div>
      {userSelectRegion ? (
        <div className="bg-gray-900 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg leading-6 font-medium ">
                Country Selection
              </h3>
            </div>
            <div className="mt-2 max-w-xl text-sm text-gray-300">
              <p>Please select your country from the following dropdown.</p>
            </div>
            <div>
              <select
                id="location"
                name="location"
                className="input"
                placeholder="Select your country"
                value={userDesiredRegion}
                onChange={(e) => setUserDesiredRegion(e.target.value)}
              >
                {countryDropdown.map((country) => (
                  <option key={country.alpha2} value={country.alpha2}>
                    {country.emoji} {country.name}
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
                Submit {countries[userDesiredRegion].emoji}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg leading-6 font-medium ">
                {countries[region].name}
              </h3>
            </div>
            <div className="mt-2 max-w-xl text-sm text-gray-300">
              <p>
                {" "}
                First we need to establish your country. It looks like you are
                in <span className="font-bold">{countries[region].name}</span>.
                Is that correct?
              </p>
            </div>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                onClick={() => setUserSelectRegion(true)}
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
                Yes {countries[region].emoji}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhereAndWhen;
