// import { useAppSelector } from '../../../../redux/store';
// import { DASHBOARD_PROJECT_ROUTE } from 'routes/baseRoutes';
// import { projectOverviewInterface } from '../../../../interface/project/ProjectDetailInterface';
// import { GET_PROJECT_DETAILS_OVERVIEW } from '../../../../redux/reducers/projects/projectDetail/projectDetailsOverview.slice';

import { BorderColorOutlined, StarRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import EditProfileFormWrapper from "components/ProfileDropdown/profile/editProfile/EditProfileFormWrapper";
import { Images } from "helper/images";
import { useState } from "react";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useAppSelector } from "redux/store";

const ProfileInfo = () => {
  const [editModal, setEditModal] = useState<boolean>(false);

  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  return (
    <div className="mb-5 flex justify-between text-white relative z-[1] gap-2">
      <div className="left flex-[calc(100%-155px)]">
        <div className="flex gap-3">
          <div className="img img-cover border-2 rounded-full overflow-hidden w-12 sm:w-[65px] xl:w-[75px] h-12 sm:h-[65px] xl:h-[75px] bg-slate-400">
            <img
              src={
                userProfile?.data?.profile_img
                  ? userProfile?.data?.profile_img
                  : Images.UserAvatar
              }
              alt="profile logo"
            />
          </div>
          <div className="w-[calc(100%-80px)] xl:w-[calc(100%-90px)]">
            <h3 className="text-lg  font-bold inline-flex items-center gap-2 text-white  capitalize">
              {userProfile?.data?.first_name} {userProfile?.data?.last_name}
              <span className="bg-theme/[.4] py-1 px-3 text-white text-sm rounded-3xl ml-4 flex items-center gap-1">
                <StarRounded fontSize="small" />
                4.8
              </span>
            </h3>
            <p className="my-2">{userProfile?.data?.profile_title}</p>
            <div className="flex gap-2 [&>div:not(:first-child)]:border-l-2 [&>div:not(:first-child)]:pl-2">
              <div>
                <p className="font-bold">368</p>
                <label>Total Jobs</label>
              </div>
              <div>
                <p className="font-bold">07</p>
                <label>Companies</label>
              </div>
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
        <EditProfileFormWrapper
          openPopup={editModal}
          handlePopup={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
