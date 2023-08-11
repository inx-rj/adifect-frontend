import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MDBDataTable } from "mdbreact";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BACKEND_API_URL, Frontend_URL } from "../../../environment";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import LoadingSpinner from "../../../containers/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { defaultPageLoader } from "../../../redux/actions/other-actions";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import {
  getUserDetails,
  updateProfile,
  getUserPortfolio,
  MemberApproverJobsInProgressAction,
  MemberMarketerJobsInProgressAction,
  getCreatorProfileJobsInProgressAction,
} from "../../../redux/actions/auth-actions";
import {
  USER_UPDATE_PROFILE_RESET,
  USER_PORTFOLIO_RESET,
} from "../../../constants/auth-constants";
import Cropper from "react-easy-crop";
import swal from "sweetalert";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { validations } from "../../../utils";
import { LinkContainer } from "react-router-bootstrap";
import {
  listAllJobs,
  listAgencyJobs,
} from "../../../redux/actions/job-actions";
import { JOB_DETAILS_RESET } from "../../../constants/job-constants";
import $ from "jquery";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  // listAll,
  deleteSkillset,
  getUserSkillsetDetails,
  getSkillsetDetails,
  skillsetAdd,
  skillsetEditAction,
} from "../../../redux/actions/skillset-actions";
import { listAllSkills } from "../../../redux/actions/skill-actions";
import { SKILL_SET_DETAILS_RESET } from "../../../constants/skillset-constants";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { skill_name } from "../../../utils/validations";
import ReactPlayer from "react-player";
import { toUnitless } from "@mui/material/styles/cssUtils";
import { deleteSkill } from "../../../redux/actions/skill-actions";
import { listAllCategories } from "../../../redux/actions/category-actions";
import { listAllLevels } from "../../../redux/actions/level-actions";
import { listAllCompanies } from "../../../redux/actions/Workflow-company-action";
import { listAllIndustries } from "../../../redux/actions/industry-actions";
import Member_profile_account_setting from "./Member-profile-account-setting";
import Member_profile_feedback from "./Member-profile-feedback";
import Member_Profile_Communication from "./Member-Profile-Communication";
import { getAgencyProfileJobsInProgressAction } from "../../../redux/actions/agency-profile-account";

