import React, { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../redux/actions/auth-actions";
import { validations } from "../../utils";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import swal from "sweetalert";
import ReactPlayer from "react-player";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { Stack, Carousel, Card } from "react-bootstrap";
import "react-image-crop/dist/ReactCrop.css";
import Cropper from "react-easy-crop";

export default function Profile() {
  let navigate = useNavigate();

  const [isOpenStatus, setIsOpenStatus] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleClickOpen = () => {
    // Profile photo, firstname and lastname
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

  const handleClose = () => {
    // Profile photo, firstname and lastname
    setOpen(false);
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setProfileImage(user?.profile_img);
    setSelectedFile();
    setRemoveProfileImage(false);
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [profile_status, setProfileStatus] = useState("");

  const [profile_img, setProfileImage] = useState("");
  const [profile_description, setProfileDescription] = useState([]);
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

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [rotation, setRotation] = useState(0);

  const [formLanguages, setFormLanguages] = useState([
    { languages: "", proficiency: "" },
  ]);

  const [successRefresh, setSuccessRefresh] = useState(false);

  const [errors, setErrors] = useState({
    firstname: null,
    lastname: null,
  });

  const { user, successDetails } = useSelector(
    (state) => state.userDetailsReducer
  );
  const { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const handler = () => {
      setIsOpenStatus(false);
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

  useEffect(() => {
    dispatch(getUserDetails());
    if (successDetails) {
      setUsername(user.username);
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setProfileImage(user.profile_img);
      setProfileTitle(user.profile_title);
      setProfileDescription(user.profile_description);
      setProfileVideo(user.video);
      setPortfolio(user.portfolio);
      setProfileStatus(user.profile_status);
      // setAvailability(user.availability);
      // setLanguages(user.languages);
      // setProficiency(user.proficiency);
    }
  }, [successDetails, successRefresh, dispatch]);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      firstname: validations.firstName(firstname),
      lastname: validations.lastName(lastname),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {

      return;
    }
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
    // formData.append("portfolio", portfolio);

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
        formData.append("profile_img", croppedImage, "profileImg.jpeg");
      } else if (imageChanged) {
        formData.append("profile_img", profile_img);
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

    // formData.append("availability", availability);
    // formData.append("languages", languages);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const update = await axios
      .post(`${BACKEND_API_URL}edit-profile/`, formData, config)
      .then((res) => {
        swal({
          title: "Successfully Complete",
          text: "Profile updated successfully",
          className: "successAlert",
          icon: "/img/SuccessAlert.png",
          buttons: false,
        });
        setSuccessRefresh(true);

        // console.log("response--", res.data);
        localStorage.setItem("userData", JSON.stringify(res.data));

        setImageChanged(false);
        setRemoveProfileImage(false);
        setVideoChanged(false);
        setCroppedImage(null);
        navigate("/home");
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message,
          className: "errorAlert",
          icon: "/img/ErrorAlert.png",
          buttons: false,
        });
      });
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

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      swal({
        title: "Error",
        text: "Image type is not valid",
        className: "errorAlert",
        icon: "/img/ErrorAlert.png",
        buttons: false,
      });
      return;
    }
    if (e.target.files[0]) {
      setImageChanged(true);
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
      setProfileImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const onChangeVideo = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(videoMimeType)) {
      swal({
        title: "Error",
        text: "Video type is not valid",
        className: "errorAlert",
        icon: "/img/ErrorAlert.png",
        buttons: false,
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
          icon: "/img/ErrorAlert.png",
          buttons: false,
        });

        return;
      }
    }

    if (e.target.files.length > 10) {
      swal({
        title: "Error",
        text: "You can upload a maximum of 10 images",
        className: "errorAlert",
        icon: "/img/ErrorAlert.png",
        buttons: false,
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
    setFormLanguages([...formLanguages, { languages: "", proficiency: "" }]);
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

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

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

  const showCroppedImage = useCallback(() => {
    try {
      const croppedImage = getCroppedImg(
        selectedFile,
        croppedAreaPixels,
        rotation
      );
      // console.log("donee", croppedImage);
      setCroppedImage(croppedImage);
      setProfileImage(croppedImage);
      setSelectedFile(URL.createObjectURL(croppedImage));
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

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className=" margin_autoprpfiletopdiv">
        <div className="CategorylistName ml-15">
          <div className="ProfileTitle">
            <h1>Profile Page</h1>
          </div>
        </div>
      </div>
      <div className="profilepage profilepagediv1">
        <div className="left-side-content">
          <div className="circle-img">
            {user?.profile_img ? (
              <img src={user?.profile_img} className="circle-profileImg" />
            ) : (
              <div>No image</div>
            )}
            <img
              onClick={handleClickOpen}
              src="/img/editicon.png"
              style={{ cursor: "pointer", position: "absolute" }}
              className="editicon profilepic-dialog"
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
                  <i className="fa-solid fa-circle-xmark"></i>
                </span>
              </DialogTitle>
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
                        hidden={doCrop}
                        onClick={(e) => setDoCrop(true)}
                      >
                        Crop Image
                      </button>
                      {doCrop && (
                        <>
                          <div className="App-profile-image">
                            <div className="crop-container-profile-image">
                              <Cropper
                                image={selectedFile}
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
                        <img
                          className="profilepic-dialog-del"
                          src="/img/delet.png"
                          alt=""
                          onClick={removeDatabaseImage}
                        />
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
                    className={
                      errors.lastname
                        ? "upload-profileImg error profile_info"
                        : "upload-profileImg profile_info"
                    }
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
                    validateSubmit(e);
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <h3>
              {user?.first_name} {user?.last_name}
            </h3>
            <div className="location-country">
              <p>
                <i className="fa-solid fa-location-dot"></i>United States
              </p>
            </div>
            <div className="online-icon">
              <p>
                <i className="fa-solid fa-circle"></i>
                {profile_status == 0
                  ? "Away"
                  : profile_status == 1
                    ? "Online"
                    : "Offline"}
              </p>
            </div>
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
                          // open={isOpenForProficiency}
                          // onOpen={() => {
                          //   setIsOpenForProficiency(true);
                          // }}
                          // onClose={() => {
                          //   setIsOpenForProficiency(false);
                          // }}
                          // MenuProps={menuProps}
                          id="proficiency"
                          onChange={(e) => handleChangeLanguage(index, e)}
                          // onChange={(e) => {
                          //   setProficiency(e.target.value);
                          // }}
                          // disableScrollLock={true}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value=""> Select Proficiency</MenuItem>
                          <MenuItem value="1">Fluent</MenuItem>
                          <MenuItem value="2">Basic</MenuItem>
                        </Select>
                      </div>
                      {index ? (
                        <button
                          type="button"
                          className="button remove"
                          onClick={() => removeFormFieldsLanguage(index)}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  ))}
                <div className="button-section">
                  <button
                    className="button add"
                    type="button"
                    onClick={() => addFormFieldsLanguage()}
                  >
                    Add
                  </button>
                </div>
              </DialogContent>
              <DialogActions>
                {/* <Button onClick={handleClose}>Cancel</Button> */}
                <Button
                  className="save_profilepic"
                  onClick={(e) => {
                    handleClose3(e);
                    validateSubmit(e);
                    handleSubmitLanguage(e);
                  }}
                >
                  Save
                </Button>
              </DialogActions>
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
                <DialogContent className="portfolio_content ProfileInformation">
                  <form className="profiledesign">
                    <h4 className="availabilitytext">Select Availability</h4>{" "}
                    <li>
                      <input
                        type="radio"
                        id="week"
                        name="fav_language"
                        value="per_week"
                      />
                      <label for="per_week" selected>
                        Per Week: As Needed
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="css"
                        name="fav_language"
                        value="CSS"
                      />
                      <label for="css">CSS</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="javascript"
                        name="fav_language"
                        value="JavaScript"
                      />
                      <label for="javascript">JavaScript</label>
                    </li>
                  </form>
                </DialogContent>
                <DialogActions className="saveprofilebtn_1">
                  {/* <Button onClick={handleClose}>Cancel</Button> */}
                  <Button
                    className="save_profilepic ProfileInformationsave"
                    onClick={(e) => {
                      handleClose4(e);
                      validateSubmit(e);
                    }}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="right-side-content">
          <div className="right-side-h">
            <h3>
              {profile_title ? profile_title : <span>No profile title</span>}{" "}
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
              <DialogContent className="profile_title_description">
                <label className="upload-profileImg" htmlFor="upload">
                  <p>
                    Profile Video{" "}
                    {selectedVideo ? (
                      <>
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
                          <div style={{ margin: "10px" }}>No profile video</div>
                        )}
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
                    maxlength="300"
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
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="paragraph-image">
            <div className="paragraph-p">
              <p>
                {!profile_description ? (
                  <span>No profile descripiton</span>
                ) : (
                  profile_description
                )}
              </p>
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
                          <a href="#" className="icon_asdsdasd" title="Remove">
                            <i className="fa-solid fa-circle-xmark"></i>
                          </a>
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
                          <a href="#" className="icon_asdsdasd" title="Remove">
                            <i className="fa-solid fa-circle-xmark"></i>
                          </a>
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
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="portfolio-images">
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
            {/* {JSON.stringify(user?.portfolio[0])} */}
            {user?.portfolio?.length == 0 && (
              <span className="port-img-1">No images</span>
            )}
            {user?.portfolio?.length <= 4 &&
              user?.portfolio?.length > 0 &&
              user?.portfolio?.map((item, index) => (
                <div className="port-img-1" key={index}>
                  <img
                    src={`${BACKEND_API_URL}media/${item.portfolio_images}`}
                  />
                </div>
              ))}
            {/* {JSON.stringify(user?.portfolio)} */}
            <Carousel>
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
            </Carousel>
          </div>
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
