import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import IntakeFormFields from "./IntakeFormFields";
import { env } from "helper/env";
import { useSingleEffect } from "react-haiku";
import axiosPrivate from "api/axios";
import { Notify } from "components/common/swal/SwalToast";
import {
  fieldOptionType,
  initialFormFieldValue,
} from "helper/constants/intakeForm/IntakeFormConstant";
import { FormFieldT } from "helper/types/intakeForm/FormFieldsType";

const CreateOrUpdateDynamicForm = (props) => {
  const { action } = props;
  const [formFields, setFormFields] = useState<FormFieldT[]>([
    initialFormFieldValue,
  ]);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [optionList, setOptionList] = useState<Array<string> | Array<number>>([""]);
  const [radioOptionList, setRadioOptionList] = useState<Array<string> | Array<number>>([""]);
  const [dateState, setDateState] = useState<string>("");
  const [formTitle, setFormTitle] = useState<string>("");
  const navigate = useNavigate();
  const { formName } = useParams();

  const [modalOpen, setModalOpen] = useState(false);

  useSingleEffect(() => {
    if (action === "EDIT") {
      axiosPrivate
        .get(`${env.API_URL}intake-forms/fields/${formName}/`)
        .then((res) => {
          setFormFields(res.data.data.data);
          setFormTitle(res.data.data.intake_form.title);
        });
    }
  });

  const addMoreField = () => {
    setFormFields((prev) => [...prev, initialFormFieldValue]);
    setCurrentFocus(currentFocus + 1);
  };

  const removeField = (index) => {
    const removeValues = [...formFields];
    removeValues?.splice(index, 1);
    setFormFields(removeValues);
  };

  const handleFieldChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> , index:number) => {
    const { name, value } = e.target;
    const updatedFormFields = [...formFields];
    updatedFormFields[index] = {
      ...updatedFormFields[index],
      [name]: value,
    };
    setFormFields(updatedFormFields);
  };

  const handleMetaDataChange = (value:boolean, index:number, metaDataName:string) => {
    // const { name, value } = e.target;
    const updatedFormFields = [...formFields];
    updatedFormFields[index] = {
      ...updatedFormFields[index],
      meta_data: {
        ...updatedFormFields[index].meta_data,
        [metaDataName]: value,
      },
    };
    setFormFields(updatedFormFields);
  };

  const handleValueChange = (value:string , index: number) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index] = {
      ...updatedFormFields[index],
      field_value: value,
    };
    setFormFields(updatedFormFields);
  };

  const handleMultipleChange = (value:string[] | number[], index:number, type:string) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index] = {
      ...updatedFormFields[index],
      options: type === "radio" ? radioOptionList : value,
      // options: [...updatedFormFields[index].options, value],
    };
    setFormFields(updatedFormFields);
  };

  const handleSave = () => {
    setModalOpen(true);
    // navigate("intake_forms_dynamic/preview");
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // a little function to help us with reordering the result
  const reOrder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleOnDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: any = reOrder(
      formFields,
      result.source.index,
      result.destination.index
    );

    console.log("DND Items", items);

    setFormFields(items);
  };

  const handleCopyElement = (item) => {
    setFormFields((prev) => [...prev, item]);
    setTimeout(() => {
      setCurrentFocus(currentFocus + 1);
    }, 100);
  };

  const handleFormCreate = () => {
    formFields.map((field) => {
      delete field?.form_version_data;
      delete field?.created;
      delete field?.modified;
      delete field?.form_version;
      delete field?.is_trashed;
      delete field?.id;
      delete field?.uuid;
      return true;
    });
    const finalPayload = {
      intake_form: {
        title: formTitle,
      },
      fields: formFields,
    };
    action === "CREATE"
      ? axiosPrivate
          .post(`${env.API_URL}intake-forms/fields/`, finalPayload)
          .then((res) => {
            handleModalClose();
            Notify({ text: res.data.message }).then(() => {
              setTimeout(() => {
                navigate(-1);
              }, 1000);
            });
            // swal({
            //   title: "",
            //   text: res.data.message,
            //   className: "successAlert",
            //   icon: "/img/logonew.svg",
            //   buttons: { visible: false },
            //   timer: 2000,
            // }).then(() => {
            //   setTimeout(() => {
            //     navigate(-1);
            //   }, 1000);
            // });
          })
          .catch((err) => {
            // Notify({});
            Notify({ text: err.message });
            // swal({
            //   title: "",
            //   text: err.message,
            //   className: "errorAlert",
            //   icon: "/img/logonew-red.svg",
            //   buttons: { visible: false },
            //   timer: 4000,
            // });
          })
      : axiosPrivate
          .put(`${env.API_URL}intake-forms/fields/${formName}/`, {
            fields: formFields,
          })
          .then((res) => {
            handleModalClose();
            swal({
              title: "",
              text: res.data.message,
              className: "successAlert",
              icon: "/img/logonew.svg",
              buttons: { visible: false },
              timer: 1000,
            }).then(() => {
              setTimeout(() => {
                navigate(-1);
              }, 500);
            });
          })
          .catch((err) => {
            swal({
              title: "",
              text: err.message,
              className: "errorAlert",
              icon: "/img/logonew-red.svg",
              buttons: { visible: false },
              timer: 4000,
            });
          });
  };

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-10 flex items-center justify-between gap-2 px-4 m-3 bg-white rounded shadow-sm drop-shadow-sm">
        <h3 className="mb-0">
          {action === "CREATE" ? "Create new form" : "Edit form"}
        </h3>
        <div className="flex gap-2 my-3">
          <Button
            variant="contained"
            className="flex-center !flex px-3 py-2 gap-2 mb-0 w-max [&.MuiButton-root]:m-[0_0_20px_auto]"
            onClick={handleSave}
          >
            Preview
          </Button>
          <Button
            variant="outlined"
            className="flex-center !flex px-3 py-2 gap-2 mb-0 w-max [&.MuiButton-root]:m-[0_0_20px_auto]"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
      <div className="p-3 m-3 bg-white ">
        <div className="flex justify-between items-center mb-[20px] border-b pb-[30px] ">
          <div className="input-fields-wrapper">
            <TextField
              fullWidth
              label="Form Name"
              variant="outlined"
              name="title"
              id="title"
              placeholder="Enter title"
              onChange={(e) => setFormTitle(e.target.value)}
              value={formTitle}
              disabled={action === "EDIT"}
            />
          </div>
        </div>
        <IntakeFormFields
          formFields={formFields}
          currentFocus={currentFocus}
          setCurrentFocus={setCurrentFocus}
          handleFieldChange={handleFieldChange}
          questionTypeOptions={fieldOptionType}
          handleValueChange={handleValueChange}
          handleMetaDataChange={handleMetaDataChange}
          handleMultipleChange={handleMultipleChange}
          optionList={optionList}
          setOptionList={setOptionList}
          radioOptionList={radioOptionList}
          setRadioOptionList={setRadioOptionList}
          dateState={dateState}
          setDateState={setDateState}
          addMoreField={addMoreField}
          removeField={removeField}
          handleOnDragEnd={handleOnDragEnd}
          isDragDisabled={true}
          handleCopyElement={handleCopyElement}
          showPreview={false}
        />
        <Dialog
          open={modalOpen}
          onClose={handleModalClose}
          className="w-full"
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle className="min-w-[60%]">
            {formTitle ? (
              formTitle
            ) : (
              <span className="text-red-500">Form name is missing</span>
            )}
          </DialogTitle>
          <DialogContent>
            <div className="w-full">
              <IntakeFormFields
                formFields={formFields}
                currentFocus={currentFocus}
                setCurrentFocus={setCurrentFocus}
                handleFieldChange={handleFieldChange}
                questionTypeOptions={fieldOptionType}
                handleValueChange={handleValueChange}
                handleMultipleChange={handleMultipleChange}
                handleMetaDataChange={handleMetaDataChange}
                addMoreField={addMoreField}
                removeField={removeField}
                optionList={optionList}
                setOptionList={setOptionList}
                radioOptionList={radioOptionList}
                setRadioOptionList={setRadioOptionList}
                dateState={dateState}
                setDateState={setDateState}
                handleOnDragEnd={handleOnDragEnd}
                isDragDisabled={false}
                handleCopyElement={handleCopyElement}
                showPreview={true}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <div className="flex justify-end w-full gap-2 pb-3 pr-4">
              <Button
                variant="contained"
                size="large"
                onClick={() => handleFormCreate()}
              >
                {action === "EDIT" ? "Update" : "Create"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="ml-2"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default CreateOrUpdateDynamicForm;
