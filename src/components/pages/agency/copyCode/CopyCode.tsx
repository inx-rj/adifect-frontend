import React, { useState } from 'react';
import { Box } from '@mui/material';
import swal from 'sweetalert';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { COMPANY_PROJECTS_FILTERS_DATA } from 'redux/reducers/companies/companies.slice';
import { GET_COMPANY_PROJECTS_FILTERS_LIST } from 'redux/actions/companies/companies.actions';
import ActionMenuButton from 'components/common/actionMenuButton/ActionMenuButton';
import { isEmpty } from 'helper/utility/customFunctions';
import MuiTable from 'components/common/muiTable/MuiTable';
import CustomAddCopyCodeModal from './CustomAddModal/CustomAddCopyCodeModal';
import MuiPopup from 'components/common/muiPopup/MuiPopup';
import {
  CREATE_COPY_CODE_LIST,
  DELETE_COPY_CODE_LIST,
  GET_COPY_CODE_LIST,
  UPDATE_COPY_CODE_LIST
} from 'redux/actions/copyCode/copyCode.actions';
import {
  COPY_CODE_DATA,
  COPY_CODE_RESPONSE,
  SET_COPY_CODE_EDIT_DATA,
  SET_COPY_CODE_LOADING,
  SET_CREATE_COPY_CODE
} from 'redux/reducers/companies/copyCode.slice';
import { useSingleEffect, useUpdateEffect } from 'react-haiku';
import { Images } from 'helper/images';
import { Add } from '@mui/icons-material';
import { TableRowsType } from 'helper/types/muiTable/muiTable';

