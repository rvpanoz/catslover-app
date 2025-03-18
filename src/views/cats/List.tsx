import React from "react";

interface Props {
  children?: React.ReactNode;
}

const List: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-cols-5 gap-4 divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </div>
  );
};

export default List;
