import { PlusIcon, EmojiSadIcon } from "@heroicons/react/solid";
import Link from "next/link";

const EmptyState = () => {
  return (
    <div className="flex flex-col align-center items-center py-32 text-center bg-gray-900 rounded">
      <EmojiSadIcon className="text-secondary w-36 h-36 opacity-20" />
      <h3 className="mt-2 text-xl font-medium text-primary">No Stores</h3>
      <p className="mt-1 text-lg text-secondary">
        Get started by create a new store.
      </p>
      <div className="mt-6">
        <Link href="/create">
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-bold rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Store
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
