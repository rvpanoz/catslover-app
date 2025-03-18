import React from "react";
import Button from "../../components/button/Button";
import { Favourite } from "../../types/favouritesTypes";

interface Props {
  item: Favourite;
  onRemove: (id: string) => void;
}

const ListItem: React.FC<Props> = ({ item, onRemove }) => {
  const dateAdded = new Date(item.created_at).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className="py-3 sm:py-4">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <img
            className="rounded-lg dark:border-2 dark:border-gray-300 h-48 w-48 object-cover drop-shadow-md rounded-md m-auto"
            src={item.image.url}
            alt="cat image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white-500 truncate dark:text-gray-100">
            Identity:&nbsp;{item.image.id}
          </p>
          <p className="text-xs text-gray-500 truncate dark:text-gray-400">
            added on:&nbsp;{dateAdded}
          </p>
        </div>
        <div>
          <Button
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash mr-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            }
            label="Remove"
            onClick={() => onRemove(item.id)}
          ></Button>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
