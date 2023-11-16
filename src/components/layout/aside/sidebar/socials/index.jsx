import socialList from "@/_libs/social-list";
import {ItemSocial} from "@/components/layout/aside/sidebar/socials/item_social";

export const Socials = () => {
    return(
        <div className="flex items-center gap-[20px]">
            {socialList?.map?.((social, _) => (
                <span key={social.name}>
                    <ItemSocial data={social}/>
                </span>
            ))}
        </div>
    )
}