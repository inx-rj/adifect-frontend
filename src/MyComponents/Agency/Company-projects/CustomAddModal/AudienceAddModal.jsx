import React, { useState } from "react";
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import { useMemo } from "react";
import { country_list } from "../../../../helper/utility/groupAccordion";
import { useSelector } from "react-redux";
import CommunityMuiAutoComplete from "../CommunityMuiAutoComplete";

const AudienceAddModal = (props) => {
  const { errors, formData, setFormData, channelList } = props;

  const [searchText, setSearchText] = useState("");

  const { agencyCompanyProjectsFiltersList } = useSelector(
    (state) => state.AgencyCompanyProjectsFiltersReducer
  );

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "Franch", value: "Franch" },
  ];
  const deviceOptions = [
    { label: "Android", value: "Android" },
    { label: "Desktop", value: "Desktop" },
    { label: "iOS", value: "iOS" },
  ];
  const genderOptions = [
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
    { label: "Both", value: "Both" },
  ];

  const matchStr = (searchVal, matchVal) =>
    searchVal.toLowerCase().match(new RegExp(matchVal.toLowerCase(), "g"));

  const communityOptions = useMemo(
    () =>
      agencyCompanyProjectsFiltersList?.community
        ?.filter((communityItem) => matchStr(communityItem.name, searchText))
        ?.map((e) => {
          return { value: e.id, label: `${e.id} - ${e.name}` };
        }) || [],
    [agencyCompanyProjectsFiltersList, searchText]
  );

  const geographyOptions = useMemo(
    () =>
      country_list?.map((item) => {
        return { value: item, label: item };
      }) || [],
    [country_list]
  );

  const handleChannelInputChange = (event, index) => {
    let values;
    values = [...formData?.channel];
    values[index][event.target.name] = event.target.value;

    setFormData((prevState) => {
      return {
        ...prevState,
        channel: values,
      };
    });
  };

  const addMoreField = () => {
    const addValues = [...formData?.channel];
    addValues?.push({
      channel: 0,
      title: "",
      language: 0,
      device: 0,
      age: "",
      gender: 0,
    });
    setFormData((prevState) => {
      return {
        ...prevState,
        channel: addValues,
      };
    });
  };

  const removeField = (index) => {
    const removeValues = [...formData?.channel];
    removeValues?.splice(index, 1);
    setFormData((prevState) => {
      return {
        ...prevState,
        channel: removeValues,
      };
    });
  };

  return (
    <form id="AudienceForm">
      <div className="grid grid-cols-1">
        <div className="input-fields-wrapper">
          <label>Audience Title</label>
          <input
            className={"input-style"}
            placeholder="Enter Audience Title"
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
          <label>Audience ID</label>
          <input
            className={"input-style"}
            placeholder="Audience ID"
            type="text"
            name="audience_id"
            id="audience_id"
            value={formData?.audience_id}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
          />
          <span className="err-tag">{errors.audience_id ?? ""}</span>
        </div>
        <div className="input-fields-wrapper mb-[20px]">
          <label>Geography</label>
          <Autocomplete
            sx={{
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
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  className="input-style"
                  placeholder="Select Geography"
                  variant="outlined"
                />
              );
            }}
            // multiple
            options={country_list}
            value={formData?.geography}
            onChange={(e, values) => {
              setFormData({ ...formData, geography: values });
            }}
          />
        </div>
        <div className="input-fields-wrapper">
          <label>Community</label>
          {/* <CustomMuiAutoComplete
            placeholder={"Select Community"}
            filterList={communityOptions?.slice(0, 20)}
            setSelectedOption={(values) => {
              // console.log("eee", values, formData);
              setFormData({ ...formData, community: values });
            }}
            selectedOption={formData?.community}
            setSearchText={setSearchText}
            searchText={searchText}
            disableClearable
          // getOptionLabel={(values) => values.label}
          /> */}

          <CommunityMuiAutoComplete
            communityOptions={
              agencyCompanyProjectsFiltersList?.community
                ? agencyCompanyProjectsFiltersList
                : []
            }
            setSelectedOption={(values) => {
              // console.log("eee", values, formData);
              setFormData({ ...formData, community: values });
            }}
            selectedOption={formData?.community}
            setSearchText={setSearchText}
            searchText={searchText}
          />
        </div>
        <div className="flex justify-between items-center mt-3 mb-2">
          <label>Channel</label>
          <span
            onClick={() => addMoreField()}
            className="cursor-pointer text-theme text-sm"
          >
            + Add
          </span>
        </div>

        {formData?.channel?.map((chItem, chIndex) => {
          return (
            <div key={chIndex}>
              {formData?.channel?.length > 1 && (
                <span
                  onClick={() => removeField(chIndex)}
                  className="text-danger block text-right text-sm mr-0 ml-auto cursor-pointer mb-[8px]"
                >
                  - Remove
                </span>
              )}
              <div className="input-fields-wrapper col-span-2">
                <span className="err-tag">
                  {errors?.channel?.[chIndex]?.channel ?? ""}
                </span>
                <Select
                  name="channel"
                  id={chIndex}
                  className={`input-style pl-0 ${
                    formData?.channel?.[chIndex]?.channel > 0
                      ? " !rounded-br-none !rounded-bl-none"
                      : null
                  }`}
                  value={formData?.channel[chIndex]?.channel}
                  placeholder="Test"
                  onChange={(event) => handleChannelInputChange(event, chIndex)}
                  renderValue={(value) => {
                    const res = channelList?.find((item) => item?.id === value);
                    return value ? (
                      res?.name
                    ) : (
                      <p className="opacity-50">Select Channel</p>
                    );
                  }}
                >
                  {channelList?.map((item, itemIndex) => {
                    return (
                      <MenuItem key={itemIndex} value={item?.id}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              {formData?.channel?.[chIndex]?.channel > 0 && (
                <div className="p-2.5 border rounded-[8px] rounded-tr-none rounded-tl-none mt-[-1px] grid grid-cols-2 w-full gap-x-4">
                  <div className="input-fields-wrapper col-span-2">
                    <input
                      className={"input-style"}
                      placeholder="Enter Title"
                      type="text"
                      name="title"
                      id="title"
                      value={formData?.channel[chIndex]?.title}
                      onChange={(event) =>
                        handleChannelInputChange(event, chIndex)
                      }
                    />
                    <span className="err-tag">
                      {" "}
                      {errors?.channel?.[chIndex]?.title ?? ""}
                    </span>
                  </div>
                  <div className="input-fields-wrapper">
                    <Select
                      name="language"
                      id={chIndex}
                      className={"input-style pl-0"}
                      value={formData?.channel[chIndex]?.language}
                      onChange={(event) =>
                        handleChannelInputChange(event, chIndex)
                      }
                      renderValue={(value) =>
                        value ? (
                          value
                        ) : (
                          <p className="opacity-50">Select Language</p>
                        )
                      }
                    >
                      {languageOptions?.map((langName, langIndex) => {
                        return (
                          <MenuItem key={langIndex} value={langName?.value}>
                            {langName?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <span className="err-tag">
                      {errors?.channel?.[chIndex]?.language ?? ""}
                    </span>
                  </div>
                  <div className="input-fields-wrapper">
                    <Select
                      name="device"
                      id={chIndex}
                      className={"input-style pl-0"}
                      value={formData?.channel[chIndex]?.device}
                      onChange={(event) =>
                        handleChannelInputChange(event, chIndex)
                      }
                      renderValue={(value) =>
                        value ? (
                          value
                        ) : (
                          <p className="opacity-50">Select Device</p>
                        )
                      }
                    >
                      {deviceOptions?.map((langName, langIndex) => {
                        return (
                          <MenuItem key={langIndex} value={langName?.value}>
                            {langName?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <span className="err-tag">
                      {errors?.channel?.[chIndex]?.device ?? ""}
                    </span>
                  </div>
                  <div className="input-fields-wrapper">
                    <input
                      className={"input-style"}
                      placeholder="Enter age"
                      type="text"
                      name="age"
                      id="age"
                      value={formData?.channel[chIndex]?.age}
                      onChange={(event) =>
                        handleChannelInputChange(event, chIndex)
                      }
                    />
                    <span className="err-tag">
                      {" "}
                      {errors?.channel?.[chIndex]?.age ?? ""}
                    </span>
                  </div>
                  <div className="input-fields-wrapper">
                    <Select
                      name="gender"
                      id={chIndex}
                      className={"input-style pl-0"}
                      value={formData?.channel[chIndex]?.gender}
                      placeholder="Select Gender"
                      onChange={(event) =>
                        handleChannelInputChange(event, chIndex)
                      }
                      renderValue={(value) =>
                        value ? (
                          value
                        ) : (
                          <p className="opacity-50">Select Gender</p>
                        )
                      }
                    >
                      {genderOptions?.map((langName, langIndex) => {
                        return (
                          <MenuItem key={langIndex} value={langName?.value}>
                            {langName?.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <span className="err-tag">
                      {errors?.channel?.[chIndex]?.gender ?? ""}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default AudienceAddModal;
