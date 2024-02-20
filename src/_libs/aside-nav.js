import { useScreenSize } from "@/hooks/useScreenSize";

export const asideNav = () => {
  const { isNotDesktop } = useScreenSize();
  console.log(isNotDesktop);
  const nav = [
    {
      key: "0",
      href: `/`,
      // href: `${params.lang}/`,
      slug: "",
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={!isNotDesktop ? "13" : "18"}
          height={!isNotDesktop ? "13" : "18"}
          viewBox='0 0 11 12'
          fill='none'
        >
          <path
            d='M4 11V7.19602C4 6.84587 4.26863 6.56202 4.6 6.56202H6.4C6.73137 6.56202 7 6.84587 7 7.19602V11M5.15229 1.11732L1.25229 4.04779C1.09401 4.16672 1 4.35925 1 4.56447V10.049C1 10.5742 1.40294 11 1.9 11H9.1C9.59706 11 10 10.5742 10 10.049V4.56447C10 4.35925 9.90599 4.16672 9.74771 4.04779L5.84771 1.11732C5.63954 0.960894 5.36046 0.960894 5.15229 1.11732Z'
            stroke='#5D5D5D'
            strokeLinecap='round'
          />
        </svg>
      ),
    },
    {
      key: "1",
      href: `/get-tested/`,
      // href: `${params.lang}/get-tested/`,
      slug: "get-tested",
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={!isNotDesktop ? "13" : "18"}
          height={!isNotDesktop ? "13" : "18"}
          viewBox='0 0 13 13'
          fill='none'
        >
          <path
            d='M12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C7.36292 1 8.17943 1.19873 8.90625 1.55291M10.9688 3.0625L6.15625 7.875L4.78125 6.5'
            stroke='#5D5D5D'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
    {
      key: "2",
      href: `/my-profile`,
      // href: `${params.lang}/news`,
      slug: "my-profile",
      icon: (
        <svg
          width={!isNotDesktop ? "13" : "18"}
          height={!isNotDesktop ? "13" : "18"}
          viewBox='0 0 17 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0.625 14.625C1.78473 12.6906 4.3265 11.3667 8.29199 11.3667C12.2575 11.3667 14.7992 12.6906 15.959 14.625M11.442 4.65C11.442 6.3897 10.0317 7.8 8.29199 7.8C6.55229 7.8 5.14199 6.3897 5.14199 4.65C5.14199 2.9103 6.55229 1.5 8.29199 1.5C10.0317 1.5 11.442 2.9103 11.442 4.65Z'
            stroke='#5D5D5D'
            strokeWidth='1.2'
            strokeLinecap='round'
          />
        </svg>
      ),
    },
    {
      key: "3",
      href: `/news`,
      // href: `${params.lang}/news`,
      slug: "news",
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={!isNotDesktop ? "13" : "18"}
          height={!isNotDesktop ? "13" : "18"}
          viewBox='0 0 11 13'
          fill='none'
        >
          <path
            d='M7.23084 1V3.0625C7.23084 3.4422 7.54078 3.75 7.92313 3.75H10M3.42324 3.75H4.80782M3.42324 5.8125H7.57698M3.42324 7.875H7.57698M8.96156 2.03125C8.65345 1.75748 8.33372 1.43277 8.13188 1.22188C7.99757 1.08155 7.81199 1 7.61704 1H2.38464C1.61996 1 1.00006 1.6156 1.00005 2.37499L1 10.625C0.999995 11.3844 1.61989 12 2.38458 12L8.61522 12C9.37989 12 9.99979 11.3844 9.99981 10.625L9.99999 3.33626C10 3.16047 9.93247 2.99148 9.80961 2.86492C9.58242 2.63089 9.20304 2.24582 8.96156 2.03125Z'
            stroke='#5D5D5D'
            strokeWidth='0.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ),
    },
  ];
  return nav;
};
