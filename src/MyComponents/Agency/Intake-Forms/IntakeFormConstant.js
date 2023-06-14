export const fieldOptionType = [
  "Short Answer",
  "Paragraph",
  "Multi Select Dropdown",
  "Date",
  "Date Range",
  "Radio Button",
  "Upload Attachment",
  "Download",
];

export const initialFormFieldValue = {
  field_name: "",
  field_type: "" || [],
  field_value: "",
  options: "",
  isRequired: false,
};

export const initialGenericFormFields = [
  {
    field_name: "Submission Name",
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
    field_name: "Influencer Contact List",
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
  // {
  //   field_name: "Podcast Content",
  //   field_type: "Radio Button",
  //   field_value: "",
  //   options: '["yes","no"]',
  // },
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
