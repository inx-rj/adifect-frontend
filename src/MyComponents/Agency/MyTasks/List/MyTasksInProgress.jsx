import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import { agencyMyTasksByFilter } from "../../../../redux/actions/My-Tasks-actions";
import { AGENCY_MY_TASKS_LIST_FILTER_RESET } from "../../../../constants/MyTasks-constants";
import LoadingSpinner from "../../../../containers/LoadingSpinner";
import moment from "moment";

const MyTasksInProgress = (props) => {
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
    agencyProjectsByFilterData,
  } = useSelector((state) => state.agencyMyTasksByFilterReducer);

  useEffect(() => {
    dispatch({ type: AGENCY_MY_TASKS_LIST_FILTER_RESET });
    if (props.company == null) {
      dispatch(
        agencyMyTasksByFilter({
          status: 2,
          page: currentPage,
          ordering: props.ordering,
          search: props.searchfeedback,
        })
      );
    } else {
      dispatch(
        agencyMyTasksByFilter({
          status: 2,
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
    navigate("/my_tasks");
  }, [props.company]);

  //   ++++++++++++++++ PAGINATION ++++++++++++++++

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  useEffect(() => {
    if (agencyProjectsByFilterData) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [agencyProjectsByFilterData, props.company, props.ordering]);

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
      {isLoading ? (
        <div className="projectsLoaderCreatorPage">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div>
            <>
              <div className="Sort_content">
                <h1 className="Analyticstitle_contnet ">In Progress</h1>
              </div>
              <div className="Performanceadsapplied ">
                {agencyProjectsByFilterData?.length > 0 ? (
                  <>
                    {loadingAgencyProjectsByFilterData ? (
                      <LoadingSpinner />
                    ) : (
                      agencyProjectsByFilterData?.map((item, index) => (
                        <div key={index} className="Topallpageprojects">
                          <Link to={`/my_tasks/details/${item?.id}`}>
                            <div className="InProgress-4">
                              <div className="Work-D_contnet">
                                <div className="Work-In_contnet">
                                  <div className="InProgress"></div>
                                  <div className="MyTaskMarketingcampaign">
                                    {/* <div className="Marketingcampaign1_contnet"></div> */}
                                    <div className="Marketingcampaign1"></div>
                                    <div className="Marketingcampaign2">
                                      <div className="businesstext">
                                        <h3>
                                          {item?.name?.length > 30
                                            ? `${item?.name?.slice(0, 30)}...`
                                            : item?.name}
                                        </h3>
                                        {item?.name?.flag && (
                                          <Link
                                            style={{ marginLeft: "5px" }}
                                            to="#"
                                            className="progresstext Review lateFlagProjects"
                                          >
                                            Late
                                          </Link>
                                        )}
                                      </div>
                                      <p className="float-none">
                                        {item?.description?.length > 80
                                          ? `${item?.description.slice(
                                              0,
                                              80
                                            )}...`
                                          : item?.description}{" "}
                                      </p>{" "}
                                      <div className="flex gap-2 duadate">
                                        <h4>Assigned to:</h4>
                                        {item?.form_task_users?.length > 0 &&
                                          item?.form_task_users?.map(
                                            (item, index) => (
                                              <h4>
                                                {(index ? ", " : "") +
                                                  (item?.assign_to?.username ??
                                                    "N/A")}{" "}
                                              </h4>
                                            )
                                          )}
                                      </div>
                                      <div className="flex gap-2 duadate">
                                        <h4>Assigned on:</h4>
                                        <h4>
                                          {moment(item?.created).format(
                                            "MMMM Do YYYY HH:mm:ss"
                                          )}
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    )}
                  </>
                ) : (
                  <div className="Topallpage">No tasks found</div>
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
          </div>
        </>
      )}
    </>
  );
};

export default MyTasksInProgress;
