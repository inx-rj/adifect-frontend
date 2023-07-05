import { LabelValueOptionType } from "../common/commonType";
import { FormFieldT } from "./FormFieldsType";

export type IntakeFormFieldsT = {
  formFields: FormFieldT[];
  currentFocus: number;
  setCurrentFocus: (value: number) => void;
  handleFieldChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
  ) => void;
  questionTypeOptions: LabelValueOptionType[];
  handleValueChange: (value: string, index: number) => void;
  handleMultipleChange: (
    value: string[] | number[],
    index: number,
    type: string
  ) => void;
  handleMetaDataChange: (
    value: boolean,
    index: number,
    metaDataName: string
  ) => void;
  optionList: string[] | number[];
  setOptionList: (value: number[] | string[]) => void;
  radioOptionList: string[] | number[];
  setRadioOptionList: (value: number[] | string[]) => void;
  dateState: string;
  setDateState: (value: string) => void;
  addMoreField: () => void;
  removeField: (value: number) => void;
  handleOnDragEnd: (value: any) => void;
  handleCopyElement: (value: FormFieldT) => void;
  isDragDisabled: boolean;
  showPreview: boolean;
};
