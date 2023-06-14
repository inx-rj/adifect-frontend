import React from "react";
import { useState } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { Link } from "react-router-dom";

export default function CreatorProjects() {
  const [myVar, setMyVar] = useState("All Jobs");

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  return (
    <>
            {isLoading && <LoadingSpinner />}

      <div className="ContentDiv ContentDiv414">
        <div className="Categorylistbuttons">
          <button
            onClick={() => {
              setMyVar("All Jobs");
            }}
            className={myVar=='All Jobs'
            ? "all_jobs_poject_button active1"
            : "all_jobs_poject_button"
            }
          >
            All Jobs
          </button>
          <button
            onClick={() => {
              setMyVar("First");
            }}

             className={myVar=='First'
            ? "all_jobs_poject_button active1"
            : "all_jobs_poject_button"
            }
          >
            In Review
          </button>
          <button
            onClick={() => {
              setMyVar("Second");
            }}
            className={myVar=='Second'
            ? "all_jobs_poject_button active1"
            : "all_jobs_poject_button"
            }
          >
            In Progress
          </button>
          <button
            onClick={() => {
              setMyVar("Third");
            }}
            className={myVar=='Third'
            ? "all_jobs_poject_button active1"
            : "all_jobs_poject_button"
            }
          >
            Done
          </button>
        </div>

        {myVar == "All Jobs" ? (
          <>
            {" "}
            <>
              {" "}
              <div className="Sort_content">
                <h1 className="Analyticstitle_contnet_all allJobsP">All Jobs</h1>
                <h6>
                  <img src="img/Sort.png" alt="" /> Sort by new
                </h6>{" "}
              </div>
              <div className="Performanceads "></div>
              <div className="Topallpage">
                <div className="InProgress-4">
                  <div className="Work-D_contnet">
                    <div className="Work-In_contnet">
                      <div className="InProgress"></div>
                      <div className="Marketingcampaign">
                        <div className="Marketingcampaign1_contnet"></div>
                        <div className="Marketingcampaign2">
                        <Link to={`/jobs/details/215`}><h2>Marketing campaign job for adifect</h2></Link>
                          <p>
                            In vehicula orci maecenas egestas sodales at.
                            Senectus nec dolor id pulvinar. Vitae fringilla
                            phasellus amet semper sagittis, neque. Sed a sed
                            diam senectus diam. Arcu tellus ullamcorper volutpat
                            id{" "}
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
                          <Link to={`/jobs/details/215`}> <h2>Marketing campaign job for adifect</h2></Link>
                            <span className="NewText">
                              {/* <img className="mailicon" src="img/mail.png" /> */}
                            </span>
                          </div>
                          <p>
                            {}
                            In vehicula orci maecenas egestas sodales at.
                            Senectus nec dolor id pulvinar. Vitae fringilla
                            phasellus amet semper sagittis, neque. Sed a sed
                            diam senectus diam. Arcu tellus ullamcorper volutpat
                            id{" "}
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
              </div>
              <div className="Performanceads "></div>
              <div className="Topallpage">
                <div className="InProgress-4">
                  <div className="Work-D_contnet">
                    <div className="Work-In_contnet">
                      <div className="InProgress"></div>
                      <div className="Marketingcampaign">
                        <div className="Marketingcampaign1_contnet"></div>
                        <div className="Marketingcampaign2">
                        <Link to={`/jobs/details/215`}><h2>Ads job for adifect</h2></Link>
                          <p>
                            In vehicula orci maecenas egestas sodales at.
                            Senectus nec dolor id pulvinar. Vitae fringilla
                            phasellus amet semper sagittis, neque. Sed a sed
                            diam senectus diam. Arcu tellus ullamcorper volutpat
                            id{" "}
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
                          <Link to={`/jobs/details/215`}><h2>Ads job for adifect</h2></Link>

                            <span className="NewText">
                              {/* <img className="mailicon" src="img/mail.png" /> */}
                            </span>
                          </div>
                          <p>
                            In vehicula orci maecenas egestas sodales at.
                            Senectus nec dolor id pulvinar. Vitae fringilla
                            phasellus amet semper sagittis, neque. Sed a sed
                            diam senectus diam. Arcu tellus ullamcorper volutpat
                            id{" "}
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
              </div>
            </>
          </>
        ) : myVar == "First" ? (
          <>
            {" "}
            <div className="Sort_content">
              <h1 className="Analyticstitle_contnet ">In Review</h1>
              <h6>
                <img src="img/Sort.png" alt="" /> Sort by new
              </h6>{" "}
            </div>
            <div className="Performanceads "></div>
            <div className="Topallpage">
              <div className="InProgress-4">
                <div className="Work-D_contnet">
                  <div className="Work-In_contnet">
                    <div className="InProgress"></div>
                    <div className="Marketingcampaign">
                      <div className="Marketingcampaign1 Marketingcampaign3_contnet"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                        <Link to={`/jobs/details/215`}><h2>Run campaign for a jewelry business</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" /> +1
                            New
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
                        <Link to={`/jobs/details/215`}><h2>Run campaign for a jewelry business</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" /> +1
                            New
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
                  </div>
                </div>
              </div>
            </div>
            <div className="Performanceads "></div>
            <div className="Topallpage">
              <div className="InProgress-4">
                <div className="Work-D_contnet">
                  <div className="Work-In_contnet">
                    <div className="InProgress"></div>
                    <div className="Marketingcampaign">
                      <div className="Marketingcampaign1 Marketingcampaign3_contnet"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                        <Link to={`/jobs/details/215`}><h2>Run campaign for a jewelry business</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" /> +1
                            New
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
                        <Link to={`/jobs/details/215`}><h2>Run campaign for a jewelry business</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" /> +1
                            New
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
            </div>
          </>
        ) : myVar == "Second" ? (
          <div>
            {" "}
            <div className="Sort_content">
              <h1 className="Analyticstitle_contnet ">In Progress</h1>
              <h6>
                <img src="img/Sort.png" alt="" /> Sort by new
              </h6>{" "}
            </div>
            <div className="Performanceads "></div>
            <div className="Topallpage">
              <div className="InProgress-4">
                <div className="Work-D_contnet">
                  <div className="Work-In_contnet">
                    <div className="InProgress"></div>
                    <div className="Marketingcampaign">
                      <div className="Marketingcampaign1_contnet"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                        <Link to={`/jobs/details/215`}><h2>Run campaign for a jewelry business</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" /> +1
                            New
                          </span>
                        </div>
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
                      <div className="Marketingcampaign1_contnet"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                        <Link to={`/jobs/details/215`}><h2>Run campaign for a jewelry business</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" /> +1
                            New
                          </span>
                        </div>
                        <p>
                          {}
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
            </div>
            <div className="Performanceads "></div>
            <div className="Topallpage">
              <div className="InProgress-4">
                <div className="Work-D_contnet">
                  <div className="Work-In_contnet">
                    <div className="InProgress"></div>
                    <div className="Marketingcampaign">
                      <div className="Marketingcampaign1_contnet"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                        <Link to={`/jobs/details/215`}><h2>Digital media marketing for Flora</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" /> +1
                            New
                          </span>
                        </div>
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
                      <div className="Marketingcampaign1_contnet"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                          <div className="businesstext">
                          <Link to={`/jobs/details/215`}><h2>Digital media marketing for Flora</h2></Link>
                            <span className="NewText">
                              <img className="mailicon" src="img/mail.png" /> +1
                              New
                            </span>
                          </div>

                          <span className="NewText">
                            {/* <img className="mailicon" src="img/mail.png" /> */}
                          </span>
                        </div>
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
            </div>
          </div>
        ) : myVar == "Third" ? (
          <div>
            {" "}
            <div className="Sort_content">
              <h1 className="Analyticstitle_contnet ">Completed Jobs</h1>
              <h6>
                <img src="img/Sort.png" alt="" /> Sort by new
              </h6>{" "}
            </div>
            <div className="Performanceads "></div>
            <div className="Topallpage">
              <div className="InProgress-4">
                <div className="Work-D_contnet">
                  <div className="Work-In_contnet">
                    <div className="InProgress"></div>
                    <div className="Marketingcampaign">
                      <div className="Marketingcampaign1_contnet_done"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                        <Link to={`/jobs/details/215`}><h2>Run campaign for a jewelry business</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" />{" "}
                            +1New
                          </span>
                        </div>
                        <p>
                          In vehicula orci maecenas egestas sodales at. Senectus
                          nec dolor id pulvinar. Vitae fringilla phasellus amet
                          semper sagittis, neque. Sed a sed diam senectus diam.
                          Arcu tellus ullamcorper volutpat id{" "}
                        </p>{" "}
                        <Link to="#" className="progresstext_contnet_done">
                          Completed
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
                      <div className="Marketingcampaign1_contnet_done"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                        <Link to={`/jobs/details/215`}><h2>Run campaign for a jewelry business</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" />{" "}
                            +1New
                          </span>
                        </div>
                        <p>
                          {}
                          In vehicula orci maecenas egestas sodales at. Senectus
                          nec dolor id pulvinar. Vitae fringilla phasellus amet
                          semper sagittis, neque. Sed a sed diam senectus diam.
                          Arcu tellus ullamcorper volutpat id{" "}
                        </p>{" "}
                        <Link to="#" className="progresstext_contnet_done">
                          Completed
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
            </div>
            <div className="Performanceads "></div>
            <div className="Topallpage">
              <div className="InProgress-4">
                <div className="Work-D_contnet">
                  <div className="Work-In_contnet">
                    <div className="InProgress"></div>
                    <div className="Marketingcampaign">
                      <div className="Marketingcampaign1_contnet_done"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                        <Link to={`/jobs/details/215`}><h2>Digital media marketing for Flora</h2></Link>
                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" />{" "}
                            +1New
                          </span>
                        </div>
                        <p>
                          In vehicula orci maecenas egestas sodales at. Senectus
                          nec dolor id pulvinar. Vitae fringilla phasellus amet
                          semper sagittis, neque. Sed a sed diam senectus diam.
                          Arcu tellus ullamcorper volutpat id{" "}
                        </p>{" "}
                        <Link to="#" className="progresstext_contnet_done">
                          Completed
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
                      <div className="Marketingcampaign1_contnet_done"></div>
                      <div className="Marketingcampaign2">
                        <div className="businesstext">
                        <Link to={`/jobs/details/215`}><h2>Digital media marketing for Flora</h2></Link>

                          <span className="NewText">
                            <img className="mailicon" src="img/mail.png" />
                            +1 New
                          </span>
                        </div>
                        <p>
                          In vehicula orci maecenas egestas sodales at. Senectus
                          nec dolor id pulvinar. Vitae fringilla phasellus amet
                          semper sagittis, neque. Sed a sed diam senectus diam.
                          Arcu tellus ullamcorper volutpat id{" "}
                        </p>{" "}
                        <Link to="#" className="progresstext_contnet_done">
                          Completed
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
            </div>
          </div>
        ) : (
          <div>last</div>
        )}
      </div>
    </>
  );
}
