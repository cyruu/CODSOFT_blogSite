import React, { useState } from "react";
import { Grid } from "@mui/material";
import FeaturedBlogs from "../components/homepage/FeaturedBlogs";
import BlogSidebar from "../components/homepage/BlogSidebar";
import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <div className="w-[100vw] my-5 min-h-[90vh] lg:w-[80%] md:w-[90%] mx-auto md:my-10">
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <Grid container className="">
        <Grid item md={8} sm={12}>
          <FeaturedBlogs />
        </Grid>
        <Grid item md={4} sm={12}>
          <BlogSidebar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
