import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useMemo } from "react";

const MuiAutoComplete = ({
  placeholder = "Select Value",
  label = "",
  filterList,
  // setSelectedOption,
  selectedOption,
  setSearchText,
  searchText,
  handleChange,
  disabled = false,
  customClass
}) => {
  return (
    <Autocomplete
      sx={{
        "&.MuiAutocomplete-root": {
          "& .MuiAutocomplete-endAdornment": {
            "& .MuiAutocomplete-clearIndicator": {
              zIndex: 10,
            },
          },
          "& .MuiTextField-root": {
            "& .MuiFormLabel-root": {
              background: "white",
              fontSize: "14px",
              lineHeight: "17px",
              top: "-3px",
              "&.MuiInputLabel-shrink": {
                marginTop: "7px",
              },
            },
            "& .MuiAutocomplete-inputRoot": {
              paddingRight: "0",
              background: "transparent",
              height: "100%",
              "& .MuiAutocomplete-input": {
                border: "0px solid transparent !important",
                height: "auto",
                position: "relative",
                zIndex: 3,
                p: 0,
                marginRight: "55px",
              },
              "& .MuiInputAdornment-root": {
                marginRight: "5px",
                marginLeft: "0",
              },
            },
          },
        },
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            className="input-style"
            label={label}
            placeholder={placeholder}
            value={selectedOption ? selectedOption : searchText}
            onChange={(event) => setSearchText(event.target.value)}
            variant="outlined"
          />
        );
      }}
      className={`${customClass} cursor-pointer custom-scrollbar`}
      options={filterList}
      getOptionLabel={(option) => option.name}
      value={selectedOption}
      onChange={(event, value) => {
        // console.log("hhhhhhhhhhhhhhhhhhhhh", value, event);
        // setSelectedOption(value);
        handleChange(event, value);
      }}
      disabled={disabled}
    />
  );
};

export default MuiAutoComplete;
