import { useEffect, useState } from "react";
import LoadingSpinner from "../root/LoadingSpinner";

const StatsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner text="Calculating stats..." />;
  }

  const allFundsInUSD = data.reduce((acc, curr) => {
    const { allFundsInUSD } = curr;
    return acc + allFundsInUSD;
  }, 0).toFixed(2);

  const bookingCount = data.reduce((acc, curr) => {
    const { bookings } = curr;
    return acc + bookings.length;
  }, 0);

  const completedBookingCount = data.reduce((acc, curr) => {
    const { bookings } = curr;
    const completedBookings = bookings.filter(
      (booking) => booking.paymentComplete
    );
    return acc + completedBookings.length;
  }, 0);

  const cancelledBookingCount = data.reduce((acc, curr) => {
    const { bookings } = curr;
    const cancelledBookings = bookings.filter((booking) => booking.cancelled);
    return acc + cancelledBookings.length;
  }, 0);

  const inProgressBookingCount = data.reduce((acc, curr) => {
    const { bookings } = curr;
    const cancelledBookings = bookings.filter((booking) => !booking.cancelled && !booking.paymentComplete);
    return acc + cancelledBookings.length;
  }, 0);

  const storeViewCount = data.reduce((acc, curr) => {
    const { views } = curr;
    return acc + views;
  }, 0);

  const avgDepositPercentage =
    (
      data.reduce((acc, curr) => {
        const { depositPerc } = curr;
        return acc + depositPerc;
      }, 0) / data.length
    ).toFixed(2) *
      100 +
    "%";

  const mostPopularRegion = data.reduce((acc, curr) => {
    const { bookings } = curr;
    bookings.forEach(({ region }) => {
      if (acc[region]) {
        acc[region] += 1;
      } else {
        acc[region] = 1;
      }
    });
    return acc;
  }, {});

  const mostPopularCurrency = data.reduce((acc, curr) => {
    const { bookings } = curr;
    bookings.forEach(({ currency }) => {
      if (acc[currency]) {
        acc[currency] += 1;
      } else {
        acc[currency] = 1;
      }
    });
    return acc;
  }, {});

  return (
    <div className="flex ">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 mb-1">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2">
            <h2 className="mb-0 text-base uppercase">Store Stats</h2>
          </div>
          <div className="col-span-2 h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              ${allFundsInUSD}
            </h2>
            <h3>USD Funds collected</h3>
          </div>
          <div className="col-span-2 h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              {avgDepositPercentage}
            </h2>
            <h3>Average Deposit Percentage</h3>
          </div>
          <div className="h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              {data.length}
            </h2>
            <h3>Stores Created</h3>
          </div>
          <div className="h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              {storeViewCount}
            </h2>
            <h3>Store Views</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2">
            <h2 className="mb-0 text-base uppercase">Booking Stats</h2>
          </div>

          <div className="h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              {bookingCount}
            </h2>
            <h3>Orders Created</h3>
          </div>
          <div className="h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              {completedBookingCount}
            </h2>
            <h3>Orders Completed</h3>
          </div>
          <div className="h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              {cancelledBookingCount}
            </h2>
            <h3>Orders Cancelled</h3>
          </div>
          <div className="h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              {inProgressBookingCount}
            </h2>
            <h3>Orders In Progress</h3>
          </div>

          <div className="h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              {Object.keys(mostPopularRegion)[0]}
            </h2>
            <h3>Most popular region</h3>
          </div>
          <div className="h-32 justify-center text-center text-white bg-secondary-dark rounded p-4 flex flex-col items-center">
            <h2 className="mb-0 text-xl md:text-2xl lg:text-3xl font-bold">
              {Object.keys(mostPopularCurrency)[0]}
            </h2>
            <h3>Most popular currency</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
