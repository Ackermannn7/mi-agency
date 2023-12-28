import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export const ItemLang = ({
  activeLang,
  setActiveLang,
  data,
  pathName,
  isMobile,
}) => {
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
      }
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
        const imageModule = await import(
          `/public/_assets/images/lang/${data.image}`
        );
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
        >
          {imageSrc && (
            <Image
              className={`${
                activeLang === data.key ? "grayscale-0" : "grayscale"
              }`}
              aria-label={"Change to:" + data.alt}
              src={imageSrc}
              alt={data.alt}
              width={24}
              height={24}
              loading={"lazy"}
            />
          )}
        </button>
      </Link>
    </>
  );
};
