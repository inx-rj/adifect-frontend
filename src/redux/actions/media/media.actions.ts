import {
	SET_COLLECTION_DATA,
	SET_COLLECTION_LOADING,
	SET_FOLDER_DATA,
	SET_FOLDER_LOADING,
	SET_RECENT_FILE_DATA,
	SET_RECENT_FILE_LOADING,
} from "redux/reducers/media/media.slice";
import { AppDispatch } from "redux/store";
import MediaApiCLient from "services/media/MediaApiCLient";

const GET_RECENT_FILE_DATA = () => async (dispatch: AppDispatch) => {
	console.log("Herr1");
	try {
		await MediaApiCLient.fetchRecentFileData().then((response) => {
			dispatch(SET_RECENT_FILE_DATA(response?.data));
			dispatch(SET_RECENT_FILE_LOADING(false));
		});
	} catch (error) {
		console.log("Error", error);
	}
};

const GET_FOLDER_DATA = (type: number) => async (dispatch: AppDispatch) => {
	console.log("Herr2");
	try {
		await MediaApiCLient.fetchFileManagerData(type).then((response) => {
			dispatch(SET_FOLDER_DATA(response?.data));
			dispatch(SET_FOLDER_LOADING(false));
		});
	} catch (error) {}
};

const GET_COLLECTION_DATA = (type: number) => async (dispatch: AppDispatch) => {
	console.log("Herr2");
	try {
		await MediaApiCLient.fetchFileManagerData(type).then((response) => {
			dispatch(SET_COLLECTION_DATA(response?.data));
			dispatch(SET_COLLECTION_LOADING(false));
		});
	} catch (error) {}
};

// Common auth Config
export { GET_RECENT_FILE_DATA, GET_FOLDER_DATA, GET_COLLECTION_DATA };
