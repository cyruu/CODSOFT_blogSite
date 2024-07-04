import React from "react";
import SinglePost from "./SinglePost";

const AllPosts = () => {
  return (
    <div className="flex justify-between items-center gap-14 flex-wrap my-10">
      <SinglePost />
    </div>
  );
};

export default AllPosts;
