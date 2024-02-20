"use client";

import { Default } from "@/app/[lang]/components/Avatar/Default";
import { memo, useState, useEffect } from "react";
import ArrowButton from "@/app/[lang]/components/UI/Buttons/ArrowButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

const User = ({
  font,
  userData,
  // user,
  lang,
}) => {
  return (
    <div className='hidden xl:flex xl:gap-[10px]'>
      <Default
        userData={userData}
        //  user={user}
      />
      <div>
        <div className='mb-[6px]'>
          {/* {user ? (
            <p className={font.className + " " + "text-[#262626] font-[400]"}>
              {lang.sidebar.user.user_greating}
              {user.username}
            </p>
          ) : (
            <p className="font-[500] text-[12px] text-[#5E5E5E] mb-[5px]">
              {lang.sidebar.user.user_greating_default}
            </p>
          )} */}
          {userData ? (
            <p className={font.className + " " + "text-[#262626] font-[400]"}>
              {lang.sidebar.user.user_greating}
              {userData.first_name}
            </p>
          ) : (
            <p className='font-[500] text-[12px] text-[#5E5E5E] mb-[5px]'>
              {lang.sidebar.user.user_greating_default}
            </p>
          )}
        </div>
        <div>
          <Link href={userData ? `/${lang.locale}/my-profile` : `/${lang.locale}/pages/sign-up`}>
            <ArrowButton
              className={!userData ? "w-[100px]" : ""}
              label={
                userData
                  ? `${lang.sidebar.user.user_button_auth}`
                  : `${lang.sidebar.user.user_button_login}`
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(User);
