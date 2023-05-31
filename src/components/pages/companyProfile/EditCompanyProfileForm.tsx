import { lazy, useState } from "react";
import { useSingleEffect } from "react-haiku";

//import redux
import { useAppDispatch, useAppSelector } from "redux/store";
import { PUT_SINGLE_COMPANY } from "redux/actions/companyTab/companyTab.actions";
import {
  GET_INDUSTRY_LIST,
  POST_SINGLE_INDUSTRY,
} from "redux/actions/industries/industries.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { INDUSTRY_LIST } from "redux/reducers/industries/industries.slice";

//import helper files
import { API_URL } from "helper/env";
import { singleCompanyPayloadData } from "helper/types/companyTab/companiesType";
import { isValidPhoneNumber, validateEmail } from "helper/validations";

//import components
const MuiPopup = lazy(() => import("components/common/muiPopup/MuiPopup"));
const DropdownWithSearch = lazy(
  () => import("components/common/muiAutocomplete/DropdownWithSearch")
);

const EditCompanyProfileForm = ({ handlePopup, openPopup, tabData }) => {
  const dispatch = useAppDispatch();

  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const { industriesList } = useAppSelector(INDUSTRY_LIST);

  const [openModal, setOpenModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(true);
  const [addedIndustry, setAddedIndustry] = useState("");

  const [formData, setFormData] = useState<{
    company: string;
    description: string;
    email: string;
    website: string;
    phone: string;
    industry: number | null;
  }>({
    company: tabData?.title,
    description: tabData?.description,
    email: tabData?.companyEmail,
    website: tabData?.companyWebsite,
    phone: tabData?.companyPhone,
    industry: tabData?.industry as number,
  });
  const [errors, setErrors] = useState({
    company: null,
    description: null,
    website: null,
    email: null,
    phone: null,
    industry: null,
    addedIndustry: null,
  });

  //get industries list
  useSingleEffect(() => {
    dispatch(
      GET_INDUSTRY_LIST({
        page: 1,
        rowsPerPage: 10,
      })
    );
  });

  //handle form data
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  //handle submit of child modal
  const handleAddIndustrySubmit = async (e) => {
    e.preventDefault();
    //validate added industry
    const tempErrors = {
      ...errors,
      addedIndustry: !addedIndustry ? "Please enter industry name" : null,
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }

    //Add new industry to industry list
    const id = await dispatch(
      POST_SINGLE_INDUSTRY({
        industry_name: addedIndustry,
      })
    );
    setOpenModal(false);
    setFormData({ ...formData, industry: id });
    setShowParentModal(true);
  };

  //validate form inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      ...errors,
      email: formData.email ? validateEmail(formData.email) : null,
      phone: formData.phone ? isValidPhoneNumber(formData.phone) : null,
      company: !formData.company ? "Please enter company name" : null,
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value)?.length) {
      return;
    }
    handleFormSubmit();
  };

  //handle form submit for parent modal
  const handleFormSubmit = () => {
    const payload: singleCompanyPayloadData = {
      agency: userProfile?.data?.id,
      name: formData?.company,
      description: formData.description,
      company_email: formData.email,
      company_phone_number: formData.phone,
      company_website: formData.website,
      industry: formData.industry,
    };

    dispatch(
      PUT_SINGLE_COMPANY(
        tabData?.companyId,
        payload,
        `${API_URL.COMPANY.ADMIN}`
      )
    );
    handlePopup();
  };

  return (
    <>
      {showParentModal && (
        <MuiPopup
          dialogTitle="Edit Profile"
          textAlign="left"
          dialogContent={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2" >
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
                      errors.company
                        ? "input-style input-err-style"
                        : "input-style"
                    }
                    type="text"
                    placeholder="Enter Company Name"
                    name="company"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
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
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                  <span className="err-tag">{errors.description ?? ""}</span>
                </div>
              </div>
              <div
                className={
                  errors.website
                    ? "input-fields-wrapper error-style"
                    : "input-fields-wrapper"
                }
              >
                <h4>Website</h4>
                <div className="styled-select">
                  <input
                    className={
                      errors.website
                        ? "input-style input-err-style"
                        : "input-style"
                    }
                    type="text"
                    placeholder="Enter Website"
                    name="website"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                  <span className="err-tag">{errors.website ?? ""}</span>
                </div>
              </div>
              <div
                className={
                  errors.email
                    ? "input-fields-wrapper error-style"
                    : "input-fields-wrapper"
                }
              >
                <h4>Email Address</h4>
                <div className="styled-select">
                  <input
                    className={
                      errors.email
                        ? "input-style input-err-style"
                        : "input-style"
                    }
                    type="email"
                    placeholder="Enter Email Address"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                  <span className="err-tag">{errors.email ?? ""}</span>
                </div>
              </div>
              <div
                className={
                  errors.phone
                    ? "input-fields-wrapper error-style"
                    : "input-fields-wrapper"
                }
              >
                <h4>Phone Number</h4>
                <div className="styled-select">
                  <input
                    className={
                      errors.phone
                        ? "input-style input-err-style"
                        : "input-style"
                    }
                    type="tel"
                    placeholder="Enter Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />
                  <span className="err-tag">{errors.phone ?? ""}</span>
                </div>
              </div>
              <div
                className={
                  errors.industry
                    ? "input-fields-wrapper error-style"
                    : "input-fields-wrapper"
                }
              >
                <h4 className="flex justify-between">
                  Industry
                  <span className="text-primary">
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setShowParentModal(false);
                      }}
                      className="hireMeIndustry"
                    >
                      + Add Industry
                    </button>
                  </span>
                </h4>
                <DropdownWithSearch
                  filterList={{
                    name: "industry",
                    label: "Select Industry",
                    options: industriesList.data.results,
                    labelAs: "industry_name",
                    valueAs: "id",
                  }}
                  currentValue={formData?.industry}
                  handleChange={(name, val) => {
                    if (val) {
                      handleInputChange(name, val);
                    }
                  }}
                />
                <span className="err-tag">{errors.industry ?? ""}</span>
              </div>
            </div>
          }
          openPopup={openPopup}
          closePopup={handlePopup}
          mainActionHandler={validateSubmit}
          mainActionTitle="Create"
          maxWidth="800px"
        />
      )}
      <MuiPopup
        dialogTitle="Add Industry"
        textAlign="left"
        dialogContent={
          <div
            className={
              errors.addedIndustry
                ? "input-fields-wrapper error-style"
                : "input-fields-wrapper"
            }
          >
            <div className="styled-select">
              <input
                className={
                  errors.addedIndustry
                    ? "input-style input-err-style"
                    : "input-style"
                }
                type="text"
                placeholder="Enter Industry Name"
                name="addedIndustry"
                value={addedIndustry}
                onChange={(e) => setAddedIndustry(e.target.value)}
                required
              />
              <span className="err-tag">{errors.addedIndustry ?? ""}</span>
            </div>
          </div>
        }
        openPopup={openModal}
        closePopup={() => {
          setOpenModal(false);
          setShowParentModal(true);
        }}
        mainActionHandler={handleAddIndustrySubmit}
        mainActionTitle="Save"
      />
    </>
  );
};

export default EditCompanyProfileForm;
