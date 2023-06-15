// import React, { useEffect, useState, useRef } from "react";
// import LoadingSpinner from "../../containers/LoadingSpinner";
// import { defaultPageLoader } from "../../redux/actions/other-actions";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BACKEND_API_URL } from "../../environment";
// import { listAllCategories } from "../../redux/actions/category-actions";
// import { listAllLevels } from "../../redux/actions/level-actions";
// import { listAllSkills } from "../../redux/actions/skill-actions";
// import { listAllIndustries } from "../../redux/actions/industry-actions";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import TextField from "@mui/material/TextField";
// import { DatePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { validations } from "../../utils";
// import swal from "sweetalert";
// import moment from "moment";
// import { getJobDetails } from "../../redux/actions/job-actions";
// import { useParams } from "react-router-dom";
// // import SuccessAlert from "../../../public/img/SuccessAlert.png";
// import MenuItem from "@mui/material/MenuItem";
// import Select  from "@mui/material/Select";
// import Chip from "@mui/material/Chip";
//  import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

// export default function Creator_jobs_add_edit() {
//   const { jobId } = useParams();
//   let navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [isLoading, setIsLoading] = useState(true);
//   const { loading } = useSelector((state) => state.loaderReducer);

//   setTimeout(function () {
//     setIsLoading(false);
//   }, 1200);

//   const [title, setTitle] = useState();
//   const [description, setDescription] = useState();
//   const [jobDocuments, setJobDocuments] = useState();
//   const [level, setLevel] = useState("");
//   const [category, setCategory] = useState("");
//   const [deliveryDate, setDeliveryDate] = useState(new Date());
//   const [price, setPrice] = useState();
//   const [tags, setTags] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [imageChanged, setImageChanged] = useState(false);
//   const [fileExtension, setFileExtension] = useState();

//   const [errors, setErrors] = useState({
//     title: null,
//     description: null,
//     jobDocuments: null,
//     level: null,
//     category: null,
//     deliveryDate: null,
//     price: null,
//     tags: null,
//     skills: null,
//   });

//   const [selectedFile, setSelectedFile] = useState();
//   const imgRef = useRef(null);
//   // const [preview, setPreview] = useState();

//   const { userData } = useSelector((state) => state.authReducer);

//   const { loading: categoriesLoading, categoryData: categories } = useSelector(
//     (state) => state.categoryReducer
//   );
//   const { levelsData } = useSelector((state) => state.levelReducer);
//   const { skillsData } = useSelector((state) => state.skillReducer);
//   const { industriesData } = useSelector((state) => state.industryReducer);

//   const {
//     loading: jobLoading,
//     success,
//     jobDetails,
//   } = useSelector((state) => state.jobDetailsReducer);

//   const [isOpen, setIsOpen] = useState(false);
//   const [isOpen1, setIsOpen1] = useState(false);
//   const [isOpen2, setIsOpen2] = useState(false);
//   const [isOpen3, setIsOpen3] = useState(false);
//   const [isOpenSkill, setIsOpenSkill] = useState(false);
//   // const [isOpen4, setIsOpen4] = useState(false);

//   useEffect(() => {
//     // dispatch(defaultPageLoader());
//     const handler = () => {
//       setIsOpen(false);
//       setIsOpen1(false);
//       setIsOpen2(false);
//       setIsOpen3(false);
//       // setIsOpen4(false);
//     };
//     window.addEventListener("scroll", handler);
//     return () => {
//       window.removeEventListener("scroll", handler);
//     };
//   }, []);

//   const menuProps = {
//     variant: "menu",
//     disableScrollLock: true,
//   };

