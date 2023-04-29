/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomAddModal from "./CustomAddModal/CustomAddModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import swal from "sweetalert";
import { useAppDispatch, useAppSelector } from "redux/store";
import { COMMUNITY_SETTINGS_DATA } from "redux/reducers/companies/communitySettings.slice";
import ChannelPopoverCard from "./ChannelPopoverCard/ChannelPopoverCard";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { GET_COMMUNITY_SETTINGS_LIST } from "redux/actions/communitySettings/communitySettings.actions";
import { GET_COMPANY_PROJECTS_FILTERS_LIST } from "redux/actions/companies/companies.actions";
import { COMPANY_PROJECTS_FILTERS_DATA } from "redux/reducers/companies/companies.slice";
import SharePostToSocialMedia from "components/common/ShareToSocialMedia/SharePostToSocialMedia";
import { isEmpty } from "helper/utility/customFunctions";
import axiosPrivate from "api/axios";
import { API_URL, BASE_URL } from "helper/env";
import MuiPopup from "components/common/muiPopup/MuiPopup";
import MuiPopoverTooltip from "components/common/muiPopoverTooltip/muiPopoverTooltip";
import MuiTable from "components/common/muiTable/MuiTable";
import { Images } from "helper/images";
import { Add } from "@mui/icons-material";
import LoadingSpinner from "components/common/loadingSpinner/Loader";

