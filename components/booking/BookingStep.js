import { useCallback } from "react";
import { useBooking } from "../../context/booking-context";
import CurrencyChoice from "./form/Currency";
import WhereAndWhen from "./form/WhereAndWhen";

const labels = ["When and Where?", "Local Payment"];

const BookingStep = () => {
  const { activeStep } = useBooking();

  const FormDetail = useCallback( () => {
    switch (activeStep) {
      case 0:
        return <WhereAndWhen />;
      case 1:
        return <CurrencyChoice />;
    }
  }, [activeStep]);

  return (
    <div className="grid md:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
      <div className="w-full bg-indigo-400 text-indigo-600 h-24 md:h-72 rounded-md md:col-span-2 p-4 md:p-8 flex items-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
          {activeStep + 1}.{" "}
          <span className="text-white opacity-70">{labels[activeStep]}</span>
        </h1>
      </div>
      <div className="md:col-span-4">
        <FormDetail />
      </div>
    </div>
  );
};

export default BookingStep;
