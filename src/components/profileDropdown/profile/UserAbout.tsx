import { useAppSelector } from "redux/store";
import ProfileIconListItem from "./ProfileIconListItem";
import { GET_PROFILE_PORTFOLIO } from "redux/reducers/profile/commun.slice";
import { GET_USER_PROFILE_DATA } from "../../../redux/reducers/auth/auth.slice";

interface UserAboutType {
  title: string;
  description: string;
  iconList: { title: string; value: string; icon: JSX.Element; url?: string }[];
}

const UserAbout = (props: UserAboutType) => {
  const { title, description, iconList } = props;

  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  return (
    <>
      <h5 className="card-page-title text-base mb-4">{title}</h5>
      <p className="card-page-info text-sm">{description}</p>
      <ul className="text-sm flex gap-3">
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
      <div className="porfolioContentPublicPr mt-3">
        <div className="showHideEditiconWithTitle">
          <h3 className="skillsPublicPrivate">Portfolio</h3>
        </div>
        <div className="port-main port-mainpage">
          <div className="portfolioImgContentHeadDiv grid grid-cols-4 gap-3 mt-3">
            {userProfile?.data?.Portfolio_user?.length > 0 &&
              userProfile?.data?.Portfolio_user?.map((portfolio_item, i) => (
                  <div key={i} className="portfolioImgContent portfoliocreatorpage  rounded drop-shadow relative overflow-hidden">
                    <div
                      
                      className="firstportfolioImgContent firstportfolioImgContentdiv"
                    >
                      <img
                        src={
                          portfolio_item?.portfolio_images
                        }
                        alt=""
                        className="max-w-full w-full h-full object-cover min-h-[170px]"
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
