import ProfileInfo from "components/common/tabbing/ProfileInfo";
import TabbingBodyTitle from "components/common/tabbing/TabbingBodyTitle";
import { profileNavigation } from "helper/config/tabbing";
import { Images } from "helper/images";
import { lazy, Suspense } from "react";
import { useAppDispatch } from "redux/store";

const Title = lazy(() => import("components/common/PageTitle/Title"));
const TabbingHeadTitle = lazy(() => import("components/common/tabbing/TabbingHeadTitle"));

const TabbingLayout = ({ children }) => {
  const dispatch = useAppDispatch();

  const handleNavigationClick = (name, e) => {
    e.preventDefault();
    // dispatch(TRIGGER_NAVIGATION_TAB_CONFIG(navType, name)).then(r => r);
  };

  return (
    <>
      <Suspense fallback="">
        <Title title={"Tabbing"} />
      </Suspense>
      <section className="flex gap-5 pt-0">
        <div className="card p-0 w-[300px] max-h-[calc(100vh-165px)] h-ful overflow-y-auto sticky top-[75px] left-0 right-0 shadow-xs">
          {profileNavigation.map((nav, empIndex) => {
            return (
              <div
                key={empIndex}
                onClick={e => handleNavigationClick(nav.name, e)}
                className={`tab-head-wrapper`}
              >
                <Suspense fallback="">
                  <TabbingHeadTitle active={nav.name} title={nav.name} info={nav.info} icon={nav.icon} />
                </Suspense>
              </div>
            );
          })}
        </div>
        <div className="w-[calc(100%-300px)] shadow-xs card">
          <TabbingBodyTitle title="About" />
          <div className="relative p-5 -mx-5" >
            <div className="h-[200px] img img-cover absolute inset-0 w-full" >
              <img src={Images.ProfileBG} alt="profile" />
            </div>
            <ProfileInfo />
          </div>
          <div className="card border p-4 -mt-5 z-[1]" >
            {children}
          </div>
        </div>
      </section>
    </>
  );
};

export default TabbingLayout;
