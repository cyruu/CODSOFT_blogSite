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
    <nav className="h-16 flex items-center justify-between px-32 border-[1px]">
      <div className="logo">Blog</div>
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
            } py-2 px-4 flex items-center ml-3`
          }
        >
          Blogs
        </NavLink>
      </ul>
      <Search />
      {loggedInUser ? (
        <ul className="login-links flex h-full">
          <NavLink
            to="/login"
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
            className="py-2 flex items-center px-4 ml-2"
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
              } py-2 flex items-center px-4 ml-2`
            }
          >
            Signup
          </NavLink>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
