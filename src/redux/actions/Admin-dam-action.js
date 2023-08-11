import {
    ADMIN_DAM_ROOT_LIST_REQUEST,
    ADMIN_DAM_ROOT_LIST_SUCCESS,
    ADMIN_DAM_ROOT_LIST_FAIL,
    ADMIN_DAM_ID_LIST_REQUEST,
    ADMIN_DAM_ID_LIST_SUCCESS,
    ADMIN_DAM_ID_LIST_FAIL,
    ADMIN_DAM_DETAILS_REQUEST,
    ADMIN_DAM_DETAILS_SUCCESS,
    ADMIN_DAM_DETAILS_FAIL,
    ADMIN_DAM_DETAILS_RESET,
    ADMIN_DAM_DELETE_REQUEST,
    ADMIN_DAM_DELETE_SUCCESS,
    ADMIN_DAM_DELETE_FAIL,
    ADMIN_DAM_LIST_POST_REQUEST,
    ADMIN_DAM_LIST_POST_SUCCESS,
    ADMIN_DAM_LIST_POST_FAIL,
    ADMIN_DAM_PARENT_LIST_POST_REQUEST,
    ADMIN_DAM_PARENT_LIST_POST_SUCCESS,
    ADMIN_DAM_PARENT_LIST_POST_FAIL,
    ADMIN_DAM_IMAGES_REQUEST,
    ADMIN_DAM_IMAGES_SUCCESS,
    ADMIN_DAM_IMAGES_FAIL,
    ADMIN_DAM_ID_IMAGES_REQUEST,
    ADMIN_DAM_ID_IMAGES_SUCCESS,
    ADMIN_DAM_ID_IMAGES_FAIL,
    ADMIN_DAM_ID_REQUEST,
    ADMIN_DAM_ID_SUCCESS,
    ADMIN_DAM_ID_FAIL,
    ADMIN_DAM_LIST_COLLECTION_REQUEST,
    ADMIN_DAM_LIST_COLLECTION_SUCCESS,
    ADMIN_DAM_LIST_COLLECTION_FAIL,
    ADMIN_DAM_POST_COLLECTION_REQUEST,
    ADMIN_DAM_POST_COLLECTION_FAIL,
    ADMIN_DAM_POST_COLLECTION_SUCCESS,
    ADMIN_DAM_POST_ID_COLLECTION_REQUEST,
    ADMIN_DAM_POST_ID_COLLECTION_FAIL,
    ADMIN_DAM_POST_ID_COLLECTION_SUCCESS,
    ADMIN_DAM_COLLECTION_LIST_REQUEST,
    ADMIN_DAM_COLLECTION_LIST_SUCCESS,
    ADMIN_DAM_COLLECTION_LIST_FAIL,
    ADMIN_DAM_COLLECTION_ID_LIST_REQUEST,
    ADMIN_DAM_COLLECTION_ID_LIST_SUCCESS,
    ADMIN_DAM_COLLECTION_ID_LIST_FAIL,
    ADMIN_DAM_ROOT_IMAGES_REQUEST,
    ADMIN_DAM_ROOT_IMAGES_SUCCESS,
    ADMIN_DAM_ROOT_IMAGES_FAIL,
    ADMIN_DAM_Favourite_REQUEST,
    ADMIN_DAM_Favourite_SUCCESS,
    ADMIN_DAM_Favourite_FAIL,
    ADMIN_DAM_TITLE_REQUEST,
    ADMIN_DAM_TITLE_SUCCESS,
    ADMIN_DAM_TITLE_FAIL,
    ADMIN_COLLECTION_DELETE_REQUEST,
    ADMIN_COLLECTION_DELETE_SUCCESS,
    ADMIN_COLLECTION_DELETE_FAIL,
    ADMIN_COLLECTION_VIEW_REQUEST,
    ADMIN_COLLECTION_VIEW_SUCCESS,
    ADMIN_COLLECTION_VIEW_FAIL,
    ADMIN_COLLECTION_FILES_POST_REQUEST,
    ADMIN_COLLECTION_FILES_POST_SUCCESS,
    ADMIN_COLLECTION_FILES_POST_FAIL,
    ADMIN_MOVE_FILES_POST_REQUEST,
    ADMIN_MOVE_FILES_POST_SUCCESS,
    ADMIN_MOVE_FILES_POST_FAIL,
    ADMIN_DAM_MOVE_REQUEST,
    ADMIN_DAM_MOVE_SUCCESS,
    ADMIN_DAM_MOVE_FAIL,
    ADMIN_DAM_ROOT_MOVE_REQUEST,
    ADMIN_DAM_ROOT_MOVE_SUCCESS,
    ADMIN_DAM_ROOT_MOVE_FAIL,
    ADMIN_DAM_ROOT_COPY_REQUEST,
    ADMIN_DAM_ROOT_COPY_SUCCESS,
    ADMIN_DAM_ROOT_COPY_FAIL,
    ADMIN_DAM_RENAME_REQUEST,
    ADMIN_DAM_RENAME_SUCCESS,
    ADMIN_DAM_RENAME_FAIL,
    ADMIN_DAM_COLLECTION_COPY_REQUEST,
    ADMIN_DAM_COLLECTION_COPY_SUCCESS,
    ADMIN_DAM_COLLECTION_COPY_FAIL,
    ADMIN_DAM_COLLECTION_COPY_ID_REQUEST,
    ADMIN_DAM_COLLECTION_COPY_ID_SUCCESS,
    ADMIN_DAM_COLLECTION_COPY_ID_FAIL,
    ADMIN_DAM_COLLECTION_MULTIPLE_REQUEST,
    ADMIN_DAM_COLLECTION_MULTIPLE_SUCCESS,
    ADMIN_DAM_COLLECTION_MULTIPLE_FAIL,
    ADMIN_DAM_MOVE_MULTIPLE_REQUEST,
    ADMIN_DAM_MOVE_MULTIPLE_SUCCESS,
    ADMIN_DAM_MOVE_MULTIPLE_FAIL,
    ADMIN_DAM_MOVE_COLLECTION_REQUEST,
    ADMIN_DAM_MOVE_COLLECTION_SUCCESS,
    ADMIN_DAM_MOVE_COLLECTION_FAIL,
    ADMIN_DAM_SEARCH_REQUEST,
    ADMIN_DAM_SEARCH_SUCCESS,
    ADMIN_DAM_SEARCH_FAIL,
    ADMIN_DAM_VIDEOS_REQUEST,
    ADMIN_DAM_VIDEOS_SUCCESS,
    ADMIN_DAM_VIDEOS_FAIL,
    ADMIN_DAM_SEARCH1_REQUEST,
    ADMIN_DAM_SEARCH1_SUCCESS,
    ADMIN_DAM_SEARCH1_FAIL,
    ADMIN_DAM_FAVOURATE_FILTER_REQUEST,
    ADMIN_DAM_FAVOURATE_FILTER_SUCCESS,
    ADMIN_DAM_FAVOURATE_FILTER_FAIL,
    ADMIN_DAM_FAVOURATE_FILTER_ID_REQUEST,
    ADMIN_DAM_FAVOURATE_FILTER_ID_SUCCESS,
    ADMIN_DAM_FAVOURATE_FILTER_ID_FAIL,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_REQUEST,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_SUCCESS,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_FAIL,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS,
    ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_FAIL,
    ADMIN_DAM_MostUsed_REQUEST,
    ADMIN_DAM_MostUsed_SUCCESS,
    ADMIN_DAM_MostUsed_FAIL,
    ADMIN_DAM_Newest_REQUEST,
    ADMIN_DAM_Newest_SUCCESS,
    ADMIN_DAM_Newest_FAIL,
    ADMIN_DAM_PARENT_FILTER_REQUEST,
    ADMIN_DAM_PARENT_FILTER_SUCCESS,
    ADMIN_DAM_PARENT_FILTER_FAIL,
    ADMIN_DAM_SHARE_REQUEST,
    ADMIN_DAM_SHARE_SUCCESS,
    ADMIN_DAM_SHARE_FAIL,
    ADMIN_DAM_Company_REQUEST,
    ADMIN_DAM_Company_SUCCESS,
    ADMIN_DAM_Company_FAIL,
    ADMIN_DAM_Company_ID_REQUEST,
    ADMIN_DAM_Company_ID_SUCCESS,
    ADMIN_DAM_Company_ID_FAIL,
    ADMIN_DAM_Company_COUNT_REQUEST,
    ADMIN_DAM_Company_COUNT_SUCCESS,
    ADMIN_DAM_Company_COUNT_FAIL,
    ADMIN_DAM_Company_COUNT_ID_REQUEST,
    ADMIN_DAM_Company_COUNT_ID_SUCCESS,
    ADMIN_DAM_Company_COUNT_ID_FAIL,
    ADMIN_DAM_DATA_REQUEST,
    ADMIN_DAM_DATA_SUCCESS,
    ADMIN_DAM_DATA_FAIL,
    ADMIN_COLLECTION_DAM_FILTER_REQUEST,
    ADMIN_COLLECTION_DAM_FILTER_SUCCESS,
    ADMIN_COLLECTION_DAM_FILTER_FAIL,
    ADMIN_COLLECTION_DAM_SEARCH_REQUEST,
    ADMIN_COLLECTION_DAM_SEARCH_SUCCESS,
    ADMIN_COLLECTION_DAM_SEARCH_FAIL,
    ADMIN_COLLECTION_DAM_COUNT_REQUEST,
    ADMIN_COLLECTION_DAM_COUNT_SUCCESS,
    ADMIN_COLLECTION_DAM_COUNT_FAIL,
  } from "../../constants/Admin-dam-constant";
  
  import { BACKEND_API_URL } from "../../environment";
  import api from "../../utils/api";
  
  export const SuperAdmindamShare = (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_SHARE_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await api.post(
        `${BACKEND_API_URL}super-admin-share-media-link/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_SHARE_SUCCESS,
        payload: data,
      });
      console.log("data", data);
  
      return true;
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: ADMIN_DAM_SHARE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const SuperAdminlistAllDam = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_ID_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam/?id=${id}&type=1`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_ID_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminlistAllRootImages = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_ROOT_IMAGES_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-root/?type=3&ordering=-created`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_ROOT_IMAGES_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_ROOT_IMAGES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminlistAllCollectionDAM = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_LIST_COLLECTION_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-root/?type=2&ordering=-created`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_LIST_COLLECTION_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_LIST_COLLECTION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminlistAllROOTDam = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_ROOT_LIST_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-root/?type=1&ordering=-created`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_ROOT_LIST_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_ROOT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminlistAllDamImages = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_IMAGES_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-media/latest_records`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_IMAGES_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_IMAGES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdmindeletedam = (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_DELETE_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.post(
        `${BACKEND_API_URL}super-admin-dam/selected_delete/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_DELETE_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdmingetdamDetailswithid = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_ID_LIST_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam/?parent=${id}&type=1&ordering=-created`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_ID_LIST_SUCCESS,
        payload: data,
      });
  
      // return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_ID_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdmingetdamCollectionDetailswithid =
    (id,parentid) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DAM_COLLECTION_ID_LIST_REQUEST,
        });
  
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
  
        let data = []