//   useEffect(() => {
//     if (jobId) {
//       dispatch(getJobDetails(jobId));
//       if (success) {
//         setTitle(jobDetails.title);
//         setDescription(jobDetails.description);
//         setJobDocuments(jobDetails.images);
//         setDeliveryDate(jobDetails.expected_delivery_date);
//         setPrice(jobDetails.price);
//         setCategory(jobDetails.category.id);
//         setLevel(jobDetails.level.id);
//         setSkills(jobDetails.skills);
//         // setCompanyType(jobDetails.company_type.id);
//         // setTags(jobDetails.tags);
//         if (jobDetails.tags) {
//           const tagsList = jobDetails.tags.split(",");
//           if (tagsList) {
//             setTags(tagsList);
//           }
//         }
//         if (jobDetails.images) {
//           let fileext = [];
//           let s = [];
//           let b = [];

//           for (var i = 0; i < jobDetails.images.length; i++) {
//             fileext.push(
//               jobDetails.images[i].job_images.slice(
//                 ((jobDetails.images[i].job_images.lastIndexOf(".") - 1) >>> 0) +
//                   2
//               )
//             );
//             b.push(jobDetails.images[i].job_images);
//           }
//           imgRef.current = b;

//           setFileExtension(fileext);
//         }
//       }
//     }
//   }, [success]);

//   useEffect(() => {
//     dispatch(listAllCategories());
//     dispatch(listAllLevels());
//     dispatch(listAllSkills());
//     dispatch(listAllIndustries());
//   }, []);

//   const downloadFile = (blob, fileNameDownload, v) => {
//     if (v === "add") {
//       // console.log("blob--", blob);
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.style.display = "none";
//       a.href = url;
//       a.download = fileNameDownload;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//     }
//     if (v === "edit") {
//       // console.log("blobedit--", blob);
//       const file = new Blob([blob], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(file);
//       const a = document.createElement("a");
//       a.style.display = "none";
//       a.href = url;
//       a.download = fileNameDownload;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//     }
//   };

//   const removeDocument = (e, v) => {
//     console.log("e-", e);
//     console.log("v-", v);
//     if (v == "icon") {
//       const s = jobDocuments.filter((item, index) => index !== e);
//       const s1 = imgRef.current.filter((item, index) => index !== e);
//       setJobDocuments(s);
//       imgRef.current = s1;
//       return;
//     }
//     if (v == "image") {
//       // console.log("e2--", e);
//       const s = jobDocuments.filter((item, index) => index !== e);
//       setJobDocuments(s);
//       return;
//     }
//     if (v == "data") {
//       // console.log("e3--", e);
//       const s = jobDocuments.filter((item, index) => index !== e);
//       setJobDocuments(s);
//       return;
//     }
//   };

//   const onSelectFile = (e) => {
//     setImageChanged(true);
//     var imageList = [];
//     var previewImages = [];
//     let fileext = [];
//     for (let i = 0; i < e.target.files.length; i++) {
//       previewImages.push(URL.createObjectURL(e.target.files[i]));
//       imageList.push(e.target.files[i]);
//       fileext.push(
//         e.target.files[i].name.slice(
//           ((e.target.files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
//         )
//       );
//     }
//     setJobDocuments(jobDocuments ? [...jobDocuments, imageList] : imageList);
//     setFileExtension(fileext);
//     setSelectedFile(previewImages);
//     imgRef.current = imageList;
//     console.log("imgRef--", imgRef);
//     console.log("jobDocuments--", jobDocuments);
//   };

//   const validateSubmit = (e) => {
//     e.preventDefault();

//     const tempErrors = {
//       title: validations.title(title),
//       description: validations.description(description),
//       jobDocuments: validations.jobImages(jobDocuments),
//       level: validations.level(level),
//       category: validations.category(category),
//       deliveryDate: validations.deliveryDate(deliveryDate),
//       price: validations.price(price),
//       tags: validations.tags(tags),
//       // skills: validations.skills(skills),
//     };
//     setErrors(tempErrors);

//     if (Object.values(tempErrors).filter((value) => value).length) {
//       console.log(
//         "..values",
//         Object.values(tempErrors).filter((value) => value)
//       );
//       return;
//     }
//     submitHandler();
//   };

