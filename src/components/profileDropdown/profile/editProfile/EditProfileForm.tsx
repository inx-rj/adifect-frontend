import { useCallback, useMemo, useState } from "react";
import MuiPopup from "components/common/muiPopup/MuiPopup";
import { firstName, lastName } from "helper/validations";
import { useAppDispatch, useAppSelector } from "redux/store";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { UserProfileDetailsType } from "helper/types/auth/authType";
import MuiAutoComplete from "components/common/muiAutocomplete/MuiAutoComplete";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import {
  ALL_SKILLS_LIST,
  USER_SKILL_SET_LIST,
} from "redux/reducers/skills/skills.slice";
import { Images } from "helper/images";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import Cropper from "react-easy-crop";
import {
  ChangeImgIntoFile,
  getCroppedImg,
} from "helper/utility/customFunctions";
import { CropImageTypes } from "helper/types/profile/profileTypes";
import swal from "sweetalert";
import { TRIGGER_EDIT_USER } from "redux/actions/auth/auth.actions";
import { ADD_USER_SKILL_SET_LIST } from "redux/actions/skills/skills.action";
import { useDropzone } from "react-dropzone";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { GET_PROFILE_PORTFOLIO } from "redux/reducers/profile/userPortfolio.slice";
import { ROLES } from "helper/config";

