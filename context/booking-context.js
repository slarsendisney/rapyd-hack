import React, { useState, useContext, useMemo, useEffect } from "react";

const BookingContext = React.createContext();

export const BookingProvider = ({ ...props }) => {
  const [activeStep, setActiveStep] = useState(0);

  

  return (
    <BookingContext.Provider
      value={{
        activeStep,
      }}
      {...props}
    />
  );
};

export const useBooking = () => useContext(BookingContext);

export default BookingContext;
