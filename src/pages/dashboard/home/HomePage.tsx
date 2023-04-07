import React from "react";
import { lazy, Suspense } from "react";
import { GET_USER_DATA } from "../../../redux/reducers/auth/auth.slice";
import { useAppSelector } from "../../../redux/store";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../../../components/homePage/AdminDashboard";
import AgencyDashboard from "../../../components/homePage/AgencyDashboard";
import { Roles } from "../../../helper/config";

//Import lazy load Component
// const PageHeading = lazy(() => import("../../components/heading/PageHeading"));

const HomePage = () => {
  const userData = useAppSelector(GET_USER_DATA);

  return userData.data.user.role == Object.values(Roles)[0] ? (
    <AdminDashboard />
  ) : userData.data.user.role == Object.values(Roles)[1] ? (
    // <CreatorDashboard />
    <></>
  ) : userData.data.user.role == 2 ? (
    <AgencyDashboard />
  ) : userData.data.user.role == Object.values(Roles)[3] ? (
    // <AgencyMemberDashboard />
    <></>
  ) : (
    <Navigate to="/" />
  );
};

export default HomePage;
