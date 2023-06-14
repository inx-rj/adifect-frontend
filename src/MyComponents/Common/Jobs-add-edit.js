import React, { useEffect } from "react";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Admin_jobs_add_edit from "../Admin/Admin-jobs.js";
import Creator_jobs_add_edit from "../Creator/Creator-jobs-add-edit.js";
import Agency_jobs_add_edit from "../Agency/Agency-jobs-add-edit.js";

export default function Job_add_edit() {
  const { userData } = useSelector((state) => state.authReducer);
  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <Admin_jobs_add_edit />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <Creator_jobs_add_edit />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <Agency_jobs_add_edit />
  ) : (
    <Navigate to="/" />
  );
}