export default function Agency_community_settings() {
  const dispatch = useAppDispatch();

  // Redux states
  //   const {
  //     loading: loadingagencyCommunitySettingsData,
  //     agencyCommunitySettingsData,
  //   } = useSelector((state) => state.AgencyCommunitySettingsReducer);
  //   const { agencyCompanyProjectsFiltersList } = useSelector(
  //     (state) => state.AgencyCompanyProjectsFiltersReducer
  //   );
  const agencyCommunitySettingsData = useAppSelector(COMMUNITY_SETTINGS_DATA);
  const agencyCompanyProjectsFiltersList = useAppSelector(
    COMPANY_PROJECTS_FILTERS_DATA
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
    community: null,
    fbUrl: null,
    fbApiKey: null,
    opnUrl: null,
    opnApiKey: null,
  }); // Add Community Settings modal fields error state
  const [selectedOption, setSelectedOption] = useState({
    id: "",
    name: "",
  }); // Community dropdown state for 'Add Community Settings' modal
  const [searchText, setSearchText] = useState("");
  const [channelList, setChannelList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  // Community, Story, Tag fetch list API call
  useSingleEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_FILTERS_LIST());
    dispatch(GET_COMMUNITY_SETTINGS_LIST({ ...paginationData, ...filterData }));
  });
  //   useEffect(() => {
  //     dispatch(agencyCompanyProjectsFilterListAction());
  //   }, []);

  // Community settings fetch list API call
  useUpdateEffect(() => {
    dispatch(GET_COMMUNITY_SETTINGS_LIST({ ...paginationData, ...filterData }));
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

  // Row-Columns data
  const data = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Community
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
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
      agencyCommunitySettingsData?.data?.results?.length > 0
        ? agencyCommunitySettingsData?.data?.results?.map((item, index) => {
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
                        key={`${item.id}_${channel_item.channel}`}
                        id={`${item.id}_${channel_item.channel}`}
                        aria-owns={
                          open
                            ? `${item.id}_${channel_item.channel}`
                            : undefined
                        }
                        aria-haspopup="true"
                        onMouseEnter={(event) =>
                          handlePopoverOpen(
                            event,
                            `${item.id}_${channel_item.channel}`
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
                        {/* @ts-ignore */}
                        <Typography variant="channelName" component="span">
                          {channel_item.channel_data.name}
                        </Typography>
                      </Typography>
                      <MuiPopoverTooltip
                        id={`${item.id}_${channel_item.channel}`}
                        anchorEl={anchorEl}
                        openPopover={
                          open &&
                          selectedRowId === `${item.id}_${channel_item.channel}`
                        }
                        handlePopoverClose={handlePopoverClose}
                      >
                        <ChannelPopoverCard
                          urlTitle={`${channel_item?.channel_data?.name} URL: `}
                          urlApiValue={channel_item}
                          apiTitle={`${channel_item?.channel_data?.name} API Key: `}
                        />
                      </MuiPopoverTooltip>
                    </>
                  ))}
                </div>
              ) : (
                ""
              ),

              action: (
                <div>
                  <MoreVertIcon />
                </div>
              ),
            };
          })
        : [],
  };

  // Channels list fetch API call
  const getChannelList = async () => {
    axiosPrivate
      .get(`${BASE_URL.COMPANIES}channel/`)
      .then((res) => {
        setChannelList(res?.data?.data?.results);
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
    setErrors({ ...errors, community: null });
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
    const tempErrors: any = {
      community: isEmpty(selectedOption?.["name"])
        ? "Community is required"
        : "",
      // fbUrl: isEmpty(formData.fbUrl, 'Facebook URL is required'),
      // fbApiKey: isEmpty(formData.fbApiKey, 'Facebook API Key is required'),
      // opnUrl: isEmpty(formData.opnUrl, 'Opnsesame URL is required'),
      // opnApiKey: isEmpty(formData.opnApiKey, 'Opnsesame Key is required'),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };
  // Submit the 'Add Community Settings' modal
  const submitHandler = () => {
    if (channelList.length) {
      const channel = [];

      if (
        formData.opnUrl &&
        formData.opnApiKey &&
        formData.fbUrl &&
        formData.fbUrl
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
      } else if (formData.fbUrl && formData.fbUrl) {
        channel.push({
          channel: channelList.find((e) => e.name.toLowerCase() === "facebook")
            .id,
          url: formData.fbUrl,
          api_key: formData.fbApiKey,
        });
      }

      // Payload
      const communitySettingsPayload = {
        community_id: selectedOption?.["id"],
        channel: [],
      };

      communitySettingsPayload.channel = [...channel];

      console.log(
        { formData, channel, channelList, communitySettingsPayload },
        "communitySettingsPayload"
      );

      // API call
      axiosPrivate
        .post(
          `${BASE_URL.COMPANIES}community-setting/`,
          communitySettingsPayload
        )
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
          dispatch(
            GET_COMMUNITY_SETTINGS_LIST({ ...paginationData, ...filterData })
          );
          resetModalData();
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: err.response.data.message.length
              ? err.response.data.message
              : err.response.data.message,
            className: "errorAlert",
            icon: Images.ErrorLogo,
            buttons: {
              OK: false,
            },
            timer: 5000,
          });
        });
    }
  };

  // Clears the error when the community dropdown option is selected
  useUpdateEffect(() => {
    if (!isEmpty(selectedOption?.["name"] || selectedOption)) {
      setErrors({ ...errors, community: null });
    }
  }, [selectedOption]);

  const handleChange = (e, value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <div className="page-container ">
        <h1 className="page-title">Community Settings</h1>

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
              {/* <input type="search" name="search" class="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autocomplete="off" value={filterData.search} onChange={handleFilterChange} /> */}
            </Box>

            <div className="ml-auto">
              <button
                className="btn btn-primary"
                type="button"
                onClick={(e) => {
                  setShowTagModal(true);
                }}
              >
                <Add /> Add Community Setting
              </button>
            </div>
          </div>

          <MuiPopup
            dialogTitle="Add Community Settings"
            textAlign="left"
            dialogContent={
              <CustomAddModal
                communityOptions={
                  agencyCompanyProjectsFiltersList?.data?.community
                    ? agencyCompanyProjectsFiltersList?.data?.community
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
                handleChange={handleChange}
              />
            }
            openPopup={showTagModal}
            closePopup={() => resetModalData()}
            mainActionHandler={validateSubmit}
            mainActionTitle="Save"
          />

          {agencyCommunitySettingsData?.loading ? (
            <div className="projectsLoaderCreatorPage">
              <LoadingSpinner />
            </div>
          ) : (
            <MuiTable
              loader={agencyCommunitySettingsData?.loading}
              data={data}
              allData={agencyCommunitySettingsData?.data}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
              handlePopoverClose={handlePopoverClose}
            />
          )}
        </div>
      </div>
    </>
  );
}
