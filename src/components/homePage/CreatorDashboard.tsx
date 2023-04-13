import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Title from "components/common/PageTitle/Title";
import BadgeUI from "components/common/badge/BadgeUI";
import { formateISODateToLocaleString } from "helper/utility/customFunctions";
import React, { useCallback, useState } from "react";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { Link, useNavigate } from "react-router-dom";

import { GET_USER_DATA } from "redux/reducers/auth/auth.slice";
import { FRESHERS_JOBS_DATA } from "redux/reducers/homePage/fresherJobsList.slice";
import { GET_JOBS_DETAILS } from "redux/reducers/homePage/jobsList.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import CreatorDashboardInProgress from "./creatorDashboard/CreatorDashboardInProgress";
import CreatorDashboardInReview from "./creatorDashboard/CreatorDashboardInReview";
import { useDropzone } from "react-dropzone";
import swal from "sweetalert";
import { Images } from "helper/images";
import {
  APPLY_FOR_JOB,
  GET_JOB_DETAILS,
  GET_MEMEBERS_FRESHERS_JOBLIST,
  GET_MEMEBERS_FRESHERS_LATEST_JOBLIST,
} from "redux/actions/jobs/jobs.actions";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import CustomDateRangePicker from "components/common/customDatePicker/CustomDateRangePicker";
import {
  Add,
  Delete,
  FileUploadOutlined,
  InsertLink,
} from "@mui/icons-material";

