// import React, {
//     useEffect,
//     useState,
//     useRef,
//     useMemo,
//     useCallback,
//   } from "react";
//   import { useDispatch, useSelector } from "react-redux";
//   import { Button } from "@mui/material";
//   import { Link } from "react-router-dom";
//   import $ from "jquery";
//   import axios from "axios";
//   import Dialog from "@mui/material/Dialog";
//   import DialogActions from "@mui/material/DialogActions";
//   import DialogContent from "@mui/material/DialogContent";
//   import DialogTitle from "@mui/material/DialogTitle";
//   import swal from "sweetalert";
//   import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//   import { useNavigate } from "react-router-dom";
//   import { DatePicker } from "@mui/x-date-pickers";
//   import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
//   import TextField from "@mui/material/TextField";
//   import Slide from "@mui/material/Slide";
//   import moment from "moment";
//   import { useDropzone } from "react-dropzone";
  
//   import LoadingSpinner from "./../../containers/LoadingSpinner";
//   import { BACKEND_API_URL } from "../../environment";
//   import { FreshJobs } from "../../redux/actions/job-actions";
//   import { getJobDetails } from "../../redux/actions/job-actions";
//   import api from "../../utils/api";
//   import Creator_dashboard_in_progress from "./Creator-dashboard-in-progress";
//   import Creator_dashboard_in_review from "./Creator-dashboard-in-review";
//   import { JOB_DETAILS_RESET } from "../../constants/job-constants";
  
//   const baseStyle = {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     borderWidth: 2,
//     borderRadius: 2,
//     borderColor: "#eeeeee",
//     borderStyle: "dashed",
//     backgroundColor: "#fafafa",
//     color: "#bdbdbd",
//     outline: "none",
//     transition: "border .24s ease-in-out",
//   };
  
//   const focusedStyle = {
//     borderColor: "#2196f3",
//   };
  
//   const thumbsContainer = {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 16,
//   };
  
//   const thumb = {
//     display: "inline-flex",
//     borderRadius: 2,
//     border: "1px solid #eaeaea",
//     marginBottom: 8,
//     marginRight: 8,
//     width: 100,
//     height: 100,
//     padding: 4,
//     boxSizing: "border-box",
//   };
  
//   const thumbInner = {
//     display: "flex",
//     minWidth: 0,
//     overflow: "hidden",
//   };
  
//   const img = {
//     display: "block",
//     width: "100%",
//     height: "100%",
//   };
  
//   const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />;
//   });
  
//   export default function CreatorDashboard() {
//     let navigate = useNavigate();
  
//     const [show, setShow] = useState(false);
  
//     const clearMainNegotiate = () => {
//       setlink("");
//       setStartDate(new Date());
//       setProposedPrice("");
//       setProposedDate("");
  
//       setdatepricewarning(false);
//       set50value(false);
//       set25value(false);
//     };
  
//     const mainNegotiate = () => {
//       setShow(true);
//       if (number == "") {
//         setlink(offerPrice);
//       }
//     };
  
//     const mainProposedCancel = () => {
//       setShow(false);
//       // setlink("");
//       setdatepricewarning(false);
//       set50value(false);
//       set25value(false);
  
//       setlink(proposedPrice);
//       setStartDate(proposedDate);
//     };
  
  
//     const maxImageFileSize = 10000000;
  
//     const [files, setFiles] = useState([]);
  
//     const onDrop = useCallback(
//       (acceptedFiles) => {
//         setFiles([
//           ...files,
//           ...acceptedFiles.map((file) =>
//             Object.assign(file, {
//               preview: URL.createObjectURL(file),
//               title: file.name,
//             })
//           ),
//         ]);
//       },
//       [files]
//     );
  
//     const {
//       getRootProps,
//       getInputProps,
//       isDragActive,
//       acceptedFiles,
//       isFocused,
//       isDragAccept,
//       isDragReject,
//     } = useDropzone({
//       onDrop,
//       accept: {
//         "image/jpeg": [],
//         "image/png": [],
//         "image/svg+xml": [],
//         "image/gif": [],
//       },
//       onDrop: useCallback(
//         (acceptedFiles) => {
//           // console.log(acceptedFiles[0]);
//           if (!acceptedFiles[0].type.match(imageMimeType)) {
//             swal({
//               title: "Error",
//               text: "Image type is not valid",
//               className: "errorAlert",
//               icon: "/img/logonew-red.svg",
//               buttons: false,
//               timer: 5000,
//             });
//           } else if (acceptedFiles[0].size > maxImageFileSize) {
//             swal({
//               title: "Error",
//               text: "Max file size allowed is 10mb",
//               className: "errorAlert",
//               icon: "/img/logonew-red.svg",
//               buttons: false,
//               timer: 5000,
//             });
//           } else {
//             setFiles([
//               ...files,
//               ...acceptedFiles.map((file) =>
//                 Object.assign(file, {
//                   preview: URL.createObjectURL(file),
//                   title: file.name,
//                 })
//               ),
//             ]);
//           }
//         },
//         [files]
//       ),
//     });
  
//     const style = useMemo(
//       () => ({
//         ...baseStyle,
//         ...(isFocused ? focusedStyle : {}),
//       }),
//       [isFocused, isDragAccept, isDragReject]
//     );
  
//     const removeFile = (file) => () => {
//       const newFiles = [...files];
//       newFiles.splice(newFiles.indexOf(file), 1);
//       setFiles(newFiles);
//     };
  
//     const thumbs = files.map((file) => (
//       <div style={thumb} key={file.name}>
//         <div className="jobimgdashboard" style={thumbInner}>
//           <button className="jobaplyeclosebuttan" onClick={removeFile(file)}>
//             X
//           </button>
//           <img
//             className="imguploadcreatorimg"
//             src={file.preview}
//             style={img}
//             // Revoke data uri after image is loaded
//             onLoad={() => {
//               URL.revokeObjectURL(file.preview);
//             }}
//           />
//           {file.title}
//         </div>
//       </div>
//     ));
  
//     const [input, setinput] = useState("");
//     const [question, setquestion] = useState("");
//     const [coverletter, setcoverletter] = useState("");
//     const [datepricewarning, setdatepricewarning] = useState(false);
//     const handleChange2 = (evt) => {
//       const { value } = evt.target;
//       if (value.match(/\./g)) {
//         const [, decimal] = value.split(".");
  
//         if (decimal?.length > 2) {
//           return;
//         }
//       }
//       // otherwise, update value in state
//       setinput(value);
//     };
  
//     const [showBlueBox, setShowBlueBox] = useState(true);
//     const dispatch = useDispatch();
//     const { userData } = useSelector((state) => state.authReducer);
//     const { freshJob, message: freshJobMessage } = useSelector(
//       (state) => state.freshJobsListReducer
//     );
  
//     const handleClick = () => {
//       $(".fresh_job_section_close");
//       $(".fresh_job_section").toggle(400);
//     };
  
//     const blockInvalidChar = (e) =>
//       ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  
//     const [isLoading, setIsLoading] = useState(true);
//     const { success: job_detail_success, jobDetails } = useSelector(
//       (state) => state.jobDetailsReducer
//     );
//     const [jobId, setJobId] = useState();
//     const [title, setTitle] = useState();
//     const [offerPrice, setOfferPrice] = useState();
//     const [jobDescription, setJobDescription] = useState();
//     const [deliveryDate, setDeliveryDate] = useState();
//     const [proposedPrice, setProposedPrice] = useState();
//     const [proposedDate, setProposedDate] = useState();
//     const [duedeliveryDate, duesetDeliveryDate] = useState();
//     const [tags, setTags] = useState([]);
//     const [sampleimgUrl, setsampleImgUrl] = useState("");
//     const [category, setCategory] = useState();
//     const [userdata, setuserdata] = useState();
//     const [skills, setSkills] = useState([]);
//     const [formSampleUrls, setFormSampleUrls] = useState([]);
//     const [industry, setIndustry] = useState();
//     const [level, setLevel] = useState();
//     const [job_type, setJobType] = useState();
//     const [company_type, setCompanyType] = useState();
//     const [hide, sethide] = useState(true);
//     const [selects, setselects] = useState(null);
//     const [number, setlink] = useState("");
//     const [message, setMessage] = useState("");
//     const [company, setCompanyname] = useState("");
//     const [jobDocumentsPopup, setJobDocumentsPopup] = useState();
//     const [pricevalue, setpricevalue] = useState(true);
//     const [dateshow, setdateshow] = useState(true);
//     const [attachFiles, setAttachFiles] = useState(false);
//     const [fileExtension, setFileExtension] = useState();
//     const [sizeError, setSizeError] = useState(false);
//     const [lengthError, setLengthError] = useState(false);
//     const [per25, set25value] = useState(false);
//     const [per75, set75value] = useState(false);
//     const [per50, set50value] = useState(false);
//     const [per10, set10value] = useState();
//     const [per20, set20value] = useState();
//     const [per30, set30value] = useState();
//     const [dateadd1, setdateadd1] = useState();
//     const [dateadd2, setdateadd2] = useState();
//     const [dateadd3, setdateadd3] = useState();
//     const [datewarning, setdateWarning] = useState(false);
//     const { useridentity, setUsername } = useState("");
//     const [startDate, setStartDate] = useState(new Date());
//     const [daysData, setDaysData] = useState("");
//     const [daysdifference, setdaysdifference] = useState();
//     const [daysdifferencestartdate, setdaysdifferencestartdate] = useState();
//     const [deliverydata, setdeliverydata] = useState("");
//     const [deliveryhoursvalue, setdeliveryhoursvalue] = useState("");
//     const [deliveryhours, setdeliveryhours] = useState(false);
//     const [deliverydatevalue, setdeliverydatevalue] = useState(false);
//     const [showData, setShowData] = useState(false);
//     const imgRef = useRef(null);
//     const [createddate, setcreateddate] = useState();
//     const [formUrls, setFormUrls] = useState([""]);
//     const [printPreData, setPrintPreData] = useState("");
  
