"use client";

import { Input } from "../../../UI/Inputs/Input";
import { MultipleSelect } from "../../../UI/Selects/MultipleSelect";
import MainButton from "../../../UI/Buttons/MainButton";
import { useRef, useState } from "react";
import { Alert, Modal } from "antd";
import ky from "ky";
import Link from "next/link";
import { useSession } from "next-auth/react";

const success = (lang) => {
  Modal.success({
    title: lang.login_page.created_profile.success_modal.title,
    content: (
      <div className='text-left'>
        <p className='text-[16px] mb-[10px] font-unbounded'>
          {lang.login_page.created_profile.success_modal.text}
        </p>
        <MainButton className='ml-[50px] xl:ml-[40px]'>
          <Link className='text-white' href={`/${lang.locale}/get-tested`}>
            {lang.login_page.created_profile.success_modal.link}
          </Link>
        </MainButton>
      </div>
    ),
    closable: true,
    centered: true,
    footer: null,
  });
};

const CreatedProfile = ({ session, lang }) => {
  const [modal, setModal] = useState(false);
  const [scopes, setScopes] = useState([]);
  const [username, setUsername] = useState("");
  const [messageError, setMessageError] = useState("");

  const onChangeMultipleSelectScopes = (value) => {
    setScopes(value);
  };

  const onCloseErrorAlert = () => {
    setMessageError("");
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const data = {
      username: username,
      // password: password,
      email: session.user.email,
      scopes,
      isRegistered: !session.user.isRegistered,
      // image: "",
    };

    await ky
      .put("/api/auth/sign-up", { json: data })
      .json()
      .then(() => success(lang))
      .catch((err) => console.log(err));
  };

  const handleRegistrationButton = () => {
    if (scopes.length === 0) {
      setMessageError(lang.login_page.created_profile.handle_registration.activity_error);
    } else if (username === "") {
      setMessageError(lang.login_page.created_profile.handle_registration.name_error);
    } else {
      setMessageError(""); // Сбрасываем сообщение об ошибке
      handleSubmit(); // Вызываем отправку формы
    }
  };

  return (
    <section className='bg-white shadow-2xl w-full xl:w-[545px] h-auto xl:h-[239px] pt-[25px] px-[30px] pb-[30px] rounded-[15px] xl:my-[30px]'>
      <h2 className='text-center text-[#347AEC] font-unbounded text-[22px] font-[400] mb-[22px]'>
        {lang.login_page.created_profile.header}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-[20px] xl:gap-0 xl:flex-row justify-between items-center'>
          <div className='w-[212px]'>
            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className='w-full'
              height={30}
              placeholder={lang.login_page.created_profile.name_label}
            />
          </div>
          <div className='w-[212px] relative group'>
            <MultipleSelect lang={lang} onChange={(value) => onChangeMultipleSelectScopes(value)} />
            <svg
              className='absolute right-[12px] bottom-[35%]'
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
            >
              <path
                className='group-hover:fill-[#7664E7] fill-[#347AEC]'
                fill-rule='evenodd'
                clipRule='evenodd'
                d='M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z'
                fill='#347AEC'
              />
              <path
                className='group-hover:fill-[#7664E7] fill-[#347AEC]'
                d='M7.15209 9.91168C7.08007 10.0294 6.91993 10.0294 6.84791 9.91168L4.03043 5.30485C3.95049 5.17415 4.03738 5 4.18252 5L9.81748 5C9.96262 5 10.0495 5.17415 9.96957 5.30485L7.15209 9.91168Z'
                fill='none'
              />
            </svg>
          </div>
        </div>
        <MainButton
          label={lang.login_page.created_profile.register_btn}
          onClick={handleRegistrationButton}
          className={`mx-auto block mt-[20px] ${messageError !== "" && "mb-[20px]"} h-[30px]`}
        />
      </form>

      {/* <hr />
      <button className="mx-auto block mt-[15px] font-unbounded">
        Зареєстровані? <br /> Увійти до облікового запису
      </button> */}
      {messageError !== "" && (
        <Alert
          className='mt-[30px] xl:mt-[15px] rounded-t-[0px] border-t-0'
          message={messageError}
          type='info'
          closable
          onClose={onCloseErrorAlert}
        />
      )}
    </section>
  );
};

export default CreatedProfile;
