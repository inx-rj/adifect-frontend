import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import { AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_RESET } from "../../constants/project-constants";
import { agencyProjectsByFilterDuplicate } from "../../redux/actions/project-actions";
import LoadingSpinner from "../../containers/LoadingSpinner";

function Agency_dashboard_in_review() {
  const dispatch = useDispatch();

  const [headerCompany, setHeaderCompany] = useOutletContext();

  const [orderingInReview, setOrderingInReview] = useState("-job__created");
  const [orderingName, setOrderingName] = useState("Sort by newest");
  const [anchorElInReview, setAnchorElInReview] = React.useState(null);
  const openMenuInReview = Boolean(anchorElInReview);

  const {
    loading: loadingAgencyProjectsByFilterDataDuplicate,
    agencyProjectsByFilterDuplicateData,
  } = useSelector((state) => state.agencyProjectsByFilterDuplicateReducer);

  useEffect(async () => {
    dispatch({ type: AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_RESET });
    if (headerCompany) {
      await dispatch(
        agencyProjectsByFilterDuplicate({
          status: 3,
          company: headerCompany,
          page: 1,
          ordering: orderingInReview,
        })
      );
    } else {
      await dispatch(
        agencyProjectsByFilterDuplicate({
          status: 3,
          page: 1,
          ordering: orderingInReview,
        })
      );
    }
  }, [orderingInReview, headerCompany]);

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
      {loadingAgencyProjectsByFilterDataDuplicate ? (
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
            {agencyProjectsByFilterDuplicateData
              ?.slice(0, 5)
              ?.map((item, index) => (
                <>
                  <Link to={`/jobs/details/${item?.job?.id}`} key={index}>
                    <div className="Marketingcampaign ReviewIn-B">
                      <div className="Marketingcampaign3_contnet"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                          <Link to={`/jobs/details/${item?.job?.id}`}>
                            <h2>
                              {item?.job?.title?.length > 30
                                ? `${item?.job?.title.slice(0, 30)}...`
                                : item?.job?.title}
                            </h2>
                          </Link>
                          {/* <span className="NewText">
                    <img className="mailicon" src="img/mail.png" />
                    +1 New
                  </span> */}
                        </div>
                        <p>
                          {item?.job?.description?.length > 300
                            ? `${item?.job?.description.slice(0, 300)}...`
                            : item?.job?.description}{" "}
                        </p>{" "}
                        <Link to="#" className="progresstext Review">
                          In Review
                        </Link>
                        <div className="duadate">
                          <li>
                            <h4>Due on:</h4>
                          </li>
                          <li>
                            <h4>{item?.job?.job_due_date}</h4>
                          </li>
                        </div>
                        <div className="Skill mt-2">
                          {item?.job?.skills
                            ?.slice(0, 5)
                            ?.map((skill, index) => (
                              <li key={index}>
                                <Link to="#">{skill?.skill_name}</Link>
                              </li>
                            ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
            {agencyProjectsByFilterDuplicateData?.length > 5 && (
              <Link to={`/projects`} onClick={setLocalVarRedirect}>
                <span className="spanDashboardViewMore">View More...</span>
              </Link>
            )}
            {agencyProjectsByFilterDuplicateData?.length < 1 && (
              <div className="jobnotfound">
                <div className="notfountboder"></div>
                <div className="notfounttext">No jobs in review</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Agency_dashboard_in_review;
