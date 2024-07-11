import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, TextField, Typography } from "@mui/material";

// import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { notify } from "../utils/notify.js";
import { ToastContainer } from "react-toastify";

//component
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const submit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/users/createUser",
        data
      );
      notify(res.data.message, res.data.success);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[89vh] flex items-center justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(submit)}
        className="w-3/4 flex flex-col items-center sm:w-96"
      >
        <Typography variant="h3" className="mb-8">
          Sign Up
        </Typography>
        <TextField
          autoComplete="on"
          {...register("username", {
            pattern: {
              value: /^[a-zA-Z0-9]{5,}$/,
              message: "Username must be at least 5 characters",
            },
            required: {
              value: true,
              message: "Enter username.",
            },
          })}
          // id="standard-basic"
          id="standard-error-helper-text"
          label="Username"
          variant="standard"
          color={errors.username ? "error" : "primary"}
          className="w-full mt-6"
          style={{ marginTop: "1rem" }}
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.username?.message}
        </p>
        <TextField
          autoComplete="on"
          {...register("email", {
            required: {
              value: true,
              message: "Enter email.",
            },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid Email.",
            },
          })}
          id="standard-basic"
          label="Email"
          variant="standard"
          className="w-full mt-6"
          style={{ margin: "1rem 0" }}
          color={errors.email ? "error" : "primary"}
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.email?.message}
        </p>
        <TextField
          autoComplete="on"
          {...register("password", {
            pattern: {
              value: /^[a-zA-Z0-9@]{8,}$/,
              message: "Must contain at least 8 characters",
            },
            required: {
              value: true,
              message: "Enter password",
            },
          })}
          id="standard-basic"
          color={errors.password ? "error" : "primary"}
          label="Password"
          variant="standard"
          className="w-full mt-6"
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1 mb-8">
          {errors.password?.message}
        </p>
        {loading ? (
          <LoadingButton
            size="large"
            color="error"
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span className="mr-6">Sign Up</span>
          </LoadingButton>
        ) : (
          <Button variant="contained" size="large" type="submit">
            Sign Up
          </Button>
        )}
        <NavLink to="/login" className="mt-4 block underline">
          Already have account?
        </NavLink>
      </form>
    </div>
  );
};

export default Signup;
