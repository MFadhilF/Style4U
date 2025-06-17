import React from "react";
import { Navigate } from "react-router-dom";
import Homepage from "./homepage";

const LandingPage = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/productlistpage" replace />;
  }
  return <Homepage />;
};

export default LandingPage;
