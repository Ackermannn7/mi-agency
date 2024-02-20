"use client";
import avatarImg from "/public/_assets/images/mi-avatar.png";
import Image from "next/image";
import LoginGoogle from "../../../UI/Buttons/LoginGoogle";
import { signIn } from "next-auth/react";
import { Form } from "../Form";
import { useEffect } from "react";
import { redirect } from "next/navigation";
export const Authorization = ({ session, lang }) => {
  useEffect(() => {
    const isAuth = Boolean(localStorage.getItem("authToken"));
    isAuth && redirect(`/${lang.locale}/my-profile/`);
  }, []);
  return (
    <section className='flex flex-col xl:flex-row items-center xl:items-start xl:gap-[50px]'>
      <Image
        className='xl:mt-[30px]'
        src={avatarImg}
        alt={"robot"}
        width={190}
        height={255}
        loading={"lazy"}
      />
      <div className='flex flex-col items-center xl:items-start max-w-[500px] py-[30px] text-center xl:text-left'>
        <h1 className='text-[#262626] text-[22px] font-[400] font-unbounded leading-7 mb-[15px]'>
          {lang.login_page.google_provider.header}{" "}
        </h1>
        <p className='text-[#262626] font-[500] leading-5 mb-[20px]'>
          <span className='text-[#347AEC] font-[700] leading-5'>
            {lang.login_page.google_provider.p_highlight}
          </span>
          {lang.login_page.google_provider.p_default}
        </p>
        {/* {!session && (
          <LoginGoogle lang={lang} onClick={() => signIn("google")} />
        )} */}
        <Form lang={lang} />
      </div>
    </section>
  );
};
