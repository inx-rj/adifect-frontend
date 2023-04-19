import {
  Crop,
  DeleteForeverOutlined,
  DriveFileRenameOutlineOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { lastName } from "helper/validations";
import { firstName } from "helper/validations";
import { useCallback, useState } from "react";
import {
  GET_USER_DETAILS,
  TRIGGER_EDIT_USER,
} from "redux/actions/auth/auth.actions";
import {
  GET_USER_DATA,
  GET_USER_PROFILE_DATA,
} from "redux/reducers/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import Cropper from "react-easy-crop";
import swal from "sweetalert";
import { useUpdateEffect } from "react-haiku";
import { Images } from "helper/images";

const EditProfileForm = () => {
  const dispatch = useAppDispatch();

  // Redux State
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const userData = useAppSelector(GET_USER_DATA);

  // -----Edit profile input form start ---------
  const [errors, setErrors] = useState({
    firstname: null,
    lastname: null,
    skills: null,
    profile_title: null,
    sub_title: null,
    website: null,
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState(userProfile?.data?.first_name);
  const [lastname, setLastName] = useState(userProfile?.data?.last_name);

  const [profile_status, setProfileStatus] = useState("1");
  const [modeOfComm, setModeOfComm] = useState("0");
  const [communication, setCommunication] = useState("");
  const [portfolioChanged, setPortfolioChanged] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState([]);
  const [removePortfolio, setRemovePortfolio] = useState([]);
  const [videoChanged, setVideoChanged] = useState(false);
  const [removeVideo, setRemoveVideo] = useState(false);
  const [skills, setSkills] = useState([]);
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  // -------Edit profile input form end -------

  // -------  Profile image state start------------
  const rotation = 0;
  const maxImageFileSize = 2097152;
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [selectedFile, setSelectedFile] = useState(null);
  const [doCrop, setDoCrop] = useState(false);
  const [currentCroppedImage, setCurrentCroppedImage] = useState(null);
  const [profile_img, setProfileImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [profile_title, setProfileTitle] = useState(
    userProfile?.data?.profile_title
  );
  const [sub_title, setsub_title] = useState(userProfile?.data?.sub_title);
  const [website, setWebsite] = useState(userProfile?.data?.website);
  const [profile_description, setProfileDescription] = useState(
    userProfile?.data?.profile_description
  );
  const [portfolio, setPortfolio] = useState([]);
  const [profileVideo, setProfileVideo] = useState("");
  // ---------Profile image state end--------------

  // Get data from redux/API in udpate mode
  useUpdateEffect(() => {
    if (userProfile?.hasData || saveLoading) {
      // setSaveLoading(true);

      setTimeout(() => {
        setSaveLoading(false);
        // setOpen4(false); modal-close
        swal({
          title: "Successfully Complete",
          text: "Profile updated successfully",
          className: "successAlert",
          icon: Images.Logo,
          buttons: { visible: false },
          timer: 5000,
        });
      }, 2500);
    }

    if (
      !userProfile ||
      !userProfile?.data?.first_name ||
      userProfile?.hasData ||
      userProfile?.data?.id !== userData?.data?.user?.user_id
    ) {
      // dispatch(GET_USER_DETAILS());
    } else {
      // user.sub_title == "null" ? "" : user.sub_title;

      setUsername(userData?.data?.user?.name);
      setEmail(userProfile?.data?.email);
      setFirstName(userProfile?.data?.first_name);
      setLastName(userProfile?.data?.last_name);
      setProfileImage(userProfile?.data?.profile_img);
      setCurrentCroppedImage(userProfile?.data?.profile_img);

      setProfileTitle(userProfile?.data?.profile_title);
      setsub_title(userProfile?.data?.sub_title);
      setWebsite(userProfile?.data?.website);

      setProfileDescription(userProfile?.data?.profile_description);
      setProfileVideo(userProfile?.data?.video);
      setPortfolio(userProfile?.data?.Portfolio_user);
      setProfileStatus(userProfile?.data?.profile_status);
      setModeOfComm(userProfile?.data?.preferred_communication_mode);
      setCommunication(userProfile?.data?.preferred_communication_id);
      // setAvailability(user.availability);
      // setLanguages(user.languages);
      // setProficiency(user.proficiency);
    }
  }, [userProfile?.hasData]);

  // Submit profile form
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
        formData.append("remove_image", "1");
      }
    }

    if (videoChanged) {
      formData.append("video", profileVideo);
    }

    if (removeVideo) {
      if (videoChanged) {
        formData.append("video", profileVideo);
      } else {
        formData.append("remove_video", "1");
      }
    }

    for (var i = 0; i < skills.length; i++) {
      formData.append("skills", skills[i].id ? skills[i].id : skills[i]);
    }
    // formData.append("availability", availability);
    // formData.append("languages", languages);
    formData.append("test", "data");
    console.log(formData, "formData");
    dispatch(TRIGGER_EDIT_USER(formData));
    // dispatch(updateProfile(formData));
    // setSelectedVideo();  remove
    setRemoveVideo(false);
    setShowMoreDesc(false);
    setRemoveProfileImage(false);
    setImageChanged(false);
    setVideoChanged(false);
    setPortfolioChanged(false);
    setDoCrop(false);
    setSaveLoading(true);
  };

  // Validate form input
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      firstname: firstName(firstname),
      lastname: lastName(lastname),
    };
    setErrors((prev) => {
      return {
        ...prev,
        firstname: firstName(firstname),
        lastname: lastName(lastname),
      };
    });

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler(e);
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setProfileImage(userProfile?.data?.profile_img);
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const removeDatabaseImage = () => {
    setRemoveProfileImage(true);
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

  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });
  async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image: any = await createImage(imageSrc);
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
  const handleClose3 = () => {
    // Video, title and description
    // setOpen3(false);
    setProfileTitle(userProfile?.data?.profile_title);
    setsub_title(userProfile?.data?.sub_title);
    setWebsite(userProfile?.data?.website);
    setProfileDescription(userProfile?.data?.profile_description);
    setPortfolio(userProfile?.data?.portfolio);
    setProfileVideo(userProfile?.data?.video);
    // setSelectedVideo();
    // setErrors({ firstname: null, lastname: null });
  };
  const showCroppedImage = useCallback(() => {
    try {
      const croppedImage: any = getCroppedImg(
        currentCroppedImage,
        croppedAreaPixels,
        rotation
      );
      console.log("croppedImage", URL.createObjectURL(croppedImage));
      // console.log("donee", croppedImage);
      // setCroppedImage(URL.createObjectURL(croppedImage));
      // setCroppedImage(croppedImage);
      setImageChanged(true);
      setProfileImage(croppedImage);
      setSelectedFile(URL.createObjectURL(croppedImage));
      setDoCrop(false);
      handleClose3();
      setsub_title("");
      // validateSubmit();
      // setUpdateButtonClick(true);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onChangePicture = (e) => {
    const file = e.target.files[0];
    // CHECK FILE TYPE
    if (!file.type.match(imageMimeType)) {
      swal({
        title: "",
        text: "Image type is not valid",
        className: "errorAlert",
        icon: Images.ErrorLogo,
        buttons: { visible: false },
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
        icon: Images.ErrorLogo,
        buttons: { visible: false },
        timer: 5000,
      });
      return;
    }
    if (e.target.files[0]) {
      setImageChanged(true);
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
      console.log("Cropped", URL.createObjectURL(e.target.files[0]));
      setCurrentCroppedImage(URL.createObjectURL(e.target.files[0]));
      setProfileImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="img-profile_wrapper">
        <div className="relative max-w-[120px] w-full mx-auto">
          {selectedFile ? (
            <div className="relative max-w-[120px] w-full mx-auto [&>.delete-icon]:text-[33px]">
              <i className="img img-cover rounded-full w-[120px] h-[120px] mx-auto overflow-hidden block drop-shadow-md border-2 border-white">
                <img
                  src={selectedFile}
                  alt="Thumb"
                  hidden={doCrop}
                  className="profileimgchange"
                />
              </i>
              <DeleteForeverOutlined
                fontSize="inherit"
                className="delete-icon cursor-pointer p-1 text-danger bg-white rounded-full absolute right-0 bottom-[10px] border-2 border-white drop-shadow-md"
                onClick={removeSelectedImage}
              />
              <div className="Cropbtn">
                <button
                  className="Cropbtnnew w-8 h-8 flex-center p-1 text-theme bg-white rounded-full absolute -right-3 bottom-[50px] border-2 border-white drop-shadow-md"
                  type="button"
                  hidden={doCrop}
                  onClick={(e) => setDoCrop(true)}
                >
                  <Crop fontSize="small" />
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
                      <div className="controls-profile-image relative">
                        <label> Zoom </label>
                        <input
                          type="range"
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          aria-labelledby="Zoom"
                          onChange={(e) => {
                            // @ts-ignore
                            setZoom(e.target.value);
                          }}
                          className="zoom-range-profile-image border-t-2 border-b-2 h-[2px] bg-theme"
                        />
                        <Button
                          onClick={() => showCroppedImage}
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
                        setSelectedFile(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : userProfile?.data?.profile_img ? (
            <>
              {!removeProfileImage && (
                <div className="[&>.delete-icon]:text-[33px]">
                  <i className="img img-cover rounded-full w-[120px] h-[120px] mx-auto overflow-hidden block drop-shadow-md border-2 border-white">
                    <img
                      // value={userProfile?.data?.profile_img}
                      src={userProfile?.data?.profile_img}
                      alt="ProfileImgCurrent"
                      id="ProfileImgCurrent"
                      className="profileimgchange"
                    />
                  </i>
                  <label className="upload-profileImg" htmlFor="upload"></label>
                  <DeleteForeverOutlined
                    fontSize="inherit"
                    className="delete-icon cursor-pointer p-1 text-danger bg-white rounded-full absolute right-0 bottom-[10px] border-2 border-white drop-shadow-md"
                    onClick={removeSelectedImage}
                  />
                  <div>
                    <button
                      className="Cropbtnnew w-8 h-8 flex-center text-lg p-1 text-theme bg-white rounded-full absolute -right-3 bottom-[50px] border-2 border-white drop-shadow-md"
                      type="button"
                      hidden={doCrop}
                      onClick={(e) => setDoCrop(true)}
                    >
                      <Crop fontSize="inherit" />
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
                          <div className="controls-profile-image relative">
                            <label> Zoom </label>
                            <input
                              type="range"
                              value={zoom}
                              min={1}
                              max={3}
                              step={0.1}
                              aria-labelledby="Zoom"
                              onChange={(e) => {
                                // @ts-ignore
                                setZoom(e.target.value);
                              }}
                              className="zoom-range-profile-image border-t-2 border-b-2 h-[2px] bg-theme"
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
                            setSelectedFile(null);
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              {removeProfileImage && (
                <div className="mb-5 text-zinc-500">
                  <span>No image</span>
                </div>
              )}
              <label
                className="upload-profileImg leading-[0] p-1 text-[#D99836] bg-white rounded-full absolute right-[35px] -bottom-[10px] border-2 border-white drop-shadow-md w-8 h-8 flex-center text-xl"
                htmlFor="upload"
              >
                {" "}
                <DriveFileRenameOutlineOutlined
                  className="cursor-pointer"
                  fontSize="inherit"
                />
              </label>
            </>
          ) : (
            <div className="flex-center text-zinc-500 gap-2">
              <span>No image</span>
              <label className="upload-profileImg" htmlFor="upload">
                {" "}
                <DriveFileRenameOutlineOutlined
                  fontSize="small"
                  className="cursor-pointer"
                />
              </label>
            </div>
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
        </div>
      </div>
      <div className="form-wrapper grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-10">
        <div className="input-fields-wrapper">
          <label
            className={
              errors.firstname
                ? "upload-profileImg error profile_info upload-profileImgNewpop"
                : "upload-profileImg profile_info"
            }
            htmlFor="first_name"
          >
            <div className="profileinpProfilePop">
              <label>First Name</label>
              <input
                className="input-style"
                value={firstname}
                id="first_namePop"
                type="text"
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors({ ...errors, firstname: null });
                }}
              />
            </div>
            <span className="err-tag">{errors.firstname ?? ""}</span>
          </label>
        </div>
        <div className="input-fields-wrapper">
          <label
            className={
              errors.lastname
                ? "upload-profileImg error profile_info  upload-profileImgNewpop"
                : "upload-profileImg profile_info"
            }
            htmlFor="last_name"
          >
            <div className="profileinpProfilePop">
              <label>Last Name</label>
              <input
                className="input-style"
                value={lastname}
                id="last_namePop"
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors({ ...errors, lastname: null });
                }}
              />
            </div>
            <span className="err-tag">{errors.lastname ?? ""}</span>
          </label>
        </div>

        <div className="input-fields-wrapper">
          <label className="upload-profileImg profile_info" htmlFor="sub_title">
            <div className="profileinpProfilePop">
              <label>Title</label>
              <input
                className="input-style"
                // value={profile_title == null ? "" : profile_title}
                id="sub_title"
                type="text"
                value={sub_title == "null" ? "" : sub_title}
                onChange={(e) => {
                  setsub_title(e.target.value);
                }}
              />
            </div>
            <span className="err-tag">{errors.sub_title ?? ""}</span>
          </label>
        </div>
        <div className="input-fields-wrapper">
          <label
            className="upload-profileImg profile_info"
            htmlFor="profile_title"
          >
            <div className="profileinpProfilePop">
              <label>Sub Title</label>
              <input
                className="input-style"
                value={profile_title == "null" ? "" : profile_title}
                id="profile_title"
                type="text"
                onChange={(e) => {
                  setProfileTitle(e.target.value);
                }}
              />
            </div>

            <span className="err-tag">{errors.profile_title ?? ""}</span>
          </label>
        </div>
        <div className="input-fields-wrapper">
          <label
            className="upload-profileImg profile_info  upload-profileImgNewpop upload-profileImgHalfW"
            htmlFor="last_name"
          >
            <div className="profileinpProfilePop">
              <label className="">Website</label>
              <input
                className="input-style"
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
            <span className="err-tag">{errors.website ?? ""}</span>
          </label>
        </div>
        <div className="input-fields-wrapper col-span-2">
          <label
            className="upload-profileImg  upload-profileImgNewpop upload-profileImgTenPadding"
            htmlFor="profile_description"
          >
            <label className="AddDescriptionLastLine">Add Description</label>
            <textarea
              className="input-style h-auto"
              // maxLength="300"
              value={profile_description}
              rows={5}
              id="profile_descriptionAbout"
              onChange={(e) => {
                setProfileDescription(e.target.value);
              }}
            />
          </label>
        </div>
      </div>
      <Button
        className="save_profilepic"
        hidden={doCrop}
        onClick={(e) => {
          // !errors && handleClose4(e);
          validateSubmit(e);
          // setUpdateButtonClick(true);
        }}
      >
        Save
      </Button>
    </>
  );
};

export default EditProfileForm;
