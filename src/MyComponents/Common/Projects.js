import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import AdminProjects from "../Admin/Admin-projects.js";
import CreatorProjects from "../Creator/Creator-projects.js";
import AgencyProjects from "../Agency/Agency-projects.js";
import MemberProject from "../Member/MemberProject";
import Member_Inhouse_Project from "../Member/Member-inhouse-Project";

export default function Projects() {
  const { userData } = useSelector((state) => state.authReducer);
  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <AdminProjects />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <CreatorProjects />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <AgencyProjects />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    (userData?.user?.user_level === 1 || userData?.user?.user_level === 2) ? (
    <MemberProject />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level === 4 ? (
    <Member_Inhouse_Project />
  ) : (
    <Navigate to="/" />
  );
}
