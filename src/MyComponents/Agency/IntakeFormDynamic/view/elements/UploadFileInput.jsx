import React from "react";

const UploadFileInput = (props) => {
  const { fieldName, index, isPreviewMode, handleUploadAttachment } = props;
  return (
    <>
      <input
        type="file"
        name={fieldName}
        id={fieldName}
        alt={fieldName}
        onChange={(e) => handleUploadAttachment(e, index, fieldName)}
        className="absolute inset-0 z-[5] opacity-0 cursor-pointer"
        accept=".jpg, .png, .pdf, .xlsx, .csv, .docx, .doc"
        disabled={isPreviewMode}
      />
    </>
  );
};
export default UploadFileInput;
