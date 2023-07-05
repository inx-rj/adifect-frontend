import { AppDispatch } from 'redux/store';
import { initialTableConfigInterface } from 'helper/types/common/tableType';
import UsersListApiClient from 'services/users/UsersListApiClient';
import { SET_USERS_LIST_DATA, SET_USERS_LIST_LOADING } from 'redux/reducers/users/usersList.slice';

// Get Audience List
const GET_USERS_LIST = (tableConfig: initialTableConfigInterface) => async (dispatch: AppDispatch) => {
  dispatch(SET_USERS_LIST_LOADING(true));
  await UsersListApiClient.fetchUsersList(tableConfig)
    .then(response => {
      dispatch(SET_USERS_LIST_DATA(response?.data?.data));
    })
    .catch(userListError => {
      console.log({ userListError });
    })
    .finally(() => {
      dispatch(SET_USERS_LIST_LOADING(false));
    });
};

// Common auth Config
export { GET_USERS_LIST };
