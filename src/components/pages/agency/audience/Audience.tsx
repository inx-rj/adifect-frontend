import React, { useState } from "react";
import swal from "sweetalert";
import { Box, Card, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "redux/store";
import { GET_COMPANY_PROJECTS_FILTERS_LIST } from "redux/actions/companies/companies.actions";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import ActionMenuButton from "components/common/actionMenuButton/ActionMenuButton";
import { isEmpty } from "helper/utility/customFunctions";
import { Images } from "helper/images";
import MuiPopup from "components/common/muiPopup/MuiPopup";
import MuiTable from "components/common/muiTable/MuiTable";
import MuiPopoverTooltip from "components/common/muiPopoverTooltip/muiPopoverTooltip";
import { Add } from "@mui/icons-material";
import {
  AUDIENCE_DATA,
  AUDIENCE_RESPONSE,
  SET_AUDIENCE_LOADING,
  SET_AUDIENCE_EDIT_DATA,
  SET_CREATE_AUDIENCE,
} from "redux/reducers/companies/audience.slice";
import {
  CREATE_AUDIENCE_LIST,
  DELETE_AUDIENCE_LIST,
  GET_AUDIENCE_LIST,
  UPDATE_AUDIENCE_LIST,
} from "redux/actions/audience/audience.actions";
import SharePostToSocialMedia from "components/common/ShareToSocialMedia/SharePostToSocialMedia";
import AudienceAddModal from "./AudienceAddModal";

const Audience = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const audienceList = useAppSelector(AUDIENCE_DATA);
  const success = useAppSelector(AUDIENCE_RESPONSE);

  // React states
  const [filterData, setFilterData] = useState({
    from_date: "",
    to_date: "",
    community: "",
    status: "",
    tag: "",
    search: "",
  });

  // filter params state
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  });

  // Action Menu button states
  const [showTagModal, setShowTagModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null,
  });
  const [anchorActionEl, setAnchorActionEl] = React.useState(null);

  // Audience form data
  const [addAgencyFormData, setAddAgencyFormData] = useState({
    audience_id: null,
    title: "",
    geography: "",
    community: "",
    channel: [
      {
        channel: 0,
        title: "",
        language: 0,
        device: 0,
        age: "",
        gender: 0,
      },
    ],
  });
  const [errors, setErrors] = useState({
    audience_id: null,
    title: null,
    channel: null,
  });
  const [selectedRowId, setSelectedRowId] = useState(null);

  useSingleEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_FILTERS_LIST());
    dispatch(GET_AUDIENCE_LIST({ ...paginationData, ...filterData }));
  });

  // Handle Edit audience data
  const handleEdit = (item) => {
    setShowTagModal(true);
    setIsEditMode(true);
    setErrors({
      audience_id: null,
      title: null,
      channel: null,
    });

    const editableData = audienceList?.data?.results?.find(
      (filterData) => filterData?.id === item?.id
    );
    // @ts-ignore
    setAddAgencyFormData(editableData);
  };

  //handle audience delete action
  const handleDelete = (item) => {
    swal({
      title: "Warning",
      text: `Are you sure you want to remove this ${item?.title}?`,
      className: "errorAlert",
      icon: Images.ErrorLogo,
      buttons: {
        Cancel: true,
        OK: true,
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete !== "Cancel") {
        dispatch(DELETE_AUDIENCE_LIST(item?.id)).then((r: void) => r);
      }
    });
    setAnchorActionEl(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
  };

  // To handle filter change
  const handleFilterChange = ({ target: { name, value } }) => {
    setFilterData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  // Channels Popover code
  const handlePopoverOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };
  const open = Boolean(anchorEl);

  // Row-Columns data
  const data = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Audience Title
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "audienceTitle",
        sort: "asc",
        width: 300,
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            Audience Id
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "audienceId",
        sort: "asc",
        width: 300,
      },
      {
        id: 3,
        label: "Channel",
        field: "channel",
        sort: "asc",
        width: 300,
      },
      {
        id: 4,
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],

    rows:
      audienceList?.data?.results?.length > 0
        ? audienceList?.data?.results?.map((item, index) => {
            return {
              audienceTitle: <span key={index}>{item?.title}</span> ?? "",

              audienceId: <span key={index}>{item?.audience_id}</span> ?? "",

              channel: item?.["channel"]?.length ? (
                <div
                  className="flex gap-1.5 text-[#71757b99] [&>:not(:first-child)]:border-l-2 [&>:not(:first-child)]:border-solid [&>:not(:first-child)]:border-[#71757b99] [&>.MuiTypography-root:not(:first-child)]:pl-2"
                  key={index}
                >
                  {item?.channel.map((channel_item) => (
                    <>
                      <Typography
                        key={`${item.id}_${channel_item.channel_data.id}`}
                        id={`${item.id}_${channel_item.channel_data.id}`}
                        aria-owns={
                          open
                            ? `${item.id}_${channel_item.channel_data.id}`
                            : undefined
                        }
                        aria-haspopup="true"
                        onMouseEnter={(event) =>
                          handlePopoverOpen(
                            event,
                            `${item.id}_${channel_item.channel_data.id}`
                          )
                        }
                        sx={{
                          "&.MuiTypography-root": {
                            position: "relative",
                            display: "inline-block",
                            cursor: "pointer",
                            color: "#71757b99",
                            fontSize: "14px",
                            fontWeight: 400,
                            p: 0,
                            fontFamily: '"Figtree", sans-serif',
                            "& .MuiTypography-channelName": {
                              color: "#71757B",
                              pl: 0.5,
                            },
                          },
                        }}
                      >
                        <SharePostToSocialMedia
                          facebook={
                            channel_item?.channel_data?.name?.toLowerCase() ===
                            "facebook"
                          }
                          sms={
                            channel_item?.channel_data?.name?.toLowerCase() ===
                            "opnsesame"
                          }
                        />
                        <Typography variant="body1" component="span">
                          {channel_item.channel_data.name}
                        </Typography>
                      </Typography>
                      <MuiPopoverTooltip
                        id={`${item.id}_${channel_item.channel_data.id}`}
                        anchorEl={anchorEl}
                        openPopover={
                          open &&
                          selectedRowId ===
                            `${item.id}_${channel_item.channel_data.id}`
                        }
                        handlePopoverClose={handlePopoverClose}
                      >
                        <Card
                          sx={{
                            maxWidth: "350px",
                            minWidth: "250px",
                            width: "100%",
                            position: "relative",
                            overflow: "unset",
                            display: "flex",
                            p: 1.5,
                            borderRadius: 0,
                            "&.MuiPaper-root": {
                              "&.MuiPaper-elevation": {
                                "&.MuiPaper-rounded": {
                                  "&.MuiPaper-elevation1": {
                                    boxShadow: "none",
                                    filter:
                                      "drop-shadow(rgba(0, 0, 0, 0.25) 0px 0px 4px)",
                                    m: 0,
                                    mt: 1.875,
                                  },
                                },
                              },
                            },
                          }}
                        >
                          <div className="grid grid-cols-2 w-full gap-x-3 gap-y-1">
                            <Box
                              sx={{
                                position: "absolute",
                                top: "-18px",
                                width: "25px",
                                height: "33px",
                                background:
                                  "#EDEDED linear-gradient(white, white)",
                                clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                              }}
                            />
                            <h6 className="text-sm font-semibold mb-0">
                              {channel_item?.channel_data?.name}
                            </h6>
                            <div className="col-span-2 flex items-center gap-2">
                              <label className="text-sm text-gray-500">
                                Title:
                              </label>
                              <p className="text-sm text-gray-700">
                                {channel_item?.title
                                  ? channel_item?.title
                                  : "NA"}
                              </p>
                            </div>
                            <div className=" flex items-center gap-2">
                              <label className="text-sm text-gray-500">
                                Language:
                              </label>
                              <p className="text-sm text-gray-700">
                                {channel_item?.language
                                  ? channel_item?.language
                                  : "NA"}
                              </p>
                            </div>
                            <div className=" flex items-center gap-2">
                              <label className="text-sm text-gray-500">
                                Device:
                              </label>
                              <p className="text-sm text-gray-700">
                                {channel_item?.device
                                  ? channel_item?.device
                                  : "NA"}
                              </p>
                            </div>
                            <div className=" flex items-center gap-2">
                              <label className="text-sm text-gray-500">
                                Age:
                              </label>
                              <p className="text-sm text-gray-700">
                                {channel_item?.age ? channel_item?.age : "NA"}
                              </p>
                            </div>
                            <div className=" flex items-center gap-2">
                              <label className="text-sm text-gray-500">
                                Gender:
                              </label>
                              <p className="text-sm text-gray-700">
                                {channel_item?.gender
                                  ? channel_item?.gender
                                  : "NA"}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </MuiPopoverTooltip>
                    </>
                  ))}
                </div>
              ) : (
                ""
              ),

              action: (
                <div>
                  {/* <MoreVertIcon /> */}
                  <ActionMenuButton
                    handleChannelPopoverClose={handlePopoverClose}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setAnchorEl={setAnchorActionEl}
                    anchorEl={anchorActionEl}
                    handleEdit={() => handleEdit(item)}
                    handleDelete={() => handleDelete(item)}
                    showDelete={true}
                    showEdit={true}
                    isEditMode={isEditMode}
                    item={{ id: item?.id, isActive: item?.is_active }}
                  />
                </div>
              ),
            };
          })
        : [],
  };

  // Audience fetch list API call
  useUpdateEffect(() => {
    dispatch(GET_AUDIENCE_LIST({ ...paginationData, ...filterData }));
  }, [paginationData, filterData]);

  // Reset modal fields and errors state
  const resetModalData = () => {
    setErrors({
      audience_id: null,
      title: null,
      channel: null,
    });
    setAddAgencyFormData({
      audience_id: null,
      title: "",
      geography: "",
      community: "",
      channel: [
        {
          channel: 0,
          title: "",
          language: 0,
          device: 0,
          age: "",
          gender: 0,
        },
      ],
    });
    setShowTagModal(!showTagModal);
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    let channelArr = [];
    addAgencyFormData?.channel?.forEach((ch) => {
      const channelSelect = isEmpty(ch?.channel) ? "Channel is required" : "";
      const chErr = {
        channel: channelSelect,
        language:
          !channelSelect &&
          (isEmpty(ch?.language) ? "Language is required" : ""),
        device:
          !channelSelect && (isEmpty(ch?.device) ? "Device is required" : ""),
        title:
          !channelSelect && (isEmpty(ch?.title) ? "Title is required" : ""),
        age: !channelSelect && (isEmpty(ch?.age) ? "Age is required" : ""),
        gender:
          !channelSelect && (isEmpty(ch?.gender) ? "Gender is required" : ""),
      };
      channelArr.push(chErr);
    });

    const tempErrors = {
      title: isEmpty(addAgencyFormData?.title) ? "Title is required" : "",
      audience_id: isEmpty(addAgencyFormData?.audience_id)
        ? "Audience is required"
        : "",
      channel: channelArr,
    };

    setErrors(tempErrors);
    if (channelArr?.length > 0) {
      channelArr?.forEach((chItem) => {
        if (Object.values(chItem).filter((value) => value).length === 0) {
          // @ts-ignore
          tempErrors["channel"] = false;
          return;
        }
      });
    }

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }

    submitHandler();
  };

  // Submit the 'Edit Audiences' modal
  const handleEditAudience = () => {
    // API call
    dispatch(UPDATE_AUDIENCE_LIST(selectedItem?.currentId, addAgencyFormData))
      .then((res) => {
        swal({
          title: "Successfully Complete",
          text: "Successfully Saved!",
          className: "successAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 1500,
        });
        dispatch(SET_AUDIENCE_EDIT_DATA(res?.data?.message));
        dispatch(SET_AUDIENCE_LOADING(false));
        resetModalData();
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message.length
            ? err.response.data.message
            : JSON.stringify(err.response.data.message),
          className: "errorAlert",
          icon: Images.ErrorLogo,
          buttons: {
            OK: false,
          },
          timer: 5000,
        });
        dispatch(SET_AUDIENCE_LOADING(false));
      });
  };
  // Submit the 'Add Audiences' modal
  const handleAddAudience = () => {
    // API call
    dispatch(CREATE_AUDIENCE_LIST(addAgencyFormData))
      .then((res) => {
        swal({
          title: "Successfully Complete",
          text: "Successfully Saved!",
          className: "successAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 1500,
        });
        dispatch(SET_CREATE_AUDIENCE(res?.data?.message));
        dispatch(SET_AUDIENCE_LOADING(false));
        resetModalData();
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message.length
            ? err.response.data.message
            : JSON.stringify(err.response.data.message),
          className: "errorAlert",
          icon: Images.ErrorLogo,
          buttons: {
            OK: false,
          },
          timer: 5000,
        });
      });
  };
  const submitHandler = () => {
    if (!isEditMode) {
      handleAddAudience();
    } else {
      handleEditAudience();
    }
  };

  // Fetch Audience updated List on Add, Edit and Delete
  useUpdateEffect(() => {
    if (success.add || success.update || success.delete) {
      dispatch(GET_AUDIENCE_LIST({ ...paginationData, ...filterData }));
    }
  }, [success]);
  return (
    <>
      <div className="page-container">
        <h1 className="page-title">Audience</h1>

        <div className="page-card new-card p-0">
          <div className="flex flex-wrap p-[15px] pb-[20px]">
            <Box
              sx={{
                "& input": {
                  width: "335px",
                  height: "49px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "0 11px",
                },
              }}
            >
              <input
                className="form-control form-control-sm ml-0 my-1"
                type="search"
                placeholder="Search"
                name="search"
                aria-label="Search"
                value={filterData.search}
                onChange={handleFilterChange}
              />
            </Box>

            <div className="savebtn Categorybtn ml-auto">
              <button
                className="btn btn-primary"
                type="button"
                onClick={(e) => {
                  setShowTagModal(true);
                }}
                // disabled={true}
              >
                {" "}
                <Add /> Add Audience
              </button>
            </div>
          </div>

          <MuiPopup
            dialogTitle={isEditMode ? "Edit Audiences" : "Add Audiences"}
            textAlign="left"
            dialogContent={
              <AudienceAddModal
                formData={addAgencyFormData}
                setFormData={setAddAgencyFormData}
                errors={errors}
              />
            }
            openPopup={showTagModal}
            closePopup={() => resetModalData()}
            mainActionHandler={validateSubmit}
            mainActionTitle="Save"
            maxWidth="600px"
          />
          <MuiTable
            loader={audienceList?.loading}
            data={data}
            allData={audienceList?.data}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        </div>
      </div>
    </>
  );
};

export default Audience;
