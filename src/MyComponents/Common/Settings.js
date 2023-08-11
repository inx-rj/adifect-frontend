import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import AdminSettings from "../Admin/Admin-settings.js";
import CreatorSettings from "../Creator/Creator-settings.js";
import AgencySettings from "../Agency/Agency-settings.js";
import MemberSettings from "../Member/Member-settings.js";

export default function Settings() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <AdminSettings />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <CreatorSettings />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <AgencySettings />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <MemberSettings />
  ) : (
    <Navigate to="/" />
  );
}
