import { TextField } from "@mui/material";

const TextInput = (props) => {
  const {
    label,
    multiline = false,
    required = false,
    type = "text",
    value,
    placeHolder,
    name,
    handleInputChange,
  } = props;

  return (
    <div className="flex flex-col w-full">
      <label className="capitalize mb-1">{label}</label>
      <TextField
        required={required}
        type={type}
        name={name}
        id={name}
        value={value}
        fullWidth
        placeholder={placeHolder}
        multiline={multiline}
        maxRows={multiline ? 4 : 1}
        className={multiline ? "w-full min-h-[100px] intake-form-textarea" : ""}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextInput;
