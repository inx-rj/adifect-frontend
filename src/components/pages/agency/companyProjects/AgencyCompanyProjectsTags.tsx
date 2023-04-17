/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSingleEffect, useUpdateEffect } from "react-haiku";

import MuiCustomTable from "components/common/muiCustomTable/MuiCustomTable";
import CustomPopup from "common/CustomPopup";

import { Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { TableRowColType } from "helper/types/muiCustomTable/muiCustomTable";
import { Images } from "helper/images";

import { useAppDispatch, useAppSelector } from "redux/store";
import { COMPANY_PROJECTS_TAGS } from "redux/reducers/companies/companiesTags.slice";
import {
  GET_COMPANY_PROJECTS_TAGS_LIST,
  POST_COMPANY_PROJECTS_TAG,
} from "redux/actions/companies/companiesTags.actions";

const AgencyCompanyProjectsTags = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const { companyProjectsTagsList } = useAppSelector(COMPANY_PROJECTS_TAGS);

  // React states
  const [showTagModal, setShowTagModal] = useState(false);
  const [currentCommunity, setCurrentCommunity] = useState();
  const [formData, setFormData] = useState({
    tagName: "",
    tagDescription: "",
  });

  const [errors, setErrors] = useState({
    tagName: null,
    tagDescription: null,
  });
  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  });

  //fetch inital tags data list
  useSingleEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_TAGS_LIST(paginationData));
  });

  //fetch company projects tags list when pagination change
  useUpdateEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_TAGS_LIST(paginationData));
  }, [paginationData]);

  //open tag modal
  const openTagModal = (communityId) => {
    setCurrentCommunity(communityId);
    setShowTagModal(true);
  };

  //handle form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  //validate inputs
  const validateSubmit = () => {
    const tempErrors = {
      tagName: !formData.tagName && "Please enter Tag Name",
      tagDescription: !formData.tagDescription && "Please enter Description",
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
      title: formData.tagName,
      description: formData.tagDescription,
    };
    dispatch(POST_COMPANY_PROJECTS_TAG(tagData));
    setShowTagModal(false);
    setFormData({ tagName: "", tagDescription: "" });
  };

  const data: TableRowColType = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Community
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: "community",
        sort: "asc",
        width: 160,
      },
      {
        id: 2,
        label: "Tags",
        field: "tags",
        width: 425,
      },
    ],
    rows:
      companyProjectsTagsList?.data?.results?.length > 0
        ? companyProjectsTagsList?.data?.results?.map((data, index) => {
            return {
              community: (
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
                  {data.name}
                </Typography>
              ),
              tags: (
                <Typography
                  component="div"
                  sx={{
                    maxWidth: "450px",
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
    <div className="page-container">
      <div className="flex-between">
        <h2 className="page-title">Tags</h2>
        {/* <div className="flex-center gap-[10px] font-sm leading-4 font-medium text-primary">
          <Link to="/"><HomeIcon color="disabled" /></Link>
          <span className="text-disable opacity-20">|</span>
          <Link to="/company-projects">Company Projects</Link>
        </div> */}
      </div>
      <div className="page-card">
        {companyProjectsTagsList?.loading ? (
          <div className="projectsLoaderCreatorPage">
            {/* <LoadingSpinner /> */}
            Loading . . .
          </div>
        ) : (
          <MuiCustomTable
            loader={companyProjectsTagsList?.loading}
            data={data}
            allData={companyProjectsTagsList?.data}
            paginationData={paginationData}
            setPaginationData={setPaginationData}
          />
        )}

        {companyProjectsTagsList?.data?.results?.map((data) => (
          <>
            {currentCommunity === data?.id && (
              <CustomPopup
                dialogTitle="Add Tag"
                textAlign="left"
                dialogContent={
                  <div className="mt-5">
                    <div
                      className={
                        errors.tagName
                          ? "input-fields-wrapper error-style"
                          : "input-fields-wrapper"
                      }
                    >
                      <h4>Add New Tag</h4>
                      <div className="styled-select">
                        <input
                          className="input-style"
                          type="text"
                          placeholder="Enter tag name"
                          name="tagName"
                          value={formData.tagName}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.tagName && (
                          <span>{errors.tagName ?? "valid"}</span>
                        )}
                      </div>
                    </div>
                    <div
                      className={
                        errors.tagDescription
                          ? "input-fields-wrapper error-style"
                          : "input-fields-wrapper"
                      }
                    >
                      <h4>Description</h4>
                      <div className="styled-select">
                        <textarea
                          name="tagDescription"
                          className="input-style"
                          placeholder="Enter description"
                          maxLength={2000}
                          value={formData.tagDescription}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.tagDescription && (
                          <span>{errors.tagDescription ?? "valid"}</span>
                        )}
                      </div>
                    </div>
                  </div>
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
};

export default AgencyCompanyProjectsTags;
