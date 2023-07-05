import {
  SET_DAM_COLLECTED_DATA_SUCCESS,
  SET_DAM_DATA,
  SET_DAM_DATA_LOADING,
} from "redux/reducers/media/dam.slice";
import { AppDispatch } from "redux/store";
import MediaApiCLient from "services/media/MediaApiCLient";

// Get Dam Media List
const GET_DAM_MEDIA_COLLECTION_VIEW =
  (id: number | string) => async (dispatch: AppDispatch) => {
    dispatch(SET_DAM_DATA_LOADING(true));
    await MediaApiCLient.fetchDamMedia(id)
      .then((response) => {
        dispatch(SET_DAM_DATA(response?.data));
        dispatch(SET_DAM_COLLECTED_DATA_SUCCESS("Success"));
        dispatch(SET_DAM_DATA_LOADING(false));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

// Common auth Config
export { GET_DAM_MEDIA_COLLECTION_VIEW };
