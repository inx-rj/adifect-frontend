import { MenuItem, Select } from "@mui/material";
import React from "react";

const ReactMuiSelect = (props) => {
  const {
    options = [{ label: "", value: "" }],
    multiple = false,
    value = [{ label: "", value: "" }],
    handleSelectChange,
    rest,
    name,
    id,
    className = "",
    placeholder = "Select",
  } = props;

  return (
    <>
      <Select
        name={name}
        id={id}
        displayEmpty
        multiple={multiple}
        value={value}
        onChange={handleSelectChange}
        defaultValue=""
        className={`${className} mui-select`}
        renderValue={(selected) => {
          if (selected?.length === 0) {
            return <span className="text-[#A3A3A3]">{placeholder}</span>;
          }

          return selected.join(", ");
        }}
        {...rest}
      >
        {options?.map((option) => (
          <MenuItem key={option?.value} value={option?.value}>
            {option?.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default ReactMuiSelect;
