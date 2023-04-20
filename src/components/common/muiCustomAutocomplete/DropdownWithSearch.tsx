import React, { useEffect, useMemo, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { IdNameObjectType, filterUIOptionsListType } from "helper/types/companies/comapniesType";

interface DropdownWithSearchPropsType {
  filterList: filterUIOptionsListType;
  handleChange: (filedName: string, value: any) => void;
}

interface OptionsListType {
  label: string;
  value: string;
}

const DropdownWithSearch = ({ filterList, handleChange }: DropdownWithSearchPropsType) => {
  // const [selectedOption, setSelectedOption] = useState<OptionsListType>({ label: "", value: "" });
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  //modify the options array as per requirement
  const displayedOptions = useMemo(
    () =>
      filterList?.options?.map((option: IdNameObjectType) => {
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
              value={selectedOption ? selectedOption : searchText}
              onChange={(event) => setSearchText(event.target.value)}
              variant="outlined"
            />
          );
        }}
        options={displayedOptions}
        // @ts-ignore
        value={selectedOption}
        onChange={(event, value) => { value ? setSelectedOption(value?.value) : setSelectedOption("") }}
      />
    )
  );
};

export default DropdownWithSearch;