//       // --------------------------show images and video-------------------------------------
//       const [jobDocuments, setJobDocuments] = useState([]);
//       const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
//       const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
//       const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
//       const [jobvideoDocuments, setJobDocumentsvideo] = useState([]);
//       const [additionalvideoJobDocuments, setAdditionalvideoJobDocuments] =
//         useState([]);
//       const [jobvideoDocumentsThumbs, setJobDocumentsvideoThumbs] = useState([]);
//       const [jobSamplevideoDocumentsThumbs, setJobSamplevideoDocumentsThumbs] =
//         useState([]);
//       const [newJobDetails, setNewJobDetails] = useState(false);
    
//       // --------------------------show images and video-------------------------------------
  
//     const drop = useRef(null);
  
//     const [errors1, setErrors] = useState({
//       selects: null,
//       number: null,
//       formUrls: null,
//       date: null,
//       coverletter: null,
//       url: null,
//     });
  
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1200);
  
//     let sampleurl = "";
//     let handleChangesampleUrls = (e) => {
//       sethide(true);
//       if (sampleimgUrl != "") {
//         if (
//           (sampleurl = sampleimgUrl.match(
//             /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
//           ))
//         ) {
//           setFormSampleUrls([...formSampleUrls, sampleimgUrl]);
//           setsampleImgUrl("");
//         } else {
//           // setsampleImgUrl("");
//           const tempErrors = {
//             formsampleImgUrls:
//               sampleurl == null && "Please check the url(s) and try again",
//           };
//           setErrors(tempErrors);
//         }
//       } else if (sampleimgUrl == "") {
//         setsampleImgUrl("");
//         const tempErrors = {
//           sampleurl: !sampleimgUrl && "Please enter url",
//         };
//         setErrors(tempErrors);
//       } else {
//         setsampleImgUrl("");
//         const tempErrors = {
//           formsampleImgUrls:
//             sampleurl == null && "Please check the url(s) and try again",
//         };
//         setErrors(tempErrors);
//       }
//     };
  
//     let removeFormFieldsSampleUrls = (i) => {
//       let newFormValues = [...formSampleUrls];
//       newFormValues.splice(i, 1);
//       setFormSampleUrls(newFormValues);
//     };
  
//     useEffect(() => {
//       const handler = () => {
//         setIsOpen3(false);
//       };
//       window.addEventListener("scroll", handler);
//       return () => {
//         window.removeEventListener("scroll", handler);
//       };
//     }, []);
  
//     // useEffect(() => {
//     //   const start = startDate.toISOString().slice(0, 10);
//     //   let today = new Date().toISOString().slice(0, 10);
//     //   const diffInMs = new Date(start) - new Date(today);
//     //   const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
//     //   setDaysData(diffInDays);
//     //   setShowData(true);
//     //   console.log(diffInDays);
//     // }, [startDate]);
  
//     useEffect(() => {
//       dispatch(FreshJobs());
//     }, [job_detail_success]);
  
//     const [open, setOpen] = React.useState(false);
//     const [open1, setOpen1] = useState(false);
//     const [open2, setOpen2] = useState(false);
//     const [isOpen3, setIsOpen3] = useState(false);
  
//     const openPopup = async (item_id) => {
//       setOpen(true);
//       setNewJobDetails(true);
//       dispatch({ type: JOB_DETAILS_RESET });
//       dispatch(getJobDetails(item_id));
//       // if (job_detail_success) {
//       //   setJobId(item_id);
//       //   setTitle(jobDetails.title);
//       //   setJobDescription(jobDetails.description);
//       //   setJobDocuments(jobDetails.images);
//       //   setDeliveryDate(jobDetails.expected_delivery_date);
//       //   setOfferPrice(jobDetails.price);
//       //   setTags(jobDetails.tags);
//       //   setCategory(jobDetails.category);
//       //   setSkills(jobDetails.skills);
//       //   setIndustry(jobDetails.industry);
//       //   setLevel(jobDetails.level);
//       //   setJobType(jobDetails.get_jobType_details);
//       //   setCompanyType(jobDetails.company_type);
//       //   setCompanyname(jobDetails.company_name);
//       // }
//     };
  
  
//     useEffect(() => {
//       if (job_detail_success) {
//         setTitle(jobDetails.title);
//         setJobDescription(jobDetails.description);
//         // setJobDocuments(jobDetails.images);
//         setDeliveryDate(jobDetails.expected_delivery_date);
//         setOfferPrice(jobDetails.price);
//         setTags(jobDetails.tags);
//         setCategory(jobDetails.category);
//         setSkills(jobDetails.skills);
//         setIndustry(jobDetails.industry);
//         setLevel(jobDetails.level);
//         setJobType(jobDetails.get_jobType_details);
//         setCompanyType(jobDetails.company_name);
  
//         let arrJobDocuments = [];
//         let arrvideoJobDocuments = [];
//         let arrAdditionalJobDocuments = [];
//         let arrAdditionalvideoJobDocuments = [];
//         let arrJobDocumentsThumbs = [];
//         let arrvideoJobDocumentsThumbs = [];
//         let arrAdditionalJobDocumentsThumbs = [];
//         let arrvideoAdditionalJobDocumentsThumbs = [];
//         // alert("Okay")
//         // console.log("res.data.images -- ", res.data.images);
//         if (jobDetails.images.length > 0) {
//           for (let i = 0; i < jobDetails.images.length; i++) {
//             if (jobDetails.images[i].is_video == false) {
//               console.log(jobDetails.images[i].job_images);
//               arrJobDocuments.push(jobDetails.images[i].job_images);
//               arrAdditionalJobDocuments.push(
//                 jobDetails.images[i].work_sample_images
//               );
//               arrJobDocumentsThumbs.push(
//                 jobDetails.images[i].job_images_thumbnail
//               );
//               arrAdditionalJobDocumentsThumbs.push(
//                 jobDetails.images[i].work_sample_thumbnail
//               );
//               setJobDocuments(arrJobDocuments.filter((x) => x !== null));
//               setAdditionalJobDocuments(
//                 arrAdditionalJobDocuments.filter((x) => x !== null)
//               );
//               setJobDocumentsThumbs(
//                 arrJobDocumentsThumbs.filter((x) => x !== null)
//               );
//               setJobSampleDocumentsThumbs(
//                 arrAdditionalJobDocumentsThumbs.filter((x) => x !== null)
//               );
//             } else {
//               arrvideoJobDocuments.push(jobDetails.images[i].job_images);
//               arrAdditionalvideoJobDocuments.push(
//                 jobDetails.images[i].work_sample_images
//               );
//               arrvideoJobDocumentsThumbs.push(jobDetails.images[i].job_images);
//               arrvideoAdditionalJobDocumentsThumbs.push(
//                 jobDetails.images[i].work_sample_thumbnail
//               );
//               setJobDocumentsvideo(
//                 arrvideoJobDocuments.filter((x) => x !== null)
//               );
//               setAdditionalvideoJobDocuments(
//                 arrAdditionalvideoJobDocuments.filter((x) => x !== null)
//               );
//               setJobDocumentsvideoThumbs(
//                 arrvideoJobDocumentsThumbs.filter((x) => x !== null)
//               );
//               setJobSamplevideoDocumentsThumbs(
//                 arrvideoAdditionalJobDocumentsThumbs.filter((x) => x !== null)
//               );
//             }
//           }
//         }
  
//         setNewJobDetails(false);
//       }
//     }, [job_detail_success, newJobDetails]);
  
//     const [isPopupLoading, setIsPopupLoading] = useState(true);
//     const handleClickOpen = async (item_id) => {
//       setIsPopupLoading(true);
//       setTimeout(() => {
//         setIsPopupLoading(false);
//       }, 1200);
  
//       const timer = setTimeout(() => {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${userData.token}`,
//           },
//         };
  
//         const checking = api
//           .get(`${BACKEND_API_URL}jobs/${item_id}/`, config)
//           .then((res) => {
//             setJobId(res.data.id);
//             setCompanyType(res.data.company_name);
//             setTitle(res.data.title);
//             setJobDescription(res.data.description);
//             setDeliveryDate(res.data.expected_delivery_date);
//             setStartDate(res.data.expected_delivery_date);
//             setOfferPrice(res.data.price);
//             setTags(res.data.tags);
//             setCategory(res.data.category);
//             setSkills(res.data.skills);
//             setIndustry(res.data.industry);
//             setLevel(res.data.level);
//             setJobType(res.data.get_jobType_details);
//             setCompanyname(res.data.company_name);
//             setuserdata(res.data.username);
//             const created = moment(res.data.created).format("MM-DD-YYYY");
//             setcreateddate(created);
  
//             const start = res.data.expected_delivery_date;
//             let today = new Date().toISOString().slice(0, 10);
//             const diffInMs = new Date(start) - new Date(today);
//             const diffIndeliveryDays = diffInMs / (1000 * 60 * 60 * 24);
//             const diffInHours = diffInMs / (1000 * 60 * 60);
  
//             const selectTime = new Date();
//             selectTime.setHours(24, 0, 0, 0);
//             const currentTime = new Date();
  
//             const result1 = selectTime.getTime() - currentTime.getTime();
  
//             const result2 = result1 / (1000 * 60 * 60);
  
//             const resultHours = Math.floor(result2);
  
//             if (diffIndeliveryDays < 1 && diffIndeliveryDays > 0) {
//               setdeliveryhoursvalue(resultHours);
//               setdeliveryhours(true);
//               setdeliverydatevalue(false);
//             } else if (diffIndeliveryDays > 1) {
//               setdeliverydata(diffIndeliveryDays);
//               setdeliveryhours(false);
//               setdeliverydatevalue(true);
//             } else if (diffIndeliveryDays < 0) {
//               setdeliveryhours(false);
//               setdeliverydatevalue(false);
//             } else {
//               setdeliveryhours(false);
//               setdeliverydatevalue(false);
//             }
  
//             const current1 = new Date(res.data.expected_delivery_date);
//             const current2 = new Date(res.data.expected_delivery_date);
//             const current3 = new Date(res.data.expected_delivery_date);
  
//             // it adds 1 day to the current date
//             current1.setDate(current1.getDate() + 1);
//             current2.setDate(current2.getDate() + 2);
//             current3.setDate(current3.getDate() - 1);
//             const coverter1 = moment(current1).format("MM-DD-YYYY");
//             const coverter2 = moment(current2).format("MM-DD-YYYY");
//             const coverter3 = moment(current3).format("MM-DD-YYYY");
//             setdateadd1(coverter1);
//             setdateadd2(coverter2);
//             setdateadd3(coverter3);
  