interface ErrorsType {
  selects?: null | string;
  number?: null | number | string;
  formUrls?: null | string;
  date?: null | Date | string;
  coverletter?: null | string;
  url?: null | string;
  formsampleImgUrls?: null | string | Array<string>;
  sampleurl?: null | string | Array<string>;
  formSampleUrls?: null | string | Array<string>;
}
const CreatorDashboard = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(GET_USER_DATA);

  const freshJob = useAppSelector(FRESHERS_JOBS_DATA);
  const jobDetails = useAppSelector(GET_JOBS_DETAILS);

  const [showBlueBox, setShowBlueBox] = useState(true);
  const [show, setShow] = useState(false);
  const [jobId, setJobId] = useState("");
  const [title, setTitle] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [proposedPrice, setProposedPrice] = useState("");
  const [proposedDate, setProposedDate] = useState<Date>();
  const [userdata, setuserdata] = useState();
  const [company, setCompanyname] = useState("");
  const [jobDocumentsPopup, setJobDocumentsPopup] = useState();
  const [fileExtension, setFileExtension] = useState();
  const [isPopupLoading, setIsPopupLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [errors1, setErrors] = useState({
    selects: null,
    number: null,
    formUrls: null,
    date: null,
    coverletter: null,
    url: null,
    formsampleImgUrls: null,
    sampleurl: null,
    formSampleUrls: null,
  });

  // --------------------------show images and video-------------------------------------
  const [jobDocuments, setJobDocuments] = useState([]);
  const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
  const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
  const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
  const [jobvideoDocuments, setJobDocumentsvideo] = useState([]);
  const [additionalvideoJobDocuments, setAdditionalvideoJobDocuments] =
    useState([]);
  const [jobvideoDocumentsThumbs, setJobDocumentsvideoThumbs] = useState([]);
  const [jobSamplevideoDocumentsThumbs, setJobSamplevideoDocumentsThumbs] =
    useState([]);
  const [newJobDetails, setNewJobDetails] = useState(false);

  const [formUrls, setFormUrls] = useState([""]);
  const [hide, sethide] = useState(true);

  const [datewarning, setdateWarning] = useState(false);
  const [sampleimgUrl, setsampleImgUrl] = useState("");

  // React states
  const [filterData, setFilterData] = useState<{ [key: string]: string }>({
    from_date: "",
    to_date: "",
    community: "",
    status: "",
    // Channel: "",
    tag: "",
  });

  useSingleEffect(() => {
    if (userData?.data?.user?.user_level == 4) {
      dispatch(GET_MEMEBERS_FRESHERS_JOBLIST());
    } else {
      dispatch(GET_MEMEBERS_FRESHERS_LATEST_JOBLIST());
    }
    // dispatch(FreshJobs());
  });

  const maxImageFileSize = 10000000;
  const imageMimeType = /image\/(svg|eps|png|jpg|jpeg|gif)/i;

  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            title: file.name,
          })
        ),
      ]);
    },
    [files]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // onDrop,
    // accept: {
    //   "image/jpeg": [],
    //   "image/png": [],
    //   "image/svg+xml": [],
    //   "image/gif": [],
    // },
    onDrop: useCallback(
      (acceptedFiles: any) => {
        // console.log(acceptedFiles[0]);
        if (!acceptedFiles[0].type.match(imageMimeType)) {
          swal({
            title: "Error",
            text: "Image type is not valid",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            // buttons: false,
            timer: 5000,
          });
        } else if (acceptedFiles[0].size > maxImageFileSize) {
          swal({
            title: "Error",
            text: "Max file size allowed is 10mb",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            // buttons: false,
            timer: 5000,
          });
        } else {
          setFiles([
            ...files,
            ...acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                title: file.name,
              })
            ),
          ]);
        }
      },
      [files]
    ),
  });

  const mainProposedCancel = () => {
    setShow(false);
    // setlink("");
    // setdatepricewarning(false);
    // set50value(false);
    // set25value(false);

    setlink(proposedPrice);
    setStartDate(proposedDate);
  };

  const openPopup = async (item_id) => {
    setOpen(true);
    setNewJobDetails(true);
    // dispatch({ type: JOB_DETAILS_RESET });
    dispatch(GET_JOB_DETAILS(item_id));
    // if (job_detail_success) {
    //   setJobId(item_id);
    //   setTitle(jobDetails.title);
    //   setJobDescription(jobDetails.description);
    //   setJobDocuments(jobDetails.images);
    //   setDeliveryDate(jobDetails.expected_delivery_date);
    //   setOfferPrice(jobDetails.price);
    //   setTags(jobDetails.tags);
    //   setCategory(jobDetails.category);
    //   setSkills(jobDetails.skills);
    //   setIndustry(jobDetails.industry);
    //   setLevel(jobDetails.level);
    //   setJobType(jobDetails.get_jobType_details);
    //   setCompanyType(jobDetails.company_type);
    //   setCompanyname(jobDetails.company_name);
    // }
  };
  //Clear Negotiation
  const clearMainNegotiate = () => {
    setlink("");
    setStartDate(new Date());
    setProposedPrice("");
    // setProposedDate("");

    // setdatepricewarning(false);
    // set50value(false);
    // set25value(false);
  };

  //Save Negotiation values
  const savevalue = () => {
    const tempErrors: any = {
      number: !number && show && "Please enter Proposed Price",
      date: !startDate && show && "Please add Proposed Due Date",
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    setProposedPrice(number);
    setProposedDate(startDate);
    setShow(false);

    Number(offerPrice);
    const per100 = 100;
    const n = Number(offerPrice);
    const percentage100 = n + (n / 100) * per100;
    // if (number > percentage100 && daysdifference < 0) {
    // }
  };

  let sampleurl: any = "";
  let handleChangesampleUrls = (e) => {
    sethide(true);
    if (sampleimgUrl != "") {
      if (
        (sampleurl = sampleimgUrl.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        ))
      ) {
        setFormSampleUrls([...formSampleUrls, sampleimgUrl]);
        setsampleImgUrl("");
      } else {
        // setsampleImgUrl("");
        const tempErrors: any = {
          formsampleImgUrls:
            sampleurl == null && "Please check the url(s) and try again",
        };
        setErrors(tempErrors);
      }
    } else if (sampleimgUrl == "") {
      setsampleImgUrl("");
      const tempErrors: any = {
        sampleurl: !sampleimgUrl && "Please enter url",
      };
      setErrors(tempErrors);
    } else {
      setsampleImgUrl("");
      const tempErrors: any = {
        formsampleImgUrls:
          sampleurl == null && "Please check the url(s) and try again",
      };
      setErrors(tempErrors);
    }
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const handleChange1 = (evt) => {
    // setdatepricewarning(false);
    // set25value(false);
    // set75value(false);
    // set50value(false);
    const { value } = evt.target;

    // check if value includes a decimal point
    if (value.match(/\./g)) {
      const [, decimal] = value.split(".");

      if (decimal?.length > 2) {
        return;
      }
    }
    Number(offerPrice);
    const per50 = 50;
    const per = 25;
    const per75 = 75;
    const per100 = 100;
    const n = Number(offerPrice);

    const percentage25 = n + (n / 100) * per;
    const percentage50 = n + (n / 100) * per50;
    const percentage75 = n + (n / 100) * per75;
    const percentage100 = n + (n / 100) * per100;

    // my change in project 28/9
    const firstvalue = value - n;
    const preDataValue = (firstvalue * 100) / n;
    // console.log(preDataValue)
    const preDataValue1 = Math.floor(preDataValue);
    // setPrintPreData(preDataValue1);

    const start = startDate;
    let today = new Date(deliveryDate);
    // const diffInMs = new Date(start) - new Date(today);
    // const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    // const diffInDate = Math.floor(diffInDays);

    // if (value > percentage25 && Math.floor(diffInDays) < 0 && start != null) {
    //   setdatepricewarning(true);
    //   set50value(false);
    //   set25value(false);
    // } else if (
    //   (value < percentage50 && value > percentage25) ||
    //   number == percentage25
    // ) {
    //   set25value(true);
    //   setdatepricewarning(false);
    // } else if (value > percentage50 || value == percentage50) {
    //   set50value(true);
    //   setdatepricewarning(false);
    // }
    setlink(value);
  };

  //Open Negotiate box in Apply Job Modal on click of Negotiate button
  const mainNegotiate = () => {
    setShow(true);
    if (number == "") {
      setlink(jobDetails?.details?.price);
    }
  };

  //set selected filter
  const handleChange = (name: string, value: any) => {
    setFilterData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClick = () => {
    setShowBlueBox(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClickOpen = async (item_id) => {
    console.log("ietm_id", item_id);
    setOpen1(true);
    setIsPopupLoading(true);
    setTimeout(() => {
      setIsPopupLoading(false);
    }, 1200);

    dispatch(GET_JOB_DETAILS(item_id));
    // return () => clearTimeout(timer);
  };

  const handleClose = () => {
    setOpen1(false);
    // setlink("");
    // setdatepricewarning(false);
    // setFiles([]);
    // set50value(false);
    // set25value(false);
    // setShow(false);
    // setcoverletter("");
    // setquestion("");
    // setFormSampleUrls([]);
    // setDeliveryDate();
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [formSampleUrls, setFormSampleUrls] = useState<any>([]);
  const [number, setlink] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [coverletter, setcoverletter] = useState("");
  const [selects, setselects] = useState(null);
  const [question, setquestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const navigate = useNavigate();

  const validateSubmit = (e) => {
    sethide(false);
    e.preventDefault();
    // Urls Validation
    let isValidUrl: any = "";
    let newFormValues = formUrls.filter((n) => n);
    setFormUrls(newFormValues);
    if (formUrls) {
      for (let i = 0; i < formUrls.length; i++) {
        if (formUrls[i] != "") {
          isValidUrl = formUrls[i].match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          );
        }
      }
    }
    // SampleUrls Validation
    let isValidSampleUrl = "";
    let newFormSampleValues = formSampleUrls.filter((n) => n);
    setFormSampleUrls(newFormSampleValues);
    if (formSampleUrls) {
      for (let i = 0; i < formSampleUrls.length; i++) {
        if (formSampleUrls[i] != "") {
          isValidSampleUrl = formSampleUrls[i].match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          );
        }
      }
    }

    const tempErrors: any = {
      number: !number && show && "please enter Proposed Price",
      date: !startDate && show && "Please add Proposed Due Date",
      coverletter: !coverletter && "Please enter Comments",
      formUrls: isValidUrl == null && "Please check the url(s) and try again",
      formSampleUrls:
        isValidSampleUrl == null && "Please check the url(s) and try again",
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    setIsPopupLoading(true);
    submitHandler();
  };
  const submitHandler = async () => {
    let user = JSON.parse(localStorage.getItem("userData"));

    if ((number) => 5) {
      // const formData = new FormData();
      const formData = {
        question: question,
        formSampleUrls: formSampleUrls,
        number: number,
        coverletter: coverletter,
        user: user.user.user_id,
        proposed_due_date: startDate.toISOString().slice(0, 10),
        job: freshJob?.data?.data.id,
        duration: selects,
      };

      if (files) {
        for (const key of Object.keys(files)) {
          // formData.append("image", files[key]);
        }
      }
      // formData.append("question", question);
      // formData.append("links", formSampleUrls);
      // formData.append("proposed_price", number);
      // formData.append("cover_letter", coverletter);
      // formData.append("user", user.user.user_id);
      // formData.append(
      //   "proposed_due_date",
      //   formateISODateToLocaleString(startDate)
      // );
      // formData.append("job", freshJob?.data?.data.id);
      // formData.append("duration", selects);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData?.data.token}`,
        },
      };
      // const success = await axios;
      // .post(`${BACKEND_API_URL}job-applied/`, formData, config)
      dispatch(APPLY_FOR_JOB(formData))
        .then((res) => {
          setIsPopupLoading(false);
          setIsLoading(true);
          dispatch(GET_MEMEBERS_FRESHERS_LATEST_JOBLIST());
          swal({
            title: "Successfully Complete",
            // text: res.data?.message,
            className: "successAlert-login",
            icon: "/img/logonew.svg",
            // buttons: false,
            timer: 1500,
          });
          setTimeout(() => {
            setOpen1(false);
            navigate("/home");
          }, 800);
        })
        .catch((err) => {
          setIsPopupLoading(false);
          swal({
            title: "Error",
            text: err.response.data.message,
            className: "errorAlert",
            icon: "/img/logonew-red.svg",

            // buttons: false,
            timer: 2500,
          });
          return;
        });
    }
  };
  const closePopup = () => {
    setOpen(false);
    setJobId("");
    // setTitle();
    // setJobDescription();
    // setDeliveryDate();
    // setOfferPrice();
    // setTags();
    // setCategory();
    // setSkills();
    // setIndustry();
    // setLevel();
    // setJobType();
    // setCompanyType();
    setJobDocuments([]);
    setAdditionalJobDocuments([]);
    setJobDocumentsThumbs([]);
    setJobSampleDocumentsThumbs([]);
    setJobDocumentsvideo([]);
    setAdditionalvideoJobDocuments([]);
    setJobDocumentsvideoThumbs([]);
    setJobSamplevideoDocumentsThumbs([]);
  };

  let removeFormFieldsSampleUrls = (i) => {
    let newFormValues = [...formSampleUrls];
    newFormValues.splice(i, 1);
    setFormSampleUrls(newFormValues);
  };

  useUpdateEffect(() => {
    if (userData?.data?.user?.user_level == 4) {
      dispatch(GET_MEMEBERS_FRESHERS_JOBLIST());
    } else {
      dispatch(GET_MEMEBERS_FRESHERS_LATEST_JOBLIST());
    }
    // dispatch(FreshJobs());
  }, [jobDetails]);

  console.log("freshJob", freshJob);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {showBlueBox ? (
        <>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between">
              <div className="flex gap-2 ml-5 mt-5">
                <span className="text-2xl font-bold">Fresh Job</span>
                <span className="flex items-end">
                  <Link
                    className="hover:text-theme text-base text-[#A0A0A0] font-medium"
                    to="/jobs/list"
                  >
                    See More
                  </Link>
                </span>
              </div>
              <div className="mr-5 mt-5 cursor-pointer">
                <img
                  // disabled={!showBlueBox}
                  onClick={() => handleClick()}
                  src={Images.Close}
                />
              </div>
            </div>

            <>
              {freshJob?.data?.message == "No jobs to show" ? (
                <h2 className="text-center text-2xl font-bold pb-5">
                  {" "}
                  No Latest Job Found
                </h2>
              ) : (
                <div
                  className=""
                  // onClick={() => openPopup(`${freshJob?.data?.data?.id}`)}
                >
                  <div className="p-5 grid grid-cols-1 gap-4">
                    <div className="border border-1 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <Link to={`/jobs/details/${freshJob?.data?.data?.id}`}>
                          <Title title={freshJob?.data?.data?.title} />
                        </Link>
                        <button
                          onClick={() =>
                            handleClickOpen(`${freshJob?.data?.data?.id}`)
                          }
                          type="button"
                          className="btn btn-primary Small border-radius"
                        >
                          {" "}
                          Apply Now
                        </button>
                      </div>
                      <div className="">
                        <>
                          <Dialog
                            className="CDashboard  "
                            open={open2}
                            onClose={handleClose2}
                          >
                            <DialogTitle className="CDashboarddiv1">
                              <Title title="Negotiate Job" />{" "}
                              <span onClick={handleClose}>
                                <i className="fa-solid fa-circle-xmark">h</i>
                              </span>
                            </DialogTitle>
                            <DialogContent className="applytojb">
                              <div className="input-fields-wrapper">
                                <h4 className="text-base font-normal">
                                  Write Your Message for Negotiation
                                </h4>
                                <textarea className="input-style"></textarea>
                              </div>

                              <div className="input-fields-wrapper">
                                <h4 className="Pricetitle">Client’s Price</h4>
                                <div className="flex gap-2 items-center">
                                  <input
                                    className="input-style"
                                    type="number"
                                    placeholder="Price"
                                  />
                                  <span className="text-2xl">$</span>
                                </div>
                              </div>

                              <div className="input-fields-wrapper">
                                <h4 className="Pricetitle">Negotiated Price</h4>
                                <div className="flex gap-2 items-center">
                                  <input
                                    type="number"
                                    placeholder="Price"
                                    className="input-style"
                                  />
                                  <span className="text-2xl">$</span>
                                </div>
                              </div>

                              <div className="input-fields-wrapper">
                                <h4 className="Pricetitle">
                                  Expected Delivery Date
                                </h4>
                                <span>
                                  <div className="MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root">
                                    <div className="MuiInput-root MuiInput-underline MuiInputBase-root MuiInputBase-colorPrimary Mui-error MuiInputBase-formControl MuiInputBase-adornedEnd css-1ptx2yq-MuiInputBase-root-MuiInput-root"></div>
                                  </div>
                                </span>
                              </div>
                              <div className="input-fields-wrapper">
                                <h4 className="Pricetitle">
                                  Negotiated Delivery Date
                                </h4>
                                <span>
                                  <div className="MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root">
                                    <div className="MuiInput-root MuiInput-underline MuiInputBase-root MuiInputBase-colorPrimary Mui-error MuiInputBase-formControl MuiInputBase-adornedEnd css-1ptx2yq-MuiInputBase-root-MuiInput-root"></div>
                                  </div>
                                </span>
                              </div>
                              <div className="text-content Portfolioupload">
                                <button
                                  type="submit"
                                  className="btn btn-primary w-full"
                                >
                                  Submit
                                </button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog
                            className="CDashboard CDashboard1"
                            open={open1}
                            onClose={handleClose}
                          >
                            <DialogTitle className="CDashboarddiv1">
                              <div className="flex justify-between">
                                <h1 className="text-2xl font-bold text-[#1b4ea8]">
                                  Apply to Job
                                </h1>{" "}
                                {/* <span
                                  className="closebtnjoblist"
                                  onClick={handleClose}
                                >
                                  <i className="fa-solid fa-xmark"></i>
                                </span> */}
                                <div className="cursor-pointer">
                                  <img
                                    // disabled={!showBlueBox}
                                    onClick={() => handleClose()}
                                    src={Images.Close}
                                  />
                                </div>
                              </div>
                            </DialogTitle>
                            <DialogContent className="custom-scrollbar">
                              <div className="jobapplyform jobapplyformn">
                                {isPopupLoading ? (
                                  <LoadingSpinner />
                                ) : (
                                  <>
                                    <div className="grid grid-cols-5 gap-7">
                                      <div className="col-span-3">
                                        <Title
                                          title={jobDetails?.details?.title}
                                        />
                                        <p className="text-base font-normal text-black">
                                          {/* {jobDescription} */}
                                          {jobDetails?.details?.description?.substring(
                                            0,
                                            300
                                          )}
                                          ...
                                        </p>
                                      </div>
                                      <div className="col-span-2">
                                        <div className="border border-1 rounded-xl p-4 w-full max-w-[290px]">
                                          <div className="grid grid-cols-5 gap-2">
                                            <p className="text-base font-semibold text-[#A0A0A0] col-span-2">
                                              Created:{" "}
                                            </p>
                                            <p className="text-base font-bold text-semibold col-span-3">
                                              {new Date(
                                                jobDetails?.details?.created
                                              )
                                                .toISOString()
                                                .slice(0, 10)}
                                            </p>
                                          </div>
                                          <div className="grid grid-cols-5 gap-2">
                                            <p className="text-base font-semibold text-[#A0A0A0] col-span-2">
                                              Created by:
                                            </p>
                                            <p className="text-base font-bold text-semibold col-span-3">
                                              {jobDetails?.details?.created_by}
                                            </p>
                                          </div>
                                          <div className="grid grid-cols-5 gap-2">
                                            <p className="text-base font-semibold text-[#A0A0A0] col-span-2">
                                              Company:
                                            </p>
                                            <p className="text-base font-bold text-semibold col-span-3">
                                              {
                                                jobDetails?.details
                                                  ?.company_name
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="w-full max-w-[430px]">
                                      <div className="w-full flex justify-between gap-3 p-2">
                                        <div className="my-2">
                                          <div
                                            className={
                                              errors1.number
                                                ? "Offer_A_P Offer_A_P1 error flex gap-2 text-danger"
                                                : "Offer_A_P Offer_A_P1 "
                                            }
                                          >
                                            <h4 className="text-base font-semibold text-[#1b4ea8]">
                                              Offer Price{" "}
                                            </h4>
                                            <p className="offerp">
                                              ${jobDetails?.details?.price}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="">
                                          <div className="my-2">
                                            <h4 className="text-base font-semibold text-[#1b4ea8]">
                                              Due Date:
                                            </h4>
                                            <p className="offerp">
                                              {
                                                jobDetails?.details
                                                  ?.expected_delivery_date
                                              }
                                            </p>

                                            {/* {deliveryhours && (
                                          <p className="colorsec">
                                            {deliveryhoursvalue} hours away
                                          </p>
                                        )}

                                        {deliverydatevalue && (
                                          <p
                                            className={
                                              deliverydata == 1
                                                ? "colorsec"
                                                : "threeDaysAway"
                                            }
                                          >
                                            {deliverydata} days away
                                          </p>
                                        )} */}
                                          </div>
                                        </div>
                                        <div className="my-2">
                                          <button
                                            className="btn btn-primary"
                                            onClick={mainNegotiate}
                                            type="button"
                                          >
                                            Negotiate
                                          </button>
                                        </div>
                                      </div>

                                      {proposedPrice && !show && (
                                        <>
                                          <div className="flex">
                                            <div className="w-full flex justify-between gap-3 p-2 border-dashed border-4 rounded-xl">
                                              <div>
                                                <span className="text-base font-semibold text-[#1b4ea8]">
                                                  Proposed Price{" "}
                                                </span>
                                                <p>${proposedPrice}</p>
                                              </div>
                                              <div className="">
                                                <h4 className="text-base font-semibold text-[#1b4ea8]">
                                                  Proposed Due Date
                                                </h4>
                                                <p>
                                                  {formateISODateToLocaleString(
                                                    proposedDate
                                                  )}
                                                </p>
                                              </div>
                                              <div className="">
                                                <button
                                                  className="text-[#d14f4f]"
                                                  onClick={clearMainNegotiate}
                                                  type="button"
                                                >
                                                  Clear
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <>
                                      {show ? (
                                        <>
                                          <div className="w-full max-w-[400px] ">
                                            <div className="border-4 border-dashed rounded-xl p-5">
                                              <div className="grid grid-cols-6 mb-4">
                                                <div className="col-span-2 ">
                                                  <div
                                                    className={
                                                      errors1.number
                                                        ? "Offer_A_P error flex gap-2"
                                                        : ""
                                                    }
                                                  >
                                                    <h4 className="text-base font-semibold text-[#1b4ea8]">
                                                      Offer Price{" "}
                                                    </h4>
                                                    <p>
                                                      $
                                                      {
                                                        jobDetails?.details
                                                          ?.price
                                                      }
                                                    </p>
                                                  </div>
                                                </div>

                                                <div className="col-span-4">
                                                  <h4 className="text-base font-semibold text-black">
                                                    Proposed Price
                                                  </h4>
                                                  <div className="flex gap-2">
                                                    <div
                                                      className={
                                                        errors1.number
                                                          ? "flex gap-2   error"
                                                          : "flex gap-2"
                                                      }
                                                    >
                                                      <input
                                                        className="input-style"
                                                        type="number"
                                                        placeholder="0.00"
                                                        id=""
                                                        value={number}
                                                        onInput={(e) => {
                                                          setErrors({
                                                            ...errors1,
                                                            number: null,
                                                          });
                                                          // if (
                                                          //   e.target.value
                                                          //     .length >
                                                          //   e.target.maxLength
                                                          // )
                                                          //   e.target.value =
                                                          //     e.target.value?.slice(
                                                          //       0,
                                                          //       e.target
                                                          //         .maxLength
                                                          //     );
                                                        }}
                                                        maxLength={8}
                                                        onKeyDown={
                                                          blockInvalidChar
                                                        }
                                                        onChange={handleChange1}
                                                      />
                                                      {errors1.number && (
                                                        <span>
                                                          {errors1.number ??
                                                            "valid"}
                                                        </span>
                                                      )}

                                                      <span className="text-2xl">
                                                        $
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {/* {per25 && (
                                                <>
                                                  {" "}
                                                  <p className="proposingtext proposingtext1">
                                                    You’re proposing a price
                                                    over {printPreData}% higher
                                                    check.
                                                  </p>
                                                </>
                                              )} */}
                                              {/* {per50 && (
                                                <>
                                                  {" "}
                                                  <p className="proposingtext colorsec proposingtext50 ">
                                                    You’re proposing a price
                                                    over {printPreData}% higher.
                                                    Your Proposal is less likely
                                                    to be accepted.
                                                  </p>
                                                </>
                                              )}
                                              {datepricewarning && (
                                                <>
                                                  {" "}
                                                  <p className="proposingtext colorsec proposingtext1">
                                                    You’re proposing a price
                                                    over {printPreData}% higher.
                                                    Consider proposing a closer
                                                    due date.
                                                  </p>
                                                </>
                                              )} */}

                                              {/* <div className="Negotiatestates">
                                              <li
                                                onClick={() => handleDiv("1")}
                                                className="Negotiatestates1"
                                              >
                                                <p>
                                                  +10%
                                                  <br />
                                                  <span>{per10}</span>
                                                </p>
                                              </li>
                                              <li
                                                onClick={() => handleDiv("2")}
                                              >
                                                <p>
                                                  {" "}
                                                  +20%
                                                  <br />
                                                  <span>{per20}</span>
                                                </p>
                                              </li>
                                              <li
                                                onClick={() => handleDiv("3")}
                                              >
                                                <p>
                                                  +30%
                                                  <br />
                                                  <span>{per30}</span>
                                                </p>
                                              </li>
                                              <li
                                                onClick={() => handleDiv("4")}
                                                className="Negotiatestates2"
                                              >
                                                <p>Custom</p>
                                              </li>
                                            </div> */}

                                              <div className="grid grid-cols-6">
                                                <div className="col-span-2">
                                                  <h4 className="text-base font-semibold text-[#1b4ea8]">
                                                    Due Date
                                                  </h4>
                                                  <p>
                                                    {
                                                      jobDetails?.details
                                                        ?.expected_delivery_date
                                                    }
                                                  </p>
                                                  {/* {deliveryhours && (
                                                        <p className="colorsec">
                                                          {deliveryhoursvalue}{" "}
                                                          hours away
                                                        </p>
                                                      )}

                                                      {deliverydatevalue && (
                                                        <p
                                                          className={
                                                            deliverydata == 1
                                                              ? "colorsec"
                                                              : "threeDaysAway"
                                                          }
                                                        >
                                                          {deliverydata} days
                                                          away
                                                        </p>
                                                      )} */}
                                                </div>
                                                <div
                                                  className={
                                                    errors1.date
                                                      ? "col-span-4 error"
                                                      : "col-span-4"
                                                  }
                                                >
                                                  <h4 className="text-base font-semibold">
                                                    Proposed Due Date
                                                  </h4>
                                                  <>
                                                    <CustomDateRangePicker
                                                      handleChange={
                                                        handleChange
                                                      }
                                                    />
                                                  </>
                                                  {errors1.date && (
                                                    <span>
                                                      {errors1.date ?? "valid"}
                                                    </span>
                                                  )}

                                                  {/* <div>{showData ? <h1>{daysData} days</h1> : null}</div> */}
                                                </div>
                                                {datewarning && (
                                                  <p className="proposingtext colorsec proposingdayd">
                                                    You’re proposing a due date
                                                    more than 7 days away. Your
                                                    Proposal is less likely to
                                                    be accepted
                                                  </p>
                                                )}
                                              </div>
                                              <div className="flex gap-5 mt-4">
                                                <button
                                                  className="btn btn-primary"
                                                  onClick={mainProposedCancel}
                                                >
                                                  Cancel
                                                </button>
                                                <button
                                                  className="btn btn-primary"
                                                  onClick={savevalue}
                                                  type="button"
                                                >
                                                  Save
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ) : null}
                                    </>

                                    <div className="mt-2">
                                      <h4 className="text-lg font-semibold">
                                        Attach Files{" "}
                                        <span className="text-base text-[#A0A0A0]">
                                          Optional
                                        </span>
                                      </h4>
                                      <p className="text-sm">
                                        You may attach up to 10 files under the
                                        size of 10MB each. Include work samples
                                        or other documents to support your
                                        application.
                                      </p>

                                      <div
                                        className="mt-2 cursor-pointer"
                                        {...getRootProps()}
                                      >
                                        <input {...getInputProps()} />
                                        <p className="flex gap-1 text-base font-semibold text-[#2472fc]">
                                          <FileUploadOutlined />
                                          Attach Files
                                        </p>
                                      </div>
                                      {/* <aside style={thumbsContainer}>
                                          {thumbs}
                                        </aside> */}
                                    </div>

                                    {/* Images */}

                                    {/* URL */}
                                    <h4 className="my-2 text-lg font-semibold text-black">
                                      or include a URL
                                    </h4>
                                    {formSampleUrls.map((element, index) => (
                                      <div className="form-inline" key={index}>
                                        {element && (
                                          <div className="flex justify-between w-full max-w-[400px]">
                                            <div className="flex gap-2">
                                              <InsertLink />
                                              <a className="adifecttesturl">
                                                {element}
                                              </a>
                                            </div>
                                            <div
                                              className=""
                                              onClick={(e) =>
                                                removeFormFieldsSampleUrls(e)
                                              }
                                            >
                                              <Delete></Delete>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))}

                                    <div
                                      className={
                                        errors1.formsampleImgUrls
                                          ? "enterUrlLinkButton1 enterUrlLinkButtonnew error"
                                          : errors1.sampleurl
                                          ? "error enterUrlLinkButtonnew"
                                          : "enterUrlLinkButton1 enterUrlLinkButtonnew"
                                      }
                                    >
                                      <input
                                        className="input-style"
                                        type="text"
                                        value={sampleimgUrl}
                                        placeholder="Enter URL"
                                        onChange={(e) => {
                                          setsampleImgUrl(e.target.value);
                                          setErrors({
                                            ...errors1,
                                            formsampleImgUrls: null,
                                            url: null,
                                          });
                                        }}
                                        onKeyPress={(e) => {
                                          if (e.key === "Enter") {
                                            handleChangesampleUrls(e);
                                          }
                                        }}
                                      />

                                      <div className="flex justify-between gap-1 mt-1 cursor-pointer">
                                        <a
                                          onClick={(e) => {
                                            handleChangesampleUrls(e);
                                          }}
                                          className=" text-[#0d6efd]"
                                        >
                                          <Add />
                                          Add More
                                        </a>
                                        <div>
                                          <span className="text-[#D14F4F]">
                                            {errors1.sampleurl ?? ""}
                                          </span>
                                          <div
                                            className={
                                              errors1.formsampleImgUrls
                                                ? "error"
                                                : ""
                                            }
                                          >
                                            <span className="text-[#D14F4F]">
                                              {errors1.formsampleImgUrls
                                                ? errors1.formsampleImgUrls
                                                : ""}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Comments */}
                                    <>
                                      <div className="my-2">
                                        <h4 className="text-lg font-semibold text-black">
                                          Comments
                                          <span className="OptionalHaveQuest"></span>
                                        </h4>
                                      </div>

                                      <div
                                        className={
                                          errors1.coverletter
                                            ? "mb-1 error"
                                            : "mb-1"
                                        }
                                      >
                                        <textarea
                                          onChange={(e) => {
                                            setcoverletter(e.target.value);
                                            setErrors({
                                              ...errors1,
                                              coverletter: null,
                                            });
                                          }}
                                          className="input-style h-[90px] custom-scrollbar"
                                          // type="text"
                                          placeholder="Enter your comments"
                                        />
                                        <span className="flex justify-end text-[#D14F4F]">
                                          {errors1.coverletter ?? ""}
                                        </span>
                                      </div>
                                    </>

                                    <div className="">
                                      <h4 className="text-lg font-semibold">
                                        Have a question?{" "}
                                        <span className="text-base text-[#A0A0A0]">
                                          Optional
                                        </span>
                                      </h4>
                                      <p className="text-sm font-medium mb-2">
                                        Questions will be public on the Job
                                        Detail page.
                                      </p>
                                    </div>
                                    <div className="">
                                      <textarea
                                        onChange={(e) => {
                                          setquestion(e.target.value);
                                        }}
                                        className="input-style h-[90px]"
                                        // type="text"
                                        placeholder="Ask your question"
                                      />
                                    </div>

                                    <div className="">
                                      <div className="mt-2 flex gap-4">
                                        <button
                                          className="btn btn-outline"
                                          onClick={handleClose}
                                        >
                                          Cancel
                                        </button>
                                        {/* <Link
                                        className="create-account-btn border-radius"
                                        to="/jobs/list"
                                      >
                                        Cancel
                                      </Link> */}
                                        <button
                                          className="btn btn-primary"
                                          value="Send message"
                                          onClick={(e) => {
                                            validateSubmit(e);
                                          }}
                                          type="submit"
                                        >
                                          Apply Now
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          {/* NEW APPLY JOB DIALOG BOX END SEP 13 */}
                          {freshJob?.data?.data?.job_applied_status ==
                          "True" ? (
                            <span className="jobappied">Job Applied</span>
                          ) : (
                            <Link
                              to={`/jobs/apply/${freshJob?.data?.data?.id}`}
                            >
                              {/* <button
                                type="button"
                                className="btn btn-primary border-radius"
                              >
                                Apply Now
                              </button> */}
                            </Link>
                          )}
                          {/* <Link
                            className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                            to={`/jobs/apply/${jobId}`}
                          >
                            {" "}
                            Submit a Proposal{" "}
                          </Link> */}
                        </>
                        {/* <h3 className="jobalready">job already applied !</h3>
              <Link to={`/jobs/apply/${freshJob?.id}`}>
              <button
                  type="button"
                  hidden={
                    userData?.user?.role == Object.keys(ROLE)[0] ||
                    userData?.user?.role == Object.keys(ROLE)[2]
                  }
                  
                  className="btn btn-primary Small border-radius Small_new_bt"
                >
                 Submit a Proposal 
                </button>
             </Link> */}
                      </div>
                      {/* {JSON.stringify(freshJob)} */}
                      <div className="jobListDetailsAreaAndTaskbox">
                        <div className="RemoteText RemoteTextEightyWidth">
                          <p
                            className="text-base font-semibold text-[#A0A0A0] gap-2 my-4"
                            onClick={() =>
                              openPopup(`${freshJob?.data?.data?.id}`)
                            }
                          >
                            Posted on:{" "}
                            {formateISODateToLocaleString(
                              freshJob?.data?.data?.created
                            )}
                          </p>
                          <p
                            className="text-base font-normal cursor-pointer"
                            onClick={() =>
                              openPopup(`${freshJob?.data?.data?.id}`)
                            }
                          >
                            {freshJob?.data?.data?.description?.substring(
                              0,
                              300
                            )}
                            .....
                          </p>
                          <div
                            className="my-2"
                            onClick={() =>
                              openPopup(`${freshJob?.data?.data?.id}`)
                            }
                          >
                            <span className="text-[#A0A0A0] text-base font-semibold flex gap-2">
                              Budget:{" "}
                              {freshJob?.data?.data?.price && (
                                <>
                                  <h5>${freshJob?.data?.data?.price}</h5>
                                </>
                              )}
                              {!freshJob?.data?.data?.price && (
                                <>
                                  <h3 className="colorOnNA">N/A</h3>
                                </>
                              )}
                            </span>
                          </div>
                          <div
                            className="Budget-Title  Skilldashbordnew"
                            onClick={() =>
                              openPopup(`${freshJob?.data?.data?.id}`)
                            }
                          >
                            <span className="text-[#A0A0A0] text-base font-semibold flex gap-2">
                              Level:{" "}
                              {freshJob?.data?.data?.level?.level_name && (
                                <>
                                  <h5>
                                    {freshJob?.data?.data?.level?.level_name}
                                  </h5>
                                </>
                              )}
                              {!freshJob?.data?.data?.level?.level_name && (
                                <>
                                  <h3 className="colorOnNA">N/A</h3>
                                </>
                              )}
                            </span>
                          </div>
                          {freshJob?.data?.data?.skills?.length > 0 && (
                            <>
                              <h5 className="text-[#A0A0A0] text-base font-semibold">
                                Skills:{" "}
                              </h5>
                              <div className="Skill mt-2 flex flex-wrap gap-2">
                                {freshJob?.data?.data?.skills?.map(
                                  (freshJob, index) => (
                                    <div key={index}>
                                      <BadgeUI
                                        variant="primary"
                                        customClass="max-w-max text-sm font-semibold"
                                      >
                                        {freshJob.skill_name}
                                        {/* <Link to="#">{freshJob.skill_name}</Link> */}
                                      </BadgeUI>
                                    </div>
                                  )
                                )}
                                {freshJob?.data?.data?.skills?.length < 1 && (
                                  <>
                                    <h3 className="text-[#A0A0A0] text-base font-semibold">
                                      N/A
                                    </h3>
                                  </>
                                )}
                              </div>
                            </>
                          )}

                          <div
                            className="Skill mt-2 Skilldashbordnew"
                            onClick={() =>
                              openPopup(`${freshJob?.data?.data?.id}`)
                            }
                          >
                            {freshJob?.data?.data?.tags?.length > 0 && (
                              <>
                                <h5 className="text-[#A0A0A0] text-base font-semibold">
                                  Tags:{" "}
                                </h5>
                                <div className="Skill mt-2 flex flex-wrap gap-2">
                                  {freshJob?.data?.data?.tags
                                    ?.split(",")
                                    ?.map((tag, index) => (
                                      <div key={index}>
                                        <BadgeUI
                                          variant="primary"
                                          customClass="max-w-max text-sm font-semibold"
                                        >
                                          {tag}
                                        </BadgeUI>
                                      </div>
                                    ))}
                                  {freshJob?.data?.data?.tags?.length < 1 && (
                                    <>
                                      <h3 className="text-[#A0A0A0] text-base font-semibold">
                                        N/A
                                      </h3>
                                    </>
                                  )}
                                </div>
                                {/* {freshJob?.data?.data?.tags
                                  ?.split(",")
                                  .map((tag, index) => (
                                    <li key={index}>
                                      <Link to="#">{tag}</Link>
                                    </li>
                                  ))} */}
                                {/* {freshJob?.tags?.length < 1 && (
                              <>
                                <li>
                                  <h3 className="colorOnNA">N/A</h3>
                                </li>
                              </>
                            )} */}
                              </>
                            )}
                          </div>
                        </div>
                        {freshJob?.data?.data?.jobtasks_job?.length > 0 && (
                          <div className="taskBoxJobListCard1">
                            <div className="taskBoxJobListCardFirstHead">
                              <div className="taskBoxJobListCardFirstNoBg">
                                <h3 className="taskMember1">Task</h3>
                                <h3 className="taskMemberd2">Date</h3>
                              </div>
                              <div className="taskBoxJobListCardDetailsDate1">
                                {freshJob?.data?.data?.jobtasks_job?.map(
                                  (item) => {
                                    return (
                                      <>
                                        <div className="tasksecdiv1">
                                          <div className="tasktitlesec1">
                                            {item?.title}
                                          </div>
                                          <div className="tasktitlesec2">
                                            {item?.due_date}
                                          </div>
                                        </div>
                                      </>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          </div>
        </>
      ) : null}

      <Dialog
        className="job-custom_popup"
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={closePopup}
        aria-describedby="alert-dialog-slide-description "
      >
        <DialogContent>
          <div className="Topallpage">
            <div className="MarketingDetails-popup ContentDiv border-radius">
              <div className="Marketingcamaign">
                <div className="CategorylistName">
                  <div className="jobdes">
                    <h2>{jobDetails?.details?.data?.title}</h2>
                  </div>

                  <div className="FreshBtn">
                    <>
                      {jobDetails?.details?.job_applied_status == "True" ? (
                        <span className="jobappied">Job Applied</span>
                      ) : (
                        <Link to={`/jobs/apply/${jobId}`}>
                          Apply Now
                          <button type="button" className="btn btn-primary">
                            Submit a Proposal
                          </button>
                        </Link>
                      )}
                    </>
                  </div>
                </div>

                <p className="text-base text-[#A0A0A0] font-semibold my-2">
                  Due on: {jobDetails?.details?.expected_delivery_date}
                </p>
                <div className="jobdetailsInProgress">
                  <Link className="jobdetailsInProgressBtn" to="">
                    In Progress
                  </Link>
                </div>
                <p className="text-base font-medium my-2">
                  {jobDetails?.details?.description}
                </p>

                {/* Job Documents */}
                {/* <h5 className="">Provided Media:</h5>
                {(jobDetails?.details?.images?.length > 0 ||
                  jobvideoDocuments?.length > 0) && (
                  <>
                    <h6>Job Documents</h6>
                  </>
                )} */}

                <h5 className="ProvidedTitle">Provided Media:</h5>
                <div className="mediaimg">
                  {jobDetails?.details?.images?.map((item, index) => (
                    <div key={index}>
                      {item.job_images
                        ?.slice(
                          ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
                        )
                        .split(".")
                        .pop()
                        .match(/(jpg|jpeg|png|gif)$/i) && (
                        <a target="_blank" href={`${item?.job_images}`}>
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
                {jobDetails?.details?.images?.map((item, index) => (
                  <div key={index}>
                    {!item.job_images
                      ?.slice(
                        ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
                      )
                      .split(".")
                      .pop()
                      .match(/(jpg|jpeg|png|gif)$/i) && (
                      <p className="mt-3 f-16" key={index}>
                        <img className="mr-2" src="/img/Document.png" alt="" />
                        <a
                          // href={item.job_images}
                          href={`${item?.job_images}`}
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

                {jobDetails?.details?.images?.length < 1 && <div>N/A</div>}
                {(additionalJobDocuments?.length > 0 ||
                  additionalvideoJobDocuments?.length > 0) && (
                  <>
                    <h6>Additional Job Documents</h6>
                  </>
                )}

                <div className="mediaimg Providedmediaimg">
                  {additionalJobDocuments?.map((item, index) => (
                    <div key={index}>
                      <a
                        // index_item={index}
                        target="_blank"
                        href={`${item}`}
                        // href={item}
                      >
                        <li key={index}>
                          <img
                            className=""
                            src={`${jobSampleDocumentsThumbs[index]}`}
                            alt=""
                          />
                        </li>
                      </a>
                    </div>
                  ))}

                  {additionalvideoJobDocuments?.map((item, index) => (
                    <div key={index}>
                      <video className="videounderagency" controls>
                        <source
                          src={`${jobSamplevideoDocumentsThumbs[index]}`}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="b-top" />
              <table>
                <tr className="Pricetable">
                  <td>
                    <h5 className="colortype">Job Type:</h5>
                  </td>
                  <td>
                    <p className="fixedpriceDetail">
                      {jobDetails?.details?.get_jobType_details}
                    </p>
                  </td>
                  <td>
                    <h5 className="colortype">Industry:</h5>
                  </td>
                  <td>
                    <p className="fixedpriceDetail">
                      {jobDetails?.details?.industry?.industry_name && (
                        <>jobDetails?.industry?.industry_name</>
                      )}
                      {!jobDetails?.details?.industry?.industry_name && (
                        <>
                          <h3 className="colorOnNA">N/A</h3>
                        </>
                      )}
                    </p>
                  </td>
                </tr>
                <tr className="Pricetable">
                  <td>
                    <h5 className="colortype">Offered Price:</h5>
                  </td>
                  <td>
                    <p className="fixedpriceDetail">
                      ${jobDetails?.details?.price}
                    </p>
                  </td>
                  <td>
                    <h5 className="colortype">Level:</h5>
                  </td>
                  <td>
                    <p className="fixedpriceDetail">
                      {jobDetails?.details?.level?.level_name}
                    </p>
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
                      {jobDetails?.details?.company
                        ? jobDetails?.details?.company?.name
                        : "N/A"}
                    </p>
                  </td>
                </tr>
              </table>
              <hr className="b-top" />
              <div className="Skill">
                <h5 className="skillsjobde mb-4">Skills:</h5>
                {jobDetails?.details?.skills?.length > 0 &&
                  jobDetails?.details?.skills?.map((item, index) => (
                    <BadgeUI variant="primary" key={index}>
                      {item?.skill_name}
                    </BadgeUI>
                  ))}
                {jobDetails?.details?.details?.skills?.length < 1 && (
                  <>
                    <li>
                      <h3 className="colorOnNA">N/A</h3>
                    </li>
                  </>
                )}
              </div>
              <div className="Skill">
                <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                {jobDetails?.details?.tags?.length > 0 &&
                  jobDetails?.details?.tags?.split(",")?.map((tag, index) => (
                    <BadgeUI variant="primary" key={index}>
                      {tag}
                    </BadgeUI>
                  ))}
                {jobDetails?.details?.tags?.length < 1 && (
                  <>
                    <li>
                      <h3 className="colorOnNA">N/A</h3>
                    </li>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={closePopup}>Close</Button> */}
          <button className="btn btn-primary" onClick={closePopup}>
            Close
          </button>
        </DialogActions>
      </Dialog>

      <div className=" grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="">
          <CreatorDashboardInProgress />
        </div>
        <div className="">
          <CreatorDashboardInReview />
        </div>{" "}
      </div>
    </div>
  );
};

export default CreatorDashboard;
