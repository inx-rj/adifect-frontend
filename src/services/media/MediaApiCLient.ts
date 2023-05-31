import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class MediaApiClient {
  // Creative Code table data list
  fetchDamMedia = (id: number | string) =>
    axiosPrivate.get(`${API_URL.MEDIA.DAM_MEDIA}get_multiple?id=${id}`);
}

export default new MediaApiClient();
