import { setQueryParams } from 'helper/utility/customFunctions';
import axiosPrivate from '../../api/axios';
import { BASE_URL } from '../../helper/env';
import { initialTableConfigInterface } from 'helper/types/common/tableType';

class UsersListApiClient {
  // audience table data list
  fetchUsersList = (filters: initialTableConfigInterface) =>
    axiosPrivate.get(`${BASE_URL.USERS_LIST}` + setQueryParams(filters));
}

export default new UsersListApiClient();
