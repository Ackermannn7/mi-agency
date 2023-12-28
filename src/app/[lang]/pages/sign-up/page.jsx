import robotLookImg from "/public/_assets/images/robot-look.png";
import { LoginGoogleProvider } from "../../components/screens/SignUp/LoginGoogleProvider";
import { Form } from "../../components/screens/SignUp/Form";
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
    <main className="md:pt-[60px]">
      <LoginGoogleProvider session={session} lang={lang} />
      <h2 className="w-[20px] ml-[340px] text-center text-[#347AEC] font-unbounded text-[22px] font-[400] mb-[22px]">
        Or
      </h2>
      {!session && <Form isRegistered={isRegistered} lang={lang} />}
      {session && (
        <div className="flex gap-[57px] w-full justify-center">
          {!isRegistered ? (
            <>
              <CreatedProfile lang={lang} session={session} />
              <div className="hidden md:block relative">
                <div className="w-[156px] h-[156px] bg-[#347AEC] rounded-[100%] absolute -z-10 top-[40%] right-0" />
                <Image
                  src={robotLookImg}
                  alt={"robot-look"}
                  width={207}
                  height={279}
                />
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
