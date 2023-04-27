import { lazy, useState } from "react";
import { BorderColorOutlined, StarRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Images } from "helper/images";
import { ProfilePageAccess } from "helper/config/config";

const EditProfileForm = lazy(
  () => import("components/profileDropdown/profile/editProfile/EditProfileForm")
);
const EditCompanyProfileForm = lazy(
  () => import("components/pages/companyProfile/EditCompanyProfileForm")
);

interface ProfileDataType {
  tabData: {
    profileImg: string;
    title: string;
    description: string;
    countList: { title: string; value: string }[];
  };
  navType: string;
}

const ProfileInfo = (props: ProfileDataType) => {
  const { tabData, navType } = props;
  const { profileImg, title, description, countList } = tabData;

  const [editModal, setEditModal] = useState<boolean>(false);

  return (
    <div className="mb-5 flex justify-between text-white relative z-[1] gap-2">
      <div className="left flex-[calc(100%-155px)]">
        <div className="flex gap-3">
          <div className="img img-cover border-2 rounded-full overflow-hidden w-12 sm:w-[65px] xl:w-[75px] h-12 sm:h-[65px] xl:h-[75px] bg-slate-400">
            <img src={profileImg ?? Images.UserAvatar} alt="profile logo" />
          </div>
          <div className="w-[calc(100%-80px)] xl:w-[calc(100%-90px)]">
            {title && (
              <h3 className="inline-flex items-center gap-2 text-lg font-bold text-white capitalize">
                {title}
                <span className="bg-theme/[.4] py-1 px-3 text-white text-sm rounded-3xl ml-4 flex items-center gap-1">
                  <StarRounded fontSize="small" />
                  4.8
                </span>
              </h3>
            )}
            {description && <p className="my-2">{description}</p>}
            <div className="flex gap-2 [&>div:not(:first-child)]:border-l-2 [&>div:not(:first-child)]:pl-2">
              {countList?.length > 0 &&
                countList?.map((item) => (
                  <div>
                    <p className="font-bold">{item.value}</p>
                    <label>{item.title}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <Button
          className="gap-2 btn btn-primary"
          onClick={() => setEditModal(true)}
        >
          <BorderColorOutlined fontSize="small" />
          Edit Project
        </Button>
      </div>
      {editModal && (
        <>
          {navType === ProfilePageAccess.USER ? (
            <EditProfileForm
              openPopup={editModal}
              handlePopup={() => setEditModal(false)}
            />
          ) : (
            <EditCompanyProfileForm
              openPopup={editModal}
              handlePopup={() => setEditModal(false)}
              tabData={tabData}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
