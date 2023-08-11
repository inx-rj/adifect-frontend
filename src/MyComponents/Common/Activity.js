import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";
import AdminActivity from "../Admin/Admin-activity.js";
import CreatorActivity from "../Creator/Creator-activity.js";
import AgencyActivity from "../Agency/Agency-activity.js";
import MemberActivity from "../Member/Member-activity.js";
export default function Activity() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <AdminActivity />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <CreatorActivity />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <AgencyActivity />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <MemberActivity />
  ) : (
    <Navigate to="/" />
  );
}
