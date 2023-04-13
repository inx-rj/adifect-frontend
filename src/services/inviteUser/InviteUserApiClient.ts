import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

const userData = () => JSON.parse(localStorage.getItem("userData") ?? '');

class InviteUserApiClient {
  // get invited users list
  fetchInviteUsers = (filters: any) =>
    axiosPrivate.get(`${API_URL.INVITE.INVITE_USERS}` + setQueryParams(filters));

  //add invite user
  addInviteUser = (postObj: any) => {
    const payload = {
      ...postObj,
      agency: userData()?.user.user_id
    }
    return axiosPrivate.post(`${API_URL.INVITE.INVITE_USERS}`, payload);
  }

  //update invite user
  updateInviteUser = (id: number, payload: any) => {
    return axiosPrivate.put(`${API_URL.INVITE.INVITE_USERS}${id}/`, payload)
  }

  //delete invite user
  deleteInviteUser = (id: number) => {
    return axiosPrivate.delete(`${API_URL.INVITE.INVITE_USERS}${id}/`);
  }
}

export default new InviteUserApiClient();