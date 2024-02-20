export const QuestionsSection = ({
  isShownResult,
  setIsShownResult,
  checkFinish,
  question,
  lang,
}) => {
  return (
    <div className='w-full bg-white shadow-2xl px-[25px] xl:px-[40px] py-[19px] rounded-[10px]'>
      {checkFinish ? (
        <button
          onClick={() => {
            setIsShownResult(!isShownResult);
            setTimeout(() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth", // Optional: Add smooth scrolling behavior
              });
            }, 200);
          }}
          className='flex items-center justify-center flex-col gap-[5px] w-full py-[26px]'
        >
          <span className='text-[#262626] text-center font-unbounded text-[16px] xl:text-[22px]'>
            {lang.enneagram_page.get_result_btn}
          </span>
          <svg
            className='w-[18px] h-[10px] xl:w-22 xl:h-11'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 22 11'
            fill='none'
          >
            <path
              fill-rule='evenodd'
              clipRule='evenodd'
              d='M0.219168 0.375342C0.564178 -0.0559202 1.19347 -0.125842 1.62473 0.219168L11 7.71941L20.3753 0.219168C20.8066 -0.125842 21.4359 -0.0559202 21.7809 0.375342C22.1259 0.806604 22.056 1.4359 21.6247 1.78091L11 10.2807L0.375342 1.78091C-0.0559202 1.4359 -0.125842 0.806604 0.219168 0.375342Z'
              fill='#262626'
            />
          </svg>
        </button>
      ) : (
        <p className='font-unbounded text-[16px] xl:text-[22px] font-[400] leading-[130%] text-center'>
          {question}
        </p>
      )}
    </div>
  );
};
