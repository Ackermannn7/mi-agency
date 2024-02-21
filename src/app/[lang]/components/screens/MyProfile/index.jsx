"use client";

import { CldUploadButton } from "next-cloudinary";
import { useState, useEffect, useRef } from "react";
import { Image, Modal } from "antd";
import axios from "axios";
// import ky from "ky";
// import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import MainButton from "../../UI/Buttons/MainButton";
import { useScreenSize } from "@/hooks/useScreenSize";

const success = (lang) => {
  Modal.success({
    title: lang.login_page.created_profile.success_modal.title,
    content: (
      <>
        <div>
          <p className='text-[14px] font-unbounded'>
            {lang.login_page.created_profile.success_modal.upload_photo_text}
          </p>
        </div>
      </>
    ),
    closable: true,
    centered: true,
    footer: null,
    onCancel: () => window.location.reload(),
  });
};

const errorModal = (messageError) => {
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
const MyProfile = ({ lang }) => {
  const { width } = useScreenSize();
  const router = useRouter();
  const [contactMsg, setContactMsg] = useState(false);
  const inputFileRef = useRef(null);
  const [phone, setPhone] = useState("");
  const uploadImageBtnText = lang.profile_page.user.upload_image_btn;
  const [firstPart, secondPart] = uploadImageBtnText.split(" ");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const handleSetPhoto = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const authToken = localStorage.getItem("authToken");
      const file = e.target.files[0];
      const photo = new FormData();
      photo.append("photo", file);
      await axios.patch(`https://psymi.com.ua/${lang.backend_locale}/api/auth/users/me`, photo, {
        headers: {
          Authorization: `Token ${authToken}`,
          // "Content-Type": "multipart/form-data",
        },
      });
      if (inputFileRef.current) {
        inputFileRef.current.value = null;
      }
      success(lang);
    } catch (err) {
      // errorServer(lang);
      // Handle errors, log them, or show an error message
      const fieldError = Object.values(error.response.data)[0];

      if (Array.isArray(fieldError) && fieldError.length > 0) {
        const errorMessage = fieldError[0];

        errorModal(errorMessage);
      }
    }
  };
  const handleDeletePhoto = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.patch(
        `https://psymi.com.ua/${lang.backend_locale}/api/auth/users/me`,
        { photo: null },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        },
      );

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      const fieldError = Object.values(error.response.data)[0];

      if (Array.isArray(fieldError) && fieldError.length > 0) {
        const errorMessage = fieldError[0];

        errorModal(errorMessage);
      }
    }
  };
  const handleSetPhone = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await axios.patch(
        `https://psymi.com.ua/${lang.backend_locale}/api/auth/users/me`,
        { phone: phone },
        {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data) {
        setContactMsg(true);
      }
    } catch (err) {
      const fieldError = Object.values(error.response.data)[0];

      if (Array.isArray(fieldError) && fieldError.length > 0) {
        const errorMessage = fieldError[0];

        errorModal(errorMessage);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        router.replace(`/${lang.locale}/pages/sign-up`);
        return null;
      }

      try {
        // Use ky to make a request with the auth token in the headers
        const response = await axios.get(
          `https://psymi.com.ua/${lang.backend_locale}/api/auth/users/me`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        // Set the user data in the component state
        setUserData(response.data);
      } catch (error) {
        const fieldError = Object.values(error.response.data)[0];

        if (Array.isArray(fieldError) && fieldError.length > 0) {
          const errorMessage = fieldError[0];

          errorModal(errorMessage);
        }
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

  // Render logic based on the fetched user data or error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className='flex flex-col md:flex-row relative items-start gap-[20px] xl:gap-[47px] bg-white w-full py-[25px] px-[30px] rounded-[15px] shadow-xl'>
      <button
        className='text-[#5D5D5D] font-unbounded font-[400] absolute right-[25px] top-[20px]'
        onClick={() => {
          localStorage.removeItem("authToken");
          router.push(`/${lang.locale}/`);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }}
      >
        {lang.profile_page.user.sign_out_btn}
      </button>
      <div className='flex mx-auto md:mx-0'>
        <input className='hidden' id='projectCoverUploads' type='file' />
        {userData?.photo ? (
          <div
            className={`mx-auto flex items-center gap-[10px] ${
              width < 380 && "flex-col justify-center"
            }`}
          >
            <div className='rounded-[100%] border-1 border-solid border-[#347AEC] relative'>
              <button
                onClick={handleDeletePhoto}
                className='z-10 top-[5px] left-[10px] absolute w-[35px] h-[35px] rounded-[100%] bg-[#347AEC] hover:bg-[#6764E7] duration-500 flex items-center justify-center'
              >
                <svg
                  width='17'
                  height='18'
                  viewBox='0 0 17 18'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1.2746 3.54159L16.1527 3.54159M12.4332 16.5599H4.99412C3.967 16.5599 3.13436 15.7273 3.13436 14.7002V4.47147C3.13436 3.95791 3.55068 3.54159 4.06424 3.54159H13.363C13.8766 3.54159 14.2929 3.95791 14.2929 4.47147V14.7002C14.2929 15.7273 13.4603 16.5599 12.4332 16.5599ZM6.85388 3.54159H10.5734C11.087 3.54159 11.5033 3.12527 11.5033 2.61171V1.68183C11.5033 1.16827 11.087 0.751953 10.5734 0.751953H6.85388C6.34032 0.751953 5.924 1.16827 5.924 1.68183V2.61171C5.924 3.12527 6.34032 3.54159 6.85388 3.54159Z'
                    stroke='white'
                    stroke-linecap='round'
                  />
                </svg>
              </button>

              <Image
                className='rounded-[100%] object-cover'
                src={userData.photo}
                alt={userData.first_name}
                width={width < 380 ? 150 : 170}
                height={width < 380 ? 150 : 170}
                loading='lazy'
              />
            </div>
            <div className='md:hidden'>
              <p className='mb-[5px] text-[#5E5E5E] text-[10px] font-[500]'>
                {lang.profile_page.user.greeting}
              </p>
              <p className='text-[#262626] text-[22px] font-[400] font-unbounded mb-[15px]'>
                {userData?.first_name}
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`mx-auto flex items-center gap-[10px] ${
              width < 380 && "flex-col justify-center"
            }`}
          >
            <button
              className='group hover:bg-gradient-to-r from-[#347AEC] to-[#6764E7] duration-500 w-[170px] h-[170px] rounded-[100%] border-2 border-dashed border-[#347AEC] cursor-pointer'
              onClick={() => inputFileRef.current.click()}
            >
              <label
                className='group-hover:text-white text-[#262626] text-center font-unbounded text-[12px] font-[400] cursor-pointer'
                htmlFor='projectCoverUploads'
              >
                {firstPart} <br /> {secondPart}
              </label>
            </button>
            <input
              ref={inputFileRef}
              hidden
              type='file'
              accept='.png, .jpg, .jpeg, .webp'
              onChange={handleSetPhoto}
              className='group hover:bg-gradient-to-r from-[#347AEC] to-[#6764E7] duration-500 w-[170px] h-[170px] rounded-[100%] border-2 border-dashed border-[#347AEC] cursor-pointer'
            />

            <div className='md:hidden'>
              <p className='mb-[5px] text-[#5E5E5E] text-[10px] font-[500]'>
                {lang.profile_page.user.greeting}
              </p>
              <p className='text-[#262626] text-[22px] font-[400] font-unbounded mb-[15px]'>
                {userData?.first_name}
              </p>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className='hidden md:block'>
          <p className='text-[#5E5E5E] text-[10px] font-[500]'>{lang.profile_page.user.greeting}</p>
          <p className='text-[#262626] text-[22px] font-[400] font-unbounded md:mb-[15px]'>
            {userData?.first_name}
          </p>
        </div>

        <div className='max-w-[545px] text-[#262626] font-[500]'>
          <p>{lang.profile_page.user.description_1}</p>
          <p className='mt-[10px]'>
            <span className='text-[#347AEC] font-[700]'>
              {lang.profile_page.user.description_2_highlight}
            </span>{" "}
            {lang.profile_page.user.description_2}
          </p>
        </div>
        <div className='bg-[#F2F5F8] w-[212px] px-[14px] py-[9px] flex -items-center gap-[10px] rounded-[5px] mt-[15px]'>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={lang.profile_page.user.placeholder}
            className='bg-transparent w-full outline-none placeholder:text-[#5E5E5E] text-[10px] font-[500]'
          />
          <button onClick={handleSetPhone}>
            <svg
              className='w-[25px] h-[25px] xl:w-[16px] xl:h-[16px]'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='none'
            >
              <circle cx='8' cy='8' r='7.5' stroke='#347AEC' />
              <path
                d='M11.3536 8.35355C11.5488 8.15829 11.5488 7.84171 11.3536 7.64645L8.17157 4.46447C7.97631 4.2692 7.65973 4.2692 7.46447 4.46447C7.2692 4.65973 7.2692 4.97631 7.46447 5.17157L10.2929 8L7.46447 10.8284C7.2692 11.0237 7.2692 11.3403 7.46447 11.5355C7.65973 11.7308 7.97631 11.7308 8.17157 11.5355L11.3536 8.35355ZM5 8.5H11V7.5H5V8.5Z'
                fill='#347AEC'
              />
            </svg>
          </button>
        </div>
        <div>
          {contactMsg && (
            <p className='mt-[10px] text-[10px] font-medium'>
              Дякуємо за звернення! Ми зв’яжемося з Вами найближчим часом
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
