import MuiPopup from "components/common/muiPopup/MuiPopup";
import React, { useState } from "react";
import { POST_COMPANY_PROJECTS_STORY_TAG } from "redux/actions/companies/companiesTags.actions";
import { useAppDispatch } from "redux/store";

const CreateTag = (props) => {
  const { storyId, setOpenTagModal, openTagModal } = props;
  const dispatch = useAppDispatch();
  const [tagName, setTagName] = useState("");
  const [errors, setErrors] = useState({
    tagName: null,
  });

  //validate inputs
  const validateSubmit = () => {
    const tempErrors = {
      tagName: !tagName && "Please enter Tag Name",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value)?.length) {
      return;
    }
    handleFolderSubmit();
  };

  //add new tag to list
  const handleFolderSubmit = () => {
    const tagData = {
      story: storyId,
      title: tagName,
      description: "This is description",
    };
    if (tagName) {
      dispatch(POST_COMPANY_PROJECTS_STORY_TAG(tagData));
      setOpenTagModal(false);
      setTagName("");
    }
  };

  return (
    <div>
      <MuiPopup
        dialogTitle="Add Tag"
        textAlign="left"
        dialogContent={
          <>
            <h3 className="font-semibold text-lg text-[#00050b]">
              Add New Tag
            </h3>
            <input
              className="input-style"
              type="text"
              placeholder="Enter tag name..."
              value={tagName}
              onChange={(e) => {
                setTagName(e.target.value);
                setErrors({ ...errors, tagName: null });
              }}
            />
            <span
              className="CoverCreator3"
              style={{
                color: "#D14F4F",
                opacity: errors.tagName ? 1 : 0,
              }}
            >
              {errors.tagName ?? "valid"}
            </span>
          </>
        }
        openPopup={openTagModal}
        closePopup={() => setOpenTagModal(false)}
        mainActionHandler={validateSubmit}
        mainActionTitle="Create"
      />
    </div>
  );
};

export default CreateTag;
