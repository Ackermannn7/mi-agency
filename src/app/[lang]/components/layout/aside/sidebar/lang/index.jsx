"use client";

import { ItemLang } from "./item_lang";

import langList from "@/_libs/lang-list";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useScreenSize } from "@/hooks/useScreenSize";
export const Lang = ({ lang }) => {
  const pathName = usePathname();
  const { isNotDesktop } = useScreenSize();
  const [activeLang, setActiveLang] = useState(pathName.split("/")[1]);
  return (
    <div className='flex items-center gap-[10px]'>
      {langList
        .filter((el) => {
          return isNotDesktop ? el.key === activeLang : true;
        })
        ?.map?.((l, _) => (
          <ItemLang
            lang={lang}
            key={l.key}
            activeLang={activeLang}
            setActiveLang={setActiveLang}
            data={l}
            pathName={pathName}
            isMobile={isNotDesktop}
          />
        ))}
    </div>
  );
};
