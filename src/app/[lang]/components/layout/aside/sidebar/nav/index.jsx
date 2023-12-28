"use client";

import { asideNav } from "@/_libs/aside-nav";
import { ItemNav } from "./item_nav";
import { useState } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";

export const Nav = ({ lang, user }) => {
  const asideElements = asideNav();
  const { isMobile } = useScreenSize();
  const changeOrder = () => {
    const customOrder = ["/", "/news", "/get-tested/", "/my-profile"];

    asideElements.sort((a, b) => {
      return customOrder.indexOf(a.href) - customOrder.indexOf(b.href);
    });
  };
  if (isMobile) {
    changeOrder();
  }
  const [currentTab, setCurrentTab] = useState("1");
  return (
    <ul className="flex flex-row md:flex-col items-start gap-[20px]">
      {asideElements
        .filter((el) => {
          return !isMobile ? el.slug !== "my-profile" : true;
        })
        ?.map?.((el, i) => {
          // Определите новый порядок для мобильной версии
          const mobileOrder = [0, 3, 1, 2];
          const newIndex = isMobile ? mobileOrder[i] : i;

          return (
            <ItemNav
              key={el.slug}
              data={{
                ...el,
                label: lang.sidebar.nav.filter((el) => {
                  return !isMobile ? el.key !== "my-profile" : true;
                })[newIndex],
                locale: lang.locale,
                user: user,
                mobileOrder: mobileOrder, // передайте порядок как часть данных
              }}
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
            />
          );
        })}
    </ul>
  );
};
