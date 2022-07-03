import { useBooking } from "../../context/booking-context";

const BookingBreadcrumbs = () => {
  const { activeStep } = useBooking();
  const steps = [
    { content: "🗓", label: "Dates" },
    { content: "$", label: "Currency" },
    { content: "😇", label: "Deposit" },
    { content: "👍", label: "Settle Up" },
    { content: "🚀", label: "Trip Finalized" },
  ];
  return (
    <div className="max-w-3xl mx-auto w-full">
    <ul className="steps my-12 text-white max-w-3xl w-full border-gray-900 mx-auto">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        return (
          <li
            data-content={isCompleted ? "✓" : undefined}
            key={index}
            className={`step ${isCompleted ? "step-primary" : ""}`}
          >
            {step.label}
          </li>
        );
      })}
    </ul>
    </div>
  );
};

export default BookingBreadcrumbs;
