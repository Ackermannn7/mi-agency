export const Post = ({ imageUrl, title, link, categories, index }) => {
  const MAX_TITLE_LENGTH = 50; // Adjust this to your desired maximum length

  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? `${title.substring(0, MAX_TITLE_LENGTH)}...`
      : title;
  return (
    <a className="relative" href={link} target="_blank">
      <div className="md:w-[410px] h-[280px] md:h-[300px] rounded-[10px] bg-white shadow-[0px 0px 20px 0px #6D7C8C1A] relative">
        <div className="h-[22px] w-[22px] rounded-[50%] bg-white top-[10px] left-[10px] absolute flex items-center justify-center">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.80625 2.3876C1.80625 2.2501 1.7375 2.1126 1.66875 2.04385L0.6375 0.806347V0.600098H3.8L6.275 6.03135L8.475 0.600098H11.5V0.806347L10.6063 1.63135C10.5375 1.7001 10.4688 1.76885 10.5375 1.90635V8.09385C10.5375 8.1626 10.5375 8.3001 10.6063 8.36885L11.4312 9.19385V9.4001H7.1V9.19385L7.99375 8.3001C8.0625 8.23135 8.0625 8.1626 8.0625 8.0251V3.00635L5.5875 9.2626H5.3125L2.425 3.00635V7.2001C2.425 7.40635 2.49375 7.54385 2.5625 7.68135L3.73125 9.05635V9.2626H0.5V9.05635L1.66875 7.68135C1.80625 7.54385 1.875 7.40635 1.80625 7.2001V2.3876Z"
              fill="#347AEC"
            />
          </svg>
        </div>

        <img
          className="rounded-t-[10px]"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />
        <h1 className="mt-[10px] ml-[20px] font-semibold text-[16px] mr-[10px]">
          {truncatedTitle}
        </h1>
        {categories && categories.length !== 0 ? (
          <div className="absolute b-0">
            <p className="mt-[10px] text-[#5E5E5E] text-[10px]">
              {categories.join(" ")}
            </p>
          </div>
        ) : (
          <div className="absolute bottom-[15px] left-[20px]">
            <p className="mt-[10px] text-[#5E5E5E] text-[10px]">
              {"#HR #business"}
            </p>
          </div>
        )}
      </div>
    </a>
  );
};
