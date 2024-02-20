import GreatingBlock from "./components/screens/Home/GreatingBlock";
import { Unbounded } from "next/font/google";
import TestPlatforms from "./components/screens/Home/TestPlatforms";
import Link from "next/link";
import { getDictionary } from "../../../getDictionary";
const Unbound = Unbounded({ subsets: ["latin"] });

export default async function Home({ params }) {
  const lang = await getDictionary(params.lang);
  return (
    <div>
      <GreatingBlock lang={lang} />
      <section className='py-[30px]'>
        <h2
          className={`${Unbound.className} text-center xl:text-left text-[#262626] text-[22px] font-[400]`}
        >
          {lang.home.header}
        </h2>
        <TestPlatforms font={Unbound} lang={lang.test_platforms} />
        <Link className='hidden xl:block' href={`/${lang.locale}/get-tested`}>
          <button
            className={`${Unbound.className} text-white text-[18px] font-[400] py-[7px] px-[15px] bg-[#347AEC] rounded-[100px] mt-[30px]`}
          >
            {lang.home.button}
          </button>
        </Link>
        <div className='flex flex-col items-center xl:hidden'>
          <p className='m-auto mt-[20px] mb-[10px] w-[200px]  text-center text-[#262626]  font-[600] text-[14px]'>
            Скоріш тицяй сюди та вивчай себе
          </p>
          <svg
            width='16'
            height='20'
            viewBox='0 0 16 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9 1C9 0.447715 8.55228 2.41411e-08 8 0C7.44772 -2.41411e-08 7 0.447715 7 1L9 1ZM7.29289 24.7071C7.68342 25.0976 8.31658 25.0976 8.70711 24.7071L15.0711 18.3431C15.4616 17.9526 15.4616 17.3195 15.0711 16.9289C14.6805 16.5384 14.0474 16.5384 13.6569 16.9289L8 22.5858L2.34315 16.9289C1.95262 16.5384 1.31946 16.5384 0.928931 16.9289C0.538407 17.3195 0.538407 17.9526 0.928931 18.3431L7.29289 24.7071ZM7 1L7 24L9 24L9 1L7 1Z'
              fill='#347AEC'
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
