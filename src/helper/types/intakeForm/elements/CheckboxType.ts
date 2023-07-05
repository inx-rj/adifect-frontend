import { FormFieldT } from "../FormFieldsType";

export type CheckboxT = {
  label: string;
  index: number;
  handleFormChange: (
    value: string[] | number[],
    index: number,
    type?: string
  ) => void;
  radioOptionList: string[] | number[];
  setRadioOptionList: (value: string[]) => void;
  showPreview: boolean;
  required: boolean;
  formFields: FormFieldT[];
  currentFocusProp: number;
};
