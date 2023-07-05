export type FormFieldT = {
  field_name?: string;
  field_type?: string;
  field_value?: string;
  options?: Array<string> | Array<number>;
  meta_data?: {
    is_required: boolean;
    is_multiple: boolean;
  };
  form_version_data?: FormVersionDataT;
  created?: string;
  modified?: string;
  form_version?: string;
  is_trashed?: string;
  id?: string;
  uuid?: string;
  intake_form?: string[];
  data?: FormFieldDataT;
};

export type FormVersionDataT = {
  id: number;
  created: string;
  modified: string;
  is_trashed: boolean;
  uuid: string;
  version: number;
  user: number;
};

export type FormFieldDataT = {
  id: number;

  field_name: string;
  field_type: string;
  created: string;
  modified: string;
  is_trashed: boolean;
  uuid: string;
  options: Array<string> | Array<number>;
  meta_data: {
    is_multiple: boolean;
    is_required: boolean;
  };
  form_version: number;
};
