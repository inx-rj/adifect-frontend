import React, { useEffect, useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";

const CustomAddCreativeCodeModal = (props) => {
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

  // const matchStr = (searchVal, matchVal) => searchVal.toLowerCase().match(new RegExp(matchVal.toLowerCase(), 'g'))

  // //To store memorized value of filtered(searched) data array, this helps when other then dependencies, state of this component changes will not filter again.
  // const filteredData = useMemo(() => (
  //     communityOptions?.community?.filter(communityItem => matchStr(communityItem.name, searchText))
  //         ?.map((e) => { return { value: e.id, label: `${e.id} - ${e.name}` } }) ||
  //     []
  // ), [communityOptions, searchText]);

  const autoCompleteStyleSx = {
    "&.MuiAutocomplete-root": {
      "& .MuiAutocomplete-endAdornment": {
        "& .MuiAutocomplete-clearIndicator": {
          zIndex: 10,
        },
      },
      "& .MuiTextField-root": {
        "& .MuiFormLabel-root": {
          background: "white",
          fontSize: "14px",
          lineHeight: "17px",
          top: "-3px",
          "&.MuiInputLabel-shrink": {
            marginTop: "7px",
          },
        },
        "& .MuiAutocomplete-inputRoot": {
          paddingRight: "0",
          background: "transparent",
          height: "100%",
          "& .MuiAutocomplete-input": {
            border: "0px solid transparent !important",
            height: "auto",
            position: "relative",
            zIndex: 3,
            p: 0,
            marginRight: "55px",
          },
          "& .MuiInputAdornment-root": {
            marginRight: "5px",
            marginLeft: "0",
          },
        },
      },
    },
  };

  // Autocomplete options for formats and pixels
  const formatOption = [
    { label: "JSON", value: "JSON" },
    { label: "JPG", value: "JPG" },
    { label: "PNG", value: "PNG" },
    { label: "GIF", value: "GIF`" },
  ];
  const horzPxOption = [
    { label: "8px", value: "8px" },
    { label: "16px", value: "16px" },
    { label: "32px", value: "32px" },
    { label: "64px", value: "64px" },
  ];
  const verPxOption = [
    { label: "8px", value: "8px" },
    { label: "16px", value: "16px" },
    { label: "32px", value: "32px" },
    { label: "64px", value: "64px" },
  ];

  return (
    <div className="grid grid-cols-1">
      {/* <div className="input-fields-wrapper">
                <label>Community</label>
                <CustomMuiAutoComplete
                    placeholder={"Select Community"}
                    filterList={filteredData.slice(0, 20)}
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                    setSearchText={setSearchText}
                    searchText={searchText}
                    disableClearable
                />
                <span className="err-tag">{errors.community ?? ""}</span>
            </div> */}
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
        <label>File Name</label>
        <input
          className={"input-style"}
          placeholder="Enter File Name"
          type="text"
          name="file_name"
          id="file_name"
          value={formData.file_name}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
        <span className="err-tag">{errors.file_name ?? ""}</span>
      </div>
      <div className="input-fields-wrapper">
        <label>Format</label>
        <Autocomplete
          className={""}
          sx={autoCompleteStyleSx}
          disablePortal
          //   name="format"
          id="format"
          options={formatOption}
          value={formData?.format}
          onChange={(e, value) => {
            setFormData({ ...formData, format: value?.value });
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select Format" />
          )}
        />
        <span className="err-tag">{errors.format ?? ""}</span>
      </div>
      <div className="input-fields-wrapper">
        <label>Creative Theme</label>
        <input
          className={"input-style"}
          placeholder="Enter Creative Theme"
          type="text"
          name="creative_theme"
          id="creative_theme"
          value={formData.creative_theme}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
        <span className="err-tag">{errors.creative_theme ?? ""}</span>
      </div>
      <div className="grid md:grid-cols-2 grid-flow-row auto-rows-max gap-x-6">
        <div className="input-fields-wrapper">
          <label>Horizontal Pixels</label>
          <Autocomplete
            className={""}
            sx={autoCompleteStyleSx}
            // name="horizontal_pixel"
            id="horizontal_pixel"
            disablePortal
            value={formData?.horizontal_pixel}
            options={horzPxOption}
            onChange={(e, value) => {
              setFormData({ ...formData, horizontal_pixel: value?.value });
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select" />
            )}
          />
          <span className="err-tag">{errors.horizontal_pixel ?? ""}</span>
        </div>
        <div className="input-fields-wrapper">
          <label>Vertical Pixels</label>
          <Autocomplete
            className={""}
            sx={autoCompleteStyleSx}
            // name="vertical_pixel"
            id="vertical_pixel"
            disablePortal
            options={verPxOption}
            value={formData?.vertical_pixel}
            onChange={(e, value) => {
              setFormData({ ...formData, vertical_pixel: value?.value });
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select" />
            )}
          />
          <span className="err-tag">{errors.vertical_pixel ?? ""}</span>
        </div>
      </div>
      <div className="input-fields-wrapper">
        <label>Duration in seconds</label>
        <input
          className={"input-style  !w-full !pl-3 bg-white"}
          placeholder="Enter seconds"
          type="number"
          name="duration"
          id="duration"
          value={formData.duration}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
        <span className="err-tag">{errors.duration ?? ""}</span>
      </div>
      <div className="input-fields-wrapper">
        <label>Link</label>
        <input
          className={"input-style"}
          placeholder="Enter Link"
          type="url"
          name="link"
          id="link"
          value={formData.link}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />
        <span className="err-tag">{errors.link ?? ""}</span>
      </div>
      <div className="input-fields-wrapper">
        <label>Notes</label>
        <textarea
          className={"input-style"}
          placeholder="Type Something..."
          name="notes"
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

export default CustomAddCreativeCodeModal;
