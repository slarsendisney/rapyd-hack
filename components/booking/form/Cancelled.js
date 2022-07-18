import { CheckCircleIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useAuth } from "../../../context/auth-context";
import { useStore } from "../../../context/store-context";

const Cancelled = ({ id, currency, payoutProvided }) => {
  const {
    user: { uid },
  } = useAuth();

  const { subdomain } = useStore();

  const generatePayout = async () => {
    const data = await fetch("/api/generate-payout", {
      method: "POST",
      body: JSON.stringify({
        uid,
        currency,
        complete_url: `https://${subdomain}.plutuspay.app/api/payout/${id}`,
        cancel_url: `https://${subdomain}.plutuspay.app/book/${id}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error fetching payout link");
      })
      .catch((err) => {
        alert(err);
      });
      // console.log(data)
    window.open(data.redirect_url, "_self");
  };

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
              {payoutProvided ? (
                <>
                  <p className="text-sm text-gray-200">
                    Order <span className="text-indigo-300">{id}</span> has been
                    cancelled.
                  </p>
                  <div className="flex space-x-2 text-left border-t mt-6 pt-6">
                    <CheckCircleIcon className="text-green-400 w-12 inline-block" />
                    <p>
                      We have recieved your bank account details and will
                      distribute your payout shortly.
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-200">
                  Order <span className="text-indigo-300">{id}</span> has been
                  cancelled. Any funds that you transferred to the virtual
                  account will be returned 3 to 5 days after providing your bank
                  details for payout.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {!payoutProvided ? (
        <div className="mt-5 sm:mt-6 grid md:grid-cols-2 gap-4 w-full max-w-lg">
          <Link href="/bookings" type="button">
            <button className="btn-secondary-lg">View Your orders</button>
          </Link>

          <button
            onClick={generatePayout}
            type="button "
            className=" btn-primary-lg"
          >
            Provide Bank Details
          </button>
        </div>
      ): (
        <Link href="/bookings" type="button">
        <button className="btn-secondary-lg mt-4">View Your orders</button>
      </Link>
      )}
    </div>
  );
};

export default Cancelled;
