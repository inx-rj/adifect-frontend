import React, { useEffect } from "react";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Admin_workflow_list from "../Admin/Admin-workflow-list.js";
import Agency_workflow_list from "../Agency/Agency-workflow-list.js";
import Member_Admin_Workflow from "../Member/Member-Admin-Workflow";

export default function Approval_workflow_list() {
  const { userData } = useSelector((state) => state.authReducer);
  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <Admin_workflow_list />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <Agency_workflow_list />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <Member_Admin_Workflow />
  ) : (
    <Navigate to="/" />
  );
}
