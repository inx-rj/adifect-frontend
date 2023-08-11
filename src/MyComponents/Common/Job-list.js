import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import Admin_job_list from "../Admin/Admin-job-list.js";

import Creator_job_list from "../Creator/Creator-job-list.js";
import Agency_job_list from "../Agency/Agency-job-list.js";
import Member_job_list from "../Member/Member-job-list.js";
import Member_InHouse_job_list from "../Member/Member-inHouse-job-list";

export default function Job_list() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <Admin_job_list />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <Creator_job_list />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <Agency_job_list />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level !== 4 ? (
    <Member_job_list />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level === 4 ? (
    <Member_InHouse_job_list />
  ) : (
    <Navigate to="/" />
  );
}
