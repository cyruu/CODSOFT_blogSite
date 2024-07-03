import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../redux/authSlice";

const Navbar = () => {
  const dis = useDispatch();
  useEffect(() => {
    console.log("navbarrr");
    dis(getLoggedInUser());
  }, []);
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
    </nav>
  );
};

export default Navbar;
