"use client";

import { asideNav } from "@/_libs/aside-nav";
import { ItemNav } from "./item_nav";
import { useState } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Lang } from "../lang";
export const Nav = ({ lang, userData }) => {
  const asideElements = asideNav();
  const { isNotDesktop } = useScreenSize();
  const changeOrder = () => {
    const customOrder = ["/", "/news", "/get-tested/", "/my-profile"];

    asideElements.sort((a, b) => {
      return customOrder.indexOf(a.href) - customOrder.indexOf(b.href);
    });
  };
  if (isNotDesktop) {
    changeOrder();
  }
  const [currentTab, setCurrentTab] = useState("1");
  return (
    <ul className='flex flex-row justify-evenly xl:flex-col xl:gap-[20px]'>
      {asideElements
        .filter((el) => {
          return !isNotDesktop ? el.slug !== "my-profile" : true;
        })
        ?.map?.((el, i) => {
          // Определите новый порядок для мобильной версии
          const mobileOrder = [0, 3, 1, 2];
          const newIndex = isNotDesktop ? mobileOrder[i] : i;

          return (
            <ItemNav
              key={el.slug}
              data={{
                ...el,
                label: lang.sidebar.nav.filter((el) => {
                  return !isNotDesktop ? el.key !== "my-profile" : true;
                })[newIndex],
                locale: lang.locale,
                userData: userData,
                mobileOrder: mobileOrder, // передайте порядок как часть данных
              }}
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
            />
          );
        })}
      <li className='xl:hidden'>
        <Lang lang={lang} />
      </li>
    </ul>
  );
};
