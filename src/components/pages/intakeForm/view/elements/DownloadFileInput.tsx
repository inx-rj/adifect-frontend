import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";

const DownloadFileInput = ({ fileValue = "", previewMode }) => {
  return (
    <a
      href={fileValue}
      target="_blank"
      referrerPolicy="no-referrer"
      className={`w-full flex items-center justify-between relative overflow-ellipsis z-[6] ${
        previewMode ? "text-gray-500" : ""
      }`}
    >
      <p className={`${previewMode ? "text-gray-500" : ""} truncate`}>
        {fileValue}
      </p>
      <p className="w-[20px]">
        <VisibilityIcon fontSize="small" />
      </p>
    </a>
  );
};
export default DownloadFileInput;
