import { useState } from "react";
import MuiPopup from "components/common/muiPopup/MuiPopup";
import { firstName, lastName } from "helper/validations";
import { useAppSelector } from "redux/store";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useSingleEffect } from "react-haiku";
import { UserProfileDetailsType } from "helper/types/auth/authType";
import MuiAutoComplete from "components/common/muiAutocomplete/MuiAutoComplete";
import { createFilterOptions } from "@mui/material";
import { ALL_SKILLS_LIST } from "redux/reducers/skills/skills.slice";

const EditProfileForm = ({ openPopup, handlePopup }) => {
  const [userForm, setUserForm] = useState<UserProfileDetailsType>({
    first_name: "",
    last_name: "",
    name: "",
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
  })

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
  });
  const [searchText, setSearchText] = useState("");

  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const userSkillsData = useAppSelector(ALL_SKILLS_LIST);

  useSingleEffect(() => {
    setUserForm(userProfile?.data)
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  }

  const submitHandler = async (e) => {
  }
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

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler(e);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option['skill_name'],
  });

  console.log("userSkillsData", userSkillsData)

  return (
    <MuiPopup
      dialogTitle="Edit Profile"
      textAlign="left"
      openPopup={openPopup}
      closePopup={handlePopup}
      mainActionHandler={(e) => {
        validateSubmit(e)
      }}
      mainActionTitle="Create"
      maxWidth="950px"
      dialogContent={
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-4" >
            <div className="input-fields-wrapper">
              <label>First Name</label>
              <input
                className={
                  errors?.["last_name"] ? "input-style input-err-style" : "input-style"
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
                  errors?.["last_name"] ? "input-style input-err-style" : "input-style"
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
                className='input-style'
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
                className='input-style'
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
                className='input-style'
                type="text"
                name="website"
                id="website"
                placeholder="Enter last name"
                value={userForm?.["website"]}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="input-fields-wrapper col-span-2">
              <label>Add Skills</label>
              <MuiAutoComplete
                // value={userForm?.skills}
                multiple
                id="skills"
                handleChange={(e, value) => setUserForm({ ...userForm, ['skills']: value })}
                filterOptions={filterOptions}
                filterList={userSkillsData?.data?.results?.filter(
                  (item) => item?.is_active
                ) ?? []}
                getOptionLabel={(option) =>
                  option?.skill_name
                }
                selectedOption={userForm?.skills}
                filterSelectedOptions
                autoHighlight={true}
                setSearchText={setSearchText}
                searchText={searchText}
                
              />
            </div>
            <div className="input-fields-wrapper col-span-2">
              <label>Add Description</label>
              <input
                className='input-style'
                type="text"
                name="profile_description"
                id="profile_description"
                placeholder="Enter last name"
                value={userForm?.["profile_description"]}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
        </>
      }

    />

  );
}

export default EditProfileForm;