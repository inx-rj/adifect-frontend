import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetails } from "../../redux/actions/job-actions";
import { BACKEND_API_URL } from "../../environment";
import { ROLE } from "../../constants/other-constants";
import axios from "axios";

export default function Admin_job_details() {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [jobDocuments, setJobDocuments] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState();
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState();
  const [level, setLevel] = useState();
  const [job_type, setJobType] = useState();
  const [company_type, setCompanyType] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const { userData } = useSelector((state) => state.authReducer);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const {
    loading: jobLoading,
    success,
    jobDetails,
  } = useSelector((state) => state.jobDetailsReducer);

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log('checking',jobId);
      const checking = axios
        .get(`${BACKEND_API_URL}jobs/${jobId}/`, {})
        .then((res) => {
          setTitle(res.data.title);
          setJobDescription(res.data.description);
          setJobDocuments(res.data.images);
          setDeliveryDate(new Date(res.data.expected_delivery_date));
          setOfferPrice(res.data.price);
          setTags(res.data.tags);
          setCategory(res.data.category);
          setSkills(res.data.skills);
          setIndustry(res.data.industry);
          setLevel(res.data.level);
          setJobType(res.data.get_jobType_details);
          setCompanyType(res.data.company_type);
        })
        .catch((err) => { });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : jobLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Category_p TopMJobPgag">
            <div className="CategorylistName">
              <div className="backbtntop">
                <div className="JobDetailsPage">
                  <h1>Job Details</h1>
                  <div className="Activitysec">
                    <li>
                      {" "}
                      <a className="active1" href="">
                        Job Details
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href={`/jobs/activity/${jobId}`}>Activity</a>
                    </li>
                  </div>
                </div>

                <div className="JobDetailsPageBack">
                  <a className="Back" href="/home">
                    {" "}
                    Back
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="Topallpage">
            <div className="MarketingDetails ContentDiv border-radius">
              <div className="Marketingcamaign">
                <div className="jobdes">
                  <h2>{title}</h2>
                  {/* <div className="jobaplye">
                    <button hidden className="primary Small border-radius">
                      Apply
                    </button>
                  </div> */}
                </div>
                <p className="duedate duedate_sec">Due on: {deliveryDate}</p>
                <div className="jobdetailsInProgress">
                  <a className="jobdetailsInProgressBtn" href="">
                    In Progress
                  </a>
                </div>
                <p className=" INvehicula">{jobDescription}</p>
                <h5 className="ProvidedTitle">Provided Media:</h5>
                <div className="mediaimg">
                  {/* {JSON.stringify(jobDocuments[0].job_images)} */}
                  {/* {JSON.stringify(jobDocuments[0].job_images)}
                  {JSON.stringify(
                    jobDocuments[0].job_images
                      .slice(
                        ((jobDocuments[0].job_images.lastIndexOf("/") - 1) >>>
                          0) +
                          2
                      )
                      .substring(
                        0,
                        jobDocuments[0].job_images
                          .slice(
                            ((jobDocuments[0].job_images.lastIndexOf("/") -
                              1) >>>
                              0) +
                              2
                          )
                          .lastIndexOf(".")
                      )
                    // .split(".")
                    // .pop()
                  )} */}
                  {jobDocuments?.map((item, index) => (
                    <div key={index}>
                      {item.job_images
                        .slice(
                          ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
                        )
                        .split(".")
                        .pop()
                        .match(/(jpg|jpeg|png|gif)$/i) && (
                          <a
                            index_item={index}
                            target="_blank"
                            href={`${item?.job_images}`}
                          //   href={`${BACKEND_API_URL}${item?.job_images?.substring(
                          //     1
                          //   )}`}
                          // href={item?.job_images}
                          >
                            <li key={index}>
                              <img
                                className=""
                                src={`${item?.job_images}`}
                                alt=""
                              />
                            </li>
                          </a>
                        )}
                    </div>
                  ))}
                </div>
                {jobDocuments?.map((item, index) => (
                  <div key={index}>
                    {!item.job_images
                      .slice(((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2)
                      .split(".")
                      .pop()
                      .match(/(jpg|jpeg|png|gif)$/i) && (
                        <p className="mt-3 f-16" key={index}>
                          <img className="mr-2" src="/img/Document.png" alt="" />
                          <a
                            index_item={index}
                            // href={item.job_images}
                            href={`${item.job_images}`}
                            target="_blank"
                            download
                            style={{ cursor: "pointer" }}
                          >
                            <span>
                              {item.job_images.slice(
                                ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
                              )}
                            </span>
                          </a>
                        </p>
                      )}
                  </div>
                ))}
              </div>
              <hr className="b-top" />
              <table>
                <tr className="Pricetable">
                  <td>
                    <h5 className="colortype">Job Type:</h5>
                  </td>
                  <td>
                    <p className="fixedpriceDetail">{job_type}</p>
                  </td>
                  <td>
                    <h5 className="colortype">Industry:</h5>
                  </td>
                  <td>
                    <p className="fixedpriceDetail">
                      {industry?.industry_name}
                    </p>
                  </td>
                </tr>
                <tr className="Pricetable">
                  <td>
                    <h5 className="colortype">Offered Price:</h5>
                  </td>
                  <td>
                    <p className="fixedpriceDetail">${offerPrice}</p>
                  </td>
                  <td>
                    <h5 className="colortype">Level:</h5>
                  </td>
                  <td>
                    <p className="fixedpriceDetail">{level?.level_name}</p>
                  </td>
                </tr>
              </table>
              <hr className="b-top" />
              <table>
                <tr className="Pricetable">
                  <td>
                    <h5 className="colortype CompanyName">Company:</h5>
                  </td>
                  <td>
                    <p className="fixedpriceDetail CompanyNameIn">
                      ABC Industries
                      {/* {company_type} */}
                    </p>
                  </td>
                </tr>
                {/* <tr className="Pricetable">
                  <td>
                    <h5 className="colortype">Current State:</h5>
                  </td>
                </tr> */}
                {/* <tr className="Pricetable">
                  <td>
                    <h5 className="colortype ProgressColor">In Progress</h5>
                  </td>
                </tr> */}
              </table>
              <hr className="b-top" />
              <div className="Skill">
                <h5 className="skillsjobde mb-4">Skills:</h5>
                {skills?.map((item) => (
                  <li>
                    <a href="">{item.skill_name}</a>
                  </li>
                ))}
              </div>
              <div className="Skill">
                <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                {tags?.split(",")?.map((tag, index) => (
                  <li key={index}>
                    <a href="#">{tag}</a>
                  </li>
                ))}
              </div>
              <hr className="b-top" />
              {/*<div className="Activities">
                <h5 className="skillsjobde mb-4 mt-4">Activities:</h5>
                <div className="Sendmessage">
                  <div className="SendMessagechech">
                    <div className="Checkboxes-left">
                      <label className="containerbox">
                        <img
                          className=""
                          src={process.env.PUBLIC_URL + "/img/messageimg1.png"}
                          alt=""
                        />
                      </label>
                    </div>
                  </div>
                  <div className="SendMessageText">
                    <h5>
                      You sent johndoe a message <span>6 June, 01:00PM</span>
                    </h5>
                    <p>Hi how are you doing?</p>
                  </div>
                </div>
                <div className="Sendmessage">
                  <div className="SendMessagechech">
                    <div className="Checkboxes-left">
                      <label className="containerbox">
                        <img
                          className=""
                          src={process.env.PUBLIC_URL + "/img/messageimg2.png"}
                          alt=""
                        />
                      </label>
                    </div>
                  </div>
                  <div className="SendMessageText">
                    <h5>
                      johndoe sent a message <span>6 June, 01:00PM</span>
                    </h5>
                    <p>I’m good</p>
                  </div>
                </div>
                <div className="Sendmessage">
                  <div className="SendMessagechech">
                    <div className="Checkboxes-left">
                      <label className="containerbox">
                        <img
                          className=""
                          src={process.env.PUBLIC_URL + "/img/messageimg1.png"}
                          alt=""
                        />
                      </label>
                    </div>
                  </div>
                  <div className="SendMessageText">
                    <h5>
                      You sent johndoe a message <span>6 June, 01:00PM</span>
                    </h5>
                    <p>Let’s start work</p>
                  </div>
                </div>
              </div>
              <div className="pageNest">
                <li>
                  <a href="">
                    <img
                      className=""
                      src={process.env.PUBLIC_URL + "/img/left.png"}
                      alt=""
                    />
                  </a>
                </li>
                <li>
                  <a href="">1</a>
                </li>
                <li>
                  <a href="">2</a>
                </li>
                <li>
                  <a href="">3</a>
                </li>
                <li>
                  <a href="">4</a>
                </li>
                <li>
                  <a href="">.....</a>
                </li>
                <li>
                  <a href="">100</a>
                </li>
                <li>
                  <a href="">
                    <img
                      src={process.env.PUBLIC_URL + "/img/Right.png"}
                      alt=""
                    />
                  </a>
                </li>
                <li></li>
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
