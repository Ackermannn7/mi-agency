const LoginGoogle = ({ onClick, lang }) => {
  return (
    <button
      onClick={onClick}
      className='flex justify-center items-center bg-[#347AEC] hover:bg-[#6764E7] duration-500 rounded-[29px] py-[7px] px-[13px] gap-[7px]'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='19'
        height='18'
        viewBox='0 0 19 18'
        fill='none'
      >
        <path
          d='M19 9C19 4.02944 14.9706 0 10 0H9C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18H10C14.9706 18 19 13.9706 19 9Z'
          fill='#F2F5F8'
        />
        <path
          fill-rule='evenodd'
          clipRule='evenodd'
          d='M14.149 9.10234C14.149 8.78325 14.1188 8.47643 14.0626 8.18188H9.58899V9.92257H12.1454C12.0352 10.4851 11.7006 10.9617 11.1975 11.2808V12.4098H12.7326C13.6308 11.6264 14.149 10.4728 14.149 9.10234Z'
          fill='#347AEC'
        />
        <path
          fill-rule='evenodd'
          clipRule='evenodd'
          d='M9.58878 13.5C10.8713 13.5 11.9465 13.097 12.7324 12.4098L11.1973 11.2807C10.772 11.5507 10.2279 11.7102 9.58878 11.7102C8.35161 11.7102 7.30445 10.9186 6.93093 9.85498H5.34399V11.0209C6.12559 12.4916 7.73195 13.5 9.58878 13.5Z'
          fill='#347AEC'
        />
        <path
          fill-rule='evenodd'
          clipRule='evenodd'
          d='M6.93115 9.85492C6.83615 9.58492 6.78217 9.29651 6.78217 8.99992C6.78217 8.70333 6.83615 8.41492 6.93115 8.14492V6.979H5.34422C5.02251 7.58651 4.83899 8.27378 4.83899 8.99992C4.83899 9.72606 5.02251 10.4133 5.34422 11.0208L6.93115 9.85492Z'
          fill='#347AEC'
        />
        <path
          fill-rule='evenodd'
          clipRule='evenodd'
          d='M9.58878 6.28978C10.2862 6.28978 10.9123 6.51682 11.4046 6.96273L12.767 5.67205C11.9443 4.94591 10.8691 4.5 9.58878 4.5C7.73195 4.5 6.12559 5.50841 5.34399 6.9791L6.93093 8.14501C7.30445 7.08137 8.35161 6.28978 9.58878 6.28978Z'
          fill='#347AEC'
        />
      </svg>
      <p className='font-unbounded text-[14px] font-[400] text-white'>
        {lang.login_page.google_provider.login_button}
      </p>
    </button>
  );
};

export default LoginGoogle;
