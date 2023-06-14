import { useState } from "react";
import GenericForm from "./GenericForm";
import { useParams } from "react-router-dom";
import { initialGenericFormFields } from "./IntakeFormConstant";

const AddIntakeForms = () => {
  const { "*": formName } = useParams();
  const [createForm, setCreateForm] = useState({
    title: "",
  });

  const [genericForm, setGenericForm] = useState(initialGenericFormFields);

  let errors;
  return (
    <div className="page-container">
      <h4 className="page-title text-[26px]">Preview</h4>
      <div className="page-card new-card p-[20px]">
        <div className="flex justify-between mb-[20px] border-b pb-[20px]">
          <div className="input-fields-wrapper">
            <label>Title</label>
            <input
              className={` max-w-[530px] capitalize input-style
                ${errors?.["last_name"] ? "input-err-style" : ""}
              `}
              type="text"
              name="title"
              id="title"
              placeholder="Enter first name"
              disabled={formName}
              value={createForm?.["title"] || formName?.replace(/-/g, " ")}
              // onChange={(e) => handleInputChange(e)}
            />
            <span className="err-tag">{errors?.["title"] ?? " "}</span>
          </div>
        </div>
        <div className="max-w-[530px] w-full">
          <GenericForm
            genericForm={genericForm}
            setGenericForm={setGenericForm}
            previewMode
          />
        </div>
      </div>
    </div>
  );
};

export default AddIntakeForms;
