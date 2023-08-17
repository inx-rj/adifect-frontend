import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import { agencyProjectsByFilter } from "../../redux/actions/project-actions";
import { AGENCY_PROJECTS_LIST_FILTER_RESET } from "../../constants/project-constants";
import { MemberProjectsByFilterAction } from "../../redux/actions/Member-Project-Actions";
import { MEMBER_PROJECT_APPLIED_RESET } from "../../constants/Member-Project-Constants";

function Member_Project_Rejected(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  const {
    loading: loadingAgencyProjectsByFilterData,
    count,
    MemberProjectsByFilterData,
  } = useSelector((state) => state.MemberProjectsByFilterReducer);

  // console.log("MemberProjectsByFilterData",MemberProjectsByFilterData);

  // useEffect(() => {
  //   dispatch({ type: AGENCY_PROJECTS_LIST_FILTER_RESET });
  //   if (props.company == null) {
  //     dispatch(
  //       agencyProjectsByFilter({
  //         status: 0,
  //         page: currentPage,
  //         ordering: props.ordering,
  //         is_active: true,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       agencyProjectsByFilter({
  //         status: 0,
  //         page: currentPage,
  //         company: props.company,
  //         ordering: props.ordering,
  //         is_active: true,
  //       })
  //     );
  //   }
  // }, [currentPage, props.company, props.ordering]);

  useEffect(() => {
    dispatch({ type: MEMBER_PROJECT_APPLIED_RESET });
    if (props.company) {
      dispatch(
        MemberProjectsByFilterAction({
          status: 1,
          page: currentPage,
          company: props.company,
          ordering: props.ordering,
          search: props.searchfeedback,
        })
      );
    }
  }, [currentPage, props.company, props.ordering, props.searchfeedback]);

  useEffect(() => {
    setCurrentPage(1);
    navigate("/projects");
  }, [props.company]);

  //   ++++++++++++++++ PAGINATION ++++++++++++++++

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  useEffect(() => {
    if (MemberProjectsByFilterData) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [MemberProjectsByFilterData, props.company, props.ordering]);

  const goToPrevPage = (prevpage) => {
    setCurrentPage(prevpage);

    // const urlParams = new URLSearchParams(window.location.search);
    // urlParams.set("page", prevpage);
    // navigate(`/jobs/list?${urlParams}`);
  };

  const goToNextPage = (nextpage) => {
    setCurrentPage(nextpage);

    // const urlParams = new URLSearchParams(window.location.search);
    // urlParams.set("page", nextpage);
    // navigate(`/jobs/list?${urlParams}`);
  };

  //   ++++++++++++++++ PAGINATION ++++++++++++++++

  return (
    <>
      {loadingAgencyProjectsByFilterData || isLoading ? (
        <div className="projectsLoaderCreatorPage">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="Sort_content">
            <h1 className="Analyticstitle_contnet_allNew allJobsP">
              Applied Jobs
            </h1>
            {/* <h6>
              <img src="/img/Sort.png" alt="" /> Sort by newest
            </h6>{" "} */}
          </div>
          <div className="Performanceadsapplied ">
            {MemberProjectsByFilterData?.length > 0 ? (
              <>
                {MemberProjectsByFilterData?.map((item, index) => (
                  <div key={index} className="Topallpageprojects">
                    <Link to={`/jobs/details/${item?.job?.id}`}>
                      <div className="InProgress-4">
                        <div className="Work-D_contnet">
                          <div className="Work-In_contnet">
                            <div className="InProgress"></div>
                            <div className="Marketingcampaign">
                              {/* <div className="Marketingcampaign1_contnet"></div> */}
                              <div className="Marketingcampaign1"></div>
                              <div className="Marketingcampaign2">
                                <div className="businesstext">
                                  <h3>
                                    {item?.job?.title?.length > 30
                                      ? `${item?.job?.title.slice(0, 30)}...`
                                      : item?.job?.title}
                                  </h3>
                                  {item?.job?.flag && (
                                    <Link
                                      style={{ marginLeft: "5px" }}
                                      to="#"
                                      className="progresstext Review lateFlagProjects"
                                    >
                                      Late
                                    </Link>
                                  )}
                                </div>
                                <p>
                                  {item?.job?.description?.length > 300
                                    ? `${item?.job?.description.slice(
                                      0,
                                      300
                                    )}...`
                                    : item?.job?.description}{" "}
                                </p>{" "}
                                {/* <Link to="#" className="progresstext Review">
                                  Applied
                                </Link> */}
                                <Link
                                  style={{ marginLeft: "5px" }}
                                  to="#"
                                  className="progresstext Review"
                                >
                                  Applied Users : {item?.applied_count}
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
                                    ?.map((skill) => (
                                      <li>
                                        <Link to="#">{skill.skill_name}</Link>
                                      </li>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <div className="Topallpage">No jobs found</div>
            )}
          </div>
          {pages > 1 && (
            <div className="adminjobpagination">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage == 1}
                  onClick={() => goToPrevPage(currentPage - 1)}
                />
                {[...Array(pages).keys()].map((x) => (
                  <>
                    <LinkContainer
                      key={x + 1}
                      to={{
                        pathName: `/projects?page=${x + 1}`,
                      }}
                      onClick={() => pageHandler(x + 1)}
                    >
                      <Pagination.Item active={x + 1 === currentPage}>
                        {x + 1}
                      </Pagination.Item>
                    </LinkContainer>
                  </>
                ))}
                <Pagination.Next
                  disabled={currentPage == pages}
                  onClick={() => goToNextPage(currentPage + 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Member_Project_Rejected;
