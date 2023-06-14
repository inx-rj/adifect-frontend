/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import Custom_MUI_Table from "./Custom-MUI-Table";

import {
  agencyCommunitySettingsListAction,
  agencyCompanyProjectsFilterListAction,
} from "../../../redux/actions/Agency-companies-tabs-actions";

import SharePostToSocialMedia from "../../Common/ShareToSocialMedia/SharePostToSocialMedia";
import PopoverTooltip from "../../../containers/PopoverTooltip";
import CustomPopup from "../../Common/CustomPopup";
import CustomAddModal from "./CustomAddModal/CustomAddModal";
import { handleErrors, isEmpty } from "../../../utils/validations";
import { BACKEND_API_URL } from "../../../environment";
import swal from "sweetalert";
import api from "../../../utils/api";
import CustomPopoverCard from "./CustomPopoverCard/CustomPopoverCard";
import ActionMenuButton from "../../Common/actionMenuButton/ActionMenuButton";
import SearchInput from "../../Common/searchInput/SearchInput";

export default function Agency_community_settings() {
  const dispatch = useDispatch();

  // Redux states
  const {
    loading: loadingagencyCommunitySettingsData,
    agencyCommunitySettingsData,
  } = useSelector((state) => state.AgencyCommunitySettingsReducer);
  const { agencyCompanyProjectsFiltersList } = useSelector(
    (state) => state.AgencyCompanyProjectsFiltersReducer
  );

  // React states
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  }); // pagination params state
  const [filterData, setFilterData] = useState({
    from_date: "",
    to_date: "",
    community: "",
    status: "",
    tag: "",
    search: "",
  }); // filter params state
  const [showTagModal, setShowTagModal] = useState(false); // Add Community Settings modal state
  const [formData, setFormData] = useState({
    fbUrl: undefined,
    fbApiKey: undefined,
    opnUrl: undefined,
    opnApiKey: undefined,
  }); // Add Community Settings modal fields state
  const [errors, setErrors] = useState({
    community_id: null,
    fbUrl: null,
    fbApiKey: null,
    opnUrl: null,
    opnApiKey: null,
  }); // Add Community Settings modal fields error state
  const [selectedOption, setSelectedOption] = useState({
    label: "",
    value: "",
  }); // Community dropdown state for 'Add Community Settings' modal
  const [searchText, setSearchText] = useState("");
  const [channelList, setChannelList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorActionEl, setAnchorActionEl] = React.useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  // Action Menu button states
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null,
  });

  // Community, Story, Tag fetch list API call
  useEffect(() => {
    dispatch(agencyCompanyProjectsFilterListAction());
  }, []);

  // Community settings fetch list API call
  useEffect(() => {
    dispatch(agencyCommunitySettingsListAction(paginationData, filterData));
  }, [paginationData, filterData]);

  //set the edit mode
  const handleEdit = (item) => {
    setShowTagModal(true);
    setIsEditMode(true);
    setErrors({ ...errors, community_id: null });
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    setSelectedOption({
      label: item?.community?.name,
      value: item?.community?.id,
    });
    const fbChannelData = item?.community_channels?.find(
      (channel) => channel?.channel_data?.name?.toLowerCase() == "facebook"
    );
    const openSesameChannelData = item?.community_channels?.find(
      (channel) => channel?.channel_data?.name?.toLowerCase() == "opnsesame"
    );

    setFormData({
      fbApiKey: fbChannelData?.api_key,
      fbUrl: fbChannelData?.url,
      opnUrl: openSesameChannelData?.url,
      opnApiKey: openSesameChannelData?.api_key,
    });
  };

  //handle delete action
  const handleDelete = (item) => {
    swal({
      title: "Warning",
      text: `Are you sure you want to remove this ${item?.community?.name}?`,
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`${BACKEND_API_URL}community/community-setting/${item?.id}/`)
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Deleted!",
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            dispatch(
              agencyCommunitySettingsListAction(paginationData, filterData)
            );
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: err.response.data.message.length
                ? err.response.data.message
                : err.response.data.message,
              className: "errorAlert",
              icon: "/img/logonew-red.svg",
              buttons: false,
              timer: 5000,
            });
          });
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
            Community
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "community",
        sort: "asc",
        width: 300,
      },
      {
        id: 2,
        label: "Channel",
        field: "channel",
        sort: "asc",
        width: 200,
      },
      {
        id: 3,
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],

    rows:
      agencyCommunitySettingsData?.results?.length > 0
        ? agencyCommunitySettingsData?.results?.map((item, index) => {
            return {
              community: (
                <Typography
                  sx={{
                    "&.MuiTypography-root": {
                      // display: "inline-block",
                      // cursor: "pointer",
                      color: "#71757B",
                      fontSize: "14px",
                      fontWeight: 400,
                      p: 0,
                      fontFamily: '"Figtree", sans-serif',
                    },
                  }}
                  key={index}
                >
                  {item.community.name}
                </Typography>
              ),

              channel: item?.["community_channels"]?.length ? (
                <div
                  className="flex gap-1.5 text-[#71757b99] [&>:not(:first-child)]:border-l-2 [&>:not(:first-child)]:border-solid [&>:not(:first-child)]:border-[#71757b99] [&>.MuiTypography-root:not(:first-child)]:pl-2"
                  key={`${item.community.name}_${index}`}
                >
                  {item?.community_channels?.map((channel_item) => (
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
                            // color: 'rgba(39, 90, 208, 1)',
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
                        <Typography variant="channelName" component="span">
                          {channel_item.channel_data.name}
                        </Typography>
                      </Typography>
                      <PopoverTooltip
                        id={`${item.id}_${channel_item.channel_data.id}`}
                        anchorEl={anchorEl}
                        openPopover={
                          open &&
                          selectedRowId ===
                            `${item.id}_${channel_item.channel_data.id}`
                        }
                        handlePopoverClose={handlePopoverClose}
                      >
                        <CustomPopoverCard
                          urlTitle={`${channel_item?.channel_data?.name} URL: `}
                          urlApiValue={channel_item}
                          apiTitle={`${channel_item?.channel_data?.name} API Key: `}
                        />
                      </PopoverTooltip>
                    </>
                  ))}
                </div>
              ) : (
                ""
              ),

              action: (
                <div>
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

  // Channels list fetch API call
  const getChannelList = async () => {
    api
      .get(`${BACKEND_API_URL}community/channel/`)
      .then((res) => {
        setChannelList(res?.data?.data?.results || res?.data?.data);
      })
      .catch((err) => {
        console.log(err, "Channel Error");
      });
  };
  useEffect(() => {
    getChannelList();
  }, []);

  // Reset modal fields and errors state
  const resetModalData = () => {
    setErrors({ ...errors, community_id: null });
    setFormData({
      fbUrl: undefined,
      fbApiKey: undefined,
      opnUrl: undefined,
      opnApiKey: undefined,
    });
    setShowTagModal(!showTagModal);
    setSelectedOption(null);
    setSearchText("");
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      community_id: isEmpty(selectedOption?.["label"], "Community is required"),
      // fbUrl: isEmpty(formData.fbUrl, 'Facebook URL is required'),
      // fbApiKey: isEmpty(formData.fbApiKey, 'Facebook API Key is required'),
      // opnUrl: isEmpty(formData.opnUrl, "Opnsesame URL is required"),
      // opnApiKey: isEmpty(formData.opnApiKey, "Opnsesame Key is required"),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };

  const handleAddCommunity = (channel) => {
    // Add Payload
    const communitySettingsPayload = {
      community_id: selectedOption?.["value"],
      channel: [],
    };

    communitySettingsPayload.channel = [...channel];
    api
      .post(
        `${BACKEND_API_URL}community/community-setting/`,
        communitySettingsPayload
      )
      .then((res) => {
        // console.log({ FBKey: formData.fbApiKey }, 'FbKey');
        swal({
          title: "Successfully Complete",
          text: "Successfully Saved!",
          className: "successAlert-login",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        dispatch(agencyCommunitySettingsListAction(paginationData, filterData));
        resetModalData();
      })
      .catch((err) => {
        handleErrors(err.response.data.message, setErrors);
      });
  };

  const handleEditCommunity = (channel) => {
    // Edit Payload
    const communitySettingsPayload = {
      community_id: selectedOption?.["value"],
      channel: [],
    };

    communitySettingsPayload.channel = [...channel];
    api
      .put(
        `${BACKEND_API_URL}community/community-setting/${selectedItem?.currentId}/`,
        communitySettingsPayload
      )
      .then((res) => {
        swal({
          title: "Successfully Complete",
          text: "Successfully Saved!",
          className: "successAlert-login",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        dispatch(agencyCommunitySettingsListAction(paginationData, filterData));
        setIsEditMode(false);

        resetModalData();
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message.length
            ? err.response.data.message
            : err.response.data.message,
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 5000,
        });
      });
  };

  // Submit the 'Add Community Settings' modal
  const submitHandler = (e) => {
    if (channelList.length) {
      const channel = [];

      if (
        formData.opnUrl &&
        formData.opnApiKey &&
        formData.fbUrl &&
        formData.fbApiKey
      ) {
        channel.push(
          {
            channel: channelList.find(
              (e) => e.name.toLowerCase() === "facebook"
            ).id,
            url: formData.fbUrl,
            api_key: formData.fbApiKey,
          },
          {
            channel: channelList.find(
              (e) => e.name.toLowerCase() === "opnsesame"
            ).id,
            url: formData.opnUrl,
            api_key: formData.opnApiKey,
          }
        );
      } else if (formData.opnUrl && formData.opnApiKey) {
        channel.push({
          channel: channelList.find((e) => e.name.toLowerCase() === "opnsesame")
            .id,
          url: formData.opnUrl,
          api_key: formData.opnApiKey,
        });
      } else if (formData.fbUrl && formData.fbApiKey) {
        channel.push({
          channel: channelList.find((e) => e.name.toLowerCase() === "facebook")
            .id,
          url: formData.fbUrl,
          api_key: formData.fbApiKey,
        });
      }

      // API call
      if (!isEditMode) {
        handleAddCommunity(channel);
      } else {
        handleEditCommunity(channel);
      }
    } else {
      swal({
        title: "Error",
        text: "Channel not found!",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
    }
  };

  // Clears the error when the community dropdown option is selected
  useEffect(() => {
    if (!isEmpty(selectedOption?.["label"] || selectedOption)) {
      setErrors({ ...errors, community_id: null });
    }
  }, [selectedOption]);

  return (
    <>
      <div className="page-container p-[20px]">
        <h1 className="page-title">Community Settings</h1>

        <div className="page-card new-card p-0">
          <div className="flex flex-wrap p-[15px] pb-[20px]">
            <SearchInput
              searchVal={filterData.search}
              handleFilterChange={handleFilterChange}
            />

            <div className="savebtn Categorybtn ml-auto">
              <button
                className="addanewmail w-full h-full"
                type="button"
                onClick={(e) => {
                  setShowTagModal(true);
                }}
              >
                {" "}
                + Add
              </button>
            </div>
          </div>

          <CustomPopup
            dialogTitle="Add Community Settings"
            textAlign="left"
            dialogContent={
              <CustomAddModal
                communityOptions={
                  agencyCompanyProjectsFiltersList?.community
                    ? agencyCompanyProjectsFiltersList
                    : []
                }
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                searchText={searchText}
                setSearchText={setSearchText}
                setFormData={setFormData}
                formData={formData}
                setErrors={setErrors}
                errors={errors}
              />
            }
            openPopup={showTagModal}
            closePopup={() => resetModalData()}
            mainActionHandler={validateSubmit}
            mainActionTitle="Save"
          />

          <Custom_MUI_Table
            loader={loadingagencyCommunitySettingsData}
            data={data}
            allData={agencyCommunitySettingsData || []}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
            handlePopoverClose={handlePopoverClose}
          />
        </div>
      </div>
    </>
  );
}
