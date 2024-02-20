import { useState, useEffect } from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window?.outerWidth,
    height: window?.outerHeight,
    isMobile: window?.outerWidth < 768,
    isTablet: window?.outerWidth > 767 && window?.outerWidth < 1024,
    isNotLaptop: window?.outerWidth < 1024,
    isNotDesktop: window?.outerWidth < 1280,
  });
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window?.outerWidth,
        height: window?.outerHeight,
        isMobile: window?.outerWidth < 768,
        isTablet: window?.outerWidth > 767 && window?.outerWidth < 1024,
        isNotDesktop: window?.outerWidth < 1280,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};
