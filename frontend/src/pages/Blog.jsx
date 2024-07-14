import { Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DetailBlogSidebar from "../components/blog/DetailBlogSidebar";
import DetailBlog from "../components/blog/DetailBlog";
import BlogComments from "../components/blog/BlogComments";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [Title, setTitle] = useState(null);
  const [Image, setImage] = useState(null);
  const [Month, setMonth] = useState(null);
  const [Day, setDay] = useState(null);
  const [User, setUser] = useState(null);
  const [Introduction, setIntroduction] = useState(null);
  const [Description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const getBlog = async () => {
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_ORIGIN}/blogs/getBlog`,
      {
        blogId,
      }
    );
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
  const submit = async (data) => {
    try {
      const { comment } = data;
      const userId = loggedInUser.id;
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_ORIGIN}/blogs/addComment`,
        {
          comment,
          userId,
          blogId,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
          <BlogComments blogId={blogId} />
          {/* comment form */}
          <form onSubmit={handleSubmit(submit)}>
            <Paper className="mb-5 md:p-0" elevation={0}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
              >
                Add your comment
              </Typography>

              <textarea
                className="text-xs p-2 rounded-md outline-blue-400 w-full mt-1 border-2 broder-gray-1000 sm:text-sm"
                {...register("comment", {
                  required: {
                    value: true,
                    message: "Comment can't be empty!",
                  },
                  minLength: {
                    value: 1,
                    message: "Comment must be at least 15 characters.",
                  },
                })}
              ></textarea>
              {errors.comment ? (
                <p className="text-xs mt-1 text-red-600">
                  {errors.comment.message}
                </p>
              ) : (
                ""
              )}
            </Paper>
            {loggedInUser ? (
              <Button variant="contained" disableElevation type="submit">
                Post Comment
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="contained" disableElevation>
                  Post Comment
                </Button>
              </Link>
            )}
          </form>
        </Grid>
        <Grid item md={4} sm={12}>
          <DetailBlogSidebar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Blog;
