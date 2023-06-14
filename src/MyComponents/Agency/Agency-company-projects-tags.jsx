/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import swal from "sweetalert";

import CustomPopup from "../Common/CustomPopup";
import Custom_MUI_Table from "./Company-projects/Custom-MUI-Table";

import {
  agencyAddCompanyTagAction,
  agencyCompanyTagsListAction,
} from "../../redux/actions/Agency-companies-tabs-actions";
import { AGENCY_COMPANY_ADD_TAG_RESET } from "../../constants/Agency-companies-constants";
import SearchInput from "../../MyComponents/Common/searchInput/SearchInput";

export default function Agency_company_projects_tags() {
  const dispatch = useDispatch();

  const [showTagModal, setShowTagModal] = useState(false);
  const [currentCommunity, setCurrentCommunity] = useState();
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [errors, setErrors] = useState({
    tagName: null,
    tagDescription: null,
  });
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  });
  const [filterData, setFilterData] = useState({
    from_date: "",
    to_date: "",
    community: "",
    status: "",
    tag: "",
    search: "",
  }); // filter params state

  const {
    loading: loadingagencyCompanyTagsList,
    agencyCompanyTagsList,
    agencyCompanyTagsListData,
  } = useSelector((state) => state.AgencyCompanyTagsReducer);

  const { loading: loadingagencyCompanyAddTag, agencyCompanyAddTagStatus } =
    useSelector((state) => state.AgencyAddCompanyTagReducer);

  // Tags fetch list API call including changing filters and pagination
  useEffect(() => {
    dispatch(agencyCompanyTagsListAction(paginationData, filterData));
  }, [paginationData, filterData]);

  //open tag modal
  const openTagModal = (communityId) => {
    setCurrentCommunity(communityId);
    setShowTagModal(true);
  };

  //validate inputs
  const validateSubmit = () => {
    const tempErrors = {
      tagName: !tagName && "Please enter Tag Name",
      tagDescription: !tagDescription && "Please enter Description",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value)?.length) {
      return;
    }
    handleFolderSubmit();
  };

  //add new tag to list
  const handleFolderSubmit = () => {
    const tagData = {
      community: currentCommunity,
      title: tagName,
      description: tagDescription,
    };
    if (tagName && tagDescription) {
      dispatch(agencyAddCompanyTagAction(tagData));
      setTagName("");
      setTagDescription("");
    }
  };

  // To handle filter change
  const handleFilterChange = ({ target: { name, value } }) => {
    setFilterData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  //show success message and reset states
  useEffect(() => {
    if (agencyCompanyAddTagStatus) {
      dispatch(agencyCompanyTagsListAction(paginationData));
      setShowTagModal(false);
      swal({
        title: "Successfully Complete",
        text: "New Tag created!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 3000,
      });
    }
    dispatch({ type: AGENCY_COMPANY_ADD_TAG_RESET });
  }, [agencyCompanyAddTagStatus]);

  const data = {
    columns: [
      {
        label: (
          <label className="d-flex align-items-center">
            Community
            <img className="ml-1" src="/img/sort_arrows.png" alt="community" />
          </label>
        ),
        field: "community",
        sort: "asc",
        width: 130,
      },
      {
        label: "Tags",
        field: "tags",
        width: 425,
      },
    ],
    rows:
      agencyCompanyTagsList?.length > 0
        ? agencyCompanyTagsList?.map((data) => {
            return {
              community: (
                <div>
                  <Typography
                    sx={{
                      "&.MuiTypography-root": {
                        display: "inline-block",
                        cursor: "pointer",
                        color: "#71757B",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        p: 0,
                        fontFamily: '"Figtree", sans-serif',
                      },
                    }}
                  >
                    {data?.name}
                  </Typography>
                </div>
              ),
              tags: (
                <Typography
                  component="div"
                  sx={{
                    // maxWidth: "calc(100% - 400px)",
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {data?.tags?.map((item) => (
                    <Button
                      key={item?.id}
                      variant="contained"
                      disableRipple
                      disableFocusRipple
                      disableElevation
                      sx={{
                        padding: "7px 5px",
                        background: "rgba(36,114,252,0.08)",
                        color: "#2472FC",
                        "&:hover": {
                          background: "rgba(36,114,252,0.08)",
                        },
                        fontSize: "12px",
                        textTransform: "none",
                        marginTop: data?.tags?.length > 5 ? "10px" : "",
                        marginRight: data?.tags?.length > 1 ? "10px" : "",
                      }}
                    >
                      {item?.title}
                    </Button>
                  ))}
                  <Button
                    variant="contained"
                    sx={{
                      width: "35px",
                      height: "35px",
                      minWidth: "35px",
                      padding: 0,
                      background: "#2472FC",
                      fontSize: "16px",
                      boxShadow: "none",
                      marginTop: data?.tags?.length > 4 ? "10px" : "",
                      marginLeft: data?.tags?.length > 1 ? "" : "10px",
                      "&:hover": {
                        boxShadow: "none",
                      },
                    }}
                    onClick={() => openTagModal(data?.id)}
                  >
                    +
                  </Button>
                </Typography>
              ),
            };
          })
        : [],
  };

  return (
    <div className="page-container p-[20px]">
      <h1 className="page-title">Tags</h1>

      <div className="page-card new-card p-0">
        <div className="flex flex-wrap p-[15px] pb-[20px]">
          <SearchInput
            searchVal={filterData.search}
            handleFilterChange={handleFilterChange}
          />
        </div>

        <Custom_MUI_Table
          loader={loadingagencyCompanyTagsList || loadingagencyCompanyAddTag}
          data={data}
          allData={agencyCompanyTagsListData}
          paginationData={paginationData}
          setPaginationData={setPaginationData}
        />

        {agencyCompanyTagsList?.map((data) => (
          <>
            {currentCommunity === data?.id && (
              <CustomPopup
                dialogTitle="Add Tag"
                textAlign="left"
                dialogContent={
                  <>
                    <h3 className="nameOrEmailText">Add New Tag</h3>
                    <input
                      className="NameorEmailNewPop"
                      type="text"
                      placeholder="Enter tag name..."
                      value={tagName}
                      onChange={(e) => {
                        setTagName(e.target.value);
                        setErrors({ ...errors, tagName: null });
                      }}
                    />
                    <span
                      className="CoverCreator3"
                      style={{
                        color: "#D14F4F",
                        opacity: errors.tagName ? 1 : 0,
                      }}
                    >
                      {errors.tagName ?? "valid"}
                    </span>
                    <div>
                      <h4 className="Company_name27">Description</h4>
                      <textarea
                        className="w-551 border-1 border-radius helptextarea Textbox-textarea bkC2"
                        placeholder=""
                        maxLength={2000}
                        value={tagDescription}
                        onChange={(e) => {
                          setTagDescription(e.target.value);
                          setErrors({ ...errors, tagDescription: null });
                        }}
                      />
                      <span
                        className="CoverCreator3"
                        style={{
                          color: "#D14F4F",
                          opacity: errors.tagDescription ? 1 : 0,
                        }}
                      >
                        {errors.tagDescription ?? "valid"}
                      </span>
                    </div>
                  </>
                }
                openPopup={showTagModal}
                closePopup={() => setShowTagModal(false)}
                mainActionHandler={validateSubmit}
                mainActionTitle="Create"
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
