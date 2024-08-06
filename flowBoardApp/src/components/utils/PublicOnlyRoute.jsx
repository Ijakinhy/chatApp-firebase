import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({ Component }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return isLoggedIn ? <Navigate to="/boards" replace /> : <Component />;
};

export default PublicOnlyRoute;
