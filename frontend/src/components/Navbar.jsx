import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { setLoggedInUser } from "../redux/authSlice";

const Navbar = () => {
  const dis = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  async function handleLogout() {
    const res = await axios.get("http://localhost:3000/users/logout", {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    if (res.data.success) {
      dis(setLoggedInUser({ userData: null }));
      navigate("/");
    }
  }
  return (
    <nav className="h-full flex flex-col items-center justify-between border-[1px] px-10 md:px-14 md:h-16 md:flex-row lg:px-32 flex-row">
      <div className="logo">Blog</div>
      <div className="flex h-full justify-between flex-grow ml-0 lg:ml-20 md:ml-14">
        <ul className="nav-links flex h-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "border-b-4 border-black text-black " : ""
              } py-2 px-4 flex items-center`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `${
                isActive ? "border-b-4 border-black text-black " : ""
              } py-2 px-4 flex items-center `
            }
          >
            Blogs
          </NavLink>
        </ul>
        <Search />
        {loggedInUser ? (
          <ul className="login-links flex h-full">
            <NavLink
              to={`/${loggedInUser.username}`}
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-4 border-black text-black " : ""
                } py-2 flex items-center px-4`
              }
            >
              {loggedInUser.username}
            </NavLink>
            <button
              onClick={handleLogout}
              className="py-2 flex items-center px-4 "
            >
              Logout
            </button>
          </ul>
        ) : (
          <ul className="login-links flex h-full">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-4 border-black text-black " : ""
                } py-2 flex items-center px-4`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-4 border-black text-black " : ""
                } py-2 flex items-center px-4 `
              }
            >
              Signup
            </NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
