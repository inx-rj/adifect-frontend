import { VisibilityOutlined } from '@mui/icons-material';
import { MenuItem, Tab, Tabs, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { env } from 'helper/env';
import GenericForm from '../global/GlobalForm';
import axiosPrivate from 'api/axios';
import MuiTable from 'components/common/muiTable/MuiTable';
import LoadingSpinner from 'components/common/loadingSpinner/Loader';
import { useSingleEffect } from 'react-haiku';
import { formateISODateToLocaleString } from 'helper/validations';
import { FormFieldT } from 'helper/types/intakeForm/FormFieldsType';
import { INTAKE_FORMS_ROUTE, PAGE_ROUTE } from 'routes/baseRoute';

const IntakeFormResponseList = () => {
  const { formName } = useParams();
  const [formField, setFormField] = useState<FormFieldT>();
  const [activeTab, setActiveTab] = useState('responses');
  const [intakeFormLoader, setIntakeFormLoader] = useState(true);
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    rowsPerPage: 10
  }); // pagination params state
  const [currentVersion, setCurrentVersion] = useState(formField?.intake_form?.['max_version']);
  const [versionList, setVersionList] = useState(formField?.intake_form?.['version']);

  const [filterData, setFilterData] = useState({
    ordering: '-created', // Desc (Latest Created/Submitted first)
    search: '',
    version: currentVersion
  }); // for API query param

  const [formResponse, setFormResponse] = useState<any>();

  const fetchFormDetails = async (resVersion?) => {
    console.log('resVersion', resVersion);
    axiosPrivate
      .get(`${env.API_URL}intake-forms/fields/${formName}/`, {
        params: {
          version: currentVersion ?? null
        }
      })
      .then(res => {
        setFormField(res?.data?.data);
        !resVersion && setCurrentVersion(res?.data?.data?.intake_form?.max_version);
        setVersionList(res?.data?.data?.intake_form?.version);
        fetchIntakeFormsResponse(resVersion ?? res?.data?.data?.intake_form?.max_version);
      })
      .catch(err => {
        // console.log(err, "Channel Error");
      })
      .finally(() => {
        setIntakeFormLoader(false);
      });
  };

  useSingleEffect(() => {
    fetchFormDetails();
  });

  const fetchIntakeFormsResponse = async (version?) => {
    axiosPrivate
      .get(`${env.API_URL}intake-forms/responses/${formName}/`, {
        params: {
          ...filterData,
          version: version,
          page_size: tableFilters.rowsPerPage,
          page: tableFilters.page
        }
      })
      .then(res => {
        setFormResponse(res?.data?.data?.results);
        setIntakeFormLoader(false);
      })
      .catch(err => {
        // console.log(err, "Channel Error");
      });
  };

  useEffect(() => {
    if (currentVersion) {
      fetchFormDetails(currentVersion);
    }
  }, [currentVersion]);

  // Table Row-Columns data
  const intakeFormTableColumn = [
    {
      id: 1,
      label: (
        <label className="flex items-center cursor-pointer">
          Submitter Name
          <img
            className={`${
              filterData['ordering']?.includes('-submitter_name') ? 'sort_des_icon' : 'sort_asc_icon'
            } ml-1`}
            src="/img/sort_arrows.png"
            alt="Title"
          />
        </label>
      ),
      field: 'submitter_name',
      sort: 'asc',
      width: 100
    },
    {
      id: 2,
      label: (
        <label className="flex items-center cursor-pointer">
          Submitter Email
          <img
            className={`${
              filterData['ordering']?.includes('-submitter_email') ? 'sort_des_icon' : 'sort_asc_icon'
            } ml-1`}
            src="/img/sort_arrows.png"
            alt="Title"
          />
        </label>
      ),
      field: 'submitter_email',
      sort: 'asc',
      width: 150
    },
    {
      id: 3,
      label: (
        <label className="flex items-center cursor-pointer">
          Submission Date
          <img
            className={`${filterData['ordering']?.includes('-created') ? 'sort_des_icon' : 'sort_asc_icon'} ml-1`}
            src="/img/sort_arrows.png"
            alt="Title"
          />
        </label>
      ),
      field: 'created',
      sort: 'asc',
      width: 200
    },
    {
      id: 4,
      label: 'Action',
      field: 'action',
      sort: 'asc',
      width: 100
    }
  ];

  const tabelRowColData = {
    columns: intakeFormTableColumn,
    rows:
      formResponse?.length > 0
        ? formResponse?.map((item, index) => {
            return {
              submitted_user__first_name: (
                <Link to={`${PAGE_ROUTE.INTAKE_FORMS}/responses/${item?.id}`}>
                  {item?.submitted_user__first_name ?? 'No submitter'}
                </Link>
              ),
              submitted_user__email: (
                <Link to={`${PAGE_ROUTE.INTAKE_FORMS}/responses/${item?.id}`}>
                  {item?.submitted_user__email ?? 'No submitter email'}
                </Link>
              ),
              submissiondate: formateISODateToLocaleString(item?.created ?? ''),
              action: (
                <Link to={`${PAGE_ROUTE.INTAKE_FORMS}/responses/${item?.id}`}>
                  <VisibilityOutlined />
                </Link>
              )
            };
          })
        : []
  };

  //   Handle Events
  const triggerTabChange = (event, newValue) => {
    // console.log("newValue", newValue);
    setActiveTab(newValue);
  };

  const sortDataColWise = field => {
    const toggleSorting = filterData.ordering.includes('-') ? field.replace('-', '') : `-${field}`;

    setFilterData({ ...filterData, ordering: toggleSorting });
  };

  useEffect(() => {
    if (filterData.ordering) {
      fetchIntakeFormsResponse().then(r => r);
    }
  }, [filterData]);

  const versionListDropDown = versionList?.map((version, index) => {
    return {
      value: version,
      label: version
    };
  });

  return (
    <>
      {intakeFormLoader ? (
        <LoadingSpinner />
      ) : (
        <div className="page-container p-[20px]">
          <div className="p-0 page-card new-card">
            <div className="flex items-center justify-between ">
              <div>
                <Tabs value={activeTab} onChange={triggerTabChange} className="mb-[20px]">
                  <Tab label="Responses" value="responses" />
                  <Tab label="Forms" value="forms" />
                </Tabs>
              </div>
              <div className="max-w-[10%] w-full mr-5 my-3 input-fields-wrapper">
                <TextField
                  id="field-type"
                  name="field_type"
                  select
                  label="Version"
                  placeholder="Version"
                  fullWidth
                  onChange={e => {
                    setCurrentVersion(e.target.value);
                  }}
                  value={currentVersion}
                >
                  {versionListDropDown?.map(option => (
                    <MenuItem key={option.value} value={option.value} selected={currentVersion === option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="min-h-[500px]">
              {activeTab === 'forms' && (
                <div className="px-[20px] pb-[20px] min-h-[450px]">
                  {intakeFormLoader && <LoadingSpinner />}
                  <div className="max-w-[530px] wi-full">
                    <GenericForm genericForm={formField?.data} previewMode />
                  </div>
                </div>
              )}
              {activeTab === 'responses' && (
                <MuiTable
                  loader={intakeFormLoader}
                  data={tabelRowColData}
                  allData={formResponse || []}
                  tableFilters={tableFilters}
                  setTableFilters={setTableFilters}
                  handleSorting={sortDataColWise}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IntakeFormResponseList;
