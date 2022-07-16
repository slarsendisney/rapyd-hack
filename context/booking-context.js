import React, { useState, useContext, useMemo, useEffect } from "react";
import LoadingSpinner from "../components/root/LoadingSpinner";
import { useAuth } from "./auth-context";
import { useStore } from "./store-context";

const BookingContext = React.createContext();

export const BookingProvider = ({ id, ...props }) => {
  const {
    user: { uid },
  } = useAuth();
  const { store, subdomain } = useStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  console.log(data);
  useEffect(() => {
    (async () => {
      const bookingInfo = await fetch(`/api/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      });
      const bookingData = await bookingInfo.json();
      setData(bookingData);
      setLoading(false);
    })();
  }, [id]);

  const autoSave = async (newData) => {
    if (data) {
      console.log("autoSaving");
      const bookingInfo = await fetch(
        `/api/booking/${id}?storeID=${subdomain}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${uid}`,
          },
          body: JSON.stringify(newData),
        }
      );
      const data = await bookingInfo.json();
      console.log(data);
      setData(data);
    }
  };

  const activeStepIndex = useMemo(() => {
    if (data) {
      const milestones = [
        "region",
        "currency",
        "depositPaid",
        "paymentComplete",
      ];
      for (var i = 0; i < milestones.length; ++i) {
        if (!data[milestones[i]]) {
          return i;
        }
      }
      return milestones.length;
    }

    return 0;
  }, [data]);

  const steps = [
    { name: "Country", type: "COUNTRY" },
    { name: "Currency", type: "CURRENCY" },
    ...(store.depositPerc === 1
      ? [{ name: "Pay", type: "PAY" }]
      : [
          { name: "Deposit", type: "DEPOSIT" },
          { name: "Settle Up", type: "SETTLE" },
        ]),
    { name: "Order completion", type: "COMPLETE" },
  ].map((step, index) => ({
    ...step,
    id: `0${index + 1}`,
    status:
      activeStepIndex > index
        ? "complete"
        : activeStepIndex === index
        ? "current"
        : "upcoming",
  }));

  const activeStep = steps[activeStepIndex];

  if (loading) {
    return <LoadingSpinner text="Gathering info..." />;
  }

  const nextStep = async (newData, noSave) => {
    const dataObj = { ...data, ...newData };

    if (!noSave) {
      await autoSave(dataObj);
    } else {
      setData(dataObj);
    }
  };

  const transactions = data?.rapyd?.transactions || [];

  const amountcollected = transactions.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0).toFixed(2);

  const totalAmount = data.localAmount || 0;

  const remainingBalance = (data.localAmount - amountcollected).toFixed(2);

  const percent = Math.min(Math.ceil((amountcollected / totalAmount) * 100),100);

  return (
    <BookingContext.Provider
      value={{
        activeStep,
        nextStep,
        steps,
        data: { ...data, remainingBalance, percent, amountcollected, transactions },
        bookingID: id[0],
        remainingBalance,
      }}
      {...props}
    />
  );
};

export const useBooking = () => useContext(BookingContext);

export default BookingContext;
