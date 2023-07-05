import { GET_USER_PROFILE_DATA } from "../../../redux/reducers/auth/auth.slice";
import { useAppSelector } from "../../../redux/store";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../../../components/homePage/AdminDashboard";
import AgencyDashboard from "../../../components/homePage/AgencyDashboard";
import { ROLES } from "../../../helper/config";
import AgencyMemberDashboard from "components/homePage/AgencyMemberDashboard";
import CreatorDashboard from "../../../components/homePage/CreatorDashboard";

//Import lazy load Component
// const PageHeading = lazy(() => import("../../components/heading/PageHeading"));

const HomePage = () => {
  const userData = useAppSelector(GET_USER_PROFILE_DATA);

  return userData.data.role === Object.values(ROLES)[0] ? (
    <AdminDashboard />
  ) : userData.data.role === Object.values(ROLES)[1] ? (
    <CreatorDashboard />
  ) : userData.data.role === 2 ? (
    <AgencyDashboard />
  ) : userData.data.role === Object.values(ROLES)[3] ? (
    <AgencyMemberDashboard />
  ) : (
    // <></>
    <Navigate to="/" />
  );
};

export default HomePage;