//             const per10 = 10;
//             const per20 = 20;
//             const per30 = 30;
//             const n = Number(res.data.price);
  
//             const percentage10 = n + (n / 100) * per10;
//             const percentage20 = n + (n / 100) * per20;
//             const percentage30 = n + (n / 100) * per30;
  
//             set10value(percentage10);
//             set20value(percentage20);
//             set30value(percentage30);
//           })
//           .catch((err) => {});
//       }, 100);
//       setOpen1(true);
//       return () => clearTimeout(timer);
//     };
  
//     useEffect(() => {
//       const start = startDate;
//       let today = new Date(deliveryDate);
//       const diffInMs = new Date(start) - new Date(today);
//       const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
//       const diffInDate = Math.floor(diffInDays);
//       setdaysdifference(Math.floor(diffInDays));
//       if (diffInDate === 7) {
//         setdateWarning(true);
//       } else if (diffInDate > 7) {
//         setdateWarning(true);
//       } else {
//         setdateWarning(false);
//       }
//     }, [startDate]);
  
//     const handleClickOpen2 = () => {
//       setOpen2(true);
//     };
  
//     const handleClose = () => {
//       setOpen1(false);
//       setlink("");
//       setdatepricewarning(false);
//       setFiles([])
//       set50value(false);
//       set25value(false);
//       setShow(false);
//       setcoverletter("");
//       setquestion("");
//       setFormSampleUrls([]);
//       setDeliveryDate();
//     };
  
//     const handleClose2 = () => {
//       setOpen2(false);
//     };
//     const closePopup = () => {
//       setOpen(false);
//       setJobId();
//       setTitle();
//       setJobDescription();
//       setDeliveryDate();
//       setOfferPrice();
//       setTags();
//       setCategory();
//       setSkills();
//       setIndustry();
//       setLevel();
//       setJobType();
//       setCompanyType();
//       setJobDocuments([]);
//       setAdditionalJobDocuments([]);
//       setJobDocumentsThumbs([]);
//       setJobSampleDocumentsThumbs([]);
//       setJobDocumentsvideo([]);
//       setAdditionalvideoJobDocuments([]);
//       setJobDocumentsvideoThumbs([]);
//       setJobSamplevideoDocumentsThumbs([]);
//     };
  
//     const validateSubmit = (e, data) => {
//       sethide(false);
//       e.preventDefault();
//       // Urls Validation
//       let isValidUrl = "";
//       let newFormValues = formUrls.filter((n) => n);
//       setFormUrls(newFormValues);
//       if (formUrls) {
//         for (let i = 0; i < formUrls.length; i++) {
//           if (formUrls[i] != "") {
//             isValidUrl = formUrls[i].match(
//               /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
//             );
//           }
//         }
//       }
//       // SampleUrls Validation
//       let isValidSampleUrl = "";
//       let newFormSampleValues = formSampleUrls.filter((n) => n);
//       setFormSampleUrls(newFormSampleValues);
//       if (formSampleUrls) {
//         for (let i = 0; i < formSampleUrls.length; i++) {
//           if (formSampleUrls[i] != "") {
//             isValidSampleUrl = formSampleUrls[i].match(
//               /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
//             );
//           }
//         }
//       }
  
//       const tempErrors = {
//         number: !number && show && "please enter Proposed Price",
//         date: !startDate && show && "Please add Proposed Due Date",
//         coverletter: !coverletter && "Please enter Comments",
//         formUrls: isValidUrl == null && "Please check the url(s) and try again",
//         formSampleUrls:
//           isValidSampleUrl == null && "Please check the url(s) and try again",
//       };
  
//       setErrors(tempErrors);
  
//       if (Object.values(tempErrors).filter((value) => value).length) {
//         console.log(
//           "..values",
//           Object.values(tempErrors).filter((value) => value)
//         );
//         return;
//       }
//       setIsPopupLoading(true);
//       submitHandler();
//     };
  
//     const submitHandler = async (data, event) => {
//       let user = JSON.parse(localStorage.getItem("userData"));
  
//       if ((number) => 5) {
//         const formData = new FormData();
  
//         if (files) {
//           for (const key of Object.keys(files)) {
//             formData.append("image", files[key]);
//           }
//         }
//         formData.append("question", question);
//         formData.append("links", formSampleUrls);
//         formData.append("proposed_price", number);
//         formData.append("cover_letter", coverletter);
//         formData.append("user", user.user.user_id);
//         formData.append(
//           "proposed_due_date",
//           moment(startDate).format("YYYY-MM-DD")
//         );
//         formData.append("job", freshJob.id);
//         formData.append("duration", selects);
  
//         const config = {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${userData.token}`,
//           },
//         };
  
//         const success = await axios
//           .post(`${BACKEND_API_URL}job-applied/`, formData, config)
//           .then((res) => {
//             setIsPopupLoading(false);
//             setIsLoading(true);
//             dispatch(FreshJobs());
//             swal({
//               title: "Successfully Complete",
//               text: res.data.message,
//               className: "successAlert-login",
//               icon: "/img/logonew.svg",
//               buttons: false,
//               timer: 1500,
//             });
//             setTimeout(() => {
//               setOpen1(false);
//               navigate("/home");
//             }, 800);
//           })
//           .catch((err) => {
//             setIsPopupLoading(false);
//             swal({
//               title: "Error",
//               text: err.response.data.message,
//               className: "errorAlert",
//               icon: "/img/logonew-red.svg",
  
//               buttons: false,
//               timer: 2500,
//             });
//             return;
//           });
//       }
//     };
  
//     const handleChange = (event) => {
//       setMessage(event.target.value);
//       setErrors({ ...errors1, message: null });
//     };
  
//     const maxDocSize = 10000000;
  
//     const onSelectFile = (e) => {
//       var imageList = [];
//       var previewImages = [];
//       let fileext = [];
  
//       for (let i = 0; i < e.target.files.length; i++) {
//         // Check 'eps' file type
//         const fileExtension = e.target.files[i].name.split(".").at(-1);
//         const allowedFileTypes = ["eps"];
  
//         if (
//           !e.target.files[i].type.match(imageMimeType) &&
//           !allowedFileTypes.includes(fileExtension)
//         ) {
//           swal({
//             title: "Error",
//             text: "Image type is not valid",
//             className: "errorAlert",
//             icon: "/img/logonew-red.svg",
  
//             buttons: false,
//             timer: 1500,
//           });
//           // return;
//           // Max file size 25mb and max 10 files
//           // if (e.target.files[i].size > maxDocSize && e.target.files.length > 10) {
//           //   swal({
//           //     title: "Error",
//           //     text: "Max upload limit is 10 and max file size 25mb",
//           //     className: "errorAlert",
//           //     icon: "/img/ErrorAlert.png",
//           //     buttons: false,
//           //     timer: 2500,
//           //   });
  
//           // Max file size 25mb
//         } else if (e.target.files[i].size > maxDocSize) {
//           swal({
//             title: "Error",
//             text: "Max file size allowed is 10mb",
//             className: "errorAlert",
//             icon: "/img/logonew-red.svg",
  
//             buttons: false,
//             timer: 2500,
//           });
//         }
//         // Max files 10
//         else if (e.target.files.length > 10) {
//           swal({
//             title: "Error",
//             text: "Maximum 10 files allowed",
//             className: "errorAlert",
//             icon: "/img/logonew-red.svg",
  
//             buttons: false,
//             timer: 2500,
//           });
//         }
  
//         setAttachFiles(true);
//         if (previewImages.length < 10 && e.target.files[i].size <= maxDocSize) {
//           previewImages.push(URL.createObjectURL(e.target.files[i]));
//         }
  
//         if (imageList.length < 10 && e.target.files[i].size <= maxDocSize) {
//           imageList.push(e.target.files[i]);
//         }
  
//         if (fileext.length < 10 && e.target.files[i].size <= maxDocSize) {
//           fileext.push(
//             e.target.files[i]?.name?.slice(
//               ((e.target.files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
//             )
//           );
//         }
//         // }
//       }
//       setJobDocumentsPopup(imageList);
//       setFileExtension(fileext);
//       imgRef.current = imageList;
//     };
  
//     const removeDocument = (e, v) => {
//       if (v == "icon") {
//         const s = jobDocumentsPopup.filter((item, index) => index !== e);
//         setJobDocumentsPopup(s);
  
//         const s1 = imgRef.current.filter((item, index) => index !== e);
//         imgRef.current = s1;
  
//         const s2 = fileExtension.filter((item, index) => index !== e);
//         setFileExtension(s2);
  
//         return;
//       }
//       if (v == "image") {
//         const s = jobDocumentsPopup.filter((item, index) => index !== e);
//         setJobDocumentsPopup(s);
//         imgRef.current = s;
  
//         const s2 = fileExtension.filter((item, index) => index !== e);
//         setFileExtension(s2);
  
//         return;
//       }
//       if (v == "data") {
//         const s = imgRef.filter((item, index) => index !== e);
//         setJobDocumentsPopup(jobDocumentsPopup.filter((el, i) => i !== e));
//         setFileExtension(fileExtension.filter((el, i) => i !== e));
//         imgRef.current = s;
  
//         const s2 = fileExtension.filter((item, index) => index !== e);
//         setFileExtension(s2);
//         return;
//       }
//     };
  
//     const imageMimeType = /image\/(svg|eps|png|jpg|jpeg|gif)/i;
  
//     const downloadFile = (blob, fileNameDownload) => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.style.display = "none";
//       a.href = url;
//       a.download = fileNameDownload;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//     };
  
//     const handleChange1 = (evt) => {
//       setdatepricewarning(false);
//       set25value(false);
//       set75value(false);
//       set50value(false);
//       const { value } = evt.target;
  
//       // check if value includes a decimal point
//       if (value.match(/\./g)) {
//         const [, decimal] = value.split(".");
  
//         if (decimal?.length > 2) {
//           return;
//         }
//       }
//       Number(offerPrice);
//       const per50 = 50;
//       const per = 25;
//       const per75 = 75;
//       const per100 = 100;
//       const n = Number(offerPrice);
  
//       const percentage25 = n + (n / 100) * per;
//       const percentage50 = n + (n / 100) * per50;
//       const percentage75 = n + (n / 100) * per75;
//       const percentage100 = n + (n / 100) * per100;
  
