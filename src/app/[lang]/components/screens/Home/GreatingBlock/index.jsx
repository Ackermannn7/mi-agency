"use client";
import { useScreenSize } from "@/hooks/useScreenSize";
import Image from "next/image";
import { useEffect, useState } from "react";

const GreatingBlock = ({ lang }) => {
  const { isNotDesktop } = useScreenSize();
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`/public/_assets/images/greating/greating.png`);
        setImageSrc(imageModule?.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, []);

  return (
    <section className='flex flex-col xl:flex-row items-center xl:items-start gap-[40px] pt-[0px] xl:pt-[60px]'>
      <div className='relative'>
        {imageSrc && (
          <Image
            className='relative z-10'
            src={imageSrc}
            alt={"hello world"}
            width={140}
            height={isNotDesktop ? 160 : 180}
          />
        )}
      </div>
      <div className='xl:border-solid xl:border-4 xl:border-[#4485ED] rounded-[15px] xl:pt-[16px] xl:px-[19px] xl:pb-[19px] max-w-[1280px] w-full xl:w-[70%]'>
        <div className=' md:px-[10px]  flex flex-col gap-[10px]'>
          <p className='text-[#4485ED] font-[500] text-[18px]'>{lang.greatings_block.greating}</p>
          <p className='font-[500] leading-5 tracking-normal'>
            {lang.greatings_block.description_1}
          </p>
          <p className='font-[500] leading-5 tracking-normal'>
            {lang.greatings_block.description_2}
          </p>
        </div>
      </div>
    </section>
  );
};

export default GreatingBlock;
