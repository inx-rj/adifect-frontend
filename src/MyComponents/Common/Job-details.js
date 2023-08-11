import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import Admin_job_details from "../Admin/Admin-job-details.js";
import Creator_job_details from "../Creator/Creator-job-details.js";
import Agency_job_details from "../Agency/Agency-job-details.js";
import Member_job_details from "../Member/Member-job-details.js";

export default function Job_details() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <Admin_job_details />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <Creator_job_details />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <Agency_job_details />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <Member_job_details />
  ) : (
    <Navigate to="/" />
  );
}
