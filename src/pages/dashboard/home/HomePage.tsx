import React from "react";
import { lazy, Suspense } from "react";
import {
  LOGIN_USER_DATA,
  USER_DATA,
} from "../../../redux/reducers/auth/auth.slice";
import { useAppSelector } from "../../../redux/store";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../../../components/homePage/AdminDashboard";
import AgencyDashboard from "../../../components/homePage/AgencyDashboard";
import { Roles } from "../../../helper/config";

//Import lazy load Component
// const PageHeading = lazy(() => import("../../components/heading/PageHeading"));

const HomePage = () => {
  const userData = useAppSelector(LOGIN_USER_DATA);
  console.log(
    "userData",
    userData,
    userData?.role == Object.values(Roles)[2],
    userData?.role,
    Object.values(Roles)
  );
  return userData?.role == Object.values(Roles)[0] ? (
    <AdminDashboard />
  ) : userData?.role == Object.values(Roles)[1] ? (
    // <CreatorDashboard />
    <></>
  ) : userData?.role == 2 ? (
    <AgencyDashboard />
  ) : userData?.role == Object.values(Roles)[3] ? (
    // <AgencyMemberDashboard />
    <></>
  ) : (
    <Navigate to="/" />
  );
};

export default HomePage;
