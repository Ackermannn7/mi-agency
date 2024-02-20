import { tests } from "@/_libs/tests";
import { Unbounded } from "next/font/google";
import { getDictionary } from "../../../../../getDictionary";
const Unbound = Unbounded({ subsets: ["latin"] });

async function getData(type, lang) {
  const result = [];
  const localizedTests = tests(lang);
  localizedTests.filter((test) => {
    if (test.type === type) {
      result.push(test);
    }
  });

  return result[0];
}

export default async function Page(context) {
  const { params } = context;
  const lang = await getDictionary(params.lang);
  const data = await getData(params.type, lang);
  return (
    <main className='pt-[20px] xl:pt-[60px]'>
      <h1
        className={Unbound.className + " " + "text-[#262626] text-[22px] xl:text-[40px] font-[400]"}
      >
        {data.label}
      </h1>
      <div className='pb-[35px] pt-[10px] xl:pt-[20px]'>{data.page.description}</div>
      <div>{data.page.children}</div>
    </main>
  );
}
