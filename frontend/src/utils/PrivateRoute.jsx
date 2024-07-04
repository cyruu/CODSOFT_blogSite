import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) => state.loggedInUser);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
