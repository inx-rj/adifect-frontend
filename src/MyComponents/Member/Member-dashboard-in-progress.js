import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";

import { PROJECTS_LIST_FILTER_RESET } from "../../constants/project-constants";
import { projectsByFilter } from "../../redux/actions/project-actions";
import LoadingSpinner from "../../containers/LoadingSpinner";

function Member_dashboard_in_progress() {
  const dispatch = useDispatch();

  const [orderingInProgress, setOrderingInProgress] = useState("-job__created");
  const [orderingName, setOrderingName] = useState("Sort by newest");
  const [anchorElInProgress, setAnchorElInProgress] = React.useState(null);
  const openMenuInProgress = Boolean(anchorElInProgress);

  const { loading: loadingProjectsByFilterData, projectsByFilterData } =
    useSelector((state) => state.projectsByFilterReducer);

  useEffect(async () => {
    dispatch({ type: PROJECTS_LIST_FILTER_RESET });
    await dispatch(
      projectsByFilter({
        status: 2,
        page: 1,
        ordering: orderingInProgress,
      })
    );
  }, [orderingInProgress]);

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

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  useEffect(() => {
    const handler = () => {
      setAnchorElInProgress();
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
    <>
      {loadingProjectsByFilterData ? (
        <div className="projectsLoaderCreatorPage">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="Work-In">
          <div className="InProgress">
            <div className="Work-P-Title">
              <Link to={`/projects`} onClick={setLocalVarRedirect}>
                <h1>Work in Progress</h1>
              </Link>
              {""}
            </div>
            <div className="Sort">
              <h6
                style={{ cursor: "pointer" }}
                onClick={handleClickInProgressSort}
              >
                <img src="img/Sort.png" alt="" /> {orderingName}
              </h6>{" "}
              <Menu
                id="long-menu"
                MenuProps={menuProps}
                anchorEl={anchorElInProgress}
                keepMounted
                open={openMenuInProgress}
                onClose={handleCloseInProgressSort}
              >
                {menuOptions.map((option) => (
                  <MenuItem
                    key={option.id}
                    onClick={(e) =>
                      menuHandleSort(e, option.value, option.name)
                    }
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          {projectsByFilterData?.slice(0, 5)?.map((item) => (
            <>
              <Link to={`/jobs/details/${item.id}`}>
                <div className="Marketingcampaign">
                  <div className="Marketingcampaign1_contnet"></div>
                  <div className="Marketingcampaign2">
                    <Link to={`/jobs/details/${item.id}`}>
                      <h2>
                        {item?.title?.length > 30
                          ? `${item.title.slice(0, 30)}...`
                          : item.title}
                      </h2>
                    </Link>
                    <p className="jobtextjob">
                      {item?.description?.length > 300
                        ? `${item?.description.slice(0, 300)}...`
                        : item.description}{" "}
                    </p>{" "}
                    <Link to="#" className="progresstext">
                      In Progress
                    </Link>
                    <div className="duadate">
                      <li>
                        <h4>Due on:</h4>
                      </li>
                      <li>
                        <h4>{item?.job_due_date}</h4>
                      </li>
                    </div>
                    <div className="Skill mt-2">
                      {item.skills?.slice(0, 5)?.map((skill) => (
                        <li>
                          <Link to="#">{skill?.skill_name}</Link>
                        </li>
                      ))}
                      {/* <li>
                      <Link to="#">Marketing</Link>
                    </li>
                    <li>
                      <Link to="#">Digital Marketing</Link>
                    </li>
                    <li>
                      <Link to="#">Ad Campaign</Link>
                    </li> */}
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ))}
          {projectsByFilterData?.length > 5 && (
            <Link to={`/projects`} onClick={setLocalVarRedirect}>
              <span className="spanDashboardViewMore">View More...</span>
            </Link>
          )}
          {projectsByFilterData?.length < 1 && (
            <div className="jobnotfound">
              <div className="notfountboder_in_progress"></div>
              <div className="notfounttext">No jobs in progress</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Member_dashboard_in_progress;
