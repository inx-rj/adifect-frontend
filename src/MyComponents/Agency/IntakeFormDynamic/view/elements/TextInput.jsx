import { TextField } from "@mui/material";
import React from "react";

const TextInput = (props) => {
  const {
    item,
    errors,
    index,
    handleInputChange,
    formData,
    isPreviewMode,
    multiline = false,
    customClass = "",
    type,
    required,
  } = props;
  return (
    <div className="my-3">
      <TextField
        fullWidth
        id={item?.field_name}
        label={item?.field_name}
        variant="outlined"
        type={type}
        name={item?.field_name}
        error={!!errors?.[index]?.field_value?.[0]}
        helperText={errors?.[index]?.field_value?.[0]}
        onChange={(e) => handleInputChange(e, index)}
        value={formData[index]["field_value"] ?? ""}
        disabled={isPreviewMode}
        multiline={multiline}
        maxRows={multiline ? 4 : 1}
        className={customClass}
        required={required}
      />
    </div>
  );
};
export default TextInput;
