import { GlobeAltIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Header = ({ noLinks = false }) => {
  return (
    <header className="body-font max-w-6xl mx-auto">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center">
          <a className="flex items-center  mb-4 md:mb-0">
            <GlobeAltIcon className="w-10 h-10 text-white p-1 bg-indigo-500 rounded-full" />
            <span className="ml-3 text-2xl font-bold">Plutus</span>
          </a>
        </Link>
        {!noLinks && (
          <>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <Link href="/about">
                <a className="mr-5 hover:text-indigo-400">About</a>
              </Link>
              <Link href="/stats">
                <a className="mr-5 hover:text-indigo-400">Stats</a>
              </Link>
              <Link href="/bookings">
                <a className="mr-5 hover:text-indigo-400">Bookings</a>
              </Link>
            </nav>
            <Link href="/book">
              <button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-400 rounded text-base mt-4 md:mt-0">
                <PaperAirplaneIcon className="h-4 w-4 mr-1" />
                Book Now
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