//       // my change in project 28/9
//       const firstvalue = value - n;
//       const preDataValue = (firstvalue * 100) / n;
//       // console.log(preDataValue)
//       const preDataValue1 = Math.floor(preDataValue);
//       setPrintPreData(preDataValue1);
  
//       const start = startDate;
//       let today = new Date(deliveryDate);
//       const diffInMs = new Date(start) - new Date(today);
//       const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
//       const diffInDate = Math.floor(diffInDays);
  
//       if (value > percentage25 && Math.floor(diffInDays) < 0 && start != null) {
//         setdatepricewarning(true);
//         set50value(false);
//         set25value(false);
//       } else if (
//         (value < percentage50 && value > percentage25) ||
//         number == percentage25
//       ) {
//         set25value(true);
//         setdatepricewarning(false);
//       } else if (value > percentage50 || value == percentage50) {
//         set50value(true);
//         setdatepricewarning(false);
//       }
//       setlink(value);
//     };
  
//     const handleDiv = (id) => {
//       if (id === "1") {
//         setlink(per10);
//       } else if (id === "2") {
//         setlink(per20);
//       } else if (id === "3") {
//         setlink(per30);
//       } else if (id === "4") {
//         setpricevalue(false);
//       }
//     };
  
//     const handleDate = (date) => {
//       setStartDate(date);
//       const start = date;
//       let today = new Date(deliveryDate);
//       const diffInMs = new Date(date) - new Date(today);
//       const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
//       const diffInDate = Math.floor(diffInDays);
//       setdaysdifferencestartdate(Math.floor(diffInDays));
//       setdaysdifference(Math.floor(diffInDays));
  
//       const per50 = 50;
//       const per = 25;
//       const per75 = 75;
//       const per100 = 100;
//       const n = Number(offerPrice);
  
//       const percentage25 = n + (n / 100) * per;
//       const percentage50 = n + (n / 100) * per50;
  
//       if (number > percentage25 && Math.floor(diffInDays) < 0 && date != null) {
//         setdatepricewarning(true);
//         set25value(false);
//         set50value(false);
//       } else if (
//         (number > percentage25 && number < percentage50) ||
//         number == percentage25
//       ) {
//         set25value(true);
//         set50value(false);
//         setdatepricewarning(false);
//       } else if (number > percentage50 || number == percentage50) {
//         set50value(true);
//         set25value(false);
//         setdatepricewarning(false);
//       }
//     };
  
//     let savevalue = () => {
//       const tempErrors = {
//         number: !number && show && "Please enter Proposed Price",
//         date: !startDate && show && "Please add Proposed Due Date",
//       };
  
//       setErrors(tempErrors);
  
//       if (Object.values(tempErrors).filter((value) => value).length) {
//         // console.log(
//         //   "..values",
//         //   Object.values(tempErrors).filter((value) => value)
//         // );
//         return;
//       }
//       setProposedPrice(number);
//       setProposedDate(startDate);
//       setShow(false);
  
//       Number(offerPrice);
//       const per100 = 100;
//       const n = Number(offerPrice);
//       const percentage100 = n + (n / 100) * per100;
//       if (number > percentage100 && daysdifference < 0) {
//       }
//     };
  
//     let handleChangeUrls = (i, e) => {
//       let newFormValues = [...formUrls];
//       newFormValues[i] = e.target.value;
//       setFormUrls(newFormValues);
//     };
  
//     let addFormFieldsUrls = () => {
//       if (formUrls.length < 10) {
//         setFormUrls([...formUrls, ""]);
//       }
//     };
  
//     let removeFormFieldsUrls = (i) => {
//       let newFormValues = [...formUrls];
//       newFormValues.splice(i, 1);
//       setFormUrls(newFormValues);
//     };
  
//     // DRAG AND DROP FUNCTIONALITY
  
//     React.useEffect(() => {
//       drop.current?.addEventListener("dragover", handleDragOver);
//       drop.current?.addEventListener("drop", handleDrop);
  
//       return () => {
//         drop.current?.removeEventListener("dragover", handleDragOver);
//         drop.current?.removeEventListener("drop", handleDrop);
//       };
//     }, []);
  
//     const handleDragOver = (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//     };
  
//     const handleDrop = (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       var imageList = [];
//       var previewImages = [];
//       let fileext = [];
  
//       for (let i = 0; i < e.dataTransfer.files.length; i++) {
//         // Check 'eps' file type
//         const fileExtension = e.dataTransfer.files[i].name.split(".").at(-1);
//         const allowedFileTypes = ["eps"];
  
//         if (
//           !e.dataTransfer.files[i].type.match(imageMimeType) &&
//           !allowedFileTypes.includes(fileExtension)
//         ) {
//           swal({
//             title: "Error",
//             text: "Image type is not valid",
//             className: "errorAlert",
//             icon: "/img/logonew-red.svg",
  
//             buttons: false,
//             timer: 1500,
//           });
//           // return;
//           // Max file size 25mb and max 10 files
//           // if (e.target.files[i].size > maxDocSize && e.target.files.length > 10) {
//           //   swal({
//           //     title: "Error",
//           //     text: "Max upload limit is 10 and max file size 25mb",
//           //     className: "errorAlert",
//           //     icon: "/img/ErrorAlert.png",
//           //     buttons: false,
//           //     timer: 2500,
//           //   });
  
//           // Max file size 10mb
//         } else if (e.dataTransfer.files[i].size > maxDocSize) {
//           swal({
//             title: "Error",
//             text: "Max file size allowed is 10mb",
//             className: "errorAlert",
//             icon: "/img/logonew-red.svg",
  
//             buttons: false,
//             timer: 2500,
//           });
//         }
//         // Max files 10
//         else if (e.dataTransfer.files.length > 10) {
//           swal({
//             title: "Error",
//             text: "Maximum 10 files allowed",
//             className: "errorAlert",
//             icon: "/img/logonew-red.svg",
  
//             buttons: false,
//             timer: 2500,
//           });
//         }
  
//         setAttachFiles(true);
//         if (
//           previewImages.length < 10 &&
//           e.dataTransfer.files[i].size <= maxDocSize
//         ) {
//           previewImages.push(URL.createObjectURL(e.dataTransfer.files[i]));
//         }
  
//         if (imageList.length < 10 && e.dataTransfer.files[i].size <= maxDocSize) {
//           imageList.push(e.dataTransfer.files[i]);
//         }
  
//         if (fileext.length < 10 && e.dataTransfer.files[i].size <= maxDocSize) {
//           fileext.push(
//             e.dataTransfer.files[i]?.name?.slice(
//               ((e.dataTransfer.files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
//             )
//           );
//         }
//         // }
//       }
//       setJobDocumentsPopup(imageList);
//       setFileExtension(fileext);
//       // imgRef.current = imageList;
//       // imgRef.current = imageList;
//     };
  
//     React.useEffect(() => {
//       imgRef.current = jobDocumentsPopup;
//     }, [jobDocumentsPopup]);
  
//     // DRAG AND DROP FUNCTIONALITY
  
//     return (
//       <>
//         {/* {loading && <LoadingSpinner />} */}
//         {isLoading && <LoadingSpinner />}
  
//         {showBlueBox ? (
//           <>
//             <div className="Topallpage bak_h">
//               <div className="page-card TopM fresh_job_section">
//                 <div className="FreshTitl">
//                   <div className="JobsDashborad">
//                     <h1>
//                       Fresh Job{" "}
//                       <span>
//                         <Link className="seeMore" to="/jobs/list">
//                           See More
//                         </Link>
//                       </span>
//                     </h1>
//                   </div>
//                   <div className="closeBtndasboard">
//                     <img
//                       disabled={!showBlueBox}
//                       onClick={handleClick}
//                       src="img/close.png"
//                     />
//                   </div>
//                 </div>
  
//                 <>
//                   {freshJobMessage == "No jobs to show" ? (
//                     <h2 className="nojob"> No Latest Job Found</h2>
//                   ) : (
//                     <div
//                       className="FreshJobTop"
//                       // onClick={() => openPopup(`${freshJob?.id}`)}
//                     >
//                       <div className="Remotemarkeitng">
//                         <div className="bt-Title">
//                           <div className="dashboardtoptitl">
//                             <Link to={`/jobs/details/${freshJob?.id}`}>
//                               <h2>{freshJob?.title}</h2>
//                             </Link>
//                           </div>
//                           <div className="dashboardjob">
//                             <>
//                               {/* <button
//                             onClick={handleClickOpen2}
//                               type="button"
//                               className="btn btn-primary Small border-radius Negotiate"
//                               >Negotiate</button> */}
  
//                               <Dialog
//                                 className="CDashboard  "
//                                 open={open2}
//                                 onClose={handleClose2}
//                               >
//                                 <DialogTitle className="CDashboarddiv1">
//                                   <h1 className="ApplyTitledashboard">
//                                     Negotiate Job
//                                   </h1>{" "}
//                                   <span onClick={handleClose}>
//                                     <i className="fa-solid fa-circle-xmark"></i>
//                                   </span>
//                                 </DialogTitle>
//                                 <DialogContent className="applytojb">
//                                   <div className="Proposalyour">
//                                     <h4>Write Your Message for Negotiation</h4>
//                                     <textarea className="Proposaltextarea"></textarea>
//                                   </div>
  
//                                   <div className="text-content  Client">
//                                     <h4 className="Pricetitle">Client’s Price</h4>
//                                     <div className="pricename">
//                                       <input
//                                         className="pricesec"
//                                         type="number"
//                                         placeholder="Price"
//                                       />
//                                       <span className="pricetag pricetagC">
//                                         $
//                                       </span>
//                                     </div>
//                                   </div>
  
//                                   <div className="text-content  Client">
//                                     <h4 className="Pricetitle">
//                                       Negotiated Price
//                                     </h4>
//                                     <div className="pricename">
//                                       <input type="number" placeholder="Price" />
//                                       <span className="pricetagC1">$</span>
//                                     </div>
//                                   </div>
  
