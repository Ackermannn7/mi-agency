"use client";
import React, { useEffect, useState } from "react";
import { Post } from "./Post";

const News = () => {
  const [mediumPosts, setMediumPosts] = useState([]);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mi.agency"
        );
        const data = await response.json();
        const items = data.items || [];
        const updatedItems = items.map((item, index) => {
          const content = item.content;
          const regex = /<figure.*?>.*?<img.*?src="(.*?)".*?>.*?<\/figure>/;
          const match = content.match(regex);

          // Check if a match is found
          if (match && match[1]) {
            const imageUrl = match[1];
            return { ...item, imageUrl };
          } else {
            console.log(
              `Image URL not found in the content for post ${index + 1}`
            );
            return item; // Keep the original item if imageUrl is not found
          }
        });

        setMediumPosts(updatedItems);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);
  return (
    <div className="md:mt-[20px] grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
      {mediumPosts.slice(0, 4).map((post, index) => (
        <Post key={index} {...post} index={index} />
      ))}
    </div>
  );
};

export default News;

// const News = () => {
//   useEffect(() => {
//     // Load the SociableKit widget script
//     const script = document.createElement("script");
//     script.src =
//       "https://widgets.sociablekit.com/linkedin-page-posts/widget.js";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

//     // Create the container div with the necessary data attribute
//     const container = document.createElement("div");
//     container.classList.add("sk-ww-linkedin-page-post");
//     container.setAttribute("data-embed-id", "247755");
//     document.body.appendChild(container);

//     // Cleanup (optional, to remove the script and container when the component unmounts)
//     return () => {
//       document.body.removeChild(script);
//       document.body.removeChild(container);
//     };
//   }, []);

//   return null; // No need to return anything as the script handles rendering
// };

// export default News;
