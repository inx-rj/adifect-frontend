import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const PreviewFileName = (props) => {
  const { fileName, index, handleFileRemove } = props;
  return (
    <div className="w-full flex items-center justify-between">
      <span>{fileName}</span>
      <span
        role="button"
        onClick={() => handleFileRemove(index)}
        className="text-red-400 text-xs absolute right-3 top-3 z-[6]"
      >
        <CloseIcon fontSize="small" />
      </span>
    </div>
  );
};

export default PreviewFileName;
