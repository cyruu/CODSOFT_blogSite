import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const user = useSelector((state) => state.loggedInUser);

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
