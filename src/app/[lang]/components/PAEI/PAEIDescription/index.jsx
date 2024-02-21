"use client";

import { useState, useRef, useEffect } from "react";
import MainButton from "../../UI/Buttons/MainButton";
import { useScreenSize } from "@/hooks/useScreenSize";

export const PAEIDescription = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState("auto");
  const contentRef = useRef(null);
  const { width } = useScreenSize();
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isOpen]);

  useEffect(() => {
    // Обновляем высоту при загрузке компонента
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, []); // Пустой массив зависимостей означает, что useEffect выполняется только один раз при монтировании

  return (
    <div className='max-w-[1000px] w-full flex justify-between relative'>
      <button className='absolute right-0' onClick={toggleAccordion}>
        {isOpen ? (
          <MainButton
            className='text-[14px] xl:text-[16px]'
            label={lang.paei_description.hide_btn}
          />
        ) : (
          <MainButton
            className='text-[14px] xl:text-[16px]'
            label={lang.paei_description.show_btn}
          />
        )}
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className={`mt-[30px] w-full transition-max-height duration-300 ease-in-out overflow-hidden flex flex-col justify-between`}
      >
        <div className='flex items-start gap-[15px] mb-[30px]'>
          <p className='text-center min-w-[80px] xl:min-w-[100px] font-unbounded bg-gradient-to-r from-[#347AEC] to-[#6764E7] inline-block text-transparent bg-clip-text text-7xl xl:text-8xl font-semibold'>
            P
          </p>
          <div className='max-w-[700px] pt-[10px]'>
            <h5 className={`font-unbounded text-[#262626] leading-5 uppercase font-[500] `}>
              {lang.paei_description.p_header}
            </h5>
            <p className='text-[#262626] font-[500] leading-5 mt-[10px]'>
              {lang.paei_description.p_description}
            </p>
          </div>
        </div>
        <div className='flex items-start gap-[15px] mb-[30px]'>
          <p className='text-center min-w-[80px] xl:min-w-[100px] font-unbounded bg-gradient-to-r from-[#347AEC] to-[#6764E7] inline-block text-transparent bg-clip-text text-7xl xl:text-8xl font-semibold'>
            А
          </p>
          <div className='max-w-[700px] pt-[10px]'>
            <h5 className='font-unbounded text-[#262626] leading-5 uppercase font-[500]'>
              {lang.paei_description.a_header}
            </h5>
            <p className='text-[#262626] font-[500] leading-5 mt-[10px]'>
              {lang.paei_description.a_description}
            </p>
          </div>
        </div>
        <div className='flex items-start gap-[15px] mb-[30px]'>
          <p className='text-center min-w-[80px] xl:min-w-[100px] font-unbounded bg-gradient-to-r from-[#347AEC] to-[#6764E7] inline-block text-transparent bg-clip-text text-7xl xl:text-8xl font-semibold'>
            E
          </p>
          <div className='max-w-[700px] pt-[10px]'>
            <h5 className='font-unbounded text-[#262626] leading-5 uppercase font-[500]'>
              {lang.paei_description.e_header}
            </h5>
            <p className='text-[#262626] font-[500] leading-5 mt-[10px]'>
              {lang.paei_description.e_description}
            </p>
          </div>
        </div>
        <div className='flex items-start gap-[15px] mb-[30px]'>
          <p className='text-center min-w-[80px] xl:min-w-[100px] font-unbounded bg-gradient-to-r from-[#347AEC] to-[#6764E7] inline-block text-transparent bg-clip-text text-7xl xl:text-8xl font-semibold'>
            I
          </p>
          <div className='max-w-[700px] pt-[10px]'>
            <h5 className='font-unbounded text-[#262626] leading-5 uppercase font-[500]'>
              {lang.paei_description.i_header}
            </h5>
            <p className='text-[#262626] font-[500] leading-5 mt-[10px]'>
              {lang.paei_description.i_description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
