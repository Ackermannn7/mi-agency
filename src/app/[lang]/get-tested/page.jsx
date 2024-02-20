import { tests } from "@/_libs/tests";
import CardTest from "../components/screens/GetTested/CardTest";
import { getDictionary } from "../../../../getDictionary";

export default async function GetTested({ params }) {
  const lang = await getDictionary(params.lang);
  return (
    <div className='pt-[20px] pb-[60px] xl:pt-[60px] xl:pb-0 gap-[25px] flex flex-wrap'>
      {tests(lang)?.map?.((test, i) => (
        <CardTest
          data={{
            ...test,
            locale: lang.locale,
            test_blocks: [lang.test_page.test_blocks[i]],
            lang: lang,
          }}
        />
      ))}
    </div>
  );
}
