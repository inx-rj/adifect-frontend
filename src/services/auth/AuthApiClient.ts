import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { EmailPWDType } from "../../helper/types";

class AuthApiClient {

  // User Registration
  register = (data: any) =>
    axiosPrivate.post(`${API_URL.AUTH.REGISTER}/`, data, {
      headers: {
        Authorization: "",
      },
    });

  // User Login
  login = (data: EmailPWDType) =>
    axiosPrivate.post(`${API_URL.AUTH.LOGIN}/`, data, {
      headers: {
        Authorization: "",
      },
    });
}

export default new AuthApiClient();