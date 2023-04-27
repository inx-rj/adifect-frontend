import { Menu, MenuItem } from "@mui/material";
import Title from "../../common/pageTitle/Title";
import BadgeUI from "../../../components/common/badge/BadgeUI";
import { Images } from "../../../helper/images";
import React, { useState } from "react";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { Link } from "react-router-dom";
import {
  CLEAR_IN_REVIEW_JOBS,
  IN_REVIEW_JOBS_DATA,
} from "../../../redux/reducers/homePage/inReviewJobsList.slice";
import { useAppDispatch, useAppSelector } from "./../../../redux/store";
import { GET_ADMIN_DASHBOARD_IN_REVIEW_JOBLIST } from "redux/actions/jobs/jobs.actions";

const AdminDashboardInReview = () => {
  const dispatch = useAppDispatch();

  const [orderingInReview, setOrderingInReview] = useState("-created");
  const [orderingName, setOrderingName] = useState("Sort by newest");
  const [anchorElInReview, setAnchorElInReview] = React.useState(null);
  const openMenuInReview = Boolean(anchorElInReview);

  const SuperAdminInReview = useAppSelector(IN_REVIEW_JOBS_DATA);

  useSingleEffect(() => {
    const data: any = {
      page: 1,
      // id: headerCompany ?? "",
      status: 3,
      ordering: orderingInReview,
    };
    dispatch(GET_ADMIN_DASHBOARD_IN_REVIEW_JOBLIST(data));
  });

  useUpdateEffect(() => {
    dispatch(CLEAR_IN_REVIEW_JOBS);
    const data: any = {
      page: 1,
      // id: headerCompany ?? "",
      status: 3,
      ordering: orderingInReview,
    };
    dispatch(GET_ADMIN_DASHBOARD_IN_REVIEW_JOBLIST(data));
  }, [orderingInReview]);

  const menuOptions = [
    { id: 1, name: "Sort by newest", value: "-created" },
    { id: 2, name: "Sort by oldest", value: "created" },
    { id: 3, name: "Sort by due date", value: "job_due_date" },
  ];

  const handleCloseInReviewSort = () => {
    setAnchorElInReview(null);
  };

  const handleClickInReviewSort = (event) => {
    setAnchorElInReview(event.currentTarget);
  };

  const menuHandleSort = (event, value, name) => {
    handleCloseInReviewSort();
    setOrderingInReview(value);
    setOrderingName(name);
  };

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  useUpdateEffect(() => {
    const handler = () => {
      setAnchorElInReview("");
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const setLocalVarRedirect = () => {
    localStorage.setItem("projectsTab", "In Review");
  };

  return (
    <div>
      <div className="">
        <div className="pb-4 flex justify-between items-center">
          <Title title="In Review" />
          <div className="Sort">
            <h6
              className="flex gap-2 items-center"
              style={{ cursor: "pointer" }}
              onClick={handleClickInReviewSort}
            >
              <img src={Images.Sort} alt="" />
              <h5 className="text-sm font-semibold inline-block align-middle text-[#A0A0A0]">
                {orderingName}
              </h5>
            </h6>{" "}
            <Menu
              id="long-menu"
              // MenuListProps={menuProps}
              anchorEl={anchorElInReview}
              keepMounted
              open={openMenuInReview}
              onClose={handleCloseInReviewSort}
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
        {SuperAdminInReview?.inReviewJobsList?.data?.results
          ?.slice(0, 5)
          ?.map((item) => (
            <>
              <Link to={`/jobs/details/${item.id}`}>
                <div className="mb-5">
                  <div className="border-l-8 rounded border-[#D99836] bg-white p-6 h-full max-h-[580px] shadow-[0_4px_40px_#2472fc0f]">
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
                        In Review
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
        {SuperAdminInReview?.inReviewJobsList?.data?.results?.length > 5 && (
          <Link to={`/projects`} onClick={setLocalVarRedirect}>
            <span className="hover:text-theme text-base font-medium">View More...</span>
          </Link>
        )}
        {SuperAdminInReview?.inReviewJobsList?.data?.results?.length < 1 && (
          <div className="mb-5">
            <div className="border-l-8 rounded border-[#D99836] bg-white p-6 h-full max-h-[580px] shadow-[0_4px_40px_#2472fc0f]">
              <div className="text-lg font-semibold text-center">
                No jobs in review
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardInReview;
