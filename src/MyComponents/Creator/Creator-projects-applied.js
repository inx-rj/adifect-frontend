import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";

import { projectsByFilter } from "../../redux/actions/project-actions";
import { PROJECTS_LIST_FILTER_RESET } from "../../constants/project-constants";

function Creator_projects_applied(props) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  const {
    loading: loadingProjectsByFilterData,
    count,
    projectsByFilterData,
  } = useSelector((state) => state.projectsByFilterReducer);

  useEffect(async () => {
    dispatch({ type: PROJECTS_LIST_FILTER_RESET });
    if (props.company == null) {
      await dispatch(
        projectsByFilter({
          status: 0,
          page: currentPage,
          ordering: props.ordering,
        })
      );
    } else {
      await dispatch(
        projectsByFilter({
          status: 0,
          page: currentPage,
          company: props.company,
          ordering: props.ordering,
        })
      );
    }
  }, [currentPage, props.company, props.ordering]);

  //   ++++++++++++++++ PAGINATION ++++++++++++++++

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  useEffect(() => {
    if (projectsByFilterData) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [projectsByFilterData, props.company, props.ordering]);

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
      {loadingProjectsByFilterData || isLoading ? (
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
            {projectsByFilterData?.length > 0 ? (
              <>
                {projectsByFilterData?.map((item) => (
                  <div className="Topallpageprojects">
                    <Link to={`/jobs/details/${item.id}`}>
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
                                    {item.title?.length > 30
                                      ? `${item.title.slice(0, 30)}...`
                                      : item.title}
                                  </h3>
                                  {item?.job_applied_modified == true && (
                                    <Link
                                      to="#"
                                      className="progresstext Review EditedReview"
                                    >
                                      Edited
                                    </Link>
                                  )}
                                  {item?.flag && (
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
                                  {item.description.length > 300
                                    ? `${item.description.slice(0, 300)}...`
                                    : item.description}{" "}
                                </p>{" "}
                                <Link to="#" className="progresstext Review">
                                  Applied
                                </Link>
                                <div className="duadate">
                                  <li>
                                    <h4>Due on:</h4>
                                  </li>
                                  <li>
                                    <h4>{item.job_due_date}</h4>
                                  </li>
                                </div>
                                <div className="Skill mt-2">
                                  {item.skills?.slice(0, 5)?.map((skill) => (
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
              <div className="NoJobsProjectsPage">No jobs found</div>
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
                      to={`/projects?page=${x + 1}`}
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

export default Creator_projects_applied;
