/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import swal from "sweetalert";

//import custom component
import MuiCustomTable from "components/common/muiCustomTable/MuiCustomTable";
import SearchBar from "common/CustomSearchBar";
import CustomActionComponent from "common/CustomActionComponent";
import CustomPopup from "common/CustomPopup";

//import MUI components and icons
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

//import helper files
import {
  TableRowColType,
  TablePaginationType,
} from "helper/types/muiCustomTable/muiCustomTable";
import { Images } from "helper/images";
import { formateISODateToLocaleString } from "helper/utility/customFunctions";

//import redux
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  DELETE_SINGLE_COMPANY,
  GET_COMPANY_LIST,
  POST_SINGLE_COMPANY,
  PUT_SINGLE_COMPANY,
} from "redux/actions/companyTab/companyTab.actions";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";

const AgencyCompanyList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redux states
  const { companyList } = useAppSelector(COMPANY_LIST);

  // React states
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
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

  //fetch inital companies data list
  useSingleEffect(() => {
    dispatch(GET_COMPANY_LIST(paginationData));
  });

  //fetch company list when pagination change
  useUpdateEffect(() => {
    dispatch(GET_COMPANY_LIST(paginationData));
  }, [paginationData]);

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
    setErrors({ company: "", description: "" });
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    setFormData({
      company: item?.name,
      description: item?.description,
      isActive: item?.is_active,
    });
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

  //handle add and edit form submit
  const handleFormSubmit = () => {
    const payload = {
      name: formData?.company,
      description: formData?.description,
      is_active: formData?.isActive,
    };
    if (isEditMode) {
      dispatch(PUT_SINGLE_COMPANY(selectedItem.currentId, payload));
    } else {
      dispatch(POST_SINGLE_COMPANY(payload));
    }
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

  //handle view action
  const handleView = (item) => {
    setAnchorEl(null);
    navigate(`/company/${item.id}`);
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
        dispatch(DELETE_SINGLE_COMPANY(selectedItem.currentId));
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
        dispatch(
          PUT_SINGLE_COMPANY(selectedItem.currentId, {
            is_active: true,
          })
        );
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
              createdAt: formateISODateToLocaleString(item?.created ?? ""),
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
                <CustomActionComponent
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  setAnchorEl={setAnchorEl}
                  anchorEl={anchorEl}
                  handleEdit={() => handleEdit(item)}
                  handleView={() => handleView(item)}
                  handleInactive={handleInactive}
                  handleActive={handleActive}
                  showView={true}
                  showEdit={true}
                  showInActive={true}
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
        <h1>Company</h1>
        <div className="flex-between gap-[10px] font-sm leading-4 font-medium text-primary">
          <Link to="/">
            <HomeIcon color="disabled" />
          </Link>
          <span className="text-disable opacity-20">|</span>
          <Link to="/agency/company">Company</Link>
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
          <h1>Loading...</h1>
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
              dialogTitle={isEditMode ? "Edit Company" : "Add Company"}
              textAlign="left"
              dialogContent={
                <div className="mt-5">
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
                        className="input-style"
                        type="text"
                        placeholder="Enter Company Name"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="err-tag">{errors.company ?? ""}</span>
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
                        className="input-style"
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
              mainActionHandler={validateSubmit}
              mainActionTitle={"Save"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AgencyCompanyList;
