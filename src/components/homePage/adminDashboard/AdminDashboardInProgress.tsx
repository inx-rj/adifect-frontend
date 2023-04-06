import { Menu, MenuItem } from "@mui/material";
import Title from "../../../components/common/PageTitle/Title";
import React, { useState } from "react";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { Link } from "react-router-dom";
import { GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST } from "../../../redux/actions/homePage/adminHomePage.actions";
import { CLEAR_JOBS, JOBS_DATA } from "../../../redux/reducers/homePage/jobsList.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Images } from "../../../helper/images";
import BadgeUI from "../../../components/common/badge/BadgeUI";

const AdminDashboardInProgress = () => {
  const dispatch = useAppDispatch();
  const SuperAdminJobList = useAppSelector(JOBS_DATA);
  const [orderingInProgress, setOrderingInProgress] = useState("-created");
  const [orderingName, setOrderingName] = useState("Sort by newest");
  const [anchorElInProgress, setAnchorElInProgress] = React.useState(null);
  // const [headerCompany, setHeaderCompany] = useOutletContext<any>();
  const openMenuInProgress = Boolean(anchorElInProgress);

  console.log("SuperAdminJobList", SuperAdminJobList);
  const menuOptions = [
    { id: 1, name: "Sort by newest", value: "-created" },
    { id: 2, name: "Sort by oldest", value: "created" },
    { id: 3, name: "Sort by due date", value: "job_due_date" },
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

  useSingleEffect(() => {
    const data = {
      // id: headerCompany ?? "",
      status: "2",
      page: 1,
      ordering: orderingInProgress,
    };
    dispatch(GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST(data));
  });
  useUpdateEffect(() => {
    dispatch(CLEAR_JOBS);
    const data = {
      // id: headerCompany ?? "",
      status: "2",
      page: 1,
      ordering: orderingInProgress,
    };
    dispatch(GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST(data));
  }, [orderingInProgress]);

  const menuProps: any = {
    variant: "menu",
    disableScrollLock: true,
  };

  useUpdateEffect(() => {
    const handler = () => {
      setAnchorElInProgress("");
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const setLocalVarRedirect = () => {
    localStorage.setItem("projectsTab", "In Progress");
  };
  return (
    <div>
      {" "}
      <div className="Work-In">
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
        {SuperAdminJobList?.JobsListsList?.data?.results
          ?.slice(0, 5)
          ?.map((item) => (
            <>
              <Link to={`/jobs/details/${item.id}`}>
                <div className="mb-5">
                  <div className="border-l-8 rounded border-[#2472FC] bg-white p-6 h-full max-h-[580px] shadow-[0_4px_40px_#2472fc0f]">
                    <div className="pb-3">
                      <Title
                        title={
                          item?.title?.length > 30
                            ? `${item.title.slice(0, 30)}...`
                            : item.title
                        }
                      />
                    </div>
                    <h5 className="h-full max-h-[80px] overflow-y-auto">
                      {item?.description?.length > 300
                        ? `${item?.description.slice(0, 300)}...`
                        : item.description}{" "}
                    </h5>
                    <div className="mt-4 mb-2">
                      <BadgeUI
                        variant="progress"
                        customClass="max-w-max text-sm font-semibold"
                      >
                        In Progress
                      </BadgeUI>
                    </div>
                    <div className="mb-2 text-base font-semibold">
                      Due to: {item?.job_due_date}
                    </div>
                    <div className="mb-2 flex gap-2 text-base font-semibold">
                      Assigned to:{" "}
                      <h5 className="capitalize text-theme font-semibold">
                        John snow
                      </h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.skills?.slice(0, 5)?.map((data, index) => {
                        return (
                          <span className="">
                            <BadgeUI
                              variant="primary"
                              customClass="max-w-max text-sm font-semibold"
                            >
                              {data?.skill_name}
                            </BadgeUI>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ))}
        {SuperAdminJobList?.JobsListsList?.data?.results?.length > 5 && (
          <Link to={`/projects`} onClick={setLocalVarRedirect}>
            <span className="spanDashboardViewMore">View More...</span>
          </Link>
        )}
        {SuperAdminJobList?.JobsListsList?.data?.results?.length < 1 && (
          <div className="jobnotfound">
            <div className="notfountboder_in_progress"></div>
            <div className="notfounttext">No jobs in progress</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardInProgress;
