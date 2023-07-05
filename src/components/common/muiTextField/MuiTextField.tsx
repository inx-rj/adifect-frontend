import { TextField } from "@mui/material";

interface TextFieldT {
  label: string;
  multiline?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
}

const MuiTextField = (props: TextFieldT) => {
  const {
    label,
    multiline = false,
    required = false,
    type = "text",
    value,
  } = props;

  return (
    <div className="flex w-full input-fields-wrapper">
      <TextField
        required={required}
        label={<span className="capitalize">{label}</span>}
        type={type}
        name="short-answer"
        id="short-answer"
        value={
          value ? value : type === "number" ? "9876543210" : "Preview field"
        }
        disabled
        fullWidth
        multiline={multiline}
        maxRows={multiline ? 4 : 1}
        className={multiline ? "w-full min-h-[100px] intake-form-textarea" : ""}
      />
    </div>
  );
};

export default MuiTextField;
