import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const RecentSingleBlog = ({ myBlog }) => {
  const date = new Date(myBlog.createdAt);
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  return (
    <Link to={`/blog/${myBlog._id}`}>
      <div className="flex mb-5 hover:bg-gray-100">
        <img className="h-14 w-20 mr-2" src={myBlog.blogImage.secure_url} />
        <div className="details">
          <p className="text-sm" style={{ fontWeight: "bold" }}>
            {myBlog.title}
          </p>
          <p className="text-xs text-gray-500 ">
            {" "}
            {monthName} {day}, by {myBlog.userId[0].username}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecentSingleBlog;
