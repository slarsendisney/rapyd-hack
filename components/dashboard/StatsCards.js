import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StatsCard = ({ store }) => {
  const bookingCount = store.bookings.length;
  const completedBookings = store.bookings.filter(
    ({ paymentComplete }) => paymentComplete
  ).length;


  const stats = [
    {
      name: "Total Orders Started",
      stat: bookingCount,
      previousStat: "0",
      change: "100%",
      changeType: "increase",
    },
    {
      name: "Avg. Completion Rate",
      stat: ((completedBookings * 100) / bookingCount).toFixed(2) +"%",
      previousStat: "0%",
      change: ((completedBookings * 100).toFixed(2) / bookingCount).toFixed(2) +"%",
      changeType: "increase",
    },
    {
      name: "Site Views",
      stat: store.views? store.views : 0,
      previousStat: 0,
      change: "100%",
      changeType: "increase",
    },
  ];

  return (
    <div>
      <dl className="m-4 w-full grid grid-cols-1 rounded-lg bg-gray-900 overflow-hidden shadow divide-y divide-gray-800 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-white">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-300">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-100">
                  from {item.previousStat}
                </span>
              </div>

              <div
                className={classNames(
                  item.changeType === "increase"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                  "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                  by
                </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default StatsCard;
