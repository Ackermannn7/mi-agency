import creatingTested from "@/_libs/creating-tested";
import { ItemPlatformTest } from "./item_platform-test";
const TestPlatforms = ({ font, lang }) => {
  return (
    <div
      className={
        font.className +
        " " +
        "flex gap-y-[10px] gap-x-[10px] md:gap-[30px] justify-evenly xl:justify-start flex-wrap md:max-w-full xl:max-w-[700px] mt-[20px]"
      }
    >
      {creatingTested?.map?.((test, i) => (
        <ItemPlatformTest data={{ ...test, name: lang[i] }} />
      ))}
    </div>
  );
};

export default TestPlatforms;
