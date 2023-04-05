import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Master = () => {
  // get userData from localStorage
  const userDataFromStorage = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") ?? "")
    : null;

  console.log("userDataFromStorage", userDataFromStorage);
  return userDataFromStorage ? (
    <div role="main">
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Master;