//   const submitHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("title", title);
//     if (imageChanged) {
//       for (const key of Object.keys(jobDocuments)) {
//         formData.append("image", jobDocuments[key]);
//       }
//     }
//     for (var i = 0; i < skills.length; i++) {
//       formData.append("skills", skills[i].id ? skills[i].id : skills[i]);
//     }
//     formData.append("description", description);
//     formData.append(
//       "expected_delivery_date",
//       moment(deliveryDate).format("YYYY-MM-DD")
//     );
//     formData.append("price", price);
//     formData.append("tags", tags);
//     formData.append("category", category);
//     formData.append("level", level);
//     formData.append("user", userData.user.user_id);
//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${userData.token}`,
//       },
//     };

//     if (!jobId) {
//       const create_job = await axios
//         .post(`${BACKEND_API_URL}jobs/`, formData, config)
//         .then((res) => {
//           // console.log("response", res.data);
//           swal({
//             title: "Successfully Complete",
//             text: res.data.message,
//             className: "successAlert",
//             icon: "/img/SuccessAlert.png",
//             buttons: false,
//           });
//           navigate(`/jobs/list`);
//         })
//         .catch((err) => {
//           swal({
//             title: "Error",
//             text: err.response.data.message,
//             className: "errorAlert",
//             icon: "/img/ErrorAlert.png",
//             buttons: false,
//           });
//         });
//     } else {
//       const update_job = await axios
//         .put(`${BACKEND_API_URL}jobs/${jobId}/`, formData, config)
//         .then((res) => {
//           // console.log("response", res.data);
//           swal({
//             title: "Successfully Complete",
//             text: res.data.message,
//             className: "successAlert",
//             icon: "/img/SuccessAlert.png",
//             buttons: false,
//           });
//           navigate(`/jobs/list`);
//         })
//         .catch((err) => {
//           swal({
//             title: "Error",
//             text: err.response.data.message,
//             className: "errorAlert",
//             icon: "/img/ErrorAlert.png",
//             buttons: false,
//           });
//         });
//     }
//     setImageChanged(false);
//   };

//   const changeHandler = (e, v) => {
//     let myList = [];
//     for (let i = 0; i < v.length; i++) {
//       console.log(v[i].id);
//       myList.push(v[i].id);
//     }
//     setSkills(myList);
//     setIsOpenSkill(false);
//   };

//   // const toDay = new Date().toISOString().substring(0, 10);

//   function handleKeyDownSkills(e) {
//     setIsOpenSkill(true);
//     if (e.key !== "Enter") return;
//     const value = e.target.value;
//     if (!value.trim()) return;
//     setSkills([...skills, value]);
//     e.target.value = "";
//   }

//   function removeSkill(index) {
//     setSkills(skills.filter((el, i) => i !== index));
//   }

//   function handleKeyDown(e) {
//     if (e.key !== "Enter") return;
//     const value = e.target.value;
//     if (!value.trim()) return;
//     setTags([...tags, value]);
//     e.target.value = "";
//   }

//   function removeTag(index) {
//     setTags(tags.filter((el, i) => i !== index));
//   }

//   function removeSkillPopup(index) {
//     setIsOpenSkill(false);
//   }

//   return (
//     <>
//       {/* {loading && <LoadingSpinner />} */}
//       {isLoading && <LoadingSpinner />}
//       {/* {isLoading ? (
//         <LoadingSpinner />
//       ) : ( */}
//       <>
//         <form>
//           <div className="Category_p">
//             <div className="CategorylistName">
//               <h1>What Service Are You Looking For?</h1>
//             </div>
//           </div>

