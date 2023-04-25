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
import CustomPopup from "common/CustomPopup";

//import MUI components and icons
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

//import helper files
import {
  TableRowColType,
  TablePaginationType,
} from "helper/types/muiTable/muiTable";
import { Images } from "helper/images";
import { formateISODateToLocaleString } from "helper/utility/customFunctions";

//import redux
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  DELETE_SINGLE_COMPANY,
  GET_COMPANY_LIST,
  POST_ADMIN_COMPANY,
  POST_SINGLE_COMPANY,
  PUT_SINGLE_COMPANY,
} from "redux/actions/companyTab/companyTab.actions";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { API_URL } from "helper/env";
import { singleCompanyPayloadData } from "helper/types/companyTab/comapniesType";
import { WORKFLOW_LIST } from "redux/reducers/workFlow/workFlow.slice";
import {
  DELETE_SINGLE_WORKFLOW,
  GET_WORKFLOW_LIST,
  POST_SINGLE_WORKFLOW,
  PUT_SINGLE_WORKFLOW,
} from "redux/actions/workFlow/workFlow.actions";
import { WORKFLOW_ROUTE } from "routes/baseRoute";
import LoadingSpinner from "components/common/loadingSpinner/Loader";

const ROLES = {
  ADMIN: 0,
  CREATOR: 1,
  AGENCY: 2,
  MEMBER: 3,
};

const userData = () => JSON.parse(localStorage.getItem("userData") ?? "");

const WorkFlowList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redux states
  //   const { companyList } = useAppSelector(COMPANY_LIST);
  const { workFlowList } = useAppSelector(WORKFLOW_LIST);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  // React states
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState<{
    currentTooltip: null | number;
    currentId: null | number;
  }>({
    currentTooltip: null,
    currentId: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSettingMode, setIsSettingMode] = useState(false);
  const [companyStatus, setCompanyStatus] = useState(false);

  const [formData, setFormData] = useState<{
    company: string;
    description: string;
    isActive: boolean;
  }>({
    company: "",
    description: "",
    isActive: false,
  });
  const [errors, setErrors] = useState({
    company: "",
    description: "",
  });
  const [paginationData, setPaginationData] = useState<TablePaginationType>({
    page: 1,
    rowsPerPage: 10,
    search: "",
  });

  //fetch initial companies data list
  useSingleEffect(() => {
    if (userProfile?.data?.role === ROLES.ADMIN) {
      dispatch(GET_WORKFLOW_LIST(paginationData, `${API_URL.WORKFLOW.ADMIN}`));
    } else {
      dispatch(GET_WORKFLOW_LIST(paginationData));
    }
  });

  //fetch workflow list when pagination change
  useUpdateEffect(() => {
    if (userProfile?.data?.role === ROLES.ADMIN) {
      dispatch(GET_WORKFLOW_LIST(paginationData, `${API_URL.WORKFLOW.ADMIN}`));
    } else {
      dispatch(
        GET_WORKFLOW_LIST(paginationData, `${API_URL.WORKFLOW.WORKFLOW_LIST}`)
      );
    }
  }, [paginationData, userProfile.data?.role]);

  //handle edit action
  const handleEdit = (item) => {
    // setOpenModal(true);
    // setIsEditMode(true);
    // setErrors({ company: "", description: "" });
    // setSelectedItem({ ...selectedItem, currentId: item?.id });
    // setFormData({
    //   company: item?.name,
    //   description: item?.description,
    //   isActive: item?.is_active,
    // });
    navigate(`${item?.id}`);
  };

  //handle settings action
  const handleSetting = (item) => {
    setOpenModal(true);
    setIsSettingMode(true);
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    setCompanyStatus(item?.is_blocked);
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      company: !formData.company ? "Please enter Tag Name" : "",
      description: !formData.description ? "Please enter Description" : "",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value)?.length) {
      return;
    }
    handleFormSubmit();
  };

  //handle form submit
  const handleFormSubmit = () => {
    if (!isSettingMode) {
      const payload: singleCompanyPayloadData = {
        name: formData?.company,
        description: formData?.description,
        is_active: formData?.isActive,
      };
      if (isEditMode) {
        // Handle edit option action
        userProfile?.data?.role === ROLES.ADMIN
          ? dispatch(
              PUT_SINGLE_WORKFLOW(
                selectedItem.currentId,
                payload,
                `${API_URL.WORKFLOW.ADMIN}`
              )
            )
          : dispatch(PUT_SINGLE_WORKFLOW(selectedItem.currentId, payload));
      } else {
        // Handle Add new company action
        payload.agency = userData()?.user.user_id;
        userProfile?.data?.role === ROLES.ADMIN
          ? dispatch(POST_SINGLE_WORKFLOW(payload, `${API_URL.WORKFLOW.ADMIN}`))
          : dispatch(POST_SINGLE_WORKFLOW(payload));
      }
    } else {
      // Handle Setting option action for admin
      dispatch(
        POST_ADMIN_COMPANY(
          {
            company_id: selectedItem.currentId,
            status: companyStatus,
          },
          `${API_URL.COMPANY.ADMIN_COMPANY_BLOCK}`
        )
      );
    }

    // reset relevant states
    setAnchorEl(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
    setOpenModal(false);
    setIsEditMode(false);
    setFormData({
      company: "",
      description: "",
      isActive: false,
    });
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
        Confirm: true,
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
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
                handleEdit={() => handleEdit(item)}
                handleSetting={() => handleSetting(item)}
                handleDelete={() => handleDelete(item)}
                showSetting={userProfile?.data?.role === ROLES.ADMIN}
                showEdit={true}
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
      {workFlowList?.loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="page-container">
          <div className="flex-between">
            <h1>Workflow List</h1>
            <div className="flex-between gap-[10px] font-sm leading-4 font-medium text-primary">
              <Link to="/">
                <HomeIcon color="disabled" />
              </Link>
              <span className="text-disable opacity-20">|</span>
              <Link to="/company">Company</Link>
            </div>
          </div>
          <div className="page-card">
            <div className="flex-between flex-wrap p-[15px] pb-5">
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
      )}
    </>
  );
};

export default WorkFlowList;
