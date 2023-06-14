import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";
import AdminActivity from "../Admin/Admin-activity.js";
import CreatorActivity from "../Creator/Creator-activity.js";
import AgencyActivity from "../Agency/Agency-activity.js";
import MemberActivity from "../Member/Member-activity.js";
import Invite from "../Authentication/Invite";
import Member_Admin_invite from "../Member/Member-Admin-invite";
export default function Main_Invite() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <Invite />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <Invite />
  ) : userData?.user?.role == Object.keys(ROLE)[3] &&  userData?.user?.user_level === 1 ? (
    <Member_Admin_invite />
  ) : (
    <Navigate to="/" />
  );
}
