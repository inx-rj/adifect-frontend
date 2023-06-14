import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetails } from "../../redux/actions/job-actions";
import { BACKEND_API_URL } from "../../environment";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Creator_job_details_new() {
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
  const [company, setCompany] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const {
    loading: jobLoading,
    success,
    jobDetails,
  } = useSelector((state) => state.jobDetailsReducer);

  const { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const timer = setTimeout(() => {
      // console.log("checking", jobId);
      const checking = axios
        .get(`${BACKEND_API_URL}jobs/${jobId}/`, config)
        .then((res) => {
          setTitle(res.data.title);
          setJobDescription(res.data.description);
          setJobDocuments(res.data.images);
          setDeliveryDate(res.data.expected_delivery_date);
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

  const downloadFile = (blob, fileNameDownload) => {
    console.log("blobedit--", blob);
    const file = new Blob([blob], { type: "application/pdf" });
    const url = window.URL.createObjectURL(file);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileNameDownload;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <>
      {/* {isLoading ? (
        <LoadingSpinner />
      ) : jobLoading ? (
        <LoadingSpinner />
      ) : ( */}
      <>
        <div className="Marketingcamaign">
          <div className="detailjobadmin">
            <h2>{title}</h2>

            <div className="align"></div>
          </div>
          <p className="duedate duedate_sec">Due on: {deliveryDate}</p>
          <div className="jobdetailsInProgress">
            <Link className="jobdetailsInProgressBtn" to="">
              In Progress
            </Link>
          </div>
          <p className=" INvehicula">{jobDescription}</p>
          <h5 className="ProvidedTitle">Provided Media:</h5>
          <div className="mediaimg Providedmediaimg">
            {jobDocuments?.length > 0 &&
              jobDocuments?.map((item, index) => (
                <div key={index}>
                  {item.job_images
                    ?.slice(((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2)
                    .split(".")
                    .pop()
                    .match(/(jpg|jpeg|png|gif)$/i) && (
                      <a
                        index_item={index}
                        target="_blank"
                        href={`${item?.job_images}`}
                      // href={item?.job_images}
                      >
                        <li key={index}>
                          <img className="" src={`${item?.job_images}`} alt="" />
                        </li>
                      </a>
                    )}
                </div>
              ))}
          </div>
          {jobDocuments?.length > 0 &&
            jobDocuments?.map((item, index) => (
              <div key={index}>
                {!item.job_images
                  ?.slice(((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2)
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
                          {item.job_images?.slice(
                            ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
                          )}
                        </span>
                      </a>
                    </p>
                  )}
              </div>
            ))}
          {jobDocuments.length < 1 && <div>N/A</div>}
        </div>
        <hr className="b-top" />
        <table>
          <tr className="Pricetable">
            <td>
              <h5 className="colortype">Job Type:</h5>
            </td>
            <td>
              <p className="fixedpriceDetail">{job_type ? job_type : "N/A"}</p>
            </td>
            <td>
              <h5 className="colortype">Industry:</h5>
            </td>
            <td>
              <p className="fixedpriceDetail">
                {industry ? industry?.industry_name : "N/A"}
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
              <p className="fixedpriceDetail">
                {level ? level?.level_name : " N/A"}
              </p>
            </td>
          </tr>
        </table>
        {/* {company && ( */}
        <>
          <hr className="b-top" />
          <table>
            <tr className="Pricetable">
              <td>
                <h5 className="colortype CompanyName">Company:</h5>
              </td>
              <td>
                <p className="fixedpriceDetail CompanyNameIn">
                  {/* ABC Industries */}
                  {company ? company.name : "N/A"}
                </p>
              </td>
            </tr>
          </table>
        </>
        {/* )} */}
        <hr className="b-top" />
        <div className="Skill">
          <h5 className="skillsjobde mb-4">Skills:</h5>
          {skills?.map((item, index) => (
            <li key={index}>
              <Link to="">{item.skill_name}</Link>
            </li>
          ))}
        </div>
        <div className="Skill">
          <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
          {/* {tags?.split(",")?.map((tag, index) => (
              <li key={index}>
                <Link to="#">{tag}</Link>
              </li>
            ))} */}
        </div>
      </>
      {/* )} */}
    </>
  );
}
