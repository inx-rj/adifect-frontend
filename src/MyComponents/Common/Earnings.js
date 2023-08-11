import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import AdminEarnings from "../Admin/Admin-earnings.js";
import CreatorEarnings from "../Creator/Creator-earnings.js";
import AgencyEarnings from "../Agency/Agency-earnings.js";

export default function Earnings() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <AdminEarnings />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <CreatorEarnings />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <AgencyEarnings />
  ) : (
    <Navigate to="/" />
  );
}
