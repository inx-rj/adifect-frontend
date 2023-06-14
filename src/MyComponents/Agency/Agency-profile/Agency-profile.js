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
import {
  getUserDetails,
  updateProfile,
  getUserPortfolio,
} from "../../../redux/actions/auth-actions";
import {
  USER_UPDATE_PROFILE_RESET,
  USER_PORTFOLIO_RESET,
} from "../../../constants/auth-constants";
import Cropper from "react-easy-crop";
import swal from "sweetalert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { validations } from "../../../utils";
import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";
import {
  listAllJobs,
  listAgencyJobs,
} from "../../../redux/actions/job-actions";
import { JOB_DETAILS_RESET } from "../../../constants/job-constants";
import $ from "jquery";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
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

import axios from "axios";
import { skill_name } from "../../../utils/validations";
import Agency_profile_account_setting from "./Agency-profile-account-setting";
import ReactPlayer from "react-player";
import { toUnitless } from "@mui/material/styles/cssUtils";
import { deleteSkill } from "../../../redux/actions/skill-actions";
import { listAllCategories } from "../../../redux/actions/category-actions";
import { listAllLevels } from "../../../redux/actions/level-actions";
import { listAllCompanies } from "../../../redux/actions/Workflow-company-action";
import { listAllIndustries } from "../../../redux/actions/industry-actions";
import Agency_profile_communication from "./Agency-profile-communication";
import Agency_profile_companies from "./Agency_profile_companies";
import { getAgencyProfileJobsInProgressAction } from "../../../redux/actions/agency-profile-account";

