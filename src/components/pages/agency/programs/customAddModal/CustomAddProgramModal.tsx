import MuiAutoComplete from "components/common/muiAutocomplete/MuiAutoComplete";
import React, { useMemo } from "react";

const CustomAddProgramModal = (props) => {
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

  const matchStr = (searchVal, matchVal) =>
    searchVal.toLowerCase().match(new RegExp(matchVal.toLowerCase(), "g"));

  //To store memorized value of filtered(searched) data array, this helps when other then dependencies, state of this component changes will not filter again.
  const filteredData = useMemo(
    () =>
      communityOptions?.community
        ?.filter((communityItem) => matchStr(communityItem.name, searchText))
        ?.map((e) => {
          return { value: e.id, label: `${e.id} - ${e.name}` };
        }) || [],
    [communityOptions, searchText]
  );

  return (
    <div className="grid grid-cols-1">
      <div className="input-fields-wrapper">
        <label>Community</label>
        <MuiAutoComplete
          placeholder={"Select Community"}
          filterList={filteredData.slice(0, 20)}
          //   setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          setSearchText={setSearchText}
          searchText={searchText}
          handleChange={handleChange}
          customClass={""}
          //   disableClearable
        />
        <span className="err-tag">{errors.community ?? ""}</span>
      </div>
      <div className="input-fields-wrapper">
        <label>Program Title</label>
        <input
          className={"input-style"}
          placeholder="Enter Program Title"
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
    </div>
  );
};

export default CustomAddProgramModal;
