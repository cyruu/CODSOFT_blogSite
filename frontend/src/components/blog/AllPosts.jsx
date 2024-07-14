import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import axios from "axios";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
const AllPosts = ({ loggedInUser }) => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMyBlogs = async () => {
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_ORIGIN}/blogs/getAllMyBlogs`,
      {
        userId: loggedInUser.id,
      }
    );
    setMyBlogs(res.data.myAllBlogs);
    setLoading(false);
  };
  useEffect(() => {
    getMyBlogs();
  }, []);
  return (
    <div className="flex flex-col justify-start items-center gap-8 my-10 md:flex-row md:gap-14 flex-wrap">
      {loading ? <p>Loading...</p> : ""}
      {myBlogs.length == 0 ? (
        <div className="w-full text-center">
          <FullscreenIcon sx={{ fontSize: "6rem", color: "gray" }} />
          <p>No Posts Yet.</p>
        </div>
      ) : (
        ""
      )}
      {myBlogs?.map((myBlog) => {
        return <SinglePost key={myBlog._id} myBlog={myBlog} />;
      })}
    </div>
  );
};

export default AllPosts;
