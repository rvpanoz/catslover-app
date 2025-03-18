import React from "react";

interface Props {
  children?: React.ReactNode;
}

const List: React.FC<Props> = ({ children }) => {
  return (
    <div className="border-gray-200 dark:border-gray-600">
      <div className="pt-1">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {children}
        </ul>
      </div>
    </div>
  );
};

export default List;
