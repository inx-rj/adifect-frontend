/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "redux/store";
import { COMPANY_PROJECTS_FILTERS_DATA } from "redux/reducers/companies/companies.slice";
import { GET_COMPANY_PROJECTS_FILTERS_LIST } from "redux/actions/companies/companies.actions";
import {
  CREATE_PROGRAMS_LIST,
  DELETE_PROGRAMS_LIST,
  GET_PROGRAMS_LIST,
  UPDATE_PROGRAMS_LIST,
} from "redux/actions/programs/programs.actions";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import swal from "sweetalert";
import ActionMenuButton from "components/common/actionMenuButton/ActionMenuButton";
import { isEmpty } from "helper/utility/customFunctions";
import {
  PROGRAMS_DATA,
  PROGRAMS_RESPONSE,
  SET_CREATE_PROGRAMS,
  SET_PROGRAMS_EDIT_DATA,
  SET_PROGRAMS_LOADING,
} from "redux/reducers/companies/programs.slice";
import { Images } from "helper/images";
import MuiPopup from "components/common/muiPopup/MuiPopup";
import CustomAddProgramModal from "./customAddModal/CustomAddProgramModal";
import MuiTable from "components/common/muiTable/MuiTable";
import { Add } from "@mui/icons-material";

export default function Programs() {
  const dispatch = useAppDispatch();

  // Redux states
  const agencyCompanyProjectsFiltersList = useAppSelector(
    COMPANY_PROJECTS_FILTERS_DATA
  );
  const programsList = useAppSelector(PROGRAMS_DATA);
  const success = useAppSelector(PROGRAMS_RESPONSE);
  // React states
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  }); // pagination params state
  const [filterData, setFilterData] = useState({ search: "" }); // filter params state
  const [showTagModal, setShowTagModal] = useState(false); // Add Programs modal state
  const [formData, setFormData] = useState({
    title: "",
    community: { label: "", value: "" },
  }); // Add Program modal fields state
  const [errors, setErrors] = useState({
    title: null,
    community: null,
  }); // Add Program modal fields error state
  const [selectedOption, setSelectedOption] = useState({
    id: "",
    name: "",
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
    dispatch(GET_PROGRAMS_LIST({ ...paginationData, ...filterData }));
  });

  //set the edit mode
  const handleEdit = (item) => {
    setShowTagModal(true);
    setIsEditMode(true);
    setErrors({
      title: null,
      community: null,
    });
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    setSelectedOption({
      name: item?.community?.name,
      id: item?.community?.id,
    });

    setFormData({
      ...formData,
      title: item?.title,
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
        dispatch(DELETE_PROGRAMS_LIST(item?.id)).then((r: void) => r);
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
            Programs Title
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "programTitle",
        sort: "asc",
        width: 300,
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            Community
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "community",
        sort: "asc",
        width: 300,
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
      programsList?.data?.results?.length > 0
        ? programsList?.data?.results?.map((item, index) => {
            return {
              tite: item.title ?? "",

              community: item.community.name ?? "",

              action: (
                <div>
                  {/* <MoreVertIcon /> */}
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

  // Programs fetch list API call
  useUpdateEffect(() => {
    dispatch(GET_PROGRAMS_LIST({ ...paginationData, ...filterData }));
  }, [paginationData, filterData]);

  // Reset modal fields and errors state
  const resetModalData = () => {
    setErrors({
      title: null,
      community: null,
    });
    setFormData({
      title: undefined,
      community: undefined,
    });
    setShowTagModal(!showTagModal);
    setSelectedOption(null);
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      title: isEmpty(formData?.title) ? "Program title is required" : "",
      community: isEmpty(selectedOption?.["name"])
        ? "Community is required"
        : "",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };
  // Submit the 'Add Program' modal
  const submitHandler = () => {
    if (formData?.title) {
      // Payload
      const programPayload = {
        title: formData?.title,
        community: selectedOption?.["id"],
      };

      // API call
      if (isEditMode) {
        dispatch(UPDATE_PROGRAMS_LIST(selectedItem?.currentId, programPayload))
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
            dispatch(SET_PROGRAMS_EDIT_DATA(res?.data?.message));
            dispatch(SET_PROGRAMS_LOADING(false));
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
            dispatch(SET_PROGRAMS_LOADING(false));
          });
      } else {
        dispatch(CREATE_PROGRAMS_LIST(programPayload))
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
            dispatch(SET_CREATE_PROGRAMS(res?.data?.message));
            dispatch(SET_PROGRAMS_LOADING(false));
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
            dispatch(SET_PROGRAMS_LOADING(false));
          });
      }
    }
  };

  // Clears the error when the community dropdown option is selected
  useUpdateEffect(() => {
    if (!isEmpty(selectedOption?.["name"] || selectedOption)) {
      setErrors({
        title: null,
        community: null,
      });
    }
  }, [selectedOption]);

  // Fetch Programs updated List on Add, Edit and Delete
  useUpdateEffect(() => {
    if (success.add || success.update || success.delete) {
      dispatch(GET_PROGRAMS_LIST({ ...paginationData, ...filterData }));
    }
  }, [success]);

  return (
    <>
      <div className="page-container">
        <h1 className="page-title">Programs</h1>

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
                <Add /> Add Program
              </button>
            </div>
          </div>

          <MuiPopup
            dialogTitle="Add Program"
            textAlign="left"
            dialogContent={
              <CustomAddProgramModal
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
            loader={programsList?.loading}
            data={data}
            allData={programsList?.data}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        </div>
      </div>
    </>
  );
}
