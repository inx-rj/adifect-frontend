import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const CustomMuiAutoComplete = ({
  placeholder = "Select Value",
  label,
  disableClearable = false,
  filterList,
  setSelectedOption,
  selectedOption,
  setSearchText,
  searchText,
  ...props
}) => {
  return (
    <>
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
        onClose={() => setSearchText("")}
        disableClearable={disableClearable}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              className="input-style"
              label={label}
              placeholder={placeholder}
              value={selectedOption?.value || searchText}
              onChange={(event) => setSearchText(event.target.value)}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          );
        }}
        options={filterList}
        value={selectedOption}
        onChange={(event, value) => setSelectedOption(value)}
        {...props}
      />
    </>
  );
};

export default CustomMuiAutoComplete;
