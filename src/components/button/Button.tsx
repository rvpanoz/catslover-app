import React, { ReactNode } from "react";

interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  svgIcon?: ReactNode;
}

const Button: React.FC<Props> = ({
  label,
  disabled = false,
  svgIcon = null,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-4 flex text-sm items-center space-x-2 px-4 py-2 rounded-md transition bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:hover:cursor-auto hover:cursor-pointer"
    >
      {svgIcon ? svgIcon : null}
      {label}
    </button>
  );
};

export default Button;
