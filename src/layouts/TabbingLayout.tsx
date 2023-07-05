import { lazy, ReactNode, Suspense } from "react";
import { TRIGGER_NAVIGATION_TAB_CONFIG } from "redux/actions/config/tabbing/tabbing.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import { Images } from "helper/images";
import { ProfilePageAccess } from "helper/config/config";
import LoadingSpinner from "components/common/loadingSpinner/Loader";

const Title = lazy(() => import("components/common/pageTitle/Title"));
const TabbingBodyTitle = lazy(
  () => import("components/common/tabbing/TabbingBodyTitle")
);
const ProfileInfo = lazy(() => import("components/common/tabbing/ProfileInfo"));
const TabbingHeadTitle = lazy(
  () => import("components/common/tabbing/TabbingHeadTitle")
);

export interface TabDataType {
  tabData: {
    profileImg: string;
    title: string;
    description: string;
    countList: { title: string; value: number }[];
  };
  navType: string;
}

interface TabbingLayoutType extends TabDataType {
  children: ReactNode;
  tabHeadArr: any;
  tabBodyTitle: string;
  isLoading?: boolean;
  companyInfoPage?: boolean;
  jobsDetailsPage?: boolean;
  currentJobData?: any;
}

const TabbingLayout = (props: TabbingLayoutType) => {
  const {
    children,
    navType,
    tabData,
    tabHeadArr,
    tabBodyTitle,
    isLoading = false,
    companyInfoPage = true,
    jobsDetailsPage,
    currentJobData,
  } = props;

  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  const handleNavigationClick = (name: string, e) => {
    e.preventDefault();
    dispatch(TRIGGER_NAVIGATION_TAB_CONFIG(navType, name)).then((r) => r);
  };

  return (
    <>
      <Suspense fallback="">
        <Title
          title={
            navType === ProfilePageAccess.USER
              ? "Profile"
              : navType === ProfilePageAccess.JOBS
              ? "Jobs Details"
              : "Company Info"
          }
        />
      </Suspense>
      <section className="flex flex-wrap gap-5 pt-0 mt-4 md:flex-nowrap">
        <div className="card drop-shadow-none tab-head-content custom-scrollbar">
          {tabHeadArr
            .filter((item) => item.permission.includes(userProfile?.data?.role))
            .map((nav, empIndex) => {
              return (
                <div
                  key={empIndex}
                  onClick={(e) => handleNavigationClick(nav?.name, e)}
                  className={`tab-head-wrapper`}
                >
                  <TabbingHeadTitle
                    active={tabBodyTitle}
                    title={nav?.name}
                    info={nav.info}
                    icon={nav.icon}
                  />
                </div>
              );
            })}
        </div>
        <div className="w-full md:w-[calc(100%-220px)] xl:w-[calc(100%-270px)] card drop-shadow-none p-0 relative">
          <Suspense fallback={<LoadingSpinner />}>
            <div className="flex justify-between">
              <TabbingBodyTitle title={tabBodyTitle} />
            </div>
            <div className="relative h-[calc(100%-45px)]">
              {isLoading && (
                <div className="p-4 z-[1] [&>.spinner-container-bg]:bg-white">
                  <LoadingSpinner />
                </div>
              )}
              {!isLoading && (
                <>
                  {companyInfoPage && (
                    <div className="relative p-5">
                      <div className="h-full img img-cover absolute inset-0 w-full">
                        <img src={Images.ProfileBG} alt="profile" />
                      </div>
                      <ProfileInfo tabData={tabData} navType={navType} />
                    </div>
                  )}
                  <div className="p-5 pt-0 -mt-5">
                    <div className="relative">{children}</div>
                  </div>
                </>
              )}
            </div>
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default TabbingLayout;
