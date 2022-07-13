import React from "react";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";

const DashboardHeader = ({ table = [] }) => {
  return (
    <div className="flex w-full justify-between">
      <div className="relative w-1/2">
        <SearchIcon className="absolute top-0 left-0 ml-3.5 mt-2.5 h-6 w-6" />
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          className="input-with-icon "
          placeholder="Search Stores"
          //   value={query}
          //   onChange={handleInputChange}
        />
      </div>
      <div className="flex space-x-4 items-center">
        <div>
          <p className="whitespace-nowrap text-lg text-gray-400">
            <span className="font-medium">{table.length} of 10</span> stores
            created
          </p>
        </div>
        <Link href="/create">
          <button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-400 rounded text-base md:mt-0">
            New <PlusCircleIcon className="ml-2 h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
