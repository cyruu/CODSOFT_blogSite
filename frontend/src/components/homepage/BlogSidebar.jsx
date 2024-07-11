import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RecentSingleBlog from "./RecentSingleBlog";

const BlogSidebar = () => {
  const [recentBlogs, setRecentBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const getRecentBlogs = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:3000/blogs/getRecentBlogs`);
    setRecentBlogs(res.data.recentBlogs);

    setLoading(false);
  };
  useEffect(() => {
    getRecentBlogs();
  }, []);
  return (
    <div className=" w-full flex flex-col items-center sticky top-32">
      <Typography className="border-b-2 p-1 border-gray-300">
        Recent Blogs
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

export default BlogSidebar;
