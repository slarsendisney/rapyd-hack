import { useMemo, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { useBooking } from "../../../context/booking-context";
import { useCurrency } from "../../../context/currency-context";
import { useStore } from "../../../context/store-context";
var countries = require("country-data").countries;

const countryDropdown = countries.all
  .filter(({ emoji }) => emoji)
  .map(({ alpha2, name, emoji }) => ({ alpha2, name, emoji }));

const WhereAndWhen = () => {
  const { region } = useCurrency();
  const { nextStep } = useBooking();
  const { store } = useStore();
  const { user } = useAuth();
  const [userDesiredRegion, setUserDesiredRegion] = useState(region);
  const [userSelectRegion, setUserSelectRegion] = useState(false);
  const [initialInfo, setInitialInfo] = useState({ email: user.email });
  const hasInitialInfo = useMemo(() => {
    const requiredKeys = [];
    if (store.collectAddress) {
      requiredKeys.push("address");
      requiredKeys.push("city");
      requiredKeys.push("state");
      requiredKeys.push("zip");
    }
    if (store.collectDate) {
      requiredKeys.push("date");
    }
    if (store.collectEmail) {
      requiredKeys.push("email");
    }
    const keys = Object.keys(initialInfo);
    return requiredKeys.every((key) => keys.includes(key));
  }, []);
  const [submittedInitial, setSubmittedInitial] = useState(hasInitialInfo);
  const onSubmit = () => {
    nextStep({
      region: userDesiredRegion,
    });
  };

  const initialSubmit = () => {
    setSubmittedInitial(true);
  };

  const onInitialInfoChange = (info) => {
    setInitialInfo(info);
  };

  if (!hasInitialInfo && !submittedInitial) {
    return (
      <div className="px-4 py-5 sm:p-6 bg-site-background-light shadow sm:rounded-lg">
        <div>
          <h3 className="text-lg leading-6 font-medium">
            Personal Information
          </h3>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          {store.collectEmail && (
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={initialInfo.email}
                  className="input"
                  onChange={(e) =>
                    onInitialInfoChange({ email: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {store.collectAddress && (
            <>
              <div className="sm:col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium"
                >
                  Street address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="input"
                    onChange={(e) =>
                      onInitialInfoChange({ address: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium">
                  City
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="input"
                    onChange={(e) =>
                      onInitialInfoChange({ city: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium">
                  State / Province
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="input"
                    onChange={(e) =>
                      onInitialInfoChange({ state: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="input"
                    onChange={(e) =>
                      onInitialInfoChange({ zip: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-5 flex justify-end space-x-3">
          <button
            onClick={() => initialSubmit()}
            type="button"
            className="btn-primary"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {userSelectRegion ? (
        <div className="bg-site-background-light shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg leading-6 font-medium ">
                Country Selection
              </h3>
            </div>
            <div className="mt-2 max-w-xl text-sm text-site-text">
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
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-primary-dark bg-primary-light hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Submit {countries[userDesiredRegion].emoji}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-site-background-light shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg leading-6 font-medium ">
                {countries[region].name}
              </h3>
            </div>
            <div className="mt-2 max-w-xl text-sm text-site-text">
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
                className="inline-flex items-center text-primary justify-center px-4 py-2 border border-transparent font-medium rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                No 👎
              </button>
              <button
                onClick={() => onSubmit()}
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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
