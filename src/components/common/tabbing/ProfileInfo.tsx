// import { useAppSelector } from '../../../../redux/store';
// import { DASHBOARD_PROJECT_ROUTE } from 'routes/baseRoutes';
// import { projectOverviewInterface } from '../../../../interface/project/ProjectDetailInterface';
// import { GET_PROJECT_DETAILS_OVERVIEW } from '../../../../redux/reducers/projects/projectDetail/projectDetailsOverview.slice';

import { useState } from "react";
import { BorderColorOutlined, StarRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Images } from "helper/images";
import EditProfileForm from "components/profileDropdown/profile/editProfile/EditProfileForm";

interface ProfileDataType {
  profileImg: string;
  title: string;
  description: string;
  countList: { title: string; value: string }[];
}

const ProfileInfo = (props: ProfileDataType) => {
  const { profileImg, title, description, countList } = props;

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
              <h3 className="text-lg  font-bold inline-flex items-center gap-2 text-white  capitalize">
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
          className="btn btn-primary gap-2"
          onClick={() => setEditModal(true)}
        >
          <BorderColorOutlined fontSize="small" />
          Edit Project
        </Button>
      </div>
      {editModal && (
        <EditProfileForm
          openPopup={editModal}
          handlePopup={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
