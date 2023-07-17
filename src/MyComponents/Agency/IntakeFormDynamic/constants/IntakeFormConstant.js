export const fieldOptionType = [
  { value: "text", label: "Short Answer" },
  { value: "textarea", label: "Long Answer" },
  { value: "options", label: "Multiple Select" },
  { value: "date_picker", label: "Date" },
  { value: "date_range_picker", label: "Date Range" },
  { value: "radio", label: "Radio" },
  { value: "file", label: "File Upload" },
  { value: "checkbox", label: "Checkbox" },
  { value: "number", label: "Number" },
];

export const initialFormFieldValue = {
  field_name: "",
  field_type: "",
  options: [" "],
  meta_data: {
    is_required: false,
    is_multiple: false,
  },
};

export const initialGenericFormFields = [
  {
    field_name: "Submitter Name",
    field_type: "Short Answer",
    field_value: "",
  },
  {
    field_name: "Budget",
    field_type: "Short Answer",
    field_value: "",
  },
  {
    field_name: "Audience",
    field_type: "Paragraph",
    field_value: "",
  },
  {
    field_name: "Geography",
    field_type: "Multi Select Dropdown",
    field_value: [],
  },
  {
    field_name: "Story Links",
    field_type: "Paragraph",
    field_value: "",
  },
  {
    field_name: "Platforms",
    field_type: "Multi Select Dropdown",
    field_value: [],
  },
  {
    field_name: "Contact List (optional)",
    field_type: "Upload Attachment",
    field_value: "",
  },
  {
    field_name: "Notes",
    field_type: "Paragraph",
    field_value: "",
  },
  {
    field_name: "Target Live Date",
    field_type: "Date",
    field_value: { startDate: null, endDate: null },
  },
  {
    field_name: "Flight Length",
    field_type: "Date Range",
    field_value: { startDate: null, endDate: null },
  },
  {
    field_name: "End Date",
    field_type: "Date",
    field_value: { startDate: null, endDate: null },
  },
];

export const flightList = ["5 Days", "7 Days", "14 Days", "30 Days", "Ongoing"];

export const plateformsList = [
  "No Preference",
  "Facebook",
  "Twitter",
  "Linkedin",
  "P2P",
  "Email",
  "Youtube",
  "Geofencing",
];
