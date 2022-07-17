import {
  ExclamationCircleIcon,
  CashIcon,
  ArrowRightIcon,
  XCircleIcon
} from "@heroicons/react/solid";
import { MailOpenIcon } from "@heroicons/react/outline";
import { useMemo } from "react";

var currencies = require("country-data").currencies;

function camel2title(camelCase) {
  // no side-effects
  return (
    camelCase
      // inject space before the upper case letters
      .replace(/([A-Z])/g, function (match) {
        return " " + match;
      })
      // replace first char with upper case
      .replace(/^./, function (match) {
        return match.toUpperCase();
      })
  );
}

const QuickActions = ({ store }) => {
  const milestones = ["region", "currency", "depositPaid", "paymentComplete"];
  const milestoneBookings = useMemo(() => {
    const milestoneCounts = new Array(milestones.length).fill(0);
    store.bookings.map((item, index) => {
      for (var i = 0; i < milestones.length; ++i) {
        if (store.bookings[index][milestones[i]]) {
          milestoneCounts[i] += 1;
        }
      }
    });
    return milestoneCounts;
  }, [store, milestones]);

  const steps = [
    { name: "Country", type: "COUNTRY" },
    { name: "Currency", type: "CURRENCY" },
    ...(store.depositPerc === 1
      ? [{ name: "Pay", type: "PAY" }]
      : [
          { name: "Deposit", type: "DEPOSIT" },
          { name: "Settle Up", type: "SETTLE" },
        ]),
    { name: "Order Completion", type: "COMPLETE" },
  ];
  //   .map((step, index) => ({
  //     ...step,
  //     id: `0${index + 1}`,
  //     status:
  //       activeStepIndex > index
  //         ? "complete"
  //         : activeStepIndex === index
  //         ? "current"
  //         : "upcoming",
  //   }));

  const completedBookings = store.bookings.filter(
    ({ paymentComplete }) => paymentComplete
  ).length;
  const cancelledBookings = store.bookings.filter(
    ({ cancelled }) => cancelled
  ).length;
  const stats = [
    {
      id: 1,
      name: "Total Funds Collected",
      stat: `$${store.allFundsInUSD.toFixed(0)} USD`,
      icon: CashIcon,
      changeType: "increase",
      extra: (
        <>
          <div className="">
            {Object.keys(store.fundsByCurrency).map((currency) => (
              <p key={currency}>
                {currency} :{" "}
                <span className="font-bold">
                  {currencies[currency].symbol}
                  {store.fundsByCurrency[currency].toFixed(2)}
                </span>
              </p>
            ))}
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-gray-800 px-4 py-4 sm:px-6">
            <button className="text-sm w-full flex items-center justify-between font-medium text-white hover:text-indigo-200">
              <p>Withdraw</p>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </>
      ),
    },
    {
      id: 2,
      name: "Order States",
      stat: `${completedBookings} completed`,
      icon: MailOpenIcon,
      changeType: "increase",
      extra: (
        <div className="space-y-2 relative">
          {milestones.map((milestone, i) => (
            <div key={milestone} className="flex w-full space-x-2">
              <div className="relative w-full">
                <div className="w-full bg-gray-800 rounded-full px-4 text-sm h-6" />
                <div
                  style={{
                    width: `${
                      (milestoneBookings[i] / store.bookings.length) * 100
                    }%`,
                  }}
                  className="absolute top-0 left-0w-full bg-indigo-500 rounded-full px-4 text-sm h-6 flex items-center"
                ></div>
                <div className="absolute top-0 left-0 mx-2 text-xs uppercase">
                  <p className="mt-1">{camel2title(milestone)} </p>
                </div>
              </div>
              <div className="">{milestoneBookings[i]}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 3,
      name: "Refunds requested",
      stat: 0,
      icon: ExclamationCircleIcon,
      changeType: "decrease",
      extra: (
        <>
          <dt>
            <div
              className={`absolute bg-red-500 rounded-md p-3`}
            >
              <XCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-100 truncate">
              Cancelled
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-white">{cancelledBookings}</p>
          </dd>
          <div className="absolute bottom-0 inset-x-0 bg-gray-800 px-4 py-4 sm:px-6">
            <button className="text-sm w-full flex items-center justify-between font-medium text-white hover:text-indigo-200">
              <p>View refund requests</p>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <dl className="m-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {stats.map((item, i) => (
          <div
            key={item.id}
            className="relative bg-gray-900 pt-5 px-4 pb-4 sm:pt-6 sm:px-6 rounded-lg overflow-hidden"
          >
            <dt>
              <div
                className={`absolute ${
                  i == 2 ? "bg-red-500" : "bg-indigo-500"
                } rounded-md p-3`}
              >
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-100 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-white">{item.stat}</p>
            </dd>
            {item.extra}
          </div>
        ))}
      </dl>
    </div>
  );
};

export default QuickActions;
