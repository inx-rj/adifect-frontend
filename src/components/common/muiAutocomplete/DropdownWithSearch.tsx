/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { filterUIOptionsListType } from "helper/types/companies/comapniesType";

interface DropdownWithSearchPropsType {
  filterList: filterUIOptionsListType;
  handleChange: (filedName: string, value: any) => void;
  currentValue?: number;
}

const DropdownWithSearch = ({
  filterList,
  handleChange,
  currentValue,
}: DropdownWithSearchPropsType) => {
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: number;
  } | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  //modify the options array as per requirement
  const displayedOptions = useMemo(
    () =>
      filterList?.options?.map((option: any) => {
        return {
          label: filterList.labelAs
            ? option?.[filterList.labelAs]
            : option.name,
          value: filterList.valueAs
            ? option?.[filterList.valueAs]
            : option.name,
        };
      }),
    [filterList?.options]
  );

  useEffect(() => {
    handleChange(filterList?.name, selectedOption?.value || "");
  }, [selectedOption]);

  //auto select
  useEffect(() => {
    if (currentValue) {
      setSelectedOption(
        displayedOptions.find((item) => item.value === currentValue)
      );
    }
  }, [displayedOptions, currentValue]);

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
              value={selectedOption ? selectedOption : searchText}
              onChange={(event) => setSearchText(event.target.value)}
              variant="outlined"
            />
          );
        }}
        options={displayedOptions}
        // @ts-ignore
        value={selectedOption?.label || ""}
        onChange={(event, value) => {
          value ? setSelectedOption(value) : setSelectedOption(null);
        }}
      />
    )
  );
};

export default DropdownWithSearch;
