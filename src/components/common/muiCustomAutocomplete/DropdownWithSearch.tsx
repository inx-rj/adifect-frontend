import React, { useEffect, useMemo, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { filterUIOptionsListType } from "helper/types/companies/comapniesType";

interface DropdownWithSearchPropsType {
  filterList: filterUIOptionsListType;
  handleChange: (filedName: string, value: string) => void;
}

interface OptionsListType {
  label: string;
  value: string;
}

const DropdownWithSearch = ({ filterList, handleChange }: DropdownWithSearchPropsType) => {
  const [selectedOption, setSelectedOption] = useState<OptionsListType>({ label: "", value: "" });
  const [searchText, setSearchText] = useState<string>("");

  //modify the options array as per requirement
  const displayedOptions: OptionsListType[] = useMemo(
    () =>
      filterList?.options?.map((option: string) => {
        return {
          label: option,
          value: option,
        };
      }),
    [filterList?.options]
  );

  useEffect(() => {
    if (selectedOption.value) {
      handleChange(filterList?.name, selectedOption.value || "");
    }
  }, [selectedOption]);

  return (
    (filterList?.options?.length > 0) && (
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
                  marginRight: "55px"
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
              value={selectedOption.value ? selectedOption.value : searchText}
              onChange={(event) => setSearchText(event.target.value)}
              variant="outlined"
            />
          );
        }}
        options={displayedOptions}
        value={selectedOption}
        onChange={(event, value) => setSelectedOption(value)}
      />
    )
  );
};

export default DropdownWithSearch;
