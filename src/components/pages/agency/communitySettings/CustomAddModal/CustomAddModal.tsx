import React, { useMemo } from "react";
import MuiAutoComplete from "components/common/muiAutocomplete/MuiAutoComplete";

const CustomAddModal = (props) => {
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

  const channelsList = [
    {
      fieldLabel: "Facebook Account URL",
      fieldNameId: "fbUrl",
      fieldPlaceholder: "Enter URL",
      fieldOnChange: () => {},
    },
    {
      fieldLabel: "Facebook API Key",
      fieldNameId: "fbApiKey",
      fieldPlaceholder: "Enter API Key",
      fieldOnChange: () => {},
    },
    {
      fieldLabel: "Opnsesame Audience URL",
      fieldNameId: "opnUrl",
      fieldPlaceholder: "Enter URL",
      fieldOnChange: () => {},
    },
    {
      fieldLabel: "Opnsesame Key",
      fieldNameId: "opnApiKey",
      fieldPlaceholder: "Enter API Key",
      fieldOnChange: () => {},
    },
  ];

  const matchStr = (searchVal, matchVal) =>
    searchVal.toLowerCase().match(new RegExp(matchVal.toLowerCase(), "g"));

  //To store memorized value of filtered(searched) data array, this helps when other then dependencies, state of this component changes will not filter again.
  const filteredData = useMemo(
    () =>
      communityOptions
        ?.filter((communityItem) => matchStr(communityItem.name, searchText))
        ?.map((e) => {
          return { id: e.id, name: `${e.id} - ${e.name}` };
        }) || [],
    [communityOptions, searchText]
  );

  return (
    <div className="grid grid-cols-1">
      {/* {channelsList.length && channelsList.map((item, index) => (
                <div className="input-fields-wrapper" key={index}>
                    <label>{item.fieldLabel}</label>
                    <input
                        className={"input-style"}
                        type="text"
                        name={item.fieldNameId}
                        id={item.fieldNameId}
                        value={email}
                        onChange={(e) => {
                            item.fieldOnChange(e.target.value ?? "");
                        }}
                    />
                    <span className="err-tag">{errors.email ?? ""}</span>
                </div>
            ))} */}
      <div className="input-fields-wrapper">
        <label>Community</label>
        <MuiAutoComplete
          placeholder={"Select Community"}
          filterList={filteredData.slice(0, 20)}
          // setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          setSearchText={setSearchText}
          searchText={searchText}
          handleChange={handleChange}
          customClass={""}
          // disableClearable
        />
        <span className="err-tag">{errors.community ?? ""}</span>
      </div>
      <div className="input-fields-wrapper">
        <label>Facebook Account URL</label>
        <input
          className={"input-style mb-[20px]"}
          placeholder="Enter URL"
          type="url"
          name="fbUrl"
          id="fbUrl"
          value={formData.fbUrl}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
      </div>
      <div className="input-fields-wrapper">
        <label>Facebook API Key</label>
        <input
          className={"input-style mb-[20px]"}
          placeholder="Enter API Key"
          type="text"
          name="fbApiKey"
          id="fbApiKey"
          value={formData.fbApiKey}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
      </div>
      <div className="input-fields-wrapper">
        <label>Opnsesame Audience URL</label>
        <input
          className={"input-style mb-[20px]"}
          placeholder="Enter URL"
          type="url"
          name="opnUrl"
          id="opnUrl"
          value={formData.opnUrl}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
      </div>
      <div className="input-fields-wrapper">
        <label>Opnsesame Key</label>
        <input
          className={"input-style mb-[20px]"}
          placeholder="Enter Key"
          type="text"
          name="opnApiKey"
          id="opnApiKey"
          value={formData.opnApiKey}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
      </div>
    </div>
  );
};
export default CustomAddModal;
