import React, { useEffect } from "react";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AdminDashboard from "../Admin/Admin-dashboard.js";
import CreatorDashboard from "../Creator/Creator-dashboard.js";
import AgencyDashboard from "../Agency/Agency-dashboard.js";
import MemberDashboard from "../Member/Member-dashboard.js";

export default function Dashboard() {
  const { userData } = useSelector((state) => state.authReducer);
  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <AdminDashboard />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <CreatorDashboard />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <AgencyDashboard />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <MemberDashboard />
  ) : (
    <Navigate to="/" />
  );
}
