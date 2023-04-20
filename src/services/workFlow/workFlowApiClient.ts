import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";

class WorkFlowTabApiClient {
  //fetch workflow list
  fetchWorkFlowList = (filters: any, endpoint: string) =>
    axiosPrivate.get(endpoint + setQueryParams(filters));

  //Add a new workflow entry
  addSingleWorkFlow = (payload: any, endpoint: string) => {
    return axiosPrivate.post(endpoint, payload);
  };

  //Update a workflow entry
  updateSingleWorkFlow = (id: number, payload: any, endpoint: string) => {
    return axiosPrivate.put(`${endpoint}${id}/`, payload);
  };

  //Delete a workflow entry
  deleteSingleWorkFlow = (id: number, endpoint: string) => {
    return axiosPrivate.delete(`${endpoint}${id}/`);
  };
}

export default new WorkFlowTabApiClient();
