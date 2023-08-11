import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { Navigate } from "react-router-dom";

import AdminTransactions from "../Admin/Admin-transactions.js";
import CreatorTransactions from "../Creator/Creator-transactions.js";
import AgencyTransactions from "../Agency/Agency-transactions.js";

export default function Transactions() {
  const { userData } = useSelector((state) => state.authReducer);

  return userData?.user?.role == Object.keys(ROLE)[0] ? (
    <AdminTransactions />
  ) : userData?.user?.role == Object.keys(ROLE)[1] ? (
    <CreatorTransactions />
  ) : userData?.user?.role == Object.keys(ROLE)[2] ? (
    <AgencyTransactions />
  ) : (
    <Navigate to="/" />
  );
}
