const BookingSteps = ({ stepCompleted = 2 }) => {
  const steps = [
    { content: "$", label: "Dates" },
    { content: "$", label: "Currency" },
    { content: "", label: "Deposit" },
    { content: "", label: "Settle Up" },
    { content: "🚀", label: "Trip Finalized" },
  ];
  return (
    <ul className="steps mt-12">
      {steps.map((step, index) => {
        const isCompleted = index < stepCompleted;
        return (
          <li
            data-content={isCompleted ? "✓" : step.content}
            key={index}
            className={`step ${isCompleted ? "step-primary" : ""}`}
          >
            {step.label}
          </li>
        );
      })}
    </ul>
  );
};

export default BookingSteps;
