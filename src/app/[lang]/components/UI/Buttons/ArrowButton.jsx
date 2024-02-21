import { ArrowIcon } from "@/icons/Arrow.icon";

const ArrowButton = ({ type = "button", className = "", onClick, label = "" }) => {
  const isPreviousBlock = className && className.includes("previous-block");
  const isBlockButton = className && className.includes("block-button");
  return (
    <button
      className={` ${className} py-[3px] px-[6px] rounded-[8px] text-[12px] text-white font-[500] max-w-[110px] h-[20px] duration-500 flex items-center justify-between bg-[#347AEC] hover:bg-[#6764E7] `}
      type={type}
      onClick={onClick}
    >
      {isPreviousBlock ? (
        <>
          <ArrowIcon
            isPreviousBlock={isPreviousBlock}
            isBlockButton={isBlockButton}
            className={className}
          />
          <span className='mr-[5px]'>{label}</span>
        </>
      ) : (
        <>
          <span className='mr-[5px]'>{label}</span>
          <ArrowIcon
            isPreviousBlock={isPreviousBlock}
            isBlockButton={isBlockButton}
            className={className}
          />
        </>
      )}
    </button>
  );
};

export default ArrowButton;
