import React from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import swal from "sweetalert";

//import custom component
import MuiCustomTable from "components/common/muiTable/MuiTable";
import SearchBar from "components/common/searchBar/SearchBar";
import ActionMenuButton from "components/common/actionMenuButton/ActionMenuButton";

//import MUI components and icons
import { Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

//import helper files
import {
  TableRowColType,
  TablePaginationType,
} from "helper/types/muiTable/muiTable";
import { Images } from "helper/images";

//import redux
import { useAppDispatch, useAppSelector } from "redux/store";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { API_URL } from "helper/env";
import { WORKFLOW_LIST } from "redux/reducers/workFlow/workFlow.slice";
import {
  DELETE_SINGLE_WORKFLOW,
  GET_WORKFLOW_LIST,
} from "redux/actions/workFlow/workFlow.actions";
import { WORKFLOW_ROUTE } from "routes/baseRoute";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import Title from "components/common/pageTitle/Title";
import { Roles } from "helper/config";

const userData = () => JSON.parse(localStorage.getItem("userData") ?? "");

interface workFlowListProps {
  headerTitle?: boolean;
  companyInfoPage?: boolean;
}

const WorkFlowList = (props: workFlowListProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { headerTitle, companyInfoPage } = props;

  // Redux states
  //   const { companyList } = useAppSelector(COMPANY_LIST);
  const { workFlowList } = useAppSelector(WORKFLOW_LIST);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  // React states
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState<{
    currentTooltip: null | number;
    currentId: null | number;
  }>({
    currentTooltip: null,
    currentId: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const [paginationData, setPaginationData] = useState<TablePaginationType>({
    page: 1,
    rowsPerPage: 10,
    search: "",
  });

  //fetch initial companies data list
  useSingleEffect(() => {
    if (userProfile?.data?.role === Roles.ADMIN) {
      dispatch(GET_WORKFLOW_LIST(paginationData, `${API_URL.WORKFLOW.ADMIN}`));
    } else {
      dispatch(GET_WORKFLOW_LIST(paginationData));
    }
  });

  //fetch workflow list when pagination change
  useUpdateEffect(() => {
    if (userProfile?.data?.role === Roles.ADMIN) {
      dispatch(GET_WORKFLOW_LIST(paginationData, `${API_URL.WORKFLOW.ADMIN}`));
    } else {
      dispatch(
        GET_WORKFLOW_LIST(paginationData, `${API_URL.WORKFLOW.WORKFLOW_LIST}`)
      );
    }
  }, [paginationData, userProfile.data?.role]);

  //handle edit action
  const handleEdit = (item) => {
    setIsEditMode(true);
    navigate(`${item?.id}`);
  };

  //handle delete action
  const handleDelete = (item) => {
    swal({
      title: "",
      text: "Are you sure you want to remove this workflow?",
      className: "errorAlert",
      icon: Images.Logo,
      buttons: {
        Cancel: true,
        OK: true,
      },
      dangerMode: true,
    }).then((willDelete) => {
      //Use the text used in swal button for condition
      if (willDelete !== "Cancel") {
        dispatch(DELETE_SINGLE_WORKFLOW(item?.id));
      }
    });
    setAnchorEl(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
  };

  //prepare table data
  let columns = [
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
      id: 1,
      label: (
        <label className="flex items-center">
          Company
          <img className="ml-2" src={Images.SortArrows} alt="Company" />
        </label>
      ),
      field: "company",
      sort: "asc",
      width: 180,
    },
    // {
    //   id: 2,
    //   label: (
    //     <label className="flex items-center">
    //       Created At
    //       <img className="ml-2" src={Images.SortArrows} alt="title" />
    //     </label>
    //   ),
    //   field: "createdAt",
    //   sort: "asc",
    //   width: 180,
    // },
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
  ];

  let rows: {
    title: JSX.Element;
    comapany?: JSX.Element;
    // createdAt: string;
    status: JSX.Element;
    action: JSX.Element;
  }[] =
    workFlowList?.data?.results?.length > 0
      ? workFlowList?.data.results?.map((item, index) => {
          return {
            title: (
              <div key={index}>
                <Typography
                  sx={{
                    "&.MuiTypography-root": {
                      display: "inline-block",
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
              </div>
            ),
            company: (
              <div key={index}>
                <Typography
                  sx={{
                    "&.MuiTypography-root": {
                      display: "inline-block",
                      color: "rgba(39, 90, 208, 1)",
                      fontFamily: '"Figtree", sans-serif',
                      fontSize: "14px",
                      fontWeight: 400,
                      p: 0,
                    },
                  }}
                >
                  {item?.company_name}
                </Typography>
              </div>
            ),
            // createdAt: formateISODateToLocaleString(item?.created ?? ""),
            status: (
              <Button
                variant="contained"
                disableRipple
                disableFocusRipple
                disableElevation
                sx={{
                  width: "80px",
                  background: item?.is_active
                    ? "rgba(32, 161, 68, 0.08)"
                    : "rgba(250, 45, 32, 0.08)",
                  color: item?.is_active ? "#20A144" : "rgba(250, 45, 32, 1)",
                  fontSize: "12px",
                  textTransform: "none",
                  pointerEvents: "none",
                }}
              >
                {item?.is_active ? "Active" : "Inactive"}
              </Button>
            ),
            action: (
              <ActionMenuButton
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                handleView={() => handleEdit(item)}
                handleEdit={() => handleEdit(item)}
                // handleSetting={() => handleSetting(item)}
                handleDelete={() => handleDelete(item)}
                // showSetting={userProfile?.data?.role === Roles.ADMIN}
                showEdit={!item.assigned_job ? true : false}
                showView={item.assigned_job ? true : false}
                showDelete={true}
                isEditMode={isEditMode}
                item={{ id: item?.id, isActive: item?.is_active }}
              />
            ),
          };
        })
      : [];

  //final table data
  const data: TableRowColType = {
    columns,
    rows,
  };

  return (
    <>
      <div
        className={
          companyInfoPage === true
            ? "card drop-shadow-none border z-[1] text-sm"
            : "page-container"
        }
      >
        {headerTitle !== false && (
          <div className="flex-between">
            <Title title="Workflow List" />
            <div className="flex-between gap-[10px] font-sm leading-4 font-medium text-primary">
              <Link to="/">
                <HomeIcon color="disabled" />
              </Link>
              <span className="text-disable opacity-20">|</span>
              <Link to={WORKFLOW_ROUTE.HOME}>Workflow</Link>
            </div>
          </div>
        )}
        <div
          className={`${
            companyInfoPage === true ? "page-card mt-0" : "page-card"
          }`}
        >
          <div
            className={`${
              companyInfoPage === true ? "" : "p-[15px] "
            } flex-between flex-wrap pb-5`}
          >
            <SearchBar
              setPaginationData={setPaginationData}
              paginationData={paginationData}
            />
            <Link to={`${WORKFLOW_ROUTE.HOME}/add`}>
              <button
                type="submit"
                // onClick={() => setOpenModal(true)}
                className="btn btn-primary btn-label bg-primary flex items-center px-[15px] py-[9px] max-w-[155px] w-full flex-center gap-2"
              >
                <AddIcon />
                <span className="btn-label">Add Workflow</span>
              </button>
            </Link>
          </div>
          {workFlowList?.loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <MuiCustomTable
                loader={workFlowList?.loading}
                data={data}
                allData={workFlowList?.data}
                paginationData={paginationData}
                setPaginationData={setPaginationData}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkFlowList;
