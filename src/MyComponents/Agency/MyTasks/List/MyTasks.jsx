import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Menu } from "@mui/material";
import { useOutletContext, useNavigate } from "react-router-dom";

import MyTasksInReview from "./MyTasksInReview";
import MyTasksApplied from "./MyTasksApplied";
import MyTasksInProgress from "./MyTasksInProgress";
import MyTasksDone from "./MyTasksDone";
import MyTasksRejected from "./MyTasksRejected";

const MyTasks = () => {
  let navigate = useNavigate();

  const [searchfeedback, setSearchfeedback] = useState("");

  const [myVar, setMyVar] = useState("Applied");

  const [ordering, setOrdering] = useState("-created");
  const [orderingName, setOrderingName] = useState("Sort by newest");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    const switchTab = localStorage.getItem("projectsTab");
    if (switchTab) {
      localStorage.removeItem("projectsTab");
      setMyVar(switchTab);
    }
  }, []);

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  useEffect(() => {
    const handler = () => {
      setAnchorEl(null);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleClickSort = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuHandleSort = (event, value, name) => {
    handleCloseSort();
    setOrdering(value);
    setOrderingName(name);
  };

  const menuOptions = [
    { id: 1, name: "Sort by newest", value: "-created" },
    { id: 2, name: "Sort by oldest", value: "created" },
    { id: 3, name: "Sort by due date", value: "-job__job_due_date" },
  ];

  return (
    <>
      <div className="ContentDiv ContentDiv414 creatorprojects">
        <div className="Categorylistbuttons_creator">
          <div className="CreatorProjectdiv">
            <div className="creatorProjectbtn agencyFilterProjectPage">
              <button
                onClick={() => {
                  setMyVar("Applied");
                  navigate("/my_tasks");
                }}
                className={
                  myVar == "Applied"
                    ? "all_jobs_poject_button active1"
                    : "all_jobs_poject_button"
                }
              >
                Applied
              </button>
              <button
                onClick={() => {
                  setMyVar("In Progress");
                  navigate("/my_tasks");
                }}
                className={
                  myVar == "In Progress"
                    ? "all_jobs_poject_button active1"
                    : "all_jobs_poject_button"
                }
              >
                In Progress
              </button>
              <button
                onClick={() => {
                  setMyVar("In Review");
                  navigate("/my_tasks");
                }}
                className={
                  myVar == "In Review"
                    ? "all_jobs_poject_button active1"
                    : "all_jobs_poject_button"
                }
              >
                In Review
              </button>
              <button
                onClick={() => {
                  setMyVar("Rejected");
                  navigate("/my_tasks");
                }}
                className={
                  myVar == "Rejected"
                    ? "all_jobs_poject_button active1"
                    : "all_jobs_poject_button"
                }
              >
                Rejected
              </button>
              <button
                onClick={() => {
                  setMyVar("Done");
                  navigate("/my_tasks");
                }}
                className={
                  myVar == "Done"
                    ? "all_jobs_poject_button active1"
                    : "all_jobs_poject_button"
                }
              >
                Done
              </button>
            </div>
            <div className="searchActivityPublicP agencyjoblistsearchfilterjob1">
              <input
                className="newSearchActInputPpMyprojec"
                type="text"
                value={searchfeedback}
                placeholder="Search Project"
                onChange={(e) => setSearchfeedback(e.target.value)}
              />
              <img className="newSearchLogoPp" src="/img/newSearchIcon.png" />
            </div>
          </div>
          {/* 
          <Menu
            id="long-menu"
            MenuListProps={menuProps}
            anchorEl={anchorEl}
            keepMounted
            open={openMenu}
            onClose={handleCloseSort}
          >
            {menuOptions.map((option) => (
              <MenuItem
                key={option.id}
                onClick={(e) => menuHandleSort(e, option.value, option.name)}
              >
                {option.name}
              </MenuItem>
            ))}
          </Menu> */}
          {/* <h6
            className="creatorprtite1 myTask gap-2"
            style={{ cursor: "pointer" }}
            onClick={handleClickSort}
          >
            <img src="/img/Sort.png" alt="" /> {orderingName}
          </h6> */}
        </div>
        {myVar == "Applied" ? (
          <MyTasksApplied
            // company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : myVar == "In Progress" ? (
          <MyTasksInProgress
            // company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : myVar == "In Review" ? (
          <MyTasksInReview
            // company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : myVar == "Rejected" ? (
          <MyTasksRejected
            // company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : myVar == "Done" ? (
          <MyTasksDone
            // company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : (
          <div>Page not found</div>
        )}
      </div>
    </>
  );
};

export default MyTasks;
