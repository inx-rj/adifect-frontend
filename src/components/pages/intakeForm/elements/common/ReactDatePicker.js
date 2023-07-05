import React from "react";
import Datepicker from "react-tailwindcss-datepicker";

const ReactDatePicker = (props) => {
  const {
    value,
    name,
    id,
    onChange,
    containerClassName,
    inputClassName = "dr-picker-input disabled:bg-transparent disabled:text-gray-500",
    placeholder = "Select Date",
    isSingle = true,
    useRange = false,
    isDisabled = false,
    rest,
  } = props;

  return (
    <Datepicker
      value={value}
      name={name}
      id={id}
      onChange={onChange}
      containerClassName={`${containerClassName} relative focus-visible:outline-0`}
      inputClassName={inputClassName}
      placeholder={placeholder}
      asSingle={isSingle}
      useRange={useRange}
      disabled={isDisabled}
      {...rest}
    />
  );
};

export default ReactDatePicker;
