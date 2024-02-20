// import MyProfile from "../components/screens/MyProfile";
// import MainButton from "../components/UI/Buttons/MainButton";
// import getCurrentUser from "@/actions/getCurrentUser";
// import Link from "next/link";
// import { getDictionary } from "../../../../getDictionary";
// import { redirect } from "next/navigation";

// export default async function Page({ params }) {
//   const lang = await getDictionary(params.lang);
//   const currentUser = await getCurrentUser();

//   return (
//     <main className="pt-[20px] xl:pt-[60px]">
//       {currentUser ? (
//         <>
//           <MyProfile lang={lang} currentUser={currentUser} />
//           <section className="mt-[35px]">
//             <div className="text-center xl:text-left">
//               <h2 className=" px-[20px] xl:px-0 font-unbounded text-[22px] font-[400] mb-[15px]">
//                 {lang.profile_page.header}
//               </h2>
//               <MainButton className="text-[14px] px-[15px] font-[300]">
//                 <Link href={`/${lang.locale}/get-tested/`}>
//                   {lang.profile_page.get_tested_btn}
//                 </Link>
//               </MainButton>
//             </div>

//             <div>
//               <h2 className="text-[22px] font-semibold mb-[15px]">
//                 Тест Адізеса
//               </h2>
//               <div className="xl:w-[850px] h-[40px] bg-gradient-to-r from-[#347AEC] to-[#6764E7] flex items-center py-[6px] px-[15px] xl:px-[29px] font-unbounded text-[14px] font-[400] text-white xl:text-[16px] rounded-[10px] mb-[10px]">
//                 <div className="w-full xl:w-[850px] flex justify-between">
//                   <div className="w-[50%] xl:w-[35%] xl:px-[10px]">
//                     <p>{lang.profile_page.user.tests_block.result}</p>
//                   </div>
//                   <div className="w-[50%] xl:w-[35%] xl:pl-[40px]">
//                     <p>{lang.profile_page.user.tests_block.date}</p>
//                   </div>
//                   <div className="hidden xl:block w-[30%] px-[10px]">
//                     <p></p>
//                   </div>
//                 </div>
//               </div>
//               <div className="xl:w-[850px] h-[40px] bg-white flex items-center py-[6px] px-[15px] xl:px-[29px] font-unbounded text-[12px] font-[400] text-white xl:text-[16px] rounded-[10px] mb-[10px]">
//                 <div className="w-full xl:w-[850px] text-[#262626] flex justify-between">
//                   <div className="w-[50%] xl:w-[35%] xl:px-[10px]">
//                     <p>pAei - Адміністратор</p>
//                   </div>
//                   <div className="w-[50%] xl:w-[35%] xl:pl-[40px]">
//                     <p>22.05.2023</p>
//                   </div>
//                   <div className="hidden xl:block w-[30%] px-[10px] text-[#347AEC] font-[700] text-right">
//                     <button>
//                       {lang.profile_page.user.tests_block.more_info_btn}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="xl:w-[850px] h-[40px] bg-white flex items-center py-[6px] px-[15px] xl:px-[29px] font-unbounded text-[12px] font-[400] text-white xl:text-[16px] rounded-[10px] mb-[10px]">
//                 <div className="w-full xl:w-[850px] text-[#262626] flex justify-between">
//                   <div className="w-[50%] xl:w-[35%] xl:px-[10px]">
//                     <p>Paei - Виробник</p>
//                   </div>
//                   <div className="w-[50%] xl:w-[35%] xl:pl-[40px]">
//                     <p>22.02.2023</p>
//                   </div>
//                   <div className="hidden xl:block w-[30%] text-[#347AEC] font-[700] px-[10px] text-right">
//                     <button>
//                       {lang.profile_page.user.tests_block.more_info_btn}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </>
//       ) : (
//         redirect(`/${lang.locale}/pages/sign-up/`)
//       )}
//     </main>
//   );
// }

import MyProfile from "../components/screens/MyProfile";
import getCurrentUser from "@/actions/getCurrentUser";
import { getDictionary } from "../../../../getDictionary";
import { redirect } from "next/navigation";
import { ProfileSection } from "../components/screens/MyProfile/ProfileSection";

export default async function Page({ params }) {
  const lang = await getDictionary(params.lang);
  // const currentUser = await getCurrentUser();

  return (
    <main className='pt-[20px] xl:pt-[60px]'>
      {/* {currentUser ? ( */}
      <>
        <MyProfile lang={lang} />
        <ProfileSection lang={lang} />
      </>
      {/* ) : ( redirect(`/${lang.locale}/pages/sign-up/`) )} */}
    </main>
  );
}
