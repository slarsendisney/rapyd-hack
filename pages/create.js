import { CheckCircleIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/root/LoadingSpinner";
import { useAuth } from "../context/auth-context";

export default function Book() {
  const {
    user: { uid, displayName },
  } = useAuth();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [subDomain, setSubDomain] = useState(null);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const toggeleCheckbox = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const onSubmit = (e) => {
    const requiredFields = ["amount", "storeName", "productName"];
    const missingFields = requiredFields.filter(
      (field) => !data[field] || data[field] === ""
    );
    if (missingFields.length > 0) {
      e.preventDefault();
      alert(`Missing fields: ${missingFields.join(", ")}`);
    } else {
      setLoading(true);

      fetch("/api/generate-store", {
        method: "POST",
        body: JSON.stringify({ ...data, uid }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Store with that name already exists");
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
          setSubDomain(res.subdomain);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Head>
        <title>Booking</title>
        <meta name="description" content="Generated with Plutus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {loading ? (
          <LoadingSpinner text="Creating Store" />
        ) : subDomain ? (
          <div className="max-w-4xl mx-auto py-12">
            <div className=" flex items-center justify-center space-x-4">
              <CheckCircleIcon className="text-green-400 h-12" />
              <h1 className="text-2xl">
                Your store has been created at{" "}
                <a
                  className="text-indigo-400"
                  href={`http://${subDomain}.plutuspay.app`}
                >
                  {subDomain}.plutuspay.app
                </a>
              </h1>
            </div>
            <Link href="/stores">
              <button className="primary-button mx-auto block">
                View your stores
              </button>
            </Link>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto py-12">
            <div className="grid grid-cols-1 gap-6">
              <h1 className="text-2xl font-medium">
                Hey{" "}
                <span className="text-indigo-400 font-bold">{displayName}</span>
                , let&apos;s get your store up and running...
              </h1>
              <label className="block">
                <span className="">Store name</span>
                <input
                  name="storeName"
                  type="text"
                  className="input"
                  placeholder=""
                  value={data.storeName}
                  onChange={onChange}
                />
              </label>
              <label className="block">
                <span className="">Product name</span>
                <input
                  name="productName"
                  value={data.productName}
                  type="text"
                  className="input"
                  placeholder=""
                  onChange={onChange}
                />
              </label>
              <label className="block">
                <span className="">Product cost (USD)</span>
                <input
                  name="amount"
                  value={data.amount}
                  step={10}
                  className="input"
                  onChange={onChange}
                />
              </label>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={data.collectDate}
                        name="collectDate"
                        onChange={toggeleCheckbox}
                      />
                      <span className="ml-2">Collect Event Date</span>
                    </label>
                  </div>{" "}
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={data.collectAddress}
                        name="collectAddress"
                        onChange={toggeleCheckbox}
                      />
                      <span className="ml-2">Collect Delivery Address</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={data.collectEmail}
                        name="collectEmail"
                        onChange={toggeleCheckbox}
                      />
                      <span className="ml-2">Collect Email</span>
                    </label>
                  </div>
                </div>
              </div>
              <button onClick={onSubmit}>Submit</button>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
