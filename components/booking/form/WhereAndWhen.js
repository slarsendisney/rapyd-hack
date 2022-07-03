import { useBooking } from "../../../context/booking-context";
import { useCurrency } from "../../../context/currency-context";
var countries  = require('country-data').countries

const WhereAndWhen = () => {
  const { region } = useCurrency();
  const {nextStep} = useBooking()

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-2xl">
        First we need to establish your country of origin. <br /> It looks like
        you are in {countries[region].name}. Is that correct?
      </p>
      <div className="flex space-x-2">
        <button>Yes</button>
        <button>No</button>
      </div>
      <p className="text-2xl">
        Thanks. We have 3 scheduled space flights leaving your country that are
        currently available for booking.
      </p>
      <div className="flex space-x-2">
        <button>27th June 2024</button>
        <button>27th July 2024</button>
        <button>27th August 2024</button>
      </div>
      <button onClick={() => nextStep("launchDate")}>
        Submit
      </button>
    </div>
  );
};

export default WhereAndWhen;