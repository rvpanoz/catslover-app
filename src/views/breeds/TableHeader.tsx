import React from "react";

const TableHeader: React.FC = () => {
  return (
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
        >
          ID
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
        >
          Name
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
        >
          Adaptability
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
        >
          Life span (years)
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
        >
          Origin
        </th>
        <th
          scope="col"
          className="p-4 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
        >
          Image
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
