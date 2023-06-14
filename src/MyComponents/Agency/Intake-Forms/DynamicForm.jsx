import { useState } from "react";
import { fieldOptionType, initialFormFieldValue } from "./IntakeFormConstant";
import ReactMuiSelect from "./ReactMuiSelect";
import { AddOutlined, DeleteForeverOutlined } from "@mui/icons-material";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { useMemo } from "react";

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([initialFormFieldValue]);

  const handleFieldTypeChange = (event, index) => {
    let values = [...formFields];
    console.log("FFF", index, event.target.value);
    values[index]["field_type"] = event.target.value;

    setFormFields(values);
  };

  const addMoreField = () => {
    console.log("addValues");
    const addValues = [...formFields];
    addValues?.push(initialFormFieldValue);
    setFormFields(addValues);
  };

  const removeField = (index) => {
    const removeValues = [...formFields];
    removeValues?.splice(index, 1);
    setFormFields(removeValues);
  };

  const questionTypeOptions = useMemo(
    () =>
      fieldOptionType?.map((field) => {
        return {
          value: field,
          label: field,
        };
      }),
    [fieldOptionType]
  );

  console.log("formFields", formFields);

  return (
    <>
      <div className="p-[20px]">
        <div className="flex justify-between items-start mb-[20px] border-b pb-[20px]">
          <div className="input-fields-wrapper">
            <label>Form Name</label>
            <input
              className={` max-w-[530px] capitalize input-style
              `}
              type="text"
              name="title"
              id="title"
              placeholder="Enter form name"
              //   value={createForm?.["title"] || formName?.replace(/-/g, " ")}
            />
            {/* <span className="err-tag">{errors?.["title"] ?? " "}</span> */}
          </div>
        </div>
        <Button
          variant="contained"
          className="btn btn-primary flex-center !flex px-3 py-2 gap-2 [&.MuiButton-root]:m-[0_0_20px_auto]"
          onClick={addMoreField}
        >
          <AddOutlined fontSize="medium" />
          Add more field
        </Button>
        <div className="grid grid-cols-1 gap-[20px]">
          {formFields?.map((fieldItem, fieldIndex) => {
            return (
              <div
                key={fieldIndex}
                className="bg-white border rounded p-[16px]"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="input-fields-wrapper">
                    <label>Enter Question</label>
                    <input
                      className="input-style"
                      type="text"
                      // name={item?.field_name}
                      // id={item?.field_name}
                      placeholder={`Enter Question`}
                      // value={formFields[index]["field_value"]}
                    />
                  </div>
                  <div className="input-fields-wrapper">
                    <label>Select Question Type</label>
                    <ReactMuiSelect
                      options={questionTypeOptions ?? []}
                      // options={geographyOptions}
                      //   value={formFields[fieldIndex]["field_type"]}
                      handleSelectChange={(e) =>
                        handleFieldTypeChange(e, fieldIndex)
                      }
                      name="field-type"
                      id="field-type"
                      // placeholder={`Select ${item?.field_name}`}
                    />
                  </div>
                  {formFields[fieldIndex]["field_type"] && (
                    <div className="col-span-2">
                      {formFields[fieldIndex]["field_type"] ===
                        "Short Answer" && (
                        <>
                          <label>Short Answer Text</label>
                          <input
                            className="input-style"
                            type="text"
                            name="short-answer"
                            id="short-answer"
                            placeholder={`Enter Short Answer Text`}
                            disabled
                          />
                        </>
                      )}
                      {formFields[fieldIndex]["field_type"] === "Paragraph" && (
                        <>
                          <label>Long Answer Text</label>
                          <textarea
                            className="input-style h-auto"
                            name="long-answer"
                            id="long-answer"
                            placeholder={`Enter Long Answer Text`}
                            rows="4"
                            cols="50"
                            disabled
                          ></textarea>
                        </>
                      )}
                    </div>
                  )}
                  <div className="col-span-2 flex justify-end items-center">
                    <FormControlLabel control={<Switch />} label="Required" />
                    <span
                      onClick={() => removeField(fieldIndex)}
                      className="text-danger block text-right text-sm cursor-pointer"
                    >
                      <DeleteForeverOutlined />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DynamicForm;
