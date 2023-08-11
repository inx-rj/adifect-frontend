import React, { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  updateProfile,
} from "../../redux/actions/auth-actions";
import { validations } from "../../utils";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/auth-constants";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import swal from "sweetalert";
import ReactPlayer from "react-player";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { Paper } from "@mui/material";
// import Carousel from "react-bootstrap/Carousel";
// import { Stack, Carousel, Card } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Cropper from "react-easy-crop";
import { USER_LOGIN_SUCCESS } from "../../constants/auth-constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import $ from "jquery";
import { Link } from "react-router-dom";

export default function Profile() {
  let navigate = useNavigate();

  const [isOpenForProficiency, setIsOpenForProficiency] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [isOpenComm, setIsOpenComm] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);

  const handleClickOpen = () => {
    // Profile photo, firstname and lastname
    setErrors({ firstname: null, lastname: null });
    setOpen(true);
  };

  const handleClickOpen1 = () => {
    // Video, title and description
    setOpen1(true);
  };

  const handleClickOpen2 = () => {
    // Portfolio
    setOpen2(true);
  };

  const handleClickOpen3 = () => {
    // Language
    setOpen3(true);
  };

  const handleClickOpen4 = () => {
    // Availability
    setOpen4(true);
  };

  const handleClickOpen5 = () => {
    // Mode of Communication
    setOpen5(true);
  };

  const handleClose = () => {
    // Profile photo, firstname and lastname
    setOpen(false);
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setProfileImage(user?.profile_img);
    setSelectedFile();
    setProfileStatus(user?.profile_status);
    setDoCrop(false);
    // setAvailability(user?.availability);
    setErrors({ firstname: null, lastname: null });
  };

  const handleClose1 = () => {
    // Video, title and description
    setOpen1(false);
    setProfileTitle(user?.profile_title);
    setProfileDescription(user?.profile_description);
    setPortfolio(user?.portfolio);
    setProfileVideo(user?.video);
    setSelectedVideo();
    setErrors({ firstname: null, lastname: null });
  };

  const handleClose2 = () => {
    // Portfolio
    setOpen2(false);
    setPortfolio(user?.portfolio);
    setErrors({ firstname: null, lastname: null });
  };

  const handleClose3 = () => {
    // Language
    setOpen3(false);
    // setLanguages()
    setErrors({ firstname: null, lastname: null });
  };

  const handleClose4 = () => {
    // Availability
    setOpen4(false);
    setErrors({ firstname: null, lastname: null });
  };

  const handleClose5 = () => {
    // Mode of Communication
    setOpen5(false);
    setErrors({ firstname: null, lastname: null });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [profile_status, setProfileStatus] = useState("1");
  const [modeOfComm, setModeOfComm] = useState("0");

  const [profile_img, setProfileImage] = useState("");
  const [profile_description, setProfileDescription] = useState();
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [profile_title, setProfileTitle] = useState([]);
  const [profileVideo, setProfileVideo] = useState("");
  const [portfolio, setPortfolio] = useState([]);

  const [removeVideo, setRemoveVideo] = useState(false);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [imageChanged, setImageChanged] = useState(false);
  const [videoChanged, setVideoChanged] = useState(false);
  const [portfolioChanged, setPortfolioChanged] = useState(false);
  const [videoData, setVideoData] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState([]);

  const [doCrop, setDoCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [currentCroppedImage, setCurrentCroppedImage] = useState(null);
  const [rotation, setRotation] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [updateButtonClick, setUpdateButtonClick] = useState(false);

  const [formLanguages, setFormLanguages] = useState([
    { languages: "", proficiency: "" },
  ]);

  const [errors, setErrors] = useState({
    firstname: null,
    lastname: null,
  });

  const {
    user,
    successDetails,
    loading: userDetailsLoading,
  } = useSelector((state) => state.userDetailsReducer);

  const { userData } = useSelector((state) => state.authReducer);
  const { successUpdate } = useSelector((state) => state.UpdateProfileReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handler = () => {
      setIsOpenStatus(false);
      setIsOpenComm(false);
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

  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      // setSaveLoading(true);
      setTimeout(() => {
        setSaveLoading(false);
        swal({
          title: "Successfully Complete",
          text: "Profile updated successfully",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
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
      setPortfolio(user.portfolio);
      setProfileStatus(user.profile_status);
      setModeOfComm(user.preferred_communication_mode);
      // setAvailability(user.availability);
      // setLanguages(user.languages);
      // setProficiency(user.proficiency);
    }
  }, [dispatch, userData, user, successDetails, successUpdate]);

  // useEffect(() => {
  //   const refreshStorage = localStorage.getItem("reloadAfterPageLoad");
  //   // console.log("refreshStorage--", refreshStorage);

  //   if (refreshStorage) {
  //     setTimeout(() => {
  //       swal({
  //         title: "Successfully Complete",
  //         text: "Profile updated successfully",
  //         className: "successAlert",
  //         icon: "/img/SuccessAlert.png",
  //         buttons: false,
  //         timer: 1500,
  //       });
  //       localStorage.removeItem("reloadAfterPageLoad");
  //     }, 1000);
  //   }

  //   if (
  //     !user ||
  //     !user.first_name ||
  //     successUpdate ||
  //     userData.user.user_id !== user.id
  //   ) {
  //     dispatch({ type: USER_UPDATE_PROFILE_RESET });
  //     dispatch(getUserDetails());
  //   } else {
  //     setUsername(user.username);
  //     setEmail(user.email);
  //     setFirstName(user.first_name);
  //     setLastName(user.last_name);
  //     setProfileImage(user.profile_img);
  //     setProfileTitle(user.profile_title);
  //     setProfileDescription(user.profile_description);
  //     setProfileVideo(user.video);
  //     setPortfolio(user.portfolio);
  //     setProfileStatus(user.profile_status);
  //     // setAvailability(user.availability);
  //     // setLanguages(user.languages);
  //     // setProficiency(user.proficiency);
  //   }
  // }, [dispatch, userData, user, successDetails, successUpdate]);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      firstname: validations.firstName(firstname),
      lastname: validations.lastName(lastname),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }

    // if (errors) return;
    handleClose(e);
    submitHandler(e);
  };

  const submitHandler = async (e) => {
    const formData = new FormData();

    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("profile_description", profile_description);
    formData.append("profile_title", profile_title);
    formData.append("profile_status", profile_status);
    formData.append("preferred_communication_mode", modeOfComm);

    for (const key of Object.keys(portfolio)) {
      formData.append("portfolio", portfolio[key]);
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
      console.log("here");
      formData.append("video", profileVideo);
    }

    if (removeVideo) {
      if (videoChanged) {
        formData.append("video", profileVideo);
      } else {
        formData.append("remove_video", 1);
      }
    }

    // formData.append("availability", availability);
    // formData.append("languages", languages);

    const updateProfileUser = dispatch(updateProfile(formData));

    setSelectedVideo();
    setRemoveVideo(false);
    setShowMoreDesc(false);
    setRemoveProfileImage(false);
    setImageChanged(false);
    setVideoChanged(false);
    setPortfolioChanged(false);
    setDoCrop(false);

    setSaveLoading(true);

    // navigate("/profile-dev?update=success");

    // localStorage.setItem("reloadAfterPageLoad", true);

    // window.location.reload();

    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${userData.token}`,
    //   },
    // };

    // const update = await axios
    //   .post(`${BACKEND_API_URL}edit-profile/`, formData, config)
    //   .then((res) => {
    //     swal({
    //       title: "Successfully Complete",
    //       text: "Profile updated successfully",
    //       className: "successAlert",
    //       icon: "/img/SuccessAlert.png",
    //       buttons: false,
    //     });

    //     // console.log("response--", res.data);
    //     localStorage.setItem("userData", JSON.stringify(res.data));

    //     setImageChanged(false);
    //     setRemoveProfileImage(false);
    //     setVideoChanged(false);
    //     setCroppedImage(null);

    //     dispatch({
    //       type: USER_LOGIN_SUCCESS,
    //       payload: res.data,
    //     });

    //     setSuccessRefresh(true);

    //     // setTimeout(() => {
    //     //   // location.reload();
    //     //   window.location.reload();
    //     // }, 1000);
    //   })
    //   .catch((err) => {
    //     swal({
    //       title: "Error",
    //       text: err.response.data.message,
    //       className: "errorAlert",
    //       icon: "/img/ErrorAlert.png",
    //       buttons: false,
    //     });
    //   });
  };

  const removeSelectedImage = () => {
    setSelectedFile();
    setProfileImage(user?.profile_img);
  };

  const removeSelectedVideo = () => {
    setSelectedVideo();
    setProfileVideo(user?.video);
  };

  const removeDatabaseImage = () => {
    setRemoveProfileImage(true);
  };

  const removeDatabaseVideo = () => {
    setRemoveVideo(true);
  };

  const maxImageFileSize = 2097152;

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    // CHECK FILE TYPE
    if (!file.type.match(imageMimeType)) {
      swal({
        title: "Error",
        text: "Image type is not valid",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 1500,
      });
      return;
    }
    // MAX FILE SIZE == 2mb
    if (file?.size > maxImageFileSize) {
      swal({
        title: "Error",
        text: "Max file size allowed is 2mb",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 1500,
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

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const maxVideoFileSize = 52428800;

  const onChangeVideo = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(videoMimeType)) {
      swal({
        title: "Error",
        text: "Video type is not valid",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 1500,
      });
      return;
    }
    // MAX FILE SIZE == 50mb
    if (file?.size > maxVideoFileSize) {
      swal({
        title: "Error",
        text: "Max file size allowed is 50mb",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 1500,
      });
      return;
    }
    if (e.target.files[0]) {
      setVideoChanged(true);
      setSelectedVideo(e.target.files[0]);
      setProfileVideo(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setVideoData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const videoMimeType = /video\/(mp4)/i;

  const handlePortfolio = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      if (!e.target.files[i].type.match(imageMimeType)) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });

        return;
      }
      if (e.target.files[i].size > maxImageFileSize) {
        swal({
          title: "Error",
          text: "Image type is not valid",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });

        return;
      }
    }

    if (e.target.files.length > 10) {
      swal({
        title: "Error",
        text: "You can upload a maximum of 10 images",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 1500,
      });
      return;
    }

    setPortfolioChanged(true);
    var previewImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      previewImages.push(URL.createObjectURL(e.target.files[i]));
      setSelectedPortfolio((prevState) => [
        ...prevState,
        URL.createObjectURL(e.target.files[i]),
      ]);
      setPortfolio((prevState) => [...prevState, e.target.files[i]]);
    }
  };

  const removePortfolioImage = (e, v) => {
    if (v === "data") {
      setPortfolio(portfolio.filter((el, i) => i !== e));
      return;
    }
    if (v === "new") {
      setSelectedPortfolio(selectedPortfolio.filter((el, i) => i !== e));
      return;
    }
    setPortfolio(portfolio.filter((el, i) => i !== e));
    setSelectedPortfolio(selectedPortfolio.filter((el, i) => i !== e));
    return;
  };

  let handleChangeLanguage = (i, e) => {
    let newFormValues = [...formLanguages];
    newFormValues[i][e.target.name] = e.target.value;
    setFormLanguages(newFormValues);
  };

  let addFormFieldsLanguage = () => {
    if (formLanguages.length < 3) {
      setFormLanguages([...formLanguages, { languages: "", proficiency: "" }]);
    }
  };

  let removeFormFieldsLanguage = (i) => {
    let newFormValues = [...formLanguages];
    newFormValues.splice(i, 1);
    setFormLanguages(newFormValues);
  };

  let handleSubmitLanguage = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formLanguages));
  };

  /*************** SLIDER STARTS ****************/
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  // console.log(user);
  const portfolio_items = [];
  if (user?.portfolio) {
    user?.portfolio.map((p_row, e) =>
      portfolio_items.push({ image: p_row.portfolio_images })
    );
  }
  /*************** SLIDER ENDS ****************/

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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
      setImageChanged(true);
      // setCurrentCroppedImage(URL.createObjectURL(croppedImage));
      setSelectedFile(URL.createObjectURL(croppedImage));
      setProfileImage(croppedImage);
      setDoCrop(false);
    } catch (e) {
      console.error(e);
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

  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }

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

  const showmoreDescription = () => {
    setShowMoreDesc(!showMoreDesc);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {/* {isLoading && <LoadingSpinner />} */}
      {saveLoading && <LoadingSpinner />}
      {/* {userDetailsLoading && <LoadingSpinner />} */}
      <div className=" margin_autoprpfiletopdiv">
        <div className="CategorylistName ml-15">
          <div className="ProfileTitle">
            <h1>Profile Page</h1>
          </div>
        </div>
      </div>
      <div className="profilepage">
        <div className="left-side-content">
          <div className="circle-img">
            {user?.profile_img ? (
              <div className="userprofileimg">
                <img src={user?.profile_img} className="circle-profileImg" />
              </div>
            ) : (
              <div>No image</div>
            )}
            <img
              onClick={handleClickOpen}
              src="/img/editicon.png"
              style={{ cursor: "pointer", position: "absolute" }}
              className="editicon profilepic-dialog editiconnewclass"
              alt=""
            />
            <Dialog
              className="profileImgDialog"
              open={open}
              onClose={handleClose}
            >
              <DialogTitle className="profileImgHeading">
                Profile Information{" "}
                <span onClick={handleClose}>
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
                        className="editicon profilepic-dialog-button"
                        src="/img/delet.png"
                        hidden={doCrop}
                        alt=""
                        onClick={removeSelectedImage}
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
                            className="profilepic-dialog-del"
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
                      <label className="upload-profileImg" htmlFor="upload">
                        {" "}
                        <img
                          src="/img/editicon.png"
                          style={{ cursor: "pointer" }}
                          className="editicon profilepic-dialog-button"
                          alt=""
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <div style={{ marginBottom: "30px" }}>
                        <span>No image</span>
                      </div>
                      <label className="upload-profileImg" htmlFor="upload">
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
                  <label
                    className={
                      errors.firstname
                        ? "upload-profileImg error profile_info"
                        : "upload-profileImg profile_info"
                    }
                    htmlFor="first_name"
                  >
                    <div className="profileinp">
                      <h5>First Name</h5>
                      <input
                        value={firstname}
                        id="first_name"
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
                    <div className="profileinp">
                      <h5>Last Name</h5>
                      <input
                        value={lastname}
                        id="last_name"
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

                  <div>
                    <label
                      className={"upload-profileImg profile_info"}
                      htmlFor="last_name"
                    >
                      <div className="profileinp">
                        <h5 className="">Status: </h5>
                        <Select
                        className={
                          profile_status === "null"
                          ? "selectinputcolor"
                          : "menuiteminputcolor"
                          } 
                          value={profile_status}
                          open={isOpenStatus}
                          onOpen={() => {
                            setIsOpenStatus(true);
                          }}
                          onClose={() => {
                            setIsOpenStatus(false);
                          }}
                          MenuProps={menuProps}
                          id="status"
                          onChange={(e) => {
                            // setProfileStatus(e.target.value);
                            setProfileStatus(e.target.value);
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value=""> Select Status </MenuItem>
                          <MenuItem value="0">Away</MenuItem>
                          <MenuItem value="1">Online</MenuItem>
                          <MenuItem value="2">Offline</MenuItem>
                        </Select>
                      </div>
                    </label>
                  </div>
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={handleClose}>Cancel</Button> */}
                  <Button
                    className="save_profilepic"
                    hidden={doCrop}
                    onClick={(e) => {
                      !errors && handleClose(e);
                      validateSubmit(e);
                      setUpdateButtonClick(true);
                    }}
                  >
                    Save
                  </Button>
                </DialogActions>
              </div>
            </Dialog>
            <h3>
              {user?.first_name} {user?.last_name}
            </h3>
            <div className="location-country">
              <p>
                <i className="fa-solid fa-location-dot"></i>United States
              </p>
            </div>
            {user?.profile_status == 0 ? (
              <div className="away-icon">
                <p>
                  <i className="fa-solid fa-circle"></i>Away
                </p>
              </div>
            ) : user?.profile_status == 2 ? (
              <div className="offline-icon">
                <p>
                  <i className="fa-solid fa-circle"></i>
                  Offline
                </p>
              </div>
            ) : (
              <div className="online-icon">
                <p>
                  <i className="fa-solid fa-circle"></i>
                  Online
                </p>
              </div>
            )}
            {/* <div className="online-icon">
              <p>
                <i className="fa-solid fa-circle"></i>Online
              </p>
            </div> */}
            <div className="button">
              <button className="btncontact tablet-v">Contact Me</button>
            </div>
            <div className="hourly-earned">
              <div className="hourly-rate">
                <h3>$20</h3>
                <p>Hourly Rate</p>
              </div>
              <div className="total-earned">
                <h3>$10k+</h3>
                <p>Total Earned</p>
              </div>
            </div>
          </div>
          <div className="verification">
            <h3>
              Verifications
              <img
                onClick={handleClickOpen3}
                src="/img/editicon.png"
                style={{ cursor: "pointer", position: "absolute" }}
                className="editicon profile-dialog"
                alt=""
              />
            </h3>
            {/* </div> */}
            <Dialog
              className="profileImgDialog"
              open={open3}
              onClose={handleClose3}
            >
              <DialogTitle className="profileImgHeading">
                Profile Information{" "}
                <span onClick={handleClose3}>
                  <i className="fa-solid fa-circle-xmark"></i>
                </span>
              </DialogTitle>
              <div className="dialogcontent_and_actions">
                <DialogContent className="portfolio_content">
                  {formLanguages
                    .filter((item, idx) => idx < 3)
                    .map((element, index) => (
                      <div className="form-inline" key={index}>
                        <div className="Languageinput">
                          <label className="languageslabel">Language</label>
                          <input
                            type="text"
                            name="languages"
                            value={element.languages || ""}
                            onChange={(e) => handleChangeLanguage(index, e)}
                          />
                        </div>
                        <div className="Languageinput">
                          <label className="languageslabel">Proficiency</label>
                          <Select
                          className={
                            element.proficiency === "null"
                            ? "selectinputcolor"
                            : "menuiteminputcolor"
                            }                           
                            name="proficiency"
                            value={element.proficiency || ""}
                            id="proficiency"
                            onChange={(e) => handleChangeLanguage(index, e)}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value=""> Select Proficiency</MenuItem>
                            <MenuItem value="1">Fluent</MenuItem>
                            <MenuItem value="2">Basic</MenuItem>
                          </Select>
                        </div>
                        <div className="faminuslan">
                          {index ? (
                            <i
                              className="fa-solid fa-circle-minus"
                              onClick={() => removeFormFieldsLanguage(index)}
                            ></i>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  <div className="button-section">
                    <i
                      hidden={formLanguages.length >= 3}
                      className="fa-solid fa-circle-plus"
                      onClick={() => addFormFieldsLanguage()}
                    ></i>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    className="save_profilepic"
                    onClick={(e) => {
                      handleClose3(e);
                      validateSubmit(e);
                      handleSubmitLanguage(e);
                      // setUpdateButtonClick(true);
                    }}
                  >
                    Save
                  </Button>
                </DialogActions>
              </div>
            </Dialog>
            <p>
              Phone Number<i className="fa-solid fa-circle-check"></i>
              <span>Verified</span>
            </p>
          </div>
          <div className="language">
            <h3>Language</h3>
            <p>
              English<span>Fluent</span>
            </p>
            <p>
              German<span>Basic</span>
            </p>
            <p>
              French<span>Basic</span>
            </p>
          </div>
          <div className="prefmodeofcommunication">
            <h3>
              Preferred Communication
              <img
                onClick={handleClickOpen5}
                src="/img/editicon.png"
                style={{ cursor: "pointer", position: "absolute" }}
                className="editicon profile-dialog"
                alt=""
              />
              <Dialog
                className="profileImgDialog"
                open={open5}
                onClose={handleClose5}
              >
                <DialogTitle className="profileImgHeading">
                  Profile Information{" "}
                  <span onClick={handleClose5}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </span>
                </DialogTitle>
                <div className="dialogcontent_and_actions">
                  <DialogContent className="portfolio_content">
                    <div className="profilePrefModeOfComm">
                      <h5>Preferred Mode of Communication: </h5>
                      <Select
                      className={
                        modeOfComm === "null"
                        ? "selectinputcolor"
                        : "menuiteminputcolor"
                        }                    
                        value={modeOfComm}
                        open={isOpenComm}
                        onOpen={() => {
                          setIsOpenComm(true);
                        }}
                        onClose={() => {
                          setIsOpenComm(false);
                        }}
                        MenuProps={menuProps}
                        id="prefmodeofcomm"
                        onChange={(e) => {
                          setModeOfComm(e.target.value);
                        }}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value=""> Select one option </MenuItem>
                        <MenuItem value="0">Email</MenuItem>
                        <MenuItem value="1">Whatsapp</MenuItem>
                        <MenuItem value="2">Skype</MenuItem>
                        <MenuItem value="3">Direct Message</MenuItem>
                      </Select>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      className="save_profilepic"
                      onClick={(e) => {
                        handleClose5(e);
                        validateSubmit(e);
                        // handleSubmitLanguage(e);
                        // setUpdateButtonClick(true);
                      }}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
            </h3>
            {/* <p>Email</p> */}
            <p>
              {user?.preferred_communication_mode == 1
                ? "Whatsapp"
                : user?.preferred_communication_mode == 2
                ? "Instagram"
                : user?.preferred_communication_mode == 3
                ? "Facebook"
                : user?.preferred_communication_mode == 4
                ? "LinkedIn"
                : "Email"}
            </p>
          </div>
          <div className="availability">
            <h3>
              Availability
              <img
                onClick={handleClickOpen4}
                src="/img/editicon.png"
                style={{ cursor: "pointer", position: "absolute" }}
                className="editicon profile-dialog"
                alt=""
              />
              <p>
                Per Week:<span>As Needed</span>
              </p>
            </h3>
            {/* </div> */}
            <div className="avail-popup">
              <Dialog
                className="profileImgDialog"
                open={open4}
                onClose={handleClose4}
              >
                <DialogTitle className="profileImgHeading">
                  Profile Information{" "}
                  <span onClick={handleClose4}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </span>
                </DialogTitle>
                <div className="dialogcontent_and_actions">
                  <DialogContent className="portfolio_content ProfileInformation">
                    <form className="profiledesign">
                      <h4 className="availabilitytext">Select Availability</h4>{" "}
                      {/* <li>
                      <label for ="myRadioID" className="radio" >
                      <input
                      checked={toggleClass}
                      onChange={() => setToggleClass(!toggleClass)}

                        type="radio"
                        id="myRadioID"
                        name="fav_language"
                        value="per_week"
                        className="radio__input"
                      />
                      <div className={!toggleClass ? "radio__radio toggleClassHandler" : "radio__radio"} ></div>
                      </label>
                      Per Week: As Needed
                      <label for="per_week" selected>
                        
                      </label>
                    </li> */}
                      {/* <li>
                      <label for ="myRadioID1" className="radio_sec">
                      <input
                      checked={toggleClass1}
                      onChange={() => setToggleClass1(!toggleClass1)}

                        type="radio"
                        id="myRadioID1"
                        name="fav_language"
                        value="CSS"
                        className="csscustam"
                      />
                      <div className={!toggleClass1 ? "radio__css toggleClassHandler" : "radio__css"}  ></div>
                       <div className="radio__css"></div> 
                      </label>
                      CSS
                      <label for="css">CSS</label>
                    </li> */}
                      {/* <li>
                    <label for ="javascript" className="radio_sec_sec ">
                      <input
                      checked={toggleClass2}
                      onChange={() => setToggleClass2(!toggleClass2)}
                        type="radio"
                        id="javascript"
                        name="fav_language"
                        value="JavaScript"
                        className="radio__input_input"
                      />
                     <div className={!toggleClass2 ? "radio__css_css toggleClassHandler" : "radio__css_css"}   ></div>
                       <div className="radio__css_css"></div> 
                      </label>
                      JavaScript
                       <label for="javascript">JavaScript</label>
                    </li> */}
                      <div className="container1">
                        <div className="radio">
                          <input id="radio-1" name="radio" type="radio" />
                          <label for="radio-1" className="radio-label">
                            Per Week: As Needed
                          </label>
                        </div>

                        <div className="radio">
                          <input id="radio-2" name="radio" type="radio" />
                          <label for="radio-2" className="radio-label">
                            CSS
                          </label>
                        </div>

                        <div className="radio">
                          <input id="radio-3" name="radio" type="radio" />
                          <label for="radio-3" className="radio-label">
                            JavaScript
                          </label>
                        </div>
                      </div>
                    </form>
                  </DialogContent>
                  <DialogActions className="saveprofilebtn_1">
                    {/* <Button onClick={handleClose}>Cancel</Button> */}
                    <Button
                      className="save_profilepic ProfileInformationsave"
                      onClick={(e) => {
                        handleClose4(e);
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
          </div>
        </div>
        <div className="right-side-content">
          <div className="right-side-h">
            <h3>
              {user?.profile_title ? (
                user?.profile_title
              ) : (
                <span>No profile title</span>
              )}{" "}
              <img
                onClick={handleClickOpen1}
                src="/img/editicon.png"
                style={{ cursor: "pointer", position: "absolute" }}
                className="editicon profile-dialog"
                alt=""
              />
            </h3>
            <Dialog open={open1} onClose={handleClose1}>
              <DialogTitle className="profileImgHeading">
                Profile Details{" "}
                <span onClick={handleClose1}>
                  <i className="fa-solid fa-circle-xmark"></i>
                </span>
              </DialogTitle>
              <div className="dialogcontent_and_actions">
                <DialogContent className="profile_title_description">
                  <label className="upload-profileImg" htmlFor="upload">
                    <p>
                      Profile Video{" "}
                      {selectedVideo ? (
                        <>
                          {/* selectedVideo */}
                          <img
                            className="editicon profile-dialog"
                            src="/img/delet.png"
                            alt=""
                            onClick={removeSelectedVideo}
                          />
                          <ReactPlayer
                            width="100%"
                            // height="100%"
                            controls
                            url={URL.createObjectURL(selectedVideo)}
                            // onReady={() => console.log("onReady callback")}
                            // onStart={() => console.log("onStart callback")}
                            // onPause={() => console.log("onPause callback")}
                            // onEnded={() => console.log("onEnded callback")}
                            // onError={() => console.log("onError callback")}
                          />
                        </>
                      ) : user?.video ? (
                        <>
                          {/* uservideo */}
                          <img
                            src="/img/editicon.png"
                            style={{ cursor: "pointer" }}
                            className="editicon profile-dialog"
                            alt=""
                          />
                          {!removeVideo && (
                            <>
                              <img
                                className="editicon profile-dialog"
                                src="/img/delet.png"
                                alt=""
                                onClick={removeDatabaseVideo}
                              />
                              <ReactPlayer
                                width="100%"
                                // height="100%"
                                controls
                                url={user?.video}
                                // onReady={() => console.log("onReady callback")}
                                // onStart={() => console.log("onStart callback")}
                                // onPause={() => console.log("onPause callback")}
                                // onEnded={() => console.log("onEnded callback")}
                                // onError={() => console.log("onError callback")}
                              />
                            </>
                          )}
                          {removeVideo && (
                            <div style={{ margin: "10px" }}>
                              No profile video
                            </div>
                          )}
                          {/* {profileVideo && (
                          <>
                            <img
                              className="editicon profile-dialog"
                              src="/img/delet.png"
                              alt=""
                              onClick={removeDatabaseVideo}
                            />
                            <ReactPlayer
                              width="100%"
                              // height="100%"
                              controls
                              url={profileVideo}
                              // onReady={() => console.log("onReady callback")}
                              // onStart={() => console.log("onStart callback")}
                              // onPause={() => console.log("onPause callback")}
                              // onEnded={() => console.log("onEnded callback")}
                              // onError={() => console.log("onError callback")}
                            />
                          </>
                        )}
                        {!profileVideo && (
                          <div style={{ margin: "10px" }}>No profile video</div>
                        )} */}
                        </>
                      ) : (
                        <>
                          <img
                            src="/img/editicon.png"
                            style={{ cursor: "pointer" }}
                            className="editicon profile-dialog"
                            alt=""
                          />
                          <div style={{ margin: "10px" }}>No profile video</div>
                        </>
                      )}
                    </p>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      onChangeVideo(e);
                    }}
                    hidden
                    alt="ProfileVideo"
                    id="upload"
                  />
                  <label
                    className="upload-profileImg"
                    htmlFor="profile_description"
                  >
                    <p>Profile title</p>
                    <input
                      maxlength="50"
                      value={profile_title}
                      id="profile_title"
                      type="text"
                      onChange={(e) => {
                        setProfileTitle(e.target.value);
                      }}
                    />
                  </label>

                  <label
                    className="upload-profileImg"
                    htmlFor="profile_description"
                  >
                    <p>Profile description</p>
                    <textarea
                      // maxlength="300"
                      value={profile_description}
                      id="profile_description"
                      onChange={(e) => {
                        setProfileDescription(e.target.value);
                      }}
                    />
                  </label>
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={handleClose1}>Cancel</Button> */}
                  <Button
                    className="save_profilepic videoProfile"
                    onClick={(e) => {
                      handleClose1(e);
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
          <div className="paragraph-image">
            <div className="paragraph-p">
              {/* if no profile description  */}
              {!user?.profile_description ? (
                <span>No profile descripiton</span>
              ) : user?.profile_description.length > 300 ? (
                <>
                  {/* if length > 300 then substring and add button for description */}
                  {showMoreDesc ? (
                    <>
                      <p>{user?.profile_description}</p>
                      <button type="button" onClick={showmoreDescription}>
                        Read less
                      </button>
                    </>
                  ) : (
                    <>
                      <p id="div3">
                        {user?.profile_description.substring(0, 300) + "..."}
                      </p>
                      <button type="button" onClick={showmoreDescription}>
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
            <div className="image-i">
              {user?.video ? (
                <ReactPlayer
                  width="100%"
                  // height="100%"
                  controls
                  url={user?.video}
                  // onReady={() => console.log("onReady callback")}
                  // onStart={() => console.log("onStart callback")}
                  // onPause={() => console.log("onPause callback")}
                  // onEnded={() => console.log("onEnded callback")}
                  // onError={() => console.log("onError callback")}
                />
              ) : (
                <div style={{ margin: "10px" }}>No profile video</div>
              )}
            </div>
          </div>
          <div className="profile-portfolio">
            <h3>
              Portfolio{" "}
              <img
                onClick={handleClickOpen2}
                src="/img/editicon.png"
                style={{ cursor: "pointer", position: "absolute" }}
                className="editicon profile-dialog"
                alt=""
              />
            </h3>
          </div>
          <div className="port-main">
            <Dialog
              className="profileImgDialog"
              open={open2}
              onClose={handleClose2}
            >
              <DialogTitle className="profileImgHeading">
                Portfolio{" "}
                <span onClick={handleClose2}>
                  <i className="fa-solid fa-circle-xmark"></i>
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
                  <label className="upload port" htmlFor="upload-port">
                    {" "}
                    <img
                      className="mr-2"
                      src={process.env.PUBLIC_URL + "/img/upload.png"}
                      alt=""
                    />
                    Attach Files
                  </label>
                  <div className="port-images">
                    {portfolio &&
                      portfolio?.map((item, index) => (
                        <div className="port-single" key={index}>
                          <img
                            style={{ maxWidth: "100px", margin: "5px" }}
                            src={`${BACKEND_API_URL}media/${item.portfolio_images}`}
                          />
                          <span
                            index={index}
                            className="overlayasdasd"
                            onClick={() => removePortfolioImage(index, "data")}
                          >
                            <Link
                              to=""
                              className="icon_asdsdasd"
                              title="Remove"
                            >
                              <i className="fa-solid fa-circle-xmark"></i>
                            </Link>
                          </span>
                        </div>
                      ))}
                    {selectedPortfolio &&
                      selectedPortfolio?.map((item, index) => (
                        <div className="port-single" key={index}>
                          <img
                            style={{ maxWidth: "100px", margin: "5px" }}
                            src={item}
                          />
                          <span
                            index={index}
                            className="overlayasdasd"
                            onClick={() => removePortfolioImage(index, "new")}
                          >
                            <Link
                              to=""
                              className="icon_asdsdasd"
                              title="Remove"
                            >
                              <i className="fa-solid fa-circle-xmark"></i>
                            </Link>
                          </span>
                        </div>
                      ))}
                  </div>
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={handleClose}>Cancel</Button> */}
                  <Button
                    className="save_profilepic PortfolioimgBtn"
                    onClick={(e) => {
                      handleClose2(e);
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

          <div className="portfolio-slider-images">
            {user?.portfolio?.length < 1 ? (
              <span className="port-img-1">No images</span>
            ) : (
              <Carousel
                swipeable={true}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={8000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {portfolio_items.map((portfolio_item, i) => (
                  <>
                    <div>
                      <img
                        className="portfolio_item_image"
                        src={`${BACKEND_API_URL}media/${portfolio_item.image}`}
                        alt="First slide"
                      />
                    </div>
                  </>
                ))}
              </Carousel>
            )}
          </div>

          {/* {JSON.stringify(user?.portfolio)} */}
          {/* <div className="portfolio-images"> */}
          {/* {profile_img?.map((item) => (
              <div className="port-img-1">
                <img src={item.src} />
              </div>
            ))} */}
          {/* {!user?.portfolio ? (
              <div className="port-img-1">No images</div>
            ) : (
              <>
                {user?.portfolio?.map((item, index) => (
                  <div className="port-img-1" key={index}>
                    <img
                      src={`${BACKEND_API_URL}media/${item.portfolio_images}`}
                    />
                  </div>
                ))}
              </>
            )} */}

          {/* {user?.portfolio?.length <= 4 &&
              user?.portfolio?.length > 0 &&
              user?.portfolio?.map((item, index) => (
                <div className="port-img-1" key={index}>
                  <img
                    src={`${BACKEND_API_URL}media/${item.portfolio_images}`}
                  />
                </div>
              ))} */}
          {/* <Carousel>
              {user?.portfolio?.length > 4 &&
                user?.portfolio?.map((item, index) => (
                  <Carousel.Item key={index} interval={3000}>
                    <Stack
                      direction="horizontal"
                      className="h-100 justify-content-center align-items-center"
                      gap={4}
                      key={index}
                    >
                      <Card>
                        <img
                          style={{ maxWidth: "200px" }}
                          className="d-block w-100"
                          src={`${BACKEND_API_URL}media/${item.portfolio_images}`}
                          alt="First slide"
                        />
                      </Card>
                      <Card>
                        <img
                          style={{ maxWidth: "200px" }}
                          className="d-block w-100"
                          src={`${BACKEND_API_URL}media/${item.portfolio_images}`}
                          alt="First slide"
                        />
                      </Card>
                      <Card>
                        <img
                          style={{ maxWidth: "200px" }}
                          className="d-block w-100"
                          src={`${BACKEND_API_URL}media/${item.portfolio_images}`}
                          alt="First slide"
                        />
                      </Card>
                      <Card>
                        <img
                          style={{ maxWidth: "200px" }}
                          className="d-block w-100"
                          src={`${BACKEND_API_URL}media/${item.portfolio_images}`}
                          alt="First slide"
                        />
                      </Card>
                    </Stack>
                  </Carousel.Item>
                ))}
            </Carousel> */}
          {/* </div> */}
          <div className="work-history">
            <h3>Work History</h3>
          </div>

          <div className="five-stars">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className="run-design">
            <h3>Run design campaign for a jewelry business </h3>
            <p>Outstanding results. Helped my business grow. Thank You</p>
          </div>
          <div className="all-amount">
            <div className="thousand-dollars">
              <h3>$1000.0</h3>
            </div>
            <div className="twenty-dollars">
              <h3>$20 Hr</h3>
            </div>
            <div className="fifty-dollars">
              <h3>50 Hrs</h3>
            </div>
          </div>
          <div className="five-stars mt-50">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className="run-design">
            <h3>Run design campaign for a jewelry business </h3>
            <p>Outstanding results. Helped my business grow. Thank You</p>
          </div>
          <div className="all-amount1">
            <div className="thousand-dollars">
              <h3>$1000.0</h3>
            </div>
            <div className="twenty-dollars">
              <h3>$20 Hr</h3>
            </div>
            <div className="fifty-dollars">
              <h3>50 Hrs</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
