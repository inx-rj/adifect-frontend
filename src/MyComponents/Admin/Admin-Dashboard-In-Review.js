import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { useOutletContext } from "react-router-dom";
import { SuperAdminJobListInReviewAction } from "../../redux/actions/job-actions";
import { ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_RESET } from "../../constants/job-constants";

function Admin_Dashboard_In_Review() {
  const dispatch = useDispatch();

  const [orderingInReview, setOrderingInReview] = useState("-created");
  const [orderingName, setOrderingName] = useState("Sort by newest");
  const [anchorElInReview, setAnchorElInReview] = React.useState(null);
  const [headerCompany, setHeaderCompany] = useOutletContext();
  const openMenuInReview = Boolean(anchorElInReview);


  const {
    loading: loadingSuperAdminInReview,
    SuperAdminInReview,
  } = useSelector((state) => state.SuperAdminInReviewListReducer);


  useEffect(() => {
    dispatch({ type: ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_RESET });

    dispatch(
      SuperAdminJobListInReviewAction({
        id: headerCompany ?? '',
        status: 3,
        ordering: orderingInReview,
      })
    );
  }, [orderingInReview, headerCompany]);

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
      {loadingSuperAdminInReview ? (
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
            {SuperAdminInReview?.slice(0, 5)?.map((item) => (
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
            {/* {SuperAdminInReview?.length > 5 && (
              <Link to={`/projects`} onClick={setLocalVarRedirect}>
                <span className="spanDashboardViewMore">View More...</span>
              </Link>
            )} */}
            {SuperAdminInReview?.length < 1 && (
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

export default Admin_Dashboard_In_Review;
