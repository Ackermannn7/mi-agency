"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Logo = ({ lang }) => {
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`/public/_assets/images/icons/psyMI_logo.png`);
        setImageSrc(imageModule?.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, []);
  return (
    <Link href={`/${lang.locale}/`}>
      {imageSrc && (
        <Image
          className='w-[100px] h-[40px] xl:w-[120px] xl:h-[50px]'
          src={imageSrc}
          alt={"psyMI"}
          loading={"lazy"}
        />
      )}
    </Link>
  );
};
