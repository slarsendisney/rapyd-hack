import { useState } from "react";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import {
  CashIcon,
  RefreshIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useBooking } from "../../../context/booking-context";
import { m } from "framer-motion";
import { useAuth } from "../../../context/auth-context";
import { useModal } from "../../../context/modal-context";
import WarningModal from "../../root/Modal";
var countries = require("country-data").countries;
var currencies = require("country-data").currencies;

const TransactionList = ({ transactions, currencySimple }) => {
  return (
    <div className="bg-site-background-light shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y-2 divide-gray-800">
        {transactions.map((position, i) => {
          const date = new Date(position.created_at * 1000);
          const dateString = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          return (
            <li key={position.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">
                    {currencySimple}
                    {position.amount.toFixed(2)} {position.currency}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Recieved
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-site-text">
                      <InformationCircleIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-site-text"
                        aria-hidden="true"
                      />
                      {i == 0 ? "Initial Deposit" : "Transfer In"}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-site-text"
                      aria-hidden="true"
                    />
                    <p>{dateString}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const SettleUp = () => {
  const { nextStep, data, bookingID } = useBooking();
  const {
    user: { uid },
  } = useAuth();
  const { openModal, closeModal } = useModal();
  const currency = countries[data.region].currencies[0];
  const currencySimple = currencies[currency].symbol;

  const circumference = 99 * 2 * Math.PI;

  const fireTestDeposit = async () => {
    const bookingInfo = await fetch(`/api/test-deposit`, {
      headers: {
        Authorization: `Bearer ${uid}`,
      },
      method: "POST",
      body: JSON.stringify({
        amount: data.remainingBalance/data.localAmount < 0.5 ? data.remainingBalance : data.localAmount/2,
        currency: data.rapyd.currency,
        issued_bank_account: data.rapyd.id,
        bookingID,
      }),
    });
    const bookingData = await bookingInfo.json();
    nextStep(bookingData, true);
  };

  const submit = () => {
    nextStep({ paymentComplete: true });
  };

  const finalizeCancel = () => {
    closeModal()
    nextStep({ cancelled: true });
    
  }

  const onCancelClick = () => {
    openModal(
      <WarningModal
        title="Cancel Order"
        cta="Cancel"
        body="Are you wish you to cancel this order? Doing so will send a refund request to the store owner."
        onCancel={closeModal}
        onClick={finalizeCancel} 
      />
    );
  };
  return (
    <div>
      <div className="bg-site-background-light shadow sm:rounded-lg mb-4">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex space-x-2">
            <m.div
              className="h-6 w-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <RefreshIcon className="h-6 w-6 text-green-400" />
            </m.div>
            <p>
              We will continue to check for transactions to appear and advance
              this form when the total amount has been reached.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-site-background-light shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-site-text">
              <h3 className="text-lg font-medium text-center leading-6 mb-6">
                Remaining balance: {currencySimple}
                {data.remainingBalance}
              </h3>
              <div className="relative flex items-center justify-center overflow-hidden rounded-full">
                <svg className="w-[220px] h-[220px] mx-auto">
                  <circle
                    className="text-primary-dark"
                    strokeWidth="15"
                    stroke="currentColor"
                    fill="transparent"
                    r="100"
                    cx="110"
                    cy="110"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="15"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                      circumference - (data.percent / 100) * circumference
                    }
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="100"
                    cx="110"
                    cy="110"
                  />
                </svg>
                <div className="absolute top-[35%]  text-center w-full flex flex-col items-center">
                  <p className="text-3xl font-bold">{data.percent}%</p>
                  <p className="text-lg uppercase">
                    {currencySimple}
                    {data.amountcollected}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-site-background-light shadow sm:rounded-lg px-4 py-5 sm:p-6 text-site-text">
            <div className="mt-2 max-w-xl text-sm text-site-text">
              {data.rapyd && (
                <div className="mt-2 max-w-xl text-site-text">
                  <p className="text-sm mb-1">
                    Pay into the following virtual account:
                  </p>
                  <div className=" w-full h-full rounded text-left text-md">
                    {Object.keys(data.rapyd.bank_account)
                      .sort()
                      .map((key) => (
                        <div key={key}>
                          <p className="text-site-text uppercase">
                            <span className="font-bold text-primary">
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
        </div>
        <div className="space-y-4">
          <div className="">
            <TransactionList
              transactions={data.transactions}
              currencySimple={currencySimple}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onCancelClick}
              type="button"
              className="inline-flex items-center space-x-1 justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-800 bg-red-300 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              {" "}
              <TrashIcon className="h-5 w-5" />
              <p>Cancel Booking</p>
            </button>
            <button
              onClick={() => data.percent >= 100 && submit()}
              type="button"
              className={`${
                data.percent >= 100
                  ? "text-primary-dark bg-primary-light hover:bg-primary"
                  : "text-gray-500 bg-gray-100 hover:bg-gray-200 cursor-not-allowed"
              } inline-flex items-center space-x-1 justify-center px-4 py-2 border border-transparent font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
            >
              <CashIcon className="h-5 w-5" />
              <p>Finalize Purchase</p>
            </button>
          </div>
          {!(data.percent >= 100) && (
            <p className="text-right text-sm text-site-text">
              You can also trigger a{" "}
              <a
                onClick={fireTestDeposit}
                className="text-accent-1 hover:underline cursor-pointer"
              >
                test transaction
              </a>{" "}
              here!
            </p>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default SettleUp;
