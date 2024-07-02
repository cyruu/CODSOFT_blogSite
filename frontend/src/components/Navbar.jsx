import React from "react";

const Navbar = () => {
  return (
    <nav className="h-16 flex items-center justify-between px-32">
      <div className="logo">Blog</div>
      <ul className="nav-links flex">
        <li>Home</li>
        <li>blogs</li>
      </ul>
      <div className="search">
        <input type="text" placeholder="search" className="bg-red-300" />
      </div>
      <ul className="login-links flex">
        <li>Login</li>
        <li>Signup</li>
      </ul>
    </nav>
  );
};

export default Navbar;
