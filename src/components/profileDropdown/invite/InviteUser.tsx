/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import swal from "sweetalert";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSingleEffect, useUpdateEffect } from "react-haiku";

//import redux
import { useAppSelector } from "redux/store";
import { useAppDispatch } from "redux/store";
import {
  DELETE_INVITE_USER,
  GET_INVITE_USERS,
  POST_INVITE_USER,
  PUT_INVITE_USER,
} from "redux/actions/inviteUser/inviteUser.actions";
import { INVITE_USER_LIST } from "redux/reducers/inviteUser/inviteUser.slice";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";
import { GET_COMPANY_LIST } from "redux/actions/companyTab/companyTab.actions";

//import components
import SearchBar from "components/common/searchBar/SearchBar";
import MuiCustomTable from "components/common/muiTable/MuiTable";
import ActionMenuButton from "components/common/actionMenuButton/ActionMenuButton";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import MuiPopup from "components/common/muiPopup/MuiPopup";

//import assets
import SortArrowIcon from "../../../assets/images/sort_arrows.png";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import HomeIcon from "@mui/icons-material/Home";

// import helpers
import { validateEmail } from "helper/validations";
import {
  TablePaginationType,
  TableRowColType,
} from "helper/types/muiTable/muiTable";
import { Images } from "helper/images";

