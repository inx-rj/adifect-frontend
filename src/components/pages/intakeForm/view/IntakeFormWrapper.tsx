import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { env } from "helper/env";
import axiosPrivate from "api/axios";
import { initialGenericFormFields } from "../../../../helper/constants/intakeForm/IntakeFormConstant";
import GenericForm from "../global/GlobalForm";
import UserLogged from "./UserLogged";
import { useSingleEffect } from "react-haiku";

const IntakeFormWrapper = () => {
  const { formName: formNameSlug } = useParams();
  const [genericForm, setGenericForm] = useState(initialGenericFormFields);
  const [formSubmitLoader, setFormSubmtLoader] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [fromError, setFormError] = useState([]);
  const [formName, setFormName] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);

  const handleResetForm = () => {
    setIsReset(true);
    setFormError([]);
    setFormSuccess(false);
    setTimeout(() => {
      setIsReset(false);
    }, 100);
  };

  // Get Form data
  const fetchFormData = () => {
    setIsFormLoading(true);
    axiosPrivate
      .get(`${env.API_URL}intake-forms/fields/${formNameSlug}/`)
      .then((res) => {
        // console.log("SHARE Form Field", res?.data?.data?.data);
        setGenericForm(res?.data?.data?.data);
        setFormName(res?.data?.data?.intake_form?.title);
      })
      .catch((err) => {
        // console.log(err, "Channel Error");
      })
      .finally(() => {
        setIsFormLoading(false);
      });
  };

  // Fetch form data on mount
  useSingleEffect(() => {
    fetchFormData();
  });

  // Submit Form data
  const submitHandler = () => {
    setFormSubmtLoader(true);
    setFormError([]);
    const updateValue = [...genericForm];
    updateValue["form_version"] = 1;

    const data = updateValue?.map((item) => {
      return {
        field_name: item.field_name,
        field_type: item.field_type,
        field_value: item.field_value,
      };
    });

    axiosPrivate
      .post(
        `${env.API_URL}intake-forms/submit/${formNameSlug}/`,
        {
          fields: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        handleResetForm();
        setFormSubmtLoader(false);
        setFormSuccess(true);
      })
      .catch((err) => {
        if (err?.response) {
          const errorRes = err?.response?.data?.message?.fields;
          setFormError(errorRes);
        }
        swal({
          title: "Error",
          text: err.message,
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: { visible: false },
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
      <UserLogged />
      {formSuccess && (
        <div className="text-center min-h-screen flex items-center justify-center">
          <div className="bg-white p-5 shadow-sm drop-shadow-sm rounded">
            <img src="/img/logonew.svg" className="login-logo mx-auto" alt="" />
            <h6 className="text-2xl text-success mt-4">Thank you!</h6>
            <p className="mt-[20px]">Form has been submitted successfully</p>

            <div className="flex items-center justify-center mt-5">
              <Button
                type="submit"
                variant="contained"
                className="btn btn-primary [&.btn.MuiButton-root]:min-w-[150px] [&.btn.MuiButton-root]:font-normal"
                onClick={(e) => {
                  handleResetForm();
                  setFormSuccess(false);
                }}
              >
                <span className="inline-block">Submit More</span>
              </Button>
            </div>
          </div>
        </div>
      )}
      {!formSuccess && (
        <div className="min-h-screen flex items-center justify-center w-full relative">
          {isFormLoading && (
            <Box className="flex items-center justify-center absolute inset-0 bg-white z-10">
              <CircularProgress />
            </Box>
          )}
          <div className="w-full max-w-[600px] mx-auto bg-white rounded p-8 my-6 ">
            <h6 className="text-2xl mb-[20px] border-b pb-[20px] capitalize font-bold">
              {formName}
            </h6>
            <form id="intakeForm" className="max-w-[530px] w-full mx-auto">
              <GenericForm
                genericForm={genericForm}
                setGenericForm={setGenericForm}
                errors={fromError}
                isReset={isReset}
              />
              <div className="flex items-center justify-between gap-3 mt-[10px] border-t pt-[30px]">
                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    variant="contained"
                    className="btn btn-primary [&.btn.MuiButton-root]:min-w-[100px] [&.btn.MuiButton-root]:font-normal"
                    onClick={(e) => validateSubmit(e)}
                    disabled={formSubmitLoader}
                  >
                    <span className="inline-block">Submit</span>
                    {formSubmitLoader && (
                      <span className="ml-1 inline-block">
                        <CircularProgress
                          size={12}
                          sx={{
                            color: "#000",
                          }}
                        />
                      </span>
                    )}
                  </Button>
                </div>
                <button
                  type="reset"
                  className="font-semibold text-primary text-base cursor-pointer"
                  onClick={handleResetForm}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default IntakeFormWrapper;
