import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { projectsAllFilter } from "../../redux/actions/job-actions";
import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";

function Creator_projects_all_jobs() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  const {
    loading: loadingProjectsAllFilterData,
    success,
    projectsAllFilterData,
  } = useSelector((state) => state.projectsAllFilterReducer);

  useEffect(() => {
    dispatch(projectsAllFilter());
  }, []);

  return (
    <>
      {loadingProjectsAllFilterData || isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Sort_content">
            <h1 className="Analyticstitle_contnet_all allJobsP">All Jobs</h1>
            <h6>
              <img src="/img/Sort.png" alt="" /> Sort by new
            </h6>{" "}
          </div>
          <div className="Reviewinproject">
            <div className="Performanceadsapplied ">
              {projectsAllFilterData?.length > 0 ? (
                <>
                  {projectsAllFilterData?.map((item) => (
                    <div className="Topallpageprojects">
                      <div className="InProgress-4">
                        <div className="Work-D_contnet">
                          <div className="Work-In_contnet">
                            <div className="InProgress"></div>
                            <div className="Marketingcampaign">
                              <div className="Marketingcampaign1 Marketingcampaign3_contnet"></div>
                              <div className="Marketingcampaign2">
                                <div className="businesstext">
                                  <Link to={`/jobs/details/${item.job.id}`}>
                                    <h2>{item.job.title}</h2>
                                  </Link>
                                </div>
                                <p>
                                  {item.job.description?.length > 300
                                    ? `${item.job.description.slice(0, 250)}...`
                                    : item.job.description}{" "}
                                </p>{" "}
                                <Link to="#" className="progresstext Review">
                                  {item.status == "0"
                                    ? "In Review"
                                    : item.job.status == "2"
                                    ? "In Progress"
                                    : "No job type"}
                                  {/* // In Progress */}
                                </Link>
                                <div className="duadate">
                                  <li>
                                    <h4>Due on:</h4>
                                  </li>
                                  <li>
                                    <h4>{item.job.job_due_date}</h4>
                                  </li>
                                </div>
                                <div className="Skill mt-2">
                                  {item.job.skills?.map((skill) => (
                                    <li>
                                      <Link to="#">{skill.skill_name}</Link>
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
                          </div>

                          {/* <div className="Work-In ReviewIn">
                    <div className="InProgress"></div>
                    <div className="Marketingcampaign ReviewIn-B">
                      <div className="Marketingcampaign1 Marketingcampaign3_contnet"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                          <Link to={`/jobs/details/215`}>
                            {" "}
                            <h2>Marketing campaign job for adifect</h2>
                          </Link>
                          <span className="NewText">
                            <img className="mailicon" src="/img/mail.png" />
                          </span>
                        </div>
                        <p>
                          {}
                          In vehicula orci maecenas egestas sodales at. Senectus
                          nec dolor id pulvinar. Vitae fringilla phasellus amet
                          semper sagittis, neque. Sed a sed diam senectus diam.
                          Arcu tellus ullamcorper volutpat id{" "}
                        </p>{" "}
                        <Link to="#" className="progresstext Review">
                          In Review
                        </Link>
                        <div className="duadate">
                          <li>
                            <h4>Due on:</h4>
                          </li>
                          <li>
                            <h4>04-02-2022</h4>
                          </li>
                        </div>
                        <div className="Skill mt-2">
                          <li>
                            <Link to="#">Marketing</Link>
                          </li>
                          <li>
                            <Link to="#">Digital Marketing</Link>
                          </li>
                          <li>
                            <Link to="#">Ad Campaign</Link>
                          </li>
                        </div>
                      </div>
                    </div>
                  </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="Topallpage">No jobs found</div>
              )}
            </div>
          </div>
          {/* <div className="Performanceads "></div>
          <div className="Topallpage">
            <div className="InProgress-4">
              <div className="Work-D_contnet">
                <div className="Work-In_contnet">
                  <div className="InProgress"></div>
                  <div className="Marketingcampaign">
                    <div className="Marketingcampaign1_contnet"></div>
                    <div className="Marketingcampaign2">
                      <Link to={`/jobs/details/215`}>
                        <h2>Ads job for adifect</h2>
                      </Link>
                      <p>
                        In vehicula orci maecenas egestas sodales at. Senectus
                        nec dolor id pulvinar. Vitae fringilla phasellus amet
                        semper sagittis, neque. Sed a sed diam senectus diam.
                        Arcu tellus ullamcorper volutpat id{" "}
                      </p>{" "}
                      <Link to="#" className="progresstext_contnet">
                        In Progress
                      </Link>
                      <div className="duadate">
                        <li>
                          <h4>Due on:</h4>
                        </li>
                        <li>
                          <h4>06-02-2022</h4>
                        </li>
                      </div>
                      <div className="Skill mt-2">
                        <li>
                          <Link to="#">Marketing</Link>
                        </li>
                        <li>
                          <Link to="#">Digital Marketing</Link>
                        </li>
                        <li>
                          <Link to="#">Ad Campaign</Link>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Work-In ReviewIn">
                  <div className="InProgress"></div>
                  <div className="Marketingcampaign ReviewIn-B">
                    <div className="Marketingcampaign1 Marketingcampaign3_contnet"></div>
                    <div className="Marketingcampaign2">
                      <div className="businesstext">
                        <Link to={`/jobs/details/215`}>
                          <h2>Ads job for adifect</h2>
                        </Link>

                        <span className="NewText">
                          {/* <img className="mailicon" src="img/mail.png" /> 
                        </span>
                      </div>
                      <p>
                        In vehicula orci maecenas egestas sodales at. Senectus
                        nec dolor id pulvinar. Vitae fringilla phasellus amet
                        semper sagittis, neque. Sed a sed diam senectus diam.
                        Arcu tellus ullamcorper volutpat id{" "}
                      </p>{" "}
                      <Link to="#" className="progresstext Review">
                        In Review
                      </Link>
                      <div className="duadate">
                        <li>
                          <h4>Due on:</h4>
                        </li>
                        <li>
                          <h4>04-02-2022</h4>
                        </li>
                      </div>
                      <div className="Skill mt-2">
                        <li>
                          <Link to="#">Marketing</Link>
                        </li>
                        <li>
                          <Link to="#">Digital Marketing</Link>
                        </li>
                        <li>
                          <Link to="#">Ad Campaign</Link>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </>
      )}
    </>
  );
}

export default Creator_projects_all_jobs;
