"use client";

import { memo, useEffect, useState } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";
const BlockTest = ({
  test_name = "",
  letter,
  setState,
  state,
  block,
  counter,
  index,
  answers,
  blockId,
}) => {
  const { isMobile } = useScreenSize();

  useEffect(() => {
    if (state.length === 0) setCurrentTabButton(0);
    else {
      const currentValue = state.find((el) => el.letter === letter);
      if (currentValue) {
        setCurrentTabButton(currentValue.number);
      }
    }
  }, [state]);

  const [currentTabButton, setCurrentTabButton] = useState(0);
  const BUTTONS_PARAMS = [
    { type: "button", number: 1, disabled: false },
    { type: "button", number: 2, disabled: false },
    { type: "button", number: 3, disabled: false },
    { type: "button", number: 4, disabled: false },
  ];
  const handleCountLetter = (number, letterCurrent) => {
    const updatedState = state.map((letterTest) =>
      letterTest.letter === letterCurrent ? { ...letterTest, number: number } : letterTest,
    );

    // Check if the letter was found and updated. If not, add a new entry.
    const isLetterFound = updatedState.some((el) => el.letter === letterCurrent);
    if (!isLetterFound) {
      updatedState.push({ number: number, letter: letterCurrent });
    }

    // Assuming setState is a function to update the state.
    setState(updatedState);
    // Call setCurrentTabButton with the provided number.
    setCurrentTabButton(number);
  };

  return (
    <>
      <p className='md:hidden text-[14px] text-[#262626] font-unbounded font-[400]'>{test_name}</p>
      <div className='flex justify-between items-center py-[14px] px-[19px] bg-white rounded-[5px]'>
        <p className='hidden md:block text-[#262626] font-unbounded font-[400]'>{test_name}</p>
        <div className='flex gap-[50px] xl:gap-[50px]'>
          {BUTTONS_PARAMS?.map?.((button, _) => {
            const isDisabled =
              counter - currentTabButton + button.number > 10 ||
              (state.length === 2 &&
                currentTabButton === 0 &&
                counter >= 6 &&
                counter + button.number > 9) ||
              (state.length === 2 && counter === 2 && button.number < 4) ||
              (state.length === 2 && counter === 3 && button.number < 3) ||
              (state.length === 2 && counter === 4 && button.number < 2);
            return (
              <button
                onClick={() => handleCountLetter(button.number, letter)}
                className={`w-[10px] duration-500 h-[10px]
                         ${
                           currentTabButton === button.number ||
                           state?.find((el) => el.letter === letter)?.number === button.number
                             ? "bg-[#347AEC]"
                             : "bg-[#E0E0E0]"
                         }
                         ${isDisabled && "opacity-50"}
                         rounded-[100%]`}
                type={button.type}
                key={button.number}
                disabled={isDisabled}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default memo(BlockTest);