//                                   <div className="text-content DeliveryDate">
//                                     <h4 className="Pricetitle">
//                                       Expected Delivery Date
//                                     </h4>
//                                     <span>
//                                       <div className="MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root">
//                                         <div className="MuiInput-root MuiInput-underline MuiInputBase-root MuiInputBase-colorPrimary Mui-error MuiInputBase-formControl MuiInputBase-adornedEnd css-1ptx2yq-MuiInputBase-root-MuiInput-root"></div>
//                                       </div>
//                                     </span>
//                                   </div>
//                                   <div className="text-content">
//                                     <h4 className="Pricetitle">
//                                       Negotiated Delivery Date
//                                     </h4>
//                                     <span>
//                                       <div className="MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root">
//                                         <div className="MuiInput-root MuiInput-underline MuiInputBase-root MuiInputBase-colorPrimary Mui-error MuiInputBase-formControl MuiInputBase-adornedEnd css-1ptx2yq-MuiInputBase-root-MuiInput-root"></div>
//                                       </div>
//                                     </span>
//                                   </div>
//                                   <div className="text-content Portfolioupload">
//                                     <Button className="ApplyNowbtndashboard">
//                                       Submit
//                                     </Button>
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
//                               <button
//                                 onClick={() => handleClickOpen(`${freshJob?.id}`)}
//                                 type="button"
//                                 className="btn btn-primary Small border-radius"
//                               >
//                                 {" "}
//                                 Apply Now
//                               </button>
//                               <Dialog
//                                 className="CDashboard CDashboard1"
//                                 open={open1}
//                                 onClose={handleClose}
//                               >
//                                 <DialogTitle className="CDashboarddiv1">
//                                   <div className="ApplyTitledashboardnewdiv">
//                                     <h1 className="ApplyTitledashboard1">
//                                       Apply to Job
//                                     </h1>{" "}
//                                     <span
//                                       className="closebtnjoblist"
//                                       onClick={handleClose}
//                                     >
//                                       <i className="fa-solid fa-xmark"></i>
//                                     </span>
//                                   </div>
//                                 </DialogTitle>
//                                 <DialogContent className="applytojb">
//                                   <div className="jobapplyform jobapplyformn">
//                                     {isPopupLoading ? (
//                                       <LoadingSpinner />
//                                     ) : (
//                                       <>
//                                         <div className="amzingBannerAdMain">
//                                           <div className="amzingBannerText">
//                                             <h4>{title}</h4>
//                                             <p className="amzingBannerParagraph">
//                                               {jobDescription}
//                                             </p>
//                                           </div>
//                                           <div className="createrBoxAmazingBanner">
//                                             <div className="createrBoxContent">
//                                               <div className="createdTextDate">
//                                                 <p className="companytextcreator">
//                                                   Created
//                                                 </p>
//                                                 <p className="johnDeoCreator">
//                                                   {createddate}
//                                                 </p>
//                                               </div>
//                                               <div className="createdJohnDoe">
//                                                 <p className="companytextcreator">
//                                                   Created by
//                                                 </p>
//                                                 <p className="johnDeoCreator">
//                                                   {userdata}
//                                                 </p>
//                                               </div>
//                                               <div className="createdBoxCompany">
//                                                 <p className="companytextcreator">
//                                                   Company
//                                                 </p>
//                                                 <p className="starkIndusties">
//                                                   {company}
//                                                 </p>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         </div>
  
//                                         <div className="NegotiateMainDiv NegotiateMainDiv2">
//                                           <div className="negOfferPriceSec">
//                                             <div
//                                               className={
//                                                 errors1.number
//                                                   ? "Offer_A_P Offer_A_P1 error"
//                                                   : "Offer_A_P Offer_A_P1"
//                                               }
//                                             >
//                                               <h4 className="negPriceCreatorHead">
//                                                 Offer Price{" "}
//                                               </h4>
//                                               <p className="offerp">
//                                                 ${offerPrice}
//                                               </p>
//                                             </div>
//                                           </div>
//                                           <div className="negDueDateSec">
//                                             <div className="textContentDatePara">
//                                               <h4 className="newDueDateNeg">
//                                                 Due Date
//                                               </h4>
//                                               <p className="offerp">
//                                                 {deliveryDate}
//                                               </p>
  
//                                               {/* {deliveryhours && (
//                                             <p className="colorsec">
//                                               {deliveryhoursvalue} hours away
//                                             </p>
//                                           )}
  
//                                           {deliverydatevalue && (
//                                             <p
//                                               className={
//                                                 deliverydata == 1
//                                                   ? "colorsec"
//                                                   : "threeDaysAway"
//                                               }
//                                             >
//                                               {deliverydata} days away
//                                             </p>
//                                           )} */}
//                                             </div>
//                                           </div>
//                                           <div className="NegotiateButtonOne">
//                                             <button
//                                               className="negotiateButton"
//                                               onClick={mainNegotiate}
//                                               type="button"
//                                             >
//                                               Negotiate
//                                             </button>
//                                           </div>
//                                         </div>
  
//                                         {proposedPrice && !show && (
//                                           <>
//                                             <div className="NegotiateMainDiv NegotiateMainDiv_sec proposed_section proposedPriceDueDate">
//                                               <div className="negOfferPriceSec">
//                                                 <div className="Offer_A_P">
//                                                   <h4 className="negPriceCreatorHead">
//                                                     Proposed Price{" "}
//                                                   </h4>
//                                                   <p>${proposedPrice}</p>
//                                                 </div>
//                                               </div>
//                                               <div className="negDueDateSec">
//                                                 <div className="textContentDatePara">
//                                                   <h4 className="newDueDateNeg">
//                                                     Proposed Due Date
//                                                   </h4>
//                                                   <p>
//                                                     {moment(proposedDate).format(
//                                                       "YYYY-MM-DD"
//                                                     )}
//                                                   </p>
//                                                 </div>
//                                               </div>
//                                               <div className="NegotiateButtonOne">
//                                                 <button
//                                                   className="negotiateButton clear"
//                                                   onClick={clearMainNegotiate}
//                                                   type="button"
//                                                 >
//                                                   Clear
//                                                 </button>
//                                               </div>
//                                             </div>
//                                           </>
//                                         )}
  
//                                         <div className="proposedPriceDueDateMainDiv">
//                                           <div className="proposedPriceContent2">
//                                             {show ? (
//                                               <>
//                                                 <div className="proposedPriceDueDate">
//                                                   <div className="creatorhomepage creatorhomepageH">
//                                                     <div className="negOfferPriceSec negOffer21">
//                                                       <div
//                                                         className={
//                                                           errors1.number
//                                                             ? "Offer_A_P error"
//                                                             : "Offer_A_P"
//                                                         }
//                                                       >
//                                                         <h4 className="negPriceCreatorHead">
//                                                           Offer Price{" "}
//                                                         </h4>
//                                                         <p>${offerPrice}</p>
//                                                       </div>
//                                                     </div>
  
//                                                     <div className="ProposedPriceDiv">
//                                                       <h4 className="ProposedtextPrice">
//                                                         Proposed Price
//                                                       </h4>
//                                                       <div className="TopPriceFirst">
//                                                         <div
//                                                           className={
//                                                             errors1.number
//                                                               ? "priceDoller   error"
//                                                               : "priceDoller"
//                                                           }
//                                                         >
//                                                           <input
//                                                             className="inputPriceDoller"
//                                                             type="number"
//                                                             placeholder="0.00"
//                                                             id=""
//                                                             value={number}
//                                                             onInput={(e) => {
//                                                               setErrors({
//                                                                 ...errors1,
//                                                                 number: null,
//                                                               });
//                                                               if (
//                                                                 e.target.value
//                                                                   .length >
//                                                                 e.target.maxLength
//                                                               )
//                                                                 e.target.value =
//                                                                   e.target.value?.slice(
//                                                                     0,
//                                                                     e.target
//                                                                       .maxLength
//                                                                   );
//                                                             }}
//                                                             maxLength={8}
//                                                             onKeyDown={
//                                                               blockInvalidChar
//                                                             }
//                                                             onChange={
//                                                               handleChange1
//                                                             }
//                                                           />
//                                                           <div className="creatorProposedE">
//                                                             <span
//                                                               style={{
//                                                                 color: "#D14F4F",
//                                                                 opacity:
//                                                                   errors1.number
//                                                                     ? 1
//                                                                     : 0,
//                                                               }}
//                                                             >
//                                                               {errors1.number ??
//                                                                 "valid"}
//                                                             </span>
//                                                           </div>
//                                                           <span className="pricetag pricetagss4 pricetagu">
//                                                             $
//                                                           </span>
//                                                         </div>
//                                                       </div>
//                                                     </div>
//                                                   </div>
//                                                   {per25 && (
//                                                     <>
//                                                       {" "}
//                                                       <p className="proposingtext proposingtext1">
//                                                         You’re proposing a price
//                                                         over {printPreData}%
//                                                         higher check.
//                                                       </p>
//                                                     </>
//                                                   )}
//                                                   {per50 && (
//                                                     <>
//                                                       {" "}
//                                                       <p className="proposingtext colorsec proposingtext50 ">
//                                                         You’re proposing a price
//                                                         over {printPreData}%
//                                                         higher. Your Proposal is
//                                                         less likely to be
//                                                         accepted.
//                                                       </p>
//                                                     </>
//                                                   )}
//                                                   {datepricewarning && (
//                                                     <>
//                                                       {" "}
//                                                       <p className="proposingtext colorsec proposingtext1">
//                                                         You’re proposing a price
//                                                         over {printPreData}%
//                                                         higher. Consider proposing
//                                                         a closer due date.
//                                                       </p>
//                                                     </>
//                                                   )}
  
//                                                   {/* <div className="Negotiatestates">
//                                                 <li
//                                                   onClick={() => handleDiv("1")}
//                                                   className="Negotiatestates1"
//                                                 >
//                                                   <p>
//                                                     +10%
//                                                     <br />
//                                                     <span>{per10}</span>
//                                                   </p>
//                                                 </li>
//                                                 <li
//                                                   onClick={() => handleDiv("2")}
//                                                 >
//                                                   <p>
//                                                     {" "}
//                                                     +20%
//                                                     <br />
//                                                     <span>{per20}</span>
//                                                   </p>
//                                                 </li>
//                                                 <li
//                                                   onClick={() => handleDiv("3")}
//                                                 >
//                                                   <p>
//                                                     +30%
//                                                     <br />
//                                                     <span>{per30}</span>
//                                                   </p>
//                                                 </li>
//                                                 <li
//                                                   onClick={() => handleDiv("4")}
//                                                   className="Negotiatestates2"
//                                                 >
//                                                   <p>Custom</p>
//                                                 </li>
//                                               </div> */}
  
