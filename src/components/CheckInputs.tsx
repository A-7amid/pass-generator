import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";

interface CheckInputsProps {
  checkType: boolean;
  setCheckType: boolean;
  id: string;
  name: string;
}

const CheckInputs = ({
  checkType,
  setCheckType,
  id,
  name,
}: CheckInputsProps) => {
  const handleCheck = () => {
    setCheckType((prev) => !prev);
  };

  return (
    <label htmlFor={id} className="flex gap-x-2 items-center">
      <div
        id={id}
        className={`border flex transition duration-200 ease-in-out border-white rounded-xs p-[2px] ${
          checkType && "bg-white"
        }`}
        onClick={() => handleCheck()}
      >
        <FaCheck className="size-[10px] text-gray-800 text-xs cursor-pointer" />
      </div>
      <span className="font-medium text-gray-700 dark:text-gray-200">
        {name}
      </span>
    </label>
  );
};

export default CheckInputs;
