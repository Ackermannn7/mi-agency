import socialList from "@/_libs/social-list";
import { ItemSocial } from "@/app/[lang]/components/layout/aside/sidebar/socials/item_social";

export const Socials = () => {
  return (
    <div className='flex xl:mt-[23px] items-center gap-[20px]'>
      {socialList?.map?.((social, _) => (
        <span key={social.name}>
          <ItemSocial data={social} />
        </span>
      ))}
    </div>
  );
};
