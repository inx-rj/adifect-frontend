import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useDispatch, useSelector } from "react-redux";
import { defaultPageLoader } from "../../redux/actions/other-actions";

export default function Profileedit() {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);
  const { loading } = useSelector((state) => state.loaderReducer);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [profile_title, setProfileTitle] = useState("");
  const [profile_description, setProfileDescription] = useState("");
  const [profile_img, setProfileImg] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [video, setVideo] = useState("");


  // const [role, setRole] = useState();

  const [errors, setErrors] = useState({
    first_name: null,
    last_name: null,
    user_name: null,
    profile_title: null,
    profile_description: null,
    profile_img: null,
    portfolio: null,
    video: null
    // role: null,
  });

  const { user, success: successDetails } = useSelector((state) => state.userDetailsReducer);
  const { userData } = useSelector((state) => state.authReducer);

  const { success, userData: profileMessage } = useSelector(
    (state) => state.UpdateProfileReducer
  );

  useEffect(() => {
    if (!user || !user.name) {
      // console.log("Hello World");
      dispatch(getUserDetails());
    }
    setUsername(userData.user?.name);

    setEmail(userData.user?.email);
    setFirstName(userData.user?.first_name);

    setLastName(userData.user?.last_name);
    setProfileTitle(userData.user?.profile_title);
    setProfileDescription(userData.user?.profile_description);

  }, [successDetails])
  console.log("hppp", userData.user);
  useEffect(() => {
  }, [success]);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      firstname: validations.firstName(firstname),
      lastname: validations.lastName(lastname),
      // role: validations.role(role),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {

      return;
    }
    submitHandler();
  };

  const submitHandler = async (e) => {
    const formData = new FormData();

    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("user_name", username);
    formData.append("profile_title", profile_title);
    formData.append("profile_description", profile_description);
    formData.append("profile_img", profile_img);
    formData.append("portfolio", portfolio);
    formData.append("video", portfolio);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const update_profile = await axios
      .put(`${BACKEND_API_URL}edit-profile/`, formData, config)
      .then((res) => {
        // console.log("response", res.data);
        swal({
          title: "Successfully Complete",
          text: "Profile updated successfully",
          className: "successAlert",
          icon: "img/SuccessAlert.png",
          buttons: false,
        });
        navigate("/profile");
      })

  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="Category_p">
        <div className="CategorylistName">
          <h1>Edit Profile</h1>
        </div>
      </div>
      <div className="Topallpage AllPageHight">
        <div className="ContentDiv pb-5 pt-5">
          <div className="Profile">
            <div className="divprofile">
              <h4 className="form-label mt-3" for="Username"> Username </h4>
              <input
                className="input-box validateInput w-100 h-47 border-radius border-1 pl-2"
                type="text"
                disabled
                value={username}
              />
            </div>
            <div className="divprofile">
              <h4 className="form-label mt-3" for="firstname"> First Name</h4>
              <input
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-box validateInput w-100 h-47 border-radius border-1 pl-2"
                type="text"
              />
            </div>
            <div className="divprofile">
              <h4 className="form-label mt-3" for="firstname"> Last Name </h4>
              <input
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="input-box validateInput w-100 h-47 border-radius border-1 pl-2"
                type="text"
              />
            </div>
            <div className="divprofile">
              <h4 className="form-label mt-3" for="firstname"> Email Address</h4>
              <input
                disabled
                value={email}
                className="input-box validateInput w-100 h-47 border-radius border-1  pl-2"
                type="text"
              />
            </div>
            <div className="divprofile">
              <h4 className="form-label mt-3" for="firstname"> Profile Title</h4>
              <input
                value={profile_title}
                onChange={(e) => setProfileTitle(e.target.value)}
                className="input-box validateInput w-100 h-47 border-radius border-1 pl-2"
                type="text"
              />
            </div>
            <div className="divprofile">
              <h4 className="form-label mt-3" for="firstname">
                Profile Description
              </h4>
              <textarea
                value={profile_description}
                onChange={(e) => setProfileDescription(e.target.value)}
                className="input-box validateInput w-100  border-radius border-1 pl-2 textflid"
                type="text"
              />
            </div>
            <div className="divprofile">
              <h4 className="form-label mt-3" for="firstname"> Profile Image</h4>
              <input
                value={profile_img}
                onChange={(e) => setProfileImg(e.target.value)}
                className="input-box validateInput w-100 h-47 border-radius video pl-2"
                type="file"
              />
            </div>
            <div className="divprofile">
              <h4 className="form-label mt-3" for="firstname"> Portfolio</h4>
              <input
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="input-box validateInput w-100 h-47 border-radius video pl-2"
                type="file"
              />
            </div>

            <div className="divprofile ">
              <h4 className="form-label mt-3" for="firstname"> Video </h4>
              <input
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                className="input-box validateInput w-100 h-47 border-radius video pl-2"
                type="file"
              />

            </div>
            <div className="saveprofile mt-4">
              <div className="Saveprofilebtn">
                <a className="saveprofileBTN" onClick={validateSubmit} href="#">
                  {" "}
                  Save{" "}
                </a>
              </div>
              <div className="Cancelprofilebtn">
                <Link
                  to="/profile"
                  className="create-account-btn border-radius Cancel_Profile"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
