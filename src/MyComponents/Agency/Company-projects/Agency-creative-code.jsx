/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import Custom_MUI_Table from "./Custom-MUI-Table";

import { agencyCompanyProjectsFilterListAction } from "../../../redux/actions/Agency-companies-tabs-actions";

import CustomPopup from "../../Common/CustomPopup";
import CustomAddCreativeCodeModal from "./CustomAddModal/CustomAddCreativeCodeModal";
import { isEmpty } from "../../../utils/validations";
import { BACKEND_API_URL } from "../../../environment";
import swal from "sweetalert";
import api from "../../../utils/api";
import ActionMenuButton from "../../Common/actionMenuButton/ActionMenuButton";
import SearchInput from "../../Common/searchInput/SearchInput";

export default function Agency_creative_code() {
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
    label: "",
    value: "",
  }); // Community dropdown state for 'Add Program' modal
  const [searchText, setSearchText] = useState(""); // Community dropdown search state
  const [creativeCodeList, setCreativeCodeList] = useState([]);
  const [creativeCodeListLoader, setCreativeCodeListLoader] = useState(false);

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
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`${BACKEND_API_URL}community/creative-code/${item?.id}/`)
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Deleted!",
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            getCreativeCodeList();
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
        field: "creativeCodeTitle",
        sort: "asc",
        width: 100,
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            File Name
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
            <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
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
      creativeCodeList?.results?.length > 0
        ? creativeCodeList?.results?.map((item, index) => {
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

  // Programs fetch list API call
  const getCreativeCodeList = async () => {
    setCreativeCodeListLoader(true);
    const config = {
      params: {
        ...filterData,
        page_size: paginationData.rowsPerPage,
        page: paginationData.page,
      },
    };

    await api
      .get(`${BACKEND_API_URL}community/creative-code/`, config)
      .then((res) => {
        setCreativeCodeList(res?.data?.data);
      })
      .catch((err) => {
        // console.log(err, "Channel Error");
      })
      .finally(() => {
        setCreativeCodeListLoader(false);
      });
  };

  useEffect(() => {
    getCreativeCodeList();
  }, [paginationData, filterData]);

  // Reset modal fields and errors state
  const resetModalData = () => {
    setErrors({ ...errors, community: null });
    setFormData({
      title: undefined,
    });
    setShowTagModal(!showTagModal);
    setSelectedOption(null);
    setCreativeCodeListLoader(false);
  };

  //validate inputs
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      title: isEmpty(formData.title, "Title is required"),
      file_name: isEmpty(formData.file_name, "File name is required"),
      format: isEmpty(formData.format, "Format is required"),
      creative_theme: isEmpty(
        formData.creative_theme,
        "Creative Theme is required"
      ),
      horizontal_pixel: isEmpty(
        formData.horizontal_pixel,
        "Horizontal pixel is required"
      ),
      vertical_pixel: isEmpty(
        formData.vertical_pixel,
        "Vertical Pixel is required"
      ),
      duration: isEmpty(formData.duration, "Duration is required"),
      link: isEmpty(formData.link, "Link is required"),
      notes: isEmpty(formData.notes, "Notes is required"),
      // community: isEmpty(selectedOption?.['label'], 'Community is required'),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };
  // Submit the 'Add Program' modal
  const submitHandler = (e) => {
    // console.log({ formData }, "formData");
    if (formData.title) {
      // API call
      if (isEditMode) {
        api
          .put(
            `${BACKEND_API_URL}community/creative-code/${selectedItem?.currentId}/`,
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
            getCreativeCodeList();
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
          .post(`${BACKEND_API_URL}community/creative-code/`, formData)
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Saved!",
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            getCreativeCodeList();
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
      setErrors({ ...errors, community: null });
    }
  }, [selectedOption]);

  return (
    <>
      <div className="page-container p-[20px]">
        <h1 className="page-title">Creative Code</h1>

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
            dialogTitle="Add Creative Code"
            textAlign="left"
            dialogContent={
              <CustomAddCreativeCodeModal
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
            loader={creativeCodeListLoader}
            data={data}
            allData={creativeCodeList || []}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        </div>
      </div>
    </>
  );
}
