import { useForm } from "react-hook-form";
import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { BACKEND_API_URL } from "../../environment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { getJobDetails } from "../../redux/actions/job-actions";
import Select from "@mui/material/Select";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { validations } from "../../utils";

export default function CreatorApplyJob() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [selects, setselects] = useState(null);
  const [number, setlink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const [title, setTitle] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [level, setlevel] = useState();

  const [jobDocuments, setJobDocuments] = useState();
  const [attachFiles, setAttachFiles] = useState(false);
  const [fileExtension, setFileExtension] = useState();
  const [sizeError, setSizeError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const imgRef = useRef(null);

  const [errors1, setErrors] = useState({
    selects: null,
    number: null,
    message: null,
  });

  setTimeout(() => {
    setIsLoading(false);
  }, 1200);

  const { success, jobDetails } = useSelector(
    (state) => state.jobDetailsReducer
  );

  const [isOpen3, setIsOpen3] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsOpen3(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);
  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleChange1 = (evt) => {
    const { value } = evt.target;

    // check if value includes a decimal point
    if (value.match(/\./g)) {
      const [, decimal] = value.split(".");

      if (decimal?.length > 2) {
        return;
      }
    }
    // otherwise, update value in state
    setlink(value);
  };

  const removeDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    if (v == "icon") {
      const s = jobDocuments.filter((item, index) => index !== e);
      setJobDocuments(s);

      const s1 = imgRef.current.filter((item, index) => index !== e);
      imgRef.current = s1;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);

      return;
    }
    if (v == "image") {
      const s = jobDocuments.filter((item, index) => index !== e);
      setJobDocuments(s);
      imgRef.current = s;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);

      return;
    }
    if (v == "data") {
      const s = imgRef.filter((item, index) => index !== e);
      setJobDocuments(jobDocuments.filter((el, i) => i !== e));
      setFileExtension(fileExtension.filter((el, i) => i !== e));
      imgRef.current = s;

      const s2 = fileExtension.filter((item, index) => index !== e);
      setFileExtension(s2);
      return;
    }
  };

  const maxDocSize = 25000000;

  const onSelectFile = async (e) => {
    setAttachFiles(true);
    var imageList = [];
    var previewImages = [];
    let fileext = [];

    for (let i = 0; i < e.target.files.length; i++) {
      // Max file size 25mb and max 10 files
      // if (e.target.files[i].size > maxDocSize && e.target.files.length > 10) {
      //   swal({
      //     title: "Error",
      //     text: "Max upload limit is 10 and max file size 25mb",
      //     className: "errorAlert",
      //     icon: "/img/ErrorAlert.png",
      //     buttons: false,
      //     timer: 2500,
      //   });

      // Max file size 25mb
      if (e.target.files[i].size > maxDocSize) {
        swal({
          title: "Error",
          text: "Max file size allowed is 25mb",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 2500,
        });
      }
      // Max files 10
      else if (e.target.files.length > 10) {
        swal({
          title: "Error",
          text: "Maximum 10 files allowed",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 2500,
        });
      }

      if (previewImages.length < 10 && e.target.files[i].size <= maxDocSize) {
        previewImages.push(URL.createObjectURL(e.target.files[i]));
      }

      if (imageList.length < 10 && e.target.files[i].size <= maxDocSize) {
        imageList.push(e.target.files[i]);
      }

      if (fileext.length < 10 && e.target.files[i].size <= maxDocSize) {
        fileext.push(
          e.target.files[i].name.slice(
            ((e.target.files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
          )
        );
      }
      // }
    }
    setJobDocuments(imageList);
    setFileExtension(fileext);
    imgRef.current = imageList;
  };

  const downloadFile = (blob, fileNameDownload) => {
    // console.log("blob--", blob);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileNameDownload;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const validateSubmit = (e, data) => {
    e.preventDefault();
    const tempErrors = {
      selects: !selects && "Please select an option",
      number: validations.number(number),
      // message: validations.message(message),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {

      return;
    }
    submitHandler();
  };

  const submitHandler = async (data, event) => {
    let user = JSON.parse(localStorage.getItem("userData"));

    if ((number) => 5) {
      const formData = new FormData();

      if (attachFiles) {
        if (jobDocuments) {
          for (const key of Object.keys(jobDocuments)) {
            formData.append("job_applied_attachments", jobDocuments[key]);
          }
        }
      }

      formData.append("cover_letter", message);
      formData.append("job_bid_price", number);
      formData.append("user", user.user.user_id);
      formData.append("job", jobId);
      formData.append("duration", selects);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const success = await axios
        .post(`${BACKEND_API_URL}job-applied/`, formData, config)
        .then((res) => {
          // console.log("res--", res.data);
          swal({
            title: "Successfully Complete",
            text: res.data.message,
            className: "successAlert-login",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/jobs/list");
          }, 500);
        })
        .catch((err) => {
          // console.log(err.response.data.message);
          swal({
            title: "Error",
            text: err.response.data.message,
            className: "errorAlert",
            icon: "/img/logonew-red.svg",

            buttons: false,
            timer: 2500,
          });
          return;
        });
    }
  };

  const { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    // const success = axios
    //   .get(`${BACKEND_API_URL}job-applied/`, {})
    //   .then((res) => {
    //     console.log(res.data);
    //     res.data?.map((item, index) => {
    //       if (item.job == jobid && item.user == user?.user?.user_id) {
    //         setIsLoading1(false);
    //       } else {
    //         setIsLoading1(true)
    //       }
    //     });
    //   })
    //   .catch((err) => {});

    const timer = setTimeout(() => {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const checking = axios
        .get(`${BACKEND_API_URL}jobs/${jobId}/`, config)
        .then((res) => {
          // console.log(res.data.id);
          setTitle(res.data.title);
          setJobDescription(res.data.description);
          setDeliveryDate(res.data.expected_delivery_date);
          setOfferPrice(res.data.price);
          setTags(res.data.tags);
          setSkills(res.data.skills);
          setlevel(res.data.level);
        })
        .catch((err) => { });
    }, 100);
    return () => clearTimeout(timer);
  }, [lengthError, sizeError]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <>
        <h1 className="toptitle">Submit a Proposal</h1>
        <div className=" FreshJobTop">
          <div className="Remotemarkeitng">
            <div className="bt-Title">
              <div className="creatorapplyjob">
                <h2>{title}</h2>
              </div>
              {/* <div className="ApplyButton">
      <button type="button" className="delJobedeidtbtn "><img className="viewicon" src="/img/viewicon.png" alt=""/></button>
      </div> */}
            </div>
            <div className="RemoteText">
              <p className="PostedDate">Posted on : {deliveryDate}</p>
              <div className="PostedDesc">{jobDescription}</div>
              <div className="Budget-Title">
                <li>
                  <h5>Budget:</h5>
                </li>
                <li>
                  <h5>${offerPrice}</h5>
                </li>
              </div>
              <div className="Budget-Title">
                <li>
                  <h5>Level:</h5>
                </li>
                <li>
                  <h5>{level?.level_name}</h5>
                </li>
              </div>
              <div className="Skill">
                <li>
                  <h5 className="skillsjobde mb-4">Skills:</h5>
                </li>
                {skills?.map((item) => (
                  <li>
                    <Link to="">{item.skill_name}</Link>
                  </li>
                ))}
              </div>
              <div className="Skill mt-2">
                <li>
                  <h5 className="skillsjobde">Tags:</h5>
                </li>
                <li>
                  <Link to="#">{tags}</Link>
                </li>
              </div>
              <div className="ApplyButton_2">
                <button
                  type="button"
                  className="btn btn-primary Small border-radius"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="jobapplysec applyjobnewdiv">
          <form
            className="jobapplyform jobapplyformnew_1"
            onSubmit={validateSubmit}
          >
            <div
              className={
                errors1.selects
                  ? "SelectProficiency error"
                  : "SelectProficiency"
              }
            >
              <h4 className="Projecttake">
                How long will this Project take ?{" "}
              </h4>
              <div className="styled-select">
                <Select
                  className={
                    selects === null
                      ? "selectinputcolor"
                      : "menuiteminputcolor"
                  }
                  onChange={(e) => {
                    setselects(e.target.value);
                    setErrors({ ...errors1, selects: null });
                  }}
                  open={isOpen3}
                  onOpen={() => {
                    setIsOpen3(true);
                  }}
                  value={selects}
                  onClose={() => {
                    setIsOpen3(false);
                  }}
                  MenuProps={menuProps}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={null}> Select one option </MenuItem>
                  <MenuItem value="More than 6 months">
                    {" "}
                    More than 6 months{" "}
                  </MenuItem>
                  <MenuItem value="3 to 6 months">3 to 6 months</MenuItem>
                  <MenuItem value="1 to 3 months">1 to 3 months</MenuItem>
                  <MenuItem value="Less than 1 month">
                    Less than 1 month
                  </MenuItem>
                </Select>
              </div>
              {/* <select value={selects} onChange={ e => setselects(e.target.value)}>
                      <option></option>
                    <option>More than 6 months</option>
                    <option>3 to 6 months</option>
                    <option>1 to 3 months</option>
                    <option>Less than 1 month</option>
                    </select> */}
              <div className="creatorerrorselect">
                <span
                  className="Pricecredivnewerror1"
                  style={{
                    color: "#D14F4F",
                    opacity: errors1.selects ? 1 : 0,
                  }}
                >
                  {errors1.selects ?? "valid"}
                </span>
              </div>
            </div>
            <div
              className={errors1.message ? "jobpagecrea error" : "jobpagecrea "}
            >
              <h4 className="jobdetail">Additional Comments</h4>
              <textarea id="message" name="message" onChange={handleChange} />
              <span
                className="crepagenew2"
                style={{
                  color: "#D14F4F",
                  opacity: errors1.message ? 1 : 0,
                }}
              >
                {errors1.message ?? "valid"}
              </span>
            </div>

            <h4 className="jobApplyDocuments">Attach Files/Portfolio</h4>
            <input
              multiple
              type="file"
              onChange={(e) => {
                onSelectFile(e);
                // setErrors({ ...errors, jobDocuments: null });
              }}
              id="uploadApplyDocs"
              hidden
            />
            <label className="uploadApplyDocs" htmlFor="uploadApplyDocs">
              {" "}
              <img className="mr-2" src="/img/upload.png" alt="" />
              Attach Files
            </label>

            {/* {jobDocuments && JSON.stringify(jobDocuments[0])}
            {JSON.stringify(selectedDocs)}
            {JSON.stringify(imgRef.current)} */}

            {/* Images */}
            <div>
              {imgRef &&
                // !imageChanged &&
                imgRef?.current?.map((item, index) => (
                  <>
                    {fileExtension[index].match(/(jpg|jpeg|png|gif)$/i) && (
                      <>
                        <div
                          index_val={index}
                          className="job-documents-img f-16 image-item"
                          key={index}
                        >
                          <a target="_blank" href={URL.createObjectURL(item)}>
                            {/* <a target="_blank" href={item}> */}
                            <img
                              className="w-100"
                              src={URL.createObjectURL(item)}
                            // src={item}
                            />
                          </a>
                          <div
                            className="overlay"
                            onClick={() => removeDocument(index, "image")}
                          >
                            <Link to="#" className="icon" title="Remove">
                              <i className="fa-solid fa-circle-xmark"></i>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ))}
            </div>

            {/* Other documents */}
            <div>
              {imgRef &&
                // !imageChanged &&
                imgRef?.current?.map((item, index) => (
                  <>
                    {!fileExtension[index].match(/(jpg|jpeg|png|gif)$/i) && (
                      <>
                        <div
                          index_val={index}
                          className="job-documents-img f-16 document-item new-documents"
                          key={index}
                        >
                          <a
                            style={{ cursor: "pointer" }}
                            download
                            onClick={(e) => downloadFile(item, item.name)}
                          >
                            <i
                              className="fas fa-download"
                              style={{ color: "#0a58ca" }}
                            ></i>
                            <img
                              className="w-100 mr-2"
                              src="/img/file1.png"
                              alt=""
                              hidden
                            />
                            {item.name}
                          </a>
                          <div
                            className="overlay"
                            onClick={() => removeDocument(index, "icon")}
                          >
                            <Link to="#" className="icon" title="Remove">
                              <i className="fa-solid fa-circle-xmark"></i>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ))}
            </div>

            <br />

            <h4 className="jobbudget">Job Bid Price</h4>
            <div
              className={
                errors1.number ? "jobbidpricesec error" : "jobbidpricesec"
              }
            >
              <div className="pricename">
                <input
                  type="number"
                  placeholder="0.00"
                  id="number"
                  name="number"
                  value={number}
                  onInput={(e) => {
                    setErrors({ ...errors1, number: null });
                    if (e.target.value.length > e.target.maxLength)
                      e.target.value = e.target.value.slice(
                        0,
                        e.target.maxLength
                      );
                  }}
                  maxLength={8}
                  onKeyDown={blockInvalidChar}
                  onChange={handleChange1}
                />

                <span className="pricetag">$</span>
              </div>
              <span
                className="Pricecredivnew"
                style={{
                  color: "#D14F4F",
                  opacity: errors1.number ? 1 : 0,
                }}
              >
                {errors1.number ?? "valid"}
              </span>
            </div>

            <div className="jobBtnsub">
              <div className="jobBtnsub_Btn">
                <button
                  className="jobclickBtnsubmint"
                  type="submit"
                  value="Send message"
                >
                  Submit
                </button>
              </div>
              <div className="Canceljobapply">
                <Link
                  className="create-account-btn border-radius"
                  to="/jobs/list"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </>
    </>
  );
}
