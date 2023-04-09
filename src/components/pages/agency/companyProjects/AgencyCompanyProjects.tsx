/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { Button, FormControl, Typography } from "@mui/material";
import { formateISODateToLocaleString } from "helper/utility/customFunctions";
import CustomDateRangePicker from "components/common/customDatePicker/CustomDateRangePicker";
import MuiCustomTable from "components/common/muiCustomTable/MuiCustomTable";
import {
  GET_COMPANY_PROJECTS_FILTERS_LIST,
  GET_COMPANY_PROJECTS_LIST,
} from "redux/actions/companies/companies.actions";
import { useAppDispatch, useAppSelector } from "redux/store";
import { COMPANY_PROJECTS } from "redux/reducers/companies/companies.slice";
import DropdownWithSearch from "components/common/muiCustomAutocomplete/DropdownWithSearch";
import { TableRowColType } from "helper/types/muiCustomTable/muiCustomTable";
import { filterUIOptionsListType } from "helper/types/companies/comapniesType";
import { Images } from "helper/images";

// import SharePostToSocialMedia from "../../Common/ShareToSocialMedia/SharePostToSocialMedia";

const AgencyCompanyProjects = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const { companyProjectsList, companyProjectsFilters } =
    useAppSelector(COMPANY_PROJECTS);

  // React states
  const [filterData, setFilterData] = useState<{ [key: string]: string }>({
    from_date: "",
    to_date: "",
    community: "",
    status: "",
    // Channel: "",
    tag: "",
  });
  const [filterArr, setFilterArr] = useState<filterUIOptionsListType[]>([]);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  });

  //fetch filters list
  useEffect(() => {
    if (!companyProjectsFilters.data.community.length)
      dispatch(GET_COMPANY_PROJECTS_FILTERS_LIST());
  }, []);

  //fetch company projects list and filtered data if passed in params
  useSingleEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_LIST({ ...paginationData, ...filterData }));
  });

  //fetch company projects list and filtered data if passed in params
  useUpdateEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_LIST({ ...paginationData, ...filterData }));
  }, [paginationData, filterData]);

  //set selected filter
  const handleChange = (name: string, value: any) => {
    setFilterData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  //set filters list array
  useEffect(() => {
    if (companyProjectsFilters.data) {
      const filterArr: filterUIOptionsListType[] = [
        {
          name: "dateRange",
          label: "Date Range",
          options: [],
          filterType: "dateRange",
        },
        {
          name: "community",
          label: "Community",
          options: companyProjectsFilters.data.community,
        },
        {
          name: "status",
          label: "Status",
          options: companyProjectsFilters.data.status,
        },
        {
          name: "tag",
          label: "Tags",
          options: companyProjectsFilters.data.tag,
        },
        // { name: "Channel", label: "Channel", options: ["Channel"] },
      ];
      setFilterArr(filterArr);
    }
  }, [companyProjectsFilters.data]);

  const data: TableRowColType = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Story Title
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            Community
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "publication",
        sort: "asc",
        width: 120,
      },
      {
        id: 3,
        label: (
          <label className="flex items-center">
            pURL
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "pURL",
        sort: "asc",
        width: 100,
      },
      {
        id: 4,
        label: (
          <label className="flex items-center">
            Published Date
            <img className="ml-2" src={Images.SortArrows} />
          </label>
        ),
        field: "publishedDate",
        sort: "asc",
        width: 160,
      },
      {
        id: 5,
        label: (
          <label className="flex items-center">
            Updated Date
            <img className="ml-2" src={Images.SortArrows} />
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
      companyProjectsList.data.results.length > 0
        ? companyProjectsList.data.results.map((data, index) => {
            return {
              name: (
                <div key={index}>
                  <Link to={`${data.id}`}>
                    <Typography
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
                    >
                      {data.title}
                    </Typography>
                  </Link>
                </div>
              ),
              publication: data?.community?.name,
              pURL: data.p_url,
              publishedDate: formateISODateToLocaleString(
                data.story_metadata.published_at ?? ""
              ),
              updatedDate: formateISODateToLocaleString(
                data.story_metadata.updated_at ?? ""
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
                <div className="flex gap-1.5 text-[#71757b99]">
                  {/* <SharePostToSocialMedia /> */}
                </div>
              ),
            };
          })
        : [],
  };

  return (
    <div className="page-container">
      <h2 className="card-page-title">Company Projects</h2>

      <div className="card p-0">
        {companyProjectsFilters.loading && filterArr?.length > 0 ? (
          <div className="projectsLoaderCreatsorPage">
            {/* <LoadingSpinner /> */}
            Loading . . .
          </div>
        ) : (
          <div className="flex flex-wrap gap-[15px] p-[15px] pb-5">
            {filterArr?.map((item, index) => (
              <FormControl key={index} sx={{ minWidth: "180px" }} size="small">
                {item.filterType === item.name ? (
                  <CustomDateRangePicker handleChange={handleChange} />
                ) : (
                  <DropdownWithSearch
                    filterList={item}
                    handleChange={handleChange}
                  />
                )}
              </FormControl>
            ))}
          </div>
        )}

        {companyProjectsList.loading ? (
          <div className="projectsLoaderCreatorPage">
            {/* <LoadingSpinner /> */}
            Loading . . .
          </div>
        ) : (
          <MuiCustomTable
            loader={companyProjectsList.loading}
            data={data}
            allData={companyProjectsList.data}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        )}
      </div>
    </div>
  );
};

export default AgencyCompanyProjects;
