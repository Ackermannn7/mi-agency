import { getDictionary } from "../../../../../getDictionary";
import ResultTests from "../../components/screens/ResultTests";
export default async function Page({ params }) {
  const lang = await getDictionary(params.lang);
  return (
    <main className='pt-[20px] xl:pt-[60px]'>
      <ResultTests lang={lang} id={params.id} />
    </main>
  );
}
