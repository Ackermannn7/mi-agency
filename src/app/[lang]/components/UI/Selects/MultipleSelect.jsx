"use client";

import { Select } from "antd";
export const MultipleSelect = ({ className = "", onChange, lang }) => {
  const options = [
    {
      value: "ceo_n_founder",
      label: lang.login_page.created_profile.activity.ceo_n_founder,
    },
    {
      value: "ceo",
      label: lang.login_page.created_profile.activity.ceo,
    },
    {
      value: "c_lvl_spec",
      label: lang.login_page.created_profile.activity.c_level,
    },
    {
      value: "junior_spec",
      label: lang.login_page.created_profile.activity.junior_specialist,
    },
    {
      value: "mid_spec",
      label: lang.login_page.created_profile.activity.middle_specialist,
    },
    {
      value: "sen_spec",
      label: lang.login_page.created_profile.activity.senior_specialist,
    },
    {
      value: "hrd",
      label: lang.login_page.created_profile.activity.hrd,
    },
    {
      value: "hrg",
      label: lang.login_page.created_profile.activity.hrg,
    },
    {
      value: "hr",
      label: lang.login_page.created_profile.activity.hr,
    },
    {
      value: "recruiter",
      label: lang.login_page.created_profile.activity.recruiter,
    },
    {
      value: "psychologist",
      label: lang.login_page.created_profile.activity.psychologist,
    },
    {
      value: "other",
      label: lang.login_page.created_profile.activity.other,
    },
  ];

  const selectProps = {
    style: {
      width: "100%",
      fontFamily: "inherit",
      fontWeight: "medium",
    },
    onChange: onChange,
    autoClearSearchValue: false,
    options,
    showArrow: true,
    border: false,
    maxTagCount: "responsive",
  };

  return (
    <Select
      placeholder={lang.login_page.created_profile.activity.placeholder}
      className={` ${className} select-proff placeholder:italic`}
      {...selectProps}
    />
  );
};
