import robotLookImg from "/public/_assets/images/robot-look.png";
import { Authorization } from "../../components/screens/SignUp/Authorization";
import CreatedProfile from "../../components/screens/SignUp/CreatedProfile";
import Image from "next/image";
import { getDictionary } from "../../../../../getDictionary";
import { getSession } from "@/actions/getSession";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const session = await getSession();
  const isRegistered = session?.user?.isRegistered || false;

  const lang = await getDictionary(params.lang);
  return (
    <main className='xl:pt-[35px]'>
      <Authorization session={session} lang={lang} />
      {/* <h2 className="w-[20px] mx-auto xl:ml-[340px] text-center text-[#347AEC] font-unbounded text-[22px] font-[400] mb-[22px]">
        Or
      </h2> */}
      {session && (
        <div className='flex gap-[57px] w-full justify-center'>
          {!isRegistered ? (
            <>
              <CreatedProfile lang={lang} session={session} />
              <div className='hidden xl:block relative'>
                <div className='w-[156px] h-[156px] bg-[#347AEC] rounded-[100%] absolute -z-10 top-[40%] right-0' />
                <Image src={robotLookImg} alt={"robot-look"} width={207} height={279} />
              </div>
            </>
          ) : (
            redirect(`/${lang.locale}/my-profile`)
          )}
        </div>
      )}
    </main>
  );
}