//                                                   <div className="creatordashbord">
//                                                     <div className="creatorjoblistdate creatorjoblistdateH">
//                                                       <div className="duejoblist5">
//                                                         <div className="textContentDatePara">
//                                                           <h4 className="newDueDateNeg">
//                                                             Due Date
//                                                           </h4>
//                                                           <p>{deliveryDate}</p>
//                                                           {deliveryhours && (
//                                                             <p className="colorsec">
//                                                               {deliveryhoursvalue}{" "}
//                                                               hours away
//                                                             </p>
//                                                           )}
  
//                                                           {deliverydatevalue && (
//                                                             <p
//                                                               className={
//                                                                 deliverydata == 1
//                                                                   ? "colorsec"
//                                                                   : "threeDaysAway"
//                                                               }
//                                                             >
//                                                               {deliverydata} days
//                                                               away
//                                                             </p>
//                                                           )}
//                                                         </div>
//                                                       </div>
//                                                       <div
//                                                         className={
//                                                           errors1.date
//                                                             ? "ProposedDueDateContent ProposedDueDateContent1 error"
//                                                             : "ProposedDueDateContent ProposedDueDateContent1"
//                                                         }
//                                                       >
//                                                         <h4 className="proposedDuedateText">
//                                                           Proposed Due Date
//                                                         </h4>
//                                                         <LocalizationProvider
//                                                           dateAdapter={
//                                                             AdapterDateFns
//                                                           }
//                                                         >
//                                                           <label className="joblistinputc">
//                                                             <DatePicker
//                                                               mask="__-__-____"
//                                                               label=""
//                                                               value={startDate}
//                                                               inputFormat="MM-dd-yyyy"
//                                                               formatDate={(
//                                                                 duedeliveryDate
//                                                               ) =>
//                                                                 moment(
//                                                                   new Date()
//                                                                 ).format(
//                                                                   "DD-MM-YYYY"
//                                                                 )
//                                                               }
//                                                               // inputFormat="MM-dd-yyyy"
//                                                               minDate={new Date()}
//                                                               onChange={(
//                                                                 date
//                                                               ) => {
//                                                                 {
//                                                                   handleDate(
//                                                                     date
//                                                                   );
//                                                                 }
//                                                                 setErrors({
//                                                                   ...errors1,
//                                                                   date: null,
//                                                                 });
//                                                               }}
//                                                               renderInput={(
//                                                                 params
//                                                               ) => (
//                                                                 <TextField
//                                                                   variant="standard"
//                                                                   {...params}
//                                                                 />
//                                                               )}
//                                                             />
//                                                           </label>
//                                                         </LocalizationProvider>
//                                                         <div className="Price_AE">
//                                                           <span
//                                                             style={{
//                                                               color: "#D14F4F",
//                                                               opacity:
//                                                                 errors1.date
//                                                                   ? 1
//                                                                   : 0,
//                                                             }}
//                                                           >
//                                                             {errors1.date ??
//                                                               "valid"}
//                                                           </span>
//                                                         </div>
//                                                         {/* <div>{showData ? <h1>{daysData} days</h1> : null}</div> */}
//                                                       </div>
//                                                     </div>
//                                                   </div>
//                                                   {datewarning && (
//                                                     <p className="proposingtext colorsec proposingdayd">
//                                                       You’re proposing a due date
//                                                       more than 7 days away. Your
//                                                       Proposal is less likely to
//                                                       be accepted
//                                                     </p>
//                                                   )}
//                                                   <div className="creatordasbosavecancel">
//                                                     <div className="creatorsavebutton">
//                                                       <div className="negoCancelButtonDiv">
//                                                         <button
//                                                           className="negoCancelButton"
//                                                           onClick={
//                                                             mainProposedCancel
//                                                           }
//                                                         >
//                                                           Cancel
//                                                         </button>
//                                                       </div>
  
//                                                       <div>
//                                                         <button
//                                                           className="negoCancelButton1"
//                                                           onClick={savevalue}
//                                                           type="button"
//                                                         >
//                                                           Save
//                                                         </button>
//                                                       </div>
//                                                     </div>
//                                                   </div>
//                                                 </div>
//                                               </>
//                                             ) : null}
//                                           </div>
//                                         </div>
  
//                                         <div className="applyJobImgAttach">
//                                           <h4 className="attachPortfolioFiles">
//                                             Attach Files
//                                             <span className="OptionalAttachtext">
//                                               Optional
//                                             </span>
//                                           </h4>
//                                           <p className="attachfilesCreatorText">
//                                             You may attach up to 10 files under
//                                             the size of 10MB each. Include work
//                                             samples or other documents to support
//                                             your application.
//                                           </p>
  
//                                           <div className="container containermargin1">
//                                             <div
//                                               className="uploadimgcreator"
//                                               {...getRootProps({ style })}
//                                             >
//                                               <input {...getInputProps()} />
//                                               <p>
//                                                 <img
//                                                   className="uploadImageProfile uploadImageProfile2"
//                                                   src={
//                                                     process.env.PUBLIC_URL +
//                                                     "/img/uploadimg.png"
//                                                   }
//                                                   alt=""
//                                                 />
//                                                 Attach Files
//                                               </p>
//                                             </div>
//                                             <aside style={thumbsContainer}>
//                                               {thumbs}
//                                             </aside>
//                                           </div>
//                                         </div>
  
//                                         {/* Images */}
//                                         <div className="job-documents-imgtotle">
//                                           {imgRef &&
//                                             // !imageChanged &&
//                                             imgRef?.current?.map(
//                                               (item, index) => (
//                                                 <>
//                                                   {fileExtension[index].match(
//                                                     /(svg|eps|png|jpg|jpeg|gif)$/i
//                                                   ) && (
//                                                     <>
//                                                       <div
//                                                         index_val={index}
//                                                         className="job-documents-img f-16 image-item"
//                                                         key={index}
//                                                       >
//                                                         <a
//                                                           target="_blank"
//                                                           href={URL.createObjectURL(
//                                                             item
//                                                           )}
//                                                         >
//                                                           {/* <a target="_blank" href={item}> */}
//                                                           <img
//                                                             className="w-100"
//                                                             src={URL.createObjectURL(
//                                                               item
//                                                             )}
//                                                             // src={item}
//                                                           />
//                                                         </a>
//                                                         <div
//                                                           className="overlay"
//                                                           onClick={() =>
//                                                             removeDocument(
//                                                               index,
//                                                               "image"
//                                                             )
//                                                           }
//                                                         >
//                                                           <Link
//                                                             to="#"
//                                                             className="icon"
//                                                             title="Remove"
//                                                           >
//                                                             <i className="fa-solid fa-circle-xmark"></i>
//                                                           </Link>
//                                                         </div>
//                                                       </div>
//                                                     </>
//                                                   )}
//                                                 </>
//                                               )
//                                             )}
//                                         </div>
  
//                                         <h4 className="includeurltest">
//                                           or include a URL
//                                         </h4>
//                                         {formSampleUrls.map((element, index) => (
//                                           <div
//                                             className="form-inline"
//                                             key={index}
//                                           >
//                                             {element && (
//                                               <div className="assertDustbinLink assertDustbinLinkwidth">
//                                                 <img
//                                                   className="linkicon"
//                                                   src="/img/asserLink.png"
//                                                 />
//                                                 <a className="adifecttesturl">
//                                                   {element}
//                                                 </a>
//                                                 <img
//                                                   className="assertbinLogo2"
//                                                   src="/img/assertbin.png"
//                                                   onClick={() =>
//                                                     removeFormFieldsSampleUrls(
//                                                       index
//                                                     )
//                                                   }
//                                                 />
//                                               </div>
//                                             )}
//                                           </div>
//                                         ))}
  
//                                         <div
//                                           className={
//                                             errors1.formsampleImgUrls
//                                               ? "enterUrlLinkButton1 enterUrlLinkButtonnew error"
//                                               : errors1.sampleurl
//                                               ? "error enterUrlLinkButtonnew"
//                                               : "enterUrlLinkButton1 enterUrlLinkButtonnew"
//                                           }
//                                         >
//                                           <input
//                                             className="joblistinput"
//                                             type="text"
//                                             value={sampleimgUrl}
//                                             placeholder="Enter URL"
//                                             onChange={(e) => {
//                                               setsampleImgUrl(e.target.value);
//                                               setErrors({
//                                                 ...errors1,
//                                                 formsampleImgUrls: null,
//                                                 url: null,
//                                               });
//                                             }}
//                                             onKeyPress={(e) => {
//                                               if (e.key === "Enter") {
//                                                 handleChangesampleUrls(e);
//                                               }
//                                             }}
//                                           />
  
//                                           <div className="useButtonAssert">
//                                             <a
//                                               onClick={(e) => {
//                                                 handleChangesampleUrls(e);
//                                               }}
//                                               className=" AddMorebtn"
//                                             >
//                                               <img src="/img/plus.png" />
//                                               Add More
//                                             </a>
//                                           </div>
//                                           <span
//                                             className="urlCreator"
//                                             style={{
//                                               color: "#D14F4F",
//                                               opacity: errors1.sampleurl ? 1 : 0,
//                                             }}
//                                           >
//                                             {errors1.sampleurl ?? "valid"}
//                                           </span>
//                                           <div
//                                             className={
//                                               errors1.formsampleImgUrls
//                                                 ? "enterUrlLinkButton-error enterUrlLinkButton-error1  error"
//                                                 : "enterUrlLinkButton-error enterUrlLinkButton-error1"
//                                             }
//                                           >
//                                             <span
//                                               className="formurjobapply"
//                                               style={{
//                                                 color: "#D14F4F",
//                                                 opacity: errors1.formSampleUrls
//                                                   ? 1
//                                                   : 0,
//                                               }}
//                                             >
//                                               {errors1.formsampleImgUrls
//                                                 ? errors1.formsampleImgUrls
//                                                 : ""}
//                                             </span>
//                                           </div>
//                                         </div>
  
