/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "redux/store";
import { COMPANY_PROJECTS_FILTERS_DATA } from "redux/reducers/companies/companies.slice";
import { GET_COMPANY_PROJECTS_FILTERS_LIST } from "redux/actions/companies/companies.actions";
import {
  CREATE_CREATIVE_CODE_LIST,
  DELETE_CREATIVE_CODE_LIST,
  GET_CREATIVE_CODE_LIST,
  UPDATE_CREATIVE_CODE_LIST,
} from "redux/actions/creativeCode/creativeCode.actions";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import swal from "sweetalert";
import ActionMenuButton from "components/common/actionMenuButton/ActionMenuButton";
import { isEmpty } from "helper/utility/customFunctions";
import { Images } from "helper/images";
import {
  CREATIVE_CODE_DATA,
  CREATIVE_CODE_RESPONSE,
  SET_CREATE_CREATIVE_CODE,
  SET_CREATIVE_CODE_EDIT_DATA,
  SET_CREATIVE_CODE_LOADING,
} from "redux/reducers/companies/creativeCode.slice";
import MuiPopup from "components/common/muiPopup/MuiPopup";
import CustomAddCreativeCodeModal from "./customAddModal/CustomAddCreativeCodeModal";
import MuiTable from "components/common/muiTable/MuiTable";
import { Add } from "@mui/icons-material";

