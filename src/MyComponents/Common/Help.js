import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import AdminHelp from "../Admin/Admin-help.js";
import CreatorHelp from "../Creator/Creator-help.js";
import AgencyHelp from "../Agency/Agency-help.js";
import MemberHelp from "../Member/Member-help.js";

export default function Help() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <AdminHelp />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <CreatorHelp />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <AgencyHelp />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <MemberHelp />
  ) : (
    <Navigate to="/" />
  );
}