//                                         <div className="quesOptionalMain">
//                                           <h4 className="HaveQuesText">
//                                             Comments
//                                             <span className="OptionalHaveQuest"></span>
//                                           </h4>
//                                         </div>
//                                         <div
//                                           className={
//                                             errors1.coverletter
//                                               ? "askYourQuestionInput error"
//                                               : "askYourQuestionInput"
//                                           }
//                                         >
//                                           <textarea
//                                             onChange={(e) => {
//                                               setcoverletter(e.target.value);
//                                               setErrors({
//                                                 ...errors1,
//                                                 coverletter: null,
//                                               });
//                                             }}
//                                             className="questionInput"
//                                             type="text"
//                                             placeholder="Enter your comments"
//                                           />
//                                           <span
//                                             className="CoverCreator"
//                                             style={{
//                                               color: "#D14F4F",
//                                               opacity: errors1.coverletter
//                                                 ? 1
//                                                 : 0,
//                                             }}
//                                           >
//                                             {errors1.coverletter ?? "valid"}
//                                           </span>
//                                         </div>
  
//                                         <div className="quesOptionalMain">
//                                           <h4 className="HaveQuesText">
//                                             Have a question?
//                                             <span className="OptionalHaveQuest">
//                                               Optional
//                                             </span>
//                                           </h4>
//                                           <p className="haveQuestCreatorText">
//                                             Questions will be public on the Job
//                                             Detail page.
//                                           </p>
//                                         </div>
//                                         <div className="askYourQuestionInput">
//                                           <textarea
//                                             onChange={(e) => {
//                                               setquestion(e.target.value);
//                                             }}
//                                             className="questionInput"
//                                             type="text"
//                                             placeholder="Ask your question"
//                                           />
//                                         </div>
  
//                                         <div className="jobBtnsub_newbtntop">
//                                           <div className="Canceljobapply Canceljobapply_1">
//                                             <span
//                                               className="create-accountclosebtn"
//                                               onClick={handleClose}
//                                             >
//                                               Cancel
//                                             </span>
//                                             {/* <Link
//                                           className="create-account-btn border-radius"
//                                           to="/jobs/list"
//                                         >
//                                           Cancel
//                                         </Link> */}
//                                           </div>
//                                           <div className="jobBtnsub_Btnnew">
//                                             <button
//                                               className="jobclickBtnsubmint"
//                                               value="Send message"
//                                               onClick={validateSubmit}
//                                             >
//                                               Apply Now
//                                             </button>
//                                           </div>
//                                         </div>
//                                       </>
//                                     )}
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
  
//                               {/* NEW APPLY JOB DIALOG BOX END SEP 13 */}
  
//                               {/* {freshJob?.job_applied_status == "True" ? (
//                                 <span className="jobappied">Job Applied</span>
//                               ) : (
//                                 <Link to={`/jobs/apply/${freshJob?.id}`}>
//                                   <button
//                                     type="button"
//                                     className="btn btn-primary Small border-radius"
//                                   >
//                                     Apply Now
//                                   </button>
//                                 </Link>
  
                             
//                               )} */}
  
//                               {/* <Link
//                               className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
//                               to={`/jobs/apply/${jobId}`}
//                             >
//                               {" "}
//                               Submit a Proposal{" "}
//                             </Link> */}
//                             </>
//                             {/* <h3 className="jobalready">job already applied !</h3>
//                 <Link to={`/jobs/apply/${freshJob?.id}`}>
//                 <button
//                     type="button"
//                     hidden={
//                       userData?.user?.role == Object.keys(ROLE)[0] ||
//                       userData?.user?.role == Object.keys(ROLE)[2]
//                     }
                    
//                     className="btn btn-primary Small border-radius Small_new_bt"
//                   >
//                    Submit a Proposal 
//                   </button>
//                </Link> */}
//                           </div>
//                         </div>
//                         {/* {JSON.stringify(freshJob)} */}
//                         <div className="jobListDetailsAreaAndTaskbox">
//                           <div className="RemoteText RemoteTextEightyWidth">
//                             <p
//                               className="PostedDate"
//                               onClick={() => openPopup(`${freshJob?.id}`)}
//                             >
//                               Posted on:{" "}
//                               {moment(freshJob?.created).format("yyyy-MM-DD")}
//                             </p>
//                             <p
//                               className="jobdescr"
//                               onClick={() => openPopup(`${freshJob?.id}`)}
//                             >
//                               {freshJob?.description?.substring(0, 300)}.....
//                             </p>
//                             <div
//                               className="Budget-Title Skilldashbordnew"
//                               onClick={() => openPopup(`${freshJob?.id}`)}
//                             >
//                               <li>
//                                 <h5>Budget:</h5>
//                               </li>
//                               <li>
//                                 {freshJob?.price && <>
//                                   <h5>${freshJob?.price}</h5>
//                                 </>}
//                                 {!freshJob?.price && <>
//                                   <h3 className="colorOnNA">N/A</h3>
//                                 </>}
                               
//                               </li>
//                             </div>
//                             <div
//                               className="Budget-Title  Skilldashbordnew"
//                               onClick={() => openPopup(`${freshJob?.id}`)}
//                             >
//                               <li>
//                                 <h5>Level:</h5>
//                               </li>
//                               <li>
//                                 {freshJob?.level?.level_name && <>
//                                 <h5>{freshJob?.level?.level_name}</h5>
//                                 </>}
//                                 {!freshJob?.level?.level_name && <>
//                                   <h3 className="colorOnNA">N/A</h3>
//                                 </>}
//                               </li>
//                             </div>
//                             {freshJob?.skills?.length > 0 &&(
//                               <>
//                                <div className="Skill mt-2 Skilldashbordnew">
//                               <li>
//                                 <h5>Skills:</h5>
//                               </li>
//                               {/* {freshJob?.skills?.map((freshJob, index) => (
//                                 <li key={index}>
//                                   <a href="">{freshJob.skill_name}</a>
//                                 </li>
//                               ))} */}
//                               {
//                                 freshJob?.skills?.map((freshJob, index) => (
//                                   <li key={index}>
//                                     <Link to="#">{freshJob.skill_name}</Link>
//                                   </li>
//                                 ))}
//                               {/* {freshJob?.skills?.length < 1 && (
//                                 <>
//                                   <li>
//                                     <h3 className="colorOnNA">N/A</h3>
//                                   </li>
//                                 </>
//                               )} */}
//                             </div>
//                               </>
//                             )}
                           
//                             <div
//                               className="Skill mt-2 Skilldashbordnew"
//                               onClick={() => openPopup(`${freshJob?.id}`)}
//                             >
//                               {freshJob?.tags?.length > 0 &&(
//                                 <>
//                                  <li>
//                                 <h5>Tags:</h5>
//                               </li>
//                               {
//                                 freshJob?.tags?.split(",").map((tag, index) => (
//                                   <li key={index}>
//                                     <Link to="#">{tag}</Link>
//                                   </li>
//                                 ))}
//                               {/* {freshJob?.tags?.length < 1 && (
//                                 <>
//                                   <li>
//                                     <h3 className="colorOnNA">N/A</h3>
//                                   </li>
//                                 </>
//                               )} */}
//                                 </>
//                               )}
                             
//                             </div>
//                             <div className="ApplyButton_2">
//                               <button
//                                 type="button"
//                                 className="btn btn-primary Small border-radius"
//                               >
//                                 Apply Now
//                               </button>
//                             </div>
//                           </div>
//                           {freshJob?.jobtasks_job?.length > 0 && (
//                             <div className="taskBoxJobListCard1">
//                               <div className="taskBoxJobListCardFirstHead">
//                                 <div className="taskBoxJobListCardFirstNoBg">
//                                   <h3 className="taskMember1">Task</h3>
//                                   <h3 className="taskMemberd2">Date</h3>
//                                 </div>
//                                 <div className="taskBoxJobListCardDetailsDate1">
//                                   {freshJob?.jobtasks_job?.map((item) => {
//                                     return (
//                                       <>
//                                         <div className="tasksecdiv1">
//                                           <div className="tasktitlesec1">
//                                             {item?.title}
//                                           </div>
//                                           <div className="tasktitlesec2">
//                                             {item?.due_date}
//                                           </div>
//                                         </div>
//                                       </>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               </div>
//             </div>
//           </>
//         ) : null}
  
//         <Dialog
//           className="job-custom_popup"
//           open={open}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={closePopup}
//           aria-describedby="alert-dialog-slide-description "
//         >
//           <DialogContent>
//             <div className="Topallpage">
//               <div className="MarketingDetails-popup page-card border-radius">
//                 <div className="Marketingcamaign">
//                   <div className="CategorylistName">
//                     <div className="jobdes">
//                       <h2>{jobDetails?.title}</h2>
//                     </div>
  
//                     <div className="FreshBtn">
//                       <>
//                         {jobDetails?.job_applied_status == "True" ? (
//                           <span className="jobappied">Job Applied</span>
//                         ) : (
//                           <Link to={`/jobs/apply/${jobId}`}>
//                             Apply Now
//                             {/* <button
//                               type="button"
//                               className="btn btn-primary Small border-radius Small_new_bt"
//                             >
//                               Submit a Proposal
//                             </button> */}
//                           </Link>
//                         )}
//                         {/* <Link
//                                   className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
//                                   to={`/jobs/apply/${jobId}`}
//                                 >
//                                   {" "}
//                                   Submit a Proposal{" "}
//                                 </Link> */}
//                       </>
//                     </div>
//                   </div>
  
//                   <p className="duedate duedate_sec">
//                     Due on: {jobDetails?.expected_delivery_date}
//                   </p>
//                   <div className="jobdetailsInProgress">
//                     <Link className="jobdetailsInProgressBtn" to="">
//                       In Progress
//                     </Link>
//                   </div>
//                   <p className=" INvehicula">{jobDetails?.description}</p>
  
//                   <h5 className="ProvidedTitle">Provided Media:</h5>
//                   {(jobDocuments?.length > 0 ||
//                     jobvideoDocuments?.length > 0) && (
//                     <>
//                       <h6>Job Documents</h6>
//                     </>
//                   )}
  
//                   <div className="mediaimg Providedmediaimg">
//                     {jobDocuments?.map((item, index) => (
//                       <div key={index}>
//                         <a
//                           index_item={index}
//                           target="_blank"
//                           href={`${item}`}
//                           // href={item}
//                         >
//                           <li key={index}>
//                             <img
//                               className=""
//                               src={`${jobDocumentsThumbs[index]}`}
//                               alt=""
//                             />
//                           </li>
//                         </a>
//                       </div>
//                     ))}
  
