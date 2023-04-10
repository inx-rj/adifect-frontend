/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSingleEffect, useUpdateEffect } from "react-haiku";

//import custom component
import MuiCustomTable from "components/common/muiCustomTable/MuiCustomTable";
import SearchBar from "common/MuiCustomTable/CustomSearchBar";

//import MUI components and icons
import { Button, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

//import helper files
import { TableRowColType } from "helper/types/muiCustomTable/muiCustomTable";
import { Images } from "helper/images";
import { formateISODateToLocaleString } from "helper/utility/customFunctions";

//import redux
import { useAppDispatch, useAppSelector } from "redux/store";
import { GET_COMPANY_LIST } from "redux/actions/companyTab/companyTab.actions";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";
import CustomActionComponent from "common/CustomActionComponent";

const AgencyCompanyList = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const { companyList } = useAppSelector(COMPANY_LIST);

  // React states
  const [showTagModal, setShowTagModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  });

  //fetch inital companies data list
  useSingleEffect(() => {
    dispatch(GET_COMPANY_LIST(paginationData));
  });

  //fetch company list when pagination change
  useUpdateEffect(() => {
    dispatch(GET_COMPANY_LIST(paginationData));
  }, [paginationData]);


  //handle delete action
  const handleDelete = () => {
    console.log("handleDelete")
    setAnchorEl(null)
  }

  //handle edit action
  const handleEdit = () => {
    console.log("handleEdit")
    setAnchorEl(null)
  }

  //handle view action
  const handleView = () => {
    console.log("handleView")
    setAnchorEl(null)
  }

  //handle inactive action
  const handleInactive = () => {
    console.log("handleInactive")
    setAnchorEl(null)
  }

  const data: TableRowColType = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Title
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "title",
        sort: "asc",
        width: 180,
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            Created At
            <img className="ml-2" src={Images.SortArrows} alt="title" />
          </label>
        ),
        field: "createdAt",
        sort: "asc",
        width: 180,
      },
      {
        id: 3,
        label: "Status",
        field: "status",
        sort: "asc",
        width: 160,
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
      companyList?.data?.results?.length > 0
        ? companyList?.data.results?.map((item, index) => {
          return {
            title: (
              <div key={index}>
                <Link to={`${item.id}`}>
                  <Typography
                    sx={{
                      "&.MuiTypography-root": {
                        display: "inline-block",
                        cursor: "pointer",
                        color: "rgba(39, 90, 208, 1)",
                        fontFamily: '"Figtree", sans-serif',
                        fontSize: "14px",
                        fontWeight: 400,
                        p: 0,
                      },
                    }}
                  >
                    {item?.name}
                  </Typography>
                </Link>
              </div>
            ),
            createdAt: formateISODateToLocaleString(item?.created ?? ""),
            status: (
              <Button
                variant="contained"
                disableRipple
                disableFocusRipple
                disableElevation
                sx={{
                  width: "80px",
                  background:
                    item?.is_active
                      ? "rgba(32, 161, 68, 0.08)"
                      : "rgba(250, 45, 32, 0.08)",
                  color:
                    item?.is_active
                      ? "#20A144"
                      : "rgba(250, 45, 32, 1)",
                  fontSize: "12px",
                  textTransform: "none",
                  pointerEvents: "none",
                }
                }
              >
                {item?.is_active ? "Active" : "Inactive"}
              </Button >
            ),
            action: (
              <CustomActionComponent open={open} setAnchorEl={setAnchorEl} anchorEl={anchorEl} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} handleInactive={handleInactive} showView={true} showEdit={true} showInActive={true} />
            ),
          };
        }) :
        [],
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center">
        <h1>Company</h1>
        <div className="flex justify-between items-center gap-[10px] font-sm leading-4 font-medium text-primary">
          <Link to="/"><HomeIcon color="disabled" /></Link>
          <span className="text-disable opacity-20">|</span>
          <Link to="/agency/company">Company</Link>
        </div>
      </div>
      <div className="page-card">
        <div className="flex justify-between items-center flex-wrap p-[15px] pb-5">
          <SearchBar onChange={setSearchText} />
          <button
            type="submit"
            onClick={() => setShowTagModal(true)}
            className="btn btn-primary btn-label bg-primary flex items-center px-[15px] py-[9px] max-w-[155px] w-full flex-center gap-2"
          >
            <AddIcon />
            <span className="btn-label">Add Company</span>
          </button>
        </div>
        {companyList?.loading ? (
          <h1>Loading...</h1>
        ) : (

          <MuiCustomTable
            loader={companyList?.loading}
            data={data}
            allData={companyList?.data}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        )}
      </div >
    </div>
  );
}

export default AgencyCompanyList;