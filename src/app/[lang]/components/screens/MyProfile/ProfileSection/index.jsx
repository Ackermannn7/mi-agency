"use client";
import { useState, useEffect } from "react";
import { ProfileTests } from "../ProfileTests";
import MainButton from "../../../UI/Buttons/MainButton";
import ky from "ky";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
export const ProfileSection = ({ lang }) => {
  const router = useRouter();
  const [userTests, setUserTests] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        router.push(`/${lang.locale}/pages/sign-up/`);
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

  return (
    <section className='mt-[35px] mb-[70px] xl:mb-0'>
      {userTests?.length === 0 ? (
        <div className='text-center xl:text-left'>
          <h2 className=' px-[20px] xl:px-0 font-unbounded text-[22px] font-[400] mb-[15px]'>
            {lang.profile_page.header}
          </h2>
          <MainButton className='text-[14px] px-[15px] font-[300]'>
            <Link href={`/${lang.locale}/get-tested/`}>{lang.profile_page.get_tested_btn}</Link>
          </MainButton>
        </div>
      ) : (
        <ProfileTests lang={lang} />
      )}
    </section>
  );
};
