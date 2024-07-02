import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
const Navbar = () => {
  return (
    <nav className="h-20 flex items-center justify-between px-32 border-[1px]">
      <div className="logo">Blog</div>
      <ul className="nav-links flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "bg-black text-white rounded" : ""} py-2 px-4`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `${isActive ? "bg-black text-white rounded" : ""} py-2 px-4 ml-3`
          }
        >
          Blogs
        </NavLink>
      </ul>
      <Search />
      <ul className="login-links flex">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `${isActive ? "bg-black text-white rounded" : ""} py-2 px-3`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `${isActive ? "bg-black text-white rounded" : ""} py-2 px-3 ml-2`
          }
        >
          Signup
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
