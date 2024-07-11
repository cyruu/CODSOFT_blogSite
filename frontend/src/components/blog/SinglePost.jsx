import React from "react";
import white from "../../images/white.png";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
const SinglePost = ({ myBlog }) => {
  console.log("single", myBlog);
  function elipsesString(str, limit) {
    let res = str.slice(0, limit);
    if (str.length > limit) {
      res += "...";
    }
    return res;
  }
  return (
    <div className="h-[420px] w-80 border p-1 border-gray-300 ">
      <img src={myBlog.blogImage.secure_url} className="h-1/2 w-full " />
      <div className="description p-2 pb-3  h-1/2 flex flex-col justify-between items-start">
        <p className="title text-md font-bold">
          {elipsesString(myBlog.title, 70)}
        </p>
        <p className="details text-xs mt-1 mb-2 flex-grow">
          {elipsesString(myBlog.description, 260)}
        </p>
        {/* <Link to=""> */}
        <Button
          variant="contained"
          sx={{ marginInline: "auto" }}
          disableElevation
        >
          Read More
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SinglePost;
