import { useState } from "react";
import { useBooking } from "../../../context/booking-context";
import { useCurrency } from "../../../context/currency-context";

const Complete = () => {
  const { region } = useCurrency();
  const { nextStep } = useBooking();
  const [userDesiredRegion, setUserDesiredRegion] = useState(region);
  const [userSelectRegion, setUserSelectRegion] = useState(false);

  return (
    <div>
      <div className="bg-gray-900 shadow sm:rounded-lg max-w-lg mx-auto">
        <div className="px-4 py-5 sm:p-6">
          
        </div>
      </div>
    </div>
  );
};

export default Complete;
