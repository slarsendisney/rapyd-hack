import { CheckIcon } from "@heroicons/react/outline";

const features = [
  {
    name: "Forms Made Easy",
    description:
      "We work out your country and currency without you having to think about it.",
  },
  {
    name: "Pay in Installments",
    description:
      "After you have paid your deposit, pay in as many installments as you like.",
  },
  {
    name: "Mobile Friendly",
    description:
      "We are mobile friendly, so you can use our store on your phone or tablet.",
  },
  {
    name: "No More Passwords",
    description:
      "Use Google, Twitter or Github to login - no more account details to remember.",
  },
];

function Features() {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div>
          <h2 className="text-base font-semibold uppercase tracking-wide">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-extrabold">Making your purchase</p>
          <p className="mt-4 text-lg">
            Our intelligent store powererd by PlutusPay and Rapyd make for a
            seamless shopping experience.
          </p>
        </div>
        <div className="mt-12 lg:mt-0 lg:col-span-2">
          <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <CheckIcon
                    className="absolute h-6 w-6 text-accent-2"
                    aria-hidden="true"
                  />
                  <p className="ml-9 text-lg leading-6 font-medium text-primary">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-9 text-base">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Features;
