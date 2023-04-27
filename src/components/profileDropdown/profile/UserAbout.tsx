import { lazy } from "react";

const ProfileIconListItem = lazy(() => import("./ProfileIconListItem"));

interface UserAboutType {
  subTitle?: string;
  profileDescription?: string;
  skillSet?: { id: number; skill_name: string }[];
  portfolioUsers?: { portfolio_images?: string }[];
  iconList?: {
    title: string;
    value: string;
    icon: JSX.Element;
    url?: string;
  }[];
}

const UserAbout = (props: UserAboutType) => {
  const { subTitle, profileDescription, iconList, skillSet, portfolioUsers } =
    props;

  return (
    <>
      <h5 className="text-base capitalize card-page-title">{subTitle}</h5>
      <p className="text-sm card-page-info">{profileDescription}</p>
      <ul className="flex gap-3 mb-4 text-sm">
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
      {skillSet?.length > 0 && (
        <div className="skillContentPublicPr">
          <div className="showHideEditiconWithTitle">
            <h3 className="text-base skillsPublicPrivate card-page-title">
              Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 todaySkillsDF">
            {skillSet?.map((item) => (
              <div
                className="px-3 py-1 text-sm rounded-full RadingProfiles bg-theme/20 text-zinc-800"
                key={item?.id}
              >
                {item?.skill_name}
              </div>
            ))}
            {skillSet?.length < 1 && (
              <div className="RadingProfiles">No Skills Added</div>
            )}
          </div>
        </div>
      )}

      {portfolioUsers?.length > 0 && (
        <div className="mt-3 porfolioContentPublicPr">
          <div className="showHideEditiconWithTitle">
            <h3 className="text-base skillsPublicPrivate card-page-title">
              Portfolio
            </h3>
          </div>
          <div className="port-main port-mainpage">
            <div className="grid grid-cols-4 gap-3 mt-3 portfolioImgContentHeadDiv">
              {portfolioUsers?.map((portfolio_item, i) => (
                <div
                  key={i}
                  className="relative portfolioImgContent portfoliocreatorpage"
                >
                  <div className="firstportfolioImgContent firstportfolioImgContentdiv">
                    <img
                      src={portfolio_item?.portfolio_images}
                      alt=""
                      className="max-w-full w-full h-full object-cover min-h-[170px] rounded drop-shadow relative overflow-hidden"
                    />
                    <p>
                      {portfolio_item?.portfolio_images.length > 30
                        ? `${portfolio_item?.portfolio_images.slice(0, 30)}...`
                        : portfolio_item?.portfolio_images}
                    </p>
                  </div>
                </div>
              ))}
              {portfolioUsers?.length < 1 && (
                <div className="ParaGraphAboutMePrivateAbout">
                  <div className="paragraph-pAbout">
                    <span>No portfolio images to display</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAbout;
