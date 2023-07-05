import { lazy, useState } from "react";
import { BorderColorOutlined, StarRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Images } from "helper/images";
import { ProfilePageAccess } from "helper/config/config";
import { TabDataType } from "layouts/TabbingLayout";

const EditProfileForm = lazy(
  () => import("components/profileDropdown/profile/editProfile/EditProfileForm")
);
const EditCompanyProfileForm = lazy(
  () => import("components/pages/companyProfile/EditCompanyProfileForm")
);

interface ProfileDataType extends TabDataType {}

const ProfileInfo = (props: ProfileDataType) => {
  const { tabData, navType } = props;
  const { profileImg, title, description, countList } = tabData;

  const [editModal, setEditModal] = useState<boolean>(false);

  return (
    <>
      <div className="mb-5 flex justify-between text-white relative z-[1] gap-2">
        <div className="img img-cover border-2 rounded-full overflow-hidden w-12 sm:w-[65px] xl:w-[75px] h-12 sm:h-[65px] xl:h-[75px] bg-slate-400">
          <img src={profileImg ?? Images.UserAvatar} alt="profile logo" />
        </div>
        <div className="flex flex-col gap-3 w-[calc(100%-48px)] sm:w-[calc(100%-65px)] xl:w-[calc(100%-75px)]">
          <div className="flex flex-wrap gap-2">
            <div className="w-[calc(100%-50px)] md:w-[calc(100%-150px)]">
              {title && (
                <h3 className="inline-flex flex-wrap items-center text-lg font-bold text-white capitalize gap-4">
                  {title}
                  <span className="bg-theme/[.4] py-1 px-3 text-white text-sm rounded-3xl flex items-center gap-1">
                    <StarRounded fontSize="small" />
                    4.8
                  </span>
                </h3>
              )}
            </div>
            <div className="right">
              <Button
                className="gap-0 md:gap-2 btn btn-primary [&.btn.MuiButton-root]:min-w-max [&.btn.MuiButton-root]:text-[0] [&.btn.MuiButton-root]:md:text-sm [&.btn.MuiButton-root]:p-2 [&.btn.MuiButton-root]:md:p-3"
                onClick={() => setEditModal(true)}
              >
                <BorderColorOutlined fontSize="small" />
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="max-w-[700px] w-full -mt-3 md:-mt-5">
            {description && <p className="my-2">{description}</p>}
            <div className="flex gap-2 [&>div:not(:first-child)]:border-l-2 [&>div:not(:first-child)]:pl-2">
              {countList?.length > 0 &&
                countList?.map((item, index) => (
                  <div key={index}>
                    <p className="font-bold">{item.value}</p>
                    <label>{item.title}</label>
                  </div>
                ))}
            </div>
          </div>
        </div>
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
    </>
  );
};

export default ProfileInfo;
