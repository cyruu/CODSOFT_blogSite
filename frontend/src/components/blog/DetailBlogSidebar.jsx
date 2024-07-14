import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RecentSingleBlog from "../homepage/RecentSingleBlog";

const DetailBlogSidebar = () => {
  const [recentBlogs, setRecentBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const getRecentBlogs = async () => {
    setLoading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_ORIGIN}/blogs/getYouMayLike`
    );
    setRecentBlogs(res.data.blog);

    setLoading(false);
  };
  useEffect(() => {
    getRecentBlogs();
  }, []);
  return (
    <div className=" w-full flex flex-col items-center sticky top-32">
      <Typography className="border-b-2 p-1 border-gray-300">
        You may like
      </Typography>
      <div className="mt-3 recent w-full p-4">
        {loading ? <p>Loading...</p> : ""}
        {recentBlogs?.map((recentBlog) => {
          return <RecentSingleBlog key={recentBlog._id} myBlog={recentBlog} />;
        })}
      </div>
    </div>
  );
};

export default DetailBlogSidebar;
