import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Menu } from "@mui/material";
import { useOutletContext, useNavigate } from "react-router-dom";
import Member_Inhouse_Project_Rejected from "./Member-Inhouse-Project-Rejected";
import Member_Inhouse_Project_Done from "./Member-Inhouse-Project-Done";
import Member_inhouse_Project_In_Progress from "./Member-inhouse-Project-In-Progress";
import Member_inhouse_project_applied from "./Member-inhouse-project-applied";
import Member_Inhouse_Project_In_Review from "./Member-Inhouse-Project-In-Review";

export default function Member_Inhouse_Project() {
  let navigate = useNavigate();

  const [headerCompany, setHeaderCompany] = useOutletContext();

  const [myVar, setMyVar] = useState("Applied");
  const [searchfeedback, setSearchfeedback] = useState("");

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
              {/* <button
                onClick={() => {
                  setMyVar("Applied");
                  navigate("/projects");
                }}
                className={
                  myVar == "Applied"
                    ? "all_jobs_poject_button active1"
                    : "all_jobs_poject_button"
                }
              >
                Applied
              </button> */}
              <button
                onClick={() => {
                  setMyVar("In Progress");
                  navigate("/projects");
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
                  navigate("/projects");
                }}
                className={
                  myVar == "In Review"
                    ? "all_jobs_poject_button active1"
                    : "all_jobs_poject_button"
                }
              >
                In Review
              </button>
              {/* <button
                onClick={() => {
                  setMyVar("Rejected");
                  navigate("/projects");
                }}
                className={
                  myVar == "Rejected"
                    ? "all_jobs_poject_button active1"
                    : "all_jobs_poject_button"
                }
              >
                Rejected
              </button> */}
              <button
                onClick={() => {
                  setMyVar("Done");
                  navigate("/projects");
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
          <Menu
            id="long-menu"
            MenuProps={menuProps}
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
          </Menu>
          <h6
            className="creatorprtite1"
            style={{ cursor: "pointer" }}
            onClick={handleClickSort}
          >
            <img src="/img/Sort.png" alt="" /> {orderingName}
          </h6>
        </div>
        {myVar == "Applied" ? (
          <Member_inhouse_project_applied
            company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : myVar == "In Progress" ? (
          <Member_inhouse_Project_In_Progress
            company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : myVar == "In Review" ? (
          <Member_Inhouse_Project_In_Review
            company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : myVar == "Rejected" ? (
          <Member_Inhouse_Project_Rejected
            company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : myVar == "Done" ? (
          <Member_Inhouse_Project_Done
            company={headerCompany}
            ordering={ordering}
            searchfeedback={searchfeedback}
          />
        ) : (
          <div>Page not found</div>
        )}
      </div>
    </>
  );
}

