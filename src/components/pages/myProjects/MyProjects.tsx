/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useSingleEffect } from "react-haiku";

import { FormControl, Menu, MenuItem } from "@mui/material";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";

import { Images } from "helper/images";

//import components
import Title from "components/common/pageTitle/Title";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import JobList from "components/homePage/creatorMyProjects/JobList";
import { API_URL } from "helper/env";
import { GET_COMPANY_LIST } from "redux/actions/companyTab/companyTab.actions";
const DropdownWithSearch = lazy(
  () => import("components/common/muiAutocomplete/DropdownWithSearch")
);

const FILTERS = {
  APPLIED: "Applied",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  DONE: "Done",
};

const MENU_OPTIONS = [
  { id: 1, name: "Sort by newest", value: "-created" },
  { id: 2, name: "Sort by oldest", value: "created" },
  { id: 3, name: "Sort by due date", value: "-job__job_due_date" },
];

const AgencyCompanyProjects = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const companyData = useAppSelector(COMPANY_LIST);

  // React states
  const [orderFilter, setOrderFilter] = useState({
    orderingName: "Sort by newest",
    ordering: "-created",
  });
  const [anchorEle, setAnchorEle] = useState(null);
  const openSortingMenu = Boolean(anchorEle);

  const [filterArr, setFilterArr] = useState([]);
  const [filterData, setFilterData] = useState<{ [key: string]: string }>({
    company: "",
    status: FILTERS.APPLIED,
  });

  //set filters list array
  useSingleEffect(() => {
    const filterArr = [
      FILTERS.APPLIED,
      FILTERS.IN_PROGRESS,
      FILTERS.IN_REVIEW,
      FILTERS.DONE,
    ];
    setFilterArr(filterArr);
    dispatch(
      GET_COMPANY_LIST(
        {
          page: 1,
          rowsPerPage: 10,
        },
        `${API_URL.COMPANY.CREATOR_COMPANY_LIST}`
      )
    );
  });

  //set selected filter
  const handleChange = (name: string, value: any) => {
    setFilterData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const menuHandleSort = (value: string, name: string) => {
    setAnchorEle(null);
    setOrderFilter({ orderingName: name, ordering: value });
  };

  console.log("FilterData", filterData, "companyData", companyData);
  return (
    <div className="page-container">
      <h2 className="page-title">My Projects</h2>
      {companyData?.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="page-card card">
            {/* <div className="mb-2">
              <Title title="Company" />
            </div>
            <FormControl sx={{ minWidth: "200px" }} size="small">
              <DropdownWithSearch
                filterList={{
                  name: "company",
                  label: "Select company",
                  options: companyData?.companyList?.data?.results,
                  labelAs: "company__name",
                  valueAs: "company",
                }}
                shrinkLabel={false}
                handleChange={handleChange}
              />
            </FormControl> */}

            <div className="flex-between py-[15px]">
              <div className="flex flex-wrap gap-[5px]">
                {filterArr.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => handleChange("status", filter)}
                    className={`btn btn-outline filter-btn ${
                      filter === filterData.status ? "active" : ""
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="Sort">
                <h6
                  className="flex items-center gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => setAnchorEle(e.currentTarget)}
                >
                  <img src={Images.Sort} alt="" />
                  <h5 className="text-sm font-semibold inline-block align-middle text-[#A0A0A0]">
                    {orderFilter.orderingName}
                  </h5>
                </h6>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    variant: "menu",
                  }}
                  anchorEl={anchorEle}
                  keepMounted
                  open={openSortingMenu}
                  onClose={() => setAnchorEle(null)}
                >
                  {MENU_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.id}
                      onClick={() => menuHandleSort(option.value, option.name)}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
            <JobList
              title={filterData.status}
              ordering={orderFilter.ordering}
              company={filterData.company}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AgencyCompanyProjects;
