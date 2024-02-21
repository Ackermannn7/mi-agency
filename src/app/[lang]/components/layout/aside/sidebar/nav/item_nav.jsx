import { useScreenSize } from "@/hooks/useScreenSize";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ItemNav = ({ data, setCurrentTab, currentTab }) => {
  const { isNotDesktop } = useScreenSize();
  const pathname = usePathname();
  const segments = pathname.replace(/^\/|\/$/g, "").split("/");
  const slug = segments.length > 1 ? segments.pop() : "";
  return (
    <li key={data.key} onClick={() => setCurrentTab(data.key)}>
      <Link
        href={`/${data.locale}${data.href}`}
        prefetch={false}
        className='flex flex-col text-center xl:flex-row items-center gap-[7px] xl:gap-[14px] item-nav'
      >
        <span
          className={`relative object-cover w-[35px] h-[35px] xl:w-[21px] xl:h-[21px] rounded-[100%] flex items-center justify-center ${
            data.slug === slug ? "bg-[#347AEC] nav active-nav" : "nav bg-[#F2F5F8]"
          } ${
            isNotDesktop &&
            data?.label.key === "get-tested" &&
            "bg-gradient-to-r from-[#347AEC] to-[#6764E7] nav active-nav"
          } `}
        >
          {data.slug === "my-profile" && data.userData?.photo ? (
            <Image
              className='rounded-[100%]'
              aria-label={"Change to:" + data.alt}
              fill
              src={data.userData.photo}
              alt={data.userData.first_name}
              loading={"lazy"}
            />
          ) : (
            data.icon
          )}
        </span>
        <p className='text-[9px] xl:text-[16px] w-[50px] xl:w-auto'>
          {data.label && Object.values(data.label)[1]}
        </p>
      </Link>
    </li>
  );
};