//           <div className="Topallpage">
//             <div
//               className="ContentDiv jobaddformtop"
//               onClick={removeSkillPopup}
//             >
//               <div className="Describe half-form-validation">
//                 <div
//                   className={
//                     errors.title
//                       ? "inputCntnr error"
//                       : "inputCntnr CategoryinputH"
//                   }
//                 >
//                   <h4 className="Attachment">Job Title</h4>
//                   <input
//                     className="category_name validateInput bkC1 w-551 h-47 border-radius border-1"
//                     type="text"
//                     placeholder="Title"
//                     name="title"
//                     onChange={(e) => {
//                       setTitle(e.target.value);
//                       setErrors({ ...errors, title: null });
//                     }}
//                     value={title}
//                   />
//                   <span
//                     style={{
//                       color: "#D14F4F",
//                       opacity: errors.title ? 1 : 0,
//                     }}
//                   >
//                     {errors.title ?? "valid"}
//                   </span>
//                 </div>
//                 <div className="text-content addjobtopdiv mt-4">
//                   <h4 className="Describe_Job_add">
//                     Describe the service you're looking to purchase in detail
//                   </h4>
//                   <textarea
//                     className="w-551 border-1 border-radius h-180 Textbox-textarea mt-2 pl-2 pt-2"
//                     placeholder=""
//                     maxLength={4000}
//                     value={description}
//                     onChange={(e) => {
//                       setDescription(e.target.value);
//                       setErrors({ ...errors, description: null });
//                     }}
//                   />
//                   <div className="countdiv">
//                     <p>
//                       <span
//                         style={{
//                           color: description?.length === 4000 && "#D14F4F",
//                         }}
//                       >
//                         {description?.length ?? 0}
//                         {/* {jobId ? `${description?.length}` : descLength} */}
//                         /4000
//                       </span>
//                     </p>
//                   </div>{" "}
//                 </div>
//                 <span style={{ color: "#D14F4F" }}>{errors.description}</span>
//                 <div className="text-content mt-3">
//                   <h4 className="Attachment">Attachment</h4>
//                   <input
//                     multiple
//                     type="file"
//                     onChange={(e) => {
//                       onSelectFile(e);
//                       setErrors({ ...errors, jobDocuments: null });
//                     }}
//                     id="upload"
//                     hidden
//                   />
//                   <label className="upload" htmlFor="upload">
//                     {" "}
//                     <img
//                       className="mr-2"
//                       src={process.env.PUBLIC_URL + "/img/upload.png"}
//                       alt=""
//                     />
//                     Attach Files
//                   </label>
//                 </div>
//                 {/* EDIT PAGE */}

//                 <div className="job-documents">
//                   {selectedFile &&
//                     selectedFile?.map((item, index) => (
//                       <p className="mt-3 f-16" key={index}>
//                         <div className="downloadCreator" key={index}>
//                           {fileExtension[index].match(
//                             /(jpg|jpeg|png|gif)$/i
//                           ) && (
//                             <>
//                               <a target="_blank" href={item}>
//                                 <img className="w-100" src={item} />
//                               </a>
//                               <div
//                                 className="overlay"
//                                 onClick={() => removeDocument(index, "image")}
//                               >
//                                 <a href="#" className="icon" title="Remove">
//                                   <i className="fa-solid fa-circle-xmark"></i>
//                                 </a>
//                               </div>
//                             </>
//                           )}
//                           {!fileExtension[index].match(
//                             /(jpg|jpeg|png|gif)$/i
//                           ) && (
//                             <>
//                               <a
//                                 style={{ cursor: "pointer" }}
//                                 onClick={(e) =>
//                                   downloadFile(item, item.name, "add")
//                                 }
//                               >
//                                 <i
//                                   className="fas fa-download"
//                                   style={{ color: "#0a58ca" }}
//                                 ></i>
//                                 <img
//                                   className="mr-2"
//                                   src="img/file1.png"
//                                   alt=""
//                                 />
//                                 {item.name}
//                               </a>
//                               <div
//                                 className="overlay"
//                                 onClick={() => removeDocument(index, "icon")}
//                               >
//                                 <a href="#" className="icon" title="Remove">
//                                   <i className="fa-solid fa-circle-xmark"></i>
//                                 </a>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </p>
//                     ))}
//                 </div>

//                 <span style={{ color: "#D14F4F" }}>{errors.jobDocuments}</span>

