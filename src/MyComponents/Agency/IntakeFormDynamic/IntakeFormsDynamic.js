import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLE } from "../../../constants/other-constants";

import AgencyIntakeForms from "./listing/IntakeFormList";

export default function IntakeFormsDynamic() {
  const { userData } = useSelector((state) => state.authReducer);

  // convertCurrentTimeToEST();

  // console.log(moment.utc().subtract(5, 'hours').format("YYYY-MM-DD HH:mm:ss.SSS"));

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <AgencyIntakeForms />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <></>
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <AgencyIntakeForms />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    (userData?.user?.user_level === 1 || userData?.user?.user_level === 2) ? (
    <AgencyIntakeForms />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level === 4 ? (
    <></>
  ) : (
    <Navigate to="/" />
  );
}
