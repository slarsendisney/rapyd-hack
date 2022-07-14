import { CashIcon, RefreshIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { useBooking } from "../../../context/booking-context";
import { useStore } from "../../../context/store-context";
import LoadingSpinner from "../../root/LoadingSpinner";
import { m } from "framer-motion";

var currencies = require("country-data").currencies;

const Deposit = () => {
  const { nextStep, data, bookingID } = useBooking();
  const { store } = useStore();
  const {
    user: { uid },
  } = useAuth();
  const [accountloading, setAccountLoading] = useState(true);

  useEffect(() => {
    if (!data.rapyd) {
      (async () => {
        const bookingInfo = await fetch(`/api/generate-wallet`, {
          headers: {
            Authorization: `Bearer ${uid}`,
          },
          method: "POST",
          body: JSON.stringify({
            uuid: uid,
            bookingID: bookingID,
            currency: data.currency,
            countryCode: data.region,
          }),
        });
        const bookingData = await bookingInfo.json();
        nextStep(bookingData, false);
        setAccountLoading(false);
      })();
    } else {
      setAccountLoading(false);
    }
  }, []);

  if (accountloading || !data.rapyd) {
    return <LoadingSpinner text="Generating virtual account..." />;
  }

  const fireTestDeposit = async () => {
    const bookingInfo = await fetch(`/api/test-deposit`, {
      headers: {
        Authorization: `Bearer ${uid}`,
      },
      method: "POST",
      body: JSON.stringify({
        amount: store.depositPerc * data.localAmount,
        currency: data.rapyd.currency,
        issued_bank_account: data.rapyd.id,
        bookingID,
      }),
    });
    const bookingData = await bookingInfo.json();
    nextStep(bookingData, true);
  };

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6 mt-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6">Pay your deposit.</h3>
            <p className="mt-1 text-sm text-gray-200">
              It&apos;s now time to pay your deposit. Deposit for your{" "}
              {store.productName} is {store.depositPerc * 100}% of the total
              price.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2 space-y-4">
          <div className="bg-gray-900 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center space-x-1">
                <CashIcon className="h-6 w-6" />
                <h3 className="text-lg leading-6 font-medium ">
                  Pay the{" "}
                  <span className="font-bold">
                    {currencies[data.currency].symbol}
                    {(store.depositPerc * data.localAmount || 0).toFixed(2)}
                  </span>{" "}
                  ({currencies[data.currency].code}) deposit.
                </h3>
              </div>
              {data.rapyd && (
                <div className="mt-2 max-w-xl text-gray-300">
                  <p className="text-sm mb-1">
                    Pay into the following virtual account:
                  </p>
                  <div className=" w-full h-full rounded text-left text-md">
                    {Object.keys(data.rapyd.bank_account)
                      .sort()
                      .map((key) => (
                        <div key={key}>
                          <p className="text-white uppercase">
                            <span className="font-bold text-indigo-200">
                              {key.replace("_", " ")}
                            </span>
                            : {data.rapyd.bank_account[key]}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-900 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex space-x-2">
                <m.div
                  className="h-8 w-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <RefreshIcon className="h-8 w-8 text-green-400" />
                </m.div>
                <p>
                  We will continue to check for the transaction to appear and
                  advance this form when it is visible. Your progress so far has
                  been saved.
                </p>
              </div>
            </div>
          </div>
          <p className="text-right text-sm text-gray-400">
            You can also trigger a{" "}
            <a
              href="#"
              onClick={fireTestDeposit}
              className="text-indigo-300 hover:underline"
            >
              test deposit
            </a>{" "}
            here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
