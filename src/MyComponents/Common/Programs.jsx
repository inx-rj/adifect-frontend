import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import Agency_programs from "../Agency/Company-projects/Agency-programs";

export default function Programs() {
  const { userData } = useSelector((state) => state.authReducer);
  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <Agency_programs />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <></>
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <Agency_programs />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    (userData?.user?.user_level === 1 || userData?.user?.user_level === 2) ? (
      <Agency_programs />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level === 4 ? (
    <></>
  ) : (
    <Navigate to="/" />
  );
}
