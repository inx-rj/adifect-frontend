import ProfileInfo from "components/common/tabbing/ProfileInfo";
import TabbingBodyTitle from "components/common/tabbing/TabbingBodyTitle";
import { Images } from "helper/images";
import { lazy, Suspense } from "react";
import { TRIGGER_NAVIGATION_TAB_CONFIG } from "redux/actions/config/tabbing/tabbing.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "redux/store";

const Title = lazy(() => import("components/common/PageTitle/Title"));
const TabbingHeadTitle = lazy(
  () => import("components/common/tabbing/TabbingHeadTitle")
);

interface TabbingLayoutType {
  children: JSX.Element;
  tabHeadArrL: any;
  navType: string;
  tabBodyTitle: string;
}

const TabbingLayout = (props) => {
  const { children, tabHeadArr, navType, tabBodyTitle } = props;
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  const handleNavigationClick = (name: string, e) => {
    e.preventDefault();
    dispatch(TRIGGER_NAVIGATION_TAB_CONFIG(navType, name)).then((r) => r);
  };

  return (
    <>
      <Suspense fallback="">
        <Title title={navType === "user" ? "Profile" : "Company Info"} />
      </Suspense>
      <section className="flex gap-5 pt-0 flex-wrap md:flex-nowrap mt-4">
        <div className="card tab-head-content custom-scrollbar">
          {tabHeadArr
            .filter((item) => item.permission.includes(userProfile?.data?.role))
            .map((nav, empIndex) => {
              return (
                <div
                  key={empIndex}
                  onClick={(e) => handleNavigationClick(nav.name, e)}
                  className={`tab-head-wrapper`}
                >
                  <Suspense fallback="">
                    <TabbingHeadTitle
                      active={tabBodyTitle}
                      title={nav.name}
                      info={nav.info}
                      icon={nav.icon}
                    />
                  </Suspense>
                </div>
              );
            })}
        </div>
        <div className="w-full md:w-[calc(100%-220px)] xl:w-[calc(100%-300px)] card p-0">
          <TabbingBodyTitle title={tabBodyTitle} />
          <div className="relative p-5">
            <div className="h-[200px] img img-cover absolute inset-0 w-full">
              <img src={Images.ProfileBG} alt="profile" />
            </div>
            <ProfileInfo />
          </div>
          <div className="p-5 pt-0 -mt-5 ">
            <div className="card border p-4 z-[1] relative">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TabbingLayout;
