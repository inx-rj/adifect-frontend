import React from "react";

const CustomAddCopyCodeModal = (props) => {
  const {
    communityOptions,
    setSelectedOption,
    selectedOption,
    setSearchText,
    searchText,
    handleChange,
    setErrors,
    errors,
    formData,
    setFormData,
  } = props;

  return (
    <div className="grid grid-cols-1">
      <div className="input-fields-wrapper">
        <label>Title</label>
        <input
          className={"input-style"}
          placeholder="Enter Title"
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
        <span className="err-tag">{errors.title ?? ""}</span>
      </div>
      <div className="input-fields-wrapper">
        <label>Subject Line</label>
        <input
          className={"input-style"}
          placeholder="Enter Subject Line"
          type="text"
          name="subject_line"
          id="subject_line"
          value={formData.subject_line}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
        <span className="err-tag">{errors.subject_line ?? ""}</span>
      </div>
      <div className="input-fields-wrapper">
        <label>Body</label>
        <textarea
          className={"input-style h-auto"}
          placeholder="Type Something..."
          name="body"
          rows={3}
          id="body"
          value={formData.body}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
        <span className="err-tag">{errors.body ?? ""}</span>
      </div>
      <div className="input-fields-wrapper">
        <label>Notes</label>
        <textarea
          className={"input-style h-auto"}
          placeholder="Type Something..."
          //   type="text"
          name="notes"
          rows={3}
          id="notes"
          value={formData.notes}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
        <span className="err-tag">{errors.notes ?? ""}</span>
      </div>
    </div>
  );
};

export default CustomAddCopyCodeModal;
