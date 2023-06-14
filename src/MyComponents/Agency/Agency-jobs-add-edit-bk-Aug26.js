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
import { listAllCompanies } from "../../redux/actions/company-actions";
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
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [jobDocuments, setJobDocuments] = useState();
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [price, setPrice] = useState();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState(null);
  const [level, setLevel] = useState(null);
  const [job_type, setJobType] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [fileExtension, setFileExtension] = useState();
  const [fileNameDisplay, setFileNameDisplay] = useState();
  // const [company_type, setCompanyType] = useState();
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [company, setCompany] = useState(null);

  const [addedSkill, setAddedSkill] = useState(false);


  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  const [editJobDocuments, setEditJobDocuments] = useState();
  const [editFileExtension, setEditFileExtension] = useState();
  // const [editFileNameDisplay, setEditFileNameDisplay] = useState();
  const [removeJobDocuments, setRemoveJobDocuments] = useState([]);
  // const [relatedJobsChange, setRelatedJobsChange] = useState(false);

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
  });

  const [selectedFile, setSelectedFile] = useState();
  const imgRef = useRef(null);
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
  const [isOpenSkill, setIsOpenSkill] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
      setIsOpen1(false);
      setIsOpen2(false);
      setIsOpen3(false);
      setIsOpen4(false);
      setIsOpen5(false);
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

  useEffect(() => {
    if (jobId) {
      dispatch(getJobDetails(jobId));
      if (success) {
        setTitle(jobDetails.title);
        setDescription(jobDetails.description);
        setJobDocuments(jobDetails.images);
        setDeliveryDate(jobDetails.expected_delivery_date);
        setPrice(jobDetails.price);
        setJobType(jobDetails.job_type);
        setCategory(jobDetails.category?.id);
        setIndustry(jobDetails.industry?.id);
        setLevel(jobDetails.level?.id);
        setSkills(jobDetails.skills);
        setRelatedJobs(jobDetails.related_jobs);
        setCompany(jobDetails.company?.id);
        // setTags(jobDetails.tags);

        if (jobDetails.tags) {
          const tagsList = jobDetails.tags?.split(",");
          if (tagsList) {
            setTags(tagsList);
          }
        }
        if (jobDetails.images) {
          let fileext = [];
          let s = [];
          let b = [];

          for (var i = 0; i < jobDetails.images.length; i++) {
            fileext.push(
              jobDetails.images[i].job_images.slice(
                ((jobDetails.images[i].job_images.lastIndexOf(".") - 1) >>> 0) +
                2
              )
            );
            s.push(
              jobDetails.images[i].job_images.slice(
                ((jobDetails.images[i].job_images.lastIndexOf("/") - 1) >>> 0) +
                2
              )
            );
            b.push(jobDetails.images[i].job_images);
          }
          // console.log("s--", s);
          imgRef.current = b;
          // console.log("imgRefcurrent", imgRef.current);

          setFileNameDisplay(s);
          setFileExtension(fileext);
        }
      }
      // setEditFileNameDisplay([]);
      setEditFileExtension([]);
    }
  }, [success]);

  useEffect(() => {
    dispatch(listAllCategories());
    dispatch(listAllLevels());
    dispatch(listAllSkills());
    dispatch(listAllIndustries());
    dispatch(listAllCompanies());
  }, [addedSkill]);

  useEffect(() => {
    if (title && title.replace(/[^\w\s]/gi, "")) {
      dispatch(getRelatedJobs(title));
    }
  }, [title]);

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

  const removeNewDocument = (e, v) => {
    // console.log("e-", e);
    // console.log("v-", v);
    setJobDocuments(jobDocuments.filter((el, i) => i !== e));
    const s1 = imgRef.current.filter((item, i) => i !== e);
    imgRef.current = s1;
    setFileExtension(fileExtension.filter((el, i) => i !== e));
    return;
  };

  const onSelectFile = (e) => {
    setImageChanged(true);
    var imageList = [];
    var previewImages = [];
    let fileext = [];
    for (let i = 0; i < e.target.files.length; i++) {
      previewImages.push(URL.createObjectURL(e.target.files[i]));
      imageList.push(e.target.files[i]);
      fileext.push(
        e.target.files[i].name.slice(
          ((e.target.files[i].name.lastIndexOf(".") - 1) >>> 0) + 2
        )
      );
    }
    if (!jobId) {
      setJobDocuments(imageList);
      setFileExtension(fileext);
    } else {
      setEditJobDocuments(imageList);
      setEditFileExtension(fileext);
    }
    setSelectedFile(previewImages);
    imgRef.current = imageList;
  };

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      title: validations.title(title),
      price: validations.price(price),
      // jobDocuments: validations.jobImages(jobDocuments),
      // category: validations.category(category),
      deliveryDate: validations.deliveryDate(deliveryDate),
      description: validations.description(description),
      job_type: !job_type && "Please select a job type",
      skills: skills.length === 0 && "Skill is required",
      tags: tags.length === 0 && "Please provide atleast one tag",
      level: !level && "Please select an experience level",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {

      return;
    }
    submitHandler();
  };

  // const validateSubmit = (e) => {
  //   e.preventDefault();
  //   const tempErrors = {
  //     title: validations.title(title),
  //     price: validations.price(price),
  //     tags: validations.tags(tags),
  //     // jobDocuments: validations.jobImages(jobDocuments),
  //     // category: validations.category(category),
  //     deliveryDate: validations.deliveryDate(deliveryDate),
  //     description: validations.description(description),
  //     // skills: [] ? "Skill is required" : null,
  //   };
  //   setErrors(tempErrors);

  //   if (Object.values(tempErrors).filter((value) => value).length) {
  //     console.log(
  //       "..values",
  //       Object.values(tempErrors).filter((value) => value)
  //     );
  //     return;
  //   }
  //   submitHandler();
  // };

  const submitHandler = async (e) => {
    const formData = new FormData();
    if (imageChanged) {
      if (jobId) {
        if (editJobDocuments) {
          for (const key of Object.keys(editJobDocuments)) {
            formData.append("image", editJobDocuments[key]);
          }
        }
      } else {
        if (jobDocuments) {
          for (const key of Object.keys(jobDocuments)) {
            formData.append("image", jobDocuments[key]);
          }
        }
      }
    }
    // console.log("removeJobDocuments---____", removeJobDocuments);
    if (removeJobDocuments) {
      for (const key of Object.keys(removeJobDocuments)) {
        formData.append("remove_image", removeJobDocuments[key]);
      }
    }

    formData.append("title", title);
    formData.append("description", description);
    formData.append(
      "expected_delivery_date",
      moment(deliveryDate).format("YYYY-MM-DD")
    );
    for (var i = 0; i < skills.length; i++) {
      formData.append("skills", skills[i].id ? skills[i].id : skills[i]);
    }
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

    if (company) {
      formData.append("company", company);
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
    formData.append("user", userData.user.user_id);
    // formData.append("category", category);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    if (!jobId) {
      const create_job = await axios
        .post(`${BACKEND_API_URL}jobs/`, formData, config)
        .then((res) => {
          // console.log("response", res.data);
          swal({
            title: "Successfully Complete",
            text: res.data.message,
            className: "successAlert",
            icon: "/img/SuccessAlert.png",
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
            icon: "/img/ErrorAlert.png",
            buttons: false,
            timer: 1500,
          });
        });
    } else {
      const update_job = await axios
        .put(`${BACKEND_API_URL}jobs/${jobId}/`, formData, config)
        .then((res) => {
          // console.log("response", res.data);
          swal({
            title: "Successfully Complete",
            text: res.data.message,
            className: "successAlert",
            icon: "/img/SuccessAlert.png",
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
            icon: "/img/ErrorAlert.png",
            buttons: false,
            timer: 1500,
          });
        });
    }
    setImageChanged(false);
  };

  // const changeHandler = (e, v) => {
  //   console.log("eand v--", e, v);
  //   let myList = [];
  //   for (let i = 0; i < v.length; i++) {
  //     // console.log(v[i].id);
  //     myList.push(v[i]);
  //     // myList.push(v[i].id);
  //   }

  //   setSkills(myList);
  //   setIsOpenSkill(false);
  // };

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
    // const filteredTags = tags.filter((str) =>
    //   str.toLowerCase().includes(value.toLowerCase().trim())
    // );
    // console.log("tag", filteredTags, filteredTags.length);

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
    // if (tags.includes(value)) {
    //   swal({
    //     title: "Notice",
    //     text: "Tag already added",
    //     className: "noticeAlert",
    //     icon: "/img/NoticeAlert.png",
    //     buttons: false,
    //   });
    //   return;
    // }
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

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <>
        <form>
          <div className="Category_p">
            <div className="CategorylistName">
              <h1>What Service Are You Looking For?</h1>
            </div>
          </div>

          <div className="Topallpage">
            <div
              className="ContentDiv jobaddformtop"
              onClick={removeSkillPopup}
            >
              <div className="Describe half-form-validation ">

                <div className="formjobsagencyadd">
                  <div className="job_details_content">
                    <h1 style={{ color: " #1B4EA8" }}>Job Details</h1>
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
                      className="category_name validateInput bkC1 w-100 h-47 border-radius border-1"
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
                      errors.description
                        ? "text-content addjobtopdiv  error Describe_4"
                        : "text-content addjobtopdiv  Describe_4"
                    }
                  >
                    <h4 className="Describe_Job_add add_editsectitle">
                      <label className="detail-service-add-page">
                        Describe Your Job
                      </label>

                    </h4>
                    <p className="Describejobaddedit">This could include dimensions, colors, how you plan to use it, or anything else that the content creator needs to know in order to meet your expectations.</p>
                    <textarea
                      className="w-551 border-1 border-radius h-180 Textbox-textarea mt-1 pl-2 pt-2"
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
                    <div
                      className="related-jobs-check-box"
                    // style={{ display: "flex" }}
                    >
                      <input type="checkbox" />
                      <span style={{ marginLeft: "10px" }}>
                        Is this related to a previous job?
                      </span>
                    </div>
                    <div className="countdiv">
                      <span
                        className="countdivagencydiverror"
                        style={{
                          color: "#D14F4F",
                          opacity: errors.description ? 1 : 0,
                        }}
                      >
                        {errors.description ?? "valid"}
                      </span>
                    </div>{" "}
                  </div>

                  <div
                    className={
                      errors.skills
                        ? "text-content  Skills error Experiencenew_2 skillsneeded"
                        : "text-content  Skills Experiencenew_2 skillsneeded"
                    }
                  >
                    <h4 className="neededskillnew_11">Skills Needed</h4>
                    <div className="Marketing- mt-2-">
                      <div className="skills-input-container">
                        {/* {JSON.stringify(skills)} */}
                        <Autocomplete
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
                        />
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
                  <div className="text-content ">
                    <h4 className="Company_name26">Company Name</h4>{" "}
                    <div className="styled-select">
                      <Select
                        className={
                          company === null
                            ? "selectinputcolor"
                            : "menuiteminputcolor"
                        }
                        open={isOpen5}
                        onOpen={() => {
                          setIsOpen5(true);
                        }}
                        onClose={() => {
                          setIsOpen5(false);
                        }}
                        MenuProps={menuProps}
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          setErrors({ ...errors, company: null });
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={null}>Select one option</MenuItem>
                        {companiesData?.map((item) =>
                          item.is_active ? (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                    </div>
                    <span style={{ color: "#D14F4F" }}>{errors.company}</span>
                  </div>
                  <div className="text-content">
                    <h4 className="Company_name">Industry</h4>{" "}
                    <div className="styled-select">
                      <Select
                        className={
                          industry === null
                            ? "selectinputcolor"
                            : "menuiteminputcolor"
                        }
                        open={isOpen1}
                        onOpen={() => {
                          setIsOpen1(true);
                        }}
                        onClose={() => {
                          setIsOpen1(false);
                        }}
                        MenuProps={menuProps}
                        value={industry}
                        onChange={(e) => {
                          setIndustry(e.target.value);
                          setErrors({ ...errors, industry: null });
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={null}>Select Industry</MenuItem>
                        {industriesData?.map((item) =>
                          item.is_active ? (
                            <MenuItem key={item.id} value={item.id}>
                              {item.industry_name}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                    </div>
                    <span
                      style={{
                        color: "#D14F4F",
                        opacity: errors.industry ? 1 : 0,
                      }}
                    >
                      {errors.industry ?? "valid"}
                    </span>
                  </div>

                </div>

                <hr className="line7" style={{ width: "551px" }}></hr>
                <div className="agencyjobsecnewpage">
                  <div className="formjobsagencyadd">

                    <div className="text-content">
                      <h2 className="filetitleass">
                        Files and Assets
                      </h2>
                      <h4 className="Attachment_new1">
                        Your Assets
                        <span style={{ color: "#00000052", margin: "0px 10px" }}>
                          Optional
                        </span>
                      </h4>
                      <p>
                        Only upload files and artwork that you own the copyright
                        for, or that you have permission to use and distribute for
                        commercial work.
                      </p>
                      <h4 className="Attachment_new1">Attachment</h4>
                      <input
                        multiple
                        type="file"
                        onChange={(e) => {
                          onSelectFile(e);
                          setErrors({ ...errors, jobDocuments: null });
                        }}
                        id="upload"
                        hidden
                      />

                      <label className="uploadnew" htmlFor="upload">
                        {" "}
                        <img
                          className="mr-2"
                          src={process.env.PUBLIC_URL + "/img/upload.png"}
                          alt=""
                        />
                        <p
                          className="dropfile"
                          style={{ color: "#1B4EA8;" }}>
                          <span style={{ fontWeight: 800 }}>Click to upload </span>
                          or drag and drop
                          <br />
                          <span>SVG, EPS, PNG, JPEG, GIF (max 10MB each)</span>
                        </p>
                      </label>
                      {/* <label className="uploadnew" htmlFor="upload">
                    {" "}
                    <img
                      className="mr-2"
                      src={process.env.PUBLIC_URL + "/img/upload.png"}
                      alt=""
                    />
                    Attach Files
                  </label> */}
                    </div>
                    {/* EDIT PAGE */}
                    {/* {JSON.stringify(jobDocuments)} */}
                    {/* {JSON.stringify(jobId)} */}
                    {/* {JSON.stringify(imageChanged)} */}
                    {/* {JSON.stringify(fileExtension)} */}
                    {/* {JSON.stringify(editFileExtension)} */}
                    {/* {JSON.stringify(fileNameDisplay)} */}
                    {/* {JSON.stringify(selectedFile)} */}
                    {/* {JSON.stringify(imgRef?.current)} */}
                    <div className="job-documents" id="docs">
                      {/* EDIT PAGE */}
                      {jobId ? (
                        <>
                          {imgRef &&
                            imgRef?.current?.map((item, index) => (
                              <>
                                {!editFileExtension[index]?.match(
                                  /(jpg|jpeg|png|gif)$/i
                                ) ? (
                                  item.name && (
                                    <>
                                      <div
                                        index_val={index}
                                        className="job-documents-img  f-16 document-item edit_document_item-"
                                        key={index}
                                      >
                                        <a
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) =>
                                            downloadFile(item, item.name, "add")
                                          }
                                        >
                                          <i
                                            className="fas fa-download"
                                            style={{ color: "#0a58ca" }}
                                          ></i>
                                          <img
                                            className="mr-2"
                                            src="img/file1.png"
                                            alt=""
                                            hidden
                                          />
                                          {item.name}
                                        </a>
                                        <div
                                          className="overlay"
                                          onClick={() =>
                                            removeEditDocument(index, "icon")
                                          }
                                        >
                                          <Link to="#" className="icon" title="Remove">
                                            <i className="fa-solid fa-circle-xmark"></i>
                                          </Link>
                                        </div>
                                      </div>
                                    </>
                                  )
                                ) : (
                                  <>
                                    <div
                                      index_val={index}
                                      className="job-documents-img  f-16 image-item edit_image_item-"
                                      key={index}
                                    >
                                      <a
                                        target="_blank"
                                        href={URL.createObjectURL(item)}
                                      >
                                        <img
                                          className="w-100"
                                          src={URL.createObjectURL(item)}
                                        />
                                      </a>
                                      <div
                                        className="overlay"
                                        onClick={() =>
                                          removeEditDocument(index, "image")
                                        }
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
                          {jobDocuments?.map((item, index) => (
                            <>
                              {fileExtension[index]?.match(
                                /(jpg|jpeg|png|gif)$/i
                              ) ? (
                                <>
                                  <div
                                    className="job-documents-img  f-16 document-item new-documents"
                                    key={index}
                                  >
                                    <a
                                      index_item={index}
                                      target="_blank"
                                      href={item?.job_images}
                                    >
                                      <img
                                        className=""
                                        src={item?.job_images}
                                        alt=""
                                      />
                                    </a>
                                    <div
                                      className="overlay"
                                      onClick={() => {
                                        removeDocument(index, "data");
                                        removeImageDocuments(item?.id);
                                      }}
                                    >
                                      <Link to="#" className="icon" title="Remove">
                                        <i className="fa-solid fa-circle-xmark"></i>
                                      </Link>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="job-documents-img f-16 db_documents document-item"
                                    key={index}
                                  >
                                    <a
                                      index_item={index}
                                      href={`${BACKEND_API_URL}media/job_images/${fileNameDisplay[index]}`}
                                      target="_blank"
                                      download
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i
                                        className="fas fa-download"
                                        style={{ color: "#0a58ca" }}
                                      ></i>
                                      <img
                                        className="w-100 mr-2"
                                        src="img/file1.png"
                                        alt=""
                                        hidden
                                      />
                                      {fileNameDisplay[index]}
                                    </a>
                                    <div
                                      className="overlay"
                                      onClick={() => {
                                        removeDocument(index, "data");
                                        removeImageDocuments(item?.id);
                                      }}
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
                        </>
                      ) : (
                        <>
                          {/* ADD PAGE */}
                          {imgRef &&
                            // !imageChanged &&
                            imgRef?.current?.map((item, index) => (
                              <>
                                {!fileExtension[index].match(
                                  /(jpg|jpeg|png|gif)$/i
                                ) ? (
                                  <>
                                    <div
                                      index_val={index}
                                      className="job-documents-img f-16 document-item new-documents"
                                      key={index}
                                    >
                                      <a
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) =>
                                          downloadFile(item, item.name, "add")
                                        }
                                      >
                                        <i
                                          className="fas fa-download"
                                          style={{ color: "#0a58ca" }}
                                        ></i>
                                        <img
                                          className="w-100 mr-2"
                                          src="img/file1.png"
                                          alt=""
                                          hidden
                                        />
                                        {item.name}
                                      </a>
                                      <div
                                        className="overlay"
                                        onClick={() =>
                                          removeNewDocument(index, "icon")
                                        }
                                      >
                                        <Link to="#" className="icon" title="Remove">
                                          <i className="fa-solid fa-circle-xmark"></i>
                                        </Link>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div
                                      index_val={index}
                                      className="job-documents-img f-16 image-item"
                                      key={index}
                                    >
                                      <a
                                        target="_blank"
                                        href={URL.createObjectURL(item)}
                                      >
                                        <img
                                          className="w-100"
                                          src={URL.createObjectURL(item)}
                                        />
                                      </a>
                                      <div
                                        className="overlay"
                                        onClick={() =>
                                          removeNewDocument(index, "image")
                                        }
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
                        </>
                      )}
                      {/* <span style={{ color: "#D14F4F" }}>
                      {errors.jobDocuments}
                    </span> */}
                    </div>



                    <div
                      className={
                        errors.skills
                          ? "text-content  Skills error Experiencenew_2 skillsneeded"
                          : "text-content  Skills Experiencenew_2 skillsneeded"
                      }
                    >
                      <h4 className="neededskillnew_11">Or include a URL</h4>
                      <div className="Marketing- mt-2-">
                        <div className="skills-input-container">
                          {/* {JSON.stringify(skills)} */}
                          <Autocomplete
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
                                placeholder="Enter file URL"
                              />
                            )}
                            isOptionEqualToValue={(option, value) =>
                              value === undefined ||
                              value === "" ||
                              option.id === value.id
                            }
                          />
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
                      <a style={{ fontWeight: 500 }} href="#">
                        +Add More
                      </a>
                    </div>


                    <div className="text-content">
                      <h4 className="Attachment_new1">
                        Samples of Work You Like
                        <span style={{ color: "#00000052", margin: "0px 10px" }}>
                          Optional
                        </span>
                      </h4>
                      <p>
                        This is to help the content creator understand the type of
                        work you like. This doesn’t need to be work that you own the
                        copyright for, but Adifect will only store it for 30 days
                        after the completion of this job and will not use it for any
                        other purposes.
                      </p>
                      <input
                        multiple
                        type="file"
                        onChange={(e) => {
                          onSelectFile(e);
                          setErrors({ ...errors, jobDocuments: null });
                        }}
                        id="upload"
                        hidden
                      />
                      <label className="uploadnew" htmlFor="upload">
                        {" "}
                        <img
                          className="mr-2"
                          src={process.env.PUBLIC_URL + "/img/upload.png"}
                          alt=""
                        />
                        <p className="dropfile" style={{ color: "#1B4EA8;" }}>
                          <span style={{ fontWeight: 800 }}>Click to upload </span>
                          or drag and drop
                          <br />
                          <span>SVG, EPS, PNG, JPEG, GIF (max 5MB each)</span>
                        </p>
                      </label>
                    </div>

                    <div
                      style={{
                        marginTop: "25px",
                      }}
                      className={
                        errors.skills
                          ? "text-content  Skills error Experiencenew_2 skillsneeded"
                          : "text-content  Skills Experiencenew_2 skillsneeded"
                      }
                    >
                      <h4 className="neededskillnew_11">Or include a URL</h4>
                      <div className="Marketing- mt-2-">
                        <div className="skills-input-container">
                          {/* {JSON.stringify(skills)} */}
                          <Autocomplete
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
                                placeholder="Enter file URL"
                              />
                            )}
                            isOptionEqualToValue={(option, value) =>
                              value === undefined ||
                              value === "" ||
                              option.id === value.id
                            }
                          />
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
                      <a style={{ fontWeight: 500 }} href="#">
                        +Add More
                      </a>
                    </div>
                  </div>
                </div>
                <hr className="line10" style={{ width: "551px" }}></hr>
                <div className="formjobsagencyadd">

                  <div
                    className={
                      errors.price
                        ? "text-content   error"
                        : "text-content "
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

                    <h4 className="Attachment_Price_new">OJob Pricing Type</h4>
                    <div
                      className="job_pricing-type"
                      style={{ margin: "16px 0px 0px 0px" }}
                    >
                      <div className="double_toogle_button">
                        <ToggleButtonGroup
                          className="fixed_toogle_button"
                          color="info"
                          // value={alignment}
                          // exclusive
                          // onChange={handleChange}
                          aria-label="Platform"
                        >
                          <ToggleButton value="web">Fixed</ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup
                          className="hourly_toogle_button"
                          color="info"
                          // value={alignment}
                          // exclusive
                          // onChange={handleChange}
                          aria-label="Platform"
                        >
                          <ToggleButton value="ios">Hourly</ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                      {/* <button className="fixed_button">Fixed</button>
                      <button className="Hourly_button">Hourly</button> */}
                    </div>
                  </div>

                  <div
                    className={
                      errors.price
                        ? "text-content   error"
                        : "text-content "
                    }
                  >
                    <h4 className="Attachment_Price_new_4">Offer Price</h4>
                    <div className="pricename">
                      <input
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
                      <span className="pricetag">$</span>
                    </div>
                    <div className="pricevalidR">
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


                  <div
                    className={
                      errors.deliveryDate
                        ? "text-content DeliveryDate  error"
                        : "text-content DeliveryDate "
                    }
                  >
                    <h4 className="Attachmentnew dateclassnew">
                      Expected Delivery Date
                    </h4>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <label>
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
                            setErrors({ ...errors, deliveryDate: null });
                          }}
                          renderInput={(params) => (
                            <TextField variant="standard" {...params} />
                          )}
                        />
                      </label>
                    </LocalizationProvider>
                    <div className="deliveryDateerror">
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


                  <div className="text-content">
                    <h4 className="jobty_newdiv">Job Type</h4>{" "}
                    <div
                      // className={
                      //   errors.level
                      //     ? "text-content error Experiencenew"
                      //     : "text-content  Experiencenew"
                      // }
                      className={
                        errors.job_type
                          ? "styled-select jobTypeError error"
                          : "styled-select jobTypeError"
                      }
                    >
                      <Select
                        className={
                          job_type === null
                            ? "selectinputcolor"
                            : "menuiteminputcolor"
                        }
                        open={isOpen3}
                        onOpen={() => {
                          setIsOpen3(true);
                        }}
                        onClose={() => {
                          setIsOpen3(false);
                        }}
                        MenuProps={menuProps}
                        value={job_type}
                        onChange={(e) => {
                          setJobType(e.target.value);
                          setErrors({ ...errors, job_type: null });
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={null}>Select Job Type</MenuItem>
                        <MenuItem value="0">Fixed</MenuItem>
                        <MenuItem value="1">Hourly</MenuItem>
                      </Select>
                    </div>
                    <div className="jobTypeerrordiv44">
                      <span
                        className="jobTypeerror"
                        style={{
                          color: "#D14F4F",
                          opacity: errors.job_type ? 1 : 0,
                        }}
                      >
                        {errors.job_type ?? "valid"}
                      </span>
                    </div>
                  </div>

                  <div className="text-content Skills">
                    <h4 className="Related_new">Related Jobs (if applicable)</h4>
                    <div className="Marketing- mt-2-">
                      <div className="skills-input-container">
                        <Autocomplete
                          multiple
                          disabled={!title || !relatedJobsList}
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
                              placeholder="Options based on title"
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

                  {/* <div className="text-content mt-3">
                    <h4 className="Choose">Category</h4>{" "}
                    <div className="styled-select">
                      <Select
                      className={
                      category === "null"
                      ? "selectinputcolor"
                      : "menuiteminputcolor"
                      }
                        open={isOpen}
                        onOpen={() => {
                          setIsOpen(true);
                        }}
                        onClose={() => {
                          setIsOpen(false);
                        }}
                        MenuProps={menuProps}
                        value={category}
                        id="category"
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setErrors({ ...errors, category: null });
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value=""> Select Category </MenuItem>
                        {categories?.map((item) =>
                          item.is_active ? (
                            <MenuItem key={item.id} value={item.id}>
                              {item.category_name}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                    </div>
                    <span style={{ color: "#D14F4F" }}>{errors.category}</span>
                  </div> */}




                  {/* <hr className="jobaddedit" /> */}





                  {/* <hr className="jobaddedit" /> */}

                  <div
                    className={
                      errors.level
                        ? "text-content error Experiencenew"
                        : "text-content  Experiencenew"
                    }
                  >
                    <h4 className="jobty_newdivLevel">Experience Level</h4>{" "}
                    <div className="styled-select">
                      <Select
                        className={
                          level === "null"
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
                        value={level}
                        onChange={(e) => {
                          setLevel(e.target.value);
                          setErrors({ ...errors, level: null });
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={null}>Select Level</MenuItem>
                        {levelsData?.map((item) =>
                          item.is_active ? (
                            <MenuItem key={item.id} value={item.id}>
                              {item.level_name}
                            </MenuItem>
                          ) : null
                        )}
                      </Select>
                      <div className="diverrors44">
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

                  <div className="text-content mt-4">
                    <div className="SubmitCancelBTN">

                      <div className="Job-Bott-Btn-Cancel-AgencyBtn">
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
                          onClick={validateSubmit}
                          className="primary Small border-radius"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
      {/* )} */}
    </>
  );
}
