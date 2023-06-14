import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import Agency_company_projects from "../Agency/Company-projects/Agency-company-projects.jsx";
import { convertCurrentTimeToEST } from "../../utils/validations";
import moment from "moment";

export default function Company_projects() {
  const { userData } = useSelector((state) => state.authReducer);

  // convertCurrentTimeToEST();

  // console.log(moment.utc().subtract(5, 'hours').format("YYYY-MM-DD HH:mm:ss.SSS"));

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <Agency_company_projects />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <></>
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <Agency_company_projects />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    (userData?.user?.user_level === 1 || userData?.user?.user_level === 2) ? (
      <Agency_company_projects />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level === 4 ? (
    <></>
  ) : (
    <Navigate to="/" />
  );
}
