import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class InviteUserApiClient {
  // get invited users list
  fetchInviteUsers = (filters: any) =>
    axiosPrivate.get(
      `${API_URL.INVITE.INVITE_USERS}` + setQueryParams(filters)
    );

  // get workflow invited users list
  fetchWorkflowInviteUsers = (id: any) =>
    axiosPrivate.get(
      `${API_URL.INVITE.INVITE_MEMBERS_LIST}?company=${id ?? ""}`
    );

  // get job activity invited users list
  fetchJobActivityInviteUsers = (id: number | string) =>
    axiosPrivate.get(`${API_URL.INVITE.JOB_ACTIVITY_USER}${id}/`);

  // get invited members list
  fetchInviteMembersList = (filters: any) =>
    axiosPrivate.get(
      `${API_URL.INVITE.INVITE_MEMBERS_LIST}?level=${
        filters.level ?? ""
      }&company=${filters.company ?? ""}`
    );

  //add invite user
  addInviteUser = (postObj: any, userRole) => {
    const payload = {
      ...postObj,
      agency: userRole,
    };
    return axiosPrivate.post(`${API_URL.INVITE.INVITE_USERS}`, payload);
  };

  //update invite user
  updateInviteUser = (id: number, payload: any) => {
    return axiosPrivate.put(`${API_URL.INVITE.INVITE_USERS}${id}/`, payload);
  };

  //delete invite user
  deleteInviteUser = (id: number) => {
    return axiosPrivate.delete(`${API_URL.INVITE.INVITE_USERS}${id}/`);
  };

  // Register invited user
  registerInviteUser = (data: any, inviteId: string, exclusive: string) =>
    axiosPrivate.post(
      `${API_URL.INVITE.INVITE_USER_REGISTER}${inviteId}/${exclusive}`,
      data,
      {
        headers: {
          Authorization: "",
        },
      }
    );

  fetchInviteStatus = (
    decodeId: string,
    inviteCode: string,
    exclusive: string
  ) =>
    axiosPrivate.get(
      `${API_URL.INVITE.INVITE_STATUS}${decodeId}/${inviteCode}/${exclusive}`
    );
}

export default new InviteUserApiClient();
