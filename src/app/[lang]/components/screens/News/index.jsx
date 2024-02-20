"use client";
import React, { useEffect, useState } from "react";
import { Post } from "./Post";
import { franc } from "franc-min";
import { Filter } from "./filter";
const News = ({ lang }) => {
  const [filters, setFilters] = useState({ social: [], category: [], language: [] });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  const [mediumPosts, setMediumPosts] = useState([]);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mi.agency",
        );
        const data = await response.json();
        const items = data.items || [];
        const updatedItems = items.map((item, index) => {
          const content = item.content;
          const regex = /<figure.*?>.*?<img.*?src="(.*?)".*?>.*?<\/figure>/;
          const match = content.match(regex);
          let imageUrl = "";
          // Check if a match is found
          if (match && match[1]) {
            imageUrl = match[1];
          } else {
            console.log(`Image URL not found in the content for post ${index + 1}`);
          }
          const language = franc(item.title);
          const social = "Medium";
          const categories = item.categories.length !== 0 ? item.categories : ["#HR", "#business"];
          return { ...item, imageUrl, language, social, categories };
        });
        setMediumPosts(updatedItems);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = mediumPosts
    .filter((post) => {
      // Filter by social
      if (filters.social.length > 0 && !filters.social.includes(post.social)) {
        return false;
      }
      // Filter by sphere
      if (
        filters.category.length > 0 &&
        !post.categories.some((category) => filters.category.includes(category))
      ) {
        return false;
      }

      // Filter by language
      if (filters.language.length > 0 && !filters.language.includes(post.language)) {
        return false;
      }

      return true;
    })
    .slice(0, 4);

  return (
    <div className='relative'>
      <Filter lang={lang} onFilterChange={handleFilterChange} />
      <div className='xl:pr-[190px] xl:mt-[20px] grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filteredPosts.map((post, index) => (
          <Post key={index} {...post} index={index} />
        ))}
      </div>
    </div>
  );
};

export default News;
