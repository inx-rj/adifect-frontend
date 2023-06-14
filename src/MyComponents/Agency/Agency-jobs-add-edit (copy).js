import React, { useEffect, useState, useRef, useCallback } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../../environment";
import { listAllCategories } from "../../redux/actions/category-actions";
import { listAllLevels } from "../../redux/actions/level-actions";
import { listAllSkills } from "../../redux/actions/skill-actions";
import { listAllIndustries } from "../../redux/actions/industry-actions";
// import { listAllCompanies } from "../../redux/actions/company-actions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { validations } from "../../utils";
import swal from "sweetalert";
import moment from "moment";
import { getJobDetails, getRelatedJobs } from "../../redux/actions/job-actions";
import { useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import api from "../../utils/api";
import { listAllCompanies } from "../../redux/actions/Workflow-company-action";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function Agency_jobs_add_edit() {
  const { jobId } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  // const { loading } = useSelector((state) => state.loaderReducer);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const [files, setFiles] = useState([]);

  const imageMimeType = /image\/(svg|eps|png|jpg|jpeg|gif)/i;

  const maxImageFileSize = 10000000;

  const [fileGallery, setFileGallery] = useState([]);
  const [divid, setdivid] = useState("4");
  const [show, setShow] = useState(false);
  const [textchange, settextchange] = useState(false);
  const [showdraft, setShowdraft] = useState(true);
  // const [showtemplate, setShowtemplate] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  const [taskid, settaskid] = useState("");
  const [sampleimgUrl, setsampleImgUrl] = useState("");

  const {
    getRootProps: getRootfileProps,
    getInputProps: getInputfileProps,
    isDragActive,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg+xml": [],
      "image/gif": [],
    },
    onDrop: useCallback(
      (acceptedFiles) => {
        // console.log(acceptedFiles[0]);
        if (!acceptedFiles[0].type.match(imageMimeType)) {
          swal({
            title: "Error",
            text: "Image type is not valid",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
          });
        } else if (acceptedFiles[0].size > maxImageFileSize) {
          swal({
            title: "Error",
            text: "Max file size allowed is 10mb",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
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

  const [inputData, setInputData] = useState({
    title: "",
    due_date: "",
  });
  const [taskDueDate, setTaskDueDate] = useState(new Date());
  const [itemData, setItemData] = useState([]);

  const handleDelte = (id) => {
    const upDateItem = itemData.filter((elem, index) => {
      return index !== id;
    });
    setItemData(upDateItem);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, tasks: null });

    if (e.key === "Enter") {
      handleSubmit(e);
    }
    // console.log(inputData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData.title && taskDueDate) {
      const coverter = moment(taskDueDate).format("YYYY-MM-DD");
      setItemData([
        ...itemData,
        { title: inputData.title, due_date: coverter },
      ]);
      setInputData({ title: "", due_date: "" });
    } else {
    }
  };

  const {
    getRootProps: getRootGalleryProps,
    getInputProps: getInputGalleryProps,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg+xml": [],
      "image/gif": [],
    },
    onDrop: useCallback(
      (acceptedFiles) => {
        if (!acceptedFiles[0].type.match(imageMimeType)) {
          swal({
            title: "Error",
            text: "Image type is not valid",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
          });
        } else if (acceptedFiles[0].size > maxImageFileSize) {
          swal({
            title: "Error",
            text: "Max file size allowed is 10mb",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
          });
        } else {
          setFileGallery([
            ...fileGallery,
            ...acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                title: file.name,
              })
            ),
          ]);
        }
      },
      [fileGallery]
    ),
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  //  const yesterday = new Date(
  //   new Date().getTime() + 24  60  60 * 1000
  // ).toDateString();

  const yesterday = new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toDateString();

  const coverter = moment(yesterday).format("MM-DD-YYYY");

  const threeDay = new Date(
    new Date().setDate(new Date().getDate() + 4)
  ).toDateString();

  const coverter1 = moment(threeDay).format("MM-DD-YYYY");

  const sevenDay = new Date(
    new Date().setDate(new Date().getDate() + 8)
  ).toDateString();

  const coverter2 = moment(sevenDay).format("MM-DD-YYYY");

  const removesampleFile = (file) => () => {
    const newfileGallery = [...fileGallery];
    newfileGallery.splice(newfileGallery.indexOf(file), 1);
    setFileGallery(newfileGallery);
  };

  const thumbs = files.map((file) => (
    <div className="uplodeimgfiledev" style={thumb} key={file.name}>
      <div className="removeimgdevpage" style={thumbInner}>
        <img className="img-upload-item" src="/img/assertgallery.png" />
        <button onClick={removeFile(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
      </div>
    </div>
  ));

  const thumbs1 = fileGallery.map((file) => (
    <div style={thumb} className="uplodeimgfiledev" key={file.name}>
      <img className="img-upload-item" src="/img/assertgallery.png" />
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removesampleFile(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
      </div>
    </div>
  ));

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [jobDocuments, setJobDocuments] = useState();
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [price, setPrice] = useState();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setstatus] = useState();
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState(null);
  const [level, setlevel] = useState(null);
  const [tasks, settasks] = useState(null);
  const [taskvalue, settaskvalue] = useState(false);
  const [draft, setdraft] = useState(false);
  const [post, setpost] = useState("");
  const [job_type, setJobType] = useState("0");
  const [imageChanged, setImageChanged] = useState(false);
  const [templatename, setTemplatename] = useState();
  const [fileExtension, setFileExtension] = useState();
  const [fileNameDisplay, setFileNameDisplay] = useState();
  // const [company_type, setCompanyType] = useState();
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [company, setCompany] = useState(null);

  const [addedSkill, setAddedSkill] = useState(false);

  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };
  const [editFileExtension, setEditFileExtension] = useState();
  const [editJobDocuments, setEditJobDocuments] = useState();
  const [fileSampleExtension, setFileSampleExtension] = useState();
  const [jobSampleDocuments, setJobSampleDocuments] = useState();
  const [editJobSampleDocuments, setEditJobSampleDocuments] = useState();
  const [editFileSampleExtension, setEditFileSampleExtension] = useState();
  const [selectedSampleFile, setSelectedSampleFile] = useState();
  const [formSampleUrls, setFormSampleUrls] = useState([""]);
  const [fileNameSampleDisplay, setFileNameSampleDisplay] = useState();
  const [isShown, setIsShown] = useState(false);
  const [isShowntask, setIsShowntask] = useState(false);
  const [removeJobSampleDocuments, setRemoveJobSampleDocuments] = useState([]);
  const [formUrls, setFormUrls] = useState([""]);
  // const [editFileNameDisplay, setEditFileNameDisplay] = useState();
  const [removeJobDocuments, setRemoveJobDocuments] = useState([]);
  const [removetaskDocuments, setRemovetaskDocuments] = useState([]);
  // const [relatedJobsChange, setRelatedJobsChange] = useState(false);
  const [imageSampleChanged, setImageSampleChanged] = useState(false);
  const [isRelatedToPrevJob, setIsRelatedToPrevJob] = useState(false);
  const [errors, setErrors] = useState({
    title: null,
    description: null,
    price: null,
    tags: null,
    jobDocuments: null,
    category: null,
    deliveryDate: null,
    skills: null,
    job_type: null,
    formImgUrls: null,
    formsampleImgUrls: null,
    formUrls: null,
    formSampleUrls: null,
    template: null,
    tasks: null,
  });
  const [selectedFile, setSelectedFile] = useState();

  const imgRef = useRef(null);
  const imgSampleRef = useRef(null);
  const drop = useRef(null);
  const dropSample = React.useRef(null);

  // const [preview, setPreview] = useState();
  const { userData } = useSelector((state) => state.authReducer);
  const { loading: categoriesLoading, categoryData: categories } = useSelector(
    (state) => state.categoryReducer
  );
  const { levelsData } = useSelector((state) => state.levelReducer);
  const { skillsData } = useSelector((state) => state.skillReducer);
  const { industriesData } = useSelector((state) => state.industryReducer);
  const { companiesData } = useSelector((state) => state.companyReducer);
  const { relatedJobs: relatedJobsList } = useSelector(
    (state) => state.relatedJobsReducer
  );

  const { companyData, loading: stagesLoading } = useSelector(
    (state) => state.agencyCompanyReducer
  );

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const handleClicktask = (event) => {
    // 👇️ toggle shown state
    setIsShowntask((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const [isfiles, setisfiles] = useState(false);
  const [issamplefiles, setissamplefiles] = useState(false);

  const handleClickfiles = (event) => {
    setisfiles((current) => !current);
  };

  const handleClicksamplefiles = (event) => {
    setissamplefiles((current) => !current);
  };

  // const handlechange = (event, option) => {
  //   if (option) {
  //     settaskvalue(option.id);
  //   } else {
  //     settaskvalue();
  //   }
  // };

  const {
    loading: jobLoading,
    success,
    jobDetails,
  } = useSelector((state) => state.jobDetailsReducer);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);

  const [draftid, setdraftid] = useState();
  const [isOpenSkill, setIsOpenSkill] = useState(false);

  useEffect(() => {
    dispatch(listAllCompanies());
    window.scrollTo(0, 0);
  }, [success]);

  useEffect(() => {
    handleClickOpen3();
    const handler = () => {
      setIsOpen(false);
      setIsOpen1(false);
      setIsOpen2(false);
      setIsOpen3(false);
      setIsOpen4(false);
      setIsOpen5(false);
      setIsOpen6(false);
      setIsOpen7(false);
      setIsOpen8(false);
      setIsOpen9(false);
      setIsOpen10(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [addedSkill]);

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  // const [duedate, setduedate] = useState();
  const handleDiv = (id) => {
    if (id === "1") {
      setdivid("1");
      setDeliveryDate(yesterday);
    } else if (id === "2") {
      setdivid("2");
      setDeliveryDate(threeDay);
    } else if (id === "3") {
      setdivid("3");
      setDeliveryDate(sevenDay);
    } else if (id === "4") {
      setdivid("4");
    }
  };

  useEffect(() => {
    if (jobId) {
      setShow(true);
      // setShowdraft(false);
      settextchange(true);
      dispatch(getJobDetails(jobId));
      if (success) {
        if (jobDetails.status != 0) {
          setShowdraft(false);
        }
        setTitle(jobDetails.title);
        setDescription(jobDetails.description);
        // setFiles(jobDetails.images);
        // setJobSampleDocuments(jobDetails.images)
        setDeliveryDate(jobDetails.expected_delivery_date);
        setPrice(jobDetails.price);
        setlevel(jobDetails.level?.id);
        setJobType(jobDetails.job_type);
        setSkills(jobDetails.skills);
        setindustryname(jobDetails.industry);
        setdivid(jobDetails.due_date_index);
        const success = api.get(`${BACKEND_API_URL}job-draft`).then((res) => {
          const success = api
            .get(
              `${BACKEND_API_URL}agency/works-flow/?company=${jobDetails.company}`
            )
            .then((res) => {
              setapivalue(res.data);
            });
        });
        setworkflowdata(jobDetails.workflow);
        dispatch(getRelatedJobs(jobDetails.company));
        setRelatedJobs(jobDetails.related_jobs);
        setcompanyvalue(jobDetails.company);
        setItemData(jobDetails.jobtasks_job);
        setTemplatename(jobDetails.template_name);

        if (jobDetails.images[0]?.work_sample_image_name) {
          setissamplefiles(true);
        }

        if (jobDetails.images[0]?.job_image_name) {
          setisfiles(true);
        }

        if (jobDetails.related_jobs) {
          // setShow(true);
        }

        if (jobDetails.jobtasks_job[0]) {
          setIsShowntask(true);
        }

        if (jobDetails.image_url) {
          setisfiles(true);
          let newArray = jobDetails.image_url.split(",");
          setFormUrls(newArray);
        }
        if (jobDetails.sample_work_url) {
          setissamplefiles(true);
          let newArray = jobDetails.sample_work_url.split(",");
          setFormSampleUrls(newArray);
        }
        if (jobDetails.related_jobs?.length > 0) {
          setIsRelatedToPrevJob(true);
        }
        // setTags(jobDetails.tags);
        if (jobDetails.tags) {
          const tagsList = jobDetails.tags?.split(",");
          if (tagsList) {
            setTags(tagsList);
          }
        }
        if (jobDetails.images) {
          let newImages = jobDetails.images;
          newImages = newImages.filter((item) => item);
          setJobDocuments(newImages);
          let fileext = [];
          let s = [];
          let b = [];
          for (var i = 0; i < jobDetails.images.length; i++) {
            fileext.push(
              jobDetails.images[i].job_images?.slice(
                ((jobDetails.images[i].job_images.lastIndexOf(".") - 1) >>> 0) +
                  2
              )
            );
            // console.log(fileext);
            s.push(
              jobDetails.images[i].job_images?.slice(
                ((jobDetails.images[i].job_images.lastIndexOf("/") - 1) >>> 0) +
                  2
              )
            );
            b.push(jobDetails.images[i].job_images);
          }
          // console.log(s);
          b = b.filter((item) => item);
          s = s.filter((item) => item);
          fileext = fileext.filter((item) => item);
          imgRef.current = b;
          // console.log("imgRefcurrent", imgRef.current);
          setFileNameDisplay(s);
          setFileExtension(fileext);
        }
        if (jobDetails.images) {
          let newImages = jobDetails.images;
          newImages = newImages.filter((item) => item);
          setJobSampleDocuments(newImages);
          let fileext1 = [];
          let s1 = [];
          let b1 = [];
          for (var i = 0; i < jobDetails.images.length; i++) {
            fileext1.push(
              jobDetails.images[i].work_sample_images?.slice(
                ((jobDetails.images[i].work_sample_images?.lastIndexOf(".") -
                  1) >>>
                  0) +
                  2
              )
            );
            s1.push(
              jobDetails.images[i].work_sample_images?.slice(
                ((jobDetails.images[i].work_sample_images?.lastIndexOf("/") -
                  1) >>>
                  0) +
                  2
              )
            );
            b1.push(jobDetails.images[i].work_sample_images);
          }
          // console.log("s--", s);
          imgSampleRef.current = b1;
          // console.log("imgRefcurrent", imgRef.current);
          setFileNameSampleDisplay(s1);
          setFileSampleExtension(fileext1);
        }
      }
      // setEditFileNameDisplay([]);
      setEditFileSampleExtension([]);
      setEditFileExtension([]);
    } else {
      // const success = api.get(`${BACKEND_API_URL}job-draft`).then((res) => {
      //   const success = api
      //     .get(
      //       `${BACKEND_API_URL}agency/works-flow/?company=${res.data.company}`
      //     )
      //     .then((res) => {
      //       setapivalue(res.data);
      //     });
      //   setdraftid(res.data.id);
      //   if (res.data.id) {
      //     setShow(true);
      //     setTitle(res.data.title);
      //     setDescription(res.data.description);
      //     setworkflowdata(res.data.workflow);
      //     setDeliveryDate(res.data.expected_delivery_date);
      //     setPrice(res.data.price);
      //     setSkills(res.data.skills);
      //     setJobType(res.data.job_type);
      //     setindustryname(res.data.industry);
      //     dispatch(getRelatedJobs(res.data.company));
      //     setRelatedJobs(res.data?.related_jobs);
      //     setcompanyvalue(res.data?.company);
      //     setItemData(res.data.jobtasks_job);
      //     setTemplatename(res.data.template_name);
      //     setlevel(res.data.level?.id);
      //     setdivid(res.data.due_date_index);
      //     if (res.data.related_jobs) {
      //       // setShow(true);
      //     }
      //     if (res.data.jobtasks_job[0]) {
      //       setIsShowntask(true);
      //     }
      //     if (res.data?.tags) {
      //       const tagsList = res.data?.tags?.split(",");
      //       if (tagsList) {
      //         setTags(tagsList);
      //       }
      //     }
      //     if (res.data.image_url) {
      //       setisfiles(true);
      //       let newArray = res.data.image_url.split(",");
      //       setFormUrls(newArray);
      //     }
      //     if (res.data.sample_work_url) {
      //       setissamplefiles(true);
      //       let newArray = res.data.sample_work_url.split(",");
      //       setFormSampleUrls(newArray);
      //     }
      //     if (res.data.related_jobs?.length > 0) {
      //       setIsRelatedToPrevJob(true);
      //     }
      //     if (res.data?.images) {
      //       // setisfiles((current) => !current);
      //       let newImages = res.data?.images;
      //       newImages = newImages.filter((item) => item);
      //       setJobDocuments(newImages);
      //       let fileext = [];
      //       let s = [];
      //       let b = [];
      //       for (var i = 0; i < res.data?.images.length; i++) {
      //         fileext.push(
      //           res.data?.images[i].job_images?.slice(
      //             ((res.data?.images[i].job_images.lastIndexOf(".") - 1) >>>
      //               0) +
      //               2
      //           )
      //         );
      //         console.log(fileext);
      //         s.push(
      //           res.data?.images[i].job_images?.slice(
      //             ((res.data?.images[i].job_images.lastIndexOf("/") - 1) >>>
      //               0) +
      //               2
      //           )
      //         );
      //         b.push(res.data?.images[i].job_images);
      //       }
      //       console.log(s);
      //       b = b.filter((item) => item);
      //       s = s.filter((item) => item);
      //       fileext = fileext.filter((item) => item);
      //       imgRef.current = b;
      //       // console.log("imgRefcurrent", imgRef.current);
      //       setFileNameDisplay(s);
      //       setFileExtension(fileext);
      //     }
      //     if (res.data.images[0].work_sample_image_name) {
      //       setissamplefiles(true);
      //     }
      //     if (res.data.images[0].job_image_name) {
      //       setisfiles(true);
      //     }
      //     if (res.data?.images) {
      //       // setisfiles((current) => !current);
      //       let newImages = res.data.images;
      //       newImages = newImages.filter((item) => item);
      //       setJobSampleDocuments(newImages);
      //       let fileext1 = [];
      //       let s1 = [];
      //       let b1 = [];
      //       for (var i = 0; i < res.data.images.length; i++) {
      //         fileext1.push(
      //           res.data?.images[i].work_sample_images?.slice(
      //             ((res.data?.images[i].work_sample_images?.lastIndexOf(".") -
      //               1) >>>
      //               0) +
      //               2
      //           )
      //         );
      //         s1.push(
      //           res.data?.images[i].work_sample_images?.slice(
      //             ((res.data?.images[i].work_sample_images?.lastIndexOf("/") -
      //               1) >>>
      //               0) +
      //               2
      //           )
      //         );
      //         b1.push(res.data.images[i].work_sample_images);
      //       }
      //       // console.log("s--", s);
      //       imgSampleRef.current = b1;
      //       // console.log("imgRefcurrent", imgRef.current);
      //       setFileNameSampleDisplay(s1);
      //       setFileSampleExtension(fileext1);
      //     }
      //   }
      // });
    }
    // setEditFileNameDisplay([]);
    setEditFileSampleExtension([]);
    setEditFileExtension([]);
  }, [success]);
  useEffect(() => {
    dispatch(listAllCategories());
    dispatch(listAllLevels());
    dispatch(listAllSkills());
    dispatch(listAllIndustries());
    dispatch(listAllCompanies());
  }, [addedSkill]);

  // useEffect(() => {
  //   dispatch(getRelatedJobs());
  // }, [title]);

  useEffect(() => {
    // const success = await api.get(`${BACKEND_API_URL}job-template`).then((res) => {
    //   settemplatevalue(res.data);
    // });

    const tasks = api.get(`${BACKEND_API_URL}job-task`).then((res) => {
      settasks(res.data);
    });

    const industry = api
      .get(`${BACKEND_API_URL}agency/industries`)
      .then((res) => {
        setindustryvalue(res.data);
      });
  }, []);

  const downloadFile = (blob, fileNameDownload, v) => {
    if (v === "add") {
      // console.log("blob--", blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileNameDownload;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
    if (v === "edit") {
      // console.log("blobedit--", blob);
      const file = new Blob([blob], { type: "application/pdf" });
      const url = window.URL.createObjectURL(file);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileNameDownload;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  const downloadSampleFile = (blob, fileNameSampleDownload, v) => {
    if (v === "add") {
      // console.log("blob--", blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileNameSampleDownload;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
    if (v === "edit") {
      // console.log("blobedit--", blob);
      const file = new Blob([blob], { type: "application/pdf" });
      const url = window.URL.createObjectURL(file);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileNameSampleDownload;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const [Workflowdata, setworkflowdata] = useState(null);
  const [Workflowvalue, setworkflowvalue] = useState(null);

  const [companyvalue, setcompanyvalue] = useState(null);
  const [templatedata, settemplatedata] = useState("1");
  const [templatevalue, settemplatevalue] = useState(null);
  const [industryvalue, setindustryvalue] = useState(null);
  const [industryname, setindustryname] = useState(null);
  const [apivalue, setapivalue] = useState(null);

  const handleClickOpen3 = () => {};

  const removeDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    if (v == "icon") {
      const s = jobDocuments.filter((item, index) => index !== e);
      const s1 = imgRef.current.filter((item, index) => index !== e);
      setJobDocuments(s);
      imgRef.current = s1;
      return;
    }
    if (v == "image") {
      // console.log("e2--", e);
      const s = jobDocuments.filter((item, index) => index !== e);
      setJobDocuments(s);
      return;
    }
    if (v == "data") {
      // console.log("e3--", e);
      // const s = jobDocuments.filter((item, index) => index !== e);
      // setJobDocuments(s);
      setJobDocuments(jobDocuments.filter((el, i) => i !== e));
      setFileExtension(fileExtension.filter((el, i) => i !== e));
      setFileNameDisplay(fileNameDisplay.filter((el, i) => i !== e));
      return;
    }
  };
  const removeSampleDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    if (v == "icon") {
      const s = jobSampleDocuments.filter((item, index) => index !== e);
      const s1 = imgSampleRef.current.filter((item, index) => index !== e);
      setJobSampleDocuments(s);
      imgSampleRef.current = s1;
      return;
    }
    if (v == "image") {
      // console.log("e2--", e);
      const s = jobSampleDocuments.filter((item, index) => index !== e);
      setJobSampleDocuments(s);
      return;
    }
    if (v == "data") {
      // console.log("e3--", e);
      // const s = jobDocuments.filter((item, index) => index !== e);
      // setJobDocuments(s);
      setJobSampleDocuments(jobSampleDocuments.filter((el, i) => i !== e));
      setFileSampleExtension(fileSampleExtension.filter((el, i) => i !== e));
      setFileNameSampleDisplay(
        fileNameSampleDisplay.filter((el, i) => i !== e)
      );
      return;
    }
  };
  const removeEditDocument = (e, v) => {
    setImageChanged(true);
    // console.log("e-", e);
    // console.log("v-", v);
    if (v == "icon") {
      setEditJobDocuments(editJobDocuments.filter((el, i) => i !== e));
      setEditFileExtension(editFileExtension.filter((el, i) => i !== e));
      // setEditFileNameDisplay(editFileNameDisplay.filter((el, i) => i !== e));
      const s1 = imgRef.current.filter((item, i) => i !== e);
      imgRef.current = s1;
      // console.log("imgRef--", imgRef);
      // console.log("editFileExtension --", editFileExtension);
      return;
    }
    if (v == "image") {
      setEditJobDocuments(editJobDocuments.filter((el, i) => i !== e));
      const s1 = imgRef.current.filter((item, i) => i !== e);
      imgRef.current = s1;
      setEditFileExtension(editFileExtension.filter((el, i) => i !== e));
      // setEditFileNameDisplay(editFileNameDisplay.filter((el, i) => i !== e));
      // setSelectedFile(selectedFile.filter((el, i) => i !== e));
      return;
    }
  };
  const removeEditSampleDocument = (e, v) => {
    setImageSampleChanged(true);
    // console.log("e-", e);
    // console.log("v-", v);
    if (v == "icon") {
      setEditJobSampleDocuments(
        editJobSampleDocuments.filter((el, i) => i !== e)
      );
      setEditFileSampleExtension(
        editFileSampleExtension.filter((el, i) => i !== e)
      );
      // setEditFileNameDisplay(editFileNameDisplay.filter((el, i) => i !== e));
      const s1 = imgSampleRef.current.filter((item, i) => i !== e);
      imgSampleRef.current = s1;

      // console.log("imgRef--", imgRef);
      // console.log("editFileExtension --", editFileExtension);
      return;
    }
    if (v == "image") {
      setEditJobSampleDocuments(
        editJobSampleDocuments.filter((el, i) => i !== e)
      );
      const s1 = imgSampleRef.current.filter((item, i) => i !== e);
      imgSampleRef.current = s1;
      setEditFileSampleExtension(
        editFileSampleExtension.filter((el, i) => i !== e)
      );
      // setEditFileNameDisplay(editFileNameDisplay.filter((el, i) => i !== e));
      // setSelectedFile(selectedFile.filter((el, i) => i !== e));
      return;
    }
  };

  const removeNewDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    // setJobDocuments(jobDocuments.filter((el, i) => i !== e));
    const s1 = imgRef.current.filter((item, i) => i !== e);
    imgRef.current = s1;
    setFileExtension(fileExtension.filter((el, i) => i !== e));
    return;
  };
  const removeNewSampleDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    // setJobDocuments(jobSampleDocuments.filter((el, i) => i !== e));
    const s1 = imgSampleRef.current.filter((item, i) => i !== e);
    imgSampleRef.current = s1;
    setFileSampleExtension(fileSampleExtension.filter((el, i) => i !== e));
    return;
  };

  const onSelectFile = (e) => {
    let imageList = [];
    let previewImages = [];
    let fileext = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.target.files[i].name.split(".").at(-1);
      const allowedFileTypes = ["eps"];

      if (
        !e.target.files[i].type.match(imageMimeType) &&
        !allowedFileTypes.includes(fileExtension)
      ) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return;
        // } else if (!e.target.files[i].type.match(imageMimeType)) {
        //   swal({
        //     title: "Error",
        //     text: "Image type is not valid1",
        //     className: "errorAlert",
        //     icon: "/img/ErrorAlert.png",
        //     buttons: false,
        //     timer: 1500,
        //   });
        // return;
      } else if (e.target.files[i]?.size > maxImageFileSize) {
        swal({
          title: "Error",
          text: "Max file size allowed is 10mb",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return;
      } else {
        setImageChanged(true);
        previewImages.push(URL.createObjectURL(e.target.files[i]));
        imageList.push(e.target.files[i]);
        fileext.push(
          e.target.files[i]?.name?.slice(
            ((e.target.files[i]?.name.lastIndexOf(".") - 1) >>> 0) + 2
          )
        );
      }
    }
    // if (!jobId) {
    //   // setJobDocuments(imageList);
    //   setFileExtension(fileext);
    // } else {
    //   setEditJobDocuments(imageList);
    //   setEditFileExtension(fileext);
    // }
    // setSelectedFile(previewImages);
    // imgRef.current = imageList;
    // return;
  };

  const maxImageFileSizeSampleDocs = 5000000;

  const onSelectSampleFile = (e) => {
    let imageSampleList = [];
    let previewSampleImages = [];
    let fileSampleext = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.target.files[i].name.split(".").at(-1);
      const allowedFileTypes = ["eps"];

      if (
        !e.target.files[i].type.match(imageMimeType) &&
        !allowedFileTypes.includes(fileExtension)
      ) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return;
        // if (!e.target.files[i].type.match(imageMimeType)) {
        //   swal({
        //     title: "Error",
        //     text: "Image type is not valid",
        //     className: "errorAlert",
        //     icon: "/img/ErrorAlert.png",
        //     buttons: false,
        //     timer: 1500,
        //   });
        //   // return;
      } else if (e.target.files[i]?.size > maxImageFileSizeSampleDocs) {
        swal({
          title: "Error",
          text: "Max file size allowed is 5mb",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return;
      } else {
        setImageSampleChanged(true);
        previewSampleImages.push(URL.createObjectURL(e.target.files[i]));
        imageSampleList.push(e.target.files[i]);
        fileSampleext.push(
          e.target.files[i]?.name?.slice(
            ((e.target.files[i]?.name.lastIndexOf(".") - 1) >>> 0) + 2
          )
        );
      }
    }
    // if (!jobId) {
    //   setJobSampleDocuments(imageSampleList);
    //   setFileSampleExtension(fileSampleext);
    // } else {
    //   setEditJobSampleDocuments(imageSampleList);
    //   setEditFileSampleExtension(fileSampleext);
    // }
    // setSelectedSampleFile(previewSampleImages);
    // imgSampleRef.current = imageSampleList;
  };
  const validateSubmit = (e, data) => {
    // console.log(data);
    e.preventDefault();
    // Urls Validation
    let isValidUrl = "";
    let newFormValues = formUrls;
    setFormUrls(newFormValues);
    if (formUrls) {
      if (formUrls != "") {
        isValidUrl =
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
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

    const tempErrors = {
      title: validations.title(title),
      price: validations.price(price),
      // formUrls: isValidUrl == null && "Please check the url(s) and try again",
      formSampleUrls:
        isValidSampleUrl == null && "Please check the url(s) and try again",
      // jobDocuments: validations.jobImages(jobDocuments),
      // category: validations.category(category),
      deliveryDate: validations.deliveryDate(deliveryDate),
      description: validations.description(description),
      job_type: !job_type && "Please select a job type",
      skills: skills.length === 0 && "Skill is required",
      tags: tags.length === 0 && "Please provide atleast one tag",
      level: !level && "Please select an level",
      company: !companyvalue && "please select an company",
      template: !templatename && isShown && "Please select a template",
      tasks:
        !inputData.title &&
        isShowntask &&
        itemData.length === 0 &&
        "Please provide a tasks ",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }

    submitHandler(data);
  };

  const submitHandler = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    //     let tempErrors = {
    //       template: "",
    //     };

    //  if (isShown) {
    //   if (templatename) {
    //     tempErrors = {
    //     template : "please enter template name"
    //     }
    //   }
    //  }

    //  const isError = Object.values(tempErrors).every(
    //   (x) => x == null || x == ""
    // );

    // console.log("check");
    if (jobId) {
      if (files) {
        for (const key of Object.keys(files)) {
          formData.append("image", files[key]);
        }
      }
    } else {
      if (files) {
        for (const key of Object.keys(files)) {
          formData.append("image", files[key]);
        }
      }
    }
    if (jobId) {
      if (files) {
        for (const key of Object.keys(files)) {
          formData.append("template_image", files[key]);
        }
      }
    } else {
      if (files) {
        for (const key of Object.keys(files)) {
          formData.append("template_image", files[key]);
        }
      }
    }
    // }
    // console.log("removeJobDocuments---____", removeJobDocuments);
    if (removeJobDocuments) {
      for (const key of Object.keys(removeJobDocuments)) {
        formData.append("remove_image", removeJobDocuments[key]);
      }
    }

    if (removetaskDocuments) {
      for (const key of Object.keys(removetaskDocuments)) {
        formData.append("task_id", removetaskDocuments[key]);
      }
    }

    // console.log("removeJobDocuments---____", removeJobDocuments);
    if (removeJobSampleDocuments) {
      for (const key of Object.keys(removeJobSampleDocuments)) {
        formData.append("remove_image", removeJobSampleDocuments[key]);
      }
    }
    formData.append("title", title);
    formData.append("company", companyvalue);
    // formData.append("tasks_due_date", date);
    formData.append("tasks", JSON.stringify(itemData));
    formData.append("description", description);
    formData.append("due_date_index", divid);
    formData.append("is_active", true);
    // if (isShown) {
    //   setstatus("0");
    //   formData.append("status", status);
    // } else {
    // }
    if (isShown && data == "post") {
      formData.append("status", 1);
    } else if (data == "post") {
      formData.append("status", 2);
    } else if (data == "draft") {
      formData.append("status", 0);
    }
    formData.append(
      "expected_delivery_date",
      moment(deliveryDate).format("YYYY-MM-DD")
    );
    for (var i = 0; i < skills.length; i++) {
      formData.append("skills", skills[i].id ? skills[i].id : skills[i]);
    }
    if (isRelatedToPrevJob) {
      if (relatedJobs) {
        for (var i = 0; i < relatedJobs.length; i++) {
          formData.append(
            "related_jobs",
            relatedJobs[i].id ? relatedJobs[i].id : relatedJobs[i]
          );
        }
      } else {
        formData.append("relatedJobs", relatedJobs);
      }
    } else {
      formData.append("relatedJobs", null);
    }

    if (jobId) {
      if (fileGallery) {
        for (const key of Object.keys(fileGallery)) {
          formData.append("sample_image", fileGallery[key]);
        }
      }
    } else {
      if (fileGallery) {
        for (const key of Object.keys(fileGallery)) {
          formData.append("sample_image", fileGallery[key]);
        }
      }
    }
    if (jobId) {
      if (fileGallery) {
        for (const key of Object.keys(fileGallery)) {
          formData.append("template_sample_image", fileGallery[key]);
        }
      }
    } else {
      if (fileGallery) {
        for (const key of Object.keys(fileGallery)) {
          formData.append("template_sample_image", fileGallery[key]);
        }
      }
    }

    if (formUrls) {
      setFormUrls(formUrls.filter((item) => item));
      formData.append("image_url", formUrls);
    }
    if (formSampleUrls) {
      setFormSampleUrls(formSampleUrls.filter((item) => item));
      formData.append("sample_work_url", formSampleUrls);
    }

    if (industry) {
      formData.append("industry", industry);
    }
    if (level) {
      formData.append("level", level);
    }
    if (job_type) {
      formData.append("job_type", job_type);
    }
    formData.append("price", price);
    formData.append("tags", tags);
    if (templatename) {
      formData.append("template_name", templatename);
    }
    if (industryname != null) {
      formData.append("industry", industryname);
    }

    formData.append("user", userData.user.user_id);

    if (Workflowdata != null) {
      formData.append("workflow", Workflowdata);
    }

    // console.log("submittedData--", formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    if (jobId && data == "post") {
      const create_job = await axios
        .put(`${BACKEND_API_URL}jobs/${jobId}/`, formData, config)
        .then((res) => {
          // console.log("EDITTTT");
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved Job",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          navigate(`/jobs/list`);
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: err.response.data.message,
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
          });
          setIsLoading(false);
        });

      // if (imageChanged) {
    } else if (jobId && data == "draft") {
      // console.log("DRAFTTTT");
      const create_job = await axios
        .put(`${BACKEND_API_URL}jobs/${jobId}/`, formData, config)
        .then((res) => {
          swal({
            title: "Successfully Complete",
            text: "Successfully Created",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          navigate(`/draft-jobs`);
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: err.response.data.message,
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
          });
          setIsLoading(false);
        });
    } else {
      const update_job = await axios
        .post(`${BACKEND_API_URL}jobs/`, formData, config)
        .then((res) => {
          // console.log("POSTTTT", data);
          swal({
            title: "Successfully Complete",
            text: "Successfully Created",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          navigate(`/jobs/list`);
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Template Already Exists",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
          });
          setIsLoading(false);
        });
    }
    setImageChanged(false);
  };

  const changeHandler = (e, v) => {
    setSkills(v);
    // setIsOpenSkill(false);
  };

  const changeRelatedJobHandler = (e, v) => {
    setRelatedJobs(v);
  };

  function handleKeyDownRelatedJobs(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setRelatedJobs([...relatedJobs, value]);
    e.target.value = "";
  }

  const toDay = new Date().toISOString().substring(0, 10);
  function handleKeyDownSkills(e) {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === "Tab") return;
    setIsOpenSkill(true);
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    const filteredCurrentSkills = skills.filter((str) =>
      str.skill_name.toLowerCase().includes(value.toLowerCase().trim())
    );
    // console.log("filteredCurrentSkills", filteredCurrentSkills);
    const filteredDatabaseSkills = skillsData.filter((str) => {
      if (str.skill_name.toLowerCase() === value.toLowerCase().trim()) {
        return true;
      }
    });
    // console.log("filteredDatabaseSkills", filteredDatabaseSkills);
    if (filteredDatabaseSkills.length > 0 && filteredCurrentSkills.length > 0) {
      swal({
        title: "Notice",
        text: "Skill already exists",
        className: "noticeAlert",
        icon: "/img/NoticeAlert.png",
        buttons: false,
        timer: 1500,
      });
      return;
    }
    for (var i = 0; i < skillsData.length; i++) {
      if (
        skillsData[i].skill_name
          .toLowerCase()
          .indexOf(value.toLowerCase().trim()) > -1
      ) {
        // changeHandler(e, value);
        // setSkills([...skills, value]);
        e.target.value = "";
        return;
      }
    }
    axios
      .post(`${BACKEND_API_URL}skills/`, {
        skill_name: value,
        is_active: true,
      })
      .then((res) => {
        // console.log("keys", res);
        setAddedSkill(true);
        setAddedSkill(false);
        const addedSkill = skillsData.filter((item) => item.id === value);
        // setSkills([...skills, res.data]);
      });
    e.target.value = "";
  }

  function removeSkill(index) {
    setSkills(skills.filter((el, i) => i !== index));
  }

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;

    const filteredTags = tags.filter(
      (str) => str.toLowerCase() == value.toLowerCase()
    );

    if (filteredTags.length > 0) {
      swal({
        title: "Notice",
        text: "Tag already added",
        className: "noticeAlert",
        icon: "/img/NoticeAlert.png",
        buttons: false,
        timer: 1500,
      });
      return;
    }

    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  function removeSkillPopup(index) {
    setIsOpenSkill(false);
  }

  function removeImageDocuments(document_id) {
    setRemoveJobDocuments([...removeJobDocuments, document_id]);
  }

  function removetaskdetailDocuments(document_id) {
    setRemovetaskDocuments([...removetaskDocuments, document_id]);
    const success = api
      .delete(`${BACKEND_API_URL}job-task/${document_id}/`)
      .then((res) => {
        // console.log(res);
      });
  }

  function removeImageSampleDocuments(document_id) {
    setRemoveJobSampleDocuments([...removeJobSampleDocuments, document_id]);
  }

  const handleInputChangeAutocomplete = (event, newInputValue) => {
    // setSkills(newInputValue);
    if (newInputValue.length > 0) {
      setIsOpenSkill(true);
    } else {
      setIsOpenSkill(false);
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.skill_name,
  });

  let addFormFieldsUrls = () => {
    if (formUrls.length < 10) {
      setFormUrls([...formUrls, " "]);
    }
  };

  let removeFormFieldsUrls = (i) => {
    let newFormValues = [...formUrls];
    newFormValues.splice(i, 1);
    setFormUrls(newFormValues);
  };

  let handleChangeUrls = (e) => {
    let isValidImgUrl = "";
    if (imgUrl != "") {
      isValidImgUrl = imgUrl.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (isValidImgUrl) {
        setFormUrls([...formUrls, imgUrl]);
        // console.log("test Url ", isValidImgUrl);
        setImgUrl("");
      } else {
        // setImgUrl("");
        const tempErrors = {
          formImgUrls:
            isValidImgUrl == null && "Please check the url(s) and try again",
        };
        setErrors(tempErrors);
      }
    } else {
      setImgUrl("");
      const tempErrors = {
        formImgUrls:
          isValidImgUrl == null && "Please check the url(s) and try again",
      };
      setErrors(tempErrors);
    }
  };

  let handleChangesampleUrls = (e) => {
    let sampleurl = "";
    if (sampleimgUrl != "") {
      if (
        (sampleurl = sampleimgUrl.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        ))
      ) {
        setFormSampleUrls([...formSampleUrls, sampleimgUrl]);
        // console.log("test Url ", sampleurl);
        setsampleImgUrl("");
      } else {
        setsampleImgUrl("");
        // console.log("test Url els4e", sampleurl);
        const tempErrors = {
          formsampleImgUrls:
            sampleurl == null && "Please check the url(s) and try again",
        };
        // console.log("tempErrors", tempErrors);
        setErrors(tempErrors);
      }
    } else {
      setsampleImgUrl("");
      const tempErrors = {
        formsampleImgUrls:
          sampleurl == null && "Please check the url(s) and try again",
      };
      setErrors(tempErrors);
    }
  };

  let addFormFieldsSampleUrls = () => {
    if (formSampleUrls.length < 10) {
      setFormSampleUrls([...formSampleUrls, ""]);
    }
  };

  let removeFormFieldsSampleUrls = (i) => {
    let newFormValues = [...formSampleUrls];
    newFormValues.splice(i, 1);
    setFormSampleUrls(newFormValues);
  };

  // DRAG AND DROP FUNCTIONALITY

  React.useEffect(() => {
    drop.current?.addEventListener("dragover", handleDragOver);
    drop.current?.addEventListener("drop", handleDrop);

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  const getvalue = (e) => {
    setcompanyvalue(e.target.value);
    setErrors({ ...errors, company: null });
    // console.log(e.target.value);
    if (e.target.value == "null") {
      setworkflowdata(null);
      settemplatedata("1");
      setlevel(null);
      setJobType("");
      setPrice("");
      setindustryname(null);
      setDeliveryDate();
      setDescription("");
      setSkills([]);
      setTags([]);
      setTemplatename();
      setisfiles(false);
      setissamplefiles(false);
    }
    if (e.target.value !== "null") {
      dispatch(getRelatedJobs(e.target.value));
      setShow(true);
      const success = api
        .get(`${BACKEND_API_URL}agency/works-flow/?company=${e.target.value}`)
        .then((res) => {
          // console.log(res.data);
          setapivalue(res.data);
        });
      const successTemplateApi = api
        .get(`${BACKEND_API_URL}job-template/?company=${e.target.value}`)
        .then((res) => {
          gettemplate(e);
          settemplatevalue(res.data);
        });
    } else {
      setShow(false);
    }
  };

  const gettemplate = (e) => {
    const success = api
      .get(`${BACKEND_API_URL}job-template/${e.target.value}/`)
      .then((res) => {
        settemplatedata(e.target.value);
        setlevel(res.data.level?.id);
        setJobType(res.data?.job_type);
        setPrice(res.data.price);
        setindustryname(res.data.industry);
        setDeliveryDate(new Date(res.data.expected_delivery_date));
        setDescription(res.data?.description);
        setSkills(res.data?.skills);
        // setTemplatename(res.data?.template_name);
        if (res.data?.tags) {
          const tagsList = res.data?.tags?.split(",");
          if (tagsList) {
            setTags(tagsList);
          }
        }

        if (res.data.image_url) {
          setisfiles(true);

          let newArray = res.data.image_url.split(",");
          setFormUrls(newArray);
        }
        if (res.data.sample_work_url) {
          setissamplefiles(true);
          let newArray = res.data.sample_work_url.split(",");
          setFormSampleUrls(newArray);
        }
        if (res.data.related_jobs?.length > 0) {
          setIsRelatedToPrevJob(true);
        }
        if (res.data?.images) {
          setisfiles(true);
          let newImages = res.data?.images;
          newImages = newImages.filter((item) => item);
          setJobDocuments(newImages);
          let fileext = [];
          let s = [];
          let b = [];
          for (var i = 0; i < res.data?.images.length; i++) {
            fileext.push(
              res.data?.images[i].job_images?.slice(
                ((res.data?.images[i].job_images.lastIndexOf(".") - 1) >>> 0) +
                  2
              )
            );
            // console.log(fileext);
            s.push(
              res.data?.images[i].job_images?.slice(
                ((res.data?.images[i].job_images.lastIndexOf("/") - 1) >>> 0) +
                  2
              )
            );
            b.push(res.data?.images[i].job_images);
          }
          // console.log(s);
          b = b.filter((item) => item);
          s = s.filter((item) => item);
          fileext = fileext.filter((item) => item);
          imgRef.current = b;
          // console.log("imgRefcurrent", imgRef.current);
          setFileNameDisplay(s);
          setFileExtension(fileext);
        }

        if (res.data?.images) {
          setissamplefiles(true);
          let newImages = res.data.images;
          newImages = newImages.filter((item) => item);
          setJobSampleDocuments(newImages);
          let fileext1 = [];
          let s1 = [];
          let b1 = [];
          for (var i = 0; i < res.data.images.length; i++) {
            fileext1.push(
              res.data?.images[i].work_sample_images?.slice(
                ((res.data?.images[i].work_sample_images?.lastIndexOf(".") -
                  1) >>>
                  0) +
                  2
              )
            );
            s1.push(
              res.data?.images[i].work_sample_images?.slice(
                ((res.data?.images[i].work_sample_images?.lastIndexOf("/") -
                  1) >>>
                  0) +
                  2
              )
            );
            b1.push(res.data.images[i].work_sample_images);
          }
          // console.log("s--", s);
          imgSampleRef.current = b1;
          // console.log("imgRefcurrent", imgRef.current);
          setFileNameSampleDisplay(s1);
          setFileSampleExtension(fileext1);
        }
      })
      .catch((err) => {
        settemplatedata("1");
        setlevel(null);
        setJobType("");
        setPrice("");
        setindustryname(null);
        setDeliveryDate();
        setDescription("");
        setSkills([]);
        setTags([]);
        setTemplatename();
        setisfiles(false);
        setissamplefiles(false);
      });
  };
  // const getvalue = (e) => {
  //   setcompanyvalue(e.target.value);
  //   setErrors({ ...errors, company: null });
  //   // console.log(e.target.value);
  //   if (e.target.value == "null") {
  //     setworkflowdata(null);
  //   }
  //   if (e.target.value !== "null") {
  //     dispatch(getRelatedJobs(e.target.value));
  //     setShow(true);
  //     const success = api
  //       .get(`${BACKEND_API_URL}agency/works-flow/?company=${e.target.value}`)
  //       .then((res) => {
  //         // console.log(res.data);
  //         setapivalue(res.data);
  //       });
  //   } else {
  //     setShow(false);
  //   }
  // };

  // const gettemplate = (e) => {
  //   // console.log(e.target.value);
  //   settemplatedata(e.target.value);
  //   if (e.target.value == 1) {
  //     setlevel(null);
  //     setJobType("");
  //     setPrice("");
  //     setindustryname(null);
  //     setDeliveryDate();
  //     setDescription("");
  //     setSkills([]);
  //     setTags([]);
  //     setTemplatename();
  //     setisfiles(false);
  //     setissamplefiles(false);
  //   } else {
  //     const success = api
  //       .get(`${BACKEND_API_URL}job-template/${e.target.value}/`)
  //       .then((res) => {
  //         setlevel(res.data.level?.id);
  //         setJobType(res.data?.job_type);
  //         setPrice(res.data.price);
  //         setindustryname(res.data.industry);
  //         setDeliveryDate(res.data.expected_delivery_date);
  //         setDescription(res.data?.description);
  //         setSkills(res.data?.skills);
  //         // setTemplatename(res.data?.template_name);
  //         if (res.data?.tags) {
  //           const tagsList = res.data?.tags?.split(",");
  //           if (tagsList) {
  //             setTags(tagsList);
  //           }
  //         }

  //         if (res.data.image_url) {
  //           setisfiles(true);

  //           let newArray = res.data.image_url.split(",");
  //           setFormUrls(newArray);
  //         }
  //         if (res.data.sample_work_url) {
  //           setissamplefiles(true);
  //           let newArray = res.data.sample_work_url.split(",");
  //           setFormSampleUrls(newArray);
  //         }
  //         if (res.data.related_jobs?.length > 0) {
  //           setIsRelatedToPrevJob(true);
  //         }
  //         if (res.data?.images) {
  //           setisfiles(true);
  //           let newImages = res.data?.images;
  //           newImages = newImages.filter((item) => item);
  //           setJobDocuments(newImages);
  //           let fileext = [];
  //           let s = [];
  //           let b = [];
  //           for (var i = 0; i < res.data?.images.length; i++) {
  //             fileext.push(
  //               res.data?.images[i].job_images?.slice(
  //                 ((res.data?.images[i].job_images.lastIndexOf(".") - 1) >>>
  //                   0) +
  //                   2
  //               )
  //             );
  //             // console.log(fileext);
  //             s.push(
  //               res.data?.images[i].job_images?.slice(
  //                 ((res.data?.images[i].job_images.lastIndexOf("/") - 1) >>>
  //                   0) +
  //                   2
  //               )
  //             );
  //             b.push(res.data?.images[i].job_images);
  //           }
  //           // console.log(s);
  //           b = b.filter((item) => item);
  //           s = s.filter((item) => item);
  //           fileext = fileext.filter((item) => item);
  //           imgRef.current = b;
  //           // console.log("imgRefcurrent", imgRef.current);
  //           setFileNameDisplay(s);
  //           setFileExtension(fileext);
  //         }

  //         if (res.data?.images) {
  //           setissamplefiles(true);
  //           let newImages = res.data.images;
  //           newImages = newImages.filter((item) => item);
  //           setJobSampleDocuments(newImages);
  //           let fileext1 = [];
  //           let s1 = [];
  //           let b1 = [];
  //           for (var i = 0; i < res.data.images.length; i++) {
  //             fileext1.push(
  //               res.data?.images[i].work_sample_images?.slice(
  //                 ((res.data?.images[i].work_sample_images?.lastIndexOf(".") -
  //                   1) >>>
  //                   0) +
  //                   2
  //               )
  //             );
  //             s1.push(
  //               res.data?.images[i].work_sample_images?.slice(
  //                 ((res.data?.images[i].work_sample_images?.lastIndexOf("/") -
  //                   1) >>>
  //                   0) +
  //                   2
  //               )
  //             );
  //             b1.push(res.data.images[i].work_sample_images);
  //           }
  //           // console.log("s--", s);
  //           imgSampleRef.current = b1;
  //           // console.log("imgRefcurrent", imgRef.current);
  //           setFileNameSampleDisplay(s1);
  //           setFileSampleExtension(fileext1);
  //         }
  //       });
  //   }
  // };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let imageList = [];
    let previewImages = [];
    let fileext = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.dataTransfer.files[i].name.split(".").at(-1);
      const allowedFileTypes = ["eps"];

      if (
        !e.dataTransfer.files[i].type.match(imageMimeType) &&
        !allowedFileTypes.includes(fileExtension)
      ) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
      } else if (e.dataTransfer.files[i]?.size > maxImageFileSize) {
        swal({
          title: "Error",
          text: "Max file size allowed is 10mb",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return;
      } else {
        setImageChanged(true);
        previewImages.push(URL.createObjectURL(e.dataTransfer.files[i]));
        imageList.push(e.dataTransfer.files[i]);
        fileext.push(
          e.dataTransfer.files[i]?.name?.slice(
            ((e.dataTransfer.files[i]?.name.lastIndexOf(".") - 1) >>> 0) + 2
          )
        );
      }
    }
    if (!jobId) {
      // setJobDocuments(imageList);
      setFileExtension(fileext);
    } else {
      setEditJobDocuments(imageList);
      setEditFileExtension(fileext);
    }
    setSelectedFile(previewImages);
    // imgRef.current = imageList;
  };

  React.useEffect(() => {
    imgRef.current = jobDocuments;
  }, [jobDocuments]);

  React.useEffect(() => {
    dropSample.current?.addEventListener("dragover", handleDragOverSample);
    dropSample.current?.addEventListener("drop", handleDropSample);

    return () => {
      dropSample.current?.removeEventListener("dragover", handleDragOverSample);
      dropSample.current?.removeEventListener("drop", handleDropSample);
    };
  }, []);

  const handleDragOverSample = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropSample = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // const { files } = e.dataTransfer;
    // console.log(e.dataTransfer.files);
    let imageSampleList = [];
    let previewSampleImages = [];
    let fileSampleext = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      // Check 'eps' file type
      const fileExtension = e.dataTransfer.files[i].name.split(".").at(-1);
      const allowedFileTypes = ["eps"];

      if (
        !e.dataTransfer.files[i].type.match(imageMimeType) &&
        !allowedFileTypes.includes(fileExtension)
      ) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return;
      } else if (!e.dataTransfer.files[i].type.match(imageMimeType)) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return;
      } else if (e.dataTransfer.files[i]?.size > maxImageFileSize) {
        swal({
          title: "Error",
          text: "Max file size allowed is 10mb",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        // return;
      } else {
        setImageChanged(true);
        previewSampleImages.push(URL.createObjectURL(e.dataTransfer.files[i]));
        imageSampleList.push(e.dataTransfer.files[i]);
        fileSampleext.push(
          e.dataTransfer.files[i]?.name?.slice(
            ((e.dataTransfer.files[i]?.name.lastIndexOf(".") - 1) >>> 0) + 2
          )
        );
      }
    }
    if (!jobId) {
      // setJobSampleDocuments(imageSampleList);
      setFileSampleExtension(fileSampleext);
    } else {
      setEditJobSampleDocuments(imageSampleList);
      setEditFileSampleExtension(fileSampleext);
    }
    setSelectedFile(previewSampleImages);
    // imgRef.current = imageSampleList;
    // }
  };

  const handleKeyDownTasks = (e) => {
    e.preventDefault();
    // console.log("eee");
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, tasks: null });

    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <>
        {/* {JSON.stringify(errors)} */}

        <div className="Category_p">
          <div className="CategorylistName">
            <h1>What Service Are You Looking For?</h1>
          </div>
        </div>
        <div className="Topallpage">
          <div className="ContentDiv jobaddformtop" onClick={removeSkillPopup}>
            <div className="Describe half-form-validation ">
              <div className="formjobsagencyadd">
                <div className="job_details_content">
                  <h1 className="JobDetailsTitle">Job Details</h1>
                </div>
                <div
                  className={
                    errors.title
                      ? "agencyjob_input1 error "
                      : " agencyjob_input1 "
                  }
                >
                  <h4 className="">Job Title</h4>
                  <input
                    className="category_name validateInput bkC2 w-100 h-50 border-radius border-1"
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrors({ ...errors, title: null });
                    }}
                    value={title}
                  />
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.title ? 1 : 0,
                    }}
                  >
                    {errors.title ?? "valid"}
                  </span>
                </div>
                <div
                  className={
                    errors.company
                      ? "text-content error Experiencenew"
                      : "text-content  Experiencenew"
                  }
                >
                  <h4 className="Company_name27">Company</h4>{" "}
                  <div className="styled-select Companyname Companyname_1">
                    <Select
                      className={
                        companyvalue === "null"
                          ? "selectinputcolor"
                          : "menuiteminputcolor"
                      }
                      open={isOpen9}
                      onOpen={() => {
                        setIsOpen9(true);
                      }}
                      onClose={() => {
                        setIsOpen9(false);
                      }}
                      MenuProps={menuProps}
                      value={companyvalue}
                      onChange={getvalue}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="null">Select Company</MenuItem>
                      {companyData?.map((item) =>
                        item.is_active ? (
                          <MenuItem key={item.id} value={item.id}>
                            {item?.name}
                          </MenuItem>
                        ) : null
                      )}
                    </Select>
                    <span
                      className="companyclass45"
                      style={{
                        color: "#D14F4F",
                        opacity: errors.company ? 1 : 0,
                      }}
                    >
                      {errors.company ?? "valid"}
                    </span>
                  </div>
                </div>
                {show ? (
                  <>
                    <div className="text-content ">
                      <h4 className="Company_name26Approval">
                        Approval Workflow ?
                      </h4>{" "}
                      <div className="styled-select Companyname">
                        <Select
                          className={
                            Workflowdata === "null"
                              ? "selectinputcolor"
                              : "menuiteminputcolor"
                          }
                          open={isOpen8}
                          onOpen={() => {
                            setIsOpen8(true);
                          }}
                          onClose={() => {
                            setIsOpen8(false);
                          }}
                          MenuProps={menuProps}
                          value={Workflowdata}
                          onChange={(e) => {
                            setworkflowdata(e.target.value);
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={null}>Select Workflow</MenuItem>
                          {apivalue?.map((item) =>
                            item.is_active ? (
                              <MenuItem key={item.id} value={item.id}>
                                {item?.name}
                              </MenuItem>
                            ) : null
                          )}
                        </Select>
                      </div>
                    </div>

                    <div className="text-content ">
                      <h4 className="Company_name26">Select Job Template</h4>{" "}
                      <div className="styled-select Companyname">
                        <Select
                          className={
                            templatedata === "null"
                              ? "selectinputcolor"
                              : "menuiteminputcolor"
                          }
                          open={isOpen7}
                          onOpen={() => {
                            setIsOpen7(true);
                          }}
                          onClose={() => {
                            setIsOpen7(false);
                          }}
                          value={templatedata}
                          onChange={gettemplate}
                          MenuProps={menuProps}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="1">Select Template</MenuItem>
                          {templatevalue?.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item?.template_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <div className={"text-content  Experiencenew"}>
                      <h4 className="Company_name">Industry</h4>{" "}
                      <div className="styled-select Companyname">
                        <Select
                          className={
                            industryname === "null"
                              ? "selectinputcolor"
                              : "menuiteminputcolor"
                          }
                          open={isOpen2}
                          onOpen={() => {
                            setIsOpen2(true);
                          }}
                          onClose={() => {
                            setIsOpen2(false);
                          }}
                          MenuProps={menuProps}
                          value={industryname}
                          onChange={(e) => {
                            setindustryname(e.target.value);
                            // setErrors({ ...errors, level: null });
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={null}>Select Industry</MenuItem>
                          {industryvalue?.map((item) =>
                            item.is_active ? (
                              <MenuItem key={item.id} value={item.id}>
                                {item?.industry_name}
                              </MenuItem>
                            ) : null
                          )}
                        </Select>
                        <div className="diverrors44">
                          {/* <span
                            style={{
                              color: "#D14F4F",
                              opacity: errors.level ? 1 : 0,
                            }}
                          >
                            {errors.level ?? "valid"}
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                <div
                  className={
                    errors.description
                      ? "text-content addjobtopdiv  error Describe_4"
                      : "text-content addjobtopdiv  Describe_4"
                  }
                >
                  <h4 className="Describetext_agency_text">
                    Describe Your Job
                  </h4>
                  <p className="Describejobaddedit">
                    This could include dimensions, colors, how you plan to use
                    it, or anything else that the content creator needs to know
                    in order to meet your expectations.
                  </p>
                  <textarea
                    className="w-551 border-1 border-radius h-180 Textbox-textarea bkC2"
                    placeholder=""
                    maxLength={4000}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors({ ...errors, description: null });
                    }}
                  />
                  <p className="deslimtsec_4">
                    <span
                      style={{
                        color: description?.length === 4000 && "#D14F4F",
                      }}
                    >
                      {description?.length ?? 0}
                      /4000
                    </span>
                  </p>

                  <span
                    className="Ag_E"
                    style={{
                      color: "#D14F4F",
                      opacity: errors.description ? 1 : 0,
                    }}
                  >
                    {errors.description ?? "valid"}
                  </span>
                </div>{" "}
                <div
                  className="related-jobs-check-box"
                  // style={{ display: "flex" }}
                >
                  {show ? (
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value={isRelatedToPrevJob}
                      checked={isRelatedToPrevJob}
                      onClick={() => setIsRelatedToPrevJob(!isRelatedToPrevJob)}
                    />
                  ) : (
                    <input type="checkbox" disabled="true" name="vehicle1" />
                  )}

                  <label htmlFor="vehicle1">
                    {" "}
                    Is this related to a previous job?
                  </label>
                  {/* <input type="checkbox" />
                      <span style={{ marginLeft: "10px" }}>
                        Is this related to a previous job?
                      </span> */}
                </div>
                {isRelatedToPrevJob && (
                  <div className="text-content Skills">
                    <h4 className="Related_newRelated">
                      Related Jobs (if applicable)
                    </h4>
                    <div className="Marketing- mt-2-">
                      <div className="skills-input-container">
                        <Autocomplete
                          multiple
                          // disabled={!title}
                          id="tags-outlined"
                          // options={
                          //   Array.isArray(relatedJobsList)
                          //     ? relatedJobsList.filter(
                          //         (item) => item.id != jobId
                          //       )
                          //     : relatedJobsList
                          // }
                          options={
                            relatedJobsList &&
                            Array.isArray(relatedJobsList) &&
                            relatedJobsList.filter((item) => item.id != jobId)
                          }
                          getOptionLabel={(option) => option.title}
                          onChange={(e, v) => {
                            changeRelatedJobHandler(e, v);
                            setErrors({ ...errors, relatedJobs: null });
                          }}
                          value={relatedJobs ?? []}
                          inputProps={{ "aria-label": "Without label" }}
                          filterSelectedOptions
                          hiddenLabel="true"
                          onKeyDown={handleKeyDownRelatedJobs}
                          renderInput={({ inputProps, ...rest }) => (
                            <TextField
                              {...rest}
                              placeholder="Company previous jobs"
                              inputProps={{ ...inputProps, readOnly: true }}
                            />
                          )}
                          // renderInput={(params) => (
                          //   <TextField
                          //     {...params}
                          //     fullWidth
                          //     placeholder="Type something"
                          //   />
                          // )}
                          isOptionEqualToValue={(option, value) =>
                            value === undefined ||
                            value === "" ||
                            option.id === value.id
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={
                    errors.skills
                      ? "text-content  Skills error Experiencenew_2 "
                      : "text-content  Skills Experiencenew_2"
                  }
                >
                  <h4 className=" neededskillnew_29">Skills Needed</h4>
                  <div className="Marketing- mt-2-">
                    <div className="skills-input-container">
                      {/* {JSON.stringify(skills)} */}
                      <Autocomplete
                        value={skills}
                        multiple
                        id="tags-outlined"
                        open={isOpenSkill}
                        onInputChange={handleInputChangeAutocomplete}
                        filterOptions={filterOptions}
                        options={skillsData.filter((item) => item.is_active)}
                        getOptionLabel={(option) => option.skill_name}
                        // onChange={(event, value) => setSkills(value)}
                        onChange={(e, v) => {
                          changeHandler(e, v);
                          setErrors({ ...errors, skills: null });
                        }}
                        // defaultValue={skills ?? []}
                        // inputValue={skills}
                        inputProps={{ "aria-label": "Without label" }}
                        filterSelectedOptions
                        noOptionsText={
                          "Press enter to add this skill and select again"
                        }
                        hiddenLabel="true"
                        // open={false}
                        onKeyDown={handleKeyDownSkills}
                        autoHighlight={true}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            placeholder="Type something"
                          />
                        )}
                        isOptionEqualToValue={(option, value) =>
                          value === undefined ||
                          value === "" ||
                          option.id === value.id
                        }
                      />
                      {/* <Autocomplete
                          multiple
                          id="tags-outlined"
                          open={isOpenSkill}
                          onInputChange={handleInputChangeAutocomplete}
                          filterOptions={filterOptions}
                          options={skillsData.filter((item) => item.is_active)}
                          getOptionLabel={(option) => option.skill_name}
                          // onChange={(event, value) => setSkills(value)}
                          onChange={(e, v) => {
                            changeHandler(e, v);
                            setErrors({ ...errors, skills: null });
                          }}
                          defaultValue={skills ?? []}
                          inputProps={{ "aria-label": "Without label" }}
                          filterSelectedOptions
                          noOptionsText={
                            "Press enter to add this skill and select again"
                          }
                          hiddenLabel="true"
                          // open={false}
                          onKeyDown={handleKeyDownSkills}
                          autoHighlight={true}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              placeholder="Type something"
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            value === undefined ||
                            value === "" ||
                            option.id === value.id
                          }
                        /> */}
                    </div>
                  </div>
                  <div className="diverrors44">
                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.skills ? 1 : 0,
                      }}
                    >
                      {errors.skills ?? "valid"}
                    </span>
                  </div>
                </div>
                {/* < */}
              </div>

              <hr className="line7" style={{ width: "551px" }}></hr>
              <div className="agencyjobsecnewpage">
                <div className="formjobsagencyadd">
                  <h1 className="filesassetsttitle">Files and Assets</h1>
                  <div className="switch_Agency">
                    <div className="Observers_agency_job_add Observers_agency_job_add1 Observers_agency_job_add2">
                      <label className="switch">
                        {isfiles && (
                          <>
                            {" "}
                            <input
                              type="checkbox"
                              checked={true}
                              onClick={handleClickfiles}
                            />
                          </>
                        )}
                        {!isfiles && (
                          <>
                            {" "}
                            <input
                              type="checkbox"
                              checked={false}
                              onClick={handleClickfiles}
                            />
                          </>
                        )}

                        <span className="slider round"></span>
                      </label>
                      <h4 className="taskstitle">
                        Files and Assets <span>Optional</span>
                      </h4>
                    </div>
                  </div>

                  {isfiles && (
                    <>
                      {" "}
                      <div className="text-content addjobseditdev">
                        {/* <h4 className="Attachment_new1">
                          Your Assets
                          <span className="optional-A">Optional</span>
                        </h4> */}
                        <p className="uptext-A">
                          Only upload files and artwork that you own the
                          copyright for, or that you have permission to use and
                          distribute for commercial work.
                        </p>
                        {/* <h4 className="Attachment_new1">Attachment</h4> */}
                        <div className="agencysecjobadd">
                          <div className="agencysecjobadd1">
                            <div className="agencysecjobadd_add_img">
                              <div
                                className="newimgdrp"
                                {...getRootfileProps({ style })}
                              >
                                <input
                                  {...getInputfileProps()}
                                  imgExtension={[
                                    ".jpg",
                                    ".gif",
                                    ".png",
                                    ".gif",
                                  ]}
                                  maxfilesize={5242880}
                                />

                                <p
                                  className="dropfile"
                                  style={{ color: "#1B4EA8" }}
                                >
                                  <span style={{ fontWeight: 400 }}>
                                    {" "}
                                    <img
                                      className="upiconimg"
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/img/uploadimg.png"
                                      }
                                      alt=""
                                    />
                                    Upload Files
                                  </span>
                                </p>
                              </div>
                              <p className="ortext">or</p>
                              <div className="browsevauleButton">
                                <button className="browseButton">
                                  Browse Vault
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="agencysecjobadd2">
                            <div className="assertSelectedArea">
                              <div>
                                <h5 className="selectedAssertsText">
                                  Selected Assets
                                </h5>
                                <aside style={thumbsContainer}>
                                  {thumbs}
                                  {jobDocuments && (
                                    <>
                                      {jobId ? (
                                        <>
                                          {jobDocuments?.map((item, index) => (
                                            <>
                                              {item?.job_image_name && (
                                                <>
                                                  <div
                                                    className="uplodeimgfiledev"
                                                    style={thumb}
                                                  >
                                                    <div
                                                      className="removeimgdevpage"
                                                      style={thumbInner}
                                                    >
                                                      <img
                                                        className="img-upload-item"
                                                        src="/img/assertgallery.png"
                                                      />
                                                      <button
                                                        onClick={() => {
                                                          removeDocument(
                                                            index,
                                                            "data"
                                                          );
                                                          removeImageDocuments(
                                                            item?.id
                                                          );
                                                        }}
                                                      >
                                                        <img src="/img/assertbin.png" />
                                                      </button>
                                                      {item?.job_image_name}
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                            </>
                                          ))}
                                        </>
                                      ) : (
                                        <>
                                          {jobDocuments?.map((item, index) => (
                                            <>
                                              {item?.job_image_name && (
                                                <>
                                                  <div
                                                    className="uplodeimgfiledev"
                                                    style={thumb}
                                                  >
                                                    <div
                                                      className="removeimgdevpage"
                                                      style={thumbInner}
                                                    >
                                                      <img
                                                        className="img-upload-item"
                                                        src="/img/assertgallery.png"
                                                      />
                                                      <button
                                                        onClick={() => {
                                                          removeDocument(
                                                            index,
                                                            "data"
                                                          );
                                                          removeImageDocuments(
                                                            item?.id
                                                          );
                                                        }}
                                                      >
                                                        <img src="/img/assertbin.png" />
                                                      </button>
                                                      {item?.job_image_name}
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                            </>
                                          ))}
                                        </>
                                      )}
                                    </>
                                  )}
                                </aside>
                              </div>
                              {/* {JSON.stringify(errors.formImgUrls)} */}
                              {formUrls.map((element, index) => (
                                <div className="form-inline" key={index}>
                                  {element && (
                                    <div className="assertDustbinLink">
                                      <img
                                        className="linkicon"
                                        src="/img/asserLink.png"
                                      />
                                      <a className="adifecttesturl">
                                        {element}
                                      </a>
                                      <img
                                        className="assertbinLogo2"
                                        src="/img/assertbin.png"
                                        onClick={() =>
                                          removeFormFieldsUrls(index)
                                        }
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                              <div
                                className={
                                  errors.formImgUrls
                                    ? "enterUrlLinkButton error"
                                    : "enterUrlLinkButton"
                                }
                              >
                                <input
                                  className="assertEnterUrl"
                                  type="text"
                                  value={imgUrl}
                                  placeholder="enter URL"
                                  onChange={(e) => {
                                    setImgUrl(e.target.value);
                                    setErrors({ ...errors, formImgUrls: null });
                                  }}
                                />
                                <div className="useButtonAssert">
                                  <a
                                    onClick={(e) => {
                                      // addFormFieldsUrls();
                                      handleChangeUrls(e);
                                    }}
                                    className="enterUrluse"
                                  >
                                    Use
                                  </a>
                                </div>
                              </div>
                              <div
                                className={
                                  errors.formImgUrls
                                    ? "enterUrlLinkButton-error error"
                                    : "enterUrlLinkButton-error"
                                }
                              >
                                <span
                                  className="formurslsjobapply"
                                  style={{
                                    color: "#D14F4F",
                                    opacity: errors.formUrls ? 1 : 0,
                                  }}
                                >
                                  {errors.formImgUrls ? errors.formImgUrls : ""}
                                </span>
                              </div>
                              <div className="urlIncludePlus">
                                <a>
                                  <img src="/img/includeUrl.png" />
                                </a>
                                <a className="includeUrlText">Include a URL</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
                        <input
                          multiple
                          type="file"
                          // onChange={(e) => {
                          //   onSelectFile(e);
                          //   setErrors({ ...errors, jobDocuments: null });
                          // }}
                          id="upload"
                          hidden
                        />
                      </div>
                    </>
                  )}

                  <div className="agencyjobsecnewpage">
                    <div className="formjobsagencyadd">
                      <div className="switch_Agency">
                        <div className="Observers_agency_job_add  Observers_agency3 ">
                          <label className="switch">
                            {issamplefiles && (
                              <>
                                {" "}
                                <input
                                  type="checkbox"
                                  checked={true}
                                  onClick={handleClicksamplefiles}
                                />
                              </>
                            )}
                            {!issamplefiles && (
                              <>
                                {" "}
                                <input
                                  type="checkbox"
                                  checked={false}
                                  onClick={handleClicksamplefiles}
                                />
                              </>
                            )}
                            <span className="slider round"></span>
                          </label>
                          <h4 className="taskstitle">
                            Samples of Work You Like<span>Optional</span>
                          </h4>
                        </div>
                      </div>

                      {issamplefiles && (
                        <>
                          {" "}
                          <div className="text-content addjobseditdev">
                            {/* <h4 className="Attachment_new1">
                              <span className="optional-A">Optional</span>
                            </h4> */}
                            <p className="uptext-A">
                              This is to help the content creator understand the
                              type of work you like. This doesn’t need to be
                              work that you own the copyright for, but Adifect
                              will only store it for 30 days after the
                              completion of this job and will not use it for any
                              other purposes.
                            </p>
                            {/* <h4 className="Attachment_new1">Attachment</h4> */}
                            <div className="agencysecjobadd">
                              <div className="agencysecjobadd1">
                                <div className="agencysecjobadd_add_img">
                                  <div
                                    className="newimgdrp"
                                    {...getRootGalleryProps({ style })}
                                  >
                                    <input
                                      {...getInputGalleryProps()}
                                      imgExtension={[
                                        ".jpg",
                                        ".gif",
                                        ".png",
                                        ".gif",
                                      ]}
                                      maxfilesize={5242880}
                                    />

                                    <p
                                      className="dropfile"
                                      style={{ color: "#1B4EA8" }}
                                    >
                                      <span style={{ fontWeight: 400 }}>
                                        {" "}
                                        <img
                                          className="upiconimg"
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/img/uploadimg.png"
                                          }
                                          alt=""
                                        />
                                        Upload Files
                                      </span>
                                    </p>
                                  </div>
                                  <p className="ortext">or</p>
                                  <div className="browsevauleButton">
                                    <button className="browseButton">
                                      Browse Vault
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="agencysecjobadd2">
                                <div className="assertSelectedArea">
                                  <div>
                                    <h5 className="selectedAssertsText">
                                      Selected Assets
                                    </h5>
                                    <aside style={thumbsContainer}>
                                      {thumbs1}
                                      {jobSampleDocuments && (
                                        <>
                                          {jobId ? (
                                            <>
                                              {jobSampleDocuments?.map(
                                                (item, index) => (
                                                  <>
                                                    {item?.work_sample_image_name && (
                                                      <div
                                                        className="uplodeimgfiledev"
                                                        style={thumb}
                                                      >
                                                        <div
                                                          className="removeimgdevpage"
                                                          style={thumbInner}
                                                        >
                                                          <img
                                                            className="img-upload-item"
                                                            src="/img/assertgallery.png"
                                                          />
                                                          <button
                                                            onClick={() => {
                                                              removeSampleDocument(
                                                                index,
                                                                "data"
                                                              );
                                                              removeImageSampleDocuments(
                                                                item?.id
                                                              );
                                                            }}
                                                          >
                                                            <img src="/img/assertbin.png" />
                                                          </button>
                                                          {
                                                            item?.work_sample_image_name
                                                          }
                                                        </div>
                                                      </div>
                                                    )}
                                                  </>
                                                )
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {jobSampleDocuments?.map(
                                                (item, index) => (
                                                  <>
                                                    {item?.work_sample_image_name && (
                                                      <div
                                                        className="uplodeimgfiledev"
                                                        style={thumb}
                                                      >
                                                        <div
                                                          className="removeimgdevpage"
                                                          style={thumbInner}
                                                        >
                                                          <img
                                                            className="img-upload-item"
                                                            src="/img/assertgallery.png"
                                                          />
                                                          <button
                                                            onClick={() => {
                                                              removeSampleDocument(
                                                                index,
                                                                "data"
                                                              );
                                                              removeImageSampleDocuments(
                                                                item?.id
                                                              );
                                                            }}
                                                          >
                                                            <img src="/img/assertbin.png" />
                                                          </button>
                                                          {
                                                            item?.work_sample_image_name
                                                          }
                                                        </div>
                                                      </div>
                                                    )}
                                                  </>
                                                )
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </aside>
                                  </div>

                                  {/* {JSON.stringify(errors.formImgUrls)} */}
                                  {formSampleUrls.map((element, index) => (
                                    <div className="form-inline" key={index}>
                                      {element && (
                                        <div className="assertDustbinLink">
                                          <img
                                            className="linkicon"
                                            src="/img/asserLink.png"
                                          />
                                          <a className="adifecttesturl">
                                            {element}
                                          </a>
                                          <img
                                            className="assertbinLogo2"
                                            src="/img/assertbin.png"
                                            onClick={() =>
                                              removeFormFieldsSampleUrls(index)
                                            }
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ))}

                                  <div
                                    className={
                                      errors.formsampleImgUrls
                                        ? "enterUrlLinkButton error"
                                        : "enterUrlLinkButton"
                                    }
                                  >
                                    <input
                                      className="assertEnterUrl"
                                      type="text"
                                      value={sampleimgUrl}
                                      placeholder="enter URL"
                                      onChange={(e) => {
                                        setsampleImgUrl(e.target.value);
                                        setErrors({
                                          ...errors,
                                          formsampleImgUrls: null,
                                        });
                                      }}
                                    />
                                    <div className="useButtonAssert">
                                      <a
                                        onClick={(e) => {
                                          handleChangesampleUrls(e);
                                        }}
                                        className="enterUrluse"
                                      >
                                        Use
                                      </a>
                                    </div>
                                  </div>
                                  <div
                                    className={
                                      errors.formsampleImgUrls
                                        ? "enterUrlLinkButton-error error"
                                        : "enterUrlLinkButton-error"
                                    }
                                  >
                                    <span
                                      className="formurjobapply"
                                      style={{
                                        color: "#D14F4F",
                                        opacity: errors.formSampleUrls ? 1 : 0,
                                      }}
                                    >
                                      {errors.formsampleImgUrls
                                        ? errors.formsampleImgUrls
                                        : ""}
                                    </span>
                                  </div>
                                  <div className="urlIncludePlus">
                                    <a>
                                      <img src="/img/includeUrl.png" />
                                    </a>
                                    <a className="includeUrlText">
                                      Include a URL
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <aside style={thumbsContainer}>{thumbs1}</aside> */}
                            <input
                              multiple
                              type="file"
                              // onChange={(e) => {
                              //   onSelectFile(e);
                              //   setErrors({ ...errors, jobDocuments: null });
                              // }}
                              id="upload"
                              hidden
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="line10" style={{ width: "551px" }}></hr>
              <div className="formjobsagencyadd">
                <div className="text-content Skills Experiencenew_2">
                  <h1 className="taskstoken">Tasks</h1>

                  <div className="switch_Agency">
                    <div className="Observers_agency_job_add">
                      <label className="switch">
                        {isShowntask && (
                          <input
                            type="checkbox"
                            checked={true}
                            onClick={handleClicktask}
                            id="handleClickTaskInput"
                          />
                        )}

                        {!isShowntask && (
                          <>
                            <input
                              type="checkbox"
                              checked={false}
                              onClick={handleClicktask}
                            />
                          </>
                        )}

                        <span className="slider round"></span>
                      </label>
                      <h4 className="taskstitle">
                        This job contains multiple tasks <span>Optional</span>
                      </h4>
                    </div>
                  </div>

                  {isShowntask && (
                    <div className="container containerPad">
                      <div className="shwo_data">
                        {itemData.map((elem, index) => {
                          return (
                            <div key={index}>
                              <h3>
                                <span className="task_title">{elem.title}</span>
                                <span className="task_due_date">
                                  {elem.due_date}
                                </span>
                                <button
                                  className="closebutton"
                                  onClick={() => {
                                    handleDelte(index);
                                    removetaskdetailDocuments(elem?.id);
                                  }}
                                >
                                  x
                                </button>
                              </h3>
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className={
                          errors.tasks
                            ? " containerPad12 error "
                            : " containerPad12  "
                        }
                      >
                        <input
                          className="tastsinput"
                          type="text"
                          name="title"
                          placeholder="Enter Name"
                          value={inputData.title}
                          onChange={handleChange}
                          // onKeyDown={handleChange}
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              handleSubmit(event);
                            }
                          }}
                        />
                        <button
                          className="saveTaskJobAddEditbtn"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Save Task
                        </button>
                        <span
                          className="multipleA"
                          style={{
                            color: "#D14F4F",
                            opacity: errors.tasks ? 1 : 0,
                          }}
                        >
                          {errors.tasks ?? "valid"}
                        </span>
                        <br />

                        <div className="App_date">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <label className="taskDueDate">
                              <DatePicker
                                mask="__-__-____"
                                label=""
                                value={taskDueDate}
                                inputFormat="MM-dd-yyyy"
                                formatDate={(taskDueDate) =>
                                  moment(new Date()).format("DD-MM-YYYY")
                                }
                                name="due_date"
                                // inputFormat="MM-dd-yyyy"
                                minDate={new Date()}
                                onChange={(newValue) => {
                                  setTaskDueDate(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField variant="standard" {...params} />
                                )}
                              />
                            </label>
                          </LocalizationProvider>
                          {/* <input
                          name="due_date"
                          type="date"
                          value={inputData.due_date}
                          onChange={handleChange}
                        />  */}
                        </div>
                        <button
                          className="adddataButton flex items-center"
                          onClick={handleSubmit}
                          id="adddataButtonHandler"
                        >
                          <img src="/img/plus.png" /> Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <hr className="line10" style={{ width: "551px" }}></hr>
              <div className="formjobsagencyadd">
                <div
                  className={
                    errors.price ? "text-content   error" : "text-content "
                  }
                >
                  <h2
                    style={{
                      color: "#1b4ea8",
                      fontSize: "24px",
                      margin: "22px 0px",
                    }}
                  >
                    Budget and Timeline
                  </h2>
                  <h4 className="Attachment_Price_new">Job Pricing Type</h4>

                  <div
                    className="job_pricing-type"
                    style={{ margin: "16px 0px 0px 0px" }}
                  >
                    <div className="double_toogle_button">
                      <ToggleButtonGroup
                        className={
                          job_type == "0"
                            ? "first_toogle_button fixed_toogle_button firstjobPricingTypebtn"
                            : "fixed_toogle_button firstjobPricingTypebtn"
                        }
                        // className="fixed_toogle_button"
                        color="info"
                        value={job_type}
                        // exclusive
                        // onChange={handleChange}
                        onClick={() => setJobType("0")}
                        aria-label="Platform"
                      >
                        <ToggleButton value={0}>Fixed</ToggleButton>
                      </ToggleButtonGroup>
                      <ToggleButtonGroup
                        className={
                          job_type == "1"
                            ? "second_toogle_button fixed_toogle_button secondjobPricingTypebtn"
                            : "fixed_toogle_button secondjobPricingTypebtn"
                        }
                        // className="hourly_toogle_button"
                        color="info"
                        // value={alignment}
                        // exclusive
                        // onChange={handleChange}
                        onClick={() => setJobType("1")}
                        aria-label="Platform"
                      >
                        <ToggleButton value={1}>Hourly</ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    {/* <button className="fixed_button">Fixed</button>
                      <button className="Hourly_button">Hourly</button> */}
                  </div>
                  <div className="jobtpye_A">
                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.job_type ? 1 : 0,
                      }}
                    >
                      {errors.job_type ?? "valid"}
                    </span>
                  </div>
                </div>

                <div
                  className={
                    errors.level
                      ? "text-content error Experiencenew"
                      : "text-content  Experiencenew"
                  }
                >
                  <h4 className="Company_name">Experience Level</h4>{" "}
                  <div className="styled-select Companyname">
                    <Select
                      className={
                        level === "null"
                          ? "selectinputcolor"
                          : "menuiteminputcolor"
                      }
                      open={isOpen10}
                      onOpen={() => {
                        setIsOpen10(true);
                      }}
                      onClose={() => {
                        setIsOpen10(false);
                      }}
                      MenuProps={menuProps}
                      value={level}
                      onChange={(e) => {
                        setlevel(e.target.value);
                        setErrors({ ...errors, level: null });
                      }}
                      placeholder="Select Level"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="null">Select Level</MenuItem>
                      {levelsData?.map((item) =>
                        item.is_active ? (
                          <MenuItem key={item.id} value={item.id}>
                            {item.level_name}
                          </MenuItem>
                        ) : null
                      )}
                    </Select>
                    <div className="diverrors44 diverrors5">
                      <span
                        style={{
                          color: "#D14F4F",
                          opacity: errors.level ? 1 : 0,
                        }}
                      >
                        {errors.level ?? "valid"}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    errors.price ? "text-content   error" : "text-content "
                  }
                >
                  <h4 className="Attachment_Price_new_4">Offer Price</h4>
                  <div className="pricename">
                    <input
                      className="offerpricenewclass"
                      type="number"
                      onKeyDown={blockInvalidChar}
                      // pattern="[0-9]"
                      value={price}
                      placeholder="Price"
                      onChange={(e) => {
                        setPrice(e.target.value.replace(/[^0-9.]/g, ""));
                        setErrors({ ...errors, price: null });
                      }}
                    />
                    <span className="pricetag pricetag_A pricetag_A21">$</span>
                  </div>
                  <div className="Price_A">
                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.price ? 1 : 0,
                      }}
                    >
                      {errors.price ?? "valid"}
                    </span>
                  </div>
                </div>

                <h4 className="duedatetext">Due Date</h4>
                <div
                  className="main_date"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    float: "left",
                  }}
                >
                  <div
                    id="1"
                    onClick={() => handleDiv("1")}
                    className={divid == 1 ? "first_date activ3" : "first_date"}
                  >
                    <h1>24 Hours</h1>
                    <p>{coverter}</p>
                  </div>

                  <div
                    className={
                      divid == 2 ? "second_date activ3" : "second_date "
                    }
                    onClick={() => handleDiv("2")}
                  >
                    <h1>3 Day</h1>
                    <p>{coverter1}</p>
                  </div>
                  <div
                    className={divid == 3 ? "third_date activ3" : "third_date"}
                    onClick={() => handleDiv("3")}
                  >
                    <h1>7 Day</h1>
                    <p>{coverter2}</p>
                  </div>
                  <div
                    className={
                      divid == 4 ? "fourth_date activ4" : "fourth_date"
                    }
                    onClick={() => handleDiv("4")}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <label className="lastdatesec">
                        <DatePicker
                          mask="__-__-____"
                          label=""
                          value={deliveryDate}
                          inputFormat="MM-dd-yyyy"
                          formatDate={(deliveryDate) =>
                            moment(new Date()).format("DD-MM-YYYY")
                          }
                          // inputFormat="MM-dd-yyyy"
                          minDate={new Date()}
                          onChange={(newValue) => {
                            setDeliveryDate(newValue);
                            setdivid("4");
                          }}
                          renderInput={(params) => (
                            <TextField variant="standard" {...params} />
                          )}
                        />
                      </label>
                    </LocalizationProvider>
                  </div>
                </div>
                <div
                  className={
                    errors.tags
                      ? "text-content error Experiencenew_2"
                      : "text-content  Experiencenew_2"
                  }
                >
                  <h4 className="Tags_new26">Tags</h4>
                  <div className="Marketing  Marketing_2 display-f">
                    <div className="tags-input-container">
                      {tags?.map((tag, index) => (
                        <div className="tag-item" key={index}>
                          <span className="text">{tag}</span>
                          <span
                            className="close"
                            onClick={() => removeTag(index)}
                          >
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiChip-deleteIcon MuiChip-deleteIconMedium MuiChip-deleteIconColorDefault MuiChip-deleteIconOutlinedColorDefault css-i4bv87-MuiSvgIcon-root"
                              focusable="false"
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              data-testid="CancelIcon"
                            >
                              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                            </svg>
                          </span>
                        </div>
                      ))}
                      <input
                        onKeyDown={handleKeyDown}
                        onChange={(e, v) => {
                          setErrors({ ...errors, tags: null });
                        }}
                        type="text"
                        className="tags-input"
                        placeholder="Type something"
                      />
                    </div>
                  </div>
                  <div className="diverrors44">
                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.tags ? 1 : 0,
                      }}
                    >
                      {errors.tags ?? "valid"}
                    </span>
                  </div>
                </div>
                <div className="switch_Agency">
                  <div className="Observers1">
                    <label className="switch">
                      <input type="checkbox" onClick={handleClick} />
                      <span className="slider round"></span>
                    </label>

                    {!textchange && <h4>Save as Template</h4>}

                    {textchange && <h4>Save as New Template</h4>}
                  </div>
                </div>
                {isShown && (
                  <div
                    className={
                      errors.template
                        ? "istoggle_Shown error "
                        : "istoggle_Shown  "
                    }
                  >
                    <p className="Templatetext">
                      This will save everything except the Offer Price, Due
                      Date, and Previous Job
                    </p>
                    <input
                      className="Templatesave"
                      type="text"
                      // placeholder="Please enter title"
                      onChange={(e) => {
                        setTemplatename(e.target.value);
                        setErrors({ ...errors, template: null });
                      }}
                    />
                    <span
                      className="errordiv4141"
                      style={{
                        color: "#D14F4F",
                        opacity: errors.template ? 1 : 0,
                      }}
                    >
                      {errors.template ?? "valid"}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-content mt-4">
                <div className="SubmitCancelBTN">
                  <div className="Job-Bott-Btn-Cancel Job-Bott-Btn-Cancel-A">
                    <Link
                      to="/jobs/list"
                      className="create-account-btn border-radius"
                    >
                      Cancel
                    </Link>
                  </div>

                  <div className="buttomjobbtn">
                    <button
                      type="button"
                      onClick={(e) => {
                        validateSubmit(e, "post");
                        setstatus(2);
                      }}
                      className="primary Small border-radius"
                    >
                      Submit
                    </button>
                  </div>

                  {showdraft && (
                    <>
                      {" "}
                      <div className="buttomjobbtn draftButt">
                        <button
                          type="button"
                          onClick={(e) => {
                            validateSubmit(e, "draft");
                            setstatus(0);
                          }}
                          className="SavedraftButton border-radius"
                        >
                          Save draft
                        </button>
                      </div>{" "}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
}
