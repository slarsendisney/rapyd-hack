import { PaperAirplaneIcon, ShoppingBagIcon } from "@heroicons/react/solid";

import Link from "next/link";
import { useStore } from "../../context/store-context";

const StoreHero = () => {
  const { store } = useStore();

  return (
    <section className="body-font">
      <div className="container mx-auto flex px-5 py-12 md:py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <div className="flex justify-center pointer-events-none md:-my-12">
            <picture className="w-full aspect-auto max-h-[700px] h-full object-fit-cover rounded">
              <img
                src={store.hero}
                className="w-full md:w-4/5 aspect-auto max-h-[700px] h-full object-fit-cover rounded"
              />
            </picture>
          </div>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-5xl mb-4 font-bold ">
            {store.productName}
          </h1>
          <p className="mb-8 leading-relaxed">{store.heroInfo}</p>
          <div className="flex justify-center space-x-3">
            <Link href="/book">
              <button className="flex items-center space-x-1 text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-light rounded text-lg">
                <PaperAirplaneIcon className="h-5 w-5" /> <span>Buy Now</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreHero;
