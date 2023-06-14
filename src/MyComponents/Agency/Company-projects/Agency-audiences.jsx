/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Typography } from "@mui/material";
import Custom_MUI_Table from "./Custom-MUI-Table";
import {
  agencyAudiencesListAction,
  agencyCommunitySettingsListAction,
  agencyCompanyProjectsFilterListAction,
} from "../../../redux/actions/Agency-companies-tabs-actions";
import SharePostToSocialMedia from "../../Common/ShareToSocialMedia/SharePostToSocialMedia";
import PopoverTooltip from "../../../containers/PopoverTooltip";
import { handleErrors, isEmpty } from "../../../utils/validations";
import { BACKEND_API_URL } from "../../../environment";
import swal from "sweetalert";
import api from "../../../utils/api";
import ActionMenuButton from "../../Common/actionMenuButton/ActionMenuButton";
import SearchInput from "../../Common/searchInput/SearchInput";

export default function Agency_audiences() {
  const dispatch = useDispatch();

  // Redux states
  const { loading: loadingAgencyAudiencesData, agencyAudiencesData } =
    useSelector((state) => state.AgencyAudiencesReducer);
  const {
    loading: loadingagencyCommunitySettingsData,
    agencyCommunitySettingsData,
  } = useSelector((state) => state.AgencyCommunitySettingsReducer);

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
  const [showTagModal, setShowTagModal] = useState(false); // Add Audiences modal state
  const [addAgencyFormData, setAddAgencyFormData] = useState({
    audience_id: "",
    title: "",
    geography: "",
    community: { label: "", value: "" },
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

  // Add Audiences modal fields state
  const [errors, setErrors] = useState({
    audience_id: null,
    title: null,
    channel: null,
  });
  const [channelList, setChannelList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  // Action Menu button states
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null,
  });
  const [anchorActionEl, setAnchorActionEl] = React.useState(null);

  // Community, Story, Tag fetch list API call
  useEffect(() => {
    dispatch(agencyCompanyProjectsFilterListAction());
  }, []);

  // Audiences fetch list API call
  useEffect(() => {
    dispatch(agencyAudiencesListAction(paginationData, filterData));
  }, [paginationData, filterData]);

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

  // Handle Edit audience data
  const handleEdit = (item) => {
    setShowTagModal(true);
    setIsEditMode(true);
    setErrors({
      audience_id: null,
      title: null,
      channel: null,
    });

    const editableData = agencyAudiencesData?.results?.find(
      (filterData) => filterData?.id === item?.id
    );

    editableData["community"] = {
      label: editableData?.community?.name ?? "",
      value: editableData?.community?.id ?? "",
    };

    setAddAgencyFormData(editableData);
  };

  //handle audience delete action
  const handleDelete = (item) => {
    swal({
      title: "Warning",
      text: `Are you sure you want to remove this ${item?.title}?`,
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`${BACKEND_API_URL}agency/audience/${item?.id}/`)
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Deleted!",
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            dispatch(agencyAudiencesListAction(paginationData, filterData));
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

  // Row-Columns data
  const data = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Audience Title
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "audienceId",
        sort: "asc",
        width: 300,
      },
      {
        id: 3,
        label: (
          <label className="flex items-center">
            Opted In
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "optIn",
        sort: "asc",
        width: 300,
      },
      {
        id: 4,
        label: (
          <label className="flex items-center">
            Opted Out
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "optOut",
        sort: "asc",
        width: 300,
      }
    ],

    rows:
      agencyAudiencesData?.results?.length > 0
        ? agencyAudiencesData?.results?.map((item, index) => {
          return {
            audienceTitle: item?.title ?? "",

            audienceId: item?.audience_id ?? "",

            channel: item?.["channel"]?.length ? (
              <div
                className="flex gap-1.5 text-[#71757b99] [&>:not(:first-child)]:border-l-2 [&>:not(:first-child)]:border-solid [&>:not(:first-child)]:border-[#71757b99] [&>.MuiTypography-root:not(:first-child)]:pl-2"
                key={`${item.title}_${index}`}
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
                      <Card
                        sx={{
                          maxWidth: "350px",
                          minWidth: "250px",
                          width: "100%",
                          position: "relative",
                          overflow: "unset",
                          display: "flex",
                          p: 2.625,
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
                    </PopoverTooltip>
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

  // Channels list fetch API call
  const getChannelList = async () => {
    api
      .get(`${BACKEND_API_URL}community/channel/`)
      .then((res) => {
        setChannelList(res?.data?.data?.results || res?.data?.data);
      })
      .catch((err) => {
        // console.log(err, "Channel Error");
      });
  };
  useEffect(() => {
    getChannelList();
  }, []);

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
      channel: [],
    });
    setShowTagModal(!showTagModal);
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    let channelArr = [];
    addAgencyFormData?.channel?.forEach((ch) => {
      const channelSelect = isEmpty(ch?.channel, "Channel is required");
      const chErr = {
        channel: channelSelect,
        language:
          !channelSelect && isEmpty(ch?.language, "Language is required"),
        device: !channelSelect && isEmpty(ch?.device, "Device is required"),
        title: !channelSelect && isEmpty(ch?.title, "Title is required"),
        age: !channelSelect && isEmpty(ch?.age, "Age is required"),
        gender: !channelSelect && isEmpty(ch?.gender, "Gender is required"),
      };
      channelArr.push(chErr);
    });

    const tempErrors = {
      title: isEmpty(addAgencyFormData?.title, "Title is required"),
      audience_id: isEmpty(
        addAgencyFormData?.audience_id,
        "Audience is required"
      ),
      channel: channelArr,
    };

    setErrors(tempErrors);
    if (channelArr?.length > 0) {
      channelArr?.forEach((chItem) => {
        if (Object.values(chItem).filter((value) => value).length === 0) {
          // delete tempErrors?.channel;
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

  // Submit the 'Add Audiences' modal
  const handleEditAudience = () => {
    addAgencyFormData.community = addAgencyFormData?.community?.value;

    // API call
    api
      .put(
        `${BACKEND_API_URL}agency/audience/${selectedItem?.currentId}/`,
        addAgencyFormData
      )
      .then((res) => {
        dispatch(agencyAudiencesListAction(paginationData, filterData));
        swal({
          title: "Successfully Complete",
          text: "Successfully Saved!",
          className: "successAlert-login",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        resetModalData();
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message.length
            ? err.response.data.message
            : JSON.stringify(err.response.data.message),
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 5000,
        });
      });
  };
  const handleAddAudience = () => {
    addAgencyFormData.community = addAgencyFormData?.community?.value;

    // API call
    api
      .post(`${BACKEND_API_URL}agency/audience/`, addAgencyFormData)
      .then((res) => {
        dispatch(agencyAudiencesListAction(paginationData, filterData));
        swal({
          title: "Successfully Complete",
          text: "Successfully Saved!",
          className: "successAlert-login",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        resetModalData();
      })
      .catch((err) => {
        handleErrors(err.response.data.message, setErrors);
        swal({
          title: "Error",
          text: err.response.data.message.length
            ? err.response.data.message
            : JSON.stringify(err.response.data.message),
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
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

  // Clears the error when the community dropdown option is selected
  // useEffect(() => {
  //   if (!isEmpty(addAgencyFormData?.audience_id || addAgencyFormData?.title)) {
  //     setErrors({
  //       audience_id: null,
  //       title: null,
  //       channel: null,
  //     });
  //   }
  // }, [showTagModal]);

  // Community settings fetch list API call

  useEffect(() => {
    dispatch(agencyCommunitySettingsListAction(paginationData, filterData));
  }, [paginationData, filterData]);

  const APi_URL = "https://dev-api.adifect.com/community/open-sesame/";

  // Get audiences from list
  const getAudiencesFromOpnSesame = async (data) => {
    const audiencePayload = {
      url: `${data?.client_id || "302"}/audiences`,
      method: "GET",
      token: data?.key || "b2506baf80d1e9c4ebccbaca03c4c8639aceeb61",
    };
    await api.post(APi_URL, audiencePayload).then((res) => {
      const audiences = (res?.data?.data?.results || res?.data?.data)

      // console.log({ audiences })

      if (!audiences?.length) {
        swal({
          title: "Error",
          text:
            res?.data?.data?.detail ?? "Audience does not belong to this story",
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 5000,
        });
      }
    });
  };

  const fetchCommunityAudiences = () => {
    api.get("community/audience/?search=79851").then((res) => {
      console.log(res.data, 'fetchCommunityAudiences Data')
    }).catch((err) => {
      console.log({ err }, 'fetchCommunityAudiences error')
    })
  }

  useEffect(() => {
    if (agencyCommunitySettingsData?.results?.length) {

      const x = agencyCommunitySettingsData?.results?.map((communitySetting) => {
        return {
          community_name: communitySetting?.community?.name,
          key: communitySetting["community_channels"].find(
            (e) => e["channel_data"].name.toLowerCase() === "opnsesame"
          )?.["api_key"],
          client_id: communitySetting["community_channels"].find(
            (e) => e["channel_data"].name.toLowerCase() === "opnsesame"
          )?.["url"],
        }
      })

      getAudiencesFromOpnSesame(x?.[0]);

      // console.log({ agencyCommunitySettingsData, x }, 'agencyCommunitySettingsData')
    }

    fetchCommunityAudiences();

  }, [agencyCommunitySettingsData])


  return (
    <>
      <div className="page-container p-[20px]">
        <h1 className="page-title">Audiences</h1>

        <div className="page-card new-card p-0">
          <div className="flex flex-wrap p-[15px] pb-[20px]">
            <SearchInput
              searchVal={filterData.search}
              handleFilterChange={handleFilterChange}
            />

            {/* <div className="savebtn Categorybtn ml-auto">
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
            </div> */}
          </div>

          {/* <CustomPopup
            dialogTitle={isEditMode ? "Edit Audiences" : "Add Audiences"}
            textAlign="left"
            dialogContent={
              <AudienceAddModal
                formData={addAgencyFormData}
                setFormData={setAddAgencyFormData}
                errors={errors}
                channelList={channelList}
              />
            }
            openPopup={showTagModal}
            closePopup={() => resetModalData()}
            mainActionHandler={validateSubmit}
            mainActionTitle="Save"
          /> */}

          <Custom_MUI_Table
            loader={loadingAgencyAudiencesData}
            data={data}
            allData={agencyAudiencesData || []}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
            handlePopoverClose={handlePopoverClose}
          />
        </div>
      </div>
    </>
  );
}
