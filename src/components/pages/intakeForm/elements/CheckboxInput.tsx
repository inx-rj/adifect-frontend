import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  InputAdornment,
  List,
} from "@mui/material";
import { CheckboxT } from "helper/types/intakeForm/elements/CheckboxType";
import React, { useState } from "react";

const CheckboxInput = (props: CheckboxT) => {
  const {
    label,
    handleFormChange,
    index,
    radioOptionList,
    setRadioOptionList,
    showPreview,
    formFields,
    currentFocusProp,
  } = props;
  const [currentFocus, setCurrentFocus] = useState<number>(0);

  const [newValue, setNewValue] = useState<string | string[] | null>(null);

  const onChangeInput = (value:string | number, index: number) => {
    let inputValue = [...newValue];
    let updatedOptions:any = [...radioOptionList];
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
      <div>
        <label className="capitalize">{label}</label>
        <List sx={{ mx: 0 }}>
          {formFields?.[index]?.options?.map((item, index) => (
            <>
              {showPreview ? (
                <FormControlLabel control={<Checkbox disabled />} label={item} />
              ) : (
                <div key={index} className="flex items-center">
                  <Checkbox
                    disabled
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  <Input
                    fullWidth
                    onChange={(e) => onChangeInput(e.target.value, index)}
                    endAdornment={
                      !showPreview && (
                        <div className="flex">
                          <Button
                            type="submit"
                            className="cursor-pointer"
                            tabIndex={-1}
                            onClick={() => addNewField()}
                          >
                            <InputAdornment position="end">
                              <AddIcon />
                            </InputAdornment>
                          </Button>
                          <Button
                            type="button"
                            className="cursor-pointer"
                            tabIndex={-1}
                            onClick={() => removeOption(index)}
                          >
                            <InputAdornment position="end">
                              <Delete />
                            </InputAdornment>
                          </Button>
                        </div>
                      )
                    }
                    className="m-2"
                    value={item}
                  />
                </div>
              )}
            </>
          ))}
        </List>
      </div>
      {/* <label htmlFor="">{label}</label>
			<div className="flex flex-col">
				{showPreview ? (
					<RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
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
								<input type="radio" name="radio_button" className="ml-2" disabled />

								<Input
									type="text"
									variant="standard"
									onChange={(e) => onChangeInput(e.target.value, index)}
									endAdornment={
										!showPreview && (
											<div className="flex">
												<Button type="submit" className="cursor-pointer" onClick={() => addNewField(index)}>
													<InputAdornment position="end">
														<AddIcon />
													</InputAdornment>
												</Button>
												<Button type="submit" className="cursor-pointer" onClick={() => removeOption(index)}>
													<InputAdornment position="end">
														<Delete />
													</InputAdornment>
												</Button>
											</div>
										)
									}
									className="m-2 input-style"
									autoFocus={false}
									value={item}
								/>
							</div>
						))}
					</form>
				)}
			</div> */}
    </div>
  );
};

export default CheckboxInput;
