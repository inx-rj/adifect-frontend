import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Menu } from "@mui/material";

import Creator_projects_in_review from "./Creator-projects-in-review";
import Creator_projects_done from "./Creator-projects-done";
import Creator_projects_in_progress from "./Creator-projects-in-progress";
import Creator_projects_applied from "./Creator-projects-applied";

import { creatorCompaniesFilter } from "../../redux/actions/company-actions";

export default function CreatorProjects() {
  const dispatch = useDispatch();

  const [myVar, setMyVar] = useState("Applied");

  const [company, setCompany] = useState(null);
  const [ordering, setOrdering] = useState("-created");
  const [orderingName, setOrderingName] = useState("Sort by newest");

  const [isOpen, setIsOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const { loading: loadingCreatorCompanyFilter, creatorCompaniesFilterData } =
    useSelector((state) => state.creatorCompanyFilterReducer);

  useEffect(() => {
    dispatch(creatorCompaniesFilter());
  }, []);

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
      setIsOpen(false);
      setAnchorEl(null);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

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
          <h1 className="Company_name_projects_page27">Company</h1>{" "}
          <div className="selectCompanyFLProjec">
            <div className="companyprojectsfilter companyprojectsfilter1">
              <Select
              className={
                company === null
                ? "selectinputcolor"
                : "menuiteminputcolor"
                }         
                open={isOpen}
                onOpen={() => {
                  setIsOpen(true);
                }}
                onClose={() => {
                  setIsOpen(false);
                }}
                MenuProps={menuProps}
                value={company}
                onChange={handleCompanyChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={null}>Select Company</MenuItem>
                {creatorCompaniesFilterData?.map((item) => (
                  <MenuItem key={item.company} value={item.company}>
                    {item?.company__name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="CreatorProjectdiv">
            <div className="creatorProjectbtn">
              <button
                onClick={() => {
                  setMyVar("Applied");
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
                  setMyVar("Done");
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

            <h6
              className="creatorprtite"
              style={{ cursor: "pointer" }}
              onClick={handleClickSort}
            >
              <img src="/img/Sort.png" alt="" /> {orderingName}
            </h6>
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
          {/* <Select
          className={
ordering === "null"
? "selectinputcolor"
: "menuiteminputcolor"
}
          open={isOpen}
            onOpen={() => {
              setIsOpen1(true);
            }}
            onClose={() => {
              setIsOpen1(false);
            }}
            MenuProps={menuProps}
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"-job__created"}>Sort by newest</MenuItem>
            <MenuItem value={"job__created"}>Sort by oldest</MenuItem>
            <MenuItem value={"job__job_due_date"}>Sort by due date</MenuItem>
          </Select> */}
        </div>
        {myVar == "Applied" ? (
          <Creator_projects_applied company={company} ordering={ordering} />
        ) : myVar == "In Progress" ? (
          <Creator_projects_in_progress company={company} ordering={ordering} />
        ) : myVar == "In Review" ? (
          <Creator_projects_in_review company={company} ordering={ordering} />
        ) : myVar == "Done" ? (
          <Creator_projects_done company={company} ordering={ordering} />
        ) : (
          <div>Page not found</div>
        )}
      </div>
    </>
  );
}
