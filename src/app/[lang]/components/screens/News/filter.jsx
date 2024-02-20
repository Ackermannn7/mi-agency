"use client";
import { useState } from "react";
import { Select, Tag, Checkbox } from "antd";
import { useScreenSize } from "@/hooks/useScreenSize";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

export const Filter = ({ lang, onFilterChange }) => {
  const { width } = useScreenSize();
  console.log(width);
  const [selectedSocial, setSelectedSocial] = useState([]);
  const [selectedSphere, setSelectedSphere] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [showBlock, setShowBlock] = useState(false);

  const optionsSocial = [
    {
      label: "Medium",
      value: "Medium",
    },
    {
      label: "LinkedIn",
      value: "LinkedIn",
    },
  ];
  const optionsCategories = [
    {
      label: lang.news_page.filter.sphere_options.it,
      value: "#IT",
    },
    {
      label: lang.news_page.filter.sphere_options.hr,
      value: "#HR",
    },
    {
      label: lang.news_page.filter.sphere_options.psychology,
      value: "#psychology",
    },
    {
      label: lang.news_page.filter.sphere_options.management,
      value: "#management",
    },
    {
      label: lang.news_page.filter.sphere_options.brand,
      value: "#brand",
    },
    {
      label: lang.news_page.filter.sphere_options.business,
      value: "#business",
    },
    {
      label: lang.news_page.filter.sphere_options.ai,
      value: "#AI",
    },
  ];
  const optionsLanguage = [
    {
      label: lang.news_page.filter.lang_options.ua,
      value: "ukr",
    },
    {
      label: lang.news_page.filter.lang_options.eng,
      value: "eng",
    },
  ];
  const toggleBlock = () => {
    setShowBlock(!showBlock);
  };
  return (
    <div>
      {width < 1025 ? (
        <div>
          <div
            onClick={toggleBlock}
            className='flex items-center justify-center z-10 fixed bottom-[11%]
      left-1/2 transform -translate-x-1/2 my-[20px] rounded-[50px] max-w-[185px] w-full h-[45px] bg-white shadow-lg'
          >
            <div className='flex gap-[10px] text-center items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='14'
                viewBox='0 0 14 14'
                fill='none'
              >
                <path
                  fill-rule='evenodd'
                  clipRule='evenodd'
                  d='M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z'
                  fill='black'
                />
                <path
                  d='M7.15209 9.91168C7.08007 10.0294 6.91993 10.0294 6.84791 9.91168L4.03043 5.30485C3.95049 5.17415 4.03738 5 4.18252 5L9.81748 5C9.96262 5 10.0495 5.17415 9.96957 5.30485L7.15209 9.91168Z'
                  fill='black'
                />
              </svg>
              <div className='flex items-center'>
                <p className='text-black text-[16px] font-[500]'>{lang.news_page.filter.title}</p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='10'
                  height='10'
                  viewBox='0 0 10 2'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clipRule='evenodd'
                    d='M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z'
                    fill='white'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col gap-8 py-[30px] px-[20px] z-50 w-full max-h-[100%] h-[88%] rounded-[10px] shadow-lg bg-white fixed bottom-0 left-0  ${
              showBlock
                ? "opacity-100 transition-opacity duration-500 ease-in-out"
                : "opacity-0 invisible"
            }`}
          >
            <div
              onClick={() => {
                setSelectedLanguage([]);
                setSelectedSocial([]);
                setSelectedSphere([]);
                onFilterChange({
                  social: [],
                  category: [],
                  language: [],
                });
                toggleBlock();
              }}
              className='flex items-center justify-center w-[35px] h-[35px] absolute right-[30px] top-[20px] bg-[#F2F5F8] rounded-[50%]'
            >
              <svg
                width='15'
                height='14'
                viewBox='0 0 15 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.3333 1.56409L1.66663 13.2308M13.3333 13.2308L1.66663 1.56409'
                  stroke='#5D5D5D'
                  stroke-width='1.5'
                  stroke-linecap='round'
                />
              </svg>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-22px font-unbounded '>{lang.news_page.filter.resource}</p>
              <Checkbox.Group
                className='flex flex-col gap-2'
                options={optionsSocial}
                value={selectedSocial}
                onChange={(value) => {
                  setSelectedSocial(value);
                }}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-22px font-unbounded '>{lang.news_page.filter.sphere}</p>
              <Checkbox.Group
                className='flex flex-col gap-2'
                options={optionsCategories}
                value={selectedSphere}
                onChange={(value) => {
                  setSelectedSphere(value);
                }}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-22px font-unbounded '>{lang.news_page.filter.language}</p>
              <Checkbox.Group
                className='flex flex-col gap-2'
                options={optionsLanguage}
                value={selectedLanguage}
                onChange={(value) => {
                  setSelectedLanguage(value);
                }}
              />
            </div>
            <div
              onClick={() => {
                onFilterChange({
                  social: selectedSocial,
                  category: selectedSphere,
                  language: selectedLanguage,
                });
                toggleBlock();
              }}
              className='w-full h-[35px] flex items-center justify-center gap-2 bg-[#F2F5F8] rounded-[50px] text-[13px] text-[#262626] font-semibold uppercase'
            >
              <svg
                width='12'
                height='10'
                viewBox='0 0 14 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 7.25L4.27273 11L13 1'
                  stroke='#262626'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>

              <p>{lang.news_page.filter.apply_filters}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='my-[20px] flex items-center gap-[22px]'>
          <Select
            value={selectedSocial}
            onChange={(value) => {
              setSelectedSocial(value);
              onFilterChange({
                social: value,
                category: selectedSphere,
                language: selectedLanguage,
              });
            }}
            mode='tags'
            className={`border border-solid border-[#DCDCDC] hover:bg-[#6764E7]  duration-500 rounded-[100px] text-black cursor-pointer ${
              selectedSocial.length > 0 ? "bg-[#347AEC]" : "bg-transparent"
            }`}
            showArrow={false}
            tagRender={tagRender}
            maxTagCount='responsive'
            style={{
              width: "157px",
            }}
            options={optionsSocial}
            bordered={false}
            placeholder={
              <div className='cursor-pointer duration-500 flex items-center justify-between'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clipRule='evenodd'
                    d='M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z'
                    fill={selectedSocial?.length > 0 ? "white" : "#262626"}
                  />
                  <path
                    d='M7.15209 9.91168C7.08007 10.0294 6.91993 10.0294 6.84791 9.91168L4.03043 5.30485C3.95049 5.17415 4.03738 5 4.18252 5L9.81748 5C9.96262 5 10.0495 5.17415 9.96957 5.30485L7.15209 9.91168Z'
                    fill={selectedSocial.length > 0 ? "white" : "#262626"}
                  />
                </svg>
                <div className='flex items-center gap-[10px]'>
                  <p
                    className={`${
                      selectedSocial.length > 0 ? "text-white" : "text-black"
                    } text-[16px] font-[500]`}
                  >
                    {lang.news_page.filter.resource}
                  </p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='10'
                    height='10'
                    viewBox='0 0 10 2'
                    fill='none'
                  >
                    <path
                      fill-rule='evenodd'
                      clipRule='evenodd'
                      d='M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z'
                      fill={selectedSocial.length > 0 ? "white" : "#262626"}
                    />
                  </svg>
                </div>
              </div>
            }
          />
          <Select
            value={selectedSphere}
            onChange={(value) => {
              setSelectedSphere(value);
              onFilterChange({
                social: selectedSocial,
                category: value,
                language: selectedLanguage,
              });
            }}
            style={{
              width: "157px",
            }}
            mode='tags'
            showArrow={false}
            tagRender={tagRender}
            maxTagCount='responsive'
            options={optionsCategories}
            className={`border border-solid border-[#DCDCDC] hover:bg-[#6764E7]  duration-500 rounded-[100px] text-black cursor-pointer ${
              selectedSphere.length > 0 ? "bg-[#347AEC]" : "bg-transparent"
            }`}
            bordered={false}
            placeholder={
              <div className='bg-transparent flex items-center justify-between'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clipRule='evenodd'
                    d='M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z'
                    fill='#262626'
                  />
                  <path
                    d='M7.15209 9.91168C7.08007 10.0294 6.91993 10.0294 6.84791 9.91168L4.03043 5.30485C3.95049 5.17415 4.03738 5 4.18252 5L9.81748 5C9.96262 5 10.0495 5.17415 9.96957 5.30485L7.15209 9.91168Z'
                    fill='#262626'
                  />
                </svg>
                <div className='flex items-center gap-[10px]'>
                  <p
                    className='text-[#262626] text-[16px] font-[500] '
                    style={{ flex: 1, justifyContent: "space-between" }}
                  >
                    {lang.news_page.filter.sphere}
                  </p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='10'
                    height='10'
                    viewBox='0 0 10 2'
                    fill='none'
                  >
                    <path
                      fill-rule='evenodd'
                      clipRule='evenodd'
                      d='M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z'
                      fill='#262626'
                    />
                  </svg>
                </div>
              </div>
            }
          />
          <Select
            value={selectedLanguage}
            onChange={(value) => {
              setSelectedLanguage(value);
              onFilterChange({ social: selectedSocial, category: selectedSphere, language: value });
            }}
            style={{
              width: "157px",
              padding: "0 0px",
            }}
            mode='tags'
            showArrow={false}
            tagRender={tagRender}
            maxTagCount='responsive'
            options={optionsLanguage}
            className={`border border-solid border-[#DCDCDC] hover:bg-[#6764E7]  duration-500 rounded-[100px] text-black cursor-pointer ${
              selectedLanguage.length > 0 ? "bg-[#347AEC]" : "bg-transparent"
            }`}
            bordered={false}
            placeholder={
              <div className='bg-transparent flex items-center justify-between'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clipRule='evenodd'
                    d='M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13ZM7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z'
                    fill='#262626'
                  />
                  <path
                    d='M7.15209 9.91168C7.08007 10.0294 6.91993 10.0294 6.84791 9.91168L4.03043 5.30485C3.95049 5.17415 4.03738 5 4.18252 5L9.81748 5C9.96262 5 10.0495 5.17415 9.96957 5.30485L7.15209 9.91168Z'
                    fill='#262626'
                  />
                </svg>
                <div className='flex items-center  gap-[10px]'>
                  <p className='text-[#262626] text-[16px] font-[500]'>
                    {lang.news_page.filter.language}
                  </p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='10'
                    height='10'
                    viewBox='0 0 10 2'
                    fill='none'
                  >
                    <path
                      fill-rule='evenodd'
                      clipRule='evenodd'
                      d='M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z'
                      fill='#262626'
                    />
                  </svg>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};
