import React from "react";
import { Adaptability } from "../../types/appTypes";
import { Breed } from "../../types/catTypes";

interface TableRowProps {
  breed: Breed;
  onClick: (id: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({ breed, onClick }) => {
  return (
    <tr
      className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:cursor-pointer"
      onClick={() => onClick(breed.id)}
    >
      <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {breed.id}
      </td>
      <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {breed.name}
      </td>
      <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {Adaptability[breed.adaptability].replace("_", " ")}
      </td>
      <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {breed.life_span.replace("_", " ")}
      </td>
      <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {breed.origin}
      </td>
      <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img
          src={breed?.image?.url}
          alt={breed.name}
          className="h-10 w-10 rounded-full"
        />
      </td>
    </tr>
  );
};

export default TableRow;
