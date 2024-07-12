import React from "react";
import { Link } from "react-router-dom";

const SearchSingleBlog = ({ myBlog }) => {
  const date = new Date(myBlog.createdAt);
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  function elipsesString(str, limit) {
    let res = str.slice(0, limit);
    if (str.length > limit) {
      res += "...";
    }
    return res;
  }
  return (
    <Link to={`/blog/${myBlog._id}`}>
      <div className="mb-8 flex flex-col border-b pb-5 pt-2 w-full md:flex-row md:pb-8 hover:bg-gray-100">
        <img
          src={myBlog.blogImage.secure_url}
          alt=""
          className="mb-3 w-full md:mr-4 md:w-44"
        />
        <div className="details pr-2">
          <p className="blogtopic font-bold text-sm md:text-lg">
            {elipsesString(myBlog.title, 80)}
          </p>
          <p className="blogdesc text-xs text-gray-400 mb-1">
            {monthName} {day}, by {myBlog.userId[0].username}
          </p>
          <p className="blogdesc text-xs md:text-sm">
            {elipsesString(myBlog.introduction, 500)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchSingleBlog;
