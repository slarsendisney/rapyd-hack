import { useEffect, useRef } from "react";
import { PaperAirplaneIcon, CalendarIcon } from "@heroicons/react/solid";
let Globe = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

const Hero = () => {
  const globeEl = useRef();
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.6;
  }, []);
  return (
    <section className=" body-font">
      <div className="container mx-auto flex px-5 py-12 md:py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <div className="flex justify-center pointer-events-none -my-12">
            <Globe
              ref={globeEl}
              width={600}
              height={600}
              backgroundColor="#ffffff00"
              globeImageUrl="/assets/earth.png"
            />
          </div>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-5xl mb-4 font-bold ">
            Out of this world <br className="hidden lg:inline-block" />
            payments.
          </h1>
          <p className="mb-8 leading-relaxed">
            PlutusPay is an intelligent space tourisim payment platform. It
            facilitates local bank transfers over $100k in value by utilising
            the Rapyd - the world’s largest local payments network .
          </p>
          <div className="flex justify-center space-x-3">
            <button className="flex items-center space-x-1 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              <PaperAirplaneIcon className="h-5 w-5"/> <span>Book Now</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
            <CalendarIcon className="h-5 w-5"/> <span>View Bookings</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
