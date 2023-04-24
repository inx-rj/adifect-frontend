import { useAppDispatch, useAppSelector } from "redux/store";
import ProfileIconListItem from "./ProfileIconListItem";
import { GET_USER_PROFILE_DATA } from "../../../redux/reducers/auth/auth.slice";
import { GET_USER_SKILL_SET_LIST } from "redux/actions/skills/skills.action";
import { useSingleEffect } from "react-haiku";
import { USER_SKILL_SET_LIST } from "redux/reducers/skills/skills.slice";

interface UserAboutType {
  title: string;
  description: string;
  iconList: { title: string; value: string; icon: JSX.Element; url?: string }[];
}

const UserAbout = (props: UserAboutType) => {
  const { title, description, iconList } = props;
  const dispatch = useAppDispatch();

  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const userskillsetDetails = useAppSelector(USER_SKILL_SET_LIST);

  useSingleEffect(() => {
    dispatch(GET_USER_SKILL_SET_LIST(userProfile?.data?.id));
  });

  return (
    <>
      <h5 className="card-page-title text-base capitalize">{title}</h5>
      <p className="card-page-info text-sm">{description}</p>
      <ul className="text-sm flex gap-3 mb-4">
        {iconList?.map((item) => (
          <>
            {item.value && item?.url !== null && (
              <ProfileIconListItem
                icon={item.icon}
                title={item.title}
                value={item?.value}
                url={item?.url}
              />
            )}
          </>
        ))}
      </ul>
      <div className="skillContentPublicPr">
        <div className="showHideEditiconWithTitle">
          <h3 className="skillsPublicPrivate card-page-title text-base">Skills</h3>
        </div>
        <div className="todaySkillsDF flex flex-wrap gap-2">
          {userskillsetDetails?.data?.results?.length > 0 &&
            userskillsetDetails?.data?.results?.map((item) => (
              <div className="RadingProfiles text-sm rounded-full bg-theme/20 text-zinc-800 px-3 py-1" key={item?.id} >
                {item?.skill_name}
              </div>
            ))}
          {userskillsetDetails?.data?.results?.length < 1 &&
            <div className="RadingProfiles">
              No Skills Added
            </div>
          }
        </div>
      </div>
      <div className="porfolioContentPublicPr mt-3">
        <div className="showHideEditiconWithTitle">
          <h3 className="skillsPublicPrivate card-page-title text-base">Portfolio</h3>
        </div>
        <div className="port-main port-mainpage">
          <div className="portfolioImgContentHeadDiv grid grid-cols-4 gap-3 mt-3">
            {userProfile?.data?.Portfolio_user?.length > 0 &&
              userProfile?.data?.Portfolio_user?.map((portfolio_item, i) => (
                <div key={i} className="portfolioImgContent portfoliocreatorpage relative">
                  <div

                    className="firstportfolioImgContent firstportfolioImgContentdiv"
                  >
                    <img
                      src={
                        portfolio_item?.portfolio_images
                      }
                      alt=""
                      className="max-w-full w-full h-full object-cover min-h-[170px] rounded drop-shadow relative overflow-hidden"
                    />
                    <p>
                      {portfolio_item?.portfolio_images
                        .length > 30
                        ? `${portfolio_item?.portfolio_images.slice(
                          0,
                          30
                        )}...`
                        : portfolio_item?.portfolio_images}
                    </p>
                  </div>
                </div>
              ))}
            {userProfile?.data?.Portfolio_user?.length < 1 && (
              <div className="ParaGraphAboutMePrivateAbout">
                <div className="paragraph-pAbout">
                  <span>
                    No portfolio images to display
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAbout;
