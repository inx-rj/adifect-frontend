import { Button } from '@mui/material';
import ActionMenuButton from 'components/common/actionMenuButton/ActionMenuButton';
import MuiTable from 'components/common/muiTable/MuiTable';
import SearchBar from 'components/common/searchBar/SearchBar';
import { ROLES } from 'helper/config';
import { initialTableConfigInterface } from 'helper/types/common/tableType';
import { getKeyByValue } from 'helper/utility/customFunctions';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GET_USERS_LIST } from 'redux/actions/users/usersList.actions';
import { GET_USER_PROFILE_DATA } from 'redux/reducers/auth/auth.slice';
import { USER_LIST_DATA } from 'redux/reducers/users/usersList.slice';
import { useAppDispatch, useAppSelector } from 'redux/store';

const UsersList = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const UserListData = useAppSelector(USER_LIST_DATA);

  // React states
  const [tableFilters, setTableFilters] = useState<initialTableConfigInterface>({
    page: 1,
    rowsPerPage: 10,
    search: ''
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    currentTooltip: null | number;
    currentId: null | number;
  }>({
    currentTooltip: null,
    currentId: null
  });

  const openPopup = async (user_id, role, is_blocked) => {
    setSelectedItem({ ...selectedItem, currentId: user_id });
    setIsOpen(!isOpen);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  // Row-Columns data
  const data = {
    columns: [
      {
        label: 'User Name',
        field: 'user_name',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Email',
        field: 'useremail',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Register Date',
        field: 'date_joined',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Role',
        field: 'userrole',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Status',
        field: 'is_blocked',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 100
      }
    ],

    rows:
      UserListData.usersList?.results?.length > 0
        ? UserListData.usersList?.results?.map((item, index) => {
            return {
              user_name: item.username,

              useremail: item.email,

              userrole: getKeyByValue(ROLES, item.role).toLowerCase(),

              date_joined: moment(item.date_joined).format('MM-DD-yyyy hh:mm a') ?? null,

              is_blocked: (
                <Button
                  variant="contained"
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  sx={{
                    width: '80px',
                    background: !item.is_blocked ? 'rgba(32, 161, 68, 0.08)' : 'rgba(250, 45, 32, 0.08)',
                    color: !item.is_blocked ? '#20A144' : 'rgba(250, 45, 32, 1)',
                    fontSize: '12px',
                    textTransform: 'none',
                    pointerEvents: 'none'
                  }}
                >
                  {item.is_blocked ? 'Blocked' : 'Active'}
                </Button>
              ),

              action: (
                <div>
                  <ActionMenuButton
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setAnchorEl={setAnchorEl}
                    anchorEl={anchorEl}
                    handleSetting={() => openPopup(item.id, item.role, item.is_blocked)}
                    showSetting={userProfile?.data?.role === ROLES.ADMIN}
                    item={{ id: item?.id, isActive: item?.is_blocked }}
                  />
                </div>
              )
            };
          })
        : []
  };

  useEffect(() => {
    dispatch(GET_USERS_LIST(tableFilters));
  }, [tableFilters]);

  return (
    <div className="page-container">
      <h1 className="page-title">Users List</h1>

      <div className="page-card new-card p-0">
        <div className="page-filters-bar">
          <div className="ml-auto min-w-[335px]">
            <SearchBar fullWidth tableFilters={tableFilters} setTableFilters={setTableFilters} />
          </div>
        </div>

        <MuiTable
          loader={UserListData.loading}
          data={data}
          allData={UserListData.usersList}
          tableFilters={tableFilters}
          setTableFilters={setTableFilters}
        />
      </div>
    </div>
  );
};

export default UsersList;
