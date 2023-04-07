/* eslint-disable react-hooks/exhaustive-deps */
import swal from "sweetalert";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "redux/store";
import { useAppDispatch } from "redux/store";
import { DELETE_INVITE_USER, GET_COMPANIES_LIST, GET_INVITE_USERS, POST_INVITE_USER, PUT_INVITE_USER } from "redux/actions/inviteUser/inviteUser.actions";
import { COMPANIES_LIST, INVITE_USER_LIST } from "redux/reducers/inviteUser/inviteUser.slice";

import Custom_MUI_Table from "common/MuiCustomTable/Custom-MUI-Table";
import SearchBar from "common/MuiCustomTable/CustomSearchBar";
import CustomPopup from "common/CustomPopup";

import SortArrowIcon from "../../assets/images/sort_arrows.png"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HomeIcon from '@mui/icons-material/Home';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { validateEmail } from "helper/validations";


const InviteUser = () => {
  const dispatch = useAppDispatch();
  const modalRef = useRef(null);

  const { inviteUserData, loading: inviteUserLoading } = useAppSelector(INVITE_USER_LIST);
  const { companiesList } = useAppSelector(COMPANIES_LIST);

  const [searchText, setSearchText] = useState("");
  const [currentTooltip, setCurrentTooltip] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openCompanyDropdown, setOpenCompanyDropdown] = useState(false);
  const [openLevelDropdown, setOpenLevelDropdown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<{ email: string, company: "" | number, level: "" | 1 | 2 | 3 | 4 }>({
    email: "",
    company: "",
    level: ""
  });
  const [errors, setErrors] = useState({
    email: null,
    company: null,
    level: null
  });
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  });

  useEffect(() => {
    dispatch(GET_COMPANIES_LIST());
  }, [])

  useEffect(() => {
    dispatch(GET_INVITE_USERS(paginationData));
  }, [paginationData])


  // Add event listener to detect clicks outside the modall 
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

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
    return ""
  }

  //close modal if clicked outside for edit/delete tooltip
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setCurrentTooltip(null);
    }
  };

  //set the edit mode
  const handleEditEntry = (itemId, level) => {
    setCurrentTooltip(itemId);
    setIsEditMode(true)
    setOpenModal(true)
    setErrors({ ...errors, level: null })
    setFormData({ ...formData, level });
  }

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    let tempErrors = { email: null, company: null, level: !formData?.level ? "Please select a level" : null, }
    if (!isEditMode) {
      tempErrors = {
        email: validateEmail(formData?.email),
        company: !formData?.company ? "Please select a company" : null,
        level: !formData?.level ? "Please select a level" : null,
      };
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value)?.length) {
      return;
    }
    handleFormSubmit();
    setFormData({ ...formData, email: "" });
  }

  //handle form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  }

  //handle add and edit form submit
  const handleFormSubmit = () => {
    if (isEditMode) {
      dispatch(PUT_INVITE_USER(currentTooltip, { levels: formData?.level }));
      setCurrentTooltip(null);
    } else {
      dispatch(POST_INVITE_USER({
        email: formData?.email,
        company: formData?.company,
        levels: formData?.level,
      }));
    }
    setOpenModal(false)
    setIsEditMode(false)
  }

  //handle delete action
  const handleDeleteEntry = (itemId) => {
    swal({
      title: "",
      text: "Are you sure you want to remove this user?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      // buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DELETE_INVITE_USER(itemId));
        dispatch(GET_INVITE_USERS(paginationData));
        swal({
          title: "Successfully Complete",
          text: "Successfully removed!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          // buttons: false,
          timer: 1500,
        });
      }
    });
  };

  const columns = {
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
      inviteUserData?.results?.length > 0
        ? inviteUserData?.results?.map((item, index) => {
          return {
            name: (
              <div key={index}>
                <Link to={`${item.id}`}>
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
                    {item?.user_email ? item?.user_name : "N/A"}
                  </Typography>
                </Link>
              </div>
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
                    item?.status !== 1
                      ? "rgba(250, 45, 32, 1)"
                      : "#20A144",
                  fontSize: "12px",
                  textTransform: "none",
                  pointerEvents: "none",
                }}
              >
                {item?.status !== 1 ? "Inactive" : "Active"}
              </Button>
            ),
            action: (
              <div className="relative">
                <MoreVertIcon cursor="pointer" onClick={() => setCurrentTooltip(item?.id)} />
                {currentTooltip === item?.id && !isEditMode && (
                  <div ref={modalRef} className="shadow-sm absolute left-3 top-[10px] bg-white z-10 p-[10px] rounded-[4px] max-w-fit text-sm text-disable leading-4">
                    <div className="flex justify-start items-center gap-2 cursor-pointer" onClick={() => handleEditEntry(item?.id, item?.level)} >
                      <BorderColorIcon />
                      <span>Edit</span>
                    </div>
                    <div className="flex justify-start items-center gap-2 pt-[15px] cursor-pointer" onClick={() => handleDeleteEntry(item?.id)} >
                      <DeleteIcon />
                      <span>Delete</span>
                    </div>
                  </div>
                )}
              </div>
            ),
          };
        })
        : [],
  };


  return (
    <div className="page-container">
      <div className="flex-center">
        <h1>Invite User</h1>
        <div className="flex-center gap-[10px] font-sm leading-4 font-medium text-primary">
          <Link to="/"><HomeIcon color="disabled" /></Link>
          <span className="text-disable opacity-20">|</span>
          <Link to="/invite-user">Invite User</Link>
        </div>
      </div>

      <div className="page-card">
        <div className="flex-center flex flex-wrap p-[15px] pb-5">
          <SearchBar onChange={setSearchText} />
          <button
            type="submit"
            onClick={() => setOpenModal(true)}
            className="btn btn-primary btn-label px-[15px] py-[9px] max-w-[135px] w-full flex-center gap-2"
          >
            <PersonAddAltIcon />
            <span className="btn-label">Invite User</span>
          </button>
        </div>
        {inviteUserLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Custom_MUI_Table
              loader={inviteUserLoading}
              data={columns}
              allData={inviteUserData}
              paginationData={paginationData}
              setPaginationData={setPaginationData}
            />
            <CustomPopup
              dialogTitle={isEditMode ? "Edit Invite User" : "Invite User"}
              textAlign="left"
              dialogContent={
                <div className="mt-5">
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
                            className="input-style"
                            type="email"
                            placeholder="Enter Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          {errors.email && (
                            <span>{errors.email ?? "valid"}</span>)}
                        </div>
                      </div>

                      <div className={
                        errors.company
                          ? "input-fields-wrapper error-style"
                          : "input-fields-wrapper"
                      }>
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
                            {companiesList?.map((item) =>
                              item.is_active ? (
                                <MenuItem key={item?.id} value={item?.id}>
                                  {item?.name}
                                </MenuItem>
                              ) : null
                            )}
                          </Select>
                          {errors.company && (
                            <span>{errors.company ?? "valid"}</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  <div className={
                    errors.level
                      ? "input-fields-wrapper error-style"
                      : "input-fields-wrapper"
                  }>
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
                        // disabled={DamData?.[0]?.company_id}
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
                      {errors.level && (
                        <span>{errors.level ?? "valid"}</span>
                      )}
                    </div>
                  </div>
                </div>
              }
              openPopup={openModal}
              closePopup={() => {
                if (isEditMode) {
                  setOpenModal(false)
                  setIsEditMode(false)
                } else {
                  setOpenModal(false)
                }
              }}
              mainActionHandler={validateSubmit}
              mainActionTitle={isEditMode ? "Save" : "Invite"}
            />
          </>
        )}
      </div >
    </div>
  );
};

export default InviteUser;
