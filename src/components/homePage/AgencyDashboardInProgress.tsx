import { Menu, MenuItem } from "@mui/material";
import Title from "../../components/common/PageTitle/Title";
import BadgeUI from "../../components/common/badge/BadgeUI";
import React, { useState } from "react";
import { Images } from "../../helper/images";

function AgencyDashboardInProgress() {
  const dummyData = [
    {
      name: "Marketing",
      id: 1,
    },
    {
      name: "Marketing",
      id: 2,
    },
    {
      name: "Marketing",
      id: 3,
    },
    {
      name: "Marketingggggggggggggggggggggggggg",
      id: 4,
    },
    {
      name: "Marketing",
      id: 5,
    },
    {
      name: "Marketing",
      id: 6,
    },
  ];
  const [orderingInProgress, setOrderingInProgress] = useState("-job__created");
  const [orderingName, setOrderingName] = useState("Sort by newest");
  const [anchorElInProgress, setAnchorElInProgress] = React.useState(null);
  const openMenuInProgress = Boolean(anchorElInProgress);

  const menuOptions = [
    { id: 1, name: "Sort by newest", value: "-job__created" },
    { id: 2, name: "Sort by oldest", value: "job__created" },
    { id: 3, name: "Sort by due date", value: "job__job_due_date" },
  ];
  const handleCloseInProgressSort = () => {
    setAnchorElInProgress(null);
  };

  const handleClickInProgressSort = (event) => {
    setAnchorElInProgress(event.currentTarget);
  };

  const menuHandleSort = (event, value, name) => {
    handleCloseInProgressSort();
    setOrderingInProgress(value);
    setOrderingName(name);
  };

  const menuProps: any = {
    variant: "menu",
    disableScrollLock: true,
  };
  return (
    <>
      <div className="">
        <div className="pb-4 flex justify-between items-center">
          <Title title="Work in Progress" />
          <div className="Sort">
            <h6
              className="flex gap-2 items-center"
              style={{ cursor: "pointer" }}
              onClick={handleClickInProgressSort}
            >
              <img src={Images.Sort} alt="" />
              <h5 className="text-sm font-semibold inline-block align-middle text-[#A0A0A0]">
                {orderingName}
              </h5>
            </h6>{" "}
            <Menu
              id="long-menu"
              MenuListProps={menuProps}
              anchorEl={anchorElInProgress}
              keepMounted
              open={openMenuInProgress}
              onClose={handleCloseInProgressSort}
            >
              {menuOptions.map((option) => (
                <MenuItem
                  key={option.id}
                  onClick={(e) => menuHandleSort(e, option.value, option.name)}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        {/* <div className="border-l-8 rounded border-[#2472FC] bg-white p-8 h-full max-h-[580px]"> */}
        <div className="border-l-8 rounded border-[#2472FC] bg-white p-6 h-full max-h-[580px] shadow-[0_4px_40px_#2472fc0f]">
          <div className="pb-3">
            <Title title="Marketing Campaign Job for stark..............." />
          </div>
          <h5 className="h-full max-h-[80px] overflow-y-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </h5>
          <div className="mt-4 mb-2">
            <BadgeUI
              variant="progress"
              customClass="max-w-max text-sm font-semibold"
            >
              In Progress
            </BadgeUI>
          </div>
          <div className="mb-2 text-base font-semibold">Due to: </div>
          <div className="mb-2 flex gap-2 text-base font-semibold">
            Assigned to:{" "}
            <h5 className="capitalize text-theme font-semibold">John snow</h5>
          </div>
          <div className="flex flex-wrap gap-2">
            {dummyData?.map((data, index) => {
              return (
                <span className="">
                  <BadgeUI
                    variant="primary"
                    customClass="max-w-max text-sm font-semibold"
                  >
                    {data?.name}
                  </BadgeUI>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AgencyDashboardInProgress;