//                 <div className="text-content mt-3">
//                   <h4 className="Choose">Expected Skill Level</h4>{" "}
//                   <div className="styled-select">
//                     <Select
//                       open={isOpen2}
//                       onOpen={() => {
//                         setIsOpen2(true);
//                       }}
//                       onClose={() => {
//                         setIsOpen2(false);
//                       }}
//                       MenuProps={menuProps}
//                       value={level}
//                       onChange={(e) => {
//                         setLevel(e.target.value);
//                         setErrors({ ...errors, level: null });
//                       }}
//                       displayEmpty
//                       inputProps={{ "aria-label": "Without label" }}
//                     >
//                       <MenuItem value="">Select Level</MenuItem>
//                       {levelsData.map((item) =>
//                         item.is_active ? (
//                           <MenuItem key={item.id} value={item.id}>
//                             {item.level_name}
//                           </MenuItem>
//                         ) : null
//                       )}
//                     </Select>
//                   </div>
//                   <span style={{ color: "#D14F4F" }}>{errors.level}</span>
//                 </div>

//                 <div className="text-content mt-3">
//                   <h4 className="Choose">Choose Category</h4>{" "}
//                   <div className="styled-select">
//                     <Select
//                       open={isOpen}
//                       onOpen={() => {
//                         setIsOpen(true);
//                       }}
//                       onClose={() => {
//                         setIsOpen(false);
//                       }}
//                       MenuProps={menuProps}
//                       value={category}
//                       id="category"
//                       onChange={(e) => {
//                         setCategory(e.target.value);
//                         setErrors({ ...errors, category: null });
//                       }}
//                       displayEmpty
//                       inputProps={{ "aria-label": "Without label" }}
//                     >
//                       <MenuItem value=""> Select Category </MenuItem>
//                       {categories?.map((item) =>
//                         item.is_active ? (
//                           <MenuItem key={item.id} value={item.id}>
//                             {item.category_name}
//                           </MenuItem>
//                         ) : null
//                       )}
//                     </Select>
//                   </div>
//                   <span style={{ color: "#D14F4F" }}>{errors.category}</span>
//                 </div>

//                 {/* <div className="text-content mt-3">
//                     <h4 className="Choose">Level</h4>{" "}
//                     <div className="styled-select">
//                       <Select
//                         open={isOpen2}
//                         onOpen={() => {
//                           setIsOpen2(true);
//                         }}
//                         onClose={() => {
//                           setIsOpen2(false);
//                         }}
//                         MenuProps={menuProps}
//                         value={level}
//                         onChange={(e) => {
//                           setLevel(e.target.value);
//                           setErrors({ ...errors, level: null });
//                         }}
//                         displayEmpty
//                         inputProps={{ "aria-label": "Without label" }}
//                       >
//                         <MenuItem value="">Select Level</MenuItem>

//                         {levelsData.map((item) =>
//                           item.is_active ? (
//                             <MenuItem key={item.id} value={item.id}>
//                               {item.level_name}
//                             </MenuItem>
//                           ) : null
//                         )}
//                       </Select>
//                     </div>
//                     <span style={{ color: "#D14F4F" }}>{errors.level}</span>
//                   </div> */}

//                 <div className="text-content DeliveryDate mt-3">
//                   <h4 className="Attachment">Expected Delivery Date</h4>
//                   <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <label>
//                       <DatePicker
//                         mask="__-__-____"
//                         label=""
//                         value={deliveryDate}
//                         inputFormat="dd-MM-yyyy"
//                         formatDate={(deliveryDate) =>
//                           moment(new Date()).format("DD-MM-YYYY")
//                         }
//                         // inputFormat="MM-dd-yyyy"
//                         minDate={new Date()}
//                         onChange={(newValue) => {
//                           // setErrors({ ...errors, dob: null });
//                           setDeliveryDate(newValue);
//                         }}
//                         renderInput={(params) => (
//                           <TextField variant="standard" {...params} />
//                         )}
//                       />
//                     </label>
//                   </LocalizationProvider>
//                 </div>
//                 <span style={{ color: "#D14F4F" }}>{errors.deliveryDate}</span>

