import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import DetailBlogSidebar from "../components/blog/DetailBlogSidebar";
import DetailBlog from "../components/blog/DetailBlog";

const Blog = () => {
  const { blogId } = useParams();
  const [Title, setTitle] = useState(null);
  const [Image, setImage] = useState(null);
  const [Month, setMonth] = useState(null);
  const [Day, setDay] = useState(null);
  const [User, setUser] = useState(null);
  const [Introduction, setIntroduction] = useState(null);
  const [Description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const getBlog = async () => {
    setLoading(true);
    const res = await axios.post("http://localhost:3000/blogs/getBlog", {
      blogId,
    });
    const resData = res.data.blog[0];
    const date = new Date(resData.createdAt);
    const monthName = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    setTitle(resData.title);
    setDay(day);
    setMonth(monthName);
    setUser(resData.userId[0].username);
    setImage(resData.blogImage.secure_url);
    setIntroduction(resData.introduction);
    setDescription(resData.description);
    setLoading(false);
  };
  useEffect(() => {
    getBlog();
  }, [blogId]);
  return (
    <div className="w-[100vw] my-5 min-h-[90vh] lg:w-[80%] md:w-[90%] mx-auto md:my-10">
      <Grid container className="">
        <Grid item md={8} sm={12}>
          <DetailBlog
            title={Title}
            image={Image}
            month={Month}
            day={Day}
            user={User}
            introduction={Introduction}
            description={Description}
          />
        </Grid>
        <Grid item md={4} sm={12}>
          <DetailBlogSidebar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Blog;
