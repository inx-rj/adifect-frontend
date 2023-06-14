import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";

import { PROJECTS_LIST_FILTER_DUPLICATE_RESET } from "../../constants/project-constants";
import { projectsByFilterDuplicate } from "../../redux/actions/project-actions";
import LoadingSpinner from "../../containers/LoadingSpinner";

function Member_dashboard_in_review() {
  const dispatch = useDispatch();

  const [orderingInReview, setOrderingInReview] = useState("-job__created");
  const [orderingName, setOrderingName] = useState("Sort by newest");
  const [anchorElInReview, setAnchorElInReview] = React.useState(null);
  const openMenuInReview = Boolean(anchorElInReview);

  const {
    loading: loadingProjectsByFilterDataDuplicate,
    projectsByFilterDuplicateData,
  } = useSelector((state) => state.projectsByFilterDuplicateReducer);

  useEffect(() => {
    dispatch({ type: PROJECTS_LIST_FILTER_DUPLICATE_RESET });
    dispatch(
      projectsByFilterDuplicate({
        status: 3,
        page: 1,
        ordering: orderingInReview,
      })
    );
  }, [orderingInReview]);

  const menuOptions = [
    { id: 1, name: "Sort by newest", value: "-job__created" },
    { id: 2, name: "Sort by oldest", value: "job__created" },
    { id: 3, name: "Sort by due date", value: "job__job_due_date" },
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

  useEffect(() => {
    const handler = () => {
      setAnchorElInReview();
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
    <>
      {loadingProjectsByFilterDataDuplicate ? (
        <div className="projectsLoaderCreatorPage">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="Work-In">
          <div className="Work-In ReviewIn">
            <div className="InProgress">
              <div className="Work-P-Title">
                <Link to={`/projects`} onClick={setLocalVarRedirect}>
                  <h1>In Review</h1>{" "}
                </Link>
              </div>
              <div className="Sort">
                <h6
                  style={{ cursor: "pointer" }}
                  onClick={handleClickInReviewSort}
                >
                  <img src="img/Sort.png" alt="" /> {orderingName}
                </h6>{" "}
                <Menu
                  id="long-menu"
                  MenuProps={menuProps}
                  anchorEl={anchorElInReview}
                  keepMounted
                  open={openMenuInReview}
                  onClose={handleCloseInReviewSort}
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
            {projectsByFilterDuplicateData?.slice(0, 5)?.map((item) => (
              <>
                <Link to={`/jobs/details/${item.id}`}>
                  <div className="Marketingcampaign ReviewIn-B">
                    <div className="Marketingcampaign3_contnet"></div>
                    <div className="Marketingcampaign2">
                      <div className="businesstext">
                        <Link to={`/jobs/details/${item.id}`}>
                          <h2>
                            {item.title?.length > 30
                              ? `${item.title.slice(0, 30)}...`
                              : item.title}
                          </h2>
                        </Link>
                        {/* <span className="NewText">
                    <img className="mailicon" src="img/mail.png" />
                    +1 New
                  </span> */}
                      </div>
                      <p>
                        {item?.description?.length > 300
                          ? `${item?.description.slice(0, 300)}...`
                          : item.description}{" "}
                      </p>{" "}
                      <Link to="#" className="progresstext Review">
                        In Review
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
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
            {projectsByFilterDuplicateData?.length > 5 && (
              <Link to={`/projects`} onClick={setLocalVarRedirect}>
                <span className="spanDashboardViewMore">View More...</span>
              </Link>
            )}
            {projectsByFilterDuplicateData?.length < 1 && (
              <div className="jobnotfound">
                <div className="notfountboder"></div>
                <div className="notfounttext">No jobs in reviews</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Member_dashboard_in_review;
