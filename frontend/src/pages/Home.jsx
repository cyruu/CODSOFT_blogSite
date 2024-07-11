import React, { useState } from "react";
import { Grid } from "@mui/material";
import FeaturedBlogs from "../components/homepage/FeaturedBlogs";
import BlogSidebar from "./BlogSidebar";

const Home = () => {
  return (
    <div className="w-[100vw] my-5 lg:w-[80%] md:w-[90%] mx-auto md:my-10">
      <Grid container className="">
        <Grid item md={8} sm={12}>
          <FeaturedBlogs />
        </Grid>
        <Grid item md={3} sm={12}>
          <BlogSidebar />
        </Grid>
        <Grid item md={1} sm={12}>
          {/* <BlogSidebar /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
