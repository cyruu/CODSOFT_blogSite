import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import axios from "axios";
const AllPosts = ({ loggedInUser }) => {
  const [myBlogs, setMyBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const getMyBlogs = async () => {
    setLoading(true);
    const res = await axios.post(`http://localhost:3000/blogs/getAllMyBlogs`, {
      userId: loggedInUser.id,
    });
    setMyBlogs(res.data.myAllBlogs);
    setLoading(false);
  };
  useEffect(() => {
    getMyBlogs();
  }, []);
  return (
    <div className="flex flex-col justify-start items-center gap-8 my-10 md:flex-row md:gap-14 flex-wrap">
      {loading ? <p>Loading...</p> : ""}
      {myBlogs?.map((myBlog) => {
        return <SinglePost key={myBlog._id} myBlog={myBlog} />;
      })}
    </div>
  );
};

export default AllPosts;
