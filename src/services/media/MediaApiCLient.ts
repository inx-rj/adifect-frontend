import axiosPrivate from "../../api/axios";
import { API_URL, BASE_URL } from "../../helper/env";

class MediaApiClient {
	// Creative Code table data list
	fetchDamMedia = (id: number | string) => axiosPrivate.get(`${API_URL.MEDIA.DAM_MEDIA}get_multiple?id=${id}`);

	//Get Recent file data
	fetchRecentFileData = () => axiosPrivate.get(`${BASE_URL.MEDIA}super-admin-dam-media/latest_records/`);

	//Get Folder data
	fetchFileManagerData = (id: number) =>
		axiosPrivate.get(`${BASE_URL.MEDIA}super-admin-dam-root/?type=${id}&ordering=-created`);
}

export default new MediaApiClient();
