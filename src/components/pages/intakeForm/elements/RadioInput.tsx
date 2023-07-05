import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  FormControlLabel,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";

const RadioInput = (props) => {
  const {
    label,
    handleFormChange,
    index,
    radioOptionList,
    setRadioOptionList,
    showPreview,
    formFields,
    currentFocusProp,
    required,
  } = props;
  const [currentFocus, setCurrentFocus] = useState(0);

  const [newValue, setNewValue] = useState<string | string[] | null>("");

  const onChangeInput = (value:string | number, index: number) => {
    let inputValue = [...newValue];
    let updatedOptions = [...radioOptionList];
    inputValue[index] = value as string;
    setNewValue(inputValue);
    setCurrentFocus(index);
    updatedOptions[index] = value;
    setRadioOptionList(updatedOptions);

    appendValue(inputValue);
  };

  const appendValue = (value) => {
    handleFormChange(value, currentFocusProp);
  };

  const addNewField = () => {
    appendValue([...formFields[currentFocusProp].options, ""]);
  };

  const removeOption = (index) => {
    if (formFields?.[currentFocusProp]?.options?.length > 1) {
      const removeValues = [...formFields?.[currentFocusProp]?.options];
      removeValues?.splice(index, 1);
      appendValue(removeValues);
    }
  };

  return (
    <div>
      <label
        htmlFor=""
        className={`capitalize ${showPreview ? "text-gray-500" : ""}`}
      >
        {label}
      </label>
      <div className="flex flex-col">
        {showPreview ? (
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {formFields?.[index]?.options?.map((item, index) => (
              <FormControlLabel value={item} control={<Radio />} label={item} />
            ))}
          </RadioGroup>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // addNewField();
            }}
          >
            {formFields?.[index]?.options?.map((item, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  name="radio_button"
                  className="ml-2"
                  disabled
                />

                <Input
                  type="text"
                  onChange={(e) => onChangeInput(e.target.value, index)}
                  endAdornment={
                    !showPreview && (
                      <div className="flex">
                        <Button
                          type="submit"
                          tabIndex={-1}
                          className="cursor-pointer"
                          onClick={() => addNewField()}
                        >
                          <InputAdornment position="end">
                            <AddIcon />
                          </InputAdornment>
                        </Button>
                        <Button
                          tabIndex={-1}
                          type="button"
                          className="cursor-pointer"
                          onClick={() => removeOption(index)}
                        >
                          <InputAdornment position="end">
                            <Delete />
                          </InputAdornment>
                        </Button>
                      </div>
                    )
                  }
                  fullWidth
                  className="m-2 hover:border-transparent"
                  autoFocus={false}
                  value={item}
                />
              </div>
            ))}
          </form>
        )}
      </div>
    </div>
  );
};

export default RadioInput;
