import React, { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import {
  Button,
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { companyDetailsdata } from "../../redux/actions/Workflow-company-action";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { Link } from "react-router-dom";
import {
  memberAdminEditCompanyListAction,
  memberAdminGetDetailsCompanyListAction,
  memberAdminAddCompanyAction,
} from "../../redux/actions/Member-Company-List-Action";
import { MEMBER_ADMIN_COMPANY_DETAILS_RESET } from "../../constants/Member-Company-list-constants";

function Member_Admin_Company_Add_Edit() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyAdminId } = useParams();
  const [userid, setuserid] = useState("");
  const [company_name, setcompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [checkbox, setcheckbox] = useState(false);
  const [namefield, setnamefield] = useState(false);
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({
    company_name: null,
  });
  const { userData } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);


  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      company_name: validations.company_name(company_name),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler();
  };

  useEffect(() => {
    dispatch(defaultPageLoader());
    let user = JSON.parse(localStorage.getItem("userData"));
    setuserid(user?.user.user_id);
  }, []);

  //   useEffect(() => {
  //    dispatch
  //   }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  const { success: editAdminCompanySuccess, error: editAdminCompanyError } =
    useSelector((state) => state.memberAdminEditCompanyListReducer);

    const { success: addAdminCompanySuccess, error: addAdminCompanyError } =
    useSelector((state) => state.memberAdminAddCompanyReducer);


  //   const {
  //     loading: companyLoading,
  //     success,
  //     companyDetails,
  //   } = useSelector((state) => state.agencyCompanyDetailsReducer);

  const {
    loading: AdmincompanyLoading,
    success: AdmincompanySuccess,
    AdminCompanyDetails,
  } = useSelector((state) => state.memberAdminGetDetailsCompanyListReducer);



  useEffect(() => {
    dispatch({ type: MEMBER_ADMIN_COMPANY_DETAILS_RESET });
    // return () => {
    //   dispatch({ type: MEMBER_ADMIN_COMPANY_DETAILS_RESET });
    // };
  }, []);

  useEffect(async () => {
    if (companyAdminId) {
      if (!AdminCompanyDetails || !AdminCompanyDetails?.data?.name) {
        await dispatch(memberAdminGetDetailsCompanyListAction(companyAdminId));
      } else {
        setcompanyName(AdminCompanyDetails?.data?.name);
        setDescription(AdminCompanyDetails?.data?.description);
        setStatus(AdminCompanyDetails?.data?.is_active);
      }
    }
  }, [dispatch, AdmincompanySuccess]);

  const getback = () => {
    navigate("/member/company");
  };

  useEffect(()=>{
    if(addAdminCompanySuccess){
        swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          // toast.success("Successfully Saved!");
          navigate("/member/company");
    }
    if(addAdminCompanyError){
        swal({
            title: "Error",
            text: "Company is already exist",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 2000,
          });
    }          
  },[addAdminCompanySuccess,addAdminCompanyError])

  useEffect(() => {
    if (editAdminCompanySuccess) {
      swal({
        title: "Successfully Complete",
        text: "Successfully Saved!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 1500,
      });
      // toast.success("Successfully Saved!");
      navigate("/member/company");
    }
    if (editAdminCompanyError) {
      swal({
        title: "Error",
        text: "Company is already exist",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2000,
      });
      navigate("/member/company");
    }
  }, [editAdminCompanySuccess, editAdminCompanyError]);

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

    const formData = new FormData();

    formData.append("name", company_name);
    formData.append("description", description);
    formData.append("is_active", status);
    formData.append("is_check", checkbox);
    formData.append("is_name", namefield);
    formData.append("agency", userData?.user.user_id);
    if (companyAdminId) {
      dispatch(memberAdminEditCompanyListAction(formData, companyAdminId));
    } else {
        dispatch(memberAdminAddCompanyAction(formData));
    }
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${userData.token}`,
    //   },
    // };

    // if (company_name.length >= 50) {
    //   swal({
    //     title: "Error",
    //     text: "Max characters allowed is 50",
    //     className: "errorAlert",
    //     icon: "/img/logonew-red.svg",
    //     buttons: false,
    //     timer: 1500,
    //   });
    //   return;
    // }
    // if (companyAdminId) {
    //   api
    //     .put(`${BACKEND_API_URL}agency/company/${companyAdminId}/`, {
    //       name: company_name,
    //       description,
    //       is_active: status,
    //       is_check: checkbox,
    //       is_name: namefield,
    //       agency: userid,
    //     })
    //     .then((res) => {
    //       swal({
    //         title: "Successfully Complete",
    //         text: "Successfully Saved!",
    //         className: "successAlert",
    //         icon: "/img/logonew.svg",
    //         buttons: false,
    //         timer: 1500,
    //       });
    //       // toast.success("Successfully Saved!");
    //       navigate("/agency/company");
    //     })
    //     .catch((err) => {
    //       swal({
    //         title: "Error",
    //         text: "Company is already exist",
    //         className: "errorAlert",
    //         icon: "/img/logonew-red.svg",
    //         buttons: false,
    //         timer: 2000,
    //       });
    //       navigate("/agency/company");
    //     });
    // } else {
    //   api
    //     .post(`${BACKEND_API_URL}agency/company/`, {
    //       name: company_name,
    //       description,
    //       is_active: status,
    //       agency: userid,
    //     })
    //     .then((res) => {
    //       swal({
    //         title: "Successfully Complete",
    //         text: "Successfully Saved!",
    //         className: "successAlert",
    //         icon: "/img/logonew.svg",
    //         buttons: false,
    //         timer: 1500,
    //       });
    //       // toast.success("Successfully Saved!");
    //       navigate("/agency/company");
    //     })
    //     .catch((err) => {
    //       swal({
    //         title: "Error",
    //         text: "Company is already exist",
    //         className: "errorAlert",
    //         icon: "/img/logonew-red.svg",
    //         buttons: false,
    //         timer: 2000,
    //       });
    //     });
    // }
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
              {companyAdminId ? <h1>Edit Company</h1> : <h1>Add Company</h1>}
            </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop Categorypage">
              <div className="addpage Industrypage">
                <div
                  className={
                    errors.company_name
                      ? "inputCntnr error"
                      : "inputCntnr CategoryinputH"
                  }
                >
                  <h4>Company</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="text"
                    placeholder="Company Name"
                    name="company_name"
                    onChange={(e) => {
                      setcompanyName(e.target.value);
                      setnamefield(true);
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

                <div className="inputCntnr CategoryinputH ">
                  <h4 className="">Description</h4>
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
                        setcheckbox(true);
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
                    className="btn-primary Small border-radius mt-2 addeditbtn"
                  >
                    {" "}
                    Save
                  </button>
                  <button
                    onClick={getback}
                    className="create-account-btn mt-2 border-radius CancelAddBtN workflowcancelbtn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Member_Admin_Company_Add_Edit;
