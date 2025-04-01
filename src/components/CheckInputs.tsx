import { FaCheck } from "react-icons/fa";

interface CheckInputsProps {
  checkRefType: React.RefObject<HTMLInputElement>;
  id: string;
  name: string;
}

const CheckInputs = ({ checkRefType, id, name }: CheckInputsProps) => {
  const handleCheck = () => {
    checkRefType.current.classList.toggle("bg-white");
  };

  return (
    <label htmlFor={id} className="flex gap-x-2 items-center">
      <div
        id={id}
        ref={checkRefType}
        className="border flex transition duration-200 ease-in-out border-white rounded-xs p-[2px]"
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
