import { GlobeAltIcon } from "@heroicons/react/outline";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Header = () => {
  return (
    <header className="body-font max-w-6xl mx-auto">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center"
        >
          <div className="flex items-center  mb-4 md:mb-0">
            <GlobeAltIcon className="w-10 h-10 text-white p-1 bg-indigo-500 rounded-full" />
            <span className="ml-3 text-2xl font-bold">Plutus</span>
          </div>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-indigo-400">First Link</a>
          <a className="mr-5 hover:text-indigo-400">Second Link</a>
          <a className="mr-5 hover:text-indigo-400">Third Link</a>
        </nav>
        <button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-400 rounded text-base mt-4 md:mt-0">
          Book Now
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </button>
      </div>
    </header>
  );
};
export default Header;
