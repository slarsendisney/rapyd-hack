import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon, ShoppingBagIcon } from "@heroicons/react/solid";
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import Routes from "./Routes.json";
import Link from "next/link";
let Globe = () => null;
if (typeof window !== "undefined") Globe = require("react-globe.gl").default;

const OPACITY = 0.72;

const features = [
  {
    name: "Intelligent Localization",
    description:
      "Plutus uses your region to determine the best local currency for your users. It then automatically creates virtual accounts to accept this currency.",
    icon: GlobeAltIcon,
  },
  {
    name: "Deposit Configuration",
    description:
      "Configure the minimum deposit amount and let Plutus handle the rest. We'll make sure that your users have paid the total amount before the order is processed and keep you informed every step of the way.",
    icon: ScaleIcon,
  },
  {
    name: "Responsive Design",
    description:
      "Plutus is designed to be responsive and adapt to any screen size with zero configuration. It's easy to use and easy to understand.",
    icon: LightningBoltIcon,
  },
  {
    name: "Store Stats",
    description:
      "See how many users have visited your store and how many have made a payment from our handy dashboard.",
    icon: ChartBarIcon,
  },
];

export const PlutusFeatures = () => {
  return (
    <div className="pb-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            A better way to checkout online
          </p>
          <p className="mt-4 max-w-2xl text-xl lg:mx-auto">
            Plutus has everything you need to create beautiful, easy to use,
            checkout experiences for your customers.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-accent-1 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium ">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-200">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const globeEl = useRef();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes(Routes);
  }, []);
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.6;
  }, []);

  const scrollToStores = ()=> {
    document.getElementById('#gallery').scrollIntoView({
      behavior: 'smooth'
    });
  }

  return (
    <section className=" body-font">
      <div className="container mx-auto flex px-5 py-12 md:py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 -mt-12">
          <div className="flex justify-center pointer-events-none -my-24 md:-my-12 transform scale-75 md:scale-100">
            <Globe
              ref={globeEl}
              width={600}
              height={600}
              backgroundColor="#ffffff00"
              globeImageUrl="/assets/earth.png"
              arcsData={routes}
              arcLabel={(d) =>
                `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`
              }
              atmosphereColor="#5FB0B7"
              arcStroke={1}
              arcStartLat={(d) => +d.srcAirport.lat}
              arcStartLng={(d) => +d.srcAirport.lng}
              arcEndLat={(d) => +d.dstAirport.lat}
              arcEndLng={(d) => +d.dstAirport.lng}
              arcDashLength={0.25}
              arcDashGap={1}
              arcDashInitialGap={() => Math.random()}
              arcDashAnimateTime={8000}
              arcColor={(d) => [
                `rgba(255, 255, 255, ${OPACITY})`,
                `rgba(129, 140, 248, ${OPACITY})`,
              ]}
              arcsTransitionDuration={0}
            />
          </div>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            Out of this world <br className="hidden lg:inline-block" />
            payments.
          </h1>
          <p className="my-8 leading-relaxed">
            PlutusPay is an intelligent low-code checkout platform for
            high-value transactions. It facilitates local bank transfers over
            $100k in value by utilising Rapyd - the world’s largest local
            payments network. What are you waiting for? Create a store now.
          </p>
          <div className="flex justify-center space-x-3">
            <Link href="/create">
              <button className="flex items-center space-x-1 text-white bg-accent-1 border-0 py-2 px-6 focus:outline-none hover:bg-accent-1-dark rounded text-lg">
                <PaperAirplaneIcon className="h-5 w-5" />{" "}
                <span>Create a store</span>
              </button>
            </Link>
            <button onClick={scrollToStores} className="flex items-center space-x-1 text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
              <ShoppingBagIcon className="h-5 w-5" /> <span>View stores</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
