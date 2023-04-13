import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleEffect } from "react-haiku";
import TabbingLayout from "layouts/TabbingLayout";

import { useAppDispatch, useAppSelector } from "redux/store";
import { TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";
import { GET_COMPANY_LIST } from "redux/actions/companyTab/companyTab.actions";
import {
  companyProfileTabHeaders,
  companyProfileTabTitle,
} from "helper/config/tabbing";
import { TableRowsType } from "helper/types/muiCustomTable/muiCustomTable";

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

  useEffect(() => {
    if (companyList.data.results?.length > 0 && companyId) {
      const currentCompany = companyList.data.results?.find(
        (item) => item?.id === Number(companyId)
      );
      setCurrentCompany(currentCompany);
    }
  }, [companyList.data.results, companyId]);

  return (
    <Suspense>
      <TabbingLayout
        tabHeadArr={companyProfileTabHeaders}
        navType="company"
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
            return (
              <Suspense fallback="">
                <UserAbout data={currentCompany} navType="company" />
              </Suspense>
            );
          })}
      </TabbingLayout>
    </Suspense>
  );
};

export default AgencyCompanyProfile;
