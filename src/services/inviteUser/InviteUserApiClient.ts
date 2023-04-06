import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

const userData = () => JSON.parse(localStorage.getItem("userData") ?? '');

class InviteUserApiClient {
  // get invited users list
  getInviteUsers = ({ rowsPerPage, page }) =>
    axiosPrivate.get(`${API_URL.INVITE.INVITE_USERS}`, {
      headers: {
        Authorization: `Bearer ${userData()?.token}`,
      },
      params: { page_size: rowsPerPage, page },
    });

  //get comapnies list
  getCompaniesList = () =>
    axiosPrivate.get(`${API_URL.COMPANY.COMPANY_LIST}`, {
      headers: {
        Authorization: `Bearer ${userData()?.token}`,
      },
    });

  addInviteUser = (postObj) => {
    const payload = {
      ...postObj,
      agency: userData()?.user.user_id
    }
    return axiosPrivate.post(`${API_URL.INVITE.INVITE_USERS}`, payload, {
      headers: {
        Authorization: `Bearer ${userData()?.token}`,
      },
    });
  }

  deleteInviteUser = (id) => {
    return axiosPrivate.delete(`${API_URL.INVITE.INVITE_USERS}/${id}`, {
      headers: {
        Authorization: `Bearer ${userData()?.token}`,
      },
    });
  }
}

export default new InviteUserApiClient();