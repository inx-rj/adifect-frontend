import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import api from "../../utils/api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyDetails } from "../../redux/actions/company-actions";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { COMPANY_DETAILS_RESET } from "../../constants/company-constants";

function Company_add_edit() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { companyId } = useParams();

  const [company_name, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [company_type, setCompanyType] = useState("");
  const [status, setStatus] = useState(false);
  const [companyOwner, setCompanyOwner] = useState();
  const [errors, setErrors] = useState({
    company_name: null,
    company_type: null,
  });

  const [isOpen, setIsOpen] = useState(false);

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  useEffect(() => {
    const handler = () => {
      setIsOpen(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);
  const { userData } = useSelector((state) => state.authReducer);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      company_name: validations.company_name(company_name),
      // company_type: validations.company_type(company_type),
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {

      return;
    }
    submitHandler();
  };
  const {
    loading: companyLoading,
    success,
    companyDetails,
  } = useSelector((state) => state.companyDetailsReducer);

  useEffect(() => {
    // console.log(companyDetails);
    if (companyId) {
      if (!companyDetails || !companyDetails.name) {
        dispatch(getCompanyDetails(companyId));
      } else {
        setCompanyName(companyDetails.name);
        setDescription(companyDetails.description);
        setCompanyType(companyDetails.company_type);
        setStatus(companyDetails.is_active);
        setCompanyOwner(companyDetails.agency);
      }
    }
  }, [dispatch, success]);

  // useEffect(() => {
  //   if (companyId) {
  //     // dispatch({ type: COMPANY_DETAILS_RESET });
  //     if (!companyDetails || !companyDetails.name)
  //     dispatch(getCompanyDetails(companyId));
  //     if (success) {
  //       setCompanyName(companyDetails.name);
  //       setDescription(companyDetails.description);
  //       setCompanyType(companyDetails.company_type);
  //       setStatus(companyDetails.is_active);
  //     }
  //     // console.log("companyDetails222--", companyDetails);
  //   }
  //   // console.log("companyDetails--", companyDetails);
  // }, [success]);

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
  };

  const submitHandler = (e) => {
    if (company_name.length >= 50) {
      swal({
        title: "Error",
        text: "Max characters allowed is 50",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",

        buttons: false,
        timer: 1500,
      });
      return;
    }
    if (companyId) {
      axios
        .put(
          `${BACKEND_API_URL}company/${companyId}/`,
          {
            agency: companyOwner,
            name: company_name,
            description,
            is_active: status,
            // company_type,
          },
          config
        )
        .then((res) => {
          navigate("/companies/list");
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",

            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
        })
        .catch((res) => {
          // navigate("/companies/list");

          swal({
            title: "Error",
            text: "Company not saved!",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",

            buttons: false,
            timer: 1500,
          });
        });
    } else {
      axios
        .post(
          `${BACKEND_API_URL}company/`,
          {
            agency: userData.user.user_id,
            name: company_name,
            description,
            is_active: status,
            // company_type,
          },
          config
        )
        .then((res) => {
          // console.log("backendurl--", BACKEND_API_URL);
          // toast.success("Successfully Saved!");
          navigate("/companies/list");
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",

            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
        });
    }
  };
  return (
    <>
      {/* {loading && <LoadingSpinner />} */}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Category_p">
            <div className="CategorylistName">
              {companyId ? <h1>Edit Company</h1> : <h1>Add Company</h1>}
            </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop Categorypage">
              <div className="addpage">
                <div
                  className={
                    errors.company_name ? "inputCntnr_1 error" : "inputCntnr_1 "
                  }
                >
                  <h4>Company</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="text"
                    placeholder="Category Name"
                    name="company_name"
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      setErrors({ ...errors, company_name: null });
                    }}
                    value={company_name}
                  />
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.company_name ? 1 : 0,
                    }}
                  >
                    {errors.company_name ?? "valid"}
                  </span>
                </div>
                <div className="inputCntnr1  CompanyinputH ">
                  <h4 className="mt-1">Description</h4>
                  <textarea
                    className="category_descripiton validateInput w-100 h-47 border-radius border-1  addedittextarar"
                    type="textarea"
                    placeholder="Company Description"
                    name="company_description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors({ ...errors, description: null });
                    }}
                    value={description}
                  />
                </div>
                <br />
                <div className="checkboxStatus">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="status"
                      name="status"
                      value={status}
                      checked={status}
                      onChange={() => {
                        setStatus(!status);
                      }}
                    />
                    <label htmlFor="status" className="Status101">
                      {" "}
                      Active
                    </label>
                  </div>
                </div>
                <div>
                  {/* <div className="savebtn left-con"> */}
                  <button
                    onClick={validateSubmit}
                    type="button"
                    className="btn-primary Small  border-radius mt-2 addeditbtn"
                  >
                    {" "}
                    Save
                  </button>
                  <Link
                    className="create-account-btn mt-2 border-radius CancelAddBtN"
                    to="/companies/list"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Company_add_edit;