//                     {jobvideoDocuments?.map((item, index) => (
//                       <div key={index}>
//                         <video className="videounderagency" controls>
//                           <source
//                             src={`${jobvideoDocumentsThumbs[index]}`}
//                             type="video/mp4"
//                           />
//                         </video>
//                       </div>
//                     ))}
//                   </div>
  
//                   {/* {jobDocuments?.length < 1 && <div>N/A</div>} */}
//                   {(additionalJobDocuments?.length > 0 ||
//                     additionalvideoJobDocuments?.length > 0) && (
//                     <>
//                       <h6>Additional Job Documents</h6>
//                     </>
//                   )}
  
//                   <div className="mediaimg Providedmediaimg">
//                     {additionalJobDocuments?.map((item, index) => (
//                       <div key={index}>
//                         <a
//                           index_item={index}
//                           target="_blank"
//                           href={`${item}`}
//                           // href={item}
//                         >
//                           <li key={index}>
//                             <img
//                               className=""
//                               src={`${jobSampleDocumentsThumbs[index]}`}
//                               alt=""
//                             />
//                           </li>
//                         </a>
//                       </div>
//                     ))}
  
//                     {additionalvideoJobDocuments?.map((item, index) => (
//                       <div key={index}>
//                         <video className="videounderagency" controls>
//                           <source
//                             src={`${jobSamplevideoDocumentsThumbs[index]}`}
//                             type="video/mp4"
//                           />
//                         </video>
//                       </div>
//                     ))}
//                   </div>
  
//                   {/* <h5 className="ProvidedTitle">Provided Media:</h5>
//                   <div className="mediaimg">
//                     {jobDetails?.images?.map((item, index) => (
//                       <div key={index}>
//                         {item.job_images
//                           ?.slice(
//                             ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
//                           )
//                           .split(".")
//                           .pop()
//                           .match(/(jpg|jpeg|png|gif)$/i) && (
//                           <a
//                             index_item={index}
//                             target="_blank"
//                             href={`${item?.job_images}`}
//                           >
//                             <li key={index}>
//                               <img
//                                 className=""
//                                 src={`${item?.job_images}`}
//                                 alt=""
//                               />
//                             </li>
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {jobDetails?.images?.map((item, index) => (
//                     <div key={index}>
//                       {!item.job_images
//                         ?.slice(
//                           ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
//                         )
//                         .split(".")
//                         .pop()
//                         .match(/(jpg|jpeg|png|gif)$/i) && (
//                         <p className="mt-3 f-16" key={index}>
//                           <img className="mr-2" src="/img/Document.png" alt="" />
//                           <a
//                             index_item={index}
//                             // href={item.job_images}
//                             href={`${item?.job_images}`}
//                             target="_blank"
//                             download
//                             style={{ cursor: "pointer" }}
//                           >
//                             <span>
//                               {item.job_images?.slice(
//                                 ((item.job_images.lastIndexOf("/") - 1) >>> 0) + 2
//                               )}
//                             </span>
//                           </a>
//                         </p>
//                       )}
//                     </div>
//                   ))} */}
//                 </div>
//                 <hr className="b-top" />
//                 <table>
//                   <tr className="Pricetable">
//                     <td>
//                       <h5 className="colortype">Job Type:</h5>
//                     </td>
//                     <td>
//                       <p className="fixedpriceDetail">
//                         {jobDetails?.get_jobType_details}
//                       </p>
//                     </td>
//                     <td>
//                       <h5 className="colortype">Industry:</h5>
//                     </td>
//                     <td>
//                       <p className="fixedpriceDetail">
//                         {jobDetails?.industry?.industry_name && <>
//                           jobDetails?.industry?.industry_name
//                         </>}
//                         {!jobDetails?.industry?.industry_name && <>
//                           <h3 className="colorOnNA">N/A</h3>
//                         </>}
//                       </p>
//                     </td>
//                   </tr>
//                   <tr className="Pricetable">
//                     <td>
//                       <h5 className="colortype">Offered Price:</h5>
//                     </td>
//                     <td>
//                       <p className="fixedpriceDetail">${jobDetails?.price}</p>
//                     </td>
//                     <td>
//                       <h5 className="colortype">Level:</h5>
//                     </td>
//                     <td>
//                       <p className="fixedpriceDetail">
//                         {jobDetails?.level?.level_name}
//                       </p>
//                     </td>
//                   </tr>
//                 </table>
//                 <hr className="b-top" />
//                 <table>
//                   <tr className="Pricetable">
//                     <td>
//                       <h5 className="colortype CompanyName">Company:</h5>
//                     </td>
//                     <td>
//                       <p className="fixedpriceDetail CompanyNameIn">
//                         {jobDetails?.company ? jobDetails?.company?.name : "N/A"}
  
//                       </p>
//                     </td>
//                   </tr>
//                 </table>
//                 <hr className="b-top" />
//                 <div className="Skill">
//                   <h5 className="skillsjobde mb-4">Skills:</h5>
//                   {jobDetails?.skills?.length > 0 &&
//                     jobDetails?.skills?.map((item, index) => (
//                       <li key={index}>
//                         <Link to="">{item.skill_name}</Link>
//                       </li>
//                     ))}
//                   {jobDetails?.skills?.length < 1 && (
//                     <>
//                       <li>
//                         <h3 className="colorOnNA">N/A</h3>
//                       </li>
//                     </>
//                   )}
//                 </div>
//                 <div className="Skill">
//                   <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
//                   {jobDetails?.tags?.length > 0 &&
//                     jobDetails?.tags?.split(",")?.map((tag, index) => (
//                       <li key={index}>
//                         <Link to="#">{tag}</Link>
//                       </li>
//                     ))}
//                   {jobDetails?.tags?.length < 1 && (
//                     <>
//                       <li>
//                         <h3 className="colorOnNA">N/A</h3>
//                       </li>
//                     </>
//                   )}
//                   {/* {jobDetails?.tags?.split(",").map((tag, index) => (
//                     <li key={index}>
//                       <Link to="#">{tag}</Link>
//                     </li>
//                   ))} */}
//                 </div>
//               </div>
//             </div>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={closePopup}>Close</Button>
//           </DialogActions>
//         </Dialog>
  
//         {/* <div className="Topallpage_sec">
//           <div className="InProgress-4">
//             <div className="Work-D">
//               <div className="Work-In">
//                 <div className="InProgress">
//                   <div className="Work-P-Title">
//                     <h1>Work in Progress</h1>
//                     {""}
//                   </div>
//                   <div className="Sort">
//                     <h6>
//                       <img src="img/Sort.png" alt="" /> Sort by due date
//                     </h6>{" "}
//                   </div>
//                 </div>
//                 <div className="Marketingcampaign">
//                   <div className="Marketingcampaign1"></div>
//                   <div className="Marketingcampaign2">
//                     <Link to={`/jobs/details/68`}>
//                       <h2>Marketing campaign job for adifect</h2>
//                     </Link>
//                     <p className="jobtextjob">
//                       In vehicula orci maecenas egestas sodales at. Senectus nec
//                       dolor id pulvinar. Vitae fringilla phasellus amet semper
//                       sagittis, neque. Sed a sed diam senectus diam. Arcu tellus
//                       ullamcorper volutpat id{" "}
//                     </p>{" "}
//                     <Link to="#" className="progresstext">
//                       In Progress
//                     </Link>
//                     <div className="duadate">
//                       <li>
//                         <h4>Due on:</h4>
//                       </li>
//                       <li>
//                         <h4>06-02-2022</h4>
//                       </li>
//                     </div>
//                     <div className="Skill mt-2">
//                       <li>
//                         <Link to="#">Marketing</Link>
//                       </li>
//                       <li>
//                         <Link to="#">Digital Marketing</Link>
//                       </li>
//                       <li>
//                         <Link to="#">Ad Campaign</Link>
//                       </li>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="Work-In ReviewIn">
//                 <div className="InProgress">
//                   <div className="Work-P-Title">
//                     <h1>In Review</h1>{" "}
//                   </div>
//                   <div className="Sort">
//                     <h6>
//                       <img src="img/Sort.png" alt="" /> Sort by status
//                     </h6>{" "}
//                   </div>
//                 </div>
//                 <div className="Marketingcampaign ReviewIn-B">
//                   <div className="Marketingcampaign1 Marketingcampaign3"></div>
//                   <div className="Marketingcampaign2">
//                     <div className="businesstext">
//                       <Link to={`/jobs/details/68`}>
//                         <h2>Run campaign for a jewelry business </h2>
//                       </Link>
//                       <span className="NewText">
//                         <img className="mailicon" src="img/mail.png" />
//                         +1 New
//                       </span>
//                     </div>
//                     <p>
//                       In vehicula orci maecenas egestas sodales at. Senectus nec
//                       dolor id pulvinar. Vitae fringilla phasellus amet semper
//                       sagittis, neque. Sed a sed diam senectus diam. Arcu tellus
//                       ullamcorper volutpat id{" "}
//                     </p>{" "}
//                     <Link to="#" className="progresstext Review">
//                       In Review
//                     </Link>
//                     <div className="duadate">
//                       <li>
//                         <h4>Due on:</h4>
//                       </li>
//                       <li>
//                         <h4>04-02-2022</h4>
//                       </li>
//                     </div>
//                     <div className="Skill mt-2">
//                       <li>
//                         <Link to="#">Marketing</Link>
//                       </li>
//                       <li>
//                         <Link to="#">Digital Marketing</Link>
//                       </li>
//                       <li>
//                         <Link to="#">Ad Campaign</Link>
//                       </li>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
//         <div className="Topallpage_sec">
//           <div className="InProgress-4 creatordashbordtab">
//             <div className="Work-D">
//               <div className="inProgressDashboardComponent">
//                 <Creator_dashboard_in_progress />
//               </div>
//               <div className="inReviewDashboardComponent">
//                 <Creator_dashboard_in_review />
//               </div>{" "}
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
  
import React from 'react'

const CreatorDashboard = () => {
  return (
    <div>CreatorDashboard</div>
  )
}

export default CreatorDashboard