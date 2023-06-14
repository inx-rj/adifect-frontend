import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React from "react";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import CommonTextField from "./CommonTextField";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import TextField from "@material-ui/core/TextField";

function MuiSelectAutoCompleted(props) {
  const {
    options,
    noOptionsText,
    onInputChange,
    errorText,
    disabled,
    InputProps,
    ...restProps
  } = props;

  return (
    <Autocomplete
      options={options}
      multiple={false}
      noOptionsText={noOptionsText}
      // renderOption={option => <React.Fragment>{option}</React.Fragment>}
      ChipProps={{ color: "primary" }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            label={props.label}
            disabled={disabled}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {props.loading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null}
                  {disabled ? "" : params.InputProps.endAdornment}
                </React.Fragment>
              ),
              ...InputProps,
            }}
          />
        );
      }}
      disableCloseOnSelect
      onInputChange={onInputChange}
      filterOptions={(options) => options}
      {...restProps}
    />
  );
}

export default MuiSelectAutoCompleted;
