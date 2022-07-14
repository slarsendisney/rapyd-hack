import { useCallback } from "react";
import { useBooking } from "../../context/booking-context";
import CurrencyChoice from "./form/Currency";
import WhereAndWhen from "./form/WhereAndWhen";

const labels = ["When and Where?", "Local Payment"];

const BookingStep = () => {
  const { activeStep } = useBooking();

  const FormDetail = useCallback(() => {
    switch (activeStep.type) {
      case "COUNTRY":
        return <WhereAndWhen />;
        case "CURRENCY":
        return <CurrencyChoice />;
    }
  }, [activeStep]);

  return <FormDetail />;
};

export default BookingStep;
