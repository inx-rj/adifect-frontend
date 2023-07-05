import React from "react";

const UploadFile = (props) => {
  const {
    label,
    placeholder,
    handleFileChange,
    index,
    isDisabled,
    fileName,
    fieldName,
  } = props;

  const FileInputRef = React.useRef(null);

  const handleFileUpload = () => {
    FileInputRef.current.click();
  };

  return (
    <div>
      <label htmlFor="upload_file" className="capitalize">
        {label}
      </label>

      <div
        className="flex items-center justify-center w-full overflow-hidden relative z-0"
        onClick={() => handleFileUpload()}
      >
        <label
          htmlFor="upload_file"
          className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                {fileName ? fileName : " Drag and drop or click to upload file"}
              </span>
            </p>
            <span className="absolute flex opacity-20 uppercase text-md bottom-2 right-2 font-bold">
              {fileName ? fileName : "Preview"}
            </span>
          </div>
        </label>
      </div>
      <input
        name={fieldName ? fieldName : "upload_file"}
        id={`upload_file_${index}`}
        type="file"
        placeholder={placeholder ?? label}
        ref={FileInputRef}
        onChange={(e) => handleFileChange(e.target.files, index)}
        className="hidden"
        disabled={isDisabled}
      />
    </div>
  );
};

export default UploadFile;
