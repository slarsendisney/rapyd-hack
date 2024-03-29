import { CheckIcon } from "@heroicons/react/solid";
import { useBooking } from "../../context/booking-context";
import { m } from "framer-motion";

export default function BookingBreadcrumbs() {
  const { steps } = useBooking();
  return (
    <m.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-label="Progress"
    >
      <ol
        role="list"
        className="border border-accent-2 rounded-md divide-y divide-accent-2 md:flex md:divide-y-0 mb-4"
      >
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex-1 md:flex">
            {step.status === "complete" ? (
              <a href={step.href} className="group flex items-center w-full">
                <span className="px-6 py-4 flex items-center text-sm font-medium">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent-2 rounded-full">
                    <CheckIcon
                      className="w-6 h-6 text-site-text"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium">{step.name}</span>
                </span>
              </a>
            ) : step.status === "current" ? (
              <a
                href={step.href}
                className="px-6 py-4 flex items-center text-sm font-medium"
                aria-current="step"
              >
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-accent-2 rounded-full">
                  <span className="text-accent-2">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-accent-2">
                  {step.name}
                </span>
              </a>
            ) : (
              <a href={step.href} className="group flex items-center">
                <span className="px-6 py-4 flex items-center text-sm font-medium">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                    <span className=" group-hover:text-gray-200">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium  group-hover:text-gray-200">
                    {step.name}
                  </span>
                </span>
              </a>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="hidden md:block absolute top-0 right-0 h-full w-5"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </m.nav>
  );
}
