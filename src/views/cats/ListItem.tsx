import React from "react";

interface Props {
  item: any;
  onClick: () => void;
}

const ListItem: React.FC<Props> = ({ item, onClick }) => {
  return (
    <div className="py-3 sm:py-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center min-w-0">
          <img
            className="rounded-lg dark:border-2 dark:border-gray-300 h-48 w-96 object-cover drop-shadow-md rounded-md m-auto dark:hover:cursor-pointer"
            src={item.url}
            alt={item.id}
            onClick={onClick}
          />
          {item.favourite ? (
            <div className="mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="green"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
