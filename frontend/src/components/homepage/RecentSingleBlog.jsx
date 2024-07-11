import { Typography } from "@mui/material";
import React from "react";

const RecentSingleBlog = ({ myBlog }) => {
  console.log(myBlog);
  return (
    <div className="flex mb-5">
      <img className="h-14 w-20 mr-2" src={myBlog.blogImage.secure_url} />
      <div className="details">
        <p className="text-sm" style={{ fontWeight: "bold" }}>
          {myBlog.title}
        </p>
        <p className="text-xs text-gray-500 md:text-sm">date</p>
      </div>
    </div>
  );
};

export default RecentSingleBlog;