const Profile = () => {
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
  const [profile_description, setProfileDescription] = useState("");
  const [profile_title, setProfileTitle] = useState("");
  const [sub_title, setsub_title] = useState("");
  const [website, setWebsite] = useState("");
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

  const { success: successAddSkillset } = useSelector(
    (state) => state.skillsetAddReducer
  );
  const { success: successDeleteSkillset } = useSelector(
    (state) => state.skillsetDeleteReducer
  );
  const { userskillsetDetails, success: successUserSkillsetDetails } =
    useSelector((state) => state.userskillsetDetailsReducer);

  const { getProfileJobs } = useSelector(
    (state) => state.getAgencyProfileJobsInProgressReducer
  );

  useEffect(() => {
    dispatch(getAgencyProfileJobsInProgressAction());
  }, []);

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
    sub_title: null,
    website: null,
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
      // sub_title: validations.title(sub_title),
      // website: validations.email(website),
      // password: validations.password(password),
      // confirmPassword: validations.confirmPassword(password, confirm_password),
      // role: validations.role(role),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler(e);
  };

  const submitHandler = async (e) => {
    // alert("passed");
    const formData = new FormData();

    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("username", username);
    formData.append("email", email);

    if (profile_description) {
      formData.append("profile_description", profile_description);
    }
    if (profile_title) {
      formData.append("profile_title", profile_title);
    }
    if (sub_title) {
      formData.append("sub_title", sub_title);
    }
    if (website) {
      formData.append("website", website);
    }

    formData.append("profile_status", profile_status);
    formData.append("preferred_communication_mode", modeOfComm);
    formData.append("preferred_communication_id", communication);

    if (portfolioChanged) {
      for (const key of Object.keys(selectedPortfolio)) {
        formData.append("portfolio", selectedPortfolio[key]);
      }
    }
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

  const showCroppedImage = useCallback(() => {
    try {
      const croppedImage = getCroppedImg(
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
      handleClose3();
      setsub_title();
      validateSubmit();
      setUpdateButtonClick(true);
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
        d="M12.96 9.16625C12.8133 9.16625 12.66 9.11959 12.5133 9.08625C12.2163 9.0208 11.9245 8.93391 11.64 8.82625C11.3307 8.71374 10.9908 8.71958 10.6855 8.84266C10.3803 8.96573 10.1314 9.19734 9.98667 9.49292L9.84001 9.79292C9.19067 9.43171 8.594 8.98307 8.06667 8.45959C7.54319 7.93226 7.09455 7.33558 6.73334 6.68625L7.01334 6.49959C7.30892 6.35486 7.54053 6.10594 7.6636 5.80071C7.78668 5.49549 7.79252 5.15553 7.68001 4.84625C7.57415 4.5612 7.4873 4.26945 7.42001 3.97292C7.38667 3.82625 7.36001 3.67292 7.34001 3.51959C7.25905 3.05 7.01309 2.62475 6.64642 2.32041C6.27975 2.01608 5.81647 1.85266 5.34001 1.85959H3.34001C3.05269 1.85689 2.76817 1.91613 2.50581 2.03327C2.24345 2.15042 2.00941 2.32272 1.81963 2.53844C1.62984 2.75417 1.48876 3.00825 1.406 3.2834C1.32323 3.55854 1.30073 3.84829 1.34001 4.13292C1.69516 6.92584 2.97069 9.52084 4.96511 11.508C6.95952 13.4952 9.55915 14.7613 12.3533 15.1063H12.6067C13.0983 15.107 13.5729 14.9266 13.94 14.5996C14.1509 14.4109 14.3194 14.1797 14.4343 13.9211C14.5492 13.6626 14.608 13.3825 14.6067 13.0996V11.0996C14.5985 10.6365 14.4299 10.1906 14.1296 9.83803C13.8293 9.48544 13.4159 9.248 12.96 9.16625V9.16625ZM13.2933 13.1663C13.2932 13.2609 13.2729 13.3545 13.2339 13.4407C13.1948 13.5269 13.1378 13.6038 13.0667 13.6663C12.9924 13.7309 12.9053 13.7792 12.8111 13.8079C12.7169 13.8366 12.6177 13.8452 12.52 13.8329C10.0233 13.5128 7.70416 12.3706 5.92848 10.5864C4.1528 8.80232 3.02161 6.47781 2.71334 3.97959C2.70273 3.88193 2.71203 3.78314 2.74067 3.68918C2.76932 3.59522 2.81672 3.50804 2.88001 3.43292C2.94248 3.36181 3.01938 3.30481 3.10559 3.26573C3.1918 3.22665 3.28535 3.20637 3.38001 3.20625H5.38001C5.53504 3.2028 5.68642 3.25351 5.8081 3.34963C5.92978 3.44576 6.01415 3.5813 6.04667 3.73292C6.07334 3.91514 6.10667 4.09514 6.14667 4.27292C6.22369 4.62435 6.32618 4.96971 6.45334 5.30625L5.52001 5.73959C5.4402 5.7762 5.36842 5.82822 5.30878 5.89265C5.24913 5.95708 5.20281 6.03266 5.17245 6.11505C5.1421 6.19744 5.12832 6.28501 5.1319 6.37273C5.13549 6.46046 5.15637 6.54662 5.19334 6.62625C6.15281 8.68142 7.80484 10.3335 9.86001 11.2929C10.0223 11.3596 10.2044 11.3596 10.3667 11.2929C10.4498 11.2632 10.5262 11.2172 10.5915 11.1577C10.6567 11.0982 10.7094 11.0263 10.7467 10.9463L11.16 10.0129C11.5047 10.1362 11.8564 10.2386 12.2133 10.3196C12.3911 10.3596 12.5711 10.3929 12.7533 10.4196C12.905 10.4521 13.0405 10.5365 13.1366 10.6582C13.2328 10.7798 13.2835 10.9312 13.28 11.0863L13.2933 13.1663Z"
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
        d="M14.6667 3.83366H1.33332C1.15651 3.83366 0.986943 3.9039 0.861919 4.02892C0.736894 4.15395 0.666656 4.32351 0.666656 4.50033V7.16699C0.667816 7.57962 0.796575 7.98179 1.03528 8.31837C1.27399 8.65494 1.61096 8.90945 1.99999 9.04699V15.167C1.99999 15.3438 2.07023 15.5134 2.19525 15.6384C2.32028 15.7634 2.48985 15.8337 2.66666 15.8337H13.3333C13.5101 15.8337 13.6797 15.7634 13.8047 15.6384C13.9298 15.5134 14 15.3438 14 15.167V9.04699C14.389 8.90945 14.726 8.65494 14.9647 8.31837C15.2034 7.98179 15.3322 7.57962 15.3333 7.16699V4.50033C15.3333 4.32351 15.2631 4.15395 15.1381 4.02892C15.013 3.9039 14.8435 3.83366 14.6667 3.83366ZM9.99999 5.16699H11.3333V7.16699C11.3333 7.3438 11.2631 7.51337 11.1381 7.6384C11.013 7.76342 10.8435 7.83366 10.6667 7.83366C10.4898 7.83366 10.3203 7.76342 10.1953 7.6384C10.0702 7.51337 9.99999 7.3438 9.99999 7.16699V5.16699ZM7.33332 5.16699H8.66666V7.16699C8.66666 7.3438 8.59642 7.51337 8.47139 7.6384C8.34637 7.76342 8.1768 7.83366 7.99999 7.83366C7.82318 7.83366 7.65361 7.76342 7.52858 7.6384C7.40356 7.51337 7.33332 7.3438 7.33332 7.16699V5.16699ZM4.66666 5.16699H5.99999V7.16699C5.99999 7.3438 5.92975 7.51337 5.80473 7.6384C5.6797 7.76342 5.51013 7.83366 5.33332 7.83366C5.15651 7.83366 4.98694 7.76342 4.86192 7.6384C4.73689 7.51337 4.66666 7.3438 4.66666 7.16699V5.16699ZM2.66666 7.83366C2.48985 7.83366 2.32028 7.76342 2.19525 7.6384C2.07023 7.51337 1.99999 7.3438 1.99999 7.16699V5.16699H3.33332V7.16699C3.33332 7.3438 3.26308 7.51337 3.13806 7.6384C3.01304 7.76342 2.84347 7.83366 2.66666 7.83366ZM9.33332 14.5003H6.66666V13.167C6.66666 12.8134 6.80713 12.4742 7.05718 12.2242C7.30723 11.9741 7.64637 11.8337 7.99999 11.8337C8.35361 11.8337 8.69275 11.9741 8.9428 12.2242C9.19285 12.4742 9.33332 12.8134 9.33332 13.167V14.5003ZM12.6667 14.5003H10.6667V13.167C10.6667 12.4597 10.3857 11.7815 9.88561 11.2814C9.38551 10.7813 8.70723 10.5003 7.99999 10.5003C7.29275 10.5003 6.61447 10.7813 6.11437 11.2814C5.61427 11.7815 5.33332 12.4597 5.33332 13.167V14.5003H3.33332V9.04699C3.57837 8.95603 3.80442 8.82041 3.99999 8.64699C4.36667 8.97496 4.84137 9.15628 5.33332 9.15628C5.82528 9.15628 6.29997 8.97496 6.66666 8.64699C7.03334 8.97496 7.50803 9.15628 7.99999 9.15628C8.49194 9.15628 8.96664 8.97496 9.33332 8.64699C9.7 8.97496 10.1747 9.15628 10.6667 9.15628C11.1586 9.15628 11.6333 8.97496 12 8.64699C12.1956 8.82041 12.4216 8.95603 12.6667 9.04699V14.5003ZM14 7.16699C14 7.3438 13.9298 7.51337 13.8047 7.6384C13.6797 7.76342 13.5101 7.83366 13.3333 7.83366C13.1565 7.83366 12.9869 7.76342 12.8619 7.6384C12.7369 7.51337 12.6667 7.3438 12.6667 7.16699V5.16699H14V7.16699ZM2.86666 2.50033H13.3333C13.5101 2.50033 13.6797 2.43009 13.8047 2.30506C13.9298 2.18004 14 2.01047 14 1.83366C14 1.65685 13.9298 1.48728 13.8047 1.36225C13.6797 1.23723 13.5101 1.16699 13.3333 1.16699H2.86666C2.68985 1.16699 2.52028 1.23723 2.39525 1.36225C2.27023 1.48728 2.19999 1.65685 2.19999 1.83366C2.19999 2.01047 2.27023 2.18004 2.39525 2.30506C2.52028 2.43009 2.68985 2.50033 2.86666 2.50033Z"
        fill="#71757B"
      />
    </svg>
  );

  const imageFour = (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2667 8.9396C13.1598 8.81795 13.1008 8.66154 13.1008 8.4996C13.1008 8.33767 13.1598 8.18126 13.2667 8.0596L14.12 7.0996C14.214 6.99472 14.2724 6.86274 14.2868 6.72261C14.3012 6.58248 14.2708 6.4414 14.2 6.3196L12.8667 4.01294C12.7966 3.89129 12.6899 3.79486 12.5618 3.7374C12.4337 3.67993 12.2908 3.66438 12.1533 3.69294L10.9 3.94627C10.7405 3.97922 10.5745 3.95266 10.4333 3.8716C10.292 3.79055 10.1853 3.66059 10.1333 3.50627L9.72667 2.28627C9.68194 2.15386 9.59674 2.03885 9.48309 1.9575C9.36944 1.87615 9.2331 1.83258 9.09334 1.83294H6.42667C6.28129 1.82535 6.13742 1.86556 6.01705 1.94741C5.89667 2.02927 5.80639 2.14828 5.76 2.28627L5.38667 3.50627C5.33467 3.66059 5.22798 3.79055 5.08674 3.8716C4.9455 3.95266 4.77948 3.97922 4.62 3.94627L3.33334 3.69294C3.20304 3.67452 3.0702 3.69509 2.95157 3.75203C2.83293 3.80898 2.7338 3.89976 2.66667 4.01294L1.33334 6.3196C1.26078 6.44004 1.22815 6.58033 1.24012 6.72042C1.2521 6.86051 1.30806 6.99323 1.4 7.0996L2.24667 8.0596C2.35355 8.18126 2.41249 8.33767 2.41249 8.4996C2.41249 8.66154 2.35355 8.81795 2.24667 8.9396L1.4 9.8996C1.30806 10.006 1.2521 10.1387 1.24012 10.2788C1.22815 10.4189 1.26078 10.5592 1.33334 10.6796L2.66667 12.9863C2.73673 13.1079 2.84341 13.2044 2.9715 13.2618C3.09959 13.3193 3.24255 13.3348 3.38 13.3063L4.63333 13.0529C4.79281 13.02 4.95884 13.0465 5.10008 13.1276C5.24132 13.2087 5.348 13.3386 5.4 13.4929L5.80667 14.7129C5.85305 14.8509 5.94333 14.9699 6.06371 15.0518C6.18409 15.1337 6.32796 15.1739 6.47333 15.1663H9.14C9.27976 15.1666 9.41611 15.1231 9.52975 15.0417C9.6434 14.9604 9.72861 14.8454 9.77333 14.7129L10.18 13.4929C10.232 13.3386 10.3387 13.2087 10.4799 13.1276C10.6212 13.0465 10.7872 13.02 10.9467 13.0529L12.2 13.3063C12.3375 13.3348 12.4804 13.3193 12.6085 13.2618C12.7366 13.2044 12.8433 13.1079 12.9133 12.9863L14.2467 10.6796C14.3175 10.5578 14.3478 10.4167 14.3335 10.2766C14.3191 10.1365 14.2607 10.0045 14.1667 9.8996L13.2667 8.9396ZM12.2733 9.83294L12.8067 10.4329L11.9533 11.9129L11.1667 11.7529C10.6865 11.6548 10.187 11.7364 9.76306 11.9821C9.33908 12.2279 9.0201 12.6208 8.86667 13.0863L8.61333 13.8329H6.90667L6.66667 13.0729C6.51324 12.6075 6.19426 12.2146 5.77027 11.9688C5.34629 11.723 4.84682 11.6415 4.36667 11.7396L3.58 11.8996L2.71334 10.4263L3.24667 9.82627C3.57464 9.45959 3.75596 8.98489 3.75596 8.49294C3.75596 8.00098 3.57464 7.52629 3.24667 7.1596L2.71334 6.5596L3.56667 5.09294L4.35334 5.25294C4.83348 5.35109 5.33295 5.26952 5.75694 5.02374C6.18092 4.77795 6.4999 4.38504 6.65333 3.9196L6.90667 3.16627H8.61333L8.86667 3.92627C9.0201 4.39171 9.33908 4.78462 9.76306 5.0304C10.187 5.27619 10.6865 5.35775 11.1667 5.2596L11.9533 5.0996L12.8067 6.5796L12.2733 7.1796C11.949 7.54544 11.77 8.01739 11.77 8.50627C11.77 8.99515 11.949 9.4671 12.2733 9.83294ZM7.76 5.83294C7.23258 5.83294 6.71701 5.98934 6.27848 6.28235C5.83995 6.57537 5.49816 6.99185 5.29632 7.47912C5.09449 7.96638 5.04168 8.50256 5.14457 9.01985C5.24747 9.53713 5.50144 10.0123 5.87438 10.3852C6.24732 10.7582 6.72248 11.0121 7.23976 11.115C7.75704 11.2179 8.29322 11.1651 8.78049 10.9633C9.26776 10.7614 9.68424 10.4197 9.97725 9.98112C10.2703 9.54259 10.4267 9.02702 10.4267 8.4996C10.4267 7.79236 10.1457 7.11408 9.64562 6.61399C9.14552 6.11389 8.46725 5.83294 7.76 5.83294ZM7.76 9.83294C7.49629 9.83294 7.23851 9.75474 7.01924 9.60823C6.79998 9.46172 6.62908 9.25348 6.52816 9.00985C6.42725 8.76621 6.40084 8.49813 6.45229 8.23948C6.50374 7.98084 6.63072 7.74327 6.81719 7.5568C7.00366 7.37033 7.24124 7.24334 7.49988 7.19189C7.75852 7.14044 8.02661 7.16685 8.27025 7.26776C8.51388 7.36868 8.72212 7.53958 8.86863 7.75884C9.01514 7.97811 9.09334 8.2359 9.09334 8.4996C9.09334 8.85323 8.95286 9.19236 8.70281 9.44241C8.45276 9.69246 8.11362 9.83294 7.76 9.83294Z"
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

  // SKILLS JS START

  const deleteSkillsetHandler = (id) => {
    swal({
      title: "",
      text: "Are you sure you want to delete this skillset?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteSkillset(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully deleted skillset!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 5000,
        });
        // setSaveLoading(true);
      }
    });
  };

  const handleOpenRatingBox = () => {
    setOpenSkillset(true);
    $(".skill-Box").toggle();
  };

  const skillsetChangeHandler = (e, v) => {
    if (v && v.id) {
      setSkillset(v.id);
    }
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  const min = 1;
  const max = 5;

  const handleChangeRating = (evt) => {
    const value = Math.max(min, Math.min(max, Number(evt.target.value)));
    setRating(value);
  };

  const handleChangeEditRating = (evt) => {
    const value = Math.max(min, Math.min(max, Number(evt.target.value)));
    setRatingEdit(value);
  };

  const skillsetEditChangeHandler = (e, v) => {
    if (v && v.id) {
      setSkillsetEditName(v.id);
    }
  };

  const skillsetEditCloseHandler = (e, v) => {
    setRatingEdit("");
    setSkillsetEditName();
  };

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

  const [skillsetEditerrors, setskillsetEditErrors] = useState({
    skillset: null,
    rating: null,
  });

  const handleEditSkillSet = (evt, id) => {
    const tempErrors = {
      skills: !skillsetEditName && "Please select a skillset",
      rating: !ratingEdit && "Please select a rating",
    };
    // alert("passed");
    setOpen6(false);
    setskillsetEditErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    dispatch(
      skillsetEditAction(
        {
          user: userData.user.user_id,
          skills: skillsetEditName,
          skill_rating: ratingEdit,
        },
        id
      )
    );
    setSaveLoading(true);
    setEditSkillset(false);
  };

  useEffect(() => {
    dispatch({ type: USER_PORTFOLIO_RESET });
    dispatch(getUserPortfolio(userData?.user?.user_id, currentPage));
    // dispatch(getUserSkillsetDetails());
  }, [currentPage]);

  useEffect(() => {
    if (skillsetDetails) {
      setRatingEdit(skillsetDetails.skill_rating);
      setSkillsetEditName(skillsetDetails.skills);
    }
  }, [successSkillsetDetails]);

  useEffect(() => {
    // if (!successUserSkillsetDetails) {
    dispatch(getUserSkillsetDetails(userData?.user?.user_id));
    // }
  }, [
    // successUserSkillsetDetails,
    successAddSkillset,
    saveLoading,
    successDeleteSkillset,
  ]);

  const editSkillsetHandler = (id) => {
    setEditSkillsetId(id);
    setRatingEdit("");
    setSkillsetEditName();
    // setEditSkillset(!editSkillset);
    setEditSkillset(true);
    setOpenSkillset(false);
    dispatch({ type: SKILL_SET_DETAILS_RESET });
    dispatch(getSkillsetDetails(id));
  };
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

  function handleKeyDownSkills(e) { }
  // SKILLS JS END

  // ABOUT ME JS START

  const removeSelectedVideo = () => {
    setSelectedVideo();
    setProfileVideo(user?.video);
  };

  const removeDatabaseVideo = () => {
    setRemoveVideo(true);
  };

  const showmoreDescription = () => {
    setShowMoreDesc(!showMoreDesc);
  };
  const handleClose3 = () => {
    // Video, title and description
    setOpen3(false);
    setProfileTitle(user?.profile_title);
    setsub_title(user?.sub_title);
    setWebsite(user?.website);
    setProfileDescription(user?.profile_description);
    setPortfolio(user?.portfolio);
    setProfileVideo(user?.video);
    setSelectedVideo();
    // setErrors({ firstname: null, lastname: null });
  };
  useEffect(() => {
    if (successUpdate || saveLoading) {
      // setSaveLoading(true);

      setTimeout(() => {
        setSaveLoading(false);
        setOpen4(false);
        swal({
          title: "Successfully Complete",
          text: "Profile updated successfully",
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
      // user.sub_title == "null" ? "" : user.sub_title;

      setUsername(user.username);
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setProfileImage(user.profile_img);
      setCurrentCroppedImage(user.profile_img);

      setProfileTitle(user.profile_title);
      setsub_title(user.sub_title);
      setWebsite(user.website);

      setProfileDescription(user.profile_description);
      setProfileVideo(user.video);
      setPortfolio(user?.Portfolio_user);
      setProfileStatus(user.profile_status);
      setModeOfComm(user.preferred_communication_mode);
      setCommunication(user.preferred_communication_id);
      // setAvailability(user.availability);
      // setLanguages(user.languages);
      // setProficiency(user.proficiency);
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
                      {/* <span className="fourPointEight">
                        <img src="/img/star filled.png" />
                        4.8
                      </span> */}
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
                                  // hidden={doCrop}
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
                                      // hidden={doCrop}
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
                                  ? "upload-profileImg error profile_info upload-profileImgNewpop"
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
                                  ? "upload-profileImg error profile_info  upload-profileImgNewpop"
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

                          <div className="formGroupOneProfilePop">
                            <label
                              className="upload-profileImg profile_info"
                              htmlFor="last_name"
                            >
                              <div className="profileinpProfilePop">
                                <h5>Title</h5>
                                <input
                                  // value={profile_title == null ? "" : profile_title}
                                  id="last_namePop"
                                  type="text"
                                  value={sub_title == "null" ? "" : sub_title}
                                  onChange={(e) => {
                                    setsub_title(e.target.value);
                                  }}
                                />
                              </div>
                              <span
                                style={{
                                  color: "#D14F4F",
                                  opacity: errors.sub_title ? 1 : 0,
                                }}
                              >
                                {errors.sub_title ?? "valid"}
                              </span>
                            </label>
                            <label
                              className="upload-profileImg profile_info"
                              htmlFor="first_name"
                            >
                              <div className="profileinpProfilePop">
                                <h5>Sub Title</h5>
                                <input
                                  value={
                                    profile_title == "null" ? "" : profile_title
                                  }
                                  id="last_namePop"
                                  type="text"
                                  onChange={(e) => {
                                    setProfileTitle(e.target.value);
                                  }}
                                />
                              </div>

                              <span
                                style={{
                                  color: "#D14F4F",
                                  opacity: errors.profile_title ? 1 : 0,
                                }}
                              >
                                {errors.profile_title ?? "valid"}
                              </span>
                            </label>
                          </div>

                          <div className="formGroupOneProfilePop">
                            {/* <label
                          className="upload-profileImg profile_info  upload-profileImgNewpop"
                          htmlFor="last_name"
                        >
                          <div className="profileinpProfilePop">
                            <h5 className="">Language: </h5>
                            <Select
                              className="profileinpProfilePopSelect"
                              onOpen={() => {
                                setIsOpenStatus(true);
                              }}
                              onClose={() => {
                                setIsOpenStatus(false);
                              }}
                              MenuProps={menuProps}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value=""> Select Language </MenuItem>
                              <MenuItem value="0">English</MenuItem>
                              <MenuItem value="1">French</MenuItem>
                              <MenuItem value="2">Hindi</MenuItem>
                            </Select>
                          </div>
                        </label> */}
                            <label
                              className="upload-profileImg profile_info  upload-profileImgNewpop upload-profileImgHalfW"
                              htmlFor="last_name"
                            >
                              <div className="profileinpProfilePop">
                                <h5 className="">Website</h5>
                                <input
                                  // value={profile_title == null ? "" : profile_title}
                                  id="last_namePop"
                                  type="text"
                                  value={website == "null" ? "" : website}
                                  onChange={(e) => {
                                    setWebsite(e.target.value);
                                    // setErrors({ ...errors, website: null });
                                  }}
                                />
                              </div>
                              <span
                                style={{
                                  color: "#D14F4F",
                                  opacity: errors.website ? 1 : 0,
                                }}
                              >
                                {errors.website ?? "valid"}
                              </span>
                            </label>
                          </div>
                          <label
                            className="upload-profileImg  upload-profileImgNewpop upload-profileImgTenPadding"
                            htmlFor="profile_description"
                          >
                            <h5 className="AddDescriptionLastLine">
                              Add Description
                            </h5>
                            <textarea
                              // maxLength="300"
                              value={profile_description}
                              id="profile_descriptionAbout"
                              onChange={(e) => {
                                setProfileDescription(e.target.value);
                              }}
                            />
                          </label>
                        </DialogContent>
                        <DialogActions>
                          {/* <Button onClick={handleClose}>Cancel</Button> */}
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
                    <div className="jobsFourInProgress">
                      <div className="OnejobsFourInProgress">
                        <h5 className="oneEightJobs">
                          {getProfileJobs?.results?.Total_Job_count ?? '0' }
                          <br />
                          <span className="jobsOneZero">Jobs</span>
                        </h5>
                      </div>
                      <div className="TwojobsFourInProgress">
                        <h5 className="oneEightJobs">
                          {getProfileJobs?.results?.In_progress_jobs ?? '0'}
                          <br />
                          <span className="jobsOneZero">In progress</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dotsMessagehireMain">
                  <button
                    // onClick={() => setShowIcon(!showIcon)}
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
                            icon={imageTwo}
                            iconPosition="start"
                            label="Communication"
                            value="2"
                          />
                          <Tab
                            className={value == "3" ? "lab active8 " : " lab "}
                            icon={imageThree}
                            iconPosition="start"
                            label="Companies"
                            value="3"
                          />
                          <Tab
                            className={value == "4" ? "lab active8 " : " lab "}
                            icon={imageFour}
                            iconPosition="start"
                            label="Account Settings"
                            value="4"
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <div className="allContenOfPrivateAbout">
                          <div className="AboutMeTitleDigitalM">
                            <h3>Title</h3>

                            <p>
                              {user?.sub_title == "null" ? "" : user?.sub_title}
                            </p>
                          </div>

                          <div className="showHideEditiconWithTitle">
                            <h3 className="AboutMePrivateProfile">About Me</h3>
                          </div>
                          <div className="aboutMeDesFullW"></div>
                          <div className="ParaGraphAboutMePrivateAbout">
                            <div className="paragraph-pAbout">
                              {/* if no profile description  */}
                              {!user?.profile_description ? (
                                <span>No profile descripiton</span>
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
                                <p>
                                  {/* else print the whole content */}
                                  {user?.profile_description}
                                </p>
                              )}
                            </div>
                          </div>
                          {/* <div className="AboutMeTitleDigitalM">
                        <h3>Language</h3>
                        <p>English (US)</p>
                      </div> */}
                          <div className="AboutMeTitleDigitalM">
                            <h3>Website</h3>
                            <p>
                              {user?.website == "null" ? "" : user?.website}
                            </p>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value="2">
                        <Agency_profile_communication />
                      </TabPanel>
                      <TabPanel value="3">
                        <Agency_profile_companies />
                      </TabPanel>
                      <TabPanel value="4">
                        <Agency_profile_account_setting />
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

export default Profile;
