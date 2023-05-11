import { lazy, Suspense, useEffect, useMemo } from "react";
import { useUpdateEffect } from "react-haiku";

import { useAppDispatch, useAppSelector } from "redux/store";
import { USER_SKILL_SET_LIST } from "redux/reducers/skills/skills.slice";
import { GET_USER_SKILL_SET_LIST } from "redux/actions/skills/skills.action";
import { TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { TRIGGER_NAVIGATION_TAB_CONFIG } from "redux/actions/config/tabbing/tabbing.actions";

import { LanguageOutlined } from "@mui/icons-material";
import { ProfilePageAccess } from "helper/config/config";
import { profileTabHeaders, profileTabTitle } from "helper/config/tabbing";

import TabbingLayout from "layouts/TabbingLayout";
const CompaniesTab = lazy(
  () => import("components/profileDropdown/profile/CompaniesTab")
);
const UserAbout = lazy(
  () => import("components/profileDropdown/profile/UserAbout")
);
const UserCommunication = lazy(
  () => import("components/profileDropdown/profile/UserCommunication")
);

const Profile = () => {
  const dispatch = useAppDispatch();

  const activeUserTab = useAppSelector(TAB_NAVIGATION_CONFIG);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const userskillsetDetails = useAppSelector(USER_SKILL_SET_LIST);

  useUpdateEffect(() => {
    if (userProfile?.data?.id)
      dispatch(GET_USER_SKILL_SET_LIST(userProfile?.data?.id));
  }, [userProfile?.data?.id]);

  //set initial active tab
  useEffect(() => {
    if (userProfile.data?.role >= 0) {
      const initialActiveTab = profileTabHeaders?.find((item) =>
        item?.permission.includes(userProfile.data?.role)
      );
      dispatch(
        TRIGGER_NAVIGATION_TAB_CONFIG(
          ProfilePageAccess.USER,
          initialActiveTab?.name
        )
      );
    }
  }, [userProfile.data?.role, dispatch]);

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
                  <CompaniesTab />
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
                  subTitle={userProfile?.data?.sub_title}
                  profileDescription={userProfile?.data?.profile_description}
                  iconList={iconList}
                  skillSet={userskillsetDetails?.data?.results}
                  portfolioUsers={userProfile?.data?.Portfolio_user}
                />
              </Suspense>
            );
          })}
      </TabbingLayout>
    </Suspense>
  );
};

export default Profile;
