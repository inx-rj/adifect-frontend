import React, { useEffect } from "react";
import { ROLE } from "../../constants/other-constants";
import { useSelector, useDispatch } from "react-redux";
import Member_Approver_Company_datalist from "./Member-Approver-Company-datalist";
import Member_Admin_company_Datalist from "./Member-Admin-company-Datalist";

export default function Member_Company_Datalist() {
  const { userData } = useSelector((state) => state.authReducer);
  return userData?.user?.role == Object.keys(ROLE)[3] &&
    (userData?.user?.user_level === 3 || userData?.user?.user_level === 4) ? (
    <Member_Approver_Company_datalist />
  ) : userData?.user?.role == Object.keys(ROLE)[3] ? (
    <Member_Admin_company_Datalist />
  ) : null;
}
