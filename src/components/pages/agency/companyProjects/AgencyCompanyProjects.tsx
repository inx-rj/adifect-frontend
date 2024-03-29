import { lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSingleEffect, useUpdateEffect } from 'react-haiku';
import { Button, FormControl, Typography } from '@mui/material';
import {
  GET_COMPANY_PROJECTS_FILTERS_LIST,
  GET_COMPANY_PROJECTS_LIST
} from 'redux/actions/companies/companies.actions';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { COMPANY_PROJECTS_DATA, COMPANY_PROJECTS_FILTERS_DATA } from 'redux/reducers/companies/companies.slice';
import { TableRowColType } from 'helper/types/muiTable/muiTable';
import { filterUIOptionsListType } from 'helper/types/companies/companiesType';
import { Images } from 'helper/images';
import { formateISODateToLocaleString } from 'helper/utility/customFunctions';
import SharePostToSocialMedia from 'components/common/ShareToSocialMedia/SharePostToSocialMedia';
const DropdownWithSearch = lazy(() => import('components/common/muiAutocomplete/DropdownWithSearch'));
const CustomDateRangePicker = lazy(() => import('components/common/reactDatePicker/ReactDateRangePicker'));
const MuiCustomTable = lazy(() => import('components/common/muiTable/MuiTable'));

const AgencyCompanyProjects = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const companyProjectsList = useAppSelector(COMPANY_PROJECTS_DATA);
  const companyProjectsFilters = useAppSelector(COMPANY_PROJECTS_FILTERS_DATA);

  // React states
  const [filterData, setFilterData] = useState<{ [key: string]: string }>({
    from_date: '',
    to_date: '',
    community: '',
    status: '',
    // Channel: "",
    tag: ''
  });
  const [filterArr, setFilterArr] = useState<filterUIOptionsListType[]>([]);
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    rowsPerPage: 10
  });

  //fetch filters list
  useEffect(() => {
    if (!companyProjectsFilters.data.community.length) dispatch(GET_COMPANY_PROJECTS_FILTERS_LIST());
  }, []);

  //fetch company projects list and filtered data if passed in params
  useSingleEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_LIST({ ...tableFilters, ...filterData }));
  });

  //fetch company projects list and filtered data if passed in params
  useUpdateEffect(() => {
    dispatch(GET_COMPANY_PROJECTS_LIST({ ...tableFilters, ...filterData }));
  }, [tableFilters, filterData]);

  //set selected filter
  const handleChange = (name: string, value: any) => {
    setFilterData(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  //set filters list array
  useEffect(() => {
    if (companyProjectsFilters.data) {
      const filterArr: filterUIOptionsListType[] = [
        {
          name: 'dateRange',
          label: 'Date Range',
          options: [],
          filterType: 'dateRange'
        },
        {
          name: 'community',
          label: 'Community',
          options: companyProjectsFilters.data.community,
          valueAs: 'name',
          labelAs: 'name'
        },
        {
          name: 'status',
          label: 'Status',
          options: companyProjectsFilters.data.status,
          valueAs: 'name',
          labelAs: 'name'
        },
        {
          name: 'tag',
          label: 'Tags',
          options: companyProjectsFilters.data.tag,
          valueAs: 'name',
          labelAs: 'name'
        }
        // { name: "Channel", label: "Channel", options: ["Channel"] },
      ];
      setFilterArr(filterArr);
    }
  }, [companyProjectsFilters.data]);

  const data: TableRowColType = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Story Title
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'name',
        sort: 'asc',
        width: 100
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            Community
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'community',
        sort: 'asc',
        width: 120
      },
      {
        id: 3,
        label: (
          <label className="flex items-center">
            pURL
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'pURL',
        sort: 'asc',
        width: 100
      },
      {
        id: 4,
        label: (
          <label className="flex items-center">
            Published Date
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'publishedDate',
        sort: 'asc',
        width: 160
      },
      {
        id: 5,
        label: (
          <label className="flex items-center">
            Updated Date
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'updatedDate',
        sort: 'asc',
        width: 160
      },
      {
        id: 6,
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 100
      },
      {
        id: 7,
        label: 'Channel',
        field: 'channel',
        sort: 'asc',
        width: 200
      }
    ],

    rows:
      companyProjectsList.data.results.length > 0
        ? companyProjectsList.data.results.map((data, index) => {
            return {
              name: (
                <Link to={`${data.id}`} key={index}>
                  <Typography
                    className="truncate max-w-full"
                    sx={{
                      '&.MuiTypography-root': {
                        display: 'inline-block',
                        cursor: 'pointer',
                        color: 'rgba(39, 90, 208, 1)',
                        fontSize: '14px',
                        fontWeight: 400,
                        p: 0,
                        fontFamily: '"Figtree", sans-serif'
                      }
                    }}
                  >
                    {data.title}
                    {/* {data?.community?.name} */}
                  </Typography>
                </Link>
              ),
              community: data?.community?.name,
              // community: data?.title,
              pURL: data.p_url,
              publishedDate: formateISODateToLocaleString(data.published_at ?? ''),
              updatedDate: formateISODateToLocaleString(data.updated_at ?? ''),
              status: (
                <Button
                  variant="contained"
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  sx={{
                    width: '80px',
                    padding: '7px 5px',
                    background: data.status !== 'Published' ? 'rgba(250, 45, 32, 0.08)' : 'rgba(32, 161, 68, 0.08)',
                    color: data.status !== 'Published' ? 'rgba(250, 45, 32, 1)' : '#20A144',
                    fontSize: '12px',
                    textTransform: 'capitalize',
                    '&:hover': {
                      background: 'rgba(32, 161, 68, 0.08)'
                    }
                  }}
                >
                  {data.status}
                </Button>
              ),
              channel: (
                <div className="flex gap-1.5 text-[#71757b99] tt">
                  {data?.community_channels?.map((channel_item, chIndex) => (
                    <SharePostToSocialMedia
                      key={chIndex}
                      facebook={channel_item?.channel_data?.name?.toLowerCase() === 'facebook'}
                      sms={channel_item?.channel_data?.name?.toLowerCase() === 'opnsesame'}
                    />
                  ))}
                </div>
              )
            };
          })
        : []
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Company Projects</h2>

      <div className="page-card card p-0">
        {companyProjectsFilters.loading && filterArr?.length > 0 ? (
          <div className="projectsLoaderCreatsorPage">
            {/* <LoadingSpinner /> */}
            Loading . . .
          </div>
        ) : (
          <>
            {filterArr.length > 0 && (
              <div className="page-filters-bar gap-[15px]">
                {filterArr?.map((item, index) => (
                  <FormControl key={index} sx={{ minWidth: '180px' }} size="small">
                    {item.filterType === item.name ? (
                      <CustomDateRangePicker handleChange={handleChange} containerClassName={'min-w-[250px]'} />
                    ) : (
                      <DropdownWithSearch filterList={item} handleChange={handleChange} />
                    )}
                  </FormControl>
                ))}
              </div>
            )}
          </>
        )}

        <MuiCustomTable
          loader={companyProjectsList.loading}
          data={data}
          allData={companyProjectsList.data}
          tableFilters={tableFilters}
          setTableFilters={setTableFilters}
        />
      </div>
    </div>
  );
};

export default AgencyCompanyProjects;
