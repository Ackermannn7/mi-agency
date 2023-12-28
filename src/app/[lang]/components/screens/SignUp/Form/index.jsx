"use client";
import { Input } from "../../../UI/Inputs/Input";
import { MultipleSelect } from "../../../UI/Selects/MultipleSelect";
import MainButton from "../../../UI/Buttons/MainButton";
import { useRef, useState } from "react";
import { Alert, Modal } from "antd";
import ky from "ky";
import Link from "next/link";

const success = (lang) => {
  Modal.success({
    title: lang.login_page.created_profile.success_modal.title,
    content: (
      <div className="text-left">
        <p className="text-[16px] mb-[10px] font-unbounded">
          {lang.login_page.created_profile.success_modal.text}
        </p>
        <MainButton className="ml-[50px] md:ml-[40px]">
          <Link className="text-white" href={`/${lang.locale}/get-tested`}>
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

export const Form = ({ lang }) => {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [modal, setModal] = useState(false);

  //   const [scopes, setScopes] = useState([]);
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [messageError, setMessageError] = useState("");

  //   const onChangeMultipleSelectScopes = (value) => {
  //     setScopes(value);
  //   };

  const onCloseErrorAlert = () => {
    setMessageError("");
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const data = {
      username: username,
      password: password,
      re_password: repeatedPassword,
      email: email,
      //   scopes,
      //   avatar: "",
    };
    success(lang);

    await ky
      .post(`https://psymi.com.ua/${lang.backend_locale}/api/auth/users/`, {
        json: data,
      })
      .json()
      .then(() => success())
      .catch((err) => console.log(err));
  };

  //   const lastStepRegister = () => {
  //     setMessageError("");
  //     setModal(!modal);
  //   };

  const handleRegistrationButton = () => {
    if (email === "") {
      setMessageError("Ви не ввели пошту!");
      return false;
    } else if (username === "") {
      return setMessageError("Щоб продовжити реєстрацію, введіть Ваше ім'я");
    } else if (password === "") {
      setMessageError("Enter your password");
    } else if (password !== repeatedPassword) {
      setMessageError("Passwords do not match");
    } else {
      setMessageError(""); // Сбрасываем сообщение об ошибке
      handleSubmit(); // Вызываем отправку формы
    }
  };

  return (
    <div className="md:ml-[180px] w-full md:w-[350px] bg-white flex flex-col items-center pt-[25px] px-[30px] pb-[30px] rounded-[15px]">
      <h2 className="text-center text-[#347AEC] font-unbounded text-[22px] font-[400] mb-[22px]">
        Sign up
      </h2>
      <form className="w-[250px] flex flex-col items-center justify-between gap-[25px] py-[30px]">
        <Input
          ref={emailRef}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-[12px] placeholder:text-[12px]"
          placeholder="Email адреса*"
        />
        <Input
          ref={usernameRef}
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full text-[12px] placeholder:text-[12px]"
          placeholder="Нікнейм*"
        />
        <Input
          ref={passwordRef}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-[12px] placeholder:text-[12px]"
          placeholder="Пароль*"
        />
        <Input
          ref={passwordRef}
          type="password"
          onChange={(e) => setRepeatedPassword(e.target.value)}
          className="w-full text-[12px] placeholder:text-[12px]"
          placeholder="Повторити пароль*"
        />
        <MainButton
          onClick={handleRegistrationButton}
          className="w-[200px] h-[40px] text-[12px]"
          label={lang.login_page.created_profile.register_btn}
        />
      </form>
      {messageError !== "" && (
        <Alert
          className="mt-[30px] md:mt-[15px] rounded-t-[0px] border-t-0"
          message={messageError}
          type="info"
          closable
          onClose={onCloseErrorAlert}
        />
      )}
      {password !== "" && (
        <Alert
          className="mt-[20px]"
          message={
            <div className="px-[30px]">
              <ol className="list-disc">
                <li
                  className={
                    /^\S*$/.test(password)
                      ? "line-through text-green-600"
                      : "text-red-600"
                  }
                >
                  Пароль не повинен містити пробілів
                </li>
                <li
                  className={
                    /^(?=.*[A-Z]).*$/.test(password)
                      ? "line-through text-green-600"
                      : "text-red-600"
                  }
                >
                  Пароль повинен містити хоча б один символ верхнього регістру
                </li>
                <li
                  className={
                    /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(
                      password
                    )
                      ? "line-through text-green-600"
                      : "text-red-600"
                  }
                >
                  Пароль повинен містити принаймні один спеціальний символ
                  <br />
                  (!@#$%^&*)
                </li>
              </ol>
            </div>
          }
          type="warning"
        />
      )}
    </div>
  );
};
