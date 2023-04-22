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
import LoadingSpinner from "components/common/loadingSpinner/Loader";

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
import { API_URL } from "helper/env";
import { singleCompanyPayloadData } from "helper/types/companyTab/comapniesType";

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

const ROLES = {
  ADMIN: 0,
  CREATOR: 1,
  AGENCY: 2,
  MEMBER: 3,
};

const userData = () => JSON.parse(localStorage.getItem("userData") ?? "");

const AgencyCompanyList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redux states
  const { companyList } = useAppSelector(COMPANY_LIST);
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
    company: null,
    description: null,
  });
  const [paginationData, setPaginationData] = useState<TablePaginationType>({
    page: 1,
    rowsPerPage: 10,
    search: "",
  });

  //fetch initial companies data list
  useSingleEffect(() => {
    if (userProfile?.data?.role === ROLES.ADMIN) {
      dispatch(GET_COMPANY_LIST(paginationData, `${API_URL.COMPANY.ADMIN}`));
    } else {
      dispatch(GET_COMPANY_LIST(paginationData));
    }
  });

  //fetch company list when pagination change
  useUpdateEffect(() => {
    if (userProfile?.data?.role === ROLES.ADMIN) {
      dispatch(GET_COMPANY_LIST(paginationData, `${API_URL.COMPANY.ADMIN}`));
    } else {
      dispatch(
        GET_COMPANY_LIST(paginationData, `${API_URL.COMPANY.COMPANY_LIST}`)
      );
    }
  }, [paginationData, userProfile.data?.role]);

  //handle form data
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: name === "isActive" ? checked : value });
    setErrors({ ...errors, [name]: null });
  };

  //handle edit action
  const handleEdit = (item) => {
    setOpenModal(true);
    setIsEditMode(true);
    setErrors({ company: null, description: null });
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    setFormData({
      company: item?.name,
      description: item?.description,
      isActive: item?.is_active,
    });
  };

  //handle settings action
  const handleSetting = (item) => {
    setOpenModal(true);
    setIsSettingMode(true);
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    setCompanyStatus(item?.is_blocked);
  };

  //handle view action
  const handleView = (item) => {
    if (userProfile?.data?.role === ROLES.ADMIN) {
      navigate(item.agency ? `/company/${item.id}/${item.agency}` : "#");
    } else {
      navigate(`/company/${item.id}`);
    }
    setAnchorEl(null);
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      company: !formData.company ? "Please enter Tag Name" : null,
      description: !formData.description ? "Please enter Description" : null,
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
              PUT_SINGLE_COMPANY(
                selectedItem.currentId,
                payload,
                `${API_URL.COMPANY.ADMIN}`
              )
            )
          : dispatch(PUT_SINGLE_COMPANY(selectedItem.currentId, payload));
      } else {
        // Handle Add new company action
        payload.agency = userData()?.user.user_id;
        userProfile?.data?.role === ROLES.ADMIN
          ? dispatch(POST_SINGLE_COMPANY(payload, `${API_URL.COMPANY.ADMIN}`))
          : dispatch(POST_SINGLE_COMPANY(payload));
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

  //handle inactive action
  const handleInactive = () => {
    swal({
      title: "",
      text: "Are you sure you want to inActive this company?",
      className: "errorAlert",
      icon: Images.Logo,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (userProfile?.data?.role === ROLES.ADMIN) {
          //admin
          dispatch(
            DELETE_SINGLE_COMPANY(
              selectedItem.currentId,
              `${API_URL.COMPANY.ADMIN}`
            )
          );
        } else {
          dispatch(DELETE_SINGLE_COMPANY(selectedItem.currentId)); //agency user
        }
      }
    });
    setAnchorEl(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
  };

  //handle active action
  const handleActive = () => {
    swal({
      title: "",
      text: "Are you sure you want to active this company?",
      className: "errorAlert",
      icon: Images.Logo,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (userProfile?.data?.role === ROLES.ADMIN) {
          dispatch(
            PUT_SINGLE_COMPANY(
              selectedItem.currentId,
              {
                is_active: true,
              },
              `${API_URL.COMPANY.ADMIN}`
            )
          );
        } else {
          dispatch(
            PUT_SINGLE_COMPANY(selectedItem.currentId, {
              is_active: true,
            })
          );
        }
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
  ];

  let rows: {
    title: JSX.Element;
    agency?: JSX.Element;
    createdAt: string;
    status: JSX.Element;
    action: JSX.Element;
  }[] =
    companyList?.data?.results?.length > 0
      ? companyList?.data.results?.map((item, index) => {
          return {
            title: (
              <div key={index}>
                <Typography
                  sx={{
                    "&.MuiTypography-root": {
                      display: "inline-block",
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
                    item?.is_active && !item.is_blocked
                      ? "rgba(32, 161, 68, 0.08)"
                      : "rgba(250, 45, 32, 0.08)",
                  color:
                    item?.is_active && !item.is_blocked
                      ? "#20A144"
                      : "rgba(250, 45, 32, 1)",
                  fontSize: "12px",
                  textTransform: "none",
                  pointerEvents: "none",
                }}
              >
                {item.is_blocked
                  ? "Blocked"
                  : item?.is_active
                  ? "Active"
                  : "Inactive"}
              </Button>
            ),
            action: (
              <ActionMenuButton
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                handleEdit={() => handleEdit(item)}
                handleView={() => handleView(item)}
                handleSetting={() => handleSetting(item)}
                handleInactive={handleInactive}
                handleActive={handleActive}
                showSetting={userProfile?.data?.role === ROLES.ADMIN}
                showView={true}
                showEdit={true}
                showInActive={true}
                isEditMode={isEditMode}
                item={{ id: item?.id, isActive: item?.is_active }}
              />
            ),
          };
        })
      : [];

  //Modify table data for the admin user
  if (userProfile?.data?.role === ROLES.ADMIN) {
    const newCol = {
      id: 2,
      label: (
        <label className="flex items-center">
          Agency
          <img className="ml-2" src={Images.SortArrows} alt="Title" />
        </label>
      ),
      field: "agency",
      sort: "asc",
      width: 180,
    };
    columns.splice(1, 0, newCol);
    columns = columns.map((item, index) => ({ ...item, id: index + 1 }));
    rows = rows.map((item, index) => ({
      title: item?.title,
      agency: (
        <Typography
          sx={{
            "&.MuiTypography-root": {
              display: "inline-block",
              fontFamily: '"Figtree", sans-serif',
              fontSize: "14px",
              fontWeight: 400,
              p: 0,
            },
          }}
        >
          {companyList?.data.results[index]?.agency_name
            ? companyList?.data.results[index]?.agency_name
            : "N/A"}
        </Typography>
      ),
      createdAt: item?.createdAt,
      status: item?.status,
      action: item?.action,
    }));
  }

  //final table data
  const data: TableRowColType = {
    columns,
    rows,
  };

  return (
    <div className="page-container">
      <div className="flex-between">
        <h1>Company</h1>
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
          <button
            type="submit"
            onClick={() => setOpenModal(true)}
            className="btn btn-primary btn-label bg-primary flex items-center px-[15px] py-[9px] max-w-[155px] w-full flex-center gap-2"
          >
            <AddIcon />
            <span className="btn-label">Add Company</span>
          </button>
        </div>
        {companyList?.loading ? (
          <LoadingSpinner positionClass="left-[calc(40%_-_50px)] top-[calc(40%_-_50px)" />
        ) : (
          <>
            <MuiCustomTable
              loader={companyList?.loading}
              data={data}
              allData={companyList?.data}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
            />
            <CustomPopup
              dialogTitle={
                isEditMode
                  ? "Edit Company"
                  : isSettingMode
                  ? "Change Setting"
                  : "Add Company"
              }
              textAlign="left"
              dialogContent={
                <div className="mt-5">
                  {isSettingMode ? (
                    <div>
                      <h4>Company Status</h4>
                      <div className="styled-select">
                        <Select
                          name="companyStatus"
                          MenuProps={{
                            variant: "menu",
                            disableScrollLock: true,
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={companyStatus ? 1 : 0}
                          onChange={(e) =>
                            setCompanyStatus(Boolean(e.target.value))
                          }
                        >
                          <MenuItem value={0}>Unblock</MenuItem>
                          <MenuItem value={1}> Block</MenuItem>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={
                          errors.company
                            ? "input-fields-wrapper error-style"
                            : "input-fields-wrapper"
                        }
                      >
                        <h4>Company</h4>
                        <div className="styled-select">
                          <input
                            className={
                              errors.company
                                ? "input-style input-err-style"
                                : "input-style"
                            }
                            type="text"
                            placeholder="Enter Company Name"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                          />
                          <span className="err-tag">
                            {errors.company ?? ""}
                          </span>
                        </div>
                      </div>
                      <div
                        className={
                          errors.description
                            ? "input-fields-wrapper error-style"
                            : "input-fields-wrapper"
                        }
                      >
                        <h4>Description</h4>
                        <div className="styled-select">
                          <textarea
                            name="description"
                            className={
                              errors.description
                                ? "input-style input-err-style"
                                : "input-style"
                            }
                            placeholder="Enter Company Description"
                            maxLength={2000}
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                          />
                          <span className="err-tag">
                            {errors.description ?? ""}
                          </span>
                        </div>
                      </div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.isActive}
                            onChange={handleInputChange}
                            name="isActive"
                          />
                        }
                        label="Active"
                      />
                    </>
                  )}
                </div>
              }
              openPopup={openModal}
              closePopup={() => {
                if (isEditMode) {
                  setOpenModal(false);
                  setIsEditMode(false);
                } else {
                  setOpenModal(false);
                }
              }}
              mainActionHandler={
                isSettingMode ? handleFormSubmit : validateSubmit
              }
              mainActionTitle={"Save"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AgencyCompanyList;