//                 <div className="text-content mt-3">
//                   <h4 className="Attachment">Price</h4>
//                   <div className="pricename">
//                     <input
//                       type="number"
//                       min={0}
//                       max={1000000}
//                       // pattern="\d*"
//                       maxLength="4"
//                       value={price}
//                       // maxLength={7}
//                       placeholder="Price"
//                       onChange={(e) => {
//                         setPrice(e.target.value);
//                         setErrors({ ...errors, price: null });
//                       }}
//                     />
//                     <span className="pricetag">$</span>
//                   </div>
//                   {/* <div className="pricename">
//                     <input
//                       type="number"
//                       value={price}
//                       maxLength={7}
//                       placeholder="Price"
//                       onChange={(e) => {
//                         setPrice(e.target.value);
//                         setErrors({ ...errors, price: null });
//                       }}
//                     />
//                     <span className="pricetag">$</span>
//                   </div> */}
//                 </div>
//                 <span style={{ color: "#D14F4F" }}>{errors.price}</span>

//                 <div className="text-content Skills mt-3">
//                   <h4 className="Attachment Tagsjobadd">Skills Needed</h4>
//                   <div className="Marketing- mt-2-">
//                     <div className="skills-input-container">
//                       {/* {JSON.stringify(skills)} */}
//                       <Autocomplete
//                         multiple
//                         id="tags-outlined"
//                         options={skillsData.filter((item) => item.is_active)}
//                         getOptionLabel={(option) => option.skill_name}
//                         // onChange={(event, value) => setSkills(value)}
//                         onChange={(e, v) => {
//                           changeHandler(e, v);
//                           setErrors({ ...errors, skills: null });
//                         }}
//                         defaultValue={skills}
//                         // inputProps={{ "aria-label": "Without label" }}
//                         filterSelectedOptions
//                         // hiddenLabel="true"
//                         // open={false}
//                         open={isOpenSkill}
//                         onKeyDown={handleKeyDownSkills}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             fullWidth
//                             placeholder="Type something"
//                           />
//                         )}
//                         isOptionEqualToValue={(option, value) =>
//                           value === undefined ||
//                           value === "" ||
//                           option.id === value.id
//                         }
//                       />
//                     </div>
//                   </div>
//                   <span style={{ color: "#D14F4F" }}>{errors.skills}</span>
//                 </div>

//                 <div className="text-content mt-3">
//                   <h4 className="Attachment Tagsjobadd">Tags</h4>
//                   <div className="Marketing  Marketing_2 mt-3 display-f">
//                     <div className="tags-input-container">
//                       {tags?.map((tag, index) => (
//                         <div className="tag-item" key={index}>
//                           <span className="text">{tag}</span>
//                           <span
//                             className="close"
//                             onClick={() => removeTag(index)}
//                           >
//                             <svg
//                               className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiChip-deleteIcon MuiChip-deleteIconMedium MuiChip-deleteIconColorDefault MuiChip-deleteIconOutlinedColorDefault css-i4bv87-MuiSvgIcon-root"
//                               focusable="false"
//                               aria-hidden="true"
//                               viewBox="0 0 24 24"
//                               data-testid="CancelIcon"
//                             >
//                               <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
//                             </svg>
//                           </span>
//                         </div>
//                       ))}
//                       <input
//                         onKeyDown={handleKeyDown}
//                         type="text"
//                         className="tags-input"
//                         placeholder="Type something"
//                       />
//                     </div>
//                   </div>
//                   <span style={{ color: "#D14F4F" }}>{errors.tags}</span>
//                 </div>

//                 <div className="text-content mt-4">
//                   <div className="SubmitCancelBTN">
//                     <div className="buttomjobbtn">
//                       <button
//                         type="button"
//                         onClick={validateSubmit}
//                         className="primary Small border-radius"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                     <div className="Job-Bott-Btn-Cancel">
//                       <a
//                         href="/jobs/list"
//                         className="create-account-btn border-radius"
//                       >
//                         Cancel
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </>
//       {/* )} */}
//     </>
//   );
// }