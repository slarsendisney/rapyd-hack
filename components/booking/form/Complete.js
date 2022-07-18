import { CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useCurrency } from "../../../context/currency-context";

const Complete = () => {
  const { region } = useCurrency();

  return (
    <div className="flex flex-col items-center">
      <div className="bg-site-background-light shadow sm:rounded-lg max-w-lg mx-auto">
        <div className="px-4 py-5 sm:p-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-site-text">
              Order complete.
            </h3>
            <div className="mt-2">
              <p className="text-sm text-site-text">
                Your payment has now been finalized and your order is complete.
                You can view your order details via your dashboard.
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

export default Complete;