if (id) {
  data = await api.get(
    `${BACKEND_API_URL}super-admin-dam/?id=${id}&type=2&ordering=-created`,
    config
  );
} else {
  data = await api.get(
    `${BACKEND_API_URL}super-admin-dam/?parent=${parentid}&type=2&ordering=-created`,
    config
  );
}
  
        dispatch({
          type: ADMIN_DAM_COLLECTION_ID_LIST_SUCCESS,
          payload: data?.data,
        });
  
        // return true;
      } catch (error) {
        dispatch({
          type: ADMIN_DAM_COLLECTION_ID_LIST_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
  export const SuperAdmingetdamImageswithid = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_ID_IMAGES_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam/?parent=${id}&type=3&ordering=-created`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_ID_IMAGES_SUCCESS,
        payload: data,
      });
  
      // return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_ID_IMAGES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdmingetdamDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_DETAILS_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(`${BACKEND_API_URL}/${id}/`, config);
  
      dispatch({
        type: ADMIN_DAM_DETAILS_SUCCESS,
        payload: data,
      });
  
      // return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDAMPost = (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_LIST_POST_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.post(
        `${BACKEND_API_URL}super-admin-dam/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_LIST_POST_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_LIST_POST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDAMCollectionPost = (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_POST_COLLECTION_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.post(
        `${BACKEND_API_URL}super-admin-dam/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_POST_COLLECTION_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_POST_COLLECTION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDAMParentPostCollection =
    (params, id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DAM_POST_ID_COLLECTION_REQUEST,
        });
  
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
  
        const { data } = await api.post(
          `${BACKEND_API_URL}super-admin-dam/?parent=${id}/`,
          params,
          config
        );
  
        dispatch({
          type: ADMIN_DAM_POST_ID_COLLECTION_SUCCESS,
          payload: data,
        });
  
        return true;
      } catch (error) {
        dispatch({
          type: ADMIN_DAM_POST_ID_COLLECTION_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
  export const SuperAdminDAMParentPost = (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_PARENT_LIST_POST_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.post(
        `${BACKEND_API_URL}super-admin-dam/?parent=${id}/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_PARENT_LIST_POST_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_PARENT_LIST_POST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDAMParentCollection = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_COLLECTION_LIST_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam/?parent=${id}&type=2&ordering=-created`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_COLLECTION_LIST_SUCCESS,
        payload: data,
      });
  
      // return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_COLLECTION_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminFavorites = (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_Favourite_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.put(
        `${BACKEND_API_URL}super-admin-dam/${id}/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_Favourite_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_Favourite_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminTitleupdate = (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_TITLE_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.put(
        `${BACKEND_API_URL}super-admin-dam-media/${id}/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_TITLE_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_TITLE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdmindeleteCollection = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_COLLECTION_DELETE_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.delete(
        `${BACKEND_API_URL}super-admin-dam/${id}`,
        config
      );
  
      dispatch({
        type: ADMIN_COLLECTION_DELETE_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_COLLECTION_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminCollectionView = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_COLLECTION_VIEW_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
       
        `${BACKEND_API_URL}super-admin-dam-media/get_multiple?id=${id}`,
        config
      );
  
      dispatch({
        type: ADMIN_COLLECTION_VIEW_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_COLLECTION_VIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdmincollectionfilespost = (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_COLLECTION_FILES_POST_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.post(
        `${BACKEND_API_URL}super-admin-dam/create_collection/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_COLLECTION_FILES_POST_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_COLLECTION_FILES_POST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDAMMovePost = (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_MOVE_FILES_POST_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.put(
        `${BACKEND_API_URL}super-admin-dam/${id}/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_MOVE_FILES_POST_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_MOVE_FILES_POST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamMovefolderdata = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_MOVE_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-duplicate/?parent=${id}&type=1`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_MOVE_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_MOVE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamrootMovefolderdata = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_ROOT_MOVE_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-duplicate/?root=1&type=1`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_ROOT_MOVE_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_ROOT_MOVE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamcopypost = (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_ROOT_COPY_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.post(
        `${BACKEND_API_URL}super-admin-dam/copy_to/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_ROOT_COPY_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_ROOT_COPY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminRenamefolder = (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_RENAME_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.put(
        `${BACKEND_API_URL}super-admin-dam/${id}/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_RENAME_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_RENAME_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamrootMoveCollection = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_COLLECTION_COPY_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-duplicate/?root=1&type=2`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_COLLECTION_COPY_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_COLLECTION_COPY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamrootMoveCollectionID = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_COLLECTION_COPY_ID_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-duplicate/?parent=${id}&type=2`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_COLLECTION_COPY_ID_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_COLLECTION_COPY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamMutipledelete = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_COLLECTION_MULTIPLE_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.delete(
        `${BACKEND_API_URL}super-admin-dam-media/delete_multiple?id=${id}`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_COLLECTION_MULTIPLE_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_COLLECTION_MULTIPLE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamMoveMultiple = (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_MOVE_MULTIPLE_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await api.put(
        `${BACKEND_API_URL}super-admin-dam/move_to/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_MOVE_MULTIPLE_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_MOVE_MULTIPLE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamMoveCollectioninside =
    (params) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DAM_MOVE_COLLECTION_REQUEST,
        });
  
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
        const { data } = await api.post(
          `${BACKEND_API_URL}super-admin-dam-media/move_collection`,
          params,
          config
        );
  
        dispatch({
          type: ADMIN_DAM_MOVE_COLLECTION_SUCCESS,
          payload: data,
        });
  
        return true;
      } catch (error) {
        dispatch({
          type: ADMIN_DAM_MOVE_COLLECTION_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  export const SuperAdminDamSearch = (id,parentid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_SEARCH_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-media?search=${id}&dam__parent=${parentid}`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_SEARCH_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_SEARCH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamSearchfolder = (id,parentid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_SEARCH1_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam?search=${id}&parent=${parentid}`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_SEARCH1_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_SEARCH1_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamVideo = (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_VIDEOS_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await api.put(
        `${BACKEND_API_URL}super-admin-dam/move_to/`,
        params,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_VIDEOS_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_VIDEOS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamFilterFavourate = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-filter/favourites/`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamFilterFavourate1 = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_ID_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-filter/favourites?id=${id}`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_ID_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamFilterFavourateCount = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_COUNT_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-filter/count/`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_COUNT_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_COUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminDamFilterFavourateCountID = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-media-filter?${id}`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_FAVOURATE_FILTER_COUNT_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminlistAllMostUsedcount = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_DAM_MostUsed_REQUEST,
      });
  
      const {
        authReducer: { userData },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      };
  
      const { data } = await api.get(
        `${BACKEND_API_URL}super-admin-dam-filter/count?id=${id}`,
        config
      );
  
      dispatch({
        type: ADMIN_DAM_MostUsed_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_DAM_MostUsed_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const SuperAdminlistAllParentFilter =
    (filter, id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DAM_PARENT_FILTER_REQUEST,
        });
  
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
        const { data } = await api.get(
          `${BACKEND_API_URL}super-admin-dam-media-filter?${filter}&parent=${id}`,
          config
        );
  
        dispatch({
          type: ADMIN_DAM_PARENT_FILTER_SUCCESS,
          payload: data,
        });
  
        return true;
      } catch (error) {
        dispatch({
          type: ADMIN_DAM_PARENT_FILTER_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
  
    export const SuperAdminlistCompanies =
    (params) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DAM_Company_REQUEST,
        });
  
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
  
        const { data } = await api.get(
          `${BACKEND_API_URL}super-admin-company-media-count?${params}`,
          config
        );
  
        dispatch({
          type: ADMIN_DAM_Company_SUCCESS,
          payload: data,
        });
  
        return true;
      } catch (error) {
        dispatch({
          type: ADMIN_DAM_Company_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
  
    export const SuperAdminlistCompaniesID =
    (id,params) => async (dispatch, getState) => {
      try {
        dispatch({
          type:   ADMIN_DAM_Company_ID_REQUEST,
        });

       let data = []
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };

        if (params) {
        data = await api.get(
            `${BACKEND_API_URL}super-admin-company-media-count?id=${id}${params}`,
            config
          ); 
        } else {
          data = await api.get(
            `${BACKEND_API_URL}super-admin-company-media-count?id=${id}`,
            config
          );
        }

  
        dispatch({
          type: ADMIN_DAM_Company_ID_SUCCESS,
          payload: data.data,
        });
  
        return true;
      } catch (error) {
        dispatch({
          type: ADMIN_DAM_Company_ID_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
  
    export const SuperAdminCountCompanies =
    (id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DAM_Company_COUNT_REQUEST,
        });
  
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
  
  
  
        const { data } = await api.get(
          `${BACKEND_API_URL}super-admin-dam-filter/count?company=${id}`,
          config
        );
  
        dispatch({
          type: ADMIN_DAM_Company_COUNT_SUCCESS,
          payload: data,
        });
  
        return true;
      } catch (error) {
        dispatch({
          type: ADMIN_DAM_Company_COUNT_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
    export const SuperAdminCountCompaniesID =
    (parentid , id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DAM_Company_COUNT_ID_REQUEST,
        });
  
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
  
        const { data } = await api.get(
          `${BACKEND_API_URL}super-admin-dam-filter/count?id=${parentid}&company=${id}`,
          config
        );
  
        dispatch({
          type: ADMIN_DAM_Company_COUNT_ID_SUCCESS,
          payload: data,
        });
  
        return true;
      } catch (error) {
        dispatch({
          type: ADMIN_DAM_Company_COUNT_ID_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };

    export const  SuperAdminDamDataDetails =
    (id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DAM_DATA_REQUEST,
        });
  
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
        const { data } = await api.get(
          `${BACKEND_API_URL}agency/dam/${id}`,
          config
        );
  
        dispatch({
          type: ADMIN_DAM_DATA_SUCCESS,
          payload: data,
        });
  
        return true;
      } catch (error) {
        dispatch({
          type: ADMIN_DAM_DATA_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
    export const AdminCollectionfilter =
    (id,params) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_COLLECTION_DAM_FILTER_REQUEST,
        });
      let data = []
        const {
          authReducer: { userData },
        } = getState();
  
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
  
        data  = await api.get(
            `${BACKEND_API_URL}super-admin-collection-filter?dam_id=${id}${params}`,
            config
          );
        
  
  
        dispatch({
          type:   ADMIN_COLLECTION_DAM_FILTER_SUCCESS,
          payload: data.data,
        });
  
        return true;
      } catch (error) {
        dispatch({
          type:   ADMIN_COLLECTION_DAM_FILTER_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };


    export const AdminDamCollectionSearch = (params,id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_COLLECTION_DAM_SEARCH_REQUEST,
        });
    
        const {
          authReducer: { userData },
        } = getState();
    
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
    
        const { data } = await api.get(
          `${BACKEND_API_URL}super-admin-collection-filter/?dam_id=${params}&search=${id}`,
          config
        );
    
        dispatch({
          type:  ADMIN_COLLECTION_DAM_SEARCH_SUCCESS,
          payload: data,
        });
    
        return true;
      } catch (error) {
        dispatch({
          type:ADMIN_COLLECTION_DAM_SEARCH_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
    export const AdminDamCollectioncount = (id) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_COLLECTION_DAM_COUNT_REQUEST,
        });
    
        const {
          authReducer: { userData },
        } = getState();
    
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        };
    
        const { data } = await api.get(
          `${BACKEND_API_URL}collection-count/?id=${id}`,
          config
        );
    
        dispatch({
          type:  ADMIN_COLLECTION_DAM_COUNT_SUCCESS,
          payload: data,
        });
    
        return true;
      } catch (error) {
        dispatch({
          type:ADMIN_COLLECTION_DAM_COUNT_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  