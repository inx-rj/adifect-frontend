import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "helper/env";

class InHouseUserApiClient {
  //fetch In House User List
  fetchInHouseUserList = (companyId, endpoint) =>
    axiosPrivate.get(`${endpoint}?company=${companyId}`);
}

export default new InHouseUserApiClient();
