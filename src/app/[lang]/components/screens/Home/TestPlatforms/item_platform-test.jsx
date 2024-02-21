"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const ItemPlatformTest = ({ data }) => {
  console.log(data.emoji);
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`/public/_assets/images/icons/homepage/${data.emoji}`);
        console.log(imageModule);
        setImageSrc(imageModule?.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, []);
  return (
    <div className='w-[48%] md:w-[28%] h-[100px] xl:w-[190px] xl:h-[120px] rounded-[10px] bg-gradient-to-r from-[#347AEC] to-[#6764E7]  pb-[13px] relative flex flex-col items-center justify-evenly'>
      <div className='bg-white w-[43px] h-[43px] rounded-[100%] flex items-center justify-center text-center relative'>
        {imageSrc && <Image src={imageSrc} width={25} height={22} alt='emoji' loading='lazy' />}
      </div>
      <p className='w-[100%] text-center text-[12px] font-regular font-unbounded xl:text-[14px] text-white font-[300] leading-4'>
        {Object.values(data.name)[0]} <br /> {Object.values(data.name)[1]}
      </p>
    </div>
  );
};
