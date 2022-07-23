import { useCallback, useMemo } from "react";
import { useBooking } from "../../context/booking-context";
import Complete from "./form/Complete";
import CurrencyChoice from "./form/Currency";
import Deposit from "./form/Deposit";
import SettleUp from "./form/SettleUp";
import WhereAndWhen from "./form/WhereAndWhen";
import { m } from "framer-motion";

const BookingStep = () => {
  const { activeStep } = useBooking();

  const stepType = useMemo(() => activeStep.type, [activeStep]);

  const FormDetail = useMemo(() => {
    switch (stepType) {
      case "COUNTRY":
        return <WhereAndWhen />;
      case "CURRENCY":
        return <CurrencyChoice />;
      case "DEPOSIT":
        return <Deposit />;
      case "PAY":
        return <Deposit />;
      case "SETTLE":
        return <SettleUp />;
      case "COMPLETE":
        return <Complete />;
    }
  }, [stepType]);

  const FormWrapper = useCallback(
    () => (
      <m.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        {FormDetail}
      </m.div>
    ),
    [FormDetail]
  );

  return <FormWrapper />;
};

export default BookingStep;
