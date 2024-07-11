import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import SinglePost from "../blog/SinglePost";
import "../../App.css";
const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const getFeaturedBlogs = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:3000/blogs/getFeaturedBlogs`);

    setFeaturedBlogs(res.data.featuredBlogs);

    setLoading(false);
  };
  useEffect(() => {
    getFeaturedBlogs();
  }, []);
  return (
    <div className="w-[100vw] px-2 md:w-full">
      <div className="flex items-center mb-0 ">
        <StarIcon sx={{ fontSize: "1.5rem", marginRight: ".4rem" }} />
        <Typography sx={{ fontSize: "1.5rem" }}>Featured Blogs</Typography>
      </div>
      <div className=" hidden landing w-full h-64 mx-auto bg-red-500 md:w-[95%] md:block">
        <p className="landingtitle">Expand your mind with every post</p>
      </div>
      <div className="flex flex-col justify-start gap-8 items-center md:flex-row md:flex-wrap md:gap-12 md:mx-10 my-10">
        {loading ? <p>Loading...</p> : ""}
        {featuredBlogs?.map((featuredBlog) => {
          return <SinglePost key={featuredBlog._id} myBlog={featuredBlog} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedBlogs;
