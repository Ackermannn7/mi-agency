import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export const ItemLang = ({ activeLang, setActiveLang, data, pathName, isMobile, lang }) => {
  const newLang = activeLang === "ua" ? "en" : "ua"; // Переключаем язык между "ua" и "en"
  const [imageSrc, setImageSrc] = useState(null);
  const redirectedPathName = (locale) => {
    if (!pathName) {
      return "/";
    }
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const success = () => {
    toast.success(
      isMobile
        ? newLang === "en"
          ? `You have successfully set the language - English`
          : `Ви вдало встановили мову - Українська`
        : data.key === "en"
        ? `You have successfully set the language - ${data.alt}`
        : `Ви вдало встановили мову - ${data.alt}`,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        style: { width: `${isMobile ? "100%" : "370px"}` },
        theme: "light",
      },
    );
  };
  const changeLang = useCallback(() => {
    setActiveLang(data.key);
    setTimeout(() => {
      success();
    }, 1000);
  }, [activeLang]);

  const changeLangMobile = useCallback(() => {
    setActiveLang(newLang);
    setTimeout(() => {
      success();
    }, 1000);
  }, [activeLang]);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`/public/_assets/images/lang/${data.image}`);
        setImageSrc(imageModule?.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    if (data) {
      loadImage();
    }
  }, [data]);
  return (
    <>
      <Link href={redirectedPathName(isMobile ? newLang : data.key)}>
        <button
          key={data.key}
          onClick={isMobile ? changeLangMobile : changeLang}
          className='flex flex-col text-center xl:flex-row items-center gap-[7px] xl:gap-[14px] item-nav'
        >
          {imageSrc && (
            <Image
              className={`${
                activeLang === data.key ? "grayscale-0" : "grayscale"
              } w-[35px] h-[35px] xl:w-[24px] xl:h-[24px]`}
              aria-label={"Change to:" + data.alt}
              src={imageSrc}
              alt={data.alt}
              loading={"lazy"}
            />
          )}
          <p className='xl:hidden text-[9px] xl:text-[16px] w-[50px] xl:w-auto'>
            {lang?.sidebar.language}
          </p>
        </button>
      </Link>
    </>
  );
};
