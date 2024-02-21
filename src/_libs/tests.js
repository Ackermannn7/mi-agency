import Image from "next/image";
import { Enneagrama } from "@/app/[lang]/components/Enneagrama";
import { PAEIDescription } from "@/app/[lang]/components/PAEI/PAEIDescription";
import { PAEI } from "@/app/[lang]/components/PAEI";
import enneagramImg from "/public/_assets/images/enneagram_img.png";
import robotLookImg from "/public/_assets/images/robot_img.png";
export const tests = (lang) => {
  return [
    {
      label: lang.paei_page.title,
      type: "paei",
      description: "В основі методики лежить PAEI-концепція, згід...",
      banner: "paei_banner.png",
      owner: {
        type: "image",
        path: "logo_owner.png",
      },
      development: false,
      page: {
        title: lang.paei_page.title,
        description: (
          <p className='text-[#262626] font-[500] leading-5 tracking-wide'>
            {lang.paei_page.description_1}{" "}
            <span className='font-semibold'>{lang.paei_page.description_2}</span>{" "}
            {lang.paei_page.description_3}{" "}
            <span className='font-semibold'>{lang.paei_page.description_4}</span>
            {lang.paei_page.description_5}{" "}
            <span className='font-semibold'>{lang.paei_page.description_6}</span>
          </p>
        ),
        children: (
          <section className='flex flex-col items-start gap-[20px] mb-[50px]'>
            <PAEIDescription lang={lang} />
            <div className='flex items-center gap-[27px] mt-[10px] xl:mt-0'>
              <div className='relative border border-solid border-2 border-[#347AEC] py-[15px] px-[24px] max-w-[800px] md:mx-auto w-full rounded-[15px]'>
                <div className='text-[#262626] leading-[130%]'>
                  <p className='font-[500] mb-[10px]'>{lang.paei_page.robot_hint_p}</p>
                  <h3 className='font-[700]'>{lang.paei_page.robot_hint_h3}</h3>
                </div>
              </div>
              <div className='hidden xl:block -scale-x-100'>
                <Image
                  className='w-[150px] h-[200px] object-contain'
                  src={robotLookImg}
                  alt={"robot look"}
                  loading='lazy'
                />
              </div>
            </div>
            <PAEI lang={lang} />
          </section>
        ),
      },
    },
    {
      label: lang.enneagram_page.title,
      type: "eneagrama",
      description: "Психологічна модель, що описує 9 глибинних...",
      banner: "enneagram.png",
      owner: {
        type: "image",
        path: "logo_owner.png",
      },
      development: false,
      page: {
        title: lang.enneagram_page.title,
        description: (
          <p className='font-[500] leading-[130%] max-w-full xl:w-[55%]'>
            <span className='text-[#262626] font-[700]'>{lang.enneagram_page.title}</span>{" "}
            {lang.enneagram_page.description}
          </p>
        ),
        children: (
          <section>
            <div className='flex flex-col-reverse lg:flex-row items-center gap-[27px]'>
              <Image
                className='hidden lg:block w-[150px] h-[200px] object-contain'
                src={robotLookImg}
                alt={"robot look"}
                loading='lazy'
              />
              <div className='w-full lg:w-[400px] relative lg:border lg:border-solid lg:border-2 lg:border-[#347AEC] py-[15px] lg:px-[24px] w-[369px] rounded-[15px]'>
                <div className='text-[#262626] leading-[130%]'>
                  <p className='font-[500] mb-[10px]'>{lang.enneagram_page.robot_hint_p}</p>
                  <h3 className='font-[700]'>{lang.enneagram_page.robot_hint_h3}</h3>
                </div>
              </div>
              <Image
                className='w-[250px] h-[250px] object-contain'
                src={enneagramImg}
                alt={"enneagram look"}
                loading='lazy'
              />
            </div>
            <Enneagrama lang={lang} />
          </section>
        ),
      },
    },
    {
      label: "MBTI",
      description: "Призначений для психологічної оцінки характе...",
      banner: "MBTI_banner.png",
      owner: {
        type: "image",
        path: "logo_owner.png",
      },
      development: true,
    },
    {
      label: "Емоційний інтелект",
      description: "Методика Н. Холла призначена для виявлен...",
      banner: "Emotional intelligence.png",
      owner: {
        type: "image",
        path: "logo_owner.png",
      },
      development: true,
    },
    {
      label: "Адаптивний інтелект",
      description: <span className='opacity-0'>1</span>,
      banner: "Adaptive intelligence.png",
      owner: {
        type: "image",
        path: "logo_owner.png",
      },
      development: true,
    },
    {
      label: "Інноваційний інтелект",
      description: <span className='opacity-0'>1</span>,
      banner: "Innovative intelligence.png",
      owner: {
        type: "image",
        path: "logo_owner.png",
      },
      development: true,
    },
  ];
};
