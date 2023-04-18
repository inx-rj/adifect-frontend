import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import Creator_jobs_add_edit from "../Creator/Creator-jobs-add-edit.js";
import { useAppSelector } from "redux/store";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import AdminJobsAddEdit from "./adminJobs/AdminJobsAddEdit";
import AgencyJobsAddEdit from "./agencyJobs/AgencyJobsAddEdit";
import MemberJobsAddEdit from "./memberJobs/MemberJobsAddEdit";
import { Roles } from "helper/config";

const JobAddEdit = () => {
  const userData = useAppSelector(GET_USER_PROFILE_DATA);
  return userData?.data?.role == Object.values(Roles)[0] ? (
    <AdminJobsAddEdit />
  ) : // ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
  //   <Creator_jobs_add_edit />
  userData?.data?.role == Object.values(Roles)[2] ? (
    <AgencyJobsAddEdit />
  ) : userData?.data?.role == Object.values(Roles)[3] ? (
    <MemberJobsAddEdit />
  ) : (
    <Navigate to="/" />
  );
};
export default JobAddEdit;
