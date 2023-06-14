import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenericForm from "./GenericForm";
import { Button } from "@mui/material";
import { initialGenericFormFields } from "./IntakeFormConstant";
import api from "../../../utils/api";
import { BACKEND_API_URL } from "../../../environment";
import swal from "sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";

const ShareFormWrapper = () => {
  const { formID, versionNum } = useParams();

  const [genericForm, setGenericForm] = useState(initialGenericFormFields);
  const [formSubmitLoader, setFormSubmtLoader] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleResetForm = () => {
    setGenericForm(initialGenericFormFields);
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_API_URL}intake-forms/fields/${formID}/${versionNum}/`)
      .then((res) => {
        // console.log("SHARE Form Field", res?.data?.data);
        setGenericForm(res?.data?.data);
      })
      .catch((err) => {
        // console.log(err, "Channel Error");
      });
  }, [formID, versionNum]);

  // console.log("genericForm", genericForm);

  //   Submit Form data
  const submitHandler = () => {
    setFormSubmtLoader(true);
    const updateValue =  [...genericForm];
    updateValue["form_version"] = 1;

    const data = updateValue?.map((item) => {
      return {
        field_name: item.field_name,
        field_type: item.field_type,
        field_value: item.field_value
      }
    });

    console.log('data', data)

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formDataValue = new FormData();
    formDataValue.append('data', JSON.stringify(data))
    formDataValue.append('contact_attachment', JSON.stringify(data));

    axios
      .post(
        `${BACKEND_API_URL}intake-forms/submit/${formID}/${versionNum}/`,
        config,
        formDataValue
      )
      .then((res) => {
        // setname();
        console.log("Form fill success", res);
        swal({
          title: "Successfully Complete",
          text: "Successfully Created",
          className: "successAlert-login",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        setFormSubmtLoader(false);
        // navigate("/workflow");
      })
      .catch((err) => {
        // setname();
        swal({
          title: "Error",
          text: err.message,
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 1500,
        });
        setTimeout(() => {
          setFormSubmtLoader(false);
        }, 1);
      });
  };

  //   Validate form data
  const validateSubmit = (e) => {
    e.preventDefault();
    submitHandler();
  };
  return (
    <>
      {/* <Login /> */}
      <div className="max-w-[600px] w-full mx-auto bg-white rounded p-8 my-6">
        {formSuccess && (
          <div className="text-center">
            <h6 className="text-2xl text-success">Success</h6>
            <p className="mb-[20px]">Form Submitted Successfully</p>
            <Button variant="primary" className="btn btn-primary mx-auto">
              Ok
            </Button>
          </div>
        )}
        {!formSuccess && (
          <>
            <h6 className="text-2xl mb-[20px] border-b pb-[20px] capitalize font-bold">
              {/* {formName?.replace(/-/g, " ")} */}
              {genericForm?.[0]?.['form_version_data']?.['intake_form']?.['title']}
            </h6>
            <form id="intakeForm" method="POST" className="max-w-[530px] w-full mx-auto">
              <GenericForm
                genericForm={genericForm}
                setGenericForm={setGenericForm}
              />
            </form>
            <div className="flex items-center justify-between gap-3 mt-[10px] border-t pt-[30px]">
              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  variant="contained"
                  className="btn btn-primary [&.btn.MuiButton-root]:min-w-[100px] [&.btn.MuiButton-root]:font-normal"
                  onClick={(e) => validateSubmit(e)}
                  disabled
                >
                  Submit {formSubmitLoader && "Loading"}
                </Button>
                <Button
                  variant="outlined"
                  className="btn btn-outline [&.btn.MuiButton-root]:min-w-[100px] [&.btn.MuiButton-root]:font-normal"
                  onClick={handleResetForm}
                >
                  Cancel
                </Button>
              </div>
              <span
                className="font-semibold text-primary text-base cursor-pointer"
                onClick={handleResetForm}
              >
                Clear Form
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShareFormWrapper;