const CopyCode = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const agencyCompanyProjectsFiltersList = useAppSelector(COMPANY_PROJECTS_FILTERS_DATA);
  const programsList = useAppSelector(COPY_CODE_DATA);
  const success = useAppSelector(COPY_CODE_RESPONSE);

  // React states
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    rowsPerPage: 10
  }); // pagination params state
  const [filterData, setFilterData] = useState({ search: '' }); // filter params state
  const [showTagModal, setShowTagModal] = useState(false); // Add Programs modal state
  const [formData, setFormData] = useState({
    title: undefined,
    subject_line: undefined,
    body: undefined,
    notes: undefined
  }); // Add Program modal fields state
  const [errors, setErrors] = useState({
    title: null,
    subject_line: null,
    body: null,
  }); // Add Program modal fields error state
  const [selectedOption, setSelectedOption] = useState({
    label: '',
    value: ''
  }); // Community dropdown state for 'Add Program' modal
  const [searchText, setSearchText] = useState(''); // Community dropdown search state

  // Action Menu button states
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    currentTooltip: null,
    currentId: null
  });

  // Community, Story, Tag fetch list API call
  useSingleEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_FILTERS_LIST());
    dispatch(GET_COPY_CODE_LIST({ ...tableFilters, ...filterData }));
  });

  //set the edit mode
  const handleEdit = (item: TableRowsType) => {
    setShowTagModal(true);
    setIsEditMode(true);
    setErrors({
      title: null,
      subject_line: null,
      body: null,
    });
    setSelectedItem({ ...selectedItem, currentId: item?.id });
    setSelectedOption({
      label: item?.community?.name,
      value: item?.community?.id
    });

    setFormData({
      title: item?.title,
      subject_line: item?.subject_line,
      body: item?.body,
      notes: item?.notes
    });
  };

  //handle delete action
  const handleDelete = (item: TableRowsType) => {
    swal({
      title: 'Warning',
      text: `Are you sure you want to remove this ${item?.title}?`,
      className: 'errorAlert',
      icon: Images.ErrorLogo,
      buttons: {
        Cancel: true,
        OK: true
      },
      dangerMode: true
    }).then(willDelete => {
      if (willDelete !== 'Cancel') {
        dispatch(DELETE_COPY_CODE_LIST(item?.id)).then((r: void) => r);
      }
    });
    setAnchorEl(null);
    setSelectedItem({ currentId: null, currentTooltip: null });
  };

  // To handle filter change
  const handleFilterChange = ({ target: { name, value } }) => {
    setFilterData(prevState => {
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
        field: 'programTitle',
        sort: 'asc',
        width: 300
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            Subject Line
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'subLine',
        sort: 'asc',
        width: 300
      },
      {
        id: 3,
        label: (
          <label className="flex items-center">
            Body
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'body',
        sort: 'asc',
        width: 300
      },
      {
        id: 4,
        label: (
          <label className="flex items-center">
            Notes
            <img className="ml-1" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'notes',
        sort: 'asc',
        width: 300
      },
      {
        id: 5,
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 100
      }
    ],

    rows:
      programsList?.data?.results?.length > 0
        ? programsList?.data?.results?.map((item: TableRowsType, index) => {
            return {
              tite: item.title ?? '',

              subLine: item.subject_line ?? '',

              body: item.body ?? '',

              notes: item.notes ?? '',

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
              )
            };
          })
        : []
  };

  // Copy code fetch list API call
  useUpdateEffect(() => {
    dispatch(GET_COPY_CODE_LIST({ ...tableFilters, ...filterData }));
  }, [tableFilters, filterData]);

  // Reset modal fields and errors state
  const resetModalData = () => {
    setErrors({
      title: null,
      subject_line: null,
      body: null,
    });
    setFormData({
      title: undefined,
      subject_line: undefined,
      body: undefined,
      notes: undefined
    });
    setShowTagModal(!showTagModal);
    setSelectedOption(null);
  };

  //validate inputs
  const validateSubmit = e => {
    e.preventDefault();
    const tempErrors = {
      title: isEmpty(formData.title) ? "Title is required" : "",
      subject_line: isEmpty(formData.subject_line)
        ? "Subject line is required"
        : "",
      body: isEmpty(formData.body) ? "Body is required" : "",
      // notes: isEmpty(formData.notes) ? "Notes is required" : "",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter(value => value).length) {
      return;
    }
    submitHandler();
  };
  // Submit the 'Add Copy Code' modal
  const submitHandler = () => {
    if (formData.title) {
      // API call
      if (isEditMode) {
        dispatch(UPDATE_COPY_CODE_LIST(selectedItem?.currentId, formData))
          .then(res => {
            swal({
              title: 'Successfully Complete',
              text: 'Successfully Saved!',
              className: 'successAlert-login',
              icon: Images.Logo,
              buttons: {
                OK: false
              },
              timer: 1500
            });
            dispatch(SET_COPY_CODE_EDIT_DATA(res?.data?.message));
            dispatch(SET_COPY_CODE_LOADING(false));
            resetModalData();
          })
          .catch(err => {
            swal({
              title: 'Error',
              text: err.response.data.message?.length
                ? err.response.data.message
                : JSON.stringify(err.response.data.message),
              className: 'errorAlert',
              icon: Images.ErrorLogo,
              buttons: {
                OK: false
              },
              timer: 5000
            });
            dispatch(SET_COPY_CODE_LOADING(false));
          });
      } else {
        dispatch(CREATE_COPY_CODE_LIST(formData))
          .then(res => {
            swal({
              title: 'Successfully Complete',
              text: 'Successfully Saved!',
              className: 'successAlert-login',
              icon: Images.Logo,
              buttons: {
                OK: false
              },
              timer: 1500
            });
            dispatch(SET_CREATE_COPY_CODE(res?.data?.message));
            dispatch(SET_COPY_CODE_LOADING(false));
            resetModalData();
          })
          .catch(err => {
            swal({
              title: 'Error',
              text: err.response.data.message?.length
                ? err.response.data.message
                : JSON.stringify(err.response.data.message),
              className: 'errorAlert',
              icon: Images.ErrorLogo,
              buttons: {
                OK: false
              },
              timer: 5000
            });
            dispatch(SET_COPY_CODE_LOADING(false));
          });
      }
    }
  };

  // Clears the error when the community dropdown option is selected
  useUpdateEffect(() => {
    if (!isEmpty(selectedOption?.['label'] || selectedOption)) {
      setErrors({
        title: null,
        subject_line: null,
        body: null,
      });
    }
  }, [selectedOption]);

  // Fetch Copy Code updated List on Add, Edit and Delete
  useUpdateEffect(() => {
    if (success.add || success.update || success.delete) {
      dispatch(GET_COPY_CODE_LIST({ ...tableFilters, ...filterData }));
    }
  }, [success]);

  return (
    <>
      <div className="page-container">
        <h1 className="page-title">Copy Code</h1>

        <div className="page-card new-card p-0">
          <div className="page-filters-bar">
            <Box
              sx={{
                '& input': {
                  width: '335px',
                  height: '49px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '0 11px'
                }
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
                onClick={e => {
                  setShowTagModal(true);
                }}
                // disabled={true}
              >
                {' '}
                <Add />
                Add Copy Code
              </button>
            </div>
          </div>

          <MuiPopup
            dialogTitle="Add Copy Code"
            textAlign="left"
            dialogContent={
              <CustomAddCopyCodeModal
                communityOptions={
                  agencyCompanyProjectsFiltersList?.data?.community ? agencyCompanyProjectsFiltersList : []
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
            tableFilters={tableFilters}
            setTableFilters={setTableFilters}
          />
        </div>
      </div>
    </>
  );
};

export default CopyCode;
