import { lazy, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSingleEffect, useUpdateEffect } from 'react-haiku';

//import MUI components and icons
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

//import helper files
import { TableRowColType, TablePaginationType } from 'helper/types/muiTable/muiTable';
import { Images } from 'helper/images';
import { formateISODateToLocaleString } from 'helper/utility/customFunctions';
import { API_URL } from 'helper/env';
import { ROLES } from 'helper/config';

//import redux
import { useAppDispatch, useAppSelector } from 'redux/store';

import { GET_USER_PROFILE_DATA } from 'redux/reducers/auth/auth.slice';
import { GET_HELP_LIST } from 'redux/actions/help/help.action';
import { HELP_LIST } from 'redux/reducers/help/help.slice';
import Roles from 'helper/config/Roles';
import { initialTableConfigInterface } from 'helper/types/common/tableType';

//import custom component
const MuiCustomTable = lazy(() => import('components/common/muiTable/MuiTable'));
const SearchBar = lazy(() => import('components/common/searchBar/SearchBar'));
const ActionMenuButton = lazy(() => import('components/common/actionMenuButton/ActionMenuButton'));

const HelpList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redux states
  const { helpList } = useAppSelector(HELP_LIST);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  // React states
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState<{
    currentTooltip: null | number;
    currentId: null | number;
  }>({
    currentTooltip: null,
    currentId: null
  });

  const [tableFilters, setTableFilters] = useState<initialTableConfigInterface>({
    page: 1,
    rowsPerPage: 10,
    search: ''
  });

  //fetch initial companies data list
  useSingleEffect(() => {
    dispatch(
      GET_HELP_LIST(
        tableFilters,
        userProfile?.data?.role === ROLES.ADMIN ? `${API_URL.HELP.ADMIN_HELP_LIST}` : `${API_URL.HELP.HELP_LIST}`
      )
    );
  });

  //fetch company list when pagination change
  useUpdateEffect(() => {
    dispatch(
      GET_HELP_LIST(
        tableFilters,
        userProfile?.data?.role === ROLES.ADMIN ? `${API_URL.HELP.ADMIN_HELP_LIST}` : `${API_URL.HELP.HELP_LIST}`
      )
    );
  }, [tableFilters, userProfile.data?.role]);

  //handle view action
  const handleView = item => {
    navigate(`/help/view-message/${item.id}`);
    setAnchorEl(null);
  };

  //prepare table data
  let columns = [
    {
      id: 1,
      label: (
        <label className="flex items-center">
          Subject
          <img className="ml-2" src={Images.SortArrows} alt="Title" />
        </label>
      ),
      field: 'name',
      sort: 'asc'
      // width: 180,
    },
    {
      id: 2,
      label: (
        <label className="flex items-center">
          Modified At
          <img className="ml-2" src={Images.SortArrows} alt="title" />
        </label>
      ),
      field: 'createdAt',
      sort: 'asc'
      // width: 180,
    },
    {
      id: 3,
      label: 'Action',
      field: 'action',
      sort: 'asc'
      // width: 100,
    }
  ];

  let rows: {
    title: JSX.Element;
    createdAt: string;
    action: JSX.Element;
  }[] =
    helpList?.data?.results?.length > 0
      ? helpList?.data.results?.map((item, index) => {
          return {
            title: (
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
                  {item?.subject}
                </Typography>
              </div>
            ),
            createdAt: formateISODateToLocaleString(item?.created),
            action: (
              <ActionMenuButton
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                handleView={() => handleView(item)}
                showSetting={false}
                showView={true}
                showEdit={false}
                showInActive={false}
                isEditMode={false}
                item={{ id: item?.id, isActive: item?.is_active }}
              />
            )
          };
        })
      : [];

  //final table data
  const data: TableRowColType = {
    columns,
    rows
  };

  return (
    <div className="page-container">
      <div className="flex-between">
        <h4 className="font-bold text-xl">Adifect Help Page</h4>
        <div className="flex-between gap-[10px] font-sm leading-4 font-medium text-primary">
          <Link to="/">
            <HomeIcon color="disabled" />
          </Link>
          <span className="text-disable opacity-20">|</span>
          <Link to="/help/">help</Link>
        </div>
      </div>
      <div className="page-card">
        <div className="flex-between flex-wrap p-[15px] pb-5">
          <SearchBar setTableFilters={setTableFilters} tableFilters={tableFilters} />
          {userProfile.data.role !== Roles.ADMIN && (
            <button
              type="submit"
              onClick={() => navigate('/help/add')}
              className="btn btn-primary btn-label bg-primary flex items-center px-[15px] py-[9px] max-w-[155px] w-full flex-center gap-2"
            >
              <AddIcon />
              <span className="btn-label"> Help </span>
            </button>
          )}
        </div>

        <MuiCustomTable
          loader={helpList?.loading}
          data={data}
          allData={helpList?.data}
          tableFilters={tableFilters}
          setTableFilters={setTableFilters}
        />
      </div>
    </div>
  );
};

export default HelpList;
