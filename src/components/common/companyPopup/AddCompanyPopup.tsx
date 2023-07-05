import { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { POST_SINGLE_COMPANY } from "redux/actions/companyTab/companyTab.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { ROLES } from "helper/config";
import { API_URL } from "helper/env";
import { singleCompanyPayloadData } from "helper/types/companyTab/companiesType";
import MuiPopup from "components/common/muiPopup/MuiPopup";
import { Checkbox, FormControlLabel } from "@mui/material";

const AddCompanyPopup = ({ setOpenModal, openModal }) => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  const [formData, setFormData] = useState<{
    company: string;
    description: string;
    isActive: boolean;
  }>({
    company: "",
    description: "",
    isActive: false,
  });
  const [errors, setErrors] = useState({
    company: null,
    description: null,
  });

  //handle form data
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: name === "isActive" ? checked : value });
    setErrors({ ...errors, [name]: null });
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      company: !formData.company ? "Please enter Company Name" : null,
      description: !formData.description ? "Please enter Description" : null,
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value)?.length) {
      return;
    }
    handleFormSubmit();
  };

  //handle form submit
  const handleFormSubmit = () => {
    const payload: singleCompanyPayloadData = {
      name: formData?.company,
      description: formData?.description,
      is_active: formData?.isActive,
      agency: userProfile?.data?.id,
    };

    // Handle Add new company action
    userProfile?.data?.role === ROLES.ADMIN
      ? dispatch(POST_SINGLE_COMPANY(payload, `${API_URL.COMPANY.ADMIN}`))
      : dispatch(POST_SINGLE_COMPANY(payload));

    // reset relevant states
    setOpenModal(false);
    setFormData({
      company: "",
      description: "",
      isActive: false,
    });
  };

  return (
    <MuiPopup
      dialogTitle={"Add Company"}
      textAlign="left"
      dialogContent={
        <>
          <div
            className={
              errors.company
                ? "input-fields-wrapper error-style"
                : "input-fields-wrapper"
            }
          >
            <h4>Company</h4>
            <div className="styled-select">
              <input
                className={
                  errors.company ? "input-style input-err-style" : "input-style"
                }
                type="text"
                placeholder="Enter Company Name"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
              <span className="err-tag">{errors.company ?? ""}</span>
            </div>
          </div>
          <div
            className={
              errors.description
                ? "input-fields-wrapper error-style"
                : "input-fields-wrapper"
            }
          >
            <h4>Description</h4>
            <div className="styled-select">
              <textarea
                name="description"
                className={
                  errors.description
                    ? "input-style input-err-style"
                    : "input-style"
                }
                placeholder="Enter Company Description"
                maxLength={2000}
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <span className="err-tag">{errors.description ?? ""}</span>
            </div>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isActive}
                onChange={handleInputChange}
                name="isActive"
              />
            }
            label="Active"
          />
        </>
      }
      openPopup={openModal}
      closePopup={() => setOpenModal(false)}
      mainActionHandler={validateSubmit}
      mainActionTitle={"Save"}
    />
  );
};

export default AddCompanyPopup;
