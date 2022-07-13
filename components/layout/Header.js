import {
  ArrowRightIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useAuth } from "../../context/auth-context";
import { useStore } from "../../context/store-context";

const Header = ({ noLinks = false }) => {
  const { user, logout } = useAuth();
  const { store } = useStore();
  console.log(store);
  return (
    <header className="body-font max-w-6xl mx-auto">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center">
          <a className="flex items-center  mb-4 md:mb-0">
            {store ? (
              <>
                {store.logo ? (
                  <img src={store.logo} className="w-12 h-12" />
                ) : (
                  <ShoppingBagIcon className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" />
                )}
              </>
            ) : (
              <GlobeAltIcon className="w-10 h-10 text-white p-1 bg-indigo-500 rounded-full" />
            )}
            <span className="ml-3 text-2xl font-bold">
              {store ? store.storeName : "PlutusPay"}
            </span>
          </a>
        </Link>
        {!noLinks && (
          <>
            {store ? (
              <>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                  <Link href="/bookings">
                    <a className="mr-5 hover:text-indigo-400">My Orders</a>
                  </Link>
                </nav>

                <Link href="/book">
                  <button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-400 rounded text-base mt-4 md:mt-0">
                    Buy Now
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </button>
                </Link>
              </>
            ) : (
              <>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                  <Link href="/stats">
                    <a className="mr-5 hover:text-indigo-400">Stats</a>
                  </Link>
                  <Link href="/stores">
                    <a className="mr-5 hover:text-indigo-400">My Stores</a>
                  </Link>
                </nav>
                {!user && (
                  <Link href="/create">
                    <button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-400 rounded text-base mt-4 md:mt-0">
                      <PaperAirplaneIcon className="h-4 w-4 mr-1" />
                      Create Store
                    </button>
                  </Link>
                )}
              </>
            )}

            {user && (
              <button onClick={logout}>
                <img
                  src={user.photoURL}
                  height={96}
                  width={96}
                  className="rounded-full h-8 w-8 ml-2"
                  alt="profile image"
                />
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
