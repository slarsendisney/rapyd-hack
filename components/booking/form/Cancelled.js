import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useCurrency } from "../../../context/currency-context";

const Cancelled = ({ id }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-900 shadow sm:rounded-lg max-w-lg mx-auto">
        <div className="px-4 py-5 sm:p-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <XIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-white">
              Order Cancelled.
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-200">
                Order <span className="text-indigo-300">{id}</span> has been
                cancelled. Any funds that you transferred to the virtual account
                will be returned within 3 to 5 days.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <Link href="/bookings" type="button">
          <button className="btn-primary-lg">View your orders</button>
        </Link>
      </div>
    </div>
  );
};

export default Cancelled;
