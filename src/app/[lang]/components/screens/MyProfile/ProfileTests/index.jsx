"use client";
import { useState, useEffect } from "react";
import ky from "ky";
import { paei_results } from "@/_libs/paei_results";
import { enneagrama_results } from "@/_libs/enneagrama_results";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useScreenSize } from "@/hooks/useScreenSize";
import axios from "axios";
export const ProfileTests = ({ lang }) => {
  const { isNotLaptop } = useScreenSize();
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
        const response = await axios.get(
          `https://psymi.com.ua/${lang.backend_locale}/api/test-results/me/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        // Set the user data in the component state
        setUserTests(response.data);
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
  const groupedTests = userTests?.reduce((acc, test) => {
    const { test: testValue } = test;

    // Проверяем, существует ли массив с данным значением test
    if (!acc[testValue]) {
      // Если нет, создаем новый массив с этим значением test
      acc[testValue] = [];
    }

    // Добавляем текущий объект в массив с соответствующим значением test
    acc[testValue].push(test);

    return acc;
  }, {});
  const handleNavigateTest = (id) => {
    isNotLaptop && router.push(`/${lang.locale}/result-test/${id}/`);
  };
  return (
    <div>
      {groupedTests &&
        Object.entries(groupedTests).map(([testType, tests]) => (
          <div key={testType}>
            {testType === "1" ? (
              <>
                <h2 className='text-[22px] font-semibold mb-[15px]'>{lang.enneagram_page.title}</h2>
                <div className='h-[40px] bg-gradient-to-r from-[#347AEC] to-[#6764E7] flex items-center py-[6px] px-[15px] xl:px-[29px] font-unbounded text-[14px] font-[400] text-white xl:text-[16px] rounded-[10px] mb-[10px]'>
                  <div className='w-full flex justify-between'>
                    <div className='w-[50%] xl:w-[35%] xl:px-[10px]'>
                      <p>{lang.profile_page.user.tests_block.result}</p>
                    </div>
                    <div className='w-[50%] xl:w-[35%] xl:pl-[40px]'>
                      <p>{lang.profile_page.user.tests_block.date}</p>
                    </div>
                    <div className='hidden xl:block w-[30%] px-[10px]'>
                      <p></p>
                    </div>
                  </div>
                </div>
              </>
            ) : testType === "2" ? (
              <>
                <h2 className='text-[22px] font-semibold mb-[15px]'>{lang.paei_page.title}</h2>
                <div className='h-[40px] bg-gradient-to-r from-[#347AEC] to-[#6764E7] flex items-center py-[6px] px-[15px] xl:px-[29px] font-unbounded text-[14px] font-[400] text-white xl:text-[16px] rounded-[10px] mb-[10px]'>
                  <div className='w-full flex justify-between'>
                    <div className='w-[50%] xl:w-[35%] xl:px-[10px]'>
                      <p>{lang.profile_page.user.tests_block.result}</p>
                    </div>
                    <div className='w-[50%] xl:w-[35%] xl:pl-[40px]'>
                      <p>{lang.profile_page.user.tests_block.date}</p>
                    </div>
                    <div className='hidden xl:block w-[30%] px-[10px]'>
                      <p></p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {tests.map((test, index) => (
              <div key={index}>
                {testType === "1" ? (
                  <>
                    <div
                      className='h-[40px] bg-white flex items-center py-[6px] px-[15px] xl:px-[29px] font-unbounded text-[12px] font-[400] text-white xl:text-[16px] rounded-[10px] mb-[10px]'
                      onClick={() => handleNavigateTest(test.id)}
                    >
                      <div className='w-full text-[#262626] flex justify-between'>
                        <div className='w-[50%] xl:w-[35%] xl:px-[10px]'>
                          <p>
                            {localizedEnneagramResults.find(
                              (result) => result.type.toString() === test.type,
                            )?.title || ""}
                          </p>
                        </div>
                        <div className='w-[50%] xl:w-[35%] xl:pl-[40px]'>
                          <p>{new Date(test.created_at).toLocaleDateString("en-GB")}</p>
                        </div>
                        <div className='hidden lg:block w-[30%] px-[10px] text-[#347AEC] font-[700] text-right'>
                          <Link href={`/${lang.locale}/result-test/${test.id}/`}>
                            {lang.profile_page.user.tests_block.more_info_btn}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : testType === "2" ? (
                  <>
                    <div
                      className='h-[40px] bg-white flex items-center py-[6px] px-[15px] xl:px-[29px] font-unbounded text-[12px] font-[400] text-white xl:text-[16px] rounded-[10px] mb-[10px]'
                      onClick={() => handleNavigateTest(test.id)}
                    >
                      <div className='w-full text-[#262626] flex justify-between'>
                        <div className='w-[50%] xl:w-[35%] xl:px-[10px]'>
                          <p>{test.type}</p>
                        </div>
                        <div className='w-[50%] xl:w-[35%] xl:pl-[40px]'>
                          <p>{new Date(test.created_at).toLocaleDateString("en-GB")}</p>
                        </div>
                        <div className='hidden lg:block w-[30%] px-[10px] text-[#347AEC] font-[700] text-right'>
                          <Link href={`/${lang.locale}/result-test/${test.id}/`}>
                            {lang.profile_page.user.tests_block.more_info_btn}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
