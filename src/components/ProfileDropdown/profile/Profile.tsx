import { lazy, Suspense, useMemo } from "react";
import TabbingLayout from "layouts/TabbingLayout";
import { profileTabHeaders, profileTabTitle } from "helper/config/tabbing";
import { useAppSelector } from "redux/store";
import { TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { ProfilePageAccess } from "helper/config/config";
import { LanguageOutlined } from "@mui/icons-material";

const UserAbout = lazy(
  () => import("components/ProfileDropdown/profile/UserAbout")
);
const UserCommunication = lazy(
  () => import("components/ProfileDropdown/profile/UserCommunication")
);

const Profile = () => {
  const activeUserTab = useAppSelector(TAB_NAVIGATION_CONFIG);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  //prepare the icons list to display on the profile
  const iconList = useMemo(() => {
    return [
      {
        title: "Website",
        value: userProfile?.data?.website,
        url: userProfile?.data?.website,
        icon: <LanguageOutlined />,
      },
      {
        title: "Language",
        value: userProfile?.data?.Language ?? "English (US)",
        icon: <LanguageOutlined />,
      },
    ];
  }, [userProfile?.data?.website, userProfile?.data?.Language]);

  //prepare the count list to display on the profile
  const profileData = useMemo(() => {
    return {
      profileImg: userProfile?.data?.profile_img,
      title: `${userProfile?.data?.first_name} ${userProfile?.data?.last_name}`,
      description: userProfile?.data?.profile_title,
      countList: [
        { title: "Total Jobs", value: "368" },
        { title: "Companies", value: "07" },
      ],
    };
  }, [
    userProfile?.data?.profile_img,
    userProfile?.data?.first_name,
    userProfile?.data?.last_name,
    userProfile?.data?.profile_title,
  ]);

  return (
    <Suspense>
      <TabbingLayout
        navType={ProfilePageAccess.USER}
        tabData={profileData}
        tabHeadArr={profileTabHeaders}
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
                <UserAbout
                  title={userProfile?.data?.sub_title}
                  description={userProfile?.data?.profile_description}
                  iconList={iconList}
                />
              </Suspense>
            );
          })}
      </TabbingLayout>
    </Suspense>
  );
};

export default Profile;
