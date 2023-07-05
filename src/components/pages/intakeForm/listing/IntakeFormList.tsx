import { Link as CopyLink } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { env } from 'helper/env';
import { formateISODateToLocaleString } from 'helper/validations';
import axiosPrivate from 'api/axios';
// import SearchInput from "../../../Common/searchInput/SearchInput";
import ActionMenuButton from 'components/common/actionMenuButton/ActionMenuButton';
import MuiTable from 'components/common/muiTable/MuiTable';
import { useClipboard } from 'react-haiku';
import SearchBar from 'components/common/searchBar/SearchBar';
import AddIcon from '@mui/icons-material/Add';

//import helper files
import { TableRowColType, TablePaginationType, TableDataResponseType } from 'helper/types/muiTable/muiTable';
import { Images } from 'helper/images';
import { INTAKE_FORMS_ROUTE, PAGE_ROUTE } from 'routes/baseRoute';
import { initialTableConfigInterface } from 'helper/types/common/tableType';

const AgencyIntakeForms = () => {
  // React States
  const navigate = useNavigate();
  const clipboard = useClipboard({ timeout: 2000 });
  const [formList, setFormList] = useState<TableDataResponseType>({
    count: 0,
    prev: null,
    next: null,
    results: []
  });
  const [intakeFormLoader, setIntakeFormLoader] = useState(true);
  const [filterData, setFilterData] = useState({
    search: '',
    name: '',
    version: ''
  });

  // filter params state
  const [tableFilters, setTableFilters] = useState<initialTableConfigInterface>({
    page: 1,
    rowsPerPage: 10,
    search: ''
  });

  // Action Menu button states
  const [openActionMenu, setOpenActionMenu] = React.useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null
  });
  const [copiedText, setCopiedText] = useState(null);

  const fetchIntakeForms = async () => {
    setIntakeFormLoader(true);
    axiosPrivate
      .get(`${env.API_URL}intake-forms/`, {
        params: {
          ...filterData,
          ...tableFilters,
          page_size: tableFilters.rowsPerPage,
          page: tableFilters.page
        }
      })
      .then(res => {
        setFormList(res?.data?.data);
      })
      .catch(err => {
        // console.log(err, "Channel Error");
      })
      .finally(() => {
        setIntakeFormLoader(false);
      });
  };

  useEffect(() => {
    fetchIntakeForms().then(r => r);
  }, [tableFilters, filterData]);

  //set the edit mode
  const handleEdit = item => {
    setIsEditMode(true);
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    navigate(`edit/${item?.form_slug}`);
  };

  //handle delete action
  const handleDelete = item => {
    swal({
      title: 'Warning',
      text: `Are you sure you want to remove this ${item?.title} form?`,
      className: 'errorAlert',
      icon: '/img/logonew-red.svg',
      buttons: { visible: true },
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        axiosPrivate
          .delete(`${env.API_URL}intake-forms/${item?.id}/`)
          .then(res => {
            swal({
              title: 'Successfully Complete',
              text: 'Successfully Deleted!',
              className: 'successAlert-login',
              icon: '/img/logonew.svg',
              buttons: { visible: false },
              timer: 1500
            });
            // getProgramsList();
          })
          .catch(err => {
            swal({
              title: 'Error',
              text: err.response.data.message.length ? err.response.data.message : err.response.data.message,
              className: 'errorAlert',
              icon: '/img/logonew-red.svg',
              buttons: { visible: false },
              timer: 5000
            });
          });
      }
    });
    setOpenActionMenu(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
  };

  const handleView = item => {
    navigate(`view/${item?.form_slug}`);
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
          <img className="ml-1" src={Images.SortArrows} alt="Title" />
        </label>
      ),
      field: 'title',
      sort: 'asc',
      width: 300
    },
    {
      id: 2,
      label: (
        <label className="flex items-center">
          Created By
          <img className="ml-1" src={Images.SortArrows} alt="Title" />
        </label>
      ),
      field: 'created_by',
      sort: 'asc',
      width: 200
    },
    {
      id: 3,
      label: (
        <label className="flex items-center">
          Created On
          <img className="ml-1" src={Images.SortArrows} alt="Title" />
        </label>
      ),
      field: 'created',
      sort: 'asc',
      width: 100
    },
    {
      id: 4,
      label: (
        <label className="flex items-center">
          Link
          <img className="ml-1" src={Images.SortArrows} alt="Title" />
        </label>
      ),
      field: 'link',
      sort: 'asc',
      width: 100
    },
    {
      id: 5,
      label: (
        <label className="flex items-center">
          Version
          <img className="ml-1" src={Images.SortArrows} alt="Title" />
        </label>
      ),
      field: 'max_version',
      sort: 'asc',
      width: 100
    },
    {
      id: 6,
      label: (
        <label className="flex items-center">
          Responses
          <img className="ml-1" src={Images.SortArrows} alt="Title" />
        </label>
      ),
      field: 'responses',
      sort: 'asc',
      width: 100
    },
    {
      id: 7,
      label: 'Action',
      field: 'action',
      sort: 'asc',
      width: 100
    }
  ];
  const tabelRowColData = {
    columns: intakeFormTableColumn,
    rows:
      formList?.results?.length > 0
        ? formList?.results?.map((item, index) => {
            return {
              title: (
                <Link to={`view/${item?.form_slug}`} className="cursor-pointer text-theme">
                  {item?.title ?? ''}
                </Link>
              ),
              created_by: item?.created_by ?? '',
              created: formateISODateToLocaleString(item?.created ?? ''),
              link: (
                <Stack direction="row" spacing={1} className="items-center">
                  <a href={`intake-forms/${item?.form_slug}`} target="_blank" referrerPolicy="no-referrer">
                    View Form
                  </a>

                  <IconButton
                    className="[&.MuiIconButton-root]:bg-[#71757B]/20 text-xs p-1"
                    onClick={e => handleCopy(e, item.id, `intake-forms/${item?.form_slug}`)}
                  >
                    <Tooltip title="Copied" open={clipboard?.copied && item.id === copiedText} placement="left">
                      <CopyLink
                        fontSize="inherit"
                        className="[&.MuiSvgIcon-root]:w-4 [&.MuiSvgIcon-root]:h-4 -rotate-45"
                      />
                    </Tooltip>
                  </IconButton>
                </Stack>
              ),
              version: item?.max_version ?? '',
              responses: item?.responses ?? '',

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
              )
            };
          })
        : []
  };
  //   Handle Evenets

  // To handle search filter change
  const handleFilterChange = ({ target: { name, value } }) => {
    setFilterData(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="page-container p-[20px]">
      <h4 className="page-title text-[26px]">Intake Forms</h4>
      <div className="p-0 page-card new-card">
        <div className="page-filters-bar">
          <SearchBar tableFilters={tableFilters} setTableFilters={setTableFilters} />

          <div className="ml-auto savebtn Categorybtn">
            <Link to={INTAKE_FORMS_ROUTE.CREATE_INTAKE_FORM} className="w-full h-full btn btn-primary">
              {' '}
              <AddIcon /> Create Form
            </Link>
          </div>
        </div>
        <MuiTable
          loader={intakeFormLoader}
          data={tabelRowColData}
          allData={formList}
          tableFilters={tableFilters}
          setTableFilters={setTableFilters}
        />
      </div>
    </div>
  );
};

export default AgencyIntakeForms;
