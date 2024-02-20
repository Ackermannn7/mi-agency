import { getDictionary } from "../../../../getDictionary";
import News from "../components/screens/News";
export default async function Page({ params }) {
  const lang = await getDictionary(params.lang);
  return (
    <main className='pt-[20px] pb-[60px] xl:pt-[40px] xl:pb-0 flex flex-col-reverse xl:flex-col'>
      <News lang={lang} />
    </main>
  );
}
