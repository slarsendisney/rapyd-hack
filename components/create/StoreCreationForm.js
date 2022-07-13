import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { v4 as uuidv4 } from "uuid";

import Link from "next/link";
import LoadingSpinner from "../../components/root/LoadingSpinner";

const Divider = () => (
  <div className="hidden sm:block" aria-hidden="true">
    <div className="py-5">
      <div className="border-t border-gray-700" />
    </div>
  </div>
);

const UploadFileWrapper = ({ children }) => (
  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 bg-black border-dashed rounded-md">
    <div className="space-y-1 text-center">
      <svg
        className="mx-auto h-12 w-12 "
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex text-sm flex-col">{children}</div>
    </div>
  </div>
);

const FormWrapper = ({ title, description, children }) => (
  <div className="mt-10 sm:mt-0">
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6">{title}</h3>
          <p className="mt-1 text-sm ">{description}</p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-gray-900 sm:p-6 flex">{children}</div>
        </div>
      </div>
    </div>
  </div>
);
export const StoreCreationForm = () => {
  const {
    user: { uid, displayName },
  } = useAuth();

  const storage = getStorage();

  const [data, setData] = useState({ depositPerc: 0.1 });
  const [loading, setLoading] = useState(false);
  const [subDomain, setSubDomain] = useState(null);
  const [uploadLogoFile, uploadingLogo, , logoError] = useUploadFile();
  const [uploadHeroFile, uploadingHero, , heroError] = useUploadFile();

  const onChange = (e) => {
    const value =
      e.target.type === "number"
        ? parseInt(e.target.value)
        : e.target.type === "range"
        ? parseFloat(e.target.value)
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const toggeleCheckbox = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const onSubmit = async (e) => {
    const requiredFields = ["amount", "storeName", "productName"];
    const missingFields = requiredFields.filter(
      (field) => !data[field] || data[field] === ""
    );
    if (missingFields.length > 0) {
      e.preventDefault();
      alert(`Missing fields: ${missingFields.join(", ")}`);
    } else {
      setLoading(true);
      const uniqueID = uuidv4();
      const { logo, heroImage, ...rest } = data;
      const additionalInfo = {};
      if (data.logo) {
        const ext = data.logo.name.split(".")[1];
        const logoRef = ref(storage, `${uniqueID}-logo.${ext}`);
        await uploadLogoFile(logoRef, data.logo);
        const logoURL = await getDownloadURL(logoRef);
        additionalInfo.logo = logoURL;
      }
      if (data.heroImage) {
        const ext = data.heroImage.name.split(".")[1];
        const heroRef = ref(storage, `${uniqueID}-hero.${ext}`);
        await uploadHeroFile(heroRef, data.heroImage);
        const heroURL = await getDownloadURL(heroRef);
        additionalInfo.hero = heroURL;
      }

      fetch("/api/generate-store", {
        method: "POST",
        body: JSON.stringify({ ...rest, ...additionalInfo, uid }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Store with that name already exists");
        })
        .then((res) => {
          setLoading(false);
          setSubDomain(res.subdomain);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    }
  };

  if (loading || uploadingLogo || uploadingHero) {
    return <LoadingSpinner text="Creating Store" />;
  }

  if (subDomain) {
    return (
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
    );
  }
  return (
    <>
      <Divider />
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-3 px-4 sm:px-0 mb-4">
            <h1 className=" text-4xl font-bold">Create a store</h1>
          </div>
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6">
                Store Information
              </h3>
              <p className="mt-1 text-sm ">
                This information will be displayed publicly so be careful!
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-gray-900 space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3">
                    <label
                      htmlFor="storeName"
                      className="block text-sm font-medium mb-1"
                    >
                      Store Name
                    </label>
                    <input
                      type="text"
                      name="storeName"
                      id="storeName"
                      className="input"
                      onChange={onChange}
                      value={data.storeName}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="subdomain"
                      className="block text-sm font-medium"
                    >
                      Site Subdomain
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-600 text-gray-200 text-sm">
                        http://
                      </span>
                      <input
                        type="text"
                        name="subdomain"
                        id="subdomain"
                        className="input-basic"
                        placeholder="subdomain"
                        onChange={onChange}
                        value={data.subdomain}
                      />
                      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-700 bg-gray-600 text-gray-200 text-sm">
                        .plutupay.app
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="heroInfo"
                    className="block text-sm font-medium"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="heroInfo"
                      name="heroInfo"
                      type="text"
                      rows={3}
                      className="input"
                      placeholder="you@example.com"
                      defaultValue={""}
                      onChange={onChange}
                      value={data.about}
                    />
                  </div>
                  <p className="mt-2 text-sm">
                    Brief description of this site for the hero.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium">Logo</label>
                  <UploadFileWrapper>
                    <div className="flex text-sm ">
                      <label
                        htmlFor="logo"
                        className="relative cursor-pointer  rounded-md font-medium text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="logo"
                          name="logo"
                          type="file"
                          className="sr-only"
                          accept=".png,.jpg,.jpeg"
                          onChange={onChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 3mb
                    </p>
                  </UploadFileWrapper>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Hero photo
                  </label>
                  <UploadFileWrapper>
                    <div className="flex text-sm ">
                      <label
                        htmlFor="heroImage"
                        className="relative cursor-pointer  rounded-md font-medium text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="heroImage"
                          name="heroImage"
                          type="file"
                          className="sr-only"
                          accept=".png,.jpg,.jpeg"
                          onChange={onChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 3mb
                    </p>
                  </UploadFileWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />

      <FormWrapper
        title="Product Information"
        description="Details about your product."
      >
        <div className="grid grid-cols-6 gap-6 w-full">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="productName" className="block text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              className="input"
              onChange={onChange}
              value={data.productName}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="productID" className="block text-sm font-medium">
              Product ID
            </label>
            <input
              disabled={true}
              type="text"
              name="productID"
              id="productID"
              className="input cursor-not-allowed"
              value={data.productName && data.productName.toUpperCase().replace(/[^a-zA-Z0-9]/g, "")}
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium"
            >
              Product Description
            </label>
            <input
              type="text"
              name="productDescription"
              id="productDescription"
              className="input"
              onChange={onChange}
              value={data.productDescription}
            />
          </div>
          <div className="col-span-6">
            <label htmlFor="amount" className="block text-sm font-medium">
              Product Price ($USD)
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="input"
              onChange={onChange}
              value={data.amount}
            />
          </div>
          <div className="col-span-6">
            <label htmlFor="depositPerc" className="block text-sm font-medium">
              Deposit Amount
            </label>
            <input
              id="depositPerc"
              name="depositPerc"
              type="range"
              min="0"
              max="1"
              step={0.1}
              defaultValue={0.1}
              value={data.depositPerc}
              onChange={onChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <label className="block text-sm text-center">
              {data.depositPerc ? data.depositPerc * 100 : 10}%{" "}
              {data.amount &&
                `($${data.amount * (data.depositPerc || 0.1)}USD)`}
            </label>
          </div>
        </div>
      </FormWrapper>

      <Divider />

      <FormWrapper
        title="Checkout Configuration"
        description=" Additional configuration options for checkout."
      >
        <div className="grid grid-cols-2 gap-6">
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
      </FormWrapper>

      <div className="hidden sm:block mt-8">
        <div className="flex justify-end">
          <button
            className="btn-primary-lg flex items-center"
            onClick={onSubmit}
          >
            Save
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </>
  );
};
