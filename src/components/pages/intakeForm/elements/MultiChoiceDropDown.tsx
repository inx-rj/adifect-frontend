import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import UploadFile from "./UploadFile";
import * as XLSX from "xlsx"

const MultiChoiceDropDown = (props) => {
  const {
    label,
    handleFormChange,
    formFields,
    showPreview,
    optionList,
    setOptionList,
    currentFocusProp,
    index,
    required,
  } = props;
  const [currentFocus, setCurrentFocus] = useState(0);
  const [newValue, setNewValue] = useState([]);
  const [isBulkUpload, setIsBulkUpload] = useState(false);
  const [fileName, setFileName] = useState();

  const onChangeInput = (value, index) => {
    let inputValue = [...newValue];
    let updatedOptions = [...optionList];
    inputValue[index] = value;
    setNewValue(inputValue);
    setCurrentFocus(index);
    updatedOptions[index] = value;
    setOptionList(updatedOptions);

    appendValue(inputValue);
  };

  const appendValue = (value) => {
    handleFormChange(value, currentFocusProp);
  };

  const addNewField = () => {
    appendValue([...formFields[currentFocusProp].options, ""]);
  };

  const optionListDropdown = formFields?.[index]?.options?.map((field) => {
    return {
      value: field,
      label: field,
    };
  });

  const removeOption = (index) => {
    if (formFields?.[currentFocusProp]?.options?.length > 1) {
      const removeValues = [...formFields?.[currentFocusProp]?.options];
      removeValues?.splice(index, 1);
      appendValue(removeValues);
    }
  };

  const handleFileChange = (e) => {
    console.log('e[0].name', e[0].name)
    if (e[0].type === "text/csv") {
      var reader = new FileReader();
      reader.onload = function (e1) {
        const finalCSVData = reader.result?.["split"]("\r\n");
        appendValue(finalCSVData);
        setFileName(e[0].name);
      };
      reader.readAsText(e[0]);
    } else {
      excelToJson(e,  e[0].name);
    }
  };

  const excelToJson = (file, name) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: "binary",
      });
    
      workbook.SheetNames.forEach((sheetName) => {
        // Here is your object
        const XL_row_object = XLSX.utils?.["sheet_to_row_object_array"](workbook.Sheets[sheetName]);
        const json_object = JSON.stringify(XL_row_object);
        const XLSXData = [];
      
        JSON.parse(json_object).forEach((item) => {
          XLSXData.push(item?.Value);
        });
      
        appendValue(XLSXData);
        setFileName(name);
      });
      
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file[0]);
  };

  return (
    <div>
      {showPreview ? (
        <div className="input-fields-wrapper">
          <TextField
            id="field-type"
            name="field_type"
            select
            label="Select Question Type"
            placeholder="Select Question Type"
            fullWidth
            required={required}
          >
            {optionListDropdown.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex justify-end">
              <FormControlLabel
                control={<Switch />}
                label="Bulk Upload"
                onChange={(e) => setIsBulkUpload(e.target?.["checked"])}
                className="m-0"
              />
            </div>
            <label htmlFor="field-type" className="capitalize">
              {label}
            </label>
            {isBulkUpload ? (
              <UploadFile
                handleFileChange={handleFileChange}
                isDisabled={false}
                fileName={fileName}
              />
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // addNewField();
                }}
              >
                {formFields?.[index]?.options?.map((item, index) => (
                  <OutlinedInput
                    key={index}
                    type="text"
                    fullWidth
                    placeholder={`Option ${index + 1}`}
                    onChange={(e) => onChangeInput(e.target.value, index)}
                    endAdornment={
                      !showPreview && (
                        <div className="flex ">
                          <button
                            type="submit"
                            className="cursor-pointer"
                            onClick={() => addNewField()}
                            tabIndex={-1}
                          >
                            <InputAdornment position="end">
                              <AddIcon />
                            </InputAdornment>
                          </button>
                          <button
                            type="submit"
                            className="cursor-pointer"
                            tabIndex={-1}
                            onClick={() => removeOption(index)}
                          >
                            <InputAdornment position="end">
                              <Delete />
                            </InputAdornment>
                          </button>
                        </div>
                      )
                    }
                    className="my-2"
                    autoFocus={currentFocus === index}
                    value={item}
                    id="multiSelect"
                    // onBlur={(e) => appendValue(index)}
                  />
                ))}
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MultiChoiceDropDown;
