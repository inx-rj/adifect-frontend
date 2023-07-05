import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { TableRowsType } from "helper/types/muiTable/muiTable";
import { lazy, useMemo, useState } from "react";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { TRIGGER_PROFILE_PORTFOLIO_LIST } from "redux/actions/profile/profile.actions";
import { GET_USER_SKILL_SET_LIST } from "redux/actions/skills/skills.action";
import { GET_PROFILE_PORTFOLIO } from "redux/reducers/profile/userPortfolio.slice";
import { USER_SKILL_SET_LIST } from "redux/reducers/skills/skills.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import PortfolioSlider from "./editProfile/PortfolioSlider";
import { ROLES } from "helper/config";

const ProfileIconListItem = lazy(() => import("./ProfileIconListItem"));

interface UserAboutType {
  iconList?: {
    title: string;
    value: string;
    icon: JSX.Element;
    url?: string;
  }[];
  userProfile: TableRowsType;
}

const UserAbout = (props: UserAboutType) => {
  const { iconList, userProfile } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  const userskillsetDetails = useAppSelector(USER_SKILL_SET_LIST);
  const portfolioDetails = useAppSelector(GET_PROFILE_PORTFOLIO);

  useSingleEffect(() => {
    if (userProfile?.id) {
      dispatch(GET_USER_SKILL_SET_LIST(userProfile?.id));
      dispatch(TRIGGER_PROFILE_PORTFOLIO_LIST(userProfile?.id, currentPage));
    }
  })
  useUpdateEffect(() => {
    dispatch(GET_USER_SKILL_SET_LIST(userProfile?.id));
    dispatch(TRIGGER_PROFILE_PORTFOLIO_LIST(userProfile?.id, currentPage));
  }, [userProfile?.hasData])


  const SelectedPortfolio = useMemo(
    () =>
      portfolioDetails?.data?.map((file) => {
        return { preview: file?.portfolio_images, title: file?.portfolio_name };
      }) || [],
    [userProfile?.hasData, portfolioDetails?.loading]
  );

  return (
    <>
      <div className="card drop-shadow-none border p-4 z-[1] ">
        <h5 className="text-base capitalize card-page-title">{userProfile?.sub_title}</h5>
        <p className="text-sm card-page-info mb-5">{userProfile?.profile_description}</p>
        <ul className="flex gap-3 mb-4 text-sm flex-col sm:flex-row">
          {iconList?.map((item, index) =>
            item.value && item?.url !== null && (
              <ProfileIconListItem
                icon={item.icon}
                title={item.title}
                value={item?.value}
                url={item?.url}
                key={index}
              />
            ))}
        </ul>
      </div>
      {(userProfile?.role === ROLES.ADMIN || userProfile?.role === ROLES.CREATOR) && <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-3" >
        {portfolioDetails?.data?.length > 0 && (
          <div className="card drop-shadow-none border p-4 portfolio col-span-3 order-2 lg:order-1">
            <h3 className="text-base card-page-title">
              Portfolio
            </h3>
            <div className="port-main port-mainpage">
              {portfolioDetails?.loading && <div className="p-4 [&>.spinner-container-bg]:bg-white" ><LoadingSpinner /></div>}
              {!portfolioDetails?.loading && <PortfolioSlider portfolioDetails={SelectedPortfolio} />
              }
            </div>
          </div>
        )}
        {userskillsetDetails?.data?.results?.length > 0 && (
          <div className="card drop-shadow-none border p-4 col-span-2 order-1 lg:order-2">
            <div className="showHideEditiconWithTitle">
              <h3 className="text-base skillsPublicPrivate card-page-title">
                Skills
              </h3>
            </div>
            {userskillsetDetails?.loading && <div className="p-4 [&>.spinner-container-bg]:bg-white" ><LoadingSpinner /></div>}
            {!userskillsetDetails?.loading && <div className="flex flex-wrap gap-2 todaySkillsDF">
              {userskillsetDetails?.data?.results?.map((item) => (
                <div
                  className="px-3 py-1 text-sm rounded-full RadingProfiles bg-theme/20 text-zinc-800"
                  key={item?.id}
                >
                  {item?.skill_name}
                </div>
              ))}
              {userskillsetDetails?.data?.results?.length < 1 && (
                <div className="RadingProfiles">No Skills Added</div>
              )}
            </div>
            }
          </div>
        )}
      </div>
      }
    </>
  );
};

export default UserAbout;
