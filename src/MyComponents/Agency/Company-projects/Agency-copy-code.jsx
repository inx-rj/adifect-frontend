/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import Custom_MUI_Table from "./Custom-MUI-Table";

import { agencyCompanyProjectsFilterListAction } from "../../../redux/actions/Agency-companies-tabs-actions";

import CustomPopup from "../../Common/CustomPopup";
import { isEmpty } from "../../../utils/validations";
import { BACKEND_API_URL } from "../../../environment";
import swal from "sweetalert";
import api from "../../../utils/api";
import CustomAddCopyCodeModal from "./CustomAddModal/CustomAddCopyCodeModal";
import ActionMenuButton from "../../Common/actionMenuButton/ActionMenuButton";
import SearchInput from "../../Common/searchInput/SearchInput";

export default function Agency_copy_code() {
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
    title: undefined,
    subject_line: undefined,
    body: undefined,
    notes: undefined,
  }); // Add Program modal fields state
  const [errors, setErrors] = useState({
    title: null,
    subject_line: null,
    body: null,
    notes: null,
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
      subject_line: null,
      body: null,
      notes: null,
    });
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    setSelectedOption({
      label: item?.community?.name,
      value: item?.community?.id,
    });

    setFormData({
      title: item?.title,
      subject_line: item?.subject_line,
      body: item?.body,
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
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`${BACKEND_API_URL}community/copy-code/${item?.id}/`)
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
            Title
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
            Subject Line
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "subLine",
        sort: "asc",
        width: 300,
      },
      {
        id: 3,
        label: (
          <label className="flex items-center">
            Body
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "body",
        sort: "asc",
        width: 300,
      },
      {
        id: 4,
        label: (
          <label className="flex items-center">
            Notes
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
          </label>
        ),
        field: "notes",
        sort: "asc",
        width: 300,
      },
      {
        id: 5,
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

            subLine: item.subject_line ?? "",

            body: item.body ?? "",

            notes: item.notes ?? "",

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
      .get(`${BACKEND_API_URL}community/copy-code/`, config)
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
      subject_line: null,
      body: null,
      notes: null,
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
    const tempErrors = {
      title: isEmpty(formData.title, "Title is required"),
      subject_line: isEmpty(formData.subject_line, "Subject line is required"),
      body: isEmpty(formData.body, "Body is required"),
      notes: isEmpty(formData.notes, "Notes is required"),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };
  // Submit the 'Add Program' modal
  const submitHandler = (e) => {
    if (formData.title) {
      // API call
      if (isEditMode) {
        api
          .put(
            `${BACKEND_API_URL}community/copy-code/${selectedItem?.currentId}/`,
            formData
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
          .post(`${BACKEND_API_URL}community/copy-code/`, formData)
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
        subject_line: null,
        body: null,
        notes: null,
      });
    }
  }, [selectedOption]);

  return (
    <>
      <div className="page-container p-[20px]">
        <h1 className="page-title">Copy Code</h1>

        <div className="page-card new-card p-0">
          <div className="flex flex-wrap p-[15px] pb-[20px]">
            <SearchInput searchVal={filterData.search} handleFilterChange={handleFilterChange} />

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
            dialogTitle="Add Copy Code"
            textAlign="left"
            dialogContent={
              <CustomAddCopyCodeModal
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