const EditProfileForm = ({ openPopup, handlePopup }) => {
  const [userForm, setUserForm] = useState<UserProfileDetailsType>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    profile_title: "",
    sub_title: "",
    website: "",
    profile_status: "",
    preferred_communication_mode: "",
    preferred_communication_id: "",
    portfolio: [],
    remove_portfolio: [],
    profile_img: "",
    profile_changed: "",
    remove_image: "",
    video: [],
    remove_video: "1",
    skills: [],
    profile_description: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    profile_title: "",
    sub_title: "",
    website: "",
    profile_status: "",
    preferred_communication_mode: "",
    preferred_communication_id: "",
    portfolio: [],
    remove_portfolio: [],
    profile_img: "",
    remove_image: "1",
    video: [],
    remove_video: "1",
    skills: [],
    profile_description: "",
  });
  const [searchText, setSearchText] = useState("");
  const maxImageFileSize = 2097152;
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [doCrop, setDoCrop] = useState(false);
  const [crop, setCrop] = useState<CropImageTypes>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Redux State
  const dispatch = useAppDispatch();
  const userSkill = useAppSelector(USER_SKILL_SET_LIST);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const portfolioDetails = useAppSelector(GET_PROFILE_PORTFOLIO);

  const updatedPortfolioDetails = portfolioDetails.data.map((file) => {
    return {
      preview: file.portfolio_images,
      title: file.portfolio_name,
      id: file?.id,
    };
  });
  const userSkillsData = useAppSelector(ALL_SKILLS_LIST);
  const skillsPresent = userSkill?.data?.results.map((item) => {
    return {
      id: item?.skills,
      name: item?.skill_name,
    };
  });

  const storyTagsList = useMemo(() => {
    return userSkillsData?.data
      ?.filter(
        (item) =>
          !userForm?.skills?.some(
            (filterItem) =>
              filterItem.name?.toLowerCase() === item?.skill_name?.toLowerCase()
          )
      )
      ?.map((option) => {
        return {
          id: option?.id,
          name: option?.skill_name,
        };
      });
  }, [userSkillsData?.data, userForm?.skills]);

  useSingleEffect(() => {
    if (skillsPresent.length) {
      setUserForm({
        ...userProfile?.data,
        skills: skillsPresent,
        portfolio: updatedPortfolioDetails,
        remove_portfolio: [],
      });
    } else {
      setUserForm({
        ...userProfile?.data,
        skills: [],
        portfolio: updatedPortfolioDetails,
        remove_portfolio: [],
      });
    }
  });

  useUpdateEffect(() => {
    if (updatedPortfolioDetails) {
      setUserForm({
        ...userForm,
        portfolio: updatedPortfolioDetails,
        remove_portfolio: [],
      });
    }
  }, [portfolioDetails]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  };

  //profile image
  const onChangePicture = (e) => {
    const file = e.target.files[0];
    // CHECK FILE TYPE
    if (!file.type.match(imageMimeType)) {
      swal({
        title: "",
        text: "Image type is not valid",
        className: "errorAlert",
        icon: Images.ErrorLogo,
        buttons: {
          OK: false,
        },
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
        buttons: {
          OK: false,
        },
        timer: 5000,
      });
      return;
    }
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserForm({
        ...userForm,
        profile_img: imageUrl,
        remove_image: "",
        profile_changed: "1",
      });
    }
  };

  const removeImage = () => {
    setUserForm({ ...userForm, profile_img: "", remove_image: 1 });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        userForm?.profile_img,
        croppedAreaPixels
      );
      setUserForm({
        ...userForm,
        profile_img: croppedImage,
        profile_changed: "1",
      });
      setDoCrop(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, userForm?.profile_img]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setUserForm({
        ...userForm,
        portfolio: [
          ...userForm.portfolio,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              title: file.name,
            })
          ),
        ],
      });
    },
    [userForm.portfolio]
  );

  // dropzone
  const {
    getRootProps: getRootProps,
    getInputProps: getInputProps,
    acceptedFiles: acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    minSize: 0,
    onDrop: onDrop,
  });

  const removeFile = (file) => {
    const newFiles = [...userForm.portfolio];
    const removedFile = newFiles.splice(newFiles.indexOf(file), 1);
    const removedFiles = [...userForm?.remove_portfolio, removedFile[0]];
    setUserForm({
      ...userForm,
      portfolio: newFiles,
      remove_portfolio: removedFiles,
    });
  };

  const thumbs = userForm?.portfolio?.map((file) => (
    <div className="relative" key={file["id"]}>
      <img
        className="w-full h-[200px] p-1 rounded-xl"
        src={file["preview"] ?? file.portfolio_images}
        alt="portfolio"
      />
      <span
        //@ts-ignore
        index={file.id}
        className="absolute top-1 right-1 bg-gray-500 text-white rounded-full cursor-pointer"
        onClick={() => removeFile(file)}
      >
        <CancelOutlinedIcon />
      </span>
    </div>
  ));
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    // @ts-ignore
    <li className="mapDataDiv" key={file.path}>
      <ul className="mapDataDiv2">
        {errors.map((e) => (
          <li className="mapDataDiv3" key={e.code}>
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));
  // Validate form input
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      firstname: firstName(userForm?.first_name),
      lastname: lastName(userForm?.last_name),
    };
    setErrors((prev) => {
      return {
        ...prev,
        firstname: firstName(userForm?.first_name),
        lastname: lastName(userForm?.last_name),
      };
    });

    if (Object.values(tempErrors)?.filter((value) => value).length) {
      return;
    }
    submitHandler(e);
  };
  //submit form
  const submitHandler = async (e) => {
    const updateValue: any = { ...userForm };
    if (updateValue.remove_image === 1) {
      delete updateValue.profile_img;
    } else {
      delete updateValue.remove_image;
      if (updateValue.profile_img && updateValue.profile_changed === "1") {
        const imgFile = await ChangeImgIntoFile(userForm?.profile_img);
        updateValue["profile_img"] = imgFile;
      } else {
        delete updateValue.profile_img;
      }
    }
    if (userForm.skills) {
      const setUserSkillsData = {
        skills: userForm?.skills?.map((d) => d.id),
        user: userProfile?.data?.id,
      };
      delete updateValue.skills;
      dispatch(ADD_USER_SKILL_SET_LIST(setUserSkillsData));
    }
    if (userForm?.remove_portfolio) {
      delete updateValue.Portfolio_user;
      const updatedRemovedData = userForm.remove_portfolio.map(
        (value) => value.id
      );
      updateValue.remove_portfolio = updatedRemovedData;
    }
    const formData = new FormData();
    Object.entries(updateValue)
      .filter(
        (item) => (item[0] !== "portfolio" && item[0] !== "remove_portfolio") && item[1] !== null
      )
      .map((item: any) => {
        formData.append(item[0], item[1]);
      });
    if (updateValue.remove_image === 1) {
      formData.append("remove_image", updateValue?.role);
    }
    if (updateValue.remove_portfolio) {
      for (const key of Object.keys(updateValue.remove_portfolio)) {
        formData.append(
          "remove_portfolio",
          updateValue.remove_portfolio[key].id
            ? updateValue.remove_portfolio[key].id
            : updateValue.remove_portfolio[key]
        );
      }
    }

    if (updateValue) {
      for (const key of Object.keys(updateValue.portfolio)) {
        formData.append(
          "portfolio",
          updateValue.portfolio && updateValue.portfolio[key].id
            ? updateValue.portfolio[key].id
            : updateValue.portfolio[key]
        );
      }
    }
    dispatch(TRIGGER_EDIT_USER(formData));
    setDoCrop(false);
    handlePopup();
  };

  return (
    <MuiPopup
      dialogTitle="Edit Profile"
      textAlign="left"
      openPopup={openPopup}
      closePopup={handlePopup}
      mainActionHandler={(e) => {
        validateSubmit(e);
      }}
      mainActionTitle="Create"
      maxWidth="950px"
      dialogContent={
        <>
          <div className="max-w-[350px] w-full mx-auto min-h-[50px] flex justify-center items-center relative">
            <img
              src={userForm?.profile_img}
              alt="User Profile"
              className={`w-40 h-40 rounded-full ${!userForm?.profile_img && 'text-center p-10 border'}`}
            />
            {userForm.profile_img && (
              <div className="absolute left-24 bottom-6 bg-theme p-2 rounded-full">
                <button
                  type="button"
                  className="text-white"
                  onClick={() => setDoCrop(true)}
                >
                  <CropOutlinedIcon />
                </button>
              </div>
            )}

            <div className="absolute left-52 bottom-6 bg-theme p-2 rounded-full">
              {!userForm.profile_img ? (
                <label htmlFor="upload" className="text-white">
                  <CameraAltOutlinedIcon />
                </label>
              ) : (
                <button
                  type="button"
                  className="text-white"
                  onClick={() => removeImage()}
                >
                  <DeleteOutlineOutlinedIcon />
                </button>
              )}
            </div>
            <input
              type="file"
              onChange={(e) => {
                onChangePicture(e);
              }}
              className="hidden"
              alt="ProfileImg"
              id="upload"
            />
          </div>
          <div className="">
            {doCrop && (
              <div className="App-profile-image">
                <div className="crop-container-profile-image">
                  <Cropper
                    image={userForm?.profile_img}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                <div className="controls-profile-image mt-5">
                  <label> Zoom </label>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => {
                      setZoom(parseFloat(e.target.value));
                    }}
                    className="zoom-range-profile-image"
                  />
                  <button onClick={showCroppedImage} className="mx-2">
                    {" "}
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      setDoCrop(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-4">
            <div className="input-fields-wrapper">
              <label>First Name</label>
              <input
                className={
                  errors?.["last_name"]
                    ? "input-style input-err-style"
                    : "dev-style"
                }
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Enter first name"
                value={userForm?.["first_name"]}
                onChange={(e) => handleInputChange(e)}
              />
              <span className="err-tag">{errors?.["first_name"] ?? " "}</span>
            </div>
            <div className="input-fields-wrapper">
              <label>Last Name</label>
              <input
                className={
                  errors?.["last_name"]
                    ? "input-style input-err-style"
                    : "input-style"
                }
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Enter last name"
                value={userForm?.["last_name"]}
                onChange={(e) => handleInputChange(e)}
              />
              <span className="err-tag">{errors?.["last_name"] ?? " "}</span>
            </div>
            {/* Title is sub_title */}
            <div className="input-fields-wrapper">
              <label>Title</label>
              <input
                className="input-style"
                type="text"
                name="sub_title"
                id="sub_title"
                placeholder="Enter last name"
                value={userForm?.["sub_title"]}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="input-fields-wrapper">
              <label>Sub Title</label>
              <input
                className="input-style"
                type="text"
                name="profile_title"
                id="profile_title"
                placeholder="Enter last name"
                value={userForm?.["profile_title"]}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="input-fields-wrapper col-span-2">
              <label>Website</label>
              <input
                className="input-style"
                type="text"
                name="website"
                id="website"
                placeholder="Enter last name"
                value={userForm?.["website"]}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {(userProfile?.data?.role === ROLES.ADMIN || userProfile?.data?.role === ROLES.CREATOR) && (
              <div className="input-fields-wrapper col-span-2">
                <label>Add Skills</label>
                <MuiAutoComplete
                  value={userForm.skills}
                  multiple
                  id="skills"
                  handleChange={(_, value) => {
                    setUserForm({ ...userForm, skills: value });
                  }}
                  handleSearchChange={(_, value) => {
                    console.log("searchhhing", value);
                  }}
                  filterList={storyTagsList ?? []}
                  selectedOption={userForm.skills}
                  autoHighlight={true}
                  setSearchText={setSearchText}
                  searchText={searchText}
                />
              </div>
            )}
            <div className="input-fields-wrapper col-span-2">
              <label>Add Description</label>
              <input
                className="input-style"
                type="text"
                name="profile_description"
                id="profile_description"
                placeholder="Enter last name"
                value={userForm?.["profile_description"]}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            {(userProfile?.data?.role === ROLES.ADMIN || userProfile?.data?.role === ROLES.CREATOR) && (
              <div className="input-fields-wrapper col-span-2">
                <label htmlFor="last_name">
                  <div>
                    <h5>Portfolio</h5>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <button className="w-full h-20 text-lg font-medium border border-inherit rounded-md text-inherit">
                        Attach File
                      </button>
                    </div>
                  </div>
                </label>
                <div className="grid grid-cols-4 mt-3">{thumbs}</div>
                {fileRejectionItems?.length > 0 && (
                  <>
                    <ul className="errorData_drop_zone">
                      {fileRejectionItems}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      }
    />
  );
};

export default EditProfileForm;
