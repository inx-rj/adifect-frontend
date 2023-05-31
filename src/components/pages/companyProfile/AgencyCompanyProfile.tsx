import { lazy, Suspense, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleEffect, useUpdateEffect } from "react-haiku";

//import redux
import { useAppDispatch, useAppSelector } from "redux/store";
import { TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { COMPANY_DETAILS } from "redux/reducers/companyTab/companyTab.slice";
import { GET_SINGLE_COMPANY_DATA } from "redux/actions/companyTab/companyTab.actions";
import { TRIGGER_NAVIGATION_TAB_CONFIG } from "redux/actions/config/tabbing/tabbing.actions";

//import helper files
import {
  companyProfileTabHeaders,
  companyProfileTabTitle,
} from "helper/config/tabbing";
import { ProfilePageAccess } from "helper/config/config";

//import components
import TabbingLayout from "layouts/TabbingLayout";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import Templates from "../templates/Templates";
import AdminJobsList from "../jobs/AdminJobsList";
import WorkFlowList from "../workflow/WorkFlowList";
const AgencyCompanyContactInfo = lazy(
  () => import("components/pages/companyProfile/AgencyCompanyContactInfo")
);

const AgencyCompanyProfile = () => {
  const { "*": companyId } = useParams();

  const dispatch = useAppDispatch();
  const currentCompany = useAppSelector(COMPANY_DETAILS);

  const activeUserTab = useAppSelector(TAB_NAVIGATION_CONFIG);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  const [contentLoad, setContentLoad] = useState<boolean>(false);

  useSingleEffect(() => {
    dispatch(GET_SINGLE_COMPANY_DATA(companyId));
  });

  useUpdateEffect(() => {
    setContentLoad(currentCompany?.loading);
  }, [currentCompany?.loading]);

  //set initial active tab
  useUpdateEffect(() => {
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

  //prepare the company profile data to display on the profile
  const profileData = useMemo(() => {
    return {
      companyId: currentCompany?.data?.company_id,
      profileImg: currentCompany?.data?.company_profile_img,
      title: currentCompany?.data?.name,
      description: currentCompany?.data?.description,
      companyEmail: currentCompany?.data?.company_email,
      companyPhone: currentCompany?.data?.company_phone_number,
      companyWebsite: currentCompany?.data?.company_website,
      industry: currentCompany?.data?.industry,
      industryName: currentCompany?.data?.industry_name,
      countList: [{ title: "Total Jobs", value: "368" }],
    };
  }, [
    currentCompany?.data?.company_profile_img,
    currentCompany?.data?.name,
    currentCompany?.data?.company_id,
    currentCompany?.data?.company_email,
    currentCompany?.data?.company_phone_number,
    currentCompany?.data?.industry,
    currentCompany?.data?.industry_name,
    currentCompany?.data?.description,
    currentCompany?.data?.company_website,
  ]);

  return (
    <Suspense>
      <TabbingLayout
        navType={ProfilePageAccess.COMPANY}
        tabData={profileData}
        tabHeadArr={companyProfileTabHeaders}
        tabBodyTitle={activeUserTab?.company_profile?.active}
        isLoading={contentLoad}
      >
        {currentCompany?.loading && (
          <div className="card border p-4 z-[1] relative min-h-[300px] [&>.spinner-container-bg]:bg-white">
            <LoadingSpinner />
          </div>
        )}

        {!currentCompany?.loading &&
          companyProfileTabHeaders
            ?.filter(
              (item) =>
                item?.name === activeUserTab.company_profile.active &&
                item?.permission.includes(userProfile.data?.role)
            )
            ?.map((item, index) => {
              if (
                activeUserTab?.company_profile?.active ===
                companyProfileTabTitle.USERS
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    <p>Users</p>
                  </Suspense>
                );
              }
              if (
                activeUserTab?.company_profile?.active ===
                companyProfileTabTitle.APPROVAL_WORKFLOWS
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    <WorkFlowList headerTitle={false} companyInfoPage={true} />
                  </Suspense>
                );
              }
              if (
                activeUserTab?.company_profile?.active ===
                companyProfileTabTitle.JOBS
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    <AdminJobsList
                      headerTitle={false}
                      addJobs={false}
                      companyInfoPage={true}
                    />
                  </Suspense>
                );
              }
              if (
                activeUserTab?.company_profile?.active ===
                companyProfileTabTitle.JOB_TEMPLATE
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    <Templates headerTitle={false} companyInfoPage={true} />
                  </Suspense>
                );
              }
              if (
                activeUserTab?.company_profile?.active ===
                companyProfileTabTitle.WORKFLOW
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    <p>WORKFLOW</p>
                  </Suspense>
                );
              }
              if (
                activeUserTab?.company_profile?.active ===
                companyProfileTabTitle.MEMBERS
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    <p>MEMBERS</p>
                  </Suspense>
                );
              }
              return (
                <Suspense fallback={<LoadingSpinner />} key={index}>
                  <AgencyCompanyContactInfo companyData={currentCompany} />
                </Suspense>
              );
            })}
      </TabbingLayout>
    </Suspense>
  );
};

export default AgencyCompanyProfile;
