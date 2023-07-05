import { FileUploadOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import ReactDatePicker from "../elements/common/ReactDatePicker";
import DownloadFileInput from "../view/elements/DownloadFileInput";
import PreviewFileName from "../view/elements/PreviewFileName";
import TextInput from "../view/elements/TextInput";
import UploadFileInput from "../view/elements/UploadFileInput";
import {
  DateRangeType,
  DatepickerType,
} from "react-tailwindcss-datepicker/dist/types";

interface DatePickerCustomProps extends DatepickerType {
  // onChange: (
  //   value: DateValueType,
  //   e?: HTMLInputElement | null | undefined
  // ) => void;
  // value: string;
  component: React.FC<DatepickerType>;
}

const TextFieldDatePicker = React.forwardRef<
  DatepickerType,
  DatePickerCustomProps
>((props, ref) => {
  const { component: Component, ...other } = props;
  return <Component {...other} />;
});

// const TextFieldDatePicker = React.forwardRef(
//   (props: { component: React.FC<DatepickerType> }, ref) => {
//     const { component: Component, ...other } = props;
//     return (
//       <Component
//         value={{
//           startDate: "",
//           endDate: "",
//         }}
//         onChange={function (value: DateRangeType, e?: HTMLInputElement): void {
//           throw new Error("Function not implemented.");
//         }}
//         {...other}
//       />
//     );
//   }
// );

const GenericForm = (props) => {
  const {
    genericForm,
    setGenericForm,
    previewMode = false,
    isReset = false,
    errors = [],
  } = props;

  // Handle input change
  const handleInputChange = (event, index) => {
    let values = [...genericForm];
    values[index]["field_value"] = event.target.value;
    setGenericForm(values);
  };

  // Handle Date change
  const handleDateChange = (value, index, name) => {
    let values = [...genericForm];
    values[index]["field_value"] = value;
    setGenericForm(values);
  };

  // Convert to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // Handle file attachment
  const handleUploadAttachment = async (e, index, name) => {
    let values = [...genericForm];
    const files = e?.target?.files?.[0];
    if (files) {
      values[index]["preview_field_name"] = files?.name;
      values[index]["field_value"] = await toBase64(files);
      setGenericForm(values);
    }
  };
  //Hnadle Field change
  const handleFieldChange = (value, index, multiple) => {
    // console.log("value", value);
    const updatedFormFields = [...genericForm];
    updatedFormFields[index] = {
      ...updatedFormFields[index],
      field_value: value,
    };
    setGenericForm(updatedFormFields);
  };

  // Handle remove attachment
  const handleFileRemove = (index) => {
    let values = [...genericForm];
    values[index]["field_value"] = null;
    values[index]["preview_field_name"] = null;
    setGenericForm(values);
  };
  useEffect(() => {
    if (isReset) {
      // console.log({ genericForm })
      genericForm.map((item) => {
        item.field_value = null;
        item.preview_field_name = null;
        return item;
      });
    }
  }, [isReset]);

  // Set dropdown height
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const fieldDropDownOptions = (options) => {
    const optionListDropdown = options?.map((field) => {
      return {
        value: field,
        label: field,
      };
    });

    return optionListDropdown;
  };

  return (
    <>
      <div className="input-fields-wrapper">
        {genericForm?.map((item, index) => {
          if (
            item?.field_type === "text" ||
            item?.field_type === "textarea" ||
            item?.field_type === "number"
          ) {
            return (
              <TextInput
                key={index}
                item={item}
                errors={errors}
                index={index}
                type={item?.field_type}
                handleInputChange={(e) => handleInputChange(e, index)}
                formData={genericForm}
                isPreviewMode={previewMode}
                multiline={item?.field_type === "textarea"}
                customClass={
                  item?.field_type === "textarea"
                    ? "w-full min-h-[100px] intake-form-textarea"
                    : "w-full"
                }
                required={item?.meta_data?.is_required}
              />
            );
          } else if (item?.field_type === "options") {
            return (
              <div key={index} className="my-3">
                {/* <TextField
                  id="field-type"
                  name="field_value"
                  select
                  label={item?.field_name}
                  placeholder={item?.field_name}
                  fullWidth
                  disabled={previewMode}
                  onChange={(e) => handleFieldChange(e, index)}
                  value={genericForm[index]["field_value"]}
                >
                  {item?.options ? (
                    fieldDropDownOptions(item?.options)?.map((option) => (
                      <MenuItem
                        defaultValue={genericForm[index]["field_value"]}
                        key={option.value}
                        value={option.value}
                        selected={genericForm[index]["field_value"]}
                      >
                        {option.label}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={genericForm[index]["field_value"]}>
                      {genericForm[index]["field_value"]}
                    </MenuItem>
                  )}
                </TextField> */}

                <Autocomplete
                  multiple={item?.meta_data?.is_multiple}
                  disabled={previewMode}
                  id="field-type"
                  options={
                    item?.options ||
                    (Array.isArray(item?.field_value)
                      ? item?.field_value
                      : [item?.field_value])
                  }
                  // getOptionLabel={(option) => option.label}
                  defaultValue={genericForm[index]["field_value"]}
                  filterSelectedOptions
                  onChange={(e, val) => {
                    handleFieldChange(val, index, item?.meta_data?.is_multiple);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label={item?.field_name} />
                  )}
                />
              </div>
            );
          } else if (
            item?.field_type === "date_picker" ||
            item?.field_type === "date_range_picker"
          ) {
            return (
              <div key={index} className="my-4">
                <TextField
                  id={item?.field_name}
                  label={item?.field_name}
                  variant="outlined"
                  name={item?.field_name}
                  error={!!errors?.[index]?.field_value?.[0]}
                  helperText={errors?.[index]?.field_value?.[0]}
                  fullWidth
                  placeholder=""
                  className="border-transparent h-[50px]"
                  disabled={previewMode}
                  InputProps={{
                    inputComponent: TextFieldDatePicker as any,
                    inputProps: {
                      component: ReactDatePicker as any,
                      containerClassName: "w-full",
                      isSingle: item?.field_type === "date_picker",
                      useRange:
                        item?.field_type === "date_range_picker" && true,
                      isDisabled: { previewMode },
                      onChange: (val) =>
                        handleDateChange(val, index, item?.field_type),
                      value: genericForm[index]["field_value"] ?? {
                        startDate: null,
                        endDate: null,
                      },
                    },
                  }}
                />
              </div>
            );
          } else if (
            item?.field_type === "radio" ||
            item?.field_type === "radio_multiple"
          ) {
            return (
              <div className="my-3" key={index}>
                <span>{item?.field_name}</span>
                <RadioGroup
                  aria-labelledby={`${item?.field_name}-label`}
                  defaultValue={genericForm[index]["field_value"] ?? ""}
                  name={item?.field_name}
                  id={item?.field_name}
                  value={genericForm[index]["field_value"] ?? ""}
                >
                  {item?.options ? (
                    item?.options?.map((option, optionIndex) => {
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
                    })
                  ) : (
                    <FormControlLabel
                      value={genericForm[index]["field_value"]}
                      control={<Radio />}
                      label={genericForm[index]["field_name"]}
                      onChange={(e) => handleInputChange(e, index)}
                      className="capitalize"
                      disabled={previewMode}
                    />
                  )}
                </RadioGroup>
                {errors?.[index]?.field_value?.[0] && (
                  <span className="err-tag">
                    {errors?.[index]?.field_value?.[0]}
                  </span>
                )}
              </div>
            );
          } else if (item?.field_type === "checkbox") {
            return (
              <div className="my-3" key={index}>
                <span>{item?.field_name}</span>
                {item?.options?.map((option, optionIndex) => {
                  return (
                    <FormControlLabel
                      key={optionIndex}
                      value={option}
                      control={<Checkbox />}
                      label={option}
                      onChange={(e) => handleInputChange(e, index)}
                      className="flex items-center capitalize formPreviewCheckBox"
                      disabled={previewMode}
                    />
                  );
                })}
                {errors?.[index]?.field_value?.[0] && (
                  <span className="err-tag">
                    {errors?.[index]?.field_value?.[0]}
                  </span>
                )}
              </div>
            );
          } else if (item?.field_type === "file") {
            return (
              <div key={index} className="my-3">
                <span className={`${previewMode ? "text-gray-500" : ""}`}>
                  {item?.field_name}
                </span>

                <div className="relative flex items-center justify-center w-full h-full cursor-pointer input-style">
                  {item?.preview_field_name ? (
                    <PreviewFileName
                      fileName={item?.preview_field_name}
                      index={index}
                      handleFileRemove={handleFileRemove}
                    />
                  ) : previewMode && item?.field_value ? (
                    <DownloadFileInput
                      fileValue={item?.field_value}
                      previewMode={previewMode}
                    />
                  ) : (
                    <div className="text-[#a3a3a3]">
                      <FileUploadOutlined /> Upload Attachment
                    </div>
                  )}
                  <UploadFileInput
                    fieldName={item?.field_name}
                    index={index}
                    isPreviewMode={previewMode}
                    handleUploadAttachment={handleUploadAttachment}
                    isDisabled={true}
                  />
                </div>
                <span className="err-tag">
                  {errors?.[index]?.field_value?.[0]}
                </span>
              </div>
            );
          } else {
            return <div key={index}></div>;
          }
        })}
      </div>
    </>
  );
};

export default GenericForm;
