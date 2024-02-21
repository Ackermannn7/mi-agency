"use client";
import React, { useEffect, useState } from "react";
import ky from "ky";
import { paei_results } from "@/_libs/paei_results";
import { enneagrama_results } from "@/_libs/enneagrama_results";
import Image from "next/image";
import axios from "axios";
const ResultTests = ({ lang, id }) => {
  const [imageSrc, setImageSrc] = useState(null);

  const [resultTest, setResultTest] = useState(null);
  const localizedPAEIResults = paei_results(lang);
  const localizedEnneagramResults = enneagrama_results(lang);
  const [error, setError] = useState("");
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
          `https://psymi.com.ua/${lang.backend_locale}/api/test-results/${id}/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        // Set the user data in the component state
        setResultTest(response.data);
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
  const enneagramResultData = localizedEnneagramResults.find(
    (result) => result.type === parseInt(resultTest?.type),
  );
  const maxLetter = (resultTest?.type.match(/[A-Z]/) || [""])[0];
  useEffect(() => {
    const loadImage = async () => {
      try {
        if (resultTest.test === 1) {
          const imageModule = await import(
            `/public/_assets/images/enneagrama_answers/${enneagramResultData.type}.png`
          );
          setImageSrc(imageModule.default);
        } else if (resultTest.test === 2) {
          const imageModule = await import(`/public/_assets/images/paei_answers/${maxLetter}.png`);
          setImageSrc(imageModule.default);
        }
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    if (enneagramResultData || maxLetter) {
      loadImage();
    }
  }, [enneagramResultData, maxLetter]);

  if (resultTest?.test === 1) {
    return (
      <div className='mb-[50px] xl:mb-0 flex flex-col items-center md:items-start md:flex-row gap-[20px]'>
        <div>
          {imageSrc && (
            <Image
              className='radius-[15px] w-[300px] h-[300px]'
              src={imageSrc}
              alt={"enneagram result"}
              loading='lazy'
            />
          )}
        </div>
        <div className='text-[#262626] leading-5 md:w-[400px] lg:w-[520px] lg:h-[460px]'>
          <h1 className='text-center md:text-left text-[22px] md:text-[30px] font-unbounded mb-[10px]'>
            {enneagramResultData.title}
          </h1>
          <p className='mx-auto md:mx-0 w-[60px] text-center bg-[#347AEC] text-[#fff] rounded-[5px] py-[3px] text-center'>
            {enneagramResultData.type} {lang.enneagram_page.n_type}
          </p>
          <p className='my-[20px] font-medium'>{enneagramResultData.description}</p>
          <p className='mb-[20px] font-medium'>
            <span className='text-[#347AEC] font-semibold'>{lang.enneagram_page.lifeMotto}</span>{" "}
            {enneagramResultData.lifeMotto}
          </p>
          <p className='mb-[20px] font-medium'>
            <span className='text-[#347AEC] font-semibold'>{lang.enneagram_page.keyword}</span>{" "}
            {enneagramResultData.keyword}
          </p>
          <p className='mb-[20px] font-medium'>
            <span className='text-[#347AEC] font-semibold'>
              {lang.enneagram_page.careerOrientations}
            </span>
            {enneagramResultData.careerOrientations}
          </p>
          <p className='mb-[20px] font-medium'>
            <span className='text-[#347AEC] font-semibold font-semibold'>
              {lang.enneagram_page.possibleProfessions}
            </span>{" "}
            {enneagramResultData.possibleProfessions}
          </p>
        </div>
      </div>
    );
  } else if (resultTest?.test === 2) {
    return (
      <div className='mb-[50px] lg:mb-0 flex flex-col items-center md:items-start md:flex-row gap-[20px]'>
        <div>
          {imageSrc && (
            <Image
              className='radius-[15px] '
              src={imageSrc}
              alt={"robot look"}
              loading='lazy'
              width={300}
              height={300}
            />
          )}
        </div>
        <div className='text-[#262626] leading-5 md:w-[400px] lg:w-[520px] lg:h-[460px]'>
          <h1 className='text-center md:text-left text-[22px] lg:text-[30px] font-unbounded mb-[10px]'>
            {lang.paei_result.header} {resultTest?.type}
          </h1>

          <p className='mt-[10px] mb-[30px] font-medium'>
            <span className='text-[#347AEC] font-semibold'>{resultTest?.type.split("")[0]}: </span>
            {
              localizedPAEIResults.find((desc) => desc.letter === "P")[
                resultTest?.type.includes("P")
                  ? "description_uppercase"
                  : resultTest?.type.includes("p")
                  ? "description_lowercase"
                  : "description_noLetter"
              ]
            }
          </p>
          <p className='mb-[30px] font-medium'>
            <span className='text-[#347AEC] font-semibold'>{resultTest?.type.split("")[1]}: </span>
            {
              localizedPAEIResults.find((desc) => desc.letter === "A")[
                resultTest?.type.includes("A")
                  ? "description_uppercase"
                  : resultTest?.type.includes("a")
                  ? "description_lowercase"
                  : "description_noLetter"
              ]
            }
          </p>
          <p className='mb-[30px] font-medium'>
            <span className='text-[#347AEC] font-semibold'>{resultTest?.type.split("")[2]}: </span>
            {
              localizedPAEIResults.find((desc) => desc.letter === "E")[
                resultTest?.type.includes("E")
                  ? "description_uppercase"
                  : resultTest?.type.includes("e")
                  ? "description_lowercase"
                  : "description_noLetter"
              ]
            }
          </p>
          <p className='mb-[30px] font-medium'>
            <span className='text-[#347AEC] font-semibold'>{resultTest?.type.split("")[3]}: </span>
            {
              localizedPAEIResults.find((desc) => desc.letter === "I")[
                resultTest?.type.includes("I")
                  ? "description_uppercase"
                  : resultTest?.type.includes("i")
                  ? "description_lowercase"
                  : "description_noLetter"
              ]
            }
          </p>

          {/* <div className="text-center mb-[20px] xl:mb-0">
            <MainButton
              className="save-button w-[255px] h-[40px] text-[16px] px-[10px] !important"
              label={lang.paei_result.save_button}
              onClick={handleSubmit}
            />
            {isSaved && (
              <p className="mt-[10px] text-[10px] font-medium">
                {lang.paei_result.saved_result_msg}
              </p>
            )}
          </div> */}
        </div>
      </div>
    );
  }
};

export default ResultTests;
