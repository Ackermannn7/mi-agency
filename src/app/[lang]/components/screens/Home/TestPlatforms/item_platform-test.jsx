import Link from "next/link";

export const ItemPlatformTest = ({ data }) => {
  return (
    <Link
      href={data.href}
      className='w-[48%] md:w-[28%] h-[100px] xl:w-[190px] xl:h-[120px] rounded-[10px] bg-gradient-to-r from-[#347AEC] to-[#6764E7]  pb-[13px] relative flex flex-col items-center justify-evenly'
    >
      <div className='bg-white w-[43px] h-[43px] rounded-[100%] flex items-center justify-center text-center '>
        <span>{data.emoji}</span>
      </div>
      <p className='w-[100%] text-center text-[10px] font-semibold xl:text-[16px] text-white font-[300] leading-4'>
        {Object.values(data.name)[0]} <br /> {Object.values(data.name)[1]}
      </p>
    </Link>
  );
};
