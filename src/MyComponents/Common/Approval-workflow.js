import React, { useEffect } from "react";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Admin_approval_workflow from "../Admin/Admin-approval-workflow.js";
import Agency_approval_workflow from "../Agency/Agency-approval-workflow.js";
import Member_Admin_Approval_workflow from "../Member/Member-Admin-Approval-workflow";

export default function Approval_workflow() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <Admin_approval_workflow />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <Agency_approval_workflow />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <Member_Admin_Approval_workflow />
  ) : (
    <Navigate to="/" />
  );
}
