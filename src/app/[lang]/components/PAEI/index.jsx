"use client";

import BlockTest from "./BlockTest";
import { useEffect, useState, useRef } from "react";

import { tests } from "@/_libs/paei";
import { PAEIResult } from "./PAEIResult";
import NextPrevButton from "../UI/Buttons/NextPrevButton";

export const PAEI = ({ lang }) => {
  const localizedTests = tests(lang);
  const [counterTest, setCounterTest] = useState([]);
  const [currentBlock, setCurrentBlock] = useState(localizedTests.block_1);
  const [currentBlockID, setCurrentBlockID] = useState(1);
  const [counter, setCounter] = useState(0);
  const [generalQuestions] = useState(Object.keys(localizedTests).length);
  const [isShownResult, setIsShownResult] = useState(false);
  const [height, setHeight] = useState("auto");
  const contentRef = useRef(null);
  useEffect(() => {
    // Завантаження даних з localStorage при старті компоненту
    const storedPAEIAnswers = localStorage?.getItem("paeiAnswers");

    if (storedPAEIAnswers || Object.keys(answers).length === 0) {
      setAnswers(JSON.parse(storedPAEIAnswers));
    }
  }, []);
  const [answers, setAnswers] = useState(() => {
    const storedPAEIAnswers = localStorage.getItem("paeiAnswers");
    return storedPAEIAnswers ? JSON.parse(storedPAEIAnswers) : [];
  });

  useEffect(() => {
    // Зберігаємо дані в локальному сховищі
    localStorage.setItem("paeiAnswers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const updatedCounterTest = counterTest.map((item) => ({ ...item })); // Создаем новый массив с копиями объектов
    const updatedCounter = updatedCounterTest
      .map((item) => item.number)
      .reduce((previous, current) => Number(previous) + Number(current), 0);

    setCounter(updatedCounter);

    const counterTestLength = counterTest.length;
    if (counterTestLength === 3) {
      function findMissingLetter(arr, word) {
        // Create a set of letters from the word.
        const letterSet = new Set(word.split(""));

        // Remove letters from the set that are present in the array.
        arr.forEach((obj) => {
          letterSet.delete(obj.letter);
        });

        // The remaining letters in the set are the ones that need to be added.
        // Convert the set back to an array to get the missing letters.
        return Array.from(letterSet);
      }

      const word = "PAEI";

      const missingLetters = findMissingLetter(counterTest, word);

      setCounterTest((p) => [
        ...p,
        {
          number: 10 - updatedCounter,
          letter: missingLetters[0],
        },
      ]);
    }
    if (counterTestLength === 4) {
      setAnswers((prevState) =>
        prevState.find((el) => Object.keys(el)[0] === `id_${currentBlockID}`)
          ? [
              ...prevState.filter((el) => Object.keys(el)[0] !== `id_${currentBlockID}`),
              {
                [`id_${currentBlockID}`]: counterTest,
              },
            ]
          : [
              ...prevState,
              {
                [`id_${currentBlockID}`]: counterTest,
              },
            ],
      );
    }
  }, [counterTest]);

  useEffect(() => {
    const currentState = answers.find((el) => Object.keys(el)[0] === `id_${currentBlockID}`);
    if (currentState) {
      setCounterTest(currentState[`id_${currentBlockID}`]);
    } else {
      setCounterTest([]);
    }
  }, [currentBlockID]);

  const toggleBlock = () => {
    setCounterTest([]);
    switch (JSON.stringify(currentBlock)) {
      case JSON.stringify(localizedTests.block_1):
        setCurrentBlock(localizedTests.block_2);
        setCurrentBlockID((prevState) => prevState + 1);
        break;
      case JSON.stringify(localizedTests.block_2):
        setCurrentBlock(localizedTests.block_3);
        setCurrentBlockID((prevState) => prevState + 1);
        break;
      case JSON.stringify(localizedTests.block_3):
        setCurrentBlock(localizedTests.block_4);
        setCurrentBlockID((prevState) => prevState + 1);
        break;
      case JSON.stringify(localizedTests.block_4):
        setCurrentBlock(localizedTests.block_5);
        setCurrentBlockID((prevState) => prevState + 1);
        break;
      case JSON.stringify(localizedTests.block_5):
        setCurrentBlock(localizedTests.block_6);
        setCurrentBlockID((prevState) => prevState + 1);
        break;
      case JSON.stringify(localizedTests.block_6):
        setCurrentBlock(localizedTests.block_7);
        setCurrentBlockID((prevState) => prevState + 1);
        break;
      case JSON.stringify(localizedTests.block_7):
        setCurrentBlock(localizedTests.block_8);
        setCurrentBlockID((prevState) => prevState + 1);
        break;
      case JSON.stringify(localizedTests.block_8):
        setCurrentBlock(localizedTests.block_9);
        setCurrentBlockID((prevState) => prevState + 1);
        break;
      case JSON.stringify(localizedTests.block_9):
        setCurrentBlock(localizedTests.block_10);
        setCurrentBlockID((prevState) => prevState + 1);
        break;
      // ... Добавьте остальные блоки
    }
  };
  const goToPreviousBlock = () => {
    // Логика для перехода на предыдущий блок
    switch (JSON.stringify(currentBlock)) {
      case JSON.stringify(localizedTests.block_2):
        setCurrentBlock(localizedTests.block_1);
        setCurrentBlockID((prevState) => prevState - 1);
        break;
      case JSON.stringify(localizedTests.block_3):
        setCurrentBlock(localizedTests.block_2);
        setCurrentBlockID((prevState) => prevState - 1);
        break;
      case JSON.stringify(localizedTests.block_4):
        setCurrentBlock(localizedTests.block_3);
        setCurrentBlockID((prevState) => prevState - 1);

        break;
      case JSON.stringify(localizedTests.block_5):
        setCurrentBlock(localizedTests.block_4);
        setCurrentBlockID((prevState) => prevState - 1);

        break;
      case JSON.stringify(localizedTests.block_6):
        setCurrentBlock(localizedTests.block_5);
        setCurrentBlockID((prevState) => prevState - 1);

        break;
      case JSON.stringify(localizedTests.block_7):
        setCurrentBlock(localizedTests.block_6);
        setCurrentBlockID((prevState) => prevState - 1);

        break;
      case JSON.stringify(localizedTests.block_8):
        setCurrentBlock(localizedTests.block_7);
        setCurrentBlockID((prevState) => prevState - 1);

        break;
      case JSON.stringify(localizedTests.block_9):
        setCurrentBlock(localizedTests.block_8);
        setCurrentBlockID((prevState) => prevState - 1);

        break;
      case JSON.stringify(localizedTests.block_10):
        setCurrentBlock(localizedTests.block_9);
        setCurrentBlockID((prevState) => prevState - 1);

        break;
    }
  };
  useEffect(() => {
    setHeight(isShownResult ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isShownResult]);

  useEffect(() => {
    // Обновляем высоту при загрузке компонента
    setHeight(isShownResult ? `${contentRef.current.scrollHeight}px` : "0px");
  }, []);
  return (
    <>
      <div className='w-full xl:mt-0 flex xl:gap-[96px] max-w-[780px]  justify-between'>
        <div className='text-[16px]'>
          <div className='flex items-center justify-start md:justify-end gap-[50px] xl:gap-[50px] max-w-[545px] w-full pl-[22px] md:pl-0 md:pr-[19px] mb-[12px]'>
            {new Array(4).fill(null).map((_, i) => (
              <div className='text-[#5D5D5D] font-[600]'>{i + 1}</div>
            ))}
          </div>
          <div className='min-w-[200px] w-[100%] md:w-[500px] xl:w-[545px] flex flex-col gap-[10px] xl:gap-[20px]'>
            {Array.isArray(currentBlock) &&
              currentBlock.map(
                (test, index) =>
                  !test.answers && (
                    <BlockTest
                      key={index}
                      counter={counter}
                      block={currentBlock}
                      answers={answers}
                      setAnswers={setAnswers}
                      blockId={currentBlockID}
                      state={counterTest}
                      setState={setCounterTest}
                      test_name={test.label}
                      letter={test._id}
                      index={index}
                    />
                  ),
              )}
            {/* FOR DESKTOP */}
            <div className='flex flex-col'>
              <div className='hidden xl:flex justify-end mt-[20px]'>
                {currentBlockID > 1 && (
                  <NextPrevButton
                    className='previous-block block-button bg-transparent w-[140px] h-[17px] text-black hover:bg-transparent hover:font-bold'
                    label={lang.test_page.prev_block_btn}
                    onClick={() => {
                      if (currentBlockID > 1) {
                        goToPreviousBlock();
                      }
                    }}
                    disabled={currentBlockID === 1}
                  />
                )}
                {currentBlockID < 10 && (
                  <NextPrevButton
                    className='block-button bg-transparent w-[140px] h-[17px] text-black hover:bg-transparent hover:font-bold'
                    label={lang.test_page.next_block_btn}
                    onClick={toggleBlock}
                    disabled={
                      currentBlockID === generalQuestions ||
                      counterTest.length < 4 ||
                      counter !== 10
                    }
                  />
                )}
              </div>

              {answers.length === 10 && (
                <button
                  onClick={() => {
                    setIsShownResult(!isShownResult);
                    setTimeout(() => {
                      window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: "smooth", // Optional: Add smooth scrolling behavior
                      });
                    }, 200);
                  }}
                  className='hidden xl:flex items-center justify-center flex-col gap-[5px] w-full py-[26px] font-medium'
                >
                  <span className='text-[#262626] text-center font-unbounded text-[16px] '>
                    {lang.paei_page.get_result_btn}
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='22'
                    height='11'
                    viewBox='0 0 22 11'
                    fill='none'
                  >
                    <path
                      fill-rule='evenodd'
                      clipRule='evenodd'
                      d='M0.219168 0.375342C0.564178 -0.0559202 1.19347 -0.125842 1.62473 0.219168L11 7.71941L20.3753 0.219168C20.8066 -0.125842 21.4359 -0.0559202 21.7809 0.375342C22.1259 0.806604 22.056 1.4359 21.6247 1.78091L11 10.2807L0.375342 1.78091C-0.0559202 1.4359 -0.125842 0.806604 0.219168 0.375342Z'
                      fill='#262626'
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-evenly xl:block text-center font-unbounded text-[#262626] items-center'>
          <p className='hidden xl:block font-normal mb-[40px]'>{lang.paei_page.passed_blocks}</p>
          <div className='xl:mb-[60px] text-center w-[100%]'>
            <p className='text-2xl xl:text-4xl font-medium  bg-gradient-to-r from-[#4485ED] to-[#6764E7] text-transparent bg-clip-text'>
              {currentBlockID} / 10
            </p>
            <span className='text-[#5D5D5D] text-[16px]'>{lang.paei_page.blocks}</span>
          </div>
          <div className='xl:mb-[60px] text-center w-[100%]'>
            <p className='text-2xl xl:text-4xl font-medium  bg-gradient-to-r from-[#4485ED] to-[#6764E7] text-transparent bg-clip-text'>
              {counter} / 10
            </p>
            <span className='text-[#5D5D5D] text-[16px]'> {lang.paei_page.points}</span>
          </div>
        </div>
      </div>
      {/* FOR MOBILE & TABLET */}
      <div className='w-full flex xl:hidden flex-col pb-[30px]'>
        <div className='flex justify-evenly'>
          {currentBlockID > 1 && (
            <NextPrevButton
              className='previous-block block-button bg-transparent w-[140px] h-[17px] text-black hover:bg-transparent hover:font-bold'
              label={lang.test_page.prev_block_btn}
              onClick={() => {
                if (currentBlockID > 0) {
                  goToPreviousBlock();
                }
              }}
              disabled={currentBlockID === 1}
            />
          )}

          {currentBlockID < 10 && (
            <NextPrevButton
              className='block-button bg-transparent w-[140px] h-[17px] text-black hover:bg-transparent hover:font-bold'
              label={lang.test_page.next_block_btn}
              onClick={toggleBlock}
              disabled={
                currentBlockID === generalQuestions || counterTest.length < 4 || counter !== 10
              }
            />
          )}
        </div>

        {answers.length === 10 && (
          <button
            onClick={() => {
              setIsShownResult(!isShownResult);
              setTimeout(() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: "smooth", // Optional: Add smooth scrolling behavior
                });
              }, 200);
            }}
            className='flex items-center justify-center flex-col gap-[5px] w-full pt-[26px] xl:py-[26px] font-medium'
          >
            <span className='text-[#262626] text-center font-unbounded text-[16px] '>
              {lang.paei_page.get_result_btn}
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='11'
              viewBox='0 0 22 11'
              fill='none'
            >
              <path
                fill-rule='evenodd'
                clipRule='evenodd'
                d='M0.219168 0.375342C0.564178 -0.0559202 1.19347 -0.125842 1.62473 0.219168L11 7.71941L20.3753 0.219168C20.8066 -0.125842 21.4359 -0.0559202 21.7809 0.375342C22.1259 0.806604 22.056 1.4359 21.6247 1.78091L11 10.2807L0.375342 1.78091C-0.0559202 1.4359 -0.125842 0.806604 0.219168 0.375342Z'
                fill='#262626'
              />
            </svg>
          </button>
        )}
      </div>

      {isShownResult && (
        <PAEIResult answers={answers} lang={lang} contentRef={contentRef} height={height} />
      )}
    </>
  );
};
