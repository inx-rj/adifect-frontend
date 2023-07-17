import { Link as CopyLink } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BACKEND_API_URL } from "../../../../environment";
import { useClipboard } from "../../../../hooks/useClipboard";
import { validations } from "../../../../utils";
import api from "../../../../utils/api";
import ActionMenuButton from "../../../Common/actionMenuButton/ActionMenuButton";
import SearchInput from "../../../Common/searchInput/SearchInput";
import Custom_MUI_Table from "../../Company-projects/Custom-MUI-Table";

const AgencyIntakeForms = () => {
  // React States
  const navigate = useNavigate();
  const clipboard = useClipboard({ timeout: 2000 });
  const [formList, setFormList] = useState();
  const [intakeFormLoader, setIntakeFormLoader] = useState(true);
  const [filterData, setFilterData] = useState({
    search: "",
    name: "",
    version: "",
  }); // filter params state

  const [paginationData, setPaginationData] = useState({
    page: 1,
    rowsPerPage: 10,
  }); // pagination params state

  // Action Menu button states
  const [openActionMenu, setOpenActionMenu] = React.useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null,
  });
  const [copiedText, setCopiedText] = useState(null);

  const fetchIntakeForms = async () => {
    setIntakeFormLoader(true);
    api
      .get(`${BACKEND_API_URL}intake-forms/`, {
        params: {
          ...filterData,
          page_size: paginationData.rowsPerPage,
          page: paginationData.page,
        },
      })
      .then((res) => {
        setFormList(res?.data?.data);
      })
      .catch((err) => {
        // console.log(err, "Channel Error");
      })
      .finally(() => {
        setIntakeFormLoader(false);
      });
  };

  useEffect(() => {
    fetchIntakeForms().then((r) => r);
  }, [paginationData, filterData]);

  //set the edit mode
  const handleEdit = (item) => {
    setIsEditMode(true);
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    navigate(`/intake/edit/${item?.form_slug}`);
  };

  //handle delete action
  const handleDelete = (item) => {
    swal({
      title: "Warning",
      text: `Are you sure you want to remove this ${item?.title} form?`,
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`${BACKEND_API_URL}intake-forms/${item?.id}/`)
          .then((res) => {
            swal({
              title: "Successfully Complete",
              text: "Successfully Deleted!",
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            // getProgramsList();
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
    setOpenActionMenu(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
  };

  const handleView = (item) => {
    navigate(`/intake/view/${item?.form_slug}`);
  };

  // Handle Copy
  const handleCopy = (e, id, textToCopy) => {
    e.preventDefault();
    setCopiedText(id);
    clipboard.copy(textToCopy);
  };
  // Table Row-Columns data
  const intakeFormTableColumn = [
    {
      id: 1,
      label: (
        <label className="flex items-center">
          Forms
          <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
        </label>
      ),
      field: "title",
      sort: "asc",
      width: 300,
    },
    {
      id: 2,
      label: (
        <label className="flex items-center">
          Created By
          <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
        </label>
      ),
      field: "created_by",
      sort: "asc",
      width: 200,
    },
    {
      id: 3,
      label: (
        <label className="flex items-center">
          Created On
          <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
        </label>
      ),
      field: "created",
      sort: "asc",
      width: 100,
    },
    {
      id: 4,
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
      id: 5,
      label: (
        <label className="flex items-center">
          Version
          <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
        </label>
      ),
      field: "max_version",
      sort: "asc",
      width: 100,
    },
    {
      id: 6,
      label: (
        <label className="flex items-center">
          Responses
          <img className="ml-1" src="/img/sort_arrows.png" alt="Title" />
        </label>
      ),
      field: "responses",
      sort: "asc",
      width: 100,
    },
    {
      id: 7,
      label: "Action",
      field: "action",
      sort: "asc",
      width: 100,
    },
  ];
  const tabelRowColData = {
    columns: intakeFormTableColumn,
    rows:
      formList?.results?.length > 0
        ? formList?.results?.map((item, index) => {
            return {
              title: (
                <Link
                  to={`/intake/view/${item?.form_slug}`}
                  className="cursor-pointer text-theme"
                >
                  {item?.title ?? ""}
                </Link>
              ),
              created_by: item?.created_by ?? "",
              created: validations.formateISODateToLocaleString(
                item?.created ?? ""
              ),
              link: (
                <Stack direction="row" spacing={1} className="items-center">
                  <a
                    href={`${window.location?.origin}/intake/${item?.form_slug}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    View Form
                  </a>

                  <IconButton
                    className="[&.MuiIconButton-root]:bg-[#71757B]/20 text-xs p-1"
                    onClick={(e) =>
                      handleCopy(
                        e,
                        item.id,
                        `${window.location?.origin}/intake/${item?.form_slug}`
                      )
                    }
                  >
                    <Tooltip
                      title="Copied"
                      open={clipboard?.copied && item.id === copiedText}
                      placement="left"
                    >
                      <CopyLink
                        fontSize="inherit"
                        className="[&.MuiSvgIcon-root]:w-4 [&.MuiSvgIcon-root]:h-4 -rotate-45"
                      />
                    </Tooltip>
                  </IconButton>
                </Stack>
              ),
              version: item?.max_version ?? "",
              responses: item?.responses ?? "",

              action: (
                <ActionMenuButton
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  setAnchorEl={setOpenActionMenu}
                  anchorEl={openActionMenu}
                  handleEdit={() => handleEdit(item)}
                  // handleDelete={() => handleDelete(item)}
                  // showDelete={true}
                  showEdit={true}
                  isEditMode={isEditMode}
                  item={{ id: item?.id, isActive: item?.is_active }}
                  showView={true}
                  handleView={() => handleView(item)}
                />
              ),
            };
          })
        : [],
  };
  //   Handle Evenets

  // To handle search filter change
  const handleFilterChange = ({ target: { name, value } }) => {
    setFilterData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="page-container p-[20px]">
      <h4 className="page-title text-[26px]">Intake Forms</h4>
      <div className="p-0 page-card new-card">
        <div className="flex flex-wrap p-[15px] pb-[20px]">
          <SearchInput
            searchVal={filterData.search}
            handleFilterChange={handleFilterChange}
          />

          <div className="ml-auto savebtn Categorybtn">
            <Link
              to={`/intake/create`}
              className="w-full h-full btn btn-primary"
            >
              {" "}
              + Create Form
            </Link>
          </div>
        </div>
        <Custom_MUI_Table
          loader={intakeFormLoader}
          data={tabelRowColData}
          allData={formList || []}
          paginationData={paginationData}
          setPaginationData={setPaginationData}
        />
      </div>
    </div>
  );
};

export default AgencyIntakeForms;
