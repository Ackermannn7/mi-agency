"use client";
import Image from "next/image";
import { Unbounded } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";
const Unbound = Unbounded({ subsets: ["latin"] });
const CardTest = ({ data }) => {
  const { isMobile, isTablet } = useScreenSize();
  const [bannerSrc, setBannerSrc] = useState(null);
  const [ownerSrc, setOwnerSrc] = useState(null);
  useEffect(() => {
    const loadImage = async () => {
      try {
        const bannerModule = await import(`/public/_assets/images/tests/${data.banner}`);
        setBannerSrc(bannerModule.default);
        const ownerModule = await import(`/public/_assets/images/icons/${data.owner.path}`);
        setOwnerSrc(ownerModule.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    if (data) {
      loadImage();
    }
  }, [data]);
  return (
    <div
      className={`max-w-[1280px] w-full lg:w-[408px] 2xl:w-[408px] lg:mx-auto xl:mx-0 shadow-lg rounded-[15px]`}
    >
      <div
        className={`bg-gradient-to-r w-full h-[176px] bg-gradient-to-r from-[#347AEC] to-[#6764E7] rounded-t-[15px] pt-[12px] pb-[24px] overflow-hidden`}
      >
        {ownerSrc && (
          <Image
            loading={"lazy"}
            className='hidden xl:block mx-auto'
            src={ownerSrc}
            alt={"owner"}
            width={64}
            height={22}
          />
        )}

        <div className='max-w-[350px] md:max-w-[600px] xl:max-w-[350px] h-[150px] relative mx-auto my-auto'>
          {bannerSrc && (
            <Image
              className='object-contain mx-auto mt-[20px]'
              src={bannerSrc}
              alt={"banner"}
              width={400}
              height={130}
            />
          )}
        </div>
      </div>
      <div className='h-[108px] bg-white rounded-b-[15px] pt-[12px] pb-[20px] pl-[15px] pr-[5px]'>
        <div className='mb-[20px]'>
          <h2 className={Unbound.className + " " + "text-[16px] font-[400]"}>
            {data.test_blocks[0].label}
          </h2>
          <p className='w-[100%] xl:w-auto text-[#5E5E5E] text-[14px] font-[500] mb-[5px] xl:mb-[15px] mt-[3px]'>
            {isTablet && data.test_blocks[0].description.length !== 0
              ? `${data.test_blocks[0].description.slice(0, 80)}...`
              : data.test_blocks[0].description.length !== 0
              ? `${data.test_blocks[0].description.slice(0, 45)}...`
              : data.test_blocks[0].description}
          </p>
        </div>
        <Link
          href={!data.development ? `/${data.locale}/test/${data.type}` : "#"}
          className={`${
            Unbound.className
          } text-white text-[14px] font-[400] py-[7px] px-[15px] bg-[#347AEC]  hover:bg-[#6764E7] duration-500 rounded-[100px] ${
            data.development ? "opacity-60" : "opacity-100"
          }`}
        >
          {data.development
            ? data.lang.test_page.test_in_dev_btn
            : data.lang.test_page.pass_the_test_btn}
        </Link>
      </div>
    </div>
  );
};

export default CardTest;
