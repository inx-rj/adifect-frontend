import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const CustomDateRangePicker = ({
  handleChange,
  containerClassName,
  inputClassName = "border dr-picker-input",
  ...props
}) => {
  const [value, setValue] = useState({ startDate: null, endDate: null });

  const handleValueChange = (newValue) => {
    const { startDate, endDate } = newValue;
    setValue(newValue);
    if (!startDate || !endDate) {
      handleChange("from_date", startDate);
      handleChange("to_date", endDate);
    }
  };

  useEffect(() => {
    if (value.startDate) handleChange("from_date", value.startDate);
    if (value.endDate) handleChange("to_date", value.endDate);
  }, [value]);

  return (
    <Datepicker
      {...props}
      separator={"to"}
      useRange={false}
      value={value}
      onChange={handleValueChange}
      containerClassName={`${containerClassName} relative focus-visible:outline-0`}
      inputClassName={inputClassName}
      placeholder={"Date Range"}
    />
  );
};

export default CustomDateRangePicker;
