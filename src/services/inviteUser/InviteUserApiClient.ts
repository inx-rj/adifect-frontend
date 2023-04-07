import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

const userData = () => JSON.parse(localStorage.getItem("userData") ?? '');

class InviteUserApiClient {
  // get invited users list
  getInviteUsers = ({ rowsPerPage, page }) =>
    axiosPrivate.get(`${API_URL.INVITE.INVITE_USERS}`, {
      params: { page_size: rowsPerPage, page },
    });

  //get comapnies list
  getCompaniesList = () =>
    axiosPrivate.get(`${API_URL.COMPANY.COMPANY_LIST}`, {
    });

  //add invite user
  addInviteUser = (postObj) => {
    const payload = {
      ...postObj,
      agency: userData()?.user.user_id
    }
    return axiosPrivate.post(`${API_URL.INVITE.INVITE_USERS}`, payload, {
    });
  }

  //update invite user
  updateInviteUser = (id, payload) => {
    return axiosPrivate.put(`${API_URL.INVITE.INVITE_USERS}${id}/`, payload)
  }

  //update invite user
  deleteInviteUser = (id) => {
    return axiosPrivate.delete(`${API_URL.INVITE.INVITE_USERS}${id}/`, {
    });
  }
}

export default new InviteUserApiClient();