import { lazy, useState } from 'react';
import { Link } from 'react-router-dom';

//import redux
import { useAppDispatch, useAppSelector } from 'redux/store';
import { COMPANY_LIST } from 'redux/reducers/companyTab/companyTab.slice';
import { GET_USER_PROFILE_DATA } from 'redux/reducers/auth/auth.slice';
import { useUpdateEffect } from 'react-haiku';
import { GET_COMPANY_LIST } from 'redux/actions/companyTab/companyTab.actions';

//import helper files
import { API_URL } from 'helper/env';
import { getUserLevel } from 'helper/utility/customFunctions';
import { Images } from 'helper/images';
import { TablePaginationType, TableRowColType } from 'helper/types/muiTable/muiTable';

//import MUI components and icons
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import LoadingSpinner from 'components/common/loadingSpinner/Loader';
import { initialTableConfigInterface } from 'helper/types/common/tableType';

//import custom components
const SearchBar = lazy(() => import('components/common/searchBar/SearchBar'));
const MuiCustomTable = lazy(() => import('components/common/muiTable/MuiTable'));
const AddCompanyPopup = lazy(() => import('components/common/companyPopup/AddCompanyPopup'));

const CompaniesTab = () => {
  const dispatch = useAppDispatch();

  const { companyList } = useAppSelector(COMPANY_LIST);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  const [openModal, setOpenModal] = useState(false);
  const [tableFilters, setTableFilters] = useState<initialTableConfigInterface>({
    page: 1,
    rowsPerPage: 10,
    search: ''
  });

  //fetch company list when pagination change
  useUpdateEffect(() => {
    dispatch(GET_COMPANY_LIST(tableFilters, `${API_URL.COMPANY.COMPANY_LIST}`));
  }, [tableFilters]);

  const data: TableRowColType = {
    columns: [
      {
        id: 1,
        label: (
          <label className="flex items-center">
            Company
            <img className="ml-2" src={Images.SortArrows} alt="Title" />
          </label>
        ),
        field: 'company',
        sort: 'asc',
        width: 180
      },
      {
        id: 2,
        label: (
          <label className="flex items-center">
            Role
            <img className="ml-2" src={Images.SortArrows} alt="title" />
          </label>
        ),
        field: 'role',
        sort: 'asc',
        width: 180
      },
      {
        id: 4,
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 100
      }
    ],

    rows:
      companyList?.data?.results?.length > 0
        ? companyList?.data.results?.map((item, index) => {
            return {
              company: (
                <div key={index}>
                  <Typography
                    sx={{
                      '&.MuiTypography-root': {
                        display: 'inline-block',
                        fontFamily: '"Figtree", sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        p: 0
                      }
                    }}
                  >
                    {item?.name}
                  </Typography>
                </div>
              ),
              role: (
                <Typography
                  sx={{
                    '&.MuiTypography-root': {
                      display: 'inline-block',
                      fontFamily: '"Figtree", sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      p: 0
                    }
                  }}
                >
                  {getUserLevel(userProfile?.data?.user_level)}
                </Typography>
              ),
              action: (
                <Link to={`/company/${item.id}`}>
                  <RemoveRedEyeOutlinedIcon fontSize="small" />
                </Link>
              )
            };
          })
        : []
  };

  return (
    <div className="card drop-shadow-none border p-4 z-[1]">
      <h5 className="mb-4 text-base card-page-title">Companies</h5>
      <p className="text-sm card-page-info">These are all the companies you're a member of.</p>
      <div className="flex-wrap pb-5 flex-between gap-2">
        <SearchBar setTableFilters={setTableFilters} tableFilters={tableFilters} />
        <button
          type="submit"
          onClick={() => setOpenModal(true)}
          className="btn btn-primary btn-label bg-primary flex items-center px-[15px] py-[9px] max-w-[155px] w-full flex-center gap-2"
        >
          <AddOutlined />
          <span className="btn-label">Add Company</span>
        </button>
      </div>
      <MuiCustomTable
        loader={companyList?.loading}
        data={data}
        allData={companyList?.data}
        tableFilters={tableFilters}
        setTableFilters={setTableFilters}
      />
      <AddCompanyPopup setOpenModal={setOpenModal} openModal={openModal} />
    </div>
  );
};

export default CompaniesTab;
