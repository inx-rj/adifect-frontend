import { lazy, Suspense } from "react";
import TabbingLayout from "layouts/TabbingLayout";
import { profileTabHeaders, profileTabTitle } from "helper/config/tabbing";
import { useAppSelector } from "redux/store";
import { TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";

const UserAbout = lazy(
  () => import("components/ProfileDropdown/profile/UserAbout")
);
const UserCommunication = lazy(
  () => import("components/ProfileDropdown/profile/UserCommunication")
);

const Profile = () => {
  const activeUserTab = useAppSelector(TAB_NAVIGATION_CONFIG);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  return (
    <Suspense>
      <TabbingLayout
        tabHeadArr={profileTabHeaders}
        navType="user"
        tabBodyTitle={activeUserTab?.user_profile?.active}
      >
        {profileTabHeaders
          ?.filter(
            (item) =>
              item?.name === activeUserTab?.user_profile?.active &&
              item?.permission.includes(userProfile?.data?.role)
          )
          ?.map((item) => {
            if (
              activeUserTab?.user_profile?.active ===
              profileTabTitle.COMMUNICATION
            ) {
              return (
                <Suspense fallback="">
                  <UserCommunication />
                </Suspense>
              );
            }
            if (
              activeUserTab?.user_profile?.active === profileTabTitle.COMPANIES
            ) {
              return (
                <Suspense fallback="">
                  <p>Companies</p>
                </Suspense>
              );
            }
            if (
              activeUserTab?.user_profile?.active ===
              profileTabTitle.ACCOUNT_SETTINGS
            ) {
              return (
                <Suspense fallback="">
                  <p>Account</p>
                </Suspense>
              );
            }
            return (
              <Suspense fallback="">
                <UserAbout />
              </Suspense>
            );
          })}
      </TabbingLayout>
    </Suspense>
  );
};

export default Profile;
