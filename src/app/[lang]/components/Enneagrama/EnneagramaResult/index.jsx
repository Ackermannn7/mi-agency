import Image from "next/image";
import MainButton from "../../UI/Buttons/MainButton";
import { Modal } from "antd";
import { useEffect, useState, useRef } from "react";
import { enneagrama_results } from "@/_libs/enneagrama_results";
// import ky from "ky";
import axios from "axios";
import { useRouter } from "next/navigation";
export const EnneagramaResult = ({ answers, lang, contentRef, height }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [modal, setModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const localizedResults = enneagrama_results(lang);
  const [isSaved, setIsSaved] = useState(false);
  const types = {
    1: [3, 15, 16, 36, 37, 49, 58, 59, 60, 69],
    2: [6, 7, 8, 18, 19, 39, 40, 51, 62, 82],
    3: [4, 5, 17, 38, 50, 61, 70, 71, 81, 83],
    4: [9, 10, 20, 41, 52, 63, 64, 72, 73, 86],
    5: [1, 2, 13, 14, 35, 48, 68, 77, 84, 88],
    6: [11, 12, 21, 22, 42, 43, 53, 65, 74, 75],
    7: [23, 24, 29, 30, 44, 45, 54, 55, 66, 76],
    8: [25, 26, 31, 32, 46, 56, 67, 78, 85, 89],
    9: [27, 28, 33, 34, 47, 57, 79, 80, 87, 90],
  };
  let scores = {};
  for (let type in types) {
    scores[type] = types[type].reduce(
      (sum, question) => sum + (answers[question - 1] === "так" ? 1 : 0),
      0,
    );
  }
  const resultType = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
  const enneagramResultData = localizedResults.find(
    (result) => result.type === parseInt(resultType),
  );

  if (!enneagramResultData) {
    return null;
  }

  const { type, title, description, lifeMotto, keyword, careerOrientations, possibleProfessions } =
    enneagramResultData;

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const data = {
      test: 1,
      user: userData.id,
      type: enneagramResultData.type.toString(),
      description: "",
    };
    try {
      await axios.post(`https://psymi.com.ua/${lang.backend_locale}/api/test-results/`, data);
      setIsSaved(!isSaved);
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("generalCount");
      localStorage.removeItem("userAnswers");
    } catch (error) {
      // Set the error message in the component's state
      setMessageError(error.message);
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(
          `/public/_assets/images/enneagrama_answers/${enneagramResultData.type}.png`
        );
        setImageSrc(imageModule.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    if (enneagramResultData) {
      loadImage();
    }
  }, [enneagramResultData]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      !authToken ? setIsAuth(false) : setIsAuth(true);

      try {
        // Use ky to make a request with the auth token in the headers
        const response = await axios.get(
          `https://psymi.com.ua/${lang.backend_locale}/api/auth/users/me`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        // Set the user data in the component state
        setUserData(response.data);
      } catch (error) {
        setError("An error occurred while fetching user data");
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

  const authModal = () => {
    Modal.error({
      title: lang.test_page.auth_modal.title,
      content: (
        <div className='flex flex-col items-center'>
          <p className='text-left text-[16px] mb-[10px] font-unbounded'>
            {lang.test_page.auth_modal.description}
          </p>
          <MainButton
            onClick={() => {
              window.location.href = `/${lang.locale}/pages/sign-up/`;
            }}
            label={lang.test_page.auth_modal.button_label}
          />
        </div>
      ),
      closable: true,
      centered: true,
      footer: null,
    });
  };
  // // Render logic based on the fetched user data or error
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  return (
    <div
      ref={contentRef}
      className='transition-max-height duration-300 ease-in-out overflow-hidden mb-[50px] mt-[20px] flex flex-col items-center md:items-start md:flex-row justify-between'
    >
      <div>
        {imageSrc && (
          <Image
            className='mb-[26px] md:mb-0 md:mr-[30px] radius-[15px] w-[300px] h-[300px]'
            src={imageSrc}
            alt={"enneagram result"}
            loading='lazy'
          />
        )}
      </div>
      <div className='md:w-[400px] lg:w-[520px]'>
        <h1 className='text-center md:text-left text-[22px] md:text-[30px] font-unbounded mb-[10px]'>
          {title}
        </h1>
        <p className='mx-auto md:mx-0 w-[60px] text-center bg-[#347AEC] text-[#fff] rounded-[5px] py-[3px]'>
          {resultType} {lang.enneagram_page.n_type}
        </p>
        <p className='my-[20px] font-medium'>{description}</p>
        <p className='mb-[20px] font-medium'>
          <span className='text-[#347AEC] font-semibold'>{lang.enneagram_page.lifeMotto}</span>{" "}
          {lifeMotto}
        </p>
        <p className='mb-[20px] font-medium'>
          <span className='text-[#347AEC] font-semibold'>{lang.enneagram_page.keyword}</span>{" "}
          {keyword}
        </p>
        <p className='mb-[20px] font-medium'>
          <span className='text-[#347AEC] font-semibold'>
            {lang.enneagram_page.careerOrientations}
          </span>
          {careerOrientations}
        </p>
        <p className='mb-[20px] font-medium'>
          <span className='text-[#347AEC] font-semibold font-semibold'>
            {lang.enneagram_page.possibleProfessions}
          </span>{" "}
          {possibleProfessions}
        </p>
        <div className='text-center md:text-left mb-[20px] md:mb-0'>
          <MainButton
            className='save-button w-[255px] h-[40px] text-[16px] px-[10px] !important'
            label={lang.enneagram_page.save_button}
            onClick={isAuth ? handleSubmit : authModal}
          />
          {isSaved && (
            <p className='mt-[10px] text-[10px] font-medium'>
              {lang.enneagram_page.saved_result_msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
