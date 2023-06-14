import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import ReactDatePicker from "./ReactDatePicker";
import ReactMuiSelect from "./ReactMuiSelect";
import { USA_States } from "./USA_State";
import { FileUploadOutlined } from "@mui/icons-material";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { flightList, plateformsList } from "./IntakeFormConstant";

const GenericForm = (props) => {
  const { genericForm, setGenericForm, previewMode = false } = props;

  const handleInputChange = (event, index) => {
    let values = [...genericForm];
    values[index]["field_value"] = event.target.value;

    setGenericForm(values);
  };

  const handleDateChange = (value, index, name) => {
    let values = [...genericForm];
    values[index]["field_value"] = value;
    setGenericForm(values);
  };

  const handleUploadAttachment = (e, index, name) => {
    let values = [...genericForm];
    values[index]['field_value'] = e.target.files[0];
    setGenericForm(values);
  };
  const flightOptions = useMemo(
    () =>
      flightList?.map((flight) => {
        return {
          value: flight?.toLowerCase(),
          label: flight,
        };
      }),
    [flightList]
  );

  const plateformsOptions = useMemo(
    () =>
      plateformsList?.map((plateform) => {
        return {
          value: plateform?.toLowerCase(),
          label: plateform,
        };
      }),
    [plateformsList]
  );

  const geographyOptions = useMemo(
    () =>
      USA_States?.map((state) => {
        return {
          value: state?.toLowerCase(),
          label: state,
        };
      }),
    [USA_States]
  );
  // console.log("genericForm", genericForm);
  return (
    <>
      {genericForm?.map((item, index) => {
        return (
          <div key={index} className="input-fields-wrapper">
            <label>{item?.field_name}</label>
            {item?.field_type === "Short Answer" && (
              <>
                <input
                  className="input-style"
                  type="text"
                  name={item?.field_name}
                  id={item?.field_name}
                  placeholder={`Enter ${item?.field_name}`}
                  value={genericForm[index]["field_value"] ?? ""}
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={previewMode}
                />
                <span className="err-tag"> </span>
              </>
            )}
            {item?.field_type === "Paragraph" && (
              <>
                <textarea
                  className="input-style h-auto"
                  name={item?.field_name}
                  id={item?.field_name}
                  placeholder={`Enter ${item?.field_name}`}
                  rows="4"
                  cols="50"
                  value={genericForm[index]["field_value"] ?? ""}
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={previewMode}
                ></textarea>
                <span className="err-tag"> </span>
              </>
            )}
            {item?.field_type === "Multi Select Dropdown" && (
              <>
                <ReactMuiSelect
                  multiple
                  options={
                    ((item?.field_name === "Geography" && geographyOptions) ||
                      (item?.field_name === "Platforms" && plateformsOptions) ||
                      (item?.field_name === "Flight Length" &&
                        flightOptions)) ??
                    []
                  }
                  // options={geographyOptions}
                  value={genericForm[index]["field_value"] ?? []}
                  handleSelectChange={(e) => handleInputChange(e, index)}
                  name={item?.field_name}
                  id={item?.field_name}
                  placeholder={`Select ${item?.field_name}`}
                  disabled={previewMode}
                />
                <span className="err-tag"> </span>
              </>
            )}
            {(item?.field_type === "Date" ||
              item?.field_type === "Date Range") && (
              <>
                <ReactDatePicker
                  value={
                    genericForm[index]["field_value"] ?? {
                      startDate: null,
                      endDate: null,
                    }
                  }
                  onChange={(val) =>
                    handleDateChange(val, index, item?.field_name)
                  }
                  name={item?.field_name}
                  id={item?.field_name}
                  isSingle={item?.field_type === "Date Range" ? false : true}
                  useRange={item?.field_type === "Date Range" && true}
                  disabled={previewMode}
                />
                <span className="err-tag"> </span>
              </>
            )}

            {item?.field_type === "Upload Attachment" && (
              <>
                <div className="w-full relative input-style cursor-pointer h-full flex items-center justify-center">
                  <div className="text-[#a3a3a3]">
                    <FileUploadOutlined /> Upload Attachment
                  </div>
                  <input
                    type="file"
                    name={item?.field_name}
                    id={item?.field_name}
                    alt={item?.field_name}
                    onChange={(e) =>
                      handleUploadAttachment(e, index, item?.field_name)
                    }
                    className="absolute inset-0 z-[5] opacity-0 cursor-pointer"
                    accept=".jpg, .png, .pdf, .xlsx"
                    disabled={previewMode}
                  />
                </div>
                <span className="err-tag"> </span>
              </>
            )}

            {/* Radio */}
            {item?.field_type === "Radio Button" && (
              <>
                <RadioGroup
                  aria-labelledby={`${item?.field_name}-label`}
                  defaultValue={genericForm[index]["field_value"] ?? ""}
                  name={item?.field_name}
                  id={item?.field_name}
                  value={genericForm[index]["field_value"] ?? ""}
                  disabled={previewMode}
                >
                  {JSON.parse(item?.options)?.map((option, optionIndex) => {
                    return (
                      <FormControlLabel
                        key={optionIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                        onChange={(e) => handleInputChange(e, index)}
                        className="capitalize"
                        disabled={previewMode}
                      />
                    );
                  })}
                </RadioGroup>
                <span className="err-tag"> </span>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default GenericForm;
