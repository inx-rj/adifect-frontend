import React, { useEffect } from "react";
import { ROLE } from "../../constants/other-constants";
import { useSelector, useDispatch } from "react-redux";
import Member_Approver_Company from "./Member-Approver-Company";
import Member_Admin_Copmay_List from "./Member-Admin-Compmay-List";

export default function Member_Company() {
  const { userData } = useSelector((state) => state.authReducer);
  return userData?.user?.role == Object.keys(ROLE)[3] &&
    (userData?.user?.user_level === 3 || userData?.user?.user_level === 4) ? (
    <Member_Approver_Company />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <Member_Admin_Copmay_List />
  ) : null;
}
