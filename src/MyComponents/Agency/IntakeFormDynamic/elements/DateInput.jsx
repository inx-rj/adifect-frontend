import { TextField } from "@mui/material";
import React from "react";
import ReactDatePicker from "../elements/common/ReactDatePicker";

const DateInput = (props) => {
  const { handleDateChange, index, dateRange, dateState, setDateState, label } =
    props;

  return (
    <>
      <label htmlFor="datepicker" className="capitalize ">
        {label}
      </label>
      <div>
        <ReactDatePicker
          minDate={new Date()}
          onChange={(newValue) => {
            setDateState(newValue);
            handleDateChange(newValue.toString(), index);
          }}
          renderInput={(params) => <TextField variant="standard" {...params} />}
          containerClassName="w-full border rounded flex h-[60px] "
          isSingle={dateRange ? false : true}
          useRange={dateRange}
          value={dateState}
          isDisabled={true}
        />
      </div>
    </>
  );
};

export default DateInput;
