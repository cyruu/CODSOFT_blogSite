import React from "react";
import white from "../../images/white.png";
import { Link } from "react-router-dom";
import Person4Icon from "@mui/icons-material/Person4";

import { Button, Typography } from "@mui/material";
const SinglePost = ({ myBlog }) => {
  function elipsesString(str, limit) {
    let res = str.slice(0, limit);
    if (str.length > limit) {
      res += "...";
    }
    return res;
  }
  return (
    <div className="h-[420px] w-80 border p-1 border-gray-300 relative  cursor-pointer hover:bg-gray-100">
      <Link to={`/blog/${myBlog._id}`}>
        <div className="author absolute top-5 bg-white pr-3 pl-.5 py-1 rounded-r-full">
          <Typography sx={{ fontSize: ".8rem" }}>
            <Person4Icon sx={{ fontSize: "1rem", marginRight: ".1rem" }} />
            {Array.isArray(myBlog.userId)
              ? myBlog.userId[0].username
              : myBlog.userId.username}
          </Typography>
        </div>
        <img src={myBlog.blogImage.secure_url} className="h-1/2 w-full " />
        <div className="description p-2 pb-3  h-1/2 flex flex-col justify-between items-start">
          <p className="title text-md font-bold">
            {elipsesString(myBlog.title, 60)}
          </p>
          <p className="details text-xs mt-1 mb-2 flex-grow">
            {elipsesString(myBlog.description, 260)}
          </p>

          <Button
            variant="contained"
            disableElevation
            sx={{ marginInline: "auto" }}
          >
            Read More
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default SinglePost;
