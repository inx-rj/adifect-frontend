import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import AdminAnalytics from "../Admin/Admin-analytics.js";
import CreatorAnalytics from "../Creator/Creator-analytics.js";
import AgencyAnalytics from "../Agency/Agency-analytics.js";

export default function Analytics() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <AdminAnalytics />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <CreatorAnalytics />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <AgencyAnalytics />
  ) : (
    <Navigate to="/" />
  );
}
