import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "./Search";
import Person4Icon from "@mui/icons-material/Person4";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { setLoggedInUser } from "../redux/authSlice";
import MoblieSearch from "./MoblieSearch";
import CloseIcon from "@mui/icons-material/Close";
const Navbar = () => {
  const [searchStatus, setSearchStatus] = useState(false);
  const dis = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  async function handleLogout() {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_ORIGIN}/users/logout`,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.data.success) {
      dis(setLoggedInUser({ userData: null }));
      navigate("/");
    }
  }

  return (
    <nav className="sticky top-0 z-10 bg-white h-full flex flex-col items-center justify-between border-[1px] px-10 md:px-14 md:h-16 md:flex-row lg:px-32 flex-row">
      <div className="first flex items-center relative ">
        <NavLink to="/" className="logo">
          Blog
        </NavLink>
        <button
          className="absolute left-[180px] p-2 flex md:hidden"
          onClick={() => setSearchStatus((prev) => !prev)}
        >
          <SearchIcon />
        </button>
      </div>

      <div className="flex h-full justify-between flex-grow flex-col ml-0 lg:ml-20 md:ml-14 md:flex-row">
        <ul className="nav-links flex h-full hidden md:flex">
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
        </ul>

        <div className="search md:flex">
          <Search setSearchStatus={setSearchStatus} />
        </div>

        {loggedInUser ? (
          <ul className="login-links flex justify-center h-full">
            <NavLink
              to={`/profile/${loggedInUser.username}`}
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-4 border-black text-black " : ""
                } py-2 flex items-center px-2 mr-4 md:pr-4`
              }
            >
              <Person4Icon
              // sx={{ padding: ".3rem .3rem 0 .3rem", fontSize: "2rem" }}
              />
              {loggedInUser.username}
            </NavLink>
            <button
              onClick={handleLogout}
              className="py-2 flex items-center md:px-4 "
            >
              Logout
            </button>
          </ul>
        ) : (
          <ul className="login-links flex justify-center h-full">
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
