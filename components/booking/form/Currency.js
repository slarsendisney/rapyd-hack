import { useBooking } from "../../../context/booking-context";
import { useCurrency } from "../../../context/currency-context";

const CurrencyChoice = () => {
  const { region } = useCurrency();
  const { nextStep } = useBooking();

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-2xl">Currency</p>
      <button onClick={() => nextStep("currency")}>Submit</button>
    </div>
  );
};

export default CurrencyChoice;