const InviteUser = () => {
  const dispatch = useAppDispatch();

  const { inviteUserList } = useAppSelector(INVITE_USER_LIST);
  const { companyList } = useAppSelector(COMPANY_LIST);

  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openCompanyDropdown, setOpenCompanyDropdown] = useState(false);
  const [openLevelDropdown, setOpenLevelDropdown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<{
    email: string;
    company: "" | number;
    level: "" | 1 | 2 | 3 | 4;
  }>({
    email: "",
    company: "",
    level: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    company: null,
    level: null,
  });
  const [paginationData, setPaginationData] = useState<TablePaginationType>({
    page: 1,
    rowsPerPage: 10,
    search: "",
  });

  //fetch inital invite users and companies data list
  useSingleEffect(() => {
    dispatch(GET_COMPANY_LIST(paginationData));
    dispatch(GET_INVITE_USERS(paginationData));
  });

  useUpdateEffect(() => {
    dispatch(GET_INVITE_USERS(paginationData));
  }, [paginationData]);

  //get user level
  const getUserLevel = (level) => {
    if (level === 1) {
      return "Admin";
    }
    if (level === 2) {
      return "Marketer";
    }
    if (level === 3) {
      return "Approver";
    }
    if (level === 4) {
      return "In-house Designer";
    }
    return "";
  };

  //set the edit mode
  const handleEdit = (item) => {
    setOpenModal(true);
    setIsEditMode(true);
    setErrors({ ...errors, level: null });
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    setFormData({ ...formData, level: item?.level });
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {
      email: null,
      company: null,
      level: !formData?.level ? "Please select a level" : null,
    };
    if (!isEditMode) {
      tempErrors = {
        email: validateEmail(formData?.email),
        company: !formData?.company ? "Please select a company" : null,
        level: !formData?.level ? "Please select a level" : null,
      };
    }
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value)?.length) {
      return;
    }
    handleFormSubmit();
  };

  //handle form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  //handle add and edit form submit
  const handleFormSubmit = () => {
    if (isEditMode) {
      dispatch(
        PUT_INVITE_USER(selectedItem.currentId, { levels: formData?.level })
      );
    } else {
      dispatch(
        POST_INVITE_USER({
          email: formData?.email,
          company: formData?.company,
          levels: formData?.level,
        })
      );
    }
    setAnchorEl(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
    setOpenModal(false);
    setIsEditMode(false);
    setFormData({ ...formData, email: "" });
  };

  //handle delete action
  const handleDelete = (item) => {
    swal({
      title: "",
      text: "Are you sure you want to remove this user?",
      className: "errorAlert",
      icon: Images.Logo,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DELETE_INVITE_USER(item?.id));
      }
    });
    setAnchorEl(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
  };

  const data: TableRowColType = {
    columns: [
      {
        id: 1,
        label: (
          <label className="tableHead">
            Name
            <img src={SortArrowIcon} alt="Title" />
          </label>
        ),
        field: "name",
        sort: "asc",
        width: 180,
      },
      {
        id: 2,
        label: (
          <label className="tableHead">
            Email
            <img src={SortArrowIcon} alt="Title" />
          </label>
        ),
        field: "email",
        sort: "asc",
        width: 180,
      },
      {
        id: 3,
        label: (
          <label className="tableHead">
            Company
            <img src={SortArrowIcon} alt="Title" />
          </label>
        ),
        field: "company",
        sort: "asc",
        width: 160,
      },
      {
        id: 4,
        label: (
          <label className="tableHead">
            Level
            <img src={SortArrowIcon} alt="Title" />
          </label>
        ),
        field: "level",
        sort: "asc",
        width: 160,
      },
      {
        id: 6,
        label: "Status",
        field: "status",
        sort: "asc",
        width: 160,
      },
      {
        id: 6,
        label: "Action",
        field: "action",
        sort: "asc",
        width: 160,
      },
    ],

    rows:
      inviteUserList?.data?.results?.length > 0
        ? inviteUserList?.data?.results?.map((item, index) => {
            return {
              name: (
                <Typography
                  sx={{
                    "&.MuiTypography-root": {
                      display: "inline-block",
                      fontSize: "14px",
                      fontWeight: 400,
                      p: 0,
                      fontFamily: '"Figtree", sans-serif',
                    },
                  }}
                >
                  {item?.user_email ? item?.user_name : "N/A"}
                </Typography>
              ),
              email: item?.user_email ? item.user_email : item.email,
              company: item?.company_name,
              level: getUserLevel(item?.level),
              status: (
                <Button
                  variant="contained"
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  sx={{
                    width: "80px",
                    background:
                      item?.status !== 1
                        ? "rgba(250, 45, 32, 0.08)"
                        : "rgba(32, 161, 68, 0.08)",
                    color:
                      item?.status !== 1 ? "rgba(250, 45, 32, 1)" : "#20A144",
                    fontSize: "12px",
                    textTransform: "none",
                    pointerEvents: "none",
                  }}
                >
                  {item?.status !== 1 ? "Inactive" : "Active"}
                </Button>
              ),
              action: (
                <ActionMenuButton
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  setAnchorEl={setAnchorEl}
                  anchorEl={anchorEl}
                  handleEdit={() => handleEdit(item)}
                  handleDelete={() => handleDelete(item)}
                  showDelete={true}
                  showEdit={true}
                  isEditMode={isEditMode}
                  item={{ id: item?.id, isActive: item?.is_active }}
                />
              ),
            };
          })
        : [],
  };

  return (
    <div className="page-container">
      <div className="flex-between">
        <h1>Invite User</h1>
        <div className="flex-between gap-[10px] font-sm leading-4 font-medium text-primary">
          <Link to="/">
            <HomeIcon color="disabled" />
          </Link>
          <span className="text-disable opacity-20">|</span>
          <Link to="/invite">Invite User</Link>
        </div>
      </div>

      <div className="page-card">
        <div className="flex-between flex flex-wrap p-[15px] pb-5">
          <SearchBar
            setPaginationData={setPaginationData}
            paginationData={paginationData}
          />
          <button
            type="submit"
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-3 px-4 btn btn-primary"
          >
            <PersonAddAltIcon />
            <span className="btn-label">Invite User</span>
          </button>
        </div>
        {inviteUserList?.loading ? (
          <LoadingSpinner positionClass="left-[calc(40%_-_50px)] top-[calc(40%_-_50px)" />
        ) : (
          <>
            <MuiCustomTable
              loader={inviteUserList?.loading}
              data={data}
              allData={inviteUserList?.data}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
            />
            <MuiPopup
              dialogTitle={isEditMode ? "Edit Invite User" : "Invite User"}
              textAlign="left"
              dialogContent={
                <>
                  {!isEditMode && (
                    <>
                      <div
                        className={
                          errors.email
                            ? "input-fields-wrapper error-style"
                            : "input-fields-wrapper"
                        }
                      >
                        <h4>Email Address</h4>
                        <div className="styled-select">
                          <input
                            className={
                              errors.email
                                ? "input-style input-err-style"
                                : "input-style"
                            }
                            type="email"
                            placeholder="Enter Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <span className="err-tag">{errors.email ?? ""}</span>
                        </div>
                      </div>

                      <div
                        className={
                          errors.company
                            ? "input-fields-wrapper error-style"
                            : "input-fields-wrapper"
                        }
                      >
                        <h4>Company</h4>
                        <div className="styled-select">
                          <Select
                            name="company"
                            open={openCompanyDropdown}
                            onOpen={() => {
                              setOpenCompanyDropdown(true);
                            }}
                            onClose={() => {
                              setOpenCompanyDropdown(false);
                            }}
                            MenuProps={{
                              variant: "menu",
                              disableScrollLock: true,
                            }}
                            value={formData.company}
                            onChange={handleInputChange}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="">Select Company</MenuItem>
                            {companyList?.data.results?.map((item) =>
                              item.is_active ? (
                                <MenuItem key={item?.id} value={item?.id}>
                                  {item?.name}
                                </MenuItem>
                              ) : null
                            )}
                          </Select>
                          <span className="err-tag">
                            {errors.company ?? ""}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  <div
                    className={
                      errors.level
                        ? "input-fields-wrapper error-style"
                        : "input-fields-wrapper"
                    }
                  >
                    <h4>Level</h4>
                    <div className="styled-select">
                      <Select
                        name="level"
                        open={openLevelDropdown}
                        onOpen={() => {
                          setOpenLevelDropdown(true);
                        }}
                        onClose={() => {
                          setOpenLevelDropdown(false);
                        }}
                        MenuProps={{
                          variant: "menu",
                          disableScrollLock: true,
                        }}
                        value={formData.level}
                        onChange={handleInputChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value=""> Select Level </MenuItem>
                        <MenuItem value={1}>Admin Level</MenuItem>
                        <MenuItem value={2}>Marketer Level</MenuItem>
                        <MenuItem value={3}>Approver Level</MenuItem>
                        <MenuItem value={4}>In-house Designer</MenuItem>
                      </Select>
                      <span className="err-tag">{errors.level ?? ""}</span>
                    </div>
                  </div>
                </>
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
              mainActionHandler={validateSubmit}
              mainActionTitle={isEditMode ? "Save" : "Invite"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InviteUser;
