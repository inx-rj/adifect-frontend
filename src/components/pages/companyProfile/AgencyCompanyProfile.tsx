import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleEffect } from "react-haiku";
import TabbingLayout from "layouts/TabbingLayout";

import { useAppDispatch, useAppSelector } from "redux/store";
import { TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";
import { GET_COMPANY_LIST } from "redux/actions/companyTab/companyTab.actions";
import { TRIGGER_NAVIGATION_TAB_CONFIG } from "redux/actions/config/tabbing/tabbing.actions";

import {
  companyProfileTabHeaders,
  companyProfileTabTitle,
} from "helper/config/tabbing";
import { TableRowsType } from "helper/types/muiCustomTable/muiCustomTable";
import { ProfilePageAccess } from "helper/config/config";
import { AccountCircleOutlined, LanguageOutlined } from "@mui/icons-material";

const UserAbout = lazy(
  () => import("components/ProfileDropdown/profile/UserAbout")
);
const AgencyCompanyContactInfo = lazy(
  () => import("components/pages/companyProfile/AgencyCompanyContactInfo")
);

const AgencyCompanyProfile = () => {
  const { companyId } = useParams();
  const dispatch = useAppDispatch();
  const [currentCompany, setCurrentCompany] = useState<TableRowsType | null>(
    null
  );

  const activeUserTab = useAppSelector(TAB_NAVIGATION_CONFIG);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const { companyList } = useAppSelector(COMPANY_LIST);

  //get company list on refresh
  useSingleEffect(() => {
    if (companyList?.data?.results?.length < 1) {
      dispatch(
        GET_COMPANY_LIST({
          page: 1,
          rowsPerPage: 10,
        })
      );
    }
  });

  //set initial active tab
  useEffect(() => {
    if (userProfile.data?.role >= 0) {
      const initialActiveTab = companyProfileTabHeaders?.find((item) =>
        item?.permission.includes(userProfile.data?.role)
      );
      dispatch(
        TRIGGER_NAVIGATION_TAB_CONFIG(
          ProfilePageAccess.COMPANY,
          initialActiveTab?.name
        )
      );
    }
  }, [userProfile.data?.role, dispatch]);

  //check which company is selected
  useEffect(() => {
    if (companyList.data.results?.length > 0 && companyId) {
      const currentCompany = companyList.data.results?.find(
        (item) => item?.id === Number(companyId)
      );
      setCurrentCompany(currentCompany);
    }
  }, [companyList.data.results, companyId]);

  //prepare the icons list to display on the profile
  const iconList = useMemo(() => {
    return [
      {
        title: "Owner",
        value: currentCompany?.agency_name,
        icon: <AccountCircleOutlined />,
      },
      {
        title: "Website",
        value: currentCompany?.company_website,
        url: currentCompany?.company_website,
        icon: <LanguageOutlined />,
      },
      {
        title: "Language",
        value: currentCompany?.Language ?? "English (US)",
        icon: <LanguageOutlined />,
      },
    ];
  }, [
    currentCompany?.agency_name,
    currentCompany?.company_website,
    currentCompany?.Language,
  ]);

  //prepare the count list to display on the profile
  const profileData = useMemo(() => {
    return {
      profileImg: currentCompany?.company_profile_img,
      title: currentCompany?.name,
      description: "",
      countList: [{ title: "Total Jobs", value: "368" }],
    };
  }, [currentCompany?.company_profile_img, currentCompany?.name]);

  return (
    <Suspense>
      <TabbingLayout
        navType={ProfilePageAccess.COMPANY}
        tabData={profileData}
        tabHeadArr={companyProfileTabHeaders}
        tabBodyTitle={activeUserTab?.company_profile?.active}
        tabBodySection={
          activeUserTab?.company_profile?.active ===
          companyProfileTabTitle.COMPANY_INFO ? (
            <AgencyCompanyContactInfo companyData={currentCompany} />
          ) : null
        }
      >
        {companyProfileTabHeaders
          ?.filter(
            (item) =>
              item?.name === activeUserTab.company_profile.active &&
              item?.permission.includes(userProfile.data?.role)
          )
          ?.map((item) => {
            if (
              activeUserTab?.company_profile?.active ===
              companyProfileTabTitle.USERS
            ) {
              return (
                <Suspense fallback="">
                  <p>Users</p>
                </Suspense>
              );
            }
            if (
              activeUserTab?.company_profile?.active ===
              companyProfileTabTitle.APPROVAL_WORKFLOWS
            ) {
              return (
                <Suspense fallback="">
                  <p>APPROVAL WORKFLOWS</p>
                </Suspense>
              );
            }
            if (
              activeUserTab?.company_profile?.active ===
              companyProfileTabTitle.JOBS
            ) {
              return (
                <Suspense fallback="">
                  <p>JOBS</p>
                </Suspense>
              );
            }
            if (
              activeUserTab?.company_profile?.active ===
              companyProfileTabTitle.JOB_TEMPLATE
            ) {
              return (
                <Suspense fallback="">
                  <p>JOB TEMPLATE</p>
                </Suspense>
              );
            }
            if (
              activeUserTab?.company_profile?.active ===
              companyProfileTabTitle.WORKFLOW
            ) {
              return (
                <Suspense fallback="">
                  <p>WORKFLOW</p>
                </Suspense>
              );
            }
            if (
              activeUserTab?.company_profile?.active ===
              companyProfileTabTitle.MEMBERS
            ) {
              return (
                <Suspense fallback="">
                  <p>MEMBERS</p>
                </Suspense>
              );
            }
            return (
              <Suspense fallback="">
                <UserAbout
                  title={currentCompany?.name}
                  description={currentCompany?.description}
                  iconList={iconList}
                />
              </Suspense>
            );
          })}
      </TabbingLayout>
    </Suspense>
  );
};

export default AgencyCompanyProfile;
