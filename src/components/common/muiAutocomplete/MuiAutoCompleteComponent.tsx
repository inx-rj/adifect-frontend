import React, { useEffect, useMemo } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { LabelValueOptionType } from "helper/types/common/commonType";

interface ReactSelectFieldPropsType {
  // --------> TextField (input)
  inputId?: string;
  label?: string;
  inputName?: string;
  placeholder: string;
  required?: boolean;
  // --------> TextField (input)
  disabled?: boolean; // Component disable/readOnly
  disableClearable?: boolean; // show/hide - clear endAdornment
  options: LabelValueOptionType[]; // Options list
  multiple?: boolean; // multiple option selection
  limitTags?: number; // multiple selected option display limit
  getOptionLabel?: (option: LabelValueOptionType) => string; // determine/customize selected displayed option string
  selectedOption: LabelValueOptionType | LabelValueOptionType[]; // selected option/options
  setSearchText?: any; // stores onInputChange search value
  searchText?: string; // searched value
  handleChange: (event: React.SyntheticEvent, value: LabelValueOptionType | LabelValueOptionType[]) => void;
  loading?: boolean;
  // handling autocomplete onChange
  // All other props(rest)
  [restProps: string]: any; // other props based on requirements
}

const MuiAutoCompleteComponent = (props: ReactSelectFieldPropsType) => {

  const {
    inputId = "",
    name = "",
    label = "",
    placeholder = "Select Value",
    required = true,
    disabled = false,
    disableClearable = false,
    options = [{ label: "No Option Available", value: 0 }],
    multiple = false,
    limitTags = 2,
    getOptionLabel = (option: LabelValueOptionType) => option?.['label'],
    filterSelectedOptions = true,
    selectedOption,
    setSearchText,
    searchText = "",
    handleChange,
    customClass = "",
    loading=false,
    ...restProps
  } = props;

  // const matchStr = (searchVal: string, matchVal: string) =>
  //   searchVal?.toLowerCase().match(new RegExp(matchVal.toLowerCase(), "g"));

  // //To store memorized value of filtered(searched) data array, this helps when other then dependencies, state of this component changes will not filter again.
  // const filteredData = useMemo(() => options.filter((optionItem) => matchStr(optionItem?.['label'], searchText)), [options, searchText]);

  useEffect(() => {
    console.log({ searchText, options, props });
  }, [searchText])

  return (
    <Autocomplete
      sx={{
        "&.MuiAutocomplete-root": {
          "& .MuiAutocomplete-endAdornment": {
            "& .MuiAutocomplete-clearIndicator": {
              zIndex: 10,
            },
          },
          "& .MuiAutocomplete-tag": {
            margin: 0,
            mr: 1
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
      className={`${customClass} cursor-pointer custom-scrollbar`}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            className="input-style"
            variant="outlined"
            id={inputId}
            name={name}
            label={label}
            placeholder={placeholder}
            // value={selectedOption ? selectedOption : searchText}
            value={searchText || selectedOption?.['label']}
            onChange={(event) => setSearchText && setSearchText(event.target.value)}
            required={required}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading && (
                    <CircularProgress className="mr-8 text-black" size={18} />
                  )}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        );
      }}
      disabled={disabled}
      loading={loading}
      disableClearable={disableClearable}
      getOptionDisabled={(disabledOption) => disabledOption.label === "No Option Available"}
      options={options}
      multiple={multiple}
      limitTags={limitTags}
      getOptionLabel={getOptionLabel}
      filterSelectedOptions={filterSelectedOptions}
      value={selectedOption}
      onChange={(event, value) => {
        handleChange(event, value);
        setSearchText && setSearchText('');
      }}
      onClose={() => setSearchText && setSearchText("")}
      
      {...restProps}
    />
  );
};

export default MuiAutoCompleteComponent;