import { DeleteForeverOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Divider,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import CheckboxInput from "../elements/CheckboxInput";
import { CustomDND } from "../elements/CustomDND";
import DateInput from "../elements/DateInput";
import MultiChoiceDropDown from "../elements/MultiChoiceDropDown";
import RadioInput from "../elements/RadioInput";
import ShortInput from "../elements/ShortInput";
import UploadFile from "../elements/UploadFile";

const DynamicForm = (props) => {
  const {
    formFields,
    currentFocus,
    setCurrentFocus,
    handleFieldChange,
    questionTypeOptions,
    handleValueChange,
    handleMultipleChange,
    handleMetaDataChange,
    addMoreField,
    removeField,
    handleOnDragEnd,
    isDragDisabled,
    handleCopyElement,
    showPreview,
    optionList,
    setOptionList,
    radioOptionList,
    setRadioOptionList,
    dateState,
    setDateState,
  } = props;
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 gap-[20px]">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <CustomDND droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {formFields.map((fieldItem, fieldIndex) => (
                    <Draggable
                      key={fieldIndex}
                      draggableId={String(fieldIndex)}
                      index={fieldIndex}
                      isDragDisabled={isDragDisabled}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            key={fieldIndex}
                            className="bg-white border rounded p-[16px] my-3 relative flex items-center gap-3"
                          >
                            {showPreview && (
                              <div className="inline-flex justify-center w-5 h-5">
                                <DragIndicatorIcon color="disabled" />
                              </div>
                            )}
                            <div
                              className="grid w-full grid-cols-2 gap-4"
                              onClick={() =>
                                removeField && setCurrentFocus(fieldIndex)
                              }
                            >
                              {(currentFocus === fieldIndex ||
                                !fieldItem.field_name ||
                                !fieldItem.field_type) &&
                                !showPreview && (
                                  <>
                                    <div className="input-fields-wrapper">
                                      <TextField
                                        fullWidth
                                        label="Field name"
                                        variant="outlined"
                                        name="field_name"
                                        placeholder="Enter field name"
                                        onChange={(e) =>
                                          handleFieldChange(e, fieldIndex)
                                        }
                                        value={fieldItem.field_name}
                                      />
                                    </div>
                                    <div className="input-fields-wrapper">
                                      <TextField
                                        id="field-type"
                                        name="field_type"
                                        select
                                        label="Select Question Type"
                                        placeholder="Select Question Type"
                                        fullWidth
                                        onChange={(e) =>
                                          handleFieldChange(e, fieldIndex)
                                        }
                                        value={fieldItem.field_type}
                                      >
                                        {questionTypeOptions.map((option) => (
                                          <MenuItem
                                            key={option.value}
                                            value={option.value}
                                            selected={
                                              fieldItem.field_type ===
                                              option.value
                                            }
                                          >
                                            {option.label}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </div>
                                  </>
                                )}
                              {fieldItem["field_type"] && (
                                <div className="col-span-2">
                                  {fieldItem["field_type"] === "text" && (
                                    <ShortInput
                                      label={fieldItem.field_name}
                                      required={
                                        fieldItem?.meta_data?.is_required
                                      }
                                    />
                                  )}
                                  {fieldItem["field_type"] === "number" && (
                                    <ShortInput
                                      type="number"
                                      label={fieldItem.field_name}
                                      required={
                                        fieldItem?.meta_data?.is_required
                                      }
                                    />
                                  )}
                                  {fieldItem["field_type"] === "textarea" && (
                                    <ShortInput
                                      multiline
                                      label={fieldItem.field_name}
                                      required={
                                        fieldItem?.meta_data?.is_required
                                      }
                                    />
                                  )}
                                  {fieldItem["field_type"] === "options" && (
                                    <>
                                      <MultiChoiceDropDown
                                        formFields={formFields}
                                        label={fieldItem.field_name}
                                        index={fieldIndex}
                                        handleFormChange={handleMultipleChange}
                                        displayInput={
                                          currentFocus === fieldIndex
                                        }
                                        showPreview={showPreview}
                                        optionList={optionList}
                                        setOptionList={setOptionList}
                                        currentFocusProp={currentFocus}
                                        required={
                                          fieldItem?.meta_data?.is_required
                                        }
                                      />
                                    </>
                                  )}
                                  {fieldItem["field_type"] === "radio" && (
                                    <RadioInput
                                      label={fieldItem.field_name}
                                      index={fieldIndex}
                                      handleFormChange={handleMultipleChange}
                                      displayInput={currentFocus === fieldIndex}
                                      radioOptionList={radioOptionList}
                                      setRadioOptionList={setRadioOptionList}
                                      showPreview={showPreview}
                                      required={
                                        fieldItem?.meta_data?.is_required
                                      }
                                      formFields={formFields}
                                      currentFocusProp={currentFocus}
                                    />
                                  )}
                                  {fieldItem["field_type"] === "checkbox" && (
                                    <CheckboxInput
                                      label={fieldItem.field_name}
                                      index={fieldIndex}
                                      handleFormChange={handleMultipleChange}
                                      displayInput={currentFocus === fieldIndex}
                                      radioOptionList={radioOptionList}
                                      setRadioOptionList={setRadioOptionList}
                                      showPreview={showPreview}
                                      required={
                                        fieldItem?.meta_data?.is_required
                                      }
                                      formFields={formFields}
                                      currentFocusProp={currentFocus}
                                    />
                                  )}
                                  {fieldItem["field_type"] ===
                                    "date_picker" && (
                                    <DateInput
                                      label={fieldItem.field_name}
                                      handleDateChange={handleValueChange}
                                      index={fieldIndex}
                                      dateRange={false}
                                      dateState={dateState}
                                      setDateState={setDateState}
                                      required={
                                        fieldItem?.meta_data?.is_required
                                      }
                                    />
                                  )}
                                  {fieldItem["field_type"] ===
                                    "date_range_picker" && (
                                    <DateInput
                                      label={fieldItem.field_name}
                                      handleDateChange={handleValueChange}
                                      index={fieldIndex}
                                      dateRange={true}
                                      dateState={dateState}
                                      setDateState={setDateState}
                                      required={
                                        fieldItem?.meta_data?.is_required
                                      }
                                    />
                                  )}
                                  {fieldItem["field_type"] === "file" && (
                                    <UploadFile
                                      label={fieldItem.field_name}
                                      handleFileChange={handleValueChange}
                                      index={fieldIndex}
                                      required={
                                        fieldItem?.meta_data?.is_required
                                      }
                                      isDisabled={true}
                                    />
                                  )}
                                </div>
                              )}

                              {!showPreview && (
                                <div className="flex items-center justify-end col-span-2">
                                  {fieldItem["field_type"] === "options" && (
                                    <>
                                      <FormControlLabel
                                        id="is_multiple"
                                        control={
                                          <Switch
                                            id="is_multiple"
                                            name="is_multiple"
                                          />
                                        }
                                        label="Multiple Select"
                                        onChange={(e) =>
                                          handleMetaDataChange(
                                            e.target.checked,
                                            fieldIndex,
                                            "is_multiple"
                                          )
                                        }
                                        disabled={!removeField}
                                        value={
                                          fieldItem?.meta_data?.is_multiple
                                        }
                                        checked={
                                          fieldItem?.meta_data?.is_multiple
                                        }
                                        className="m-0"
                                      />
                                      <Divider
                                        orientation="vertical"
                                        flexItem
                                        className="h-auto mx-3 my-2"
                                      />
                                    </>
                                  )}
                                  <FormControlLabel
                                    id="is_required"
                                    control={
                                      <Switch
                                        id="is_required"
                                        name="is_required"
                                      />
                                    }
                                    label="Required"
                                    onChange={(e) =>
                                      handleMetaDataChange(
                                        e.target.checked,
                                        fieldIndex,
                                        "is_required"
                                      )
                                    }
                                    disabled={!removeField}
                                    value={fieldItem?.meta_data?.is_required}
                                    checked={fieldItem?.meta_data?.is_required}
                                    className="m-0"
                                  />
                                  <Divider
                                    orientation="vertical"
                                    flexItem
                                    className="h-auto mx-3 my-2"
                                  />
                                  <div
                                    className="mr-2 text-sm text-center text-gray-400 cursor-pointer"
                                    onClick={() => handleCopyElement(fieldItem)}
                                    role="button"
                                    title="Copy"
                                  >
                                    <ContentCopyIcon fontSize="small" />
                                  </div>
                                  {removeField && (
                                    <span
                                      role="button"
                                      title="Delete"
                                      onClick={() => removeField(fieldIndex)}
                                      className="block text-sm text-right text-gray-400 cursor-pointer"
                                    >
                                      <DeleteForeverOutlined />
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </CustomDND>
          </DragDropContext>
          {addMoreField && !showPreview && (
            <div
              className="bg-primary/[0.05] ad_dynamic_input  border-primary flex justify-center items-center py-[38px] cursor-pointer"
              onClick={addMoreField}
            >
              <div className="h-[43px] w-[43px] rounded-full bg-primary !opacity-100 flex justify-center items-center">
                <AddIcon className="text-white opacity-100" fontSize="medium" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