const Member_profile = () => {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [profile_img, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [doCrop, setDoCrop] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [currentCroppedImage, setCurrentCroppedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [profile_status, setProfileStatus] = useState("1");
  const [updateButtonClick, setUpdateButtonClick] = useState(false);
  const [profile_description, setProfileDescription] = useState();
  const [profile_title, setProfileTitle] = useState([]);
  const [communication, setCommunication] = useState("");
  const [portfolioChanged, setPortfolioChanged] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState([]);
  const [removePortfolio, setRemovePortfolio] = useState([]);
  const [videoChanged, setVideoChanged] = useState(false);
  const [profileVideo, setProfileVideo] = useState("");
  const [removeVideo, setRemoveVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState();
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [modeOfComm, setModeOfComm] = useState("0");
  const [portfolio, setPortfolio] = useState([]);
  const [pages, setPages] = useState();
  const [openSkillset, setOpenSkillset] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [skillset, setSkillset] = useState([]);
  const [rating, setRating] = useState("");
  const [skillseterrors, setskillsetErrors] = useState({
    skillset: null,
    rating: null,
  });
  const [ratingEdit, setRatingEdit] = useState("");
  const [skillsetEditName, setSkillsetEditName] = useState();
  const [editSkillset, setEditSkillset] = useState(false);
  const [editSkillsetId, setEditSkillsetId] = useState();
  const [skills, setSkills] = useState([]);
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const [addedSkill, setAddedSkill] = useState(false);

  const { userData } = useSelector((state) => state.authReducer);
  const { successUpdate } = useSelector((state) => state.UpdateProfileReducer);
  const { skillsData } = useSelector((state) => state.skillReducer);
  const { skillsetDetails, success: successSkillsetDetails } = useSelector(
    (state) => state.skillsetDetailsReducer
  );

  const { memberApproverJobs } = useSelector(
    (state) => state.memberApproverJobsInProgressReducer
  );

  const { getCreatorProfileJobs } = useSelector(
    (state) => state.getCreatorProfileJobsInProgressReducer
  );

  const { getProfileJobs } = useSelector(
    (state) => state.getAgencyProfileJobsInProgressReducer
  );

  useEffect(() => {
    if (userData?.user?.user_level === 1 || userData?.user?.user_level === 2) {
      dispatch(getAgencyProfileJobsInProgressAction());
    }
    if (userData?.user?.user_level === 3) {
      dispatch(MemberApproverJobsInProgressAction());
    }
    if (userData?.user?.user_level === 4) {
      dispatch(getCreatorProfileJobsInProgressAction());
    }
  }, []);

  const { success: successAddSkillset } = useSelector(
    (state) => state.skillsetAddReducer
  );
  const { success: successDeleteSkillset } = useSelector(
    (state) => state.skillsetDeleteReducer
  );
  const { userskillsetDetails, success: successUserSkillsetDetails } =
    useSelector((state) => state.userskillsetDetailsReducer);

  // console.log("skills", userskillsetDetails);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleClickOpen5 = () => {
    setOpen5(true);
  };

  const handleClose5 = () => {
    setOpen5(false);
  };

  const handleClickOpen6 = () => {
    setOpen6(true);
  };

  const handleClose6 = () => {
    setOpen6(false);
    setSkillset(userskillsetDetails);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goToPrevPage = (prevpage) => {
    setCurrentPage(prevpage);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", prevpage);
    navigate(`/profile?${urlParams}`);
  };

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  const {
    // jobData,
    agencyJobData,
    count,
    loading: jobLoading,
  } = useSelector((state) => state.agencyJobReducer);

  const goToNextPage = (nextpage) => {
    setCurrentPage(nextpage);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", nextpage);
    navigate(`/profile?${urlParams}`);
  };

  const { success } = useSelector((state) => state.jobDeleteReducer);
  const {
    portfolioDetails,
    count: portFolioCount,
    success: portfolioSuccess,
  } = useSelector((state) => state.userPortfolioReducer);

  useEffect(() => {
    if (portfolioDetails) {
      let numberPages = Math.ceil(portFolioCount / 4);
      setPages(numberPages);
    }
  }, [portfolioDetails]);

  useEffect(() => {
    if (userskillsetDetails) {
      let skillArr = [];
      for (let index = 0; index < userskillsetDetails.length; index++) {
        skillArr.push(userskillsetDetails[index].skills);
      }
      let newArr = [];
      for (let i = 0; i < skillArr.length; i++) {
        newArr.push(skillsData.find((skill) => skill.id === skillArr[i]));
      }
      setSkillset(newArr);
    }
  }, [userskillsetDetails]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  const [errors, setErrors] = useState({
    firstname: null,
    lastname: null,
    skills: null,
    profile_title: null,
  });

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  }

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      // username: validations.username(username),
      firstname: validations.firstName(firstname),
      lastname: validations.lastName(lastname),
      // profile_title: validations.title(profile_title),
      // password: validations.password(password),
      // confirmPassword: validations.confirmPassword(password, confirm_password),
      // role: validations.role(role),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler(e);
  };

  const submitHandler = async (e) => {
    // alert("passed");
    const formData = new FormData();

    // console.log("communication", communication);
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("profile_description", profile_description);
    formData.append("profile_title", profile_title);
    formData.append("profile_status", profile_status);
    formData.append("preferred_communication_mode", modeOfComm);
    formData.append("preferred_communication_id", communication);

    //console.log("selectedPortfolio---____", selectedPortfolio);
    if (portfolioChanged) {
      for (const key of Object.keys(selectedPortfolio)) {
        formData.append("portfolio", selectedPortfolio[key]);
      }
    }
    //console.log("removePortfolio---____", removePortfolio);
    if (removePortfolio) {
      for (const key of Object.keys(removePortfolio)) {
        formData.append("remove_portfolio", removePortfolio[key]);
      }
    }

    if (imageChanged) {
      if (doCrop) {
        formData.append("profile_img", profile_img, "profileImg.jpeg");
      } else {
        formData.append("profile_img", profile_img, "profileImg.jpeg");
      }
    }

    if (removeProfileImage) {
      if (doCrop) {
        formData.append("profile_img", profile_img, "profileImg.jpeg");
      } else if (imageChanged) {
        formData.append("profile_img", profile_img, "profileImg.jpeg");
      } else {
        formData.append("remove_image", 1);
      }
    }

    if (videoChanged) {
      formData.append("video", profileVideo);
    }

    if (removeVideo) {
      if (videoChanged) {
        formData.append("video", profileVideo);
      } else {
        formData.append("remove_video", 1);
      }
    }

    for (var i = 0; i < skills.length; i++) {
      formData.append("skills", skills[i].id ? skills[i].id : skills[i]);
    }
    // formData.append("availability", availability);
    // formData.append("languages", languages);

    dispatch(updateProfile(formData));
    setSelectedVideo();
    setRemoveVideo(false);
    setShowMoreDesc(false);
    setRemoveProfileImage(false);
    setImageChanged(false);
    setVideoChanged(false);
    setPortfolioChanged(false);
    setDoCrop(false);
    setSaveLoading(true);
    handleSaveSkillSet();
    setSelectedPortfolio([]);
  };

  const maxImageFileSize = 2097152;
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }

  const removeDatabaseImage = () => {
    setRemoveProfileImage(true);
  };

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    // CHECK FILE TYPE
    if (!file.type.match(imageMimeType)) {
      swal({
        title: "",
        text: "Image type is not valid",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      return;
    }
    // MAX FILE SIZE == 2mb
    if (file?.size > maxImageFileSize) {
      swal({
        title: "",
        text: "Max file size allowed is 2mb",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      return;
    }
    if (e.target.files[0]) {
      setImageChanged(true);
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
      setCurrentCroppedImage(URL.createObjectURL(e.target.files[0]));
      setProfileImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        currentCroppedImage,
        croppedAreaPixels,
        rotation
      );
      // console.log("donee", croppedImage);
      setCroppedImage(URL.createObjectURL(croppedImage));
      // setCroppedImage(croppedImage);
      setImageChanged(true);
      setProfileImage(croppedImage);
      setSelectedFile(URL.createObjectURL(croppedImage));
      setDoCrop(false);
    } catch (e) {
      // console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        resolve(file);
      }, "image/jpeg");
    });
  }

  const removeSelectedImage = () => {
    setSelectedFile();
    setProfileImage(user?.profile_img);
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const { loading } = useSelector((state) => state.loaderReducer);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const imageOne = (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99998 7.8335C7.82317 7.8335 7.6536 7.90373 7.52858 8.02876C7.40355 8.15378 7.33332 8.32335 7.33332 8.50016V11.1668C7.33332 11.3436 7.40355 11.5132 7.52858 11.6382C7.6536 11.7633 7.82317 11.8335 7.99998 11.8335C8.17679 11.8335 8.34636 11.7633 8.47139 11.6382C8.59641 11.5132 8.66665 11.3436 8.66665 11.1668V8.50016C8.66665 8.32335 8.59641 8.15378 8.47139 8.02876C8.34636 7.90373 8.17679 7.8335 7.99998 7.8335ZM8.25332 5.22016C8.09101 5.15348 7.90896 5.15348 7.74665 5.22016C7.66482 5.25189 7.59005 5.29947 7.52665 5.36016C7.46776 5.42496 7.42041 5.49937 7.38665 5.58016C7.34933 5.65928 7.33106 5.74605 7.33332 5.8335C7.33281 5.92123 7.34963 6.00821 7.3828 6.08943C7.41598 6.17066 7.46486 6.24454 7.52665 6.30683C7.59145 6.36572 7.66586 6.41307 7.74665 6.44683C7.84765 6.48832 7.95729 6.50437 8.06595 6.49357C8.1746 6.48277 8.27894 6.44544 8.36979 6.38488C8.46064 6.32431 8.53523 6.24235 8.58699 6.14621C8.63875 6.05007 8.66611 5.94268 8.66665 5.8335C8.66419 5.65698 8.59514 5.48792 8.47332 5.36016C8.40991 5.29947 8.33515 5.25189 8.25332 5.22016ZM7.99998 1.8335C6.68144 1.8335 5.39251 2.22449 4.29618 2.95703C3.19985 3.68957 2.34537 4.73077 1.84079 5.94894C1.3362 7.16711 1.20418 8.50756 1.46141 9.80076C1.71865 11.094 2.35359 12.2819 3.28594 13.2142C4.21829 14.1466 5.40617 14.7815 6.69938 15.0387C7.99259 15.296 9.33303 15.1639 10.5512 14.6594C11.7694 14.1548 12.8106 13.3003 13.5431 12.204C14.2757 11.1076 14.6666 9.81871 14.6666 8.50016C14.6666 7.62468 14.4942 6.75778 14.1592 5.94894C13.8241 5.1401 13.3331 4.40517 12.714 3.78612C12.095 3.16706 11.36 2.676 10.5512 2.34097C9.74237 2.00593 8.87546 1.8335 7.99998 1.8335V1.8335ZM7.99998 13.8335C6.94515 13.8335 5.914 13.5207 5.03694 12.9347C4.15988 12.3486 3.47629 11.5157 3.07263 10.5411C2.66896 9.5666 2.56334 8.49425 2.76913 7.45968C2.97492 6.42512 3.48287 5.47481 4.22875 4.72893C4.97463 3.98305 5.92494 3.4751 6.9595 3.26931C7.99407 3.06352 9.06642 3.16914 10.041 3.57281C11.0155 3.97647 11.8485 4.66006 12.4345 5.53712C13.0205 6.41418 13.3333 7.44533 13.3333 8.50016C13.3333 9.91465 12.7714 11.2712 11.7712 12.2714C10.771 13.2716 9.41447 13.8335 7.99998 13.8335V13.8335Z"
        fill="#71757B"
      />
    </svg>
  );
  const imageTwo = (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6667 6.94676C14.6246 6.82482 14.548 6.71772 14.4462 6.63843C14.3445 6.55915 14.2219 6.51109 14.0933 6.5001L10.3 5.94676L8.60001 2.5001C8.54542 2.38738 8.46018 2.29232 8.35406 2.22581C8.24795 2.1593 8.12524 2.12402 8.00001 2.12402C7.87477 2.12402 7.75206 2.1593 7.64595 2.22581C7.53983 2.29232 7.4546 2.38738 7.40001 2.5001L5.70001 5.9401L1.90667 6.5001C1.78329 6.51763 1.66729 6.56941 1.57184 6.64954C1.47639 6.72967 1.40531 6.83495 1.36667 6.95343C1.3313 7.06921 1.32813 7.19244 1.35749 7.30989C1.38685 7.42734 1.44764 7.53458 1.53334 7.6201L4.28667 10.2868L3.62001 14.0734C3.59621 14.1984 3.60867 14.3276 3.65592 14.4457C3.70317 14.5639 3.78324 14.666 3.88667 14.7401C3.98748 14.8122 4.10639 14.8547 4.23004 14.863C4.35369 14.8712 4.47719 14.8448 4.58667 14.7868L8.00001 13.0068L11.4 14.7934C11.4936 14.8462 11.5992 14.8738 11.7067 14.8734C11.8479 14.8739 11.9856 14.8296 12.1 14.7468C12.2034 14.6727 12.2835 14.5705 12.3308 14.4524C12.378 14.3343 12.3905 14.2051 12.3667 14.0801L11.7 10.2934L14.4533 7.62676C14.5496 7.54522 14.6207 7.43803 14.6585 7.31766C14.6963 7.19729 14.6991 7.06868 14.6667 6.94676ZM10.5667 9.61343C10.4885 9.68905 10.43 9.78266 10.3963 9.88608C10.3626 9.9895 10.3547 10.0996 10.3733 10.2068L10.8533 13.0001L8.34667 11.6668C8.25022 11.6154 8.14262 11.5885 8.03334 11.5885C7.92406 11.5885 7.81646 11.6154 7.72001 11.6668L5.21334 13.0001L5.69334 10.2068C5.71196 10.0996 5.70408 9.9895 5.67038 9.88608C5.63668 9.78266 5.57819 9.68905 5.50001 9.61343L3.50001 7.61343L6.30667 7.20676C6.41467 7.19174 6.51734 7.15046 6.60567 7.08653C6.69401 7.02261 6.76531 6.93799 6.81334 6.8401L8.00001 4.3001L9.25334 6.84676C9.30137 6.94466 9.37267 7.02927 9.46101 7.0932C9.54934 7.15712 9.65201 7.19841 9.76001 7.21343L12.5667 7.6201L10.5667 9.61343Z"
        fill="#71757B"
      />
    </svg>
  );
  const imageThree = (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2667 8.94009C13.1598 8.81843 13.1008 8.66203 13.1008 8.50009C13.1008 8.33815 13.1598 8.18175 13.2667 8.06009L14.12 7.10009C14.214 6.9952 14.2724 6.86323 14.2868 6.7231C14.3012 6.58297 14.2708 6.44188 14.2 6.32009L12.8667 4.01343C12.7966 3.89177 12.6899 3.79534 12.5618 3.73788C12.4337 3.68042 12.2908 3.66486 12.1533 3.69343L10.9 3.94676C10.7405 3.97971 10.5745 3.95315 10.4333 3.87209C10.292 3.79103 10.1853 3.66108 10.1333 3.50676L9.72667 2.28676C9.68194 2.15435 9.59674 2.03934 9.48309 1.95799C9.36944 1.87664 9.2331 1.83307 9.09334 1.83343H6.42667C6.28129 1.82584 6.13742 1.86604 6.01705 1.9479C5.89667 2.02976 5.80639 2.14877 5.76 2.28676L5.38667 3.50676C5.33467 3.66108 5.22798 3.79103 5.08674 3.87209C4.9455 3.95315 4.77948 3.97971 4.62 3.94676L3.33334 3.69343C3.20304 3.67501 3.0702 3.69557 2.95157 3.75252C2.83293 3.80946 2.7338 3.90024 2.66667 4.01343L1.33334 6.32009C1.26078 6.44053 1.22815 6.58082 1.24012 6.72091C1.2521 6.861 1.30806 6.99372 1.4 7.10009L2.24667 8.06009C2.35355 8.18175 2.41249 8.33815 2.41249 8.50009C2.41249 8.66203 2.35355 8.81843 2.24667 8.94009L1.4 9.90009C1.30806 10.0065 1.2521 10.1392 1.24012 10.2793C1.22815 10.4194 1.26078 10.5597 1.33334 10.6801L2.66667 12.9868C2.73673 13.1084 2.84341 13.2048 2.9715 13.2623C3.09959 13.3198 3.24255 13.3353 3.38 13.3068L4.63333 13.0534C4.79281 13.0205 4.95884 13.047 5.10008 13.1281C5.24132 13.2092 5.348 13.3391 5.4 13.4934L5.80667 14.7134C5.85305 14.8514 5.94333 14.9704 6.06371 15.0523C6.18409 15.1341 6.32796 15.1743 6.47333 15.1668H9.14C9.27976 15.1671 9.41611 15.1235 9.52975 15.0422C9.6434 14.9608 9.72861 14.8458 9.77333 14.7134L10.18 13.4934C10.232 13.3391 10.3387 13.2092 10.4799 13.1281C10.6212 13.047 10.7872 13.0205 10.9467 13.0534L12.2 13.3068C12.3375 13.3353 12.4804 13.3198 12.6085 13.2623C12.7366 13.2048 12.8433 13.1084 12.9133 12.9868L14.2467 10.6801C14.3175 10.5583 14.3478 10.4172 14.3335 10.2771C14.3191 10.137 14.2607 10.005 14.1667 9.90009L13.2667 8.94009ZM12.2733 9.83343L12.8067 10.4334L11.9533 11.9134L11.1667 11.7534C10.6865 11.6553 10.187 11.7368 9.76306 11.9826C9.33908 12.2284 9.0201 12.6213 8.86667 13.0868L8.61333 13.8334H6.90667L6.66667 13.0734C6.51324 12.608 6.19426 12.2151 5.77027 11.9693C5.34629 11.7235 4.84682 11.6419 4.36667 11.7401L3.58 11.9001L2.71334 10.4268L3.24667 9.82676C3.57464 9.46008 3.75596 8.98538 3.75596 8.49343C3.75596 8.00147 3.57464 7.52677 3.24667 7.16009L2.71334 6.56009L3.56667 5.09343L4.35334 5.25343C4.83348 5.35157 5.33295 5.27001 5.75694 5.02422C6.18092 4.77844 6.4999 4.38553 6.65333 3.92009L6.90667 3.16676H8.61333L8.86667 3.92676C9.0201 4.3922 9.33908 4.7851 9.76306 5.03089C10.187 5.27668 10.6865 5.35824 11.1667 5.26009L11.9533 5.10009L12.8067 6.58009L12.2733 7.18009C11.949 7.54593 11.77 8.01788 11.77 8.50676C11.77 8.99564 11.949 9.46759 12.2733 9.83343ZM7.76 5.83343C7.23258 5.83343 6.71701 5.98982 6.27848 6.28284C5.83995 6.57586 5.49816 6.99233 5.29632 7.4796C5.09449 7.96687 5.04168 8.50305 5.14457 9.02033C5.24747 9.53762 5.50144 10.0128 5.87438 10.3857C6.24732 10.7587 6.72248 11.0126 7.23976 11.1155C7.75704 11.2184 8.29322 11.1656 8.78049 10.9638C9.26776 10.7619 9.68424 10.4201 9.97725 9.98161C10.2703 9.54308 10.4267 9.02751 10.4267 8.50009C10.4267 7.79285 10.1457 7.11457 9.64562 6.61447C9.14552 6.11438 8.46725 5.83343 7.76 5.83343ZM7.76 9.83343C7.49629 9.83343 7.23851 9.75523 7.01924 9.60872C6.79998 9.46221 6.62908 9.25397 6.52816 9.01034C6.42725 8.7667 6.40084 8.49861 6.45229 8.23997C6.50374 7.98133 6.63072 7.74375 6.81719 7.55728C7.00366 7.37081 7.24124 7.24383 7.49988 7.19238C7.75852 7.14093 8.02661 7.16734 8.27025 7.26825C8.51388 7.36917 8.72212 7.54007 8.86863 7.75933C9.01514 7.9786 9.09334 8.23638 9.09334 8.50009C9.09334 8.85371 8.95286 9.19285 8.70281 9.4429C8.45276 9.69295 8.11362 9.83343 7.76 9.83343Z"
        fill="#71757B"
      />
    </svg>
  );

  const {
    user,
    successDetails,
    loading: userDetailsLoading,
  } = useSelector((state) => state.userDetailsReducer);
  //PORTFOLIO JS START

  const handlePortfolio = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      if (!e.target.files[i].type.match(imageMimeType)) {
        swal({
          title: "",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 5000,
        });

        return;
      }
      if (e.target.files[i].size > maxImageFileSize) {
        swal({
          title: "",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 5000,
        });
        return;
      }
    }

    if (e.target.files.length > 10) {
      swal({
        title: "",
        text: "You can upload a maximum of 10 images",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      return;
    }

    setPortfolioChanged(true);
    var previewImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // previewImages.push(URL.createObjectURL(e.target.files[i]));
      setSelectedPortfolio((prevState) => [...prevState, e.target.files[i]]);
      // setPortfolio((prevState) => [...prevState, e.target.files[i]]);
    }
  };

  function removePortfolioImageByID(portfolio_id) {
    setRemovePortfolio([...removePortfolio, portfolio_id]);
  }

  const removePortfolioImage = (e, v) => {
    // console.log("e -- ", e, "  v -- ", v);
    if (v === "data") {
      setPortfolio(portfolio.filter((el, i) => i !== e));
      return;
    }
    if (v === "new") {
      setSelectedPortfolio(selectedPortfolio.filter((el, i) => i !== e));
      return;
    }
    // setPortfolio(portfolio.filter((el, i) => i !== e));
    // setSelectedPortfolio(selectedPortfolio.filter((el, i) => i !== e));
    // return;
  };
  const portfolio_items = [];
  if (user?.portfolio) {
    user?.portfolio.map((p_row, e) =>
      portfolio_items.push({ image: p_row.portfolio_images })
    );
  }

  const handleSaveSkillSet = (evt) => {
    let skillsForPost = [];

    for (let index = 0; index < skillset.length; index++) {
      skillsForPost.push(skillset[index].id);
    }

    dispatch(
      skillsetAdd({ skills: skillsForPost, user: userData?.user?.user_id })
    );
    setSaveLoading(true);
    setOpenSkillset(false);
    handleClose6();
  };

  useEffect(() => {
    dispatch({ type: USER_PORTFOLIO_RESET });
    dispatch(getUserPortfolio(userData?.user?.user_id, currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (skillsetDetails) {
      setRatingEdit(skillsetDetails.skill_rating);
      setSkillsetEditName(skillsetDetails.skills);
    }
  }, [successSkillsetDetails]);

  useEffect(() => {
    dispatch(getUserSkillsetDetails(userData?.user?.user_id));
  }, [successAddSkillset, saveLoading, successDeleteSkillset]);

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

  const changeHandler = (e, v) => {
    setSkillset(v);
  };

  const showmoreDescription = () => {
    setShowMoreDesc(!showMoreDesc);
  };
  const handleClose3 = () => {
    // Video, title and description
    setOpen3(false);
    setProfileTitle(user?.profile_title);
    setProfileDescription(user?.profile_description);
    setPortfolio(user?.portfolio);
    setProfileVideo(user?.video);
    setSelectedVideo();
  };
  useEffect(() => {
    if (successUpdate || saveLoading) {
      // setSaveLoading(true);

      setTimeout(() => {
        setSaveLoading(false);
        setOpen4(false);
        swal({
          title: "Successfully Complete",
          text: "Profile successfully updated",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 5000,
        });
      }, 2500);
    }

    if (
      !user ||
      !user.first_name ||
      successUpdate ||
      userData.user.user_id !== user.id
    ) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails());
    } else {
      setUsername(user.username);
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setProfileImage(user.profile_img);
      setCurrentCroppedImage(user.profile_img);
      setProfileTitle(user.profile_title);
      setProfileDescription(user.profile_description);
      setProfileVideo(user.video);
      setPortfolio(user?.Portfolio_user);
      setProfileStatus(user.profile_status);
      setModeOfComm(user.preferred_communication_mode);
      setCommunication(user.preferred_communication_id);
    }
  }, [dispatch, userData, user, successDetails, successUpdate, saveLoading]);

  useEffect(() => {
    dispatch(listAllSkills());
  }, [addedSkill]);

  // ABOUT ME JS END

  return (
    <>
      {loading || saveLoading ? (
        <>
          <div className="profilePrivateViewmainDiv-profile-loader">
            <LoadingSpinner />
          </div>
        </>
      ) : (
        <>
          <div className="profilePrivateViewmainDiv">
            <div className="profilePrivateHead">
              <h3>Profile</h3>
            </div>

            <div className="privateProfileTonnyillis">
              <div className="inlineprivateProfileContent">
                <div className="privateProfileContent">
                  <div className="PhotoprofileDiv">
                    {user?.profile_img ? (
                      <div className="userprofileimg">
                        <img
                          src={user?.profile_img}
                          className="circle-profileImg"
                        />
                      </div>
                    ) : (
                      <div className="userprofileimg">
                        <img
                          src="/img/avataruser.png"
                          className="circle-profileImg"
                        />
                      </div>
                    )}
                  </div>
                  <div className="privateProfileName">
                    <div className="tonynameAnsStartpoint">
                      <h3>
                        {user?.first_name} {user?.last_name}
                      </h3>
                      {showIcon && (
                        <div className="editIconShowOrHideD">
                          {" "}
                          <img
                            onClick={handleClickOpen4}
                            src="/img/editicon.png"
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                    <Dialog
                      className="profileImgDialog profileImgDialogNewProWidth"
                      open={open4}
                      onClose={handleClose4}
                    >
                      <DialogTitle className="profileImgHeading">
                        Profile Information{" "}
                        <span onClick={handleClose4}>
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </DialogTitle>
                      <div className="dialogcontent_and_actions">
                        <DialogContent className="image_and_names">
                          {selectedFile ? (
                            <>
                              <img
                                src={selectedFile}
                                alt="Thumb"
                                hidden={doCrop}
                                className="profileimgchange"
                              />
                              <img
                                className="editicon profilepic-dialog-button "
                                src="/img/delet.png"
                                hidden={doCrop}
                                alt=""
                                onClick={removeSelectedImage}
                              />
                              <div className="Cropbtn">
                                <button
                                  className="Cropbtnnew"
                                  type="button"
                                  onClick={(e) => setDoCrop(true)}
                                >
                                  Crop Image
                                </button>
                                {doCrop && (
                                  <>
                                    <div className="App-profile-image">
                                      <div className="crop-container-profile-image">
                                        <Cropper
                                          image={currentCroppedImage}
                                          crop={crop}
                                          zoom={zoom}
                                          aspect={4 / 3}
                                          onCropChange={setCrop}
                                          onCropComplete={onCropComplete}
                                          onZoomChange={setZoom}
                                        />
                                      </div>
                                      <div className="controls-profile-image">
                                        <label> Zoom </label>
                                        <input
                                          type="range"
                                          value={zoom}
                                          min={1}
                                          max={3}
                                          step={0.1}
                                          aria-labelledby="Zoom"
                                          onChange={(e) => {
                                            setZoom(e.target.value);
                                          }}
                                          className="zoom-range-profile-image"
                                        />
                                        <Button
                                          onClick={showCroppedImage}
                                          variant="contained"
                                          color="primary"
                                        >
                                          Save
                                        </Button>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        setDoCrop(false);
                                        setSelectedFile();
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}
                              </div>
                            </>
                          ) : user?.profile_img ? (
                            <>
                              {!removeProfileImage && (
                                <>
                                  <img
                                    value={user?.profile_img}
                                    src={user?.profile_img}
                                    alt="ProfileImgCurrent"
                                    id="ProfileImgCurrent"
                                    className="profileimgchange"
                                  />
                                  <label
                                    className="upload-profileImg"
                                    htmlFor="upload"
                                  ></label>
                                  <img
                                    className="profilepic-dialog-delPopup"
                                    src="/img/delet.png"
                                    alt=""
                                    onClick={removeDatabaseImage}
                                  />
                                  <div>
                                    <button
                                      type="button"
                                      onClick={(e) => setDoCrop(true)}
                                    >
                                      Crop Image
                                    </button>
                                    {doCrop && (
                                      <>
                                        <div className="App-profile-image">
                                          <div className="crop-container-profile-image">
                                            <Cropper
                                              image={currentCroppedImage}
                                              crop={crop}
                                              zoom={zoom}
                                              aspect={4 / 3}
                                              onCropChange={setCrop}
                                              onCropComplete={onCropComplete}
                                              onZoomChange={setZoom}
                                            />
                                          </div>
                                          <div className="controls-profile-image">
                                            <label> Zoom </label>
                                            <input
                                              type="range"
                                              value={zoom}
                                              min={1}
                                              max={3}
                                              step={0.1}
                                              aria-labelledby="Zoom"
                                              onChange={(e) => {
                                                setZoom(e.target.value);
                                              }}
                                              className="zoom-range-profile-image"
                                            />
                                            <Button
                                              onClick={showCroppedImage}
                                              variant="contained"
                                              color="primary"
                                            >
                                              Save
                                            </Button>
                                          </div>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            setDoCrop(false);
                                            setSelectedFile();
                                          }}
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </>
                              )}
                              {removeProfileImage && (
                                <div style={{ marginBottom: "30px" }}>
                                  <span>No image</span>
                                </div>
                              )}
                              <label
                                className="upload-profileImg"
                                htmlFor="upload"
                              >
                                {" "}
                                <img
                                  src="/img/editicon.png"
                                  style={{ cursor: "pointer" }}
                                  className="editicon profilepic-dialog-buttonEditPop"
                                  alt=""
                                />
                              </label>
                            </>
                          ) : (
                            <>
                              <div style={{ marginBottom: "30px" }}>
                                <span>No image</span>
                              </div>
                              <label
                                className="upload-profileImg"
                                htmlFor="upload"
                              >
                                {" "}
                                <img
                                  src="/img/editicon.png"
                                  style={{ cursor: "pointer" }}
                                  className="editicon profilepic-dialog-button"
                                  alt=""
                                />
                              </label>
                            </>
                          )}
                          <input
                            type="file"
                            onChange={(e) => {
                              onChangePicture(e);
                            }}
                            hidden
                            alt="ProfileImg"
                            id="upload"
                          />

                          <div className="formGroupOneProfilePop">
                            <label
                              className={
                                errors.firstname
                                  ? "upload-profileImg error profile_info"
                                  : "upload-profileImg profile_info"
                              }
                              htmlFor="first_name"
                            >
                              <div className="profileinpProfilePop">
                                <h5>First Name</h5>
                                <input
                                  value={firstname}
                                  id="first_namePop"
                                  type="text"
                                  onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setErrors({ ...errors, firstname: null });
                                  }}
                                />
                              </div>
                              <span
                                style={{
                                  color: "#D14F4F",
                                  opacity: errors.firstname ? 1 : 0,
                                }}
                              >
                                {errors.firstname ?? "valid"}
                              </span>
                            </label>

                            <label
                              className={
                                errors.lastname
                                  ? "upload-profileImg error profile_info"
                                  : "upload-profileImg profile_info"
                              }
                              htmlFor="last_name"
                            >
                              <div className="profileinpProfilePop">
                                <h5>Last Name</h5>
                                <input
                                  value={lastname}
                                  id="last_namePop"
                                  type="text"
                                  onChange={(e) => {
                                    setLastName(e.target.value);
                                    setErrors({ ...errors, lastname: null });
                                  }}
                                />
                              </div>
                              <span
                                style={{
                                  color: "#D14F4F",
                                  opacity: errors.lastname ? 1 : 0,
                                }}
                              >
                                {errors.lastname ?? "valid"}
                              </span>
                            </label>
                          </div>
                          <div className="formGroupOneProfilePopD">
                            <label
                              className="upload-profileImg upload-profileImgWithPop"
                              htmlFor="profile_description"
                            >
                              <div className="profileinpProfilePop">
                                <h5>Add Description</h5>
                                <textarea
                                  value={
                                    profile_description == "null"
                                      ? ""
                                      : profile_description
                                  }
                                  id="profile_descriptionAbout"
                                  onChange={(e) => {
                                    setProfileDescription(e.target.value);
                                  }}
                                />
                              </div>
                            </label>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            className="save_profilepic"
                            hidden={doCrop}
                            onClick={(e) => {
                              !errors && handleClose4(e);
                              validateSubmit(e);
                              setUpdateButtonClick(true);
                            }}
                          >
                            Save
                          </Button>
                        </DialogActions>
                      </div>
                    </Dialog>
                    <p>
                      {" "}
                      {user?.profile_title == "null" ? "" : user?.profile_title}
                    </p>
                    {(userData?.user?.user_level === 1 ||
                      userData?.user?.user_level === 2) && (
                      <div className="jobsFourInProgress">
                        <div className="OnejobsFourInProgress">
                          <h5 className="oneEightJobs">
                            {getProfileJobs?.results?.Total_Job_count}
                            <br />
                            <span className="jobsOneZero">Jobs</span>
                          </h5>
                        </div>
                        <div className="TwojobsFourInProgress">
                          <h5 className="oneEightJobs">
                            {getProfileJobs?.results?.In_progress_jobs}
                            <br />
                            <span className="jobsOneZero">In progress</span>
                          </h5>
                        </div>
                      </div>
                    )}

                    {userData?.user?.user_level === 3 && (
                      <div className="jobsFourInProgress">
                        <div className="OnejobsFourInProgress">
                          <h5 className="oneEightJobs">
                            {memberApproverJobs?.Total_Job_count}
                            <br />
                            <span className="jobsOneZero">Jobs</span>
                          </h5>
                        </div>
                        <div className="TwojobsFourInProgress">
                          <h5 className="oneEightJobs">
                            {memberApproverJobs?.In_progress_jobs}
                            <br />
                            <span className="jobsOneZero">In progress</span>
                          </h5>
                        </div>
                        <div className="TwojobsFourInProgress">
                          <h5 className="oneEightJobs">
                            {memberApproverJobs?.In_review}
                            <br />
                            <span className="jobsOneZero">In reviews</span>
                          </h5>
                        </div>
                      </div>
                    )}

                    {userData?.user?.user_level === 4 && (
                      <div className="jobsFourInProgress">
                        <div className="OnejobsFourInProgress">
                          <h5 className="oneEightJobs">
                            {getCreatorProfileJobs?.Total_Job_count}
                            <br />
                            <span className="jobsOneZero">Jobs</span>
                          </h5>
                        </div>
                        <div className="TwojobsFourInProgress">
                          <h5 className="oneEightJobs">
                            {getCreatorProfileJobs?.In_progress_jobs}
                            <br />
                            <span className="jobsOneZero">In progress</span>
                          </h5>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="dotsMessagehireMain">
                  <button
                    onClick={handleClickOpen4}
                    className="hireMeBtnPProfile"
                  >
                    <img src="/img/editnew.png" />
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="jobInfoAboutTabsmain">
                <div className="feedbackAboutAreaMainD">
                  <Box sx={{ width: "100%" }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            className={value == "1" ? "lab active8 " : " lab "}
                            icon={imageOne}
                            iconPosition="start"
                            label="About"
                            value="1"
                          />
                          <Tab
                            className={value == "2" ? "lab active8 " : " lab "}
                            icon={imageThree}
                            iconPosition="start"
                            label="Communication"
                            value="2"
                          />
                          {/* {userData?.user?.user_level === 2 ? (
                            <Tab
                              className={
                                value == "3" ? "lab active8 " : " lab "
                              }
                              icon={imageThree}
                              iconPosition="start"
                              label="Feedback"
                              value="3"
                            />
                          ) : null} */}
                          <Tab
                            className={value == "4" ? "lab active8 " : " lab "}
                            icon={imageThree}
                            iconPosition="start"
                            label="Account Settings"
                            value="4"
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <div className="allContenOfPrivateAbout">
                          <div className="showHideEditiconWithTitle">
                            <h3 className="AboutMePrivateProfile">About Me</h3>
                            {showIcon && (
                              <div className="editIconShowOrHideD">
                                {" "}
                                <img
                                  onClick={handleClickOpen3}
                                  src="/img/editicon.png"
                                  alt=""
                                />
                              </div>
                            )}
                          </div>
                          <div className="aboutMeDesFullW">
                            <Dialog
                              className="aboutmediv"
                              open={open3}
                              onClose={handleClose3}
                            >
                              <DialogTitle className="profileImgHeading">
                                About Me{" "}
                                <span onClick={handleClose3}>
                                  <i className="fa-solid fa-xmark"></i>
                                </span>
                              </DialogTitle>
                              <div className="dialogcontent_and_actions aboutMeDesFullW">
                                <DialogContent className="profile_title_description">
                                  <label
                                    className="upload-profileImg"
                                    htmlFor="upload"
                                  ></label>
                                  <input
                                    type="file"
                                    hidden
                                    alt="ProfileVideo"
                                    id="upload"
                                  />

                                  <label
                                    className="upload-profileImg"
                                    htmlFor="profile_description"
                                  >
                                    <h3>Add Description</h3>
                                    <textarea
                                      value={profile_description}
                                      id="profile_descriptionAbout"
                                      onChange={(e) => {
                                        setProfileDescription(e.target.value);
                                      }}
                                    />
                                  </label>
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    className="save_profilepic videoProfile"
                                    onClick={(e) => {
                                      handleClose3(e);
                                      validateSubmit(e);
                                      setUpdateButtonClick(true);
                                    }}
                                  >
                                    Save
                                  </Button>
                                </DialogActions>
                              </div>
                            </Dialog>
                          </div>
                          <div className="ParaGraphAboutMePrivateAbout">
                            <div className="paragraph-pAbout">
                              {!user?.profile_description ||
                              user?.profile_description == "null" ? (
                                <span>No profile description</span>
                              ) : user?.profile_description.length > 300 ? (
                                <>
                                  {showMoreDesc ? (
                                    <>
                                      <p id="Profilediv1">
                                        {user?.profile_description}
                                      </p>
                                      <button
                                        id="fadeOUTBTN"
                                        type="button"
                                        onClick={showmoreDescription}
                                      >
                                        Read less
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <p id="Profilediv">
                                        {user?.profile_description.substring(
                                          0,
                                          300
                                        ) + "..."}
                                      </p>
                                      <button
                                        id="fadeINBTN"
                                        type="button"
                                        onClick={showmoreDescription}
                                      >
                                        Read more
                                      </button>
                                    </>
                                  )}
                                </>
                              ) : (
                                <p>{user?.profile_description}</p>
                              )}
                            </div>
                          </div>

                          <div className="skillContentPublicPr">
                            <Dialog
                              className="profileImgDialogagency"
                              open={open6}
                              onClose={handleClose6}
                            >
                              <DialogTitle className="profileImgHeadingAnew">
                                <div className="Ajobshare">
                                  <h2>My Skills</h2>

                                  <span
                                    className="closebuttonsec"
                                    onClick={handleClose6}
                                  >
                                    <i className="fa-solid fa-xmark"></i>
                                  </span>
                                </div>
                              </DialogTitle>
                              <div className="dialogcontent_and_actions_new">
                                <DialogContent className="ChangeEmailAContent">
                                  <div
                                    className={
                                      errors.skillsData
                                        ? "text-content  Skills error Experiencenew_2 "
                                        : "text-content  Skills Experiencenew_2"
                                    }
                                  >
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

                                  <div
                                    className={
                                      errors.skills
                                        ? "text-content  Skills error Experiencenew_2 "
                                        : "text-content  Skills Experiencenew_2"
                                    }
                                  >
                                    <h4 className=" neededskillnew_29">
                                      Add Skills
                                    </h4>
                                    <div className="Marketing- mt-2-">
                                      <div className="skills-input-container">
                                        <Autocomplete
                                          value={skillset}
                                          multiple
                                          id="tags-outlined"
                                          open={isOpenSkill}
                                          // open={true}
                                          onInputChange={
                                            handleInputChangeAutocomplete
                                          }
                                          filterOptions={filterOptions}
                                          options={skillsData.filter(
                                            (item) => item.is_active
                                          )}
                                          getOptionLabel={(option) =>
                                            option.skill_name
                                          }
                                          onChange={(e, v) => {
                                            changeHandler(e, v);
                                            setErrors({
                                              ...errors,
                                              skills: null,
                                            });
                                          }}
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          filterSelectedOptions
                                          hiddenLabel="true"
                                          autoHighlight={true}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              fullWidth
                                              placeholder="Type something"
                                            />
                                          )}
                                          isOptionEqualToValue={(
                                            option,
                                            value
                                          ) =>
                                            value === undefined ||
                                            value === "" ||
                                            option.id === value.id ||
                                            option.id === value ||
                                            option === value.id
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
                                </DialogContent>
                                <DialogActions>
                                  <div className="sharebuttonjobcontent">
                                    <div className="cancelButtonnewWithSave">
                                      <button
                                        onClick={handleClose6}
                                        className="canceButtonnewPop"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={handleSaveSkillSet}
                                        className="shareNewPopPublic"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </DialogActions>
                              </div>
                            </Dialog>
                            <div className="todaySkillsDF">
                              {userskillsetDetails?.length > 0 &&
                                userskillsetDetails?.map((item) => (
                                  <div className="RadingProfiles">
                                    <div className="spacingTopSkills">
                                      <div className="listSkillsPublicpp">
                                        <li>
                                          <a>{item?.skill_name}</a>
                                        </li>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="porfolioContentPublicPr">
                            <div className="port-main">
                              <Dialog
                                className="profileImgDialog"
                                open={open5}
                                onClose={handleClose5}
                              >
                                <DialogTitle className="profileImgHeading">
                                  Portfolio{" "}
                                  <span onClick={handleClose5}>
                                    <i className="fa-solid fa-xmark"></i>
                                  </span>
                                </DialogTitle>
                                <div className="dialogcontent_and_actions">
                                  <DialogContent className="portfolio_content">
                                    <input
                                      multiple
                                      type="file"
                                      onChange={(e) => {
                                        handlePortfolio(e);
                                      }}
                                      id="upload-port"
                                      hidden
                                    />
                                    <label
                                      className="upload port"
                                      htmlFor="upload-port"
                                    >
                                      {" "}
                                      <img
                                        className="mr-2"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/img/upload.png"
                                        }
                                        alt=""
                                      />
                                      Attach Filesz
                                    </label>
                                    <div className="port-images port-imagesPopUp">
                                      {portfolio &&
                                        portfolio?.map((item, index) => (
                                          <div
                                            className="port-single"
                                            key={index}
                                          >
                                            <img
                                              style={{
                                                maxWidth: "100px",
                                                padding: "5px",
                                              }}
                                              src={item.portfolio_images}
                                            />
                                            <span
                                              index={index}
                                              className="overlayasdasd"
                                              onClick={() => {
                                                removePortfolioImage(
                                                  index,
                                                  "data"
                                                );
                                                removePortfolioImageByID(
                                                  item?.id
                                                );
                                              }}
                                            >
                                              <a
                                                className="icon_asdsdasd"
                                                title="Remove"
                                              >
                                                <i className="fa-solid fa-circle-xmark"></i>
                                              </a>
                                            </span>
                                          </div>
                                        ))}
                                      {selectedPortfolio &&
                                        selectedPortfolio?.map(
                                          (item, index) => (
                                            <>
                                              {URL.createObjectURL(item) && (
                                                <div
                                                  className="port-single"
                                                  key={index}
                                                >
                                                  <img
                                                    style={{
                                                      maxWidth: "100px",
                                                      padding: "5px",
                                                    }}
                                                    src={URL.createObjectURL(
                                                      item
                                                    )}
                                                  />
                                                  <span
                                                    index={index}
                                                    className="overlayasdasd"
                                                    onClick={() =>
                                                      removePortfolioImage(
                                                        index,
                                                        "new"
                                                      )
                                                    }
                                                  >
                                                    <a
                                                      className="icon_asdsdasd"
                                                      title="Remove"
                                                    >
                                                      <i className="fa-solid fa-circle-xmark"></i>
                                                    </a>
                                                  </span>
                                                </div>
                                              )}
                                            </>
                                          )
                                        )}
                                    </div>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      className="save_profilepic PortfolioimgBtn"
                                      onClick={(e) => {
                                        handleClose5(e);
                                        validateSubmit(e);
                                        setUpdateButtonClick(true);
                                      }}
                                    >
                                      Save
                                    </Button>
                                  </DialogActions>
                                </div>
                              </Dialog>
                            </div>

                            <div className="portfolioImgContentHeadDiv">
                              {portfolioDetails?.map((portfolio_item, i) => (
                                <>
                                  <div className="portfolioImgContent">
                                    <div
                                      key={i}
                                      className="firstportfolioImgContent"
                                    >
                                      <img
                                        src={portfolio_item.portfolio_images}
                                        alt=""
                                      />
                                      <p>
                                        {portfolio_item.portfolio_name.length >
                                        30
                                          ? `${portfolio_item.portfolio_name.slice(
                                              0,
                                              30
                                            )}...`
                                          : portfolio_item.portfolio_name}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                        {pages > 1 && (
                          <div className="adminjobpagination paginationAdifect">
                            <Stack spacing={2}>
                              <Pagination
                                page={currentPage}
                                shape="rounded"
                                size="large"
                                count={pages}
                                onChange={(e, page) => {
                                  pageHandler(page);
                                }}
                                color="primary"
                              />
                            </Stack>
                          </div>
                        )}
                      </TabPanel>
                      <TabPanel value="2">
                        <Member_Profile_Communication />
                      </TabPanel>
                      <TabPanel value="3">
                        <Member_profile_feedback />
                      </TabPanel>
                      <TabPanel value="4">
                        <Member_profile_account_setting />
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Member_profile;
