"use client";
import { useState, useEffect } from "react";
import ky from "ky";
import { paei_results } from "@/_libs/paei_results";
import { enneagrama_results } from "@/_libs/enneagrama_results";
import Link from "next/link";
import { useRouter } from "next/navigation";
export const ProfileTests = ({ lang }) => {
  const [userTests, setUserTests] = useState(null);
  const localizedPAEIResults = paei_results(lang);
  const localizedEnneagramResults = enneagrama_results(lang);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        router.push(`/${lang.locale}/`);
        return;
      }

      try {
        // Use ky to make a request with the auth token in the headers
        const response = await ky
          .get(
            `https://psymi.com.ua/${lang.backend_locale}/api/test-results/me/`,
            {
              headers: {
                Authorization: `Token ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .json();
        // Set the user data in the component state
        setUserTests(response);
      } catch (error) {
        setError("An error occurred while fetching user data");
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

  // Render logic based on the fetched user data or error
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {userTests &&
        userTests.map((test, index) => {
          if (test.test === 2) {
            return (
              <>
                <h2 className="text-[22px] font-semibold mb-[15px]">
                  {lang.paei_page.title}
                </h2>
                <div className="md:w-[850px] h-[40px] bg-gradient-to-r from-[#347AEC] to-[#6764E7] flex items-center py-[6px] px-[15px] md:px-[29px] font-unbounded text-[14px] font-[400] text-white md:text-[16px] rounded-[10px] mb-[10px]">
                  <div className="w-full md:w-[850px] flex justify-between">
                    <div className="w-[50%] md:w-[35%] md:px-[10px]">
                      <p>{lang.profile_page.user.tests_block.result}</p>
                    </div>
                    <div className="w-[50%] md:w-[35%] md:pl-[40px]">
                      <p>{lang.profile_page.user.tests_block.date}</p>
                    </div>
                    <div className="hidden md:block w-[30%] px-[10px]">
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="md:w-[850px] h-[40px] bg-white flex items-center py-[6px] px-[15px] md:px-[29px] font-unbounded text-[12px] font-[400] text-white md:text-[16px] rounded-[10px] mb-[10px]">
                  <div className="w-full md:w-[850px] text-[#262626] flex justify-between">
                    <div className="w-[50%] md:w-[35%] md:px-[10px]">
                      <p>{test.type}</p>
                    </div>
                    <div className="w-[50%] md:w-[35%] md:pl-[40px]">
                      <p>
                        {new Date(test.created_at).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="hidden md:block w-[30%] px-[10px] text-[#347AEC] font-[700] text-right">
                      <Link href={`/${lang.locale}/result-test/${test.id}/`}>
                        {lang.profile_page.user.tests_block.more_info_btn}
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (test.test === 1) {
            return (
              <>
                <h2 className="text-[22px] font-semibold mb-[15px]">
                  {lang.enneagram_page.title}
                </h2>
                <div className="md:w-[850px] h-[40px] bg-gradient-to-r from-[#347AEC] to-[#6764E7] flex items-center py-[6px] px-[15px] md:px-[29px] font-unbounded text-[14px] font-[400] text-white md:text-[16px] rounded-[10px] mb-[10px]">
                  <div className="w-full md:w-[850px] flex justify-between">
                    <div className="w-[50%] md:w-[35%] md:px-[10px]">
                      <p>{lang.profile_page.user.tests_block.result} - </p>
                    </div>
                    <div className="w-[50%] md:w-[35%] md:pl-[40px]">
                      <p>{lang.profile_page.user.tests_block.date}</p>
                    </div>
                    <div className="hidden md:block w-[30%] px-[10px]">
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="md:w-[850px] h-[40px] bg-white flex items-center py-[6px] px-[15px] md:px-[29px] font-unbounded text-[12px] font-[400] text-white md:text-[16px] rounded-[10px] mb-[10px]">
                  <div className="w-full md:w-[850px] text-[#262626] flex justify-between">
                    <div className="w-[50%] md:w-[35%] md:px-[10px]">
                      <p>
                        {localizedEnneagramResults.find(
                          (result) => result.type.toString() === test.type
                        )?.title || ""}
                      </p>
                    </div>
                    <div className="w-[50%] md:w-[35%] md:pl-[40px]">
                      <p>
                        {new Date(test.created_at).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="hidden md:block w-[30%] px-[10px] text-[#347AEC] font-[700] text-right">
                      <Link href={`/${lang.locale}/result-test/${test.id}/`}>
                        {lang.profile_page.user.tests_block.more_info_btn}
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
    </div>
  );
};