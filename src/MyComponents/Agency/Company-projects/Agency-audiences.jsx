import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Custom_MUI_Table from "./Custom-MUI-Table";
import {
  agencyAudiencesListAction,
  agencyCompanyProjectsFilterListAction,
} from "../../../redux/actions/Agency-companies-tabs-actions";
import SearchInput from "../../Common/searchInput/SearchInput";
import CommunityMuiAutoComplete from "./CommunityMuiAutoComplete";

export default function Agency_audiences() {
  const dispatch = useDispatch();

  // Redux states
  const { loading: loadingAgencyAudiencesData, agencyAudiencesData } =
    useSelector((state) => state.AgencyAudiencesReducer);
  const { loading: loadingCompanyProjectsFiltersList, agencyCompanyProjectsFiltersList } = useSelector(
    (state) => state.AgencyCompanyProjectsFiltersReducer
  );

  // React states
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  }); // pagination params state
  const [filterData, setFilterData] = useState({
    community: "",
    search: "",
  }); // filter params state
  const [selectedOption, setSelectedOption] = useState({
    label: "",
    value: "",
  }); // Community dropdown state for 'Add Community Settings' modal
  const [searchText, setSearchText] = useState(""); // community autocomplete searching data

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

  // Row-Columns data
  const data = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Audience Name
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "audienceName",
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
            audienceTitle: item?.name ?? "",
            audienceId: item?.audience_id ?? "",
            optIn: item?.row_count ?? "",
            optOut: item?.opted_out ?? "",
          };
        })
        : [],
  };

  useEffect(() => {
    if (selectedOption.value) {
      setFilterData({ ...filterData, community: selectedOption?.value })
    }
  }, [selectedOption])

  return (
    <>
      <div className="page-container p-[20px]">
        <h1 className="page-title">Audiences</h1>

        <div className="page-card new-card p-0">
          <div className="flex flex-wrap p-[15px] pb-[20px]">

            <div className="w-[335px]">
              <CommunityMuiAutoComplete
                loader={loadingCompanyProjectsFiltersList}
                communityOptions={agencyCompanyProjectsFiltersList?.community
                  ? agencyCompanyProjectsFiltersList
                  : []}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
                setSearchText={setSearchText}
                searchText={searchText}
              />
            </div>

            <div className="ml-auto">
              <SearchInput
                searchVal={filterData.search}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>

          <Custom_MUI_Table
            loader={loadingAgencyAudiencesData}
            data={data}
            allData={agencyAudiencesData || []}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        </div>
      </div>
    </>
  );
}
