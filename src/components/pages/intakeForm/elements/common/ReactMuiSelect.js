import { Box, MenuItem, Select } from "@mui/material";
import Chip from "@mui/material/Chip";
import React from "react";
import { fieldOptionType } from "../const/IntakeFormConstant";

const ReactMuiSelect = (props) => {
  const {
    options = [{ label: "", value: "" }],
    multiple = false,
    value = { label: "", value: "" },
    handleSelectChange,
    rest,
    name,
    id,
    className = "",
    placeholder = "Select",
    required,
  } = props;

  return (
    <>
      <Select
        name={name}
        id={id}
        required={required}
        displayEmpty
        multiple={multiple}
        value={value}
        onChange={handleSelectChange}
        defaultValue=""
        className={`${className}`}
        renderValue={(selected) => {
          if (multiple) {
            if (selected?.length === 0) {
              return <span className="text-[#A3A3A3]">{placeholder}</span>;
            }

            return (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                }}
              >
                {selected?.map((value, i) => (
                  <Chip key={i} label={value} />
                ))}
              </Box>
            );
          } else {
            if (!selected.value) {
              return <span className="text-[#A3A3A3]">{placeholder}</span>;
            }

            return (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                }}
              >
                {
                  fieldOptionType.find((el) => el.value === selected?.value)
                    .label
                }
              </Box>
            );
          }
        }}
        {...rest}
      >
        {options?.map((option, i) => (
          <MenuItem key={i} value={option?.value}>
            {option?.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default ReactMuiSelect;
