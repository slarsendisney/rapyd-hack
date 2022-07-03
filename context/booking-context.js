import React, { useState, useContext, useMemo, useEffect } from "react";
import BookingStep from "../components/booking/BookingStep";
import LoadingSpinner from "../components/root/LoadingSpinner";
import { useAuth } from "./auth-context";

const BookingContext = React.createContext();

export const BookingProvider = ({ id, ...props }) => {
  const {
    user: { uid },
  } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const bookingInfo = fetch(`/api/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      });
      setData(bookingInfo);
      setLoading(false);
    })();
  }, [id]);

  const activeStep = useMemo(() => {
    if (data) {
      const milestones = [
        "launchDate",
        "currency",
        "deposit",
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

  if (loading) {
    return <LoadingSpinner text="Gathering info..." />;
  }

  const nextStep = (key) => {
    console.log("nextStep")
    const newData = {...data};
    newData[key] = true;
    setData(newData);
  };

  return (
    <BookingContext.Provider
      value={{
        activeStep,
        nextStep,
      }}
      {...props}
    />
  );
};

export const useBooking = () => useContext(BookingContext);

export default BookingContext;
