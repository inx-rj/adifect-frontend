import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";


class IndustryTabApiClient {
  //fetch Industry list
  fetchIndustryList = (filters: any, endpoint: string) =>
    axiosPrivate.get(endpoint + setQueryParams(filters));

  //Add a new Industry entry
  addSingleIndustry = (payload: any, endpoint: string) => {
    return axiosPrivate.post(endpoint, payload);
  }



}

export default new IndustryTabApiClient();