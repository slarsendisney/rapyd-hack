import { ShoppingBagIcon } from "@heroicons/react/solid";
const previewStores = [
  {
    name: "Space Tour",
    description:
      "Space Tour is on a mission to make paying for space tourisim easy. ",
    url: "https://spacetours.plutuspay.app",
  },
  {
    name: "Strange Tourism",
    description: "A trip into the multiverse with the one and only Dr. Strange.",
    url: "https://strange.plutuspay.app",
  },
  {
    name: "The Super Car Store",
    description: "The best sports car store in the world. ",
    url: "https://supercar.plutuspay.app",
  },
];

const StoreGallery = () => {
  return (
    <section className=" body-font">
      <div className="max-w-5xl mx-auto flex px-5 py-12 md:py-24 flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <ShoppingBagIcon className="h-8 w-8" />
          <h2 id="#gallery" className="text-xl font-medium">Store Gallery</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 w-full">
          {previewStores.map((store, index) => (
            <a href={store.url} key={index} className="transform hover:scale-105 duration-100 flex flex-col bg-accent-1 text-white p-6 hover:bg-accent-1 rounded">
              <p className="text-xl font-bold">{store.name}</p>
              <p>{store.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreGallery;
