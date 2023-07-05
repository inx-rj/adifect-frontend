import { lazy, Suspense, useMemo } from "react";
import { useSingleEffect, useUpdateEffect } from "react-haiku";

import { useAppDispatch, useAppSelector } from "redux/store";
import { TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { TRIGGER_NAVIGATION_TAB_CONFIG } from "redux/actions/config/tabbing/tabbing.actions";

import { LanguageOutlined } from "@mui/icons-material";
import { ProfilePageAccess } from "helper/config/config";
import { profileTabHeaders, profileTabTitle } from "helper/config/tabbing";

import TabbingLayout from "layouts/TabbingLayout";
import UserAccount from "./UserAccount";
import { TRIGGER_USER_COUNT } from "redux/actions/jobs/jobs.actions";
import { USER_JOB_COUNT } from "redux/reducers/jobs/fresherJobsList.slice";
import { GET_ALL_SKILLS_LIST, GET_USER_SKILL_SET_LIST } from "redux/actions/skills/skills.action";
import LoadingSpinner from "components/common/loadingSpinner/Loader";

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
  const userJobCount = useAppSelector(USER_JOB_COUNT);
  
  useSingleEffect(() => {
    dispatch(GET_ALL_SKILLS_LIST())
    dispatch(GET_USER_SKILL_SET_LIST(userProfile?.data?.id))
    dispatch(TRIGGER_USER_COUNT(userProfile?.data?.user_level));
  });

  //set initial active tab
  useUpdateEffect(() => {
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
        { title: "Jobs", value: userJobCount?.totalJobCount },
        { title: "In progress", value: userJobCount?.inProgressJobs },
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
        isLoading ={userProfile.loading}
      >
        {userProfile?.loading && (
          <div className="card border p-4 z-[1] relative min-h-[300px] [&>.spinner-container-bg]:bg-white">
            <LoadingSpinner />
          </div>
        )}

        {!userProfile?.loading &&
        profileTabHeaders
          ?.filter(
            (item) =>
              item?.name === activeUserTab?.user_profile?.active &&
              item?.permission.includes(userProfile?.data?.role)
          )
          ?.map((item, index) => {
            if (
              activeUserTab?.user_profile?.active ===
              profileTabTitle.COMMUNICATION
            ) {
              return (
                <Suspense fallback="" key={index}>
                  <UserCommunication />
                </Suspense>
              );
            }
            if (
              activeUserTab?.user_profile?.active === profileTabTitle.COMPANIES
            ) {
              return (
                <Suspense fallback="" key={index}>
                  <CompaniesTab />
                </Suspense>
              );
            }
            if (
              activeUserTab?.user_profile?.active ===
              profileTabTitle.ACCOUNT_SETTINGS
            ) {
              return (
                <Suspense fallback="" key={index}>
                  <UserAccount />
                </Suspense>
              );
            }
            return (
              <Suspense fallback="" key={index}>
                <UserAbout
                  userProfile={userProfile?.data}
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
