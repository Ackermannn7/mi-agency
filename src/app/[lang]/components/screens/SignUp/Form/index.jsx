"use client";
import { Input } from "../../../UI/Inputs/Input";
import { MultipleSelect } from "../../../UI/Selects/MultipleSelect";
import MainButton from "../../../UI/Buttons/MainButton";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Modal } from "antd";
import axios from "axios";
// import ky from "ky";
import Link from "next/link";
import { useScreenSize } from "@/hooks/useScreenSize";
// import { validationPassword } from "@/_helpers/validationPassword";
const success = (lang) => {
  Modal.success({
    title: lang.login_page.created_profile.success_modal.title,
    content: (
      <div className='text-left'>
        <p className='text-[16px] mb-[10px] font-unbounded'>
          {lang.login_page.created_profile.success_modal.register_text}
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

const errorModal = (lang, messageError) => {
  console.log(lang);
  Modal.error({
    title: lang.login_page.created_profile.error_modal.title,
    content: (
      <div className='text-left'>
        <p className='text-[16px] mb-[10px] font-unbounded'>{messageError}</p>
      </div>
    ),
    closable: true,
    centered: true,
    footer: null,
  });
};

export const Form = ({ lang }) => {
  const { isNotDesktop } = useScreenSize();
  const router = useRouter();
  const emailRef = useRef(null);
  const firstnameRef = useRef(null);
  const passwordRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [scope, setScope] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [messageError, setMessageError] = useState("");

  const onChangeMultipleSelectScopes = (value) => {
    setScope(value);
  };

  const onCloseErrorAlert = () => {
    setMessageError("");
  };

  const handleSubmitLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const data = {
      email: email,
      password: password,
    };

    try {
      const loginResponse = await axios.post(
        `https://psymi.com.ua/${lang.backend_locale}/api/auth/token/login/`,
        {
          email: data.email,
          password: data.password,
        },
      );
      if (loginResponse.data.auth_token) {
        localStorage.setItem("authToken", loginResponse.data.auth_token);
        router.push(`/${lang.locale}/my-profile`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      const fieldError = Object.values(error.response.data)[0];

      if (Array.isArray(fieldError) && fieldError.length > 0) {
        const errorMessage = fieldError[0];

        errorModal(lang, errorMessage);
      }
    }
  };
  const handleSubmitRegister = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const data = {
      first_name: first_name,
      password: password,
      re_password: repeatedPassword,
      email: email,
      scope: scope,
    };

    try {
      // Register user
      await axios.post(`https://psymi.com.ua/${lang.backend_locale}/api/auth/users/`, data);

      // Login user after registration
      const loginResponse = await axios.post(
        `https://psymi.com.ua/${lang.backend_locale}/api/auth/token/login/`,
        {
          email: data.email,
          password: data.password,
        },
      );

      // Check if the login was successful
      if (loginResponse.data.auth_token) {
        // Store the auth token in localStorage
        localStorage.setItem("authToken", loginResponse.data.auth_token);

        // Redirect to the "my-profile" page or any other page
        // You can use Next.js router for navigation
        router.push(`/${lang.locale}/my-profile`);

        // Call the success function with the language
        success(lang);
      }
    } catch (error) {
      const fieldError = Object.values(error.response.data)[0];

      if (Array.isArray(fieldError) && fieldError.length > 0) {
        const errorMessage = fieldError[0];

        // Display the error message in your modal window
        // Update this part with your code to show the modal

        // Set the error message in the component's state (optional)
        // setMessageError(errorMessage);
        errorModal(lang, errorMessage);
      }
    }
  };

  const handleRegistrationButton = () => {
    // const validationResult = validationPassword(password);
    if (email === "") {
      setMessageError(lang.login_page.handle_errors.email_empty);
      return false;
    } else if (first_name === "") {
      return setMessageError(lang.login_page.handle_errors.email_empty);
    } else if (password === "") {
      setMessageError(lang.login_page.handle_errors.password_empty);
    } else if (password !== repeatedPassword) {
      setMessageError(lang.login_page.handle_errors.password_match_error);
    } else if (scope === "") {
      setMessageError(lang.login_page.handle_errors.scope_empty);
    } else {
      // for (const rule in validationResult) {
      //   if (validationResult[rule].violated) {
      //     setMessageError(validationResult[rule].message);
      //     return;
      //   }
      // }
      setMessageError("");
      setModal(!modal); // Сбрасываем сообщение об ошибке
      handleSubmitRegister(); // Вызываем отправку формы
    }
  };
  const handleLoginButton = () => {
    // const validationResult = validationPassword(password);
    if (email === "") {
      return setMessageError(lang.login_page.handle_errors.email_empty);
    } else if (password === "") {
      setMessageError(lang.login_page.handle_errors.password_empty);
    } else {
      setMessageError("");
      setModal(!modal); // Сбрасываем сообщение об ошибке
      handleSubmitLogin(); // Вызываем отправку формы
    }
  };

  return (
    <div className='flex gap-[20px]'>
      <div className='mb-[50px] xl:mb-0 w-full xl:w-[350px] bg-white flex flex-col items-center pt-[25px] px-[30px] pb-[30px] rounded-[15px]'>
        <h2 className='text-center text-[#347AEC] font-unbounded text-[22px] font-[400]'>
          {!isLoginForm ? lang.login_page.form.header_sign_up : lang.login_page.form.header_login}
        </h2>
        {messageError && (
          <Alert
            className='rounded-[0px] mt-[15px]'
            message={messageError}
            type='info'
            closable
            onClose={onCloseErrorAlert}
          />
        )}
        <form className='w-[250px] flex flex-col items-center justify-between gap-[25px] py-[20px]'>
          <Input
            ref={emailRef}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            className='w-full text-[12px] placeholder:text-[12px]'
            placeholder={`${lang.login_page.form.email}*`}
          />

          {!isLoginForm && (
            <Input
              ref={firstnameRef}
              type='firstname'
              onChange={(e) => setFirstName(e.target.value)}
              className='w-full text-[12px] placeholder:text-[12px]'
              placeholder={`${lang.login_page.form.first_name}*`}
            />
          )}
          <Input
            ref={passwordRef}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='w-full text-[12px] placeholder:text-[12px]'
            placeholder={`${lang.login_page.form.password}*`}
          />
          {!isLoginForm && (
            <>
              <Input
                ref={passwordRef}
                type='password'
                onChange={(e) => setRepeatedPassword(e.target.value)}
                className='w-full text-[12px] placeholder:text-[12px]'
                placeholder={`${lang.login_page.form.re_password}*`}
              />
              <MultipleSelect
                lang={lang}
                onChange={(value) => onChangeMultipleSelectScopes(value)}
              />
            </>
          )}

          <MainButton
            onClick={!isLoginForm ? handleRegistrationButton : handleLoginButton}
            className='w-[200px] h-[40px] text-[12px]'
            label={
              !isLoginForm
                ? lang.login_page.created_profile.register_btn
                : lang.login_page.created_profile.login_btn
            }
          />
        </form>
        {isNotDesktop && !isLoginForm && (
          <Alert
            message={
              <div className='px-[30px]'>
                <ol className='list-disc'>
                  <li
                    className={
                      /^.{8,16}$/.test(password) ? "line-through text-green-600" : "text-red-600"
                    }
                  >
                    {lang.login_page.handle_errors.alert_modal.password_length}
                  </li>
                  <li
                    className={
                      /^\S*$/.test(password) && password.length !== 0
                        ? "line-through text-green-600"
                        : "text-red-600"
                    }
                  >
                    {lang.login_page.handle_errors.alert_modal.password_spacing}
                  </li>
                  <li
                    className={
                      /^(?=.*[A-Z]).*$/.test(password)
                        ? "line-through text-green-600"
                        : "text-red-600"
                    }
                  >
                    {lang.login_page.handle_errors.alert_modal.password_uppercase}
                  </li>
                  <li
                    className={
                      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)
                        ? "line-through text-green-600"
                        : "text-red-600"
                    }
                  >
                    {lang.login_page.handle_errors.alert_modal.password_spec_key}
                    <br />
                    (!@#$%^&*)
                  </li>
                  <li
                    className={
                      password === repeatedPassword &&
                      password.length !== 0 &&
                      repeatedPassword.length !== 0
                        ? "line-through text-green-600"
                        : "text-red-600"
                    }
                  >
                    {lang.login_page.handle_errors.alert_modal.passwords_match}
                  </li>
                </ol>
              </div>
            }
            type='warning'
          />
        )}
        <button
          className='text-[#347AEC] hover:text-[#6764E7] duration-500 mx-auto block mt-[15px] px-[20px] font-unbounded'
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {!isLoginForm
            ? `${lang.login_page.form.logged_in}`
            : `${lang.login_page.form.registered}`}
        </button>
      </div>
      {!isNotDesktop && !isLoginForm && (
        <Alert
          message={
            <div className='px-[30px]'>
              <ol className='list-disc'>
                <li
                  className={
                    /^.{8,16}$/.test(password) ? "line-through text-green-600" : "text-red-600"
                  }
                >
                  {lang.login_page.handle_errors.alert_modal.password_length}
                </li>
                <li
                  className={
                    /^\S*$/.test(password) && password.length !== 0
                      ? "line-through text-green-600"
                      : "text-red-600"
                  }
                >
                  {lang.login_page.handle_errors.alert_modal.password_spacing}
                </li>
                <li
                  className={
                    /^(?=.*[A-Z]).*$/.test(password)
                      ? "line-through text-green-600"
                      : "text-red-600"
                  }
                >
                  {lang.login_page.handle_errors.alert_modal.password_uppercase}
                </li>
                <li
                  className={
                    /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)
                      ? "line-through text-green-600"
                      : "text-red-600"
                  }
                >
                  {lang.login_page.handle_errors.alert_modal.password_spec_key}
                  <br />
                  (!@#$%^&*)
                </li>
                <li
                  className={
                    password === repeatedPassword &&
                    password.length !== 0 &&
                    repeatedPassword.length !== 0
                      ? "line-through text-green-600"
                      : "text-red-600"
                  }
                >
                  {lang.login_page.handle_errors.alert_modal.passwords_match}
                </li>
              </ol>
            </div>
          }
          type='warning'
        />
      )}
    </div>
  );
};
