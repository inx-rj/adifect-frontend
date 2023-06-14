import React, { useEffect } from "react";
import { ROLE } from "../../constants/other-constants";
import { useSelector, useDispatch } from "react-redux";
import Creator_profile from "../Creator/Creator-profile/Creator-profile";
import Agency_profile from "../Agency/Agency-profile/Agency-profile";
import Member_profile from "../Member/Member-Profile/Member-profile";

export default function Profile() {
  const { userData } = useSelector((state) => state.authReducer);
  return userData?.user?.role == Object.keys(ROLE)[1] ? (
    <Creator_profile />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <Agency_profile />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <Member_profile />
  ) : (
    <Creator_profile />
  );
}
