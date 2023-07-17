/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import Custom_MUI_Table from "./Custom-MUI-Table";

import { agencyCompanyProjectsFilterListAction } from "../../../redux/actions/Agency-companies-tabs-actions";

import CustomPopup from "../../Common/CustomPopup";
import CustomAddProgramModal from "./CustomAddModal/CustomAddProgramModal";
import { isEmpty } from "../../../utils/validations";
import { BACKEND_API_URL } from "../../../environment";
import swal from "sweetalert";
import api from "../../../utils/api";
import ActionMenuButton from "../../Common/actionMenuButton/ActionMenuButton";
import SearchInput from "../../Common/searchInput/SearchInput";

export default function Agency_programs() {
  const dispatch = useDispatch();

  // Redux states
  const {
    loading: loadinagencyCompanyProjectsFilterist,
    agencyCompanyProjectsFiltersList,
  } = useSelector((state) => state.AgencyCompanyProjectsFiltersReducer);

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
    label: "",
    value: "",
  }); // Community dropdown state for 'Add Program' modal
  const [searchText, setSearchText] = useState(""); // Community dropdown search state
  const [programsList, setProgramsList] = useState([]);
  const [programsListLoader, setProgramsListLoader] = useState(false);

  // Action Menu button states
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null,
  });

  // Community, Story, Tag fetch list API call
  useEffect(() => {
    dispatch(agencyCompanyProjectsFilterListAction());
  }, []);

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
      label: item?.community?.name,
      value: item?.community?.id,
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
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`${BACKEND_API_URL}community/program/${item?.id}/`)
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Deleted!",
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            getProgramsList();
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: err.response.data.message.length
                ? err.response.data.message
                : err.response.data.message,
              className: "errorAlert",
              icon: "/img/logonew-red.svg",
              buttons: false,
              timer: 5000,
            });
          });
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
      programsList?.results?.length > 0
        ? programsList?.results?.map((item, index) => {
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
  // console.log("Program", data);
  // Programs fetch list API call
  const getProgramsList = async () => {
    setProgramsListLoader(true);
    const config = {
      params: {
        ...filterData,
        page_size: paginationData.rowsPerPage,
        page: paginationData.page,
      },
    };

    await api
      .get(`${BACKEND_API_URL}community/program/`, config)
      .then((res) => {
        setProgramsList(res?.data?.data);
      })
      .catch((err) => {
        // console.log(err, "Channel Error");
      })
      .finally(() => {
        setProgramsListLoader(false);
      });
  };

  useEffect(() => {
    getProgramsList();
  }, [paginationData, filterData]);

  // Reset modal fields and errors state
  const resetModalData = () => {
    setErrors({
      title: null,
      community: null,
    });
    setFormData({
      title: undefined,
    });
    setShowTagModal(!showTagModal);
    setSelectedOption(null);
    setProgramsListLoader(false);
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    const tempErrors = {
      title: isEmpty(formData?.title, "Program title is required"),
      community: isEmpty(selectedOption?.["label"], "Community is required"),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };
  // Submit the 'Add Program' modal
  const submitHandler = (e) => {
    if (formData?.title) {
      // Payload
      const programPayload = {
        title: formData?.title,
        community: selectedOption?.["value"],
      };

      // API call
      if (isEditMode) {
        api
          .put(
            `${BACKEND_API_URL}community/program/${selectedItem.currentId}/`,
            programPayload
          )
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Saved!",
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            getProgramsList();
            resetModalData();
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: err.response.data.message?.length
                ? err.response.data.message
                : JSON.stringify(err.response.data.message),
              className: "errorAlert",
              icon: "/img/logonew-red.svg",
              buttons: false,
              timer: 5000,
            });
          });
      } else {
        api
          .post(`${BACKEND_API_URL}community/program/`, programPayload)
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Saved!",
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            getProgramsList();
            resetModalData();
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: err.response.data.message?.length
                ? err.response.data.message
                : JSON.stringify(err.response.data.message),
              className: "errorAlert",
              icon: "/img/logonew-red.svg",
              buttons: false,
              timer: 5000,
            });
          });
      }
    }
  };

  // Clears the error when the community dropdown option is selected
  useEffect(() => {
    if (!isEmpty(selectedOption?.["label"] || selectedOption)) {
      setErrors({
        title: null,
        community: null,
      });
    }
  }, [selectedOption]);

  return (
    <>
      <div className="page-container p-[20px]">
        <h1 className="page-title">Programs</h1>

        <div className="page-card new-card p-0">
          <div className="flex flex-wrap p-[15px] pb-[20px]">
            <SearchInput
              searchVal={filterData.search}
              handleFilterChange={handleFilterChange}
            />

            <div className="savebtn Categorybtn ml-auto">
              <button
                className="addanewmail w-full h-full"
                type="button"
                onClick={(e) => {
                  setShowTagModal(true);
                }}
                // disabled={true}
              >
                {" "}
                + Add
              </button>
            </div>
          </div>

          <CustomPopup
            dialogTitle="Add Program"
            textAlign="left"
            dialogContent={
              <CustomAddProgramModal
                communityOptions={
                  agencyCompanyProjectsFiltersList?.community
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

          <Custom_MUI_Table
            loader={programsListLoader}
            data={data}
            allData={programsList || []}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        </div>
      </div>
    </>
  );
}
