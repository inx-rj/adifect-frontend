/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, FormControl, Tooltip, Typography } from "@mui/material";
import LoadingSpinner from "../../../containers/LoadingSpinner";
import { validations } from "../../../utils";

import Custom_MUI_Table from "./Custom-MUI-Table";
import DropdownWithSearch from "../../Common/DropdownWithSearch";

import {
  agencyCompanyProjectsListAction,
  agencyCompanyProjectsFilterListAction,
} from "../../../redux/actions/Agency-companies-tabs-actions";

import CustomDateRangePicker from "../../Common/CustomDatePicker/CustomDateRangePicker";
import SharePostToSocialMedia from "../../Common/ShareToSocialMedia/SharePostToSocialMedia";
import { Email } from "@mui/icons-material";
import SearchInput from "../../Common/searchInput/SearchInput";

export default function Agency_company_projects() {
  const dispatch = useDispatch();

  const {
    loading: loadingagencyCompanyProjectsList,
    agencyCompanyProjectsList,
    agencyCompanyProjectListData,
  } = useSelector((state) => state.AgencyCompanyProjectsReducer);

  const {
    loading: loadinagencyCompanyProjectsFilterist,
    agencyCompanyProjectsFiltersList,
  } = useSelector((state) => state.AgencyCompanyProjectsFiltersReducer);

  const [filterData, setFilterData] = useState({
    from_date: "",
    to_date: "",
    community: "",
    status: "",
    // Channel: "",
    tag: "",
    search: "",
  });
  const [filterArr, setFilterArr] = useState([]);
  // const [anchorEl, setAnchorEl] = useState(null);

  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  });

  //fetch filters list
  useEffect(() => {
    if (!agencyCompanyProjectsFiltersList)
      dispatch(agencyCompanyProjectsFilterListAction());
  }, []);

  //fetch filtered data
  useEffect(() => {
    dispatch(agencyCompanyProjectsListAction(paginationData, filterData));
  }, [paginationData, filterData]);

  //set selected filter
  const handleChange = (name, value) => {
    // console.log("FilterLog", name, value);
    setFilterData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  //set filters list array
  useEffect(() => {
    if (agencyCompanyProjectsFiltersList) {
      const filterArr = [
        {
          name: "dateRange",
          label: "Date Range",
          options: <></>,
          filterType: "dateRange",
        },
        {
          name: "community",
          label: "Community",
          options: agencyCompanyProjectsFiltersList?.community,
        },
        {
          name: "status",
          label: "Status",
          options: agencyCompanyProjectsFiltersList?.status,
        },
        {
          name: "tag",
          label: "Tags",
          options: agencyCompanyProjectsFiltersList?.tag,
        },
        // { name: "Channel", label: "Channel", options: ["Channel"] },
      ];
      setFilterArr(filterArr);
    }
  }, [agencyCompanyProjectsFiltersList]);

  const data = {
    columns: [
      {
        id: 1,
        label: (
          <label className="d-flex align-items-center">
            Story Title
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "name",
        sort: "asc",
        width: 100,
      },
      {
        id: 2,
        label: (
          <label className="d-flex align-items-center">
            Community
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "community",
        sort: "asc",
        width: 120,
      },
      {
        id: 3,
        label: (
          <label className="d-flex align-items-center">
            pURL
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "pURL",
        sort: "asc",
        width: 100,
      },
      {
        id: 4,
        label: (
          <label className="d-flex align-items-center">
            Published Date
            <img className="ml-1" src="/img/sort_arrows.png" />
          </label>
        ),
        field: "publishedDate",
        sort: "asc",
        width: 160,
      },
      {
        id: 5,
        label: (
          <label className="d-flex align-items-center">
            Updated Date
            <img className="ml-1" src="/img/sort_arrows.png" />
          </label>
        ),
        field: "updatedDate",
        sort: "asc",
        width: 160,
      },
      {
        id: 6,
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        id: 7,
        label: "Channel",
        field: "channel",
        sort: "asc",
        width: 200,
      },
    ],

    rows:
      agencyCompanyProjectsList?.length > 0
        ? agencyCompanyProjectsList?.map((data, index) => {
          return {
            name: (
              <Link to={`${data.id}`} key={index}>
                {/* <Tooltip title={data.title} placement="top-start"> */}
                <Typography
                  className="truncate max-w-full"
                  sx={{
                    "&.MuiTypography-root": {
                      display: "inline-block",
                      cursor: "pointer",
                      color: "rgba(39, 90, 208, 1)",
                      fontSize: "14px",
                      fontWeight: 400,
                      p: 0,
                      fontFamily: '"Figtree", sans-serif',
                    },
                  }}
                  title={data.title}
                >
                  {data.title}
                </Typography>
                {/* </Tooltip> */}
              </Link>
            ),
            community: data?.community?.name,
            pURL: data.p_url,
            publishedDate: validations.formateISODateToLocaleString(
              data?.published_at ?? ""
            ),
            updatedDate: validations.formateISODateToLocaleString(
              data?.updated_at ?? ""
            ),
            status: (
              <Button
                variant="contained"
                disableRipple
                disableFocusRipple
                disableElevation
                sx={{
                  width: "80px",
                  padding: "7px 5px",
                  background:
                    data.status !== "Published"
                      ? "rgba(250, 45, 32, 0.08)"
                      : "rgba(32, 161, 68, 0.08)",
                  color:
                    data.status !== "Published"
                      ? "rgba(250, 45, 32, 1)"
                      : "#20A144",
                  fontSize: "12px",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "rgba(32, 161, 68, 0.08)",
                  },
                }}
              >
                {data.status}
              </Button>
            ),
            channel: (
              <div className="flex items-center gap-1.5 text-[#71757b99]">
                {data?.community_channels?.map((channel_item, chIndex) => (
                  <SharePostToSocialMedia
                    key={chIndex}
                    facebook={
                      channel_item?.channel_data?.name?.toLowerCase() ===
                      "facebook"
                    }
                    sms={
                      channel_item?.channel_data?.name?.toLowerCase() ===
                      "opnsesame"
                    }
                  />
                ))}
                <Email className="text-theme" />
              </div>
            ),
          };
        })
        : [],
  };

  return (
    <div className="page-container p-[20px]">
      <h1 className="page-title">Company Projects</h1>

      <div className="page-card new-card p-0 relative">
        {loadingagencyCompanyProjectsList &&
          loadinagencyCompanyProjectsFilterist && (
            <Box className="w-full [&>.spinner-container-bg]:backdrop-blur-sm [&>.spinner-container-bg]:bg-white/30">
              <LoadingSpinner />
            </Box>
          )}
        <div className="flex flex-wrap p-[15px] pb-[20px]">
          {!loadinagencyCompanyProjectsFilterist &&
            filterArr?.length > 0 &&
            filterArr?.map((item, index) => (
              <FormControl
                key={index}
                sx={{ m: 1, minWidth: "180px" }}
                size="small"
              >
                {item.filterType === item.name ? (
                  <CustomDateRangePicker
                    handleChange={handleChange}
                    containerClassName={"min-w-[250px]"}
                  />
                ) : (
                  <DropdownWithSearch
                    filterList={item}
                    handleChange={handleChange}
                  />
                )}
              </FormControl>
            ))}
          <div className="ml-auto">
            <SearchInput
              searchVal={filterData.search}
              handleFilterChange={({ target: { name, value } }) => handleChange(name, value)}
            />
          </div>
        </div>

        <Custom_MUI_Table
          loader={loadingagencyCompanyProjectsList}
          data={data}
          allData={agencyCompanyProjectListData}
          paginationData={paginationData}
          setPaginationData={setPaginationData}
        />
      </div>
    </div>
  );
}
