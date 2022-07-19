import { ShoppingBagIcon } from "@heroicons/react/solid";
const previewStores = [
  {
    name: "Space Tour",
    description:
      "Space Tour is on a mission to make paying for space tourisim easy. ",
    url: "https://store1.plutuspay.app",
  },
  {
    name: "Clooney Interviews",
    description: "Ever wanted to interview a celebrity? Now you can. ",
    url: "https://store2.plutuspay.app",
  },
  {
    name: "Sports Car Crazed",
    description: "The best sports car store in the world. ",
    url: "https://store3.plutuspay.app",
  },
];

const StoreGallery = () => {
  return (
    <section className=" body-font">
      <div className="max-w-5xl mx-auto flex px-5 py-12 md:py-24 flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <ShoppingBagIcon className="h-8 w-8" />
          <h2 className="text-xl font-medium">Store Gallery</h2>
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
