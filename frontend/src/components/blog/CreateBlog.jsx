import React, { useState } from "react";
import white from "../../images/white.png";
import { Typography, Breadcrumbs, Button, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import ImageIcon from "@mui/icons-material/Image";
const CreateBlog = () => {
  const navigate = useNavigate();
  const [postimg, setPostimg] = useState({ myFile: "" });
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const submit = async (data) => {
    const blogData = { ...data, imagefile: postimg.myFile };
    const res = await axios.post(
      "http://localhost:3000/blogs/createBlog",
      blogData
    );
    // if (res.data.success) {
    //   navigate(`/${loggedInUser.username}`);
    // }
  };
  async function handlefileupload(e) {
    setPostimg({ ...postimg, myFile: base64 });
  }

  return (
    <div className="w-full my-5 mx-auto w-[90%] md:w-[80%]">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "1rem" }}>
        <Link
          underline="hover"
          color="inherit"
          to={`/${loggedInUser.username}`}
        >
          Profile
        </Link>

        <Typography color="text.primary">Create a Blog</Typography>
      </Breadcrumbs>
      {/* main  */}
      <form onSubmit={handleSubmit(submit)}>
        {/* title */}
        <Paper className="mb-5 md:p-0" elevation={0}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "1rem" }}
          >
            Title
          </Typography>

          <input
            className="text-xs p-2 rounded-md outline-blue-400 w-full mt-1 border-2 broder-gray-1000 sm:text-sm"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
              minLength: {
                value: 1,
                message: "Title must be at least 15 characters.",
              },
            })}
          />
          {errors.title ? (
            <p className="text-xs mt-1 text-red-600">{errors.title.message}</p>
          ) : (
            ""
          )}
        </Paper>
        {/* intro */}
        <Paper className="mb-5 md:p-0" elevation={0}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "1rem" }}
          >
            Introduction
          </Typography>

          <textarea
            className="text-xs p-2 rounded-md outline-blue-400 w-full mt-1 border-2 broder-gray-1000 sm:text-sm"
            {...register("introduction", {
              required: {
                value: true,
                message: "Introduction is required",
              },
              minLength: {
                value: 1,
                message: "Introduction must be at least 15 characters.",
              },
            })}
          ></textarea>
          {errors.introduction ? (
            <p className="text-xs mt-1 text-red-600">
              {errors.introduction.message}
            </p>
          ) : (
            ""
          )}
        </Paper>
        {/* image file */}
        <Paper className="mb-5 md:p-0" elevation={0}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "1rem" }}
          >
            Choose an image
          </Typography>

          <label
            htmlFor="fileupload"
            className="border-2 mt-2 rounded-xl w-full h-[200px] md:h-[300px] md:w-[500px] flex justify-start relative overflow-hidden"
          >
            <div
              className="overlay absolute h-full w-full flex justify-center items-center "
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <div className="flex flex-col items-center">
                <ImageIcon className="text-white" sx={{ fontSize: "2rem" }} />
                <p className="text-white">Upload Image</p>
              </div>
            </div>
            <img
              src={postimg.myFile || white}
              // style={{ width: "500px", height: "300px" }}
              className=""
            />
          </label>
          <input
            {...register("imagefile", {
              required: {
                value: true,
                message: "Image is required",
              },
            })}
            type="file"
            name="myFile"
            id="fileupload"
            accept=".jpeg, .png, .jpg"
            className="hidden"
            onChange={(e) => handlefileupload(e)}
          />
          {errors.imagefile ? (
            <p className="text-xs mt-1 text-red-600">
              {errors.imagefile.message}
            </p>
          ) : (
            ""
          )}
        </Paper>
        {/* description */}
        <Paper className="mb-5 md:p-0" elevation={0}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "1rem" }}
          >
            Description
          </Typography>

          <textarea
            className="text-xs p-2 rounded-md outline-blue-400 w-full mt-1 border-2 broder-gray-1000 sm:text-sm"
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
              minLength: {
                value: 1,
                message: "Description must be at least 15 characters.",
              },
            })}
          ></textarea>
          {errors.description ? (
            <p className="text-xs mt-1 text-red-600">
              {errors.description.message}
            </p>
          ) : (
            ""
          )}
        </Paper>
        <Button type="submit" variant="contained" disableElevation>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