export default function CreativeCode() {
  const dispatch = useAppDispatch();

  // Redux states
  const agencyCompanyProjectsFiltersList = useAppSelector(
    COMPANY_PROJECTS_FILTERS_DATA
  );
  const creativeCodeList = useAppSelector(CREATIVE_CODE_DATA);
  const success = useAppSelector(CREATIVE_CODE_RESPONSE);

  // React states
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  }); // pagination params state
  const [filterData, setFilterData] = useState({ search: "" }); // filter params state
  const [showTagModal, setShowTagModal] = useState(false); // Add Creative Code modal state
  const [formData, setFormData] = useState({
    title: undefined,
    file_name: undefined,
    format: undefined,
    creative_theme: undefined,
    horizontal_pixel: undefined,
    vertical_pixel: undefined,
    duration: undefined,
    link: undefined,
    notes: undefined,
  }); // Add Program modal fields state
  const [errors, setErrors] = useState({
    title: null,
    file_name: null,
    format: null,
    creative_theme: null,
    horizontal_pixel: null,
    vertical_pixel: null,
    duration: null,
    link: null,
    notes: null,
  }); // Add Program modal fields error state
  const [selectedOption, setSelectedOption] = useState({
    name: "",
    id: "",
  }); // Community dropdown state for 'Add Program' modal
  const [searchText, setSearchText] = useState(""); // Community dropdown search state

  // Action Menu button states
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null,
  });

  // Community, Story, Tag fetch list API call
  useSingleEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_FILTERS_LIST());
    dispatch(GET_CREATIVE_CODE_LIST({ ...paginationData, ...filterData }));
  });

  //set the edit mode
  const handleEdit = (item) => {
    setShowTagModal(true);
    setIsEditMode(true);
    setErrors({
      ...errors,
      title: null,
      file_name: null,
      format: null,
      creative_theme: null,
      horizontal_pixel: null,
      vertical_pixel: null,
      duration: null,
      link: null,
      notes: null,
    });
    setSelectedItem({ ...selectedItem, currentId: item?.id });

    setFormData({
      title: item?.title,
      file_name: item?.file_name,
      format: item?.format,
      creative_theme: item?.creative_theme,
      horizontal_pixel: item?.horizontal_pixel,
      vertical_pixel: item?.vertical_pixel,
      duration: item?.duration,
      link: item?.link,
      notes: item?.notes,
    });
  };

  //handle delete action
  const handleDelete = (item) => {
    swal({
      title: "Warning",
      text: `Are you sure you want to remove this ${item?.title}?`,
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: {
        Cancel: true,
        OK: true,
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete !== "Cancel") {
        dispatch(DELETE_CREATIVE_CODE_LIST(item?.id)).then((r: void) => r);
      }
    });
    setAnchorEl(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
  };

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
            Title
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "creativeCodeTitle",
        sort: "asc",
        width: 100,
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            File Name
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "fileName",
        sort: "asc",
        width: 50,
      },
      {
        id: 3,
        label: (
          <label className="flex items-center">
            Format
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "format",
        sort: "asc",
        width: 50,
      },
      {
        id: 4,
        label: (
          <label className="flex items-center">
            Creative Theme
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "creativeTheme",
        sort: "asc",
        width: 100,
      },
      {
        id: 5,
        label: (
          <label className="flex items-center">
            Horizontal
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "horizontalPx",
        sort: "asc",
        width: 50,
      },
      {
        id: 6,
        label: (
          <label className="flex items-center">
            Vertical
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "verticalPx",
        sort: "asc",
        width: 50,
      },
      {
        id: 7,
        label: (
          <label className="flex items-center">
            Duration
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "duration",
        sort: "asc",
        width: 50,
      },
      {
        id: 8,
        label: (
          <label className="flex items-center">
            Link
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "link",
        sort: "asc",
        width: 100,
      },
      {
        id: 9,
        label: (
          <label className="flex items-center">
            Notes
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "notes",
        sort: "asc",
        width: 100,
      },
      {
        id: 4,
        label: "Action",
        field: "action",
        sort: "asc",
        width: 50,
      },
    ],

    rows:
      creativeCodeList?.data?.results?.length > 0
        ? creativeCodeList?.data?.results?.map((item, index) => {
            return {
              creativeCodeTitle: item.title ?? "",

              fileName: item.file_name ?? "",

              format: item.format ?? "",

              creativeTheme: item.creative_theme ?? "",

              horizontalPx: item.horizontal_pixel ?? "",

              verticalPx: item.vertical_pixel ?? "",

              duration: item.duration ?? "",

              link: (
                <Typography
                  key={index}
                  className="truncate w-max-full"
                  sx={{
                    "&.MuiTypography-root": {
                      color: "#71757B",
                      fontSize: "14px",
                      fontWeight: 400,
                      p: 0,
                      fontFamily: '"Figtree", sans-serif',
                    },
                  }}
                >
                  {item.link ?? ""}
                </Typography>
              ),

              notes: (
                <Typography
                  key={index}
                  className="truncate w-3/4"
                  sx={{
                    "&.MuiTypography-root": {
                      color: "#71757B",
                      fontSize: "14px",
                      fontWeight: 400,
                      p: 0,
                      fontFamily: '"Figtree", sans-serif',
                    },
                  }}
                >
                  {item.notes ?? ""}
                </Typography>
              ),

              action: (
                <div>
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
                </div>
              ),
            };
          })
        : [],
  };

  // Creative Code fetch list API call
  useUpdateEffect(() => {
    dispatch(GET_CREATIVE_CODE_LIST({ ...paginationData, ...filterData }));
  }, [paginationData, filterData]);

  // Reset modal fields and errors state
  const resetModalData = () => {
    setErrors({
      ...errors,
      title: null,
      file_name: null,
      format: null,
      creative_theme: null,
      horizontal_pixel: null,
      vertical_pixel: null,
      duration: null,
      link: null,
      notes: null,
    });
    setFormData({
      title: undefined,
      file_name: undefined,
      format: undefined,
      creative_theme: undefined,
      horizontal_pixel: undefined,
      vertical_pixel: undefined,
      duration: undefined,
      link: undefined,
      notes: undefined,
    });
    setShowTagModal(!showTagModal);
    setSelectedOption(null);
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      title: isEmpty(formData.title) ? "Title is required" : "",
      file_name: isEmpty(formData.file_name) ? "File name is required" : "",
      format: isEmpty(formData.format) ? "Format is required" : "",
      creative_theme: isEmpty(formData.creative_theme)
        ? "Creative Theme is required"
        : "",
      horizontal_pixel: isEmpty(formData.horizontal_pixel)
        ? "Horizontal pixel is required"
        : "",
      vertical_pixel: isEmpty(formData.vertical_pixel)
        ? "Vertical Pixel is required"
        : "",
      duration: isEmpty(formData.duration) ? "Duration is required" : "",
      link: isEmpty(formData.link) ? "Link is required" : "",
      notes: isEmpty(formData.notes) ? "Notes is required" : "",
      // community: isEmpty(selectedOption?.['name'], 'Community is required'),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };
  // Submit the 'Add Program' modal
  const submitHandler = () => {
    // console.log({ formData }, "formData");
    if (formData.title) {
      // API call
      if (isEditMode) {
        dispatch(UPDATE_CREATIVE_CODE_LIST(selectedItem?.currentId, formData))
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Saved!",
              className: "successAlert-login",
              icon: Images.Logo,
              buttons: {
                OK: false,
              },
              timer: 1500,
            });
            dispatch(SET_CREATIVE_CODE_EDIT_DATA(res?.data?.message));
            dispatch(SET_CREATIVE_CODE_LOADING(false));
            resetModalData();
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: err.response.data.message?.length
                ? err.response.data.message
                : JSON.stringify(err.response.data.message),
              className: "errorAlert",
              icon: Images.ErrorLogo,
              buttons: {
                OK: false,
              },
              timer: 5000,
            });
            dispatch(SET_CREATIVE_CODE_LOADING(false));
          });
      } else {
        dispatch(CREATE_CREATIVE_CODE_LIST(formData))
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Saved!",
              className: "successAlert-login",
              icon: Images.Logo,
              buttons: {
                OK: false,
              },
              timer: 1500,
            });
            dispatch(SET_CREATE_CREATIVE_CODE(res?.data?.message));
            dispatch(SET_CREATIVE_CODE_LOADING(false));
            resetModalData();
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: err.response.data.message?.length
                ? err.response.data.message
                : JSON.stringify(err.response.data.message),
              className: "errorAlert",
              icon: Images.ErrorLogo,
              buttons: {
                OK: false,
              },
              timer: 5000,
            });
            dispatch(SET_CREATIVE_CODE_LOADING(false));
          });
      }
    }
  };

  // Clears the error when the community dropdown option is selected
  useUpdateEffect(() => {
    if (!isEmpty(selectedOption?.["name"] || selectedOption)) {
      setErrors({
        ...errors,
        title: null,
        file_name: null,
        format: null,
        creative_theme: null,
        horizontal_pixel: null,
        vertical_pixel: null,
        duration: null,
        link: null,
        notes: null,
      });
    }
  }, [selectedOption]);

  // Fetch Creative Code updated List on Add, Edit and Delete
  useUpdateEffect(() => {
    if (success.add || success.update || success.delete) {
      dispatch(GET_CREATIVE_CODE_LIST({ ...paginationData, ...filterData }));
    }
  }, [success]);

  return (
    <>
      <div className="page-container">
        <h1 className="page-title">Creative Code</h1>

        <div className="page-card new-card p-0">
          <div className="flex flex-wrap p-[15px] pb-[20px]">
            <Box
              sx={{
                "& input": {
                  width: "335px",
                  height: "49px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "0 11px",
                },
              }}
            >
              <input
                className="form-control form-control-sm ml-0 my-1"
                type="search"
                placeholder="Search"
                name="search"
                aria-label="Search"
                value={filterData.search}
                onChange={handleFilterChange}
              />
            </Box>

            <div className="savebtn Categorybtn ml-auto">
              <button
                className="btn btn-primary"
                type="button"
                onClick={(e) => {
                  setShowTagModal(true);
                }}
                // disabled={true}
              >
                {" "}
                <Add /> Add Creative Code
              </button>
            </div>
          </div>

          <MuiPopup
            dialogTitle="Add Creative Code"
            textAlign="left"
            dialogContent={
              <CustomAddCreativeCodeModal
                communityOptions={
                  agencyCompanyProjectsFiltersList?.data?.community
                    ? agencyCompanyProjectsFiltersList
                    : []
                }
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                searchText={searchText}
                setSearchText={setSearchText}
                setFormData={setFormData}
                formData={formData}
                setErrors={setErrors}
                errors={errors}
              />
            }
            openPopup={showTagModal}
            closePopup={() => resetModalData()}
            mainActionHandler={validateSubmit}
            mainActionTitle="Save"
          />

          <MuiTable
            loader={creativeCodeList?.loading}
            data={data}
            allData={creativeCodeList?.data}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        </div>
      </div>
    </>
  );
}
