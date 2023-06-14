/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const DropdownWithSearch = ({ filterList, handleChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");

  //modify the options array as per requirement
  const displayedOptions = useMemo(
    () =>
      filterList?.options?.map((option) => {
        return {
          label: option.name,
          value: option.name,
        };
      }),
    [filterList?.options]
  );

  useEffect(() => {
    handleChange(filterList?.name, selectedOption || "");
  }, [selectedOption]);

  return (
    filterList?.options?.length > 0 && (
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
              label={filterList?.label}
              value={selectedOption?.value || searchText}
              onChange={(event) => setSearchText(event.target.value)}
              variant="outlined"
            />
          );
        }}
        options={displayedOptions}
        value={selectedOption}
        onChange={(event, value) => setSelectedOption(value?.value)}
      />
    )
  );
};

export default DropdownWithSearch;
