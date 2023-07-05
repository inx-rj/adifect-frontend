import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "helper/env";

class WorkFlowTabApiClient {
  //fetch workflow list
  fetchWorkFlowList = (filters: any, endpoint: string) =>
    axiosPrivate.get(endpoint + setQueryParams(filters));

  fetchCompanyWorkFlowList = (endpoint, filter) =>
    axiosPrivate.get(`${endpoint}` + setQueryParams(filter));

  //fetch main workflow details
  fetchMainWorkFlowDetails = (workflowId: any) =>
    axiosPrivate.get(`${API_URL.WORKFLOW.WORKFLOW_LIST}${workflowId}/`);

  //fetch workflow stage details
  fetchWorkFlowStageDetails = (workflowId) =>
    axiosPrivate.get(
      `${API_URL.WORKFLOW.WORKFLOW_STAGES}?workflow=${workflowId}`
    );

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

  //Delete a workflow stage entry
  deleteSingleWorkFlowStage = (id: number, endpoint: string) => {
    return axiosPrivate.delete(`${endpoint}${id}/`);
  };
}

export default new WorkFlowTabApiClient();
