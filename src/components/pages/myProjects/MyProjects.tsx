import { lazy, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useSingleEffect } from "react-haiku";

import { FormControl, Menu, MenuItem, MenuListProps } from "@mui/material";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";

import { Images } from "helper/images";

//import components
import Title from "components/common/pageTitle/Title";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import JobList from "components/homePage/creatorMyProjects/JobList";
import { API_URL } from "helper/env";
import { GET_COMPANY_LIST } from "redux/actions/companyTab/companyTab.actions";
import MuiAutoCompleteComponent from "components/common/muiAutocomplete/MuiAutoCompleteComponent";
import { LabelValueOptionType } from "helper/types/common/commonType";
import { GET_USER_DATA } from "redux/reducers/auth/auth.slice";
import { ROLES } from "helper/config";

const FILTERS = {
  APPLIED: "Applied",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  REJECTED: "Rejected",
  DONE: "Done",
};

const menuOptions = [
  { id: 1, name: "Sort by newest", value: "-created" },
  { id: 2, name: "Sort by oldest", value: "created" },
  { id: 3, name: "Sort by due date", value: "-job__job_due_date" },
];

const MenuProps: MenuListProps = {
  variant: "menu",
};

const MyProjects = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const userData = useAppSelector(GET_USER_DATA);
  const { companyList } = useAppSelector(COMPANY_LIST);
  const { data: companyData } = companyList;

  // React states
  // Company dropdown
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState<
    LabelValueOptionType | LabelValueOptionType[]
  >({ label: "", value: 0 });
  // Filter tabing
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

  const [statusTabs, setStatusTabs] = useState("Applied");

  //set filters list array
  useSingleEffect(() => {
    const filterArr = [
      FILTERS.APPLIED,
      FILTERS.IN_PROGRESS,
      FILTERS.IN_REVIEW,
      FILTERS.REJECTED,
      FILTERS.DONE,
    ];
    setFilterArr(filterArr);
    if (userData.data?.user?.role === ROLES.CREATOR) {
      dispatch(
        GET_COMPANY_LIST(
          {
            page: 1,
            rowsPerPage: 10,
          },
          `${API_URL.COMPANY.CREATOR_COMPANY_LIST}`
        )
      );
    }
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

  const handleCompanyChange = (
    event: React.SyntheticEvent,
    value: LabelValueOptionType | LabelValueOptionType[]
  ) => {
    event.preventDefault();
    setSelectedOption(value);
  };

  //To store memorized value of filtered(searched) data array, this helps when other then dependencies, state of this component changes will not filter again.
  const filteredData = useMemo(
    () =>
      companyData?.results?.map((e) => {
        return { value: e.company, label: e?.["company__name"] };
      }) || [],
    [companyList]
  );

  return (
    <div className="page-container">
      <h2 className="page-title">My Projects</h2>
      {companyList?.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="page-card card">
            {userData.data?.user?.role === ROLES.CREATOR && (
              <>
                <div className="mb-2">
                  <Title title="Company" />
                </div>
                <FormControl sx={{ minWidth: "300px" }} size="small">
                  <MuiAutoCompleteComponent
                    name="creatorCompany_list"
                    placeholder="Select Company"
                    options={filteredData}
                    selectedOption={selectedOption}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    handleChange={handleCompanyChange}
                    // multiple={true}
                  />
                </FormControl>
              </>
            )}

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
                {/* <button
                  name="Applied"
                  onClick={({ target }) => {
                    console.log(target['name'], 'target');
                    // setStatusTabs(name) 
                  }}
                // className={`btn btn-outline filter-btn ${filter === filterData.status ? "active" : ""
                //   }`}
                >
                  Applied
                </button> */}
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
                  MenuListProps={MenuProps}
                  anchorEl={anchorEle}
                  keepMounted
                  open={openSortingMenu}
                  onClose={() => setAnchorEle(null)}
                >
                  {menuOptions.map((option) => (
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

export default MyProjects;
