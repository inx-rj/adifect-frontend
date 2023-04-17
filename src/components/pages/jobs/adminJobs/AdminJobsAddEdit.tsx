import { Add, FileUploadOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  createFilterOptions,
} from "@mui/material";
import CustomDateRangePicker from "components/common/customDatePicker/CustomDateRangePicker";
import { Roles } from "helper/config";
import { API_URL } from "helper/env";
import { TablePaginationType } from "helper/types/muiCustomTable/muiCustomTable";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { GET_COMPANY_LIST } from "redux/actions/companyTab/companyTab.actions";
import { CREATE_JOB } from "redux/actions/jobs/jobs.actions";
import { GET_WORKFLOW_LIST } from "redux/actions/workFlow/workFlow.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { COMPANY_PROJECTS_DATA } from "redux/reducers/companies/companies.slice";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";
import { GET_JOBS_DETAILS } from "redux/reducers/homePage/jobsList.slice";
import { WORKFLOW_LIST } from "redux/reducers/workFlow/workFlow.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import swal from "sweetalert";

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

const AdminJobsAddEdit = () => {
  const [files, setFiles] = useState([]);

  //skills data
  const skillsData = [
    {
      id: 5,
      created: "2023-04-10T07:52:42.302127Z",
      modified: "2023-04-10T07:52:42.302149Z",
      is_trashed: false,
      skill_name: "css",
      slug: "css",
      is_active: true,
    },
    {
      id: 4,
      created: "2023-04-10T07:52:37.911890Z",
      modified: "2023-04-10T07:52:37.911911Z",
      is_trashed: false,
      skill_name: "html",
      slug: "html",
      is_active: true,
    },
    {
      id: 3,
      created: "2022-11-17T12:19:09.564078Z",
      modified: "2022-11-17T12:19:09.564094Z",
      is_trashed: false,
      skill_name: "Demo",
      slug: "demo",
      is_active: true,
    },
    {
      id: 2,
      created: "2022-11-17T12:19:06.755116Z",
      modified: "2022-11-17T12:19:06.755136Z",
      is_trashed: false,
      skill_name: "Dmeo",
      slug: "dmeo",
      is_active: true,
    },
    {
      id: 1,
      created: "2022-11-17T00:53:45.237803Z",
      modified: "2022-11-17T00:53:45.237822Z",
      is_trashed: false,
      skill_name: "Design",
      slug: "design",
      is_active: true,
    },
  ];

  //Level Data
  const levelsData = [
    {
      id: 3,
      created: "2022-11-16T15:32:39.864644Z",
      modified: "2022-11-16T15:32:39.864664Z",
      is_trashed: false,
      level_name: "Expert",
      slug: "expert",
      description: "Expert",
      is_active: true,
    },
    {
      id: 2,
      created: "2022-11-16T15:32:28.636908Z",
      modified: "2022-11-16T15:32:28.636927Z",
      is_trashed: false,
      level_name: "Intermediate",
      slug: "intermediate",
      description: "Intermediate",
      is_active: true,
    },
    {
      id: 1,
      created: "2022-11-16T15:32:00.009703Z",
      modified: "2022-11-16T15:32:00.009723Z",
      is_trashed: false,
      level_name: "Beginner",
      slug: "beginner",
      description: "Beginner",
      is_active: true,
    },
  ];
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [isOpen11, setIsOpen11] = useState(false);

  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [companyvalue, setcompanyvalue] = useState(null);
  const [Workflowdata, setworkflowdata] = useState(null);
  const [apivalue, setapivalue] = useState(null);
  const [templatedata, settemplatedata] = useState("1");
  const [templatevalue, settemplatevalue] = useState(null);
  const [industryname, setindustryname] = useState(null);
  const [industryvalue, setindustryvalue] = useState(null);
  const [description, setDescription] = useState("");
  const [isRelatedToPrevJob, setIsRelatedToPrevJob] = useState<
    boolean | string
  >(false);
  const [relatedJobs, setRelatedJobs] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const [isfiles, setisfiles] = useState(false);
  const [openVault, setOpenVault] = useState(false);
  const [mediafile1, setexistingmediafile1] = useState([]);
  const [mediafile, setexistingmediafile] = useState([]);
  const [jobDocuments, setJobDocuments] = useState([]);
  const [fileExtension, setFileExtension] = useState([]);
  const [fileNameDisplay, setFileNameDisplay] = useState([]);
  const [removeJobDocuments, setRemoveJobDocuments] = useState([]);
  const [formUrls, setFormUrls] = useState<any>([""]);
  const [imgUrl, setImgUrl] = useState("");
  const [showText, setShowText] = useState(false);
  const [issamplefiles, setissamplefiles] = useState(false);
  const [openVault1, setOpenVault1] = useState(false);
  const [samplemediafile1, setexistingsamplemediafile1] = useState([]);
  const [fileGallery, setFileGallery] = useState([]);
  const [samplemediafile, setexistingsamplemediafile] = useState([]);
  const [jobSampleDocuments, setJobSampleDocuments] = useState([]);
  const [fileSampleExtension, setFileSampleExtension] = useState([]);
  const [fileNameSampleDisplay, setFileNameSampleDisplay] = useState([]);
  const [removeJobSampleDocuments, setRemoveJobSampleDocuments] = useState([]);
  const [formSampleUrls, setFormSampleUrls] = useState([""]);
  const [showText1, setShowText1] = useState(false);
  const [sampleimgUrl, setsampleImgUrl] = useState("");
  const [isShowntask, setIsShowntask] = useState(false);

  const [itemData, setItemData] = useState([]);
  const [removetaskDocuments, setRemovetaskDocuments] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
    due_date: "",
  });
  const [taskDueDate, setTaskDueDate] = useState(new Date());
  const [datechanger, setdatechanger] = useState(false);
  const [isBudgetNotRequired, setIsBudgetNotRequired] = useState<any>(false);
  const [job_type, setJobType] = useState("0");
  const [level, setlevel] = useState(null);
  const [price, setPrice] = useState("");
  const [inHouseUser, setInHouseUser] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState<any>();
  const [divid, setdivid] = useState(4);
  const [alertdate, setalertdate] = useState(false);
  const [tags, setTags] = useState([]);
  const [savetagbutton, setSavetagButton] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [textchange, settextchange] = useState(false);
  const [templatename, setTemplatename] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [showdraft, setShowdraft] = useState(true);
  const [status, setstatus] = useState<any>();
  const [imageChanged, setImageChanged] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [editJobSampleDocuments, setEditJobSampleDocuments] = useState<any>();
  const [editFileSampleExtension, setEditFileSampleExtension] = useState<any>();

  const [editFileExtension, setEditFileExtension] = useState<any>();
  const [editJobDocuments, setEditJobDocuments] = useState<any>();
  const [addedSkill, setAddedSkill] = useState(false);

  // const [headerCompany, setHeaderCompany] = useOutletContext<unknown>();

  const maxImageFileSize = 10000000;
  const imageMimeType = /image\/(svg|eps|png|jpg|jpeg|gif)/i;

  // React states
  const [filterData, setFilterData] = useState<{ [key: string]: string }>({
    from_date: "",
    to_date: "",
    community: "",
    status: "",
    // Channel: "",
    tag: "",
  });

  const jobDetails = useAppSelector(GET_JOBS_DETAILS);
  const { companyList } = useAppSelector(COMPANY_LIST);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const WorkFlowData = useAppSelector(WORKFLOW_LIST);

  // console.log("WorkFlowData", WorkFlowData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const imgRef = useRef(null);
  const imgSampleRef = useRef(null);
  const inputRef = useRef(null);
  const dropSample = React.useRef(null);
  const drop = React.useRef(null);

  const { jobId } = useParams<any>();

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
    workflow: null,
    inHouseUser: null,
    company: null,
    level: null,
  });

  const [paginationData, setPaginationData] = useState<TablePaginationType>({
    page: 1,
    rowsPerPage: 10,
    search: "",
  });

  //fetch initial companies data list
  useSingleEffect(() => {
    if (userProfile?.data?.role === Roles.ADMIN) {
      dispatch(GET_COMPANY_LIST(paginationData, `${API_URL.COMPANY.ADMIN}`));
      dispatch(GET_WORKFLOW_LIST(paginationData, `${API_URL.WORKFLOW.ADMIN}`));
    } else {
      dispatch(GET_COMPANY_LIST(paginationData));
      dispatch(GET_WORKFLOW_LIST(paginationData));
    }
  });

  //fetch company list when pagination change
  useUpdateEffect(() => {
    if (userProfile?.data?.role === Roles.ADMIN) {
      dispatch(GET_COMPANY_LIST(paginationData, `${API_URL.COMPANY.ADMIN}`));
      dispatch(GET_WORKFLOW_LIST(paginationData, `${API_URL.WORKFLOW.ADMIN}`));
    } else {
      dispatch(
        GET_COMPANY_LIST(paginationData, `${API_URL.COMPANY.COMPANY_LIST}`)
      );
      dispatch(
        GET_WORKFLOW_LIST(paginationData, `${API_URL.WORKFLOW.WORKFLOW_LIST}`)
      );
    }
  }, [paginationData, userProfile.data?.role]);

  const yesterday = new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toDateString();

  const coverter = new Date(yesterday).toISOString().slice(0, 10);

  const threeDay = new Date(
    new Date().setDate(new Date().getDate() + 4)
  ).toDateString();

  const coverter1 = new Date(threeDay).toISOString().slice(0, 10);

  const sevenDay = new Date(
    new Date().setDate(new Date().getDate() + 8)
  ).toDateString();

  const coverter2 = new Date(sevenDay).toISOString().slice(0, 10);

  //Redux States
  const ListcompaniesData = useAppSelector(COMPANY_PROJECTS_DATA);
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
      "video/mov": [],
      "video/mp4": [],
      "audio/mpeg": [],
      "video/quicktime": [],
    },
    onDrop: useCallback(
      (acceptedFiles) => {
        // console.log(acceptedFiles[0]);
        // if (!acceptedFiles[0].type.match(imageMimeType)) {
        //   swal({
        //     title: "Error",
        //     text: "Image type is not valid",
        //     className: "errorAlert",
        //     icon: "/img/logonew-red.svg",
        //     buttons: false,
        //     timer: 5000,
        //   });
        // } else if (acceptedFiles[0].size > maxImageFileSize) {
        //   swal({
        //     title: "Error",
        //     text: "Max file size allowed is 10mb",
        //     className: "errorAlert",
        //     icon: "/img/logonew-red.svg",
        //     buttons: false,
        //     timer: 5000,
        //   });
        // } else {
        setFiles([
          ...files,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              title: file.name,
            })
          ),
        ]);
        // }
      },
      [files]
    ),
  });

  const {
    getRootProps: getRootGalleryProps,
    getInputProps: getInputGalleryProps,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "video/mov": [],
      "video/mp4": [],
      "audio/mpeg": [],
      "video/quicktime": [],
    },
    onDrop: useCallback(
      (acceptedFiles) => {
        // if (!acceptedFiles[0].type.match(imageMimeType)) {
        //   swal({
        //     title: "Error",
        //     text: "Image type is not valid",
        //     className: "errorAlert",
        //     icon: "/img/logonew-red.svg",
        //     buttons: false,
        //     timer: 5000,
        //   });
        // } else if (acceptedFiles[0].size > maxImageFileSize) {
        //   swal({
        //     title: "Error",
        //     text: "Max file size allowed is 10mb",
        //     className: "errorAlert",
        //     icon: "/img/logonew-red.svg",
        //     buttons: false,
        //     timer: 5000,
        //   });
        // } else {
        setFileGallery([
          ...fileGallery,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              title: file.name,
            })
          ),
        ]);
        // }
      },
      [fileGallery]
    ),
  });

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  //Get value
  const getvalue = (e) => {
    setcompanyvalue(e.target.value);
    setShow(true);
    // const success = api
    //   .get(`${BACKEND_API_URL}company/${e.target.value}`)
    //   .then((res) => {
    //     //console.log(res?.data?.industry);
    //     // setapivalue(res.data);
    //     setindustryname(res?.data?.industry);
    //   });

    // setErrors({ ...errors, company: null });
    // // console.log(e.target.value);
    // if (e.target.value === null) {
    //   setworkflowdata(null);
    //   // settemplatedata("1");
    //   setlevel(null);
    //   // setJobType("");
    //   setPrice("");
    //   setindustryname(null);
    //   setDeliveryDate();
    //   setDescription("");
    //   setSkills([]);
    //   setTags([]);
    //   setTemplatename();
    //   setisfiles(false);
    //   setissamplefiles(false);
    //   setInHouseUser([]);
    // }
    // if (e.target.value !== null) {
    //   dispatch(listAdminInHouseUsers(e.target.value));

    //   dispatch(getAdminRelatedJobs(e.target.value));
    //   setShow(true);
    //   const success = api
    //     .get(`${BACKEND_API_URL}work-flow/?company=${e.target.value}`)
    //     .then((res) => {
    //       // console.log(res.data);
    //       setapivalue(res.data);
    //     });
    //   const successTemplateApi = api
    //     .get(`${BACKEND_API_URL}admin-job-template/?company=${e.target.value}`)
    //     .then((res) => {
    //       console.table(res.data);
    //       // gettemplate(e);
    //       settemplatevalue(res.data);
    //     });
    // } else {
    //   setShow(false);
    // }
  };

  const gettemplate = (e) => {
    console.log("template");
    // const success = api
    //   .get(`${BACKEND_API_URL}admin-job-template/${e.target.value}/`)
    //   .then((res) => {
    //     const current_date = moment(new Date()).format("YYYY-MM-DD");
    //     if (
    //       new Date(res.data.expected_delivery_date) < new Date(current_date)
    //     ) {
    //       setDeliveryDate(new Date());
    //     } else {
    //       setDeliveryDate(res.data.expected_delivery_date);
    //     }

    //     settemplatedata(e.target.value);
    //     setlevel(res.data.level?.id);
    //     if (res.data?.job_type == "") {
    //       setJobType("0");
    //     } else {
    //       setJobType(res.data?.job_type);
    //     }
    //     setPrice(res.data.price);
    //     setindustryname(res.data.industry);
    //     // setDeliveryDate(res.data.expected_delivery_date);
    //     setDescription(res.data?.description);
    //     setSkills(res.data?.skills);
    //     // setTemplatename(res.data?.template_name);
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
    //       setisfiles(true);
    //       let newImages = res.data?.images;
    //       newImages = newImages.filter((item) => item);
    //       setJobDocuments(newImages);
    //       let fileext = [];
    //       let s = [];
    //       let b = [];
    //       for (var i = 0; i < res.data?.images.length; i++) {
    //         fileext.push(
    //           res.data?.images[i].job_images?.slice(
    //             ((res.data?.images[i].job_images.lastIndexOf(".") - 1) >>> 0) +
    //               2
    //           )
    //         );
    //         // console.log(fileext);
    //         s.push(
    //           res.data?.images[i].job_images?.slice(
    //             ((res.data?.images[i].job_images.lastIndexOf("/") - 1) >>> 0) +
    //               2
    //           )
    //         );
    //         b.push(res.data?.images[i].job_images);
    //       }
    //       // console.log(s);
    //       b = b.filter((item) => item);
    //       s = s.filter((item) => item);
    //       fileext = fileext.filter((item) => item);
    //       imgRef.current = b;
    //       // console.log("imgRefcurrent", imgRef.current);
    //       setFileNameDisplay(s);
    //       setFileExtension(fileext);
    //     }

    //     if (res.data?.images) {
    //       setissamplefiles(true);
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
    //   })
    //   .catch((err) => {
    //     settemplatedata("1");
    //     setlevel(null);
    //     // setJobType("");
    //     setPrice("");
    //     setindustryname(null);
    //     setDeliveryDate();
    //     setDescription("");
    //     setSkills([]);
    //     setTags([]);
    //     setTemplatename();
    //     setisfiles(false);
    //     setissamplefiles(false);
    //   });
  };

  //Auto complete input change
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
    // stringify: (option) => option?.skill_name,
  });

  //Set skills value
  const changeHandler = (e, v) => {
    setSkills(v);
    // setIsOpenSkill(false);
  };

  const handleKeyDownSkills = (e) => {
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
      return false;
    });
    // console.log("filteredDatabaseSkills", filteredDatabaseSkills);
    if (filteredDatabaseSkills.length > 0 && filteredCurrentSkills.length > 0) {
      swal({
        title: "Notice",
        text: "Skill already exists",
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        // buttons: false,
        timer: 3000,
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
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${userData.token}`,
    //   },
    // };

    // axios
    //   .post(
    //     `${BACKEND_API_URL}skills/`,
    //     {
    //       skill_name: value,
    //       is_active: true,
    //     },
    //     config
    //   )
    //   .then((res) => {
    //     // console.log("keys", res);
    //     setAddedSkill(true);
    //     setAddedSkill(false);
    //     const addedSkill = skillsData.filter((item) => item.id === value);
    //     // setSkills([...skills, res.data]);
    //   });
    e.target.value = "";
  };

  //Change files
  const handleClickfiles = (event) => {
    setisfiles((current) => !current);
  };

  const handleClickOpenDam = () => {
    setOpenVault(true);
    localStorage.setItem("damon", "on");
    if (mediafile1.length && mediafile1[0] != undefined) {
      localStorage.setItem("prev_vault", JSON.stringify(mediafile1));
    }
  };

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const removedamFile = (file) => () => {
    const newdamGallery = [...mediafile];
    newdamGallery.splice(newdamGallery.indexOf(file), 1);
    setexistingmediafile(newdamGallery);
    // console.log(mediafile);
  };

  const removedamFile1 = (file) => () => {
    const newdamGallery1 = [...mediafile1];
    newdamGallery1.splice(newdamGallery1.indexOf(file), 1);
    setexistingmediafile1(newdamGallery1);
  };

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

  const removeImageDocuments = (document_id) => {
    setRemoveJobDocuments([...removeJobDocuments, document_id]);
  };

  const removeFormFieldsUrls = (i) => {
    let newFormValues = [...formUrls];
    newFormValues.splice(i, 1);
    setFormUrls(newFormValues);
  };

  const handleKeyDownUrl = (e) => {
    let isValidImgUrl: any = "";
    if (imgUrl != "") {
      isValidImgUrl = imgUrl.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (isValidImgUrl) {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;

        const filteredTags = formUrls.filter(
          (str) => str.toLowerCase() == value
        );

        if (filteredTags.length > 0) {
          swal({
            title: "Notice",
            text: "Url already added",
            className: "errorAlert-login",
            icon: "/img/logonew-red.svg",
            // buttons: false,
            timer: 3000,
          });
          return;
        }
        setFormUrls([...formUrls, value]);
        e.target.value = "";
        setImgUrl("");
      } else {
        // setImgUrl("");
        const tempErrors: any = {
          formImgUrls:
            isValidImgUrl == null && "Please check the url(s) and try again",
        };
        setErrors(tempErrors);
      }
    } else {
      setImgUrl("");
      const tempErrors: any = {
        formImgUrls:
          isValidImgUrl == null && "Please check the url(s) and try again",
      };
      setErrors(tempErrors);
    }
  };

  const handleChangeUrls = (e) => {
    let isValidImgUrl: any = "";
    if (imgUrl != "") {
      isValidImgUrl = imgUrl.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (isValidImgUrl) {
        const filteredTags = formUrls.filter(
          (str) => str.toLowerCase() == isValidImgUrl
        );

        if (filteredTags.length > 0) {
          swal({
            title: "Notice",
            text: "Url already added",
            className: "errorAlert-login",
            icon: "/img/logonew-red.svg",
            // buttons: false,
            timer: 3000,
          });
          return;
        }

        setFormUrls([...formUrls, imgUrl]);
        // console.log("test Url ", isValidImgUrl);
        setImgUrl("");
      } else {
        // setImgUrl("");
        const tempErrors: any = {
          formImgUrls:
            isValidImgUrl == null && "Please check the url(s) and try again",
        };
        setErrors(tempErrors);
      }
    } else {
      setImgUrl("");
      const tempErrors: any = {
        formImgUrls:
          isValidImgUrl == null && "Please check the url(s) and try again",
      };
      setErrors(tempErrors);
    }
  };

  const onClickInclude = () => setShowText((current) => !current);

  const onClickInclude1 = () => setShowText1((current) => !current);

  const handleClicksamplefiles = (event) => {
    setissamplefiles((current) => !current);
  };

  const thumbs = files.map((file) => (
    <div
      className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]"
      key={file.name}
    >
      <div className="removeimgdevpage" style={thumbInner}>
        <img className="img-upload-item" src="/img/assertgallery.png" />
        <button onClick={removeFile(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
      </div>
    </div>
  ));

  const existingMedia = mediafile?.map((file) => (
    <div
      className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]"
      key={file.id}
    >
      {file && (
        <>
          <img className="img-upload-item" src="/img/assertgallery.png" />{" "}
        </>
      )}
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removedamFile(file)}>
          {file && (
            <>
              <img src="/img/assertbin.png" />
            </>
          )}
        </button>
        {file.title}
        <div>
          {file && (
            <>
              <span className="thumbDesignWButton">Vault</span>
            </>
          )}
        </div>
      </div>
    </div>
  ));

  // console.log("mediafile1 -- ", mediafile1);
  const existingMedia1 = mediafile1?.map((file) => (
    <div
      className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]"
      key={file?.id}
    >
      {file && (
        <>
          <img className="img-upload-item" src="/img/assertgallery.png" />{" "}
        </>
      )}
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removedamFile1(file)}>
          {file && (
            <>
              <img src="/img/assertbin.png" />
            </>
          )}
        </button>
        {file?.title}
        <div>
          {file && (
            <>
              {" "}
              <span className="thumbDesignWButton">Vault</span>
            </>
          )}
        </div>
      </div>
    </div>
  ));

  const handleClickOpenDam1 = () => {
    setOpenVault1(true);
    localStorage.setItem("damon", "on");
    if (samplemediafile1.length && samplemediafile1[0] != undefined) {
      localStorage.setItem("prev_vault", JSON.stringify(samplemediafile1));
    }
  };

  const removesampleFile = (file) => () => {
    const newfileGallery = [...fileGallery];
    newfileGallery.splice(newfileGallery.indexOf(file), 1);
    setFileGallery(newfileGallery);
  };

  const thumbs1 = fileGallery.map((file) => (
    <div
      className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]"
      key={file.name}
    >
      <img className="img-upload-item" src="/img/assertgallery.png" />
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removesampleFile(file)}>
          <img src="/img/assertbin.png" />
        </button>
        {file.title}
      </div>
    </div>
  ));

  const removesampledamFile = (file) => () => {
    const newsampledamGallery = [...samplemediafile];
    newsampledamGallery.splice(newsampledamGallery.indexOf(file), 1);
    setexistingsamplemediafile(newsampledamGallery);
  };

  const existingsampleMedia = samplemediafile?.map((file) => (
    <div
      className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]"
      key={file?.id}
    >
      {file && (
        <>
          {" "}
          <img className="img-upload-item" src="/img/assertgallery.png" />
        </>
      )}
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removesampledamFile(file)}>
          {file && (
            <>
              <img src="/img/assertbin.png" />
            </>
          )}
        </button>
        {file?.title}
        <div>
          {file && (
            <>
              <span className="thumbDesignWButton">Vault</span>
            </>
          )}
        </div>
      </div>
    </div>
  ));

  const removesampledamFile1 = (file) => () => {
    const newsampledamGallery1 = [...samplemediafile1];
    newsampledamGallery1.splice(newsampledamGallery1.indexOf(file), 1);
    setexistingsamplemediafile1(newsampledamGallery1);
  };

  const existingsampleMedia1 = samplemediafile1?.map((file) => (
    <div
      className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]"
      key={file?.id}
    >
      {file && (
        <>
          <img className="img-upload-item" src="/img/assertgallery.png" />
        </>
      )}
      <div className="removeimgdevpage" style={thumbInner}>
        <button onClick={removesampledamFile1(file)}>
          {file && (
            <>
              {" "}
              <img src="/img/assertbin.png" />
            </>
          )}
        </button>
        {file?.title}
        <div>
          {file && (
            <>
              <span className="thumbDesignWButton">Vault</span>
            </>
          )}
        </div>
      </div>
    </div>
  ));

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

  const removeImageSampleDocuments = (document_id) => {
    setRemoveJobSampleDocuments([...removeJobSampleDocuments, document_id]);
  };

  const removeFormFieldsSampleUrls = (i) => {
    let newFormValues = [...formSampleUrls];
    newFormValues.splice(i, 1);
    setFormSampleUrls(newFormValues);
  };

  const handleKeyDownSampleUrl = (e) => {
    let sampleurl: any = "";
    if (sampleimgUrl != "") {
      sampleurl = sampleimgUrl.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (sampleurl) {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;

        const filteredTags = formSampleUrls.filter(
          (str) => str.toLowerCase() == value
        );

        if (filteredTags.length > 0) {
          swal({
            title: "Notice",
            text: "Tag already added",
            className: "errorAlert-login",
            icon: "/img/logonew-red.svg",
            // buttons: false,
            timer: 3000,
          });
          return;
        }
        setFormSampleUrls([...formSampleUrls, value]);
        e.target.value = "";
        setsampleImgUrl("");
        // setFormSampleUrls([...formSampleUrls, sampleimgUrl]);
        // setsampleImgUrl("");
      } else {
        // setsampleImgUrl("");
        // console.log("test Url els4e", sampleurl);
        const tempErrors: any = {
          formsampleImgUrls:
            sampleurl == null && "Please check the url(s) and try again",
        };
        // console.log("tempErrors", tempErrors);
        setErrors(tempErrors);
      }
    } else {
      setsampleImgUrl("");
      const tempErrors: any = {
        formsampleImgUrls:
          sampleurl == null && "Please check the url(s) and try again",
      };
      setErrors(tempErrors);
    }
  };

  const handleChangesampleUrls = (e) => {
    let sampleurl: any = "";
    if (sampleimgUrl != "") {
      sampleurl = sampleimgUrl.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (sampleurl) {
        const filteredTags = formSampleUrls.filter(
          (str) => str.toLowerCase() == sampleurl
        );

        if (filteredTags.length > 0) {
          swal({
            title: "Notice",
            text: "Url already added",
            className: "errorAlert-login",
            icon: "/img/logonew-red.svg",
            // buttons: false,
            timer: 3000,
          });
          return;
        }
        setFormSampleUrls([...formSampleUrls, sampleimgUrl]);
        // console.log("test Url ", sampleurl);
        setsampleImgUrl("");
      } else {
        // setsampleImgUrl("");
        // console.log("test Url els4e", sampleurl);
        const tempErrors: any = {
          formsampleImgUrls:
            sampleurl == null && "Please check the url(s) and try again",
        };
        // console.log("tempErrors", tempErrors);
        setErrors(tempErrors);
      }
    } else {
      setsampleImgUrl("");
      const tempErrors: any = {
        formsampleImgUrls:
          sampleurl == null && "Please check the url(s) and try again",
      };
      setErrors(tempErrors);
    }
  };

  const handleClicktask = (event) => {
    // 👇️ toggle shown state
    setIsShowntask((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const handleDelte = (id) => {
    const upDateItem = itemData.filter((elem, index) => {
      return index !== id;
    });
    setItemData(upDateItem);
  };

  const removetaskdetailDocuments = (document_id) => {
    setRemovetaskDocuments([...removetaskDocuments, document_id]);
    // const success = api
    //   .delete(`${BACKEND_API_URL}job-task/${document_id}/`)
    //   .then((res) => {
    //     // console.log(res);
    //   });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData.title && taskDueDate) {
      const coverter = new Date(taskDueDate).toISOString().slice(0, 10);
      setItemData([
        ...itemData,
        { title: inputData.title, due_date: coverter },
      ]);
      setInputData({ title: "", due_date: "" });
    } else {
    }
    setdatechanger(true);
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

  //set selected filter
  const handleDateChange = (name: string, value: any) => {
    setFilterData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleInputChangeAutocompleteUsers = (e) => {
    // console.log(e.target.value);
    // if (e.target.value !== "") {
    //   setIsOpenUser(true);
    // } else {
    //   setIsOpenUser(false);
    // }
    setErrors({ ...errors, inHouseUser: null });
  };

  const filterOptionsUsers = createFilterOptions({
    matchFrom: "start",
    // stringify: (option) => option.user_full_name,
  });

  const changeHandlerInHouseUsers = (e, v) => {
    setInHouseUser(v);
    setErrors({ ...errors, inHouseUser: null });
  };

  const handleKeyDownInHouseUsers = (e) => {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === "Tab") return;
    // setIsOpenApprovers(true);
    if (e.key !== "Enter") return;
    // if (!value.trim()) return;
    e.target.value = "";
  };

  const handleDiv = (id) => {
    if (id === "1") {
      setdivid(1);
      setDeliveryDate(yesterday);
    } else if (id === "2") {
      setdivid(2);
      setDeliveryDate(threeDay);
    } else if (id === "3") {
      setdivid(3);
      setDeliveryDate(sevenDay);
    } else if (id === "4") {
      setdivid(4);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  const handleKeyDown = (e) => {
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
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        // buttons: false,
        timer: 3000,
      });
      return;
    }
    setTags([...tags, value]);
    e.target.value = "";
    setSavetagButton("");
  };

  const handleSaveTag = (e, v) => {
    if (savetagbutton.length < 1) return;

    const filteredTags = tags.filter(
      (str) => str.toLowerCase() == savetagbutton.toLowerCase()
    );

    if (filteredTags.length > 0) {
      swal({
        title: "Notice",
        text: "Tag already added",
        className: "errorAlert-login",
        icon: "/img/logonew-red.svg",
        // buttons: false,
        timer: 3000,
      });
      return;
    }

    setTags([...tags, savetagbutton]);
    setSavetagButton("");
    // console.log(inputRef.current.value);
    inputRef.current.value = "";
  };

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const validateSubmit = (e, data) => {
    // console.log(data);
    e.preventDefault();
    // Urls Validation
    let isValidUrl: any = "";
    let newFormValues = formUrls;
    setFormUrls(newFormValues);
    if (formUrls) {
      if (formUrls != "") {
        isValidUrl =
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
      }
    }
    // SampleUrls Validation
    let isValidSampleUrl: any = "";
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
      // title: validations.title(title),
      // price: validations.price(price),
      // formUrls: isValidUrl == null && "Please check the url(s) and try again",
      // formSampleUrls:
      //   isValidSampleUrl == null && "Please check the url(s) and try again",
      // inHouseUser:
      //   isBudgetNotRequired &&
      //   inHouseUser?.length < 1 &&
      //   "Please select a user",
      // // jobDocuments: validations.jobImages(jobDocuments),
      // // category: validations.category(category),
      // deliveryDate: validations.deliveryDate(deliveryDate),
      // description: validations.description(description),
      // job_type: !job_type && "Please select a job type",
      // // skills: skills.length === 0 && "Skill is required",
      // // tags: tags.length === 0 && "Please provide atleast one tag",
      // level: !level && "Please select an level",
      // company: !companyvalue && "Please select an company",
      // template: !templatename && isShown && "Please select a template",
      // workflow: !Workflowdata && "Please select a workflow",
      // tasks:
      //   !inputData.title &&
      //   isShowntask &&
      //   itemData.length === 0 &&
      //   "Please provide a tasks",
    };
    setErrors(tempErrors);

    // $(".error").prop("id", "error_move");

    // console.log("errors -- ", errors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      // setErrorCheck(true);

      // setTimeout(function () {
      //   $("#error_move").attr("id", "");
      //   $(".error").first().attr("id", "error_move");
      //   $(window).scrollTop($("#error_move").position().top);
      // }, 500);

      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
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

    if (mediafile) {
      {
        mediafile.map((item) => {
          const idget = item.id;
          formData.append("dam_images", idget);
        });
      }
    }

    if (isBudgetNotRequired) {
      formData.append("is_house_member", isBudgetNotRequired);

      if (inHouseUser?.length > 0) {
        for (var i = 0; i < inHouseUser.length; i++) {
          formData.append(
            "house_member",
            inHouseUser[i].id ? inHouseUser[i].id : inHouseUser[i]
          );
        }
      }
    }

    if (samplemediafile1) {
      {
        samplemediafile1.map((item) => {
          const idget = item.id;
          formData.append("dam_sample_images", idget);
        });
      }
    }

    if (mediafile1) {
      {
        mediafile1.map((item) => {
          const idget = item.id;
          formData.append("dam_images", idget);
        });
      }
    }

    if (samplemediafile) {
      {
        samplemediafile.map((item) => {
          const idget = item.id;
          formData.append("dam_sample_images", idget);
        });
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
    // formData.append("tasks_due_date", date);
    formData.append("tasks", JSON.stringify(itemData));
    formData.append("description", description);
    // formData.append("due_date_index", divid);
    // formData.append("is_active", true);

    // formData.append("assigned_to", userData?.user?.user_id);
    // formData.append("created_by", userData?.user?.user_id);

    // if (isShown && data == "post") {
    //   formData.append("status", 1);
    // } else if (data == "post") {
    //   formData.append("status", 2);
    // } else if (data == "draft") {
    //   formData.append("status", 0);
    // }
    // formData.append(
    //   "expected_delivery_date",
    //   moment(deliveryDate).format("YYYY-MM-DD")
    // );
    for (var i = 0; i < skills.length; i++) {
      formData.append("skills", skills[i].id ? skills[i].id : skills[i]);
    }
    if (isRelatedToPrevJob) {
      if (relatedJobs) {
        // for (var i = 0; i < relatedJobs.length; i++) {
        formData.append("related_jobs", relatedJobs);
        // }
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
      // formData.append("sample_work_url", formSampleUrls);
    }

    // if (industry) {
    //   formData.append("industry", industry);
    // }
    if (data == "draft") {
      if (companyvalue) {
        formData.append("company", companyvalue);
      }
    } else {
      formData.append("company", companyvalue);
    }

    if (price && !isBudgetNotRequired) {
      formData.append("price", price);
    }

    if (level && !isBudgetNotRequired) {
      formData.append("level", level);
    }
    if (job_type && !isBudgetNotRequired) {
      formData.append("job_type", job_type);
    }
    // formData.append("tags", tags);
    if (templatename) {
      formData.append("template_name", templatename);
    }
    if (industryname != null) {
      formData.append("industry", industryname);
    }

    // formData.append("user", userData.user.user_id);

    if (Workflowdata != null) {
      formData.append("workflow", Workflowdata);
    }

    // console.log("submittedData--", formData);

    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${userData.token}`,
    //   },
    // };
    if (jobId && data == "post" && !isShown) {
      // const create_job = await axios
      //   .put(`${BACKEND_API_URL}jobs/${jobId}/`, formData, config)
      //   .then((res) => {
      //     // console.log("EDITTTT");
      //     swal({
      //       title: "Successfully Complete",
      //       text: "Successfully Saved Job",
      //       className: "successAlert",
      //       icon: "/img/logonew.svg",
      //       buttons: false,
      //       timer: 5000,
      //     });
      //     if (data == "draft") {
      //       navigate(`/draft-jobs`);
      //     } else {
      //       navigate(`/jobs/list`);
      //     }
      //   })
      //   .catch((err) => {
      //     swal({
      //       title: "Error",
      //       text: err.response.data.message,
      //       className: "errorAlert",
      //       icon: "/img/logonew-red.svg",
      //       // buttons: false,
      //       timer: 5000,
      //     });
      //     setIsLoading(false);
      //   });
      // if (imageChanged) {
    } else if (jobId && data == "draft" && !isShown) {
      // console.log("DRAFTTTT");
      // const create_job = await axios
      //   .put(`${BACKEND_API_URL}jobs/${jobId}/`, formData, config)
      //   .then((res) => {
      //     swal({
      //       title: "Successfully Complete",
      //       text: "Successfully Created",
      //       className: "successAlert",
      //       icon: "/img/logonew.svg",
      //       // buttons: false,
      //       timer: 5000,
      //     });
      //     navigate(`/draft-jobs`);
      //   })
      //   .catch((err) => {
      //     swal({
      //       title: "Error",
      //       text: err.response.data.message,
      //       className: "errorAlert",
      //       icon: "/img/logonew-red.svg",
      //       // buttons: false,
      //       timer: 5000,
      //     });
      //     setIsLoading(false);
      //   });
    } else {
      // const update_job = await axios
      //   .post(`${BACKEND_API_URL}jobs/`, formData, config)
      dispatch(CREATE_JOB(formData))
        .then((res) => {
          // console.log("POSTTTT", data);
          swal({
            title: "Successfully Complete",
            text: "Successfully Created",
            className: "successAlert",
            icon: "/img/logonew.svg",
            // buttons: false,
            timer: 5000,
          });
          if (data == "draft") {
            navigate(`/draft-jobs`);
          } else if (isShown) {
            navigate(`/templates/list`);
          } else {
            navigate(`/jobs/list`);
          }
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Template Already Exists",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            // buttons: false,
            timer: 5000,
          });
          setIsLoading(false);
        });
    }
    setImageChanged(false);
  };

  const draftValidateSubmit = (e, data) => {
    // console.log(data);
    e.preventDefault();

    // const tempErrors = {
    //   title: validations.title(title),
    // };
    // setErrors(tempErrors);
    // if (Object.values(tempErrors).filter((value) => value).length) {
    // setTimeout(function () {
    //   $("#error_move").attr("id", "");
    //   $(".error").first().attr("id", "error_move");
    //   $(window).scrollTop($("#error_move").position().top);
    // }, 500);

    // console.log(
    //   "..values",
    //   Object.values(tempErrors).filter((value) => value)
    // );
    //   return;
    // }

    submitHandler(data);
  };

  useEffect(() => {
    let useimage = localStorage.getItem("useimage");
    // dispatch(CollectionView(useimage));
  }, []);

  useEffect(() => {
    localStorage.removeItem("damon");
    localStorage.removeItem("jobdamid");
    localStorage.removeItem("prev_vault");
  }, []);

  // useEffect(() => {
  //   let asset = localStorage.getItem("asset");
  //   if (asset == "fileasset") {
  //     setexistingmediafile(Collectionviewdata);
  //     setisfiles(true);
  //   } else if (asset == "sampleasset") {
  //     setexistingsamplemediafile(Collectionviewdata);
  //     setissamplefiles(true);
  //   }
  // }, [moveit]);

  // useEffect(() => {
  //   if (dam === true) {
  //     setexistingmediafile1(Collectionviewdata);
  //     setisfiles(true);
  //   }
  // }, [moveit]);

  // useEffect(() => {
  //   if (sampledam === true) {
  //     setexistingsamplemediafile1(Collectionviewdata);
  //     setissamplefiles(true);
  //   }
  // }, [moveit]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("useimage");
      localStorage.removeItem("asset");
    }, 2500);
  }, []);

  useEffect(() => {
    let date1 = new Date(deliveryDate).getTime();
    // let date2 = new Date(d2).getTime();
    for (let index = 0; index < itemData.length; index++) {
      let date2 = new Date(itemData[index].due_date).getTime();
      if (date1 < date2) {
        setalertdate(true);
      } else {
        setalertdate(false);
      }
    }
  }, [deliveryDate, datechanger]);

  // useEffect(() => {
  //   dispatch(listAllAdminCompanies());
  //   window.scrollTo(0, 0);
  // }, [success]);
  const handleClickOpen3 = () => {};
  useEffect(() => {
    handleClickOpen3();
    const handler = () => {
      // setIsOpen(false);
      // setIsOpen1(false);
      setIsOpen2(false);
      // setIsOpen3(false);
      // setIsOpen4(false);
      // setIsOpen5(false);
      // setIsOpen6(false);
      setIsOpen7(false);
      setIsOpen8(false);
      setIsOpen9(false);
      setIsOpen10(false);
      setIsOpen11(false);
      // setIsOpenUser(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [addedSkill]);

  // useState(() => {
  //   if (jobId) {
  //     dispatch({ type: JOB_DETAILS_RESET });
  //   }
  // }, []);

  useEffect(() => {
    if (jobId) {
      setShow(true);
      // setShowdraft(false);
      settextchange(true);
      // dispatch(GET_JOBS_DETAILS(jobId));
      if (jobDetails?.details?.message) {
        // dispatch(listAdminInHouseUsers(jobDetails?.details.company));

        if (jobDetails?.details.is_house_member) {
          setIsBudgetNotRequired(true);
          if (jobDetails?.details?.house_member?.length > 0) {
            const houseMembersList = [];
            for (
              let index = 0;
              index < jobDetails?.details?.house_member?.length;
              index++
            ) {
              // houseMembersList.push(
              //   adminInHouseUsers?.find(
              //     (item) => item.id == jobDetails?.details?.house_member[index]
              //   )
              // );
            }
            setInHouseUser(houseMembersList);
          }
          setPrice("");
          setlevel(null);
          setJobType("0");
        } else {
          setPrice(jobDetails?.details?.details.price);
          setlevel(jobDetails?.details?.details.level?.id);
          setJobType(jobDetails?.details?.details.job_type);
        }
        if (jobDetails?.details?.details.status != 0) {
          setShowdraft(false);
        }
        setTitle(jobDetails?.details?.details.title);
        setDescription(jobDetails?.details?.details.description);
        // setFiles(jobDetails.images);
        // setJobSampleDocuments(jobDetails.images)
        setDeliveryDate(jobDetails?.details?.details.expected_delivery_date);
        setSkills(jobDetails?.details?.details.skills);
        setindustryname(jobDetails?.details?.details.industry);
        setdivid(jobDetails?.details?.details.due_date_index);
        // const success = api.get(`${BACKEND_API_URL}job-draft`).then((res) => {
        //   const success = api
        //     .get(`${BACKEND_API_URL}work-flow/?company=${jobDetails?.details?.company}`)
        //     .then((res) => {
        //       setapivalue(res.data);
        //     });
        // });
        // const successTemplateApi = api
        //   .get(
        //     `${BACKEND_API_URL}admin-job-template/?company=${jobDetails?.details?.company}`
        //   )
        //   .then((res) => {
        //     settemplatevalue(res.data);
        //   });
        setworkflowdata(jobDetails?.details?.workflow);
        // dispatch(getAdminRelatedJobs(jobDetails?.details?.company));
        setRelatedJobs(jobDetails?.details?.related_jobs);
        setcompanyvalue(jobDetails?.details?.company);
        setItemData(jobDetails?.details?.jobtasks_job);
        setTemplatename(jobDetails?.details?.template_name);

        for (
          let index = 0;
          index < jobDetails?.details?.images.length;
          index++
        ) {
          if (
            jobDetails?.details?.images[index].work_sample_image_name != null
          ) {
            setissamplefiles(true);
          }

          if (jobDetails?.details?.images[index]?.job_image_name != null) {
            setisfiles(true);
          }
        }

        if (jobDetails?.details?.related_jobs) {
          // setShow(true);
        }

        if (jobDetails?.details?.jobtasks_job[0]) {
          setIsShowntask(true);
        }

        if (jobDetails?.details?.image_url) {
          setisfiles(true);
          let newArray = jobDetails?.details?.image_url.split(",");
          setFormUrls(newArray);
        }
        if (jobDetails?.details?.sample_work_url) {
          setissamplefiles(true);
          let newArray = jobDetails?.details?.sample_work_url.split(",");
          setFormSampleUrls(newArray);
        }
        if (jobDetails?.details?.related_jobs?.length > 0) {
          setIsRelatedToPrevJob(true);
        }
        // setTags(jobDetails.tags);
        if (jobDetails?.details?.tags) {
          const tagsList = jobDetails?.details?.tags?.split(",");
          if (tagsList) {
            setTags(tagsList);
          }
        }
        if (jobDetails?.details?.images) {
          let newImages = jobDetails?.details?.images;
          newImages = newImages.filter((item) => item);
          setJobDocuments(newImages);
          let fileext = [];
          let s = [];
          let b = [];
          for (var i = 0; i < jobDetails?.details?.images.length; i++) {
            fileext.push(
              jobDetails?.details?.images[i].job_images?.slice(
                ((jobDetails?.details?.images[i].job_images.lastIndexOf(".") -
                  1) >>>
                  0) +
                  2
              )
            );
            // console.log(fileext);
            s.push(
              jobDetails?.details?.images[i].job_images?.slice(
                ((jobDetails?.details?.images[i].job_images.lastIndexOf("/") -
                  1) >>>
                  0) +
                  2
              )
            );
            b.push(jobDetails?.details?.images[i].job_images);
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
        if (jobDetails?.details?.images) {
          let newImages = jobDetails?.details.images;
          newImages = newImages.filter((item) => item);
          setJobSampleDocuments(newImages);
          let fileext1 = [];
          let s1 = [];
          let b1 = [];
          for (var i = 0; i < jobDetails?.details?.details.images.length; i++) {
            fileext1.push(
              jobDetails?.details?.details.images[i].work_sample_images?.slice(
                ((jobDetails?.details?.details.images[
                  i
                ].work_sample_images?.lastIndexOf(".") -
                  1) >>>
                  0) +
                  2
              )
            );
            s1.push(
              jobDetails?.details.images[i].work_sample_images?.slice(
                ((jobDetails?.details.images[i].work_sample_images?.lastIndexOf(
                  "/"
                ) -
                  1) >>>
                  0) +
                  2
              )
            );
            b1.push(jobDetails?.details.images[i].work_sample_images);
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
    // }, [success, successAgencyInHouseUsers]);
  }, []);

  useEffect(() => {
    // dispatch(listAllCategories());
    // dispatch(listAllLevels());
    // dispatch(listAllSkills());
    // dispatch(listAllIndustries());
    // dispatch(listAllAdminCompanies());
  }, [addedSkill]);

  // useEffect(() => {
  //   dispatch(getRelatedJobs());
  // }, [title]);

  useEffect(() => {
    // const success = api.get(`${BACKEND_API_URL}job-template`).then((res) => {
    //   settemplatevalue(res.data);
    // });\
    localStorage.removeItem("damon");
    localStorage.removeItem("prev_vault");
    localStorage.removeItem("jobdamid");
    // const tasks = api.get(`${BACKEND_API_URL}job-task`).then((res) => {
    //   settasks(res.data);
    // });

    // const industry = api
    //   .get(`${BACKEND_API_URL}agency/industries`)
    //   .then((res) => {
    //     setindustryvalue(res.data);
    //   });
  }, []);

  // DRAG AND DROP FUNCTIONALITY

  React.useEffect(() => {
    drop.current?.addEventListener("dragover", handleDragOver);
    drop.current?.addEventListener("drop", handleDrop);

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
    };
  }, []);

  // useEffect(() => {
  //   if (headerCompany) {
  //     setcompanyvalue(headerCompany);

  //     // const success = api
  //     //   .get(`${BACKEND_API_URL}company/${headerCompany}`)
  //     //   .then((res) => {
  //     //     //console.log(res?.data?.industry);
  //     //     // setapivalue(res.data);
  //     //     setindustryname(res?.data?.industry);
  //     //   });

  //     setErrors({ ...errors, company: null });
  //     // console.log(e.target.value);
  //     if (headerCompany === null) {
  //       setworkflowdata(null);
  //       // settemplatedata("1");
  //       setlevel(null);
  //       // setJobType("");
  //       setPrice("");
  //       setindustryname(null);
  //       // setDeliveryDate();
  //       setDescription("");
  //       setSkills([]);
  //       setTags([]);
  //       // setTemplatename();
  //       setisfiles(false);
  //       setissamplefiles(false);
  //       setInHouseUser([]);
  //     }
  //     if (headerCompany !== null) {
  //       // dispatch(listAdminInHouseUsers(headerCompany));
  //       // dispatch(getAdminRelatedJobs(headerCompany));
  //       // setShow(true);
  //       // const success = api
  //       //   .get(`${BACKEND_API_URL}work-flow/?company=${headerCompany}`)
  //       //   .then((res) => {
  //       //     // console.log(res.data);
  //       //     setapivalue(res.data);
  //       //   });
  //       // const successTemplateApi = api
  //       //   .get(`${BACKEND_API_URL}admin-job-template/?company=${headerCompany}`)
  //       //   .then((res) => {
  //       //     console.table(res.data);
  //       //     // gettemplate(e);
  //       //     settemplatevalue(res.data);
  //       //   });
  //     } else {
  //       setShow(false);
  //     }
  //   }
  // }, [headerCompany]);

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
    let imageSampleList: any = [];
    let previewSampleImages: any = [];
    let fileSampleext: any = [];
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
          // buttons: false,
          timer: 5000,
        });
        // return;
      } else if (!e.dataTransfer.files[i].type.match(imageMimeType)) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          // buttons: false,
          timer: 5000,
        });
        // return;
      } else if (e.dataTransfer.files[i]?.size > maxImageFileSize) {
        swal({
          title: "Error",
          text: "Max file size allowed is 10mb",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          // buttons: false,
          timer: 5000,
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

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let imageList: any = [];
    let previewImages: any = [];
    let fileext: any = [];
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
          // buttons: false,
          timer: 5000,
        });
      } else if (e.dataTransfer.files[i]?.size > maxImageFileSize) {
        swal({
          title: "Error",
          text: "Max file size allowed is 10mb",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          // buttons: false,
          timer: 5000,
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

  return (
    <div className="page-container">
      <div className="">
        <h1 className="text-2xl font-bold text-black">
          What Service Are You Looking For?
        </h1>
      </div>
      <div className="page-card card p-5">
        <div className="w-full max-w-[560px]">
          <div className="pb-5">
            <h1 className="text-2xl font-bold text-[#1b4ea8]">Job Details</h1>
          </div>
          <div
            className={
              errors.title
                ? "input-fields-wrapper error "
                : " input-fields-wrapper "
            }
          >
            <h4 className="flex gap-1 text-lg text-black font-bold mb-1">
              Job Title{" "}
              {!title && (
                <>
                  <label className="" style={{ color: "red" }}>
                    *
                  </label>
                </>
              )}
            </h4>
            <input
              className="input-style bg-[rgb(249_251_252)]"
              type="text"
              placeholder="Title"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors({ ...errors, title: null });
              }}
              value={title}
            />
            <span className="text-[#D14F4F] flex justify-end">
              {errors.title ?? ""}
            </span>
          </div>
          <div
            className={
              errors.company
                ? "input-fields-wrapper error my-4"
                : "input-fields-wrapper my-4"
            }
          >
            <h4 className="flex gap-1 text-lg text-black font-bold mb-1">
              Company{" "}
              {companyvalue == null && (
                <>
                  <label className="" style={{ color: "red" }}>
                    *
                  </label>
                </>
              )}
            </h4>{" "}
            <div className="">
              <Select
                className={`${
                  companyvalue == "" || companyvalue == null
                    ? "text-[#939393] hover:border-[#939393] "
                    : "text-[#000]"
                } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`}
                open={isOpen9}
                onOpen={() => {
                  setIsOpen9(true);
                }}
                onClose={() => {
                  setIsOpen9(false);
                }}
                // MenuProps={menuProps}
                value={companyvalue}
                onChange={getvalue}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={null}>Select Company</MenuItem>
                {companyList?.data?.results?.map((item) =>
                  item.is_active ? (
                    <MenuItem key={item.id} value={item.id}>
                      {item?.name}
                    </MenuItem>
                  ) : null
                )}
              </Select>
              <span className="text-[#D14F4F] flex justify-end">
                {errors.company ?? ""}
              </span>
            </div>
          </div>
          {show ? (
            <>
              <div className={errors.workflow ? " error mb-2" : " mb-2"}>
                <h4 className="flex gap-1 text-lg text-black font-bold mb-1 justify-between">
                  <div>
                    Approval Workflow ?{" "}
                    {Workflowdata == null && (
                      <>
                        <label className="" style={{ color: "red" }}>
                          *
                        </label>
                      </>
                    )}
                  </div>
                  <Link
                    className="text-base font-normal text-[#0d6efd]"
                    to="/workflow/add/"
                  >
                    + Add Workflow
                  </Link>
                </h4>{" "}
                <div className="input-fields-wrapper ">
                  <Select
                    className={`${
                      Workflowdata == "" || Workflowdata == null
                        ? "!text-[#939393] hover:border-[#939393] "
                        : "text-[#000] "
                    } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`}
                    open={isOpen8}
                    onOpen={() => {
                      setIsOpen8(true);
                    }}
                    onClose={() => {
                      setIsOpen8(false);
                    }}
                    // MenuProps={menuProps}
                    value={Workflowdata}
                    onChange={(e) => {
                      setworkflowdata(e.target.value);
                      setErrors({ ...errors, workflow: null });
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={null}>Select Workflow</MenuItem>
                    {WorkFlowData?.workFlowList?.data?.results?.map((item) =>
                      item.is_active ? (
                        <MenuItem key={item.id} value={item.id}>
                          {item?.name}
                        </MenuItem>
                      ) : null
                    )}
                  </Select>
                  <span className="text-[#D14F4F]">
                    {errors.workflow ?? ""}
                  </span>
                </div>
              </div>

              <div className="input-fields-wrapper mb-2 ">
                <h4 className="text-lg text-black font-bold mb-1">
                  Select Job Template
                </h4>{" "}
                <div className="">
                  <Select
                    className={`${
                      templatedata == "" || templatedata == null
                        ? "!text-[#939393] hover:border-[#939393] "
                        : "text-[#000] "
                    } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`}
                    open={isOpen7}
                    onOpen={() => {
                      setIsOpen7(true);
                    }}
                    onClose={() => {
                      setIsOpen7(false);
                    }}
                    value={templatedata}
                    onChange={gettemplate}
                    // MenuProps={menuProps}
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

              <div className={"input-fields-wrapper mb-2"}>
                <h4 className="text-lg text-black font-bold">Industry</h4>{" "}
                <div className="styled-select Companyname">
                  <Select
                    className={`${
                      industryname == "" || industryname == null
                        ? "!text-[#939393] hover:border-[#939393] "
                        : "text-[#000] "
                    } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`}
                    open={isOpen2}
                    onOpen={() => {
                      setIsOpen2(true);
                    }}
                    onClose={() => {
                      setIsOpen2(false);
                    }}
                    // disabled={industryname}
                    // MenuProps={menuProps}
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
                ? "input-fields-wrapper error"
                : "input-fields-wrapper "
            }
          >
            <h4 className="flex gap-1 text-lg text-black font-bold mb-1">
              Describe Your Job{" "}
              {!description && (
                <>
                  <label className="jobeditdiv" style={{ color: "red" }}>
                    *
                  </label>
                </>
              )}
            </h4>
            <p className="text-sm my-2 text-[#474e55]">
              This could include dimensions, colors, how you plan to use it, or
              anything else that the content creator needs to know in order to
              meet your expectations.
            </p>
            <textarea
              className="h-[180px] input-style bg-[rgb(249_251_252)] custom-scrollbar"
              placeholder=""
              maxLength={4000}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors({ ...errors, description: null });
              }}
            />
            <p className="flex justify-end text-sm">
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
            className="flex gap-2 items-center"
            // style={{ display: "flex" }}
          >
            {show ? (
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                // value={isRelatedToPrevJob}
                // checked={isRelatedToPrevJob}
                onClick={() => setIsRelatedToPrevJob(!isRelatedToPrevJob)}
              />
            ) : (
              <input
                type="checkbox"
                disabled={true}
                name="vehicle1"
                className="w-[20px] h-[20px] rounded-lg "
              />
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
            <div className="input-fields-wrapper mb-2">
              <h4 className="text-lg text-black font-bold mb-1">
                Related Jobs (if applicable)
              </h4>
              <div className="">
                <Select
                  className={`${
                    relatedJobs == "" || relatedJobs == null
                      ? "!text-[#939393] hover:border-[#939393] "
                      : "text-[#000] "
                  } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`}
                  open={isOpen11}
                  // open={true}
                  onOpen={() => {
                    setIsOpen11(true);
                  }}
                  onClose={() => {
                    setIsOpen11(false);
                  }}
                  // MenuProps={menuProps}
                  value={relatedJobs}
                  onChange={(e) => {
                    setRelatedJobs(e.target.value);
                    // setErrors({ ...errors, level: null });
                  }}
                  placeholder="Select Related Job"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={null}>Select Related Job</MenuItem>
                  {/* {adminRelatedJobs
                          ?.filter((item) => item.id != jobId)
                          ?.map(
                            (item) =>
                              item && (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.title}
                                </MenuItem>
                              )
                          )} */}
                </Select>
              </div>
            </div>
          )}
          <div className={errors.skills ? "error-style mb-4 " : "mb-4"}>
            <h4 className=" text-lg text-black font-bold mb-1 mt-3">
              Skills Needed
            </h4>
            <div className=" mt-2-">
              <div className="">
                {/* {JSON.stringify(skills)} */}
                <Autocomplete
                  className="bg-[rgb(249_251_252)] rounded w-full h-12"
                  value={skills}
                  multiple
                  id="tags-outlined"
                  open={isOpenSkill}
                  // open={true}
                  onInputChange={handleInputChangeAutocomplete}
                  filterOptions={filterOptions}
                  options={skillsData.filter((item) => item.is_active)}
                  getOptionLabel={(option) => option.skill_name}
                  // onChange={(event, value) => setSkills(value)}
                  onChange={(e, v) => {
                    changeHandler(e, v);
                    // setErrors({ ...errors, skills: null });
                  }}
                  // defaultValue={skills ?? []}
                  // inputValue={skills}
                  // inputProps={{ "aria-label": "Without label" }}
                  filterSelectedOptions
                  noOptionsText={
                    "Press enter to add this skill and select again"
                  }
                  // hiddenLabel="true"
                  // open={false}
                  onKeyDown={handleKeyDownSkills}
                  autoHighlight={true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="Type something"
                      className="bg-[rgb(249_251_252)] rounded w-full h-12 mb-1"
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
        </div>

        <div className="border-t-4"></div>
        <div className="w-full max-w-[560px] pb-5">
          <div className="py-5">
            <h1 className="text-2xl font-bold text-[#1b4ea8]">
              Files and Assets
            </h1>
          </div>

          <div className="switch_Agency">
            <div className="flex gap-4 mb-4">
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
              <h4 className="text-lg text-black font-semibold">
                Files and Assets{" "}
                <span className="text-base text-[#A0A0A0]">Optional</span>
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
                  Only upload files and artwork that you own the copyright for,
                  or that you have permission to use and distribute for
                  commercial work.
                </p>
                {/* <h4 className="Attachment_new1">Attachment</h4> */}
                <div className="flex border border-1 rounded">
                  <div className="border-r w-full max-w-[35%] flex-center">
                    <div className="text-center p-5">
                      <div
                        className="newimgdrp"
                        // {...getRootfileProps({ style })}
                      >
                        <input
                          {...getInputfileProps()}
                          // imgExtension={[
                          //   ".jpg",
                          //   ".gif",
                          //   ".png",
                          //   ".gif",
                          //   ".mp4",
                          // ]}
                          // maxfilesize={5242880}
                        />

                        <p className="text-base font-bold text-[#1B4EA8]">
                          <span className="text-base font-bold">
                            {" "}
                            <FileUploadOutlined></FileUploadOutlined>
                            Upload Files
                          </span>
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#71757b] my-2">
                        or
                      </p>
                      <div className="browsevauleButton">
                        <button
                          onClick={handleClickOpenDam}
                          className="btn btn-primary mx-auto"
                        >
                          Browse Vault
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-5">
                    <div className="assertSelectedArea">
                      <div>
                        <h5 className="text-base font-bold text-black">
                          Selected Assets
                        </h5>
                        <aside className={"flex flex-row flex-wrap mt-[16px]"}>
                          {thumbs}
                          {existingMedia}
                          {existingMedia1}

                          {/* {JSON.stringify(jobDocuments)} */}
                          {jobDocuments && (
                            <>
                              {jobId ? (
                                <>
                                  {jobDocuments?.map((item, index) => (
                                    <>
                                      {item?.job_image_name && (
                                        <>
                                          <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]">
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
                                                  removeDocument(index, "data");
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
                                          <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]">
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
                                                  removeDocument(index, "data");
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
                              <a className="adifecttesturl">{element}</a>
                              <img
                                className="assertbinLogo2"
                                src="/img/assertbin.png"
                                onClick={() => removeFormFieldsUrls(index)}
                              />
                            </div>
                          )}
                        </div>
                      ))}

                      {showText && (
                        <>
                          <div className="form-section">
                            <p className="mb-2">
                              Link must be publically accessible
                            </p>
                          </div>
                          <div
                            className={
                              errors.formImgUrls
                                ? "flex gap-2 error-style"
                                : "flex gap-2 "
                            }
                          >
                            <input
                              className="input-style"
                              type="text"
                              onKeyDown={handleKeyDownUrl}
                              value={imgUrl}
                              placeholder="Enter URL"
                              onChange={(e) => {
                                setImgUrl(e.target.value);
                                setErrors({
                                  ...errors,
                                  formImgUrls: null,
                                });
                              }}
                            />
                            <div className="cursor-pointer">
                              <a
                                onClick={(e) => {
                                  // addFormFieldsUrls();
                                  handleChangeUrls(e);
                                }}
                                className="btn btn-outline"
                              >
                                Use
                              </a>
                            </div>
                          </div>
                        </>
                      )}
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
                      <div className="cursor-pointer my-3">
                        <a
                          onClick={onClickInclude}
                          className="text-base font-semibold text-[#2472fc]"
                        >
                          <Add></Add> Include a URL
                        </a>
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

          <div className="switch_Agency">
            <div className="flex gap-4">
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
                <span className="slider round sliderround"></span>
              </label>
              <h4 className="text-lg text-black font-semibold">
                Samples of Work You Like{" "}
                <span className="text-base text-[#A0A0A0]">Optional</span>
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
                  This is to help the content creator understand the type of
                  work you like. This doesn’t need to be work that you own the
                  copyright for, but Adifect will only store it for 30 days
                  after the completion of this job and will not use it for any
                  other purposes.
                </p>
                {/* <h4 className="Attachment_new1">Attachment</h4> */}
                <div className="flex border border-1 rounded">
                  <div className="border-r w-full max-w-[35%] flex-center">
                    <div className="text-center p-5">
                      <div
                        className="newimgdrp"
                        // {...getRootGalleryProps({ style })}
                      >
                        <input
                          {...getInputGalleryProps()}
                          // imgExtension={[
                          //   ".jpg",
                          //   ".gif",
                          //   ".png",
                          //   ".gif",
                          //   ".mp4",
                          // ]}
                          // maxfilesize={5242880}
                        />

                        <p className="text-base font-bold text-[#1B4EA8]">
                          <span className="text-base font-bold">
                            {" "}
                            <FileUploadOutlined></FileUploadOutlined>
                            Upload Files
                          </span>
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#71757b] my-2">
                        or
                      </p>
                      <div className="browsevauleButton">
                        <button
                          onClick={handleClickOpenDam1}
                          className="btn btn-primary mx-auto"
                        >
                          Browse Vault
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-5">
                    <div className="assertSelectedArea">
                      <div>
                        <h5 className="text-base font-bold text-black">
                          Selected Assets
                        </h5>
                        <aside className="flex flex-row flex-wrap mt-[16px]">
                          {thumbs1} {existingsampleMedia} {existingsampleMedia1}
                          {jobSampleDocuments && (
                            <>
                              {jobId ? (
                                <>
                                  {jobSampleDocuments?.map((item, index) => (
                                    <>
                                      {item?.work_sample_image_name && (
                                        <div className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]">
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
                                            {item?.work_sample_image_name}
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {jobSampleDocuments?.map((item, index) => (
                                    <>
                                      {item?.work_sample_image_name && (
                                        <div
                                          className="inline-flex rounded-sm border-1-[#eaeaea] mb-[8px] mr-[8px] w-full h-full p-[4px]"
                                          // style={thumb}
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
                                            {item?.work_sample_image_name}
                                          </div>
                                        </div>
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
                      {formSampleUrls.map((element, index) => (
                        <div className="form-inline" key={index}>
                          {element && (
                            <div className="assertDustbinLink">
                              <img
                                className="linkicon"
                                src="/img/asserLink.png"
                              />
                              <a className="adifecttesturl">{element}</a>
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
                      {showText1 && (
                        <>
                          <div className="form-section">
                            <p className="mb-2">
                              Link must be publically accessible
                            </p>
                          </div>
                          <div
                            className={
                              errors.formsampleImgUrls
                                ? "flex gap-2 error-style"
                                : "flex gap-2 "
                            }
                          >
                            <input
                              className="input-style"
                              type="text"
                              onKeyDown={handleKeyDownSampleUrl}
                              value={sampleimgUrl}
                              placeholder="Enter URL"
                              onChange={(e) => {
                                setsampleImgUrl(e.target.value);
                                setErrors({
                                  ...errors,
                                  formsampleImgUrls: null,
                                });
                              }}
                            />
                            <div className="cursor-pointer">
                              <a
                                onClick={(e) => {
                                  handleChangesampleUrls(e);
                                }}
                                className="btn btn-outline"
                              >
                                Use
                              </a>
                            </div>
                          </div>
                        </>
                      )}
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
                      <div className="cursor-pointer my-3">
                        <a
                          onClick={onClickInclude1}
                          className="text-base font-semibold text-[#2472fc]"
                        >
                          <Add></Add> Include a URL
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

        <div className="border-t-4"></div>
        <div className="w-full max-w-[560px] pb-5">
          <div className="py-5">
            <h1 className="text-2xl font-bold text-[#1b4ea8]">Tasks</h1>
          </div>

          <div className="switch_Agency">
            <div className="flex gap-4">
              <label className="switch">
                {isShowntask && (
                  <>
                    {" "}
                    <input
                      type="checkbox"
                      checked={true}
                      onClick={handleClicktask}
                    />
                  </>
                )}
                {!isShowntask && (
                  <>
                    {" "}
                    <input
                      type="checkbox"
                      checked={false}
                      onClick={handleClicktask}
                    />
                  </>
                )}

                <span className="slider round"></span>
              </label>
              <h4 className="text-lg text-black font-semibold">
                This job contains multiple tasks{" "}
                <span className="text-base text-[#A0A0A0]">Optional</span>
              </h4>
            </div>
          </div>

          {isShowntask && (
            <>
              {" "}
              <div className="text-content addjobseditdev">
                {/* <h4 className="Attachment_new1">
                          Your Assets
                          <span className="optional-A">Optional</span>
                        </h4> */}
                <p className="uptext-A">
                  Only upload files and artwork that you own the copyright for,
                  or that you have permission to use and distribute for
                  commercial work.
                </p>
                {/* <h4 className="Attachment_new1">Attachment</h4> */}
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
                      className="tastsinput tastsinputNew"
                      type="text"
                      name="title"
                      placeholder="Enter task and date"
                      value={inputData.title}
                      onChange={handleChange}
                      // onKeyDown={handleChange}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          handleSubmit(event);
                        }
                      }}
                    />
                    {/* <button
                          className="saveTaskJobAddEditbtn"
                          type="button"
                          onClick={handleSubmit}
                        >
                          Save Task
                        </button> */}
                    <span
                      className="text-[#D14F4F]"
                      style={{
                        color: "#D14F4F",
                        opacity: errors.tasks ? 1 : 0,
                      }}
                    >
                      {errors.tasks ?? "valid"}
                    </span>
                    <br />

                    <div className="App_date App_datenewdiv20">
                      <label className="taskDueDate">taskDueDate</label>
                      <CustomDateRangePicker handleChange={handleDateChange} />
                      {/* <input
                            name="due_date"
                            type="date"
                            value={inputData.due_date}
                            onChange={handleChange}
                          />  */}
                    </div>
                    <button
                      className="adddataButton"
                      onClick={handleSubmit}
                      id="adddataButtonHandler"
                    >
                      {/* <img src="/img/plus.png" /> */}{" "}
                      <img src="/img/addimg148.png" /> Add
                    </button>
                  </div>
                </div>
                {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
              </div>
            </>
          )}
        </div>

        <div className="border-t-4"></div>
        <div className="w-full max-w-[560px] pb-5">
          <div className="py-5">
            <h1 className="text-2xl font-bold text-[#1b4ea8]">
              Budget and Timeline
            </h1>
          </div>

          <div className="switch_Agency">
            <div className="flex gap-4">
              <label className="switch">
                {" "}
                <input
                  type="checkbox"
                  value={isBudgetNotRequired}
                  checked={isBudgetNotRequired}
                  onClick={() => setIsBudgetNotRequired(!isBudgetNotRequired)}
                />
                <span className="slider round"></span>
              </label>
              <h4 className="text-lg text-black font-semibold">
                Budget not required - Internal Project Management Only
              </h4>
            </div>

            {!isBudgetNotRequired && (
              <>
                <h4 className="text-lg text-black font-semibold">
                  Job Pricing Type *
                </h4>

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
              </>
            )}

            {!isBudgetNotRequired && (
              <>
                <div className={errors.level ? " mt-4 error" : " mt-4"}>
                  <h4 className="text-lg text-black font-semibold">
                    Experience Level{" "}
                    {!level && (
                      <>
                        <label className="" style={{ color: "red" }}>
                          *
                        </label>
                      </>
                    )}
                  </h4>{" "}
                  <div className="">
                    <Select
                      className={`${
                        level == null
                          ? "text-[#939393] hover:border-[#939393] "
                          : "text-[#000]"
                      } bg-[rgb(249_251_252)] rounded w-full h-12 mb-1`}
                      open={isOpen10}
                      onOpen={() => {
                        setIsOpen10(true);
                      }}
                      onClose={() => {
                        setIsOpen10(false);
                      }}
                      // MenuProps={menuProps}
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
                    {/* <div className="diverrors44 diverrors5">
                          <span
                            style={{
                              color: "#D14F4F",
                              opacity: errors.level ? 1 : 0,
                            }}
                          >
                            {errors.level ?? "valid"}
                          </span>
                        </div> */}
                  </div>
                </div>
              </>
            )}

            <div className="text-content my-2">
              {!isBudgetNotRequired && (
                <>
                  <div
                    className={
                      errors.price
                        ? "text-content error Experiencenew"
                        : "text-content  Experiencenew"
                    }
                  >
                    <h4 className="text-lg text-black font-semibold">
                      Offer Price{" "}
                      {!price && (
                        <>
                          <label
                            className="jobeditdiv"
                            style={{ color: "red" }}
                          >
                            *
                          </label>
                        </>
                      )}
                    </h4>
                    <div className="flex gap-4">
                      <input
                        className="input-style w-full max-w-[130px]"
                        type="number"
                        onKeyDown={blockInvalidChar}
                        // pattern="[0-9]"
                        value={price}
                        placeholder="Price"
                        onChange={(e) => {
                          setPrice(e.target.value.replace(/[^0-9.]/g, ""));
                        }}
                      />
                      <span className="pricetag pricetag_A pricetag_A21 dollarCss">
                        $
                      </span>
                    </div>
                  </div>
                  <div className="diverrors44 diverrors44Space">
                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.price ? 1 : 0,
                      }}
                    >
                      {errors.price ?? "valid"}
                    </span>
                  </div>
                </>
              )}
            </div>

            {isBudgetNotRequired && (
              <div className="selectUserProjectManagement my-4">
                <h4 className="Attachment_Price_new_4">Select User(s)</h4>
                {/* eslint-disable-next-line */}
                <Autocomplete
                  disabled={!companyvalue}
                  value={inHouseUser ?? []}
                  // name="inHouseUser"
                  // value={approvers}
                  multiple
                  id="tags-outlined"
                  // open={isOpenUser}
                  onInputChange={handleInputChangeAutocompleteUsers}
                  filterOptions={filterOptionsUsers}
                  // options={adminInHouseUsers ?? []}
                  options={skillsData ?? []}
                  getOptionLabel={(option) => option?.user_full_name}
                  // onChange={(event, value) => setSkills(value)}
                  onChange={(e, v) => {
                    changeHandlerInHouseUsers(e, v);
                  }}
                  // defaultValue={skills ?? []}
                  // inputValue={skills}
                  // inputProps={{
                  //   "aria-label": "Without label",
                  // }}
                  filterSelectedOptions
                  // noOptionsText={
                  //   "Press enter to add this skill and select again"
                  // }
                  // hiddenLabel="true"
                  onKeyDown={handleKeyDownInHouseUsers}
                  autoHighlight={true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder={
                        !companyvalue
                          ? "Select a company first"
                          : "Type something"
                      }
                    />
                  )}
                  isOptionEqualToValue={
                    (option, value) =>
                      value === undefined ||
                      value === "" ||
                      option.id === value.id
                    // option.value == value.value
                  }
                />
                <div className="diverrors44 diverrors5">
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.inHouseUser ? 1 : 0,
                    }}
                  >
                    {errors.inHouseUser ?? "valid"}
                  </span>
                </div>
              </div>
            )}

            <h4 className="flex gap-1 text-lg text-black font-bold mb-1">
              Due Date{" "}
              {!deliveryDate && (
                <>
                  <span className="text-red-500" style={{ color: "red" }}>
                    *
                  </span>
                </>
              )}
            </h4>

            <div className={errors.deliveryDate ? " error" : " "}>
              <div className="flex w-full border border-1 rounded-md justify-between gap-4">
                <div
                  id="1"
                  onClick={() => handleDiv("1")}
                  className={
                    divid == 1 ? "p-2 activ3 text-center" : "p-2 text-center"
                  }
                >
                  <h1 className="text-sm text-black font-bold">24 Hours</h1>
                  <p>{coverter}</p>
                </div>

                <div
                  className={
                    divid == 2 ? "p-2 activ3 text-center" : "p-2 text-center"
                  }
                  onClick={() => handleDiv("2")}
                >
                  <h1 className="text-sm text-black font-bold">3 Day</h1>
                  <p>{coverter1}</p>
                </div>
                <div
                  className={
                    divid == 3 ? "p-2 activ3 text-center" : "p-2 text-center"
                  }
                  onClick={() => handleDiv("3")}
                >
                  <h1 className="text-sm text-black font-bold">7 Day</h1>
                  <p>{coverter2}</p>
                </div>
                <div
                  className={divid == 4 ? "fourth_date activ4" : "fourth_date"}
                  onClick={() => handleDiv("4")}
                >
                  {/* <CustomDateRangePicker handleChange={handleChange} /> */}
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <label
                      className={
                        alertdate == true ? "lastdatesec error" : "lastdatesec"
                      }
                    >
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
                  </LocalizationProvider> */}
                </div>
              </div>
              {alertdate && (
                <>
                  {" "}
                  <span
                    className="companyclass45"
                    style={{
                      color: "#D14F4F",
                      float: "right",
                    }}
                  >
                    Please check task date
                  </span>
                </>
              )}
              <div className="text-[#D14F4F]">
                <span
                  style={{
                    color: "#D14F4F",
                    opacity: errors.deliveryDate ? 1 : 0,
                  }}
                >
                  {errors.deliveryDate ?? "valid"}
                </span>
              </div>
            </div>

            <div className={errors.tags ? "error" : " "}>
              <h4 className="text-lg text-black font-bold mb-1">Tags</h4>
              <div className="Marketing  Marketing_2 display-f">
                <div className="tags-input-container">
                  {tags?.map((tag, index) => (
                    <div className="tag-item" key={index}>
                      <span className="text">{tag}</span>
                      <span className="close" onClick={() => removeTag(index)}>
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
                    onChange={(e) => {
                      setErrors({ ...errors, tags: null });
                      setSavetagButton(e.target.value);
                    }}
                    type="text"
                    className="tags-input"
                    // className="input-style bg-[rgb(249_251_252)]"
                    placeholder="Type something"
                    value={savetagbutton}
                    ref={inputRef}
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
              <div className="flex justify-end w-full">
                <button
                  onClick={(e) => handleSaveTag(e, "check")}
                  className="btn btn-outline"
                >
                  {" "}
                  Save Tag
                </button>
              </div>
            </div>

            <div className="switch_Agency">
              <div className="flex gap-4">
                <label className="switch">
                  {" "}
                  <input type="checkbox" onClick={handleClick} />
                  <span className="slider round"></span>
                </label>

                {!textchange && (
                  <h4 className="text-lg text-black font-semibold">
                    Save as Template
                  </h4>
                )}

                {textchange && (
                  <h4 className="text-lg text-black font-semibold">
                    Save as New Template
                  </h4>
                )}
              </div>
            </div>

            {isShown && (
              <div
                className={
                  errors.template ? "istoggle_Shown error " : "istoggle_Shown  "
                }
              >
                <p className="Templatetext">
                  This will save everything except the Offer Price, Due Date,
                  and Previous Job
                </p>
                <input
                  className="input-style"
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
        </div>
        <div className="text-content mt-4">
          {/* {errorCheck && (
                  <>
                    <div className="errorCheck message">
                      <div className="alert alert-warning" role="alert">
                        Please enter/select all required fields.{" "}
                      </div>
                    </div>
                  </>
                )} */}
          <div className="flex justify-between">
            <div className=" flex gap-4">
              <Link
                to="/jobs/list"
                className="btn btn-outline w-full max-w-[160px]"
              >
                Cancel
              </Link>
              <div className="">
                <button
                  type="button"
                  onClick={(e) => {
                    validateSubmit(e, "post");
                    setstatus(2);
                  }}
                  className="btn btn-primary w-full max-w-[160px]"
                >
                  {showdraft ? <>Publish</> : <>Submit</>}
                </button>
              </div>
            </div>

            {showdraft && (
              <>
                {" "}
                <div className="buttomjobbtn draftButt">
                  <button
                    type="button"
                    onClick={(e) => {
                      draftValidateSubmit(e, "draft");
                      setstatus(0);
                    }}
                    className="btn btn-outline w-full max-w-[160px]"
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
  );
};

export default AdminJobsAddEdit;
