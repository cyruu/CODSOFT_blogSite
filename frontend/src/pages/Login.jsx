import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Typography, TextField, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { notify } from "../utils/notify.js";
import { ToastContainer } from "react-toastify";
import { setLoggedInUser } from "../redux/authSlice.js";
import axios from "axios";
import { useDispatch } from "react-redux";
const Login = () => {
  const dis = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const submit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/users/loginUser",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      notify(res.data.message, res.data.success);

      if (res.data.success) {
        const res = await axios.get("http://localhost:3000/decodeJwtToken", {
          withCredentials: true,
        });
        dis(setLoggedInUser({ userData: res.data.decodedToken }));
        window.localStorage.setItem("loginToken", res.data.token);
        navigate("/");
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
        method="post"
      >
        <Typography variant="h3" className="mb-8 ">
          Login
        </Typography>

        <TextField
          // autoComplete="off"
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
          color={errors.email ? "error" : "primary"}
          id="standard-basic"
          label="Email"
          variant="standard"
          className="w-full"
          style={{ margin: "2rem 0" }}
        />
        <p className="mr-auto text-xs m-0 text-red-700 mt-1">
          {errors.email?.message}
        </p>
        <TextField
          // autoComplete="off"
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
          type="password"
          color={errors.password ? "error" : "primary"}
          id="standard-basic"
          label="Password"
          variant="standard"
          className="w-full mt-8"
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
            <span className="mr-6">Login</span>
          </LoadingButton>
        ) : (
          <Button variant="contained" size="large" type="submit">
            Login
          </Button>
        )}
        <NavLink to="/signup" className="mt-4 block underline">
          New here? Create account.
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
