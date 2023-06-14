import {
  DAM_ROOT_LIST_REQUEST,
  DAM_ROOT_LIST_SUCCESS,
  DAM_ROOT_LIST_FAIL,
  DAM_ID_LIST_REQUEST,
  DAM_ID_LIST_SUCCESS,
  DAM_ID_LIST_FAIL,
  DAM_DETAILS_REQUEST,
  DAM_DETAILS_SUCCESS,
  DAM_DETAILS_FAIL,
  DAM_DETAILS_RESET,
  DAM_DELETE_REQUEST,
  DAM_DELETE_SUCCESS,
  DAM_DELETE_FAIL,
  DAM_LIST_POST_REQUEST,
  DAM_LIST_POST_SUCCESS,
  DAM_LIST_POST_FAIL,
  DAM_PARENT_LIST_POST_REQUEST,
  DAM_PARENT_LIST_POST_SUCCESS,
  DAM_PARENT_LIST_POST_FAIL,
  DAM_IMAGES_REQUEST,
  DAM_IMAGES_SUCCESS,
  DAM_IMAGES_FAIL,
  DAM_ID_IMAGES_REQUEST,
  DAM_ID_IMAGES_SUCCESS,
  DAM_ID_IMAGES_FAIL,
  DAM_ID_REQUEST,
  DAM_ID_SUCCESS,
  DAM_ID_FAIL,
  DAM_LIST_COLLECTION_REQUEST,
  DAM_LIST_COLLECTION_SUCCESS,
  DAM_LIST_COLLECTION_FAIL,
  DAM_POST_COLLECTION_REQUEST,
  DAM_POST_COLLECTION_FAIL,
  DAM_POST_COLLECTION_SUCCESS,
  DAM_POST_ID_COLLECTION_REQUEST,
  DAM_POST_ID_COLLECTION_FAIL,
  DAM_POST_ID_COLLECTION_SUCCESS,
  DAM_COLLECTION_LIST_REQUEST,
  DAM_COLLECTION_LIST_SUCCESS,
  DAM_COLLECTION_LIST_FAIL,
  DAM_COLLECTION_ID_LIST_REQUEST,
  DAM_COLLECTION_ID_LIST_SUCCESS,
  DAM_COLLECTION_ID_LIST_FAIL,
  DAM_ROOT_IMAGES_REQUEST,
  DAM_ROOT_IMAGES_SUCCESS,
  DAM_ROOT_IMAGES_FAIL,
  DAM_Favourite_REQUEST,
  DAM_Favourite_SUCCESS,
  DAM_Favourite_FAIL,
  DAM_TITLE_REQUEST,
  DAM_TITLE_SUCCESS,
  DAM_TITLE_FAIL,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_FAIL,
  COLLECTION_VIEW_REQUEST,
  COLLECTION_VIEW_SUCCESS,
  COLLECTION_VIEW_FAIL,
  COLLECTION_FILES_POST_REQUEST,
  COLLECTION_FILES_POST_SUCCESS,
  COLLECTION_FILES_POST_FAIL,
  MOVE_FILES_POST_REQUEST,
  MOVE_FILES_POST_SUCCESS,
  MOVE_FILES_POST_FAIL,
  DAM_MOVE_REQUEST,
  DAM_MOVE_SUCCESS,
  DAM_MOVE_FAIL,
  DAM_ROOT_MOVE_REQUEST,
  DAM_ROOT_MOVE_SUCCESS,
  DAM_ROOT_MOVE_FAIL,
  DAM_ROOT_COPY_REQUEST,
  DAM_ROOT_COPY_SUCCESS,
  DAM_ROOT_COPY_FAIL,
  DAM_RENAME_REQUEST,
  DAM_RENAME_SUCCESS,
  DAM_RENAME_FAIL,
  DAM_COLLECTION_COPY_REQUEST,
  DAM_COLLECTION_COPY_SUCCESS,
  DAM_COLLECTION_COPY_FAIL,
  DAM_COLLECTION_COPY_ID_REQUEST,
  DAM_COLLECTION_COPY_ID_SUCCESS,
  DAM_COLLECTION_COPY_ID_FAIL,
  DAM_COLLECTION_MULTIPLE_REQUEST,
  DAM_COLLECTION_MULTIPLE_SUCCESS,
  DAM_COLLECTION_MULTIPLE_FAIL,
  DAM_MOVE_MULTIPLE_REQUEST,
  DAM_MOVE_MULTIPLE_SUCCESS,
  DAM_MOVE_MULTIPLE_FAIL,
  DAM_MOVE_COLLECTION_REQUEST,
  DAM_MOVE_COLLECTION_SUCCESS,
  DAM_MOVE_COLLECTION_FAIL,
  DAM_SEARCH_REQUEST,
  DAM_SEARCH_SUCCESS,
  DAM_SEARCH_FAIL,
  DAM_VIDEOS_REQUEST,
  DAM_VIDEOS_SUCCESS,
  DAM_VIDEOS_FAIL,
  DAM_SEARCH1_REQUEST,
  DAM_SEARCH1_SUCCESS,
  DAM_SEARCH1_FAIL,
  DAM_FAVOURATE_FILTER_REQUEST,
  DAM_FAVOURATE_FILTER_SUCCESS,
  DAM_FAVOURATE_FILTER_FAIL,
  DAM_FAVOURATE_FILTER_ID_REQUEST,
  DAM_FAVOURATE_FILTER_ID_SUCCESS,
  DAM_FAVOURATE_FILTER_ID_FAIL,
  DAM_FAVOURATE_FILTER_COUNT_REQUEST,
  DAM_FAVOURATE_FILTER_COUNT_SUCCESS,
  DAM_FAVOURATE_FILTER_COUNT_FAIL,
  DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST,
  DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS,
  DAM_FAVOURATE_FILTER_COUNT_ID_FAIL,
  DAM_MostUsed_REQUEST,
  DAM_MostUsed_SUCCESS,
  DAM_MostUsed_FAIL,
  DAM_Newest_REQUEST,
  DAM_Newest_SUCCESS,
  DAM_Newest_FAIL,
  DAM_PARENT_FILTER_REQUEST,
  DAM_PARENT_FILTER_SUCCESS,
  DAM_PARENT_FILTER_FAIL,
  DAM_SHARE_REQUEST,
  DAM_SHARE_SUCCESS,
  DAM_SHARE_FAIL,
  DAM_Company_REQUEST,
  DAM_Company_SUCCESS,
  DAM_Company_FAIL,
  DAM_Company_ID_REQUEST,
  DAM_Company_ID_SUCCESS,
  DAM_Company_ID_FAIL,
  DAM_Company_COUNT_REQUEST,
  DAM_Company_COUNT_SUCCESS,
  DAM_Company_COUNT_FAIL,
  DAM_Company_COUNT_ID_REQUEST,
  DAM_Company_COUNT_ID_SUCCESS,
  DAM_Company_COUNT_ID_FAIL,
  DAM_DATA_REQUEST,
  DAM_DATA_SUCCESS,
  DAM_DATA_FAIL,
  COLLECTION_DAM_SEARCH_REQUEST,
  COLLECTION_DAM_SEARCH_SUCCESS,
  COLLECTION_DAM_SEARCH_FAIL,
  COLLECTION_DAM_FILTER_REQUEST,
  COLLECTION_DAM_FILTER_SUCCESS,
  COLLECTION_DAM_FILTER_FAIL,
  COLLECTION_DAM_FILTER_ID_REQUEST,
  COLLECTION_DAM_FILTER_ID_SUCCESS,
  COLLECTION_DAM_FILTER_ID_FAIL,
  COLLECTION_DAM_COUNT_REQUEST,
  COLLECTION_DAM_COUNT_SUCCESS,
  COLLECTION_DAM_COUNT_FAIL
} from "../../constants/Dam-constant";

import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";

export const damShare = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_SHARE_REQUEST,
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
      `${BACKEND_API_URL}agency/share-media-link/`,
      params,
      config
    );

    dispatch({
      type: DAM_SHARE_SUCCESS,
      payload: data,
    });
    // console.log("data", data);

    return true;
  } catch (error) {
    // console.log("error", error);
    dispatch({
      type: DAM_SHARE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllDam = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_ID_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/?id=${id}&type=1`,
      config
    );

    dispatch({
      type: DAM_ID_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllRootImages = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_ROOT_IMAGES_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-root/?type=3&ordering=-created`,
      config
    );

    dispatch({
      type: DAM_ROOT_IMAGES_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_ROOT_IMAGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllCollectionDAM = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_LIST_COLLECTION_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-root/?type=2&ordering=-created`,
      config
    );

    dispatch({
      type: DAM_LIST_COLLECTION_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_LIST_COLLECTION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllROOTDam = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_ROOT_LIST_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-root/?type=1&ordering=-created`,
      config
    );

    dispatch({
      type: DAM_ROOT_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_ROOT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllDamImages = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_IMAGES_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-media/latest_records`,
      config
    );

    dispatch({
      type: DAM_IMAGES_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_IMAGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletedam = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_DELETE_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/selected_delete/`,
      params,
      config
    );

    dispatch({
      type: DAM_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getdamDetailswithid = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_ID_LIST_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/?parent=${id}&type=1&ordering=-created`,
      config
    );

    dispatch({
      type: DAM_ID_LIST_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: DAM_ID_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getdamCollectionDetailswithid =
  (id, parentid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAM_COLLECTION_ID_LIST_REQUEST,
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
          `${BACKEND_API_URL}agency/dam/?id=${id}&type=2&ordering=-created`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}agency/dam/?parent=${parentid}&type=2&ordering=-created`,
          config
        );
      }


      dispatch({
        type: DAM_COLLECTION_ID_LIST_SUCCESS,
        payload: data.data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: DAM_COLLECTION_ID_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getdamImageswithid = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_ID_IMAGES_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/?parent=${id}&type=3&ordering=-created`,
      config
    );

    dispatch({
      type: DAM_ID_IMAGES_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: DAM_ID_IMAGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getdamDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_DETAILS_REQUEST,
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
      type: DAM_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: DAM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DAMPost = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_LIST_POST_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/`,
      params,
      config
    );

    dispatch({
      type: DAM_LIST_POST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_LIST_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DAMCollectionPost = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_POST_COLLECTION_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/`,
      params,
      config
    );

    dispatch({
      type: DAM_POST_COLLECTION_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_POST_COLLECTION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DAMParentPostCollection =
  (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAM_POST_ID_COLLECTION_REQUEST,
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
        `${BACKEND_API_URL}agency/dam/?parent=${id}/`,
        params,
        config
      );

      dispatch({
        type: DAM_POST_ID_COLLECTION_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: DAM_POST_ID_COLLECTION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DAMParentPost = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_PARENT_LIST_POST_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/?parent=${id}/`,
      params,
      config
    );

    dispatch({
      type: DAM_PARENT_LIST_POST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_PARENT_LIST_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DAMParentCollection = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_COLLECTION_LIST_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/?parent=${id}&type=2&ordering=-created`,
      config
    );

    dispatch({
      type: DAM_COLLECTION_LIST_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: DAM_COLLECTION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Favorites = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_Favourite_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/${id}/`,
      params,
      config
    );

    dispatch({
      type: DAM_Favourite_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_Favourite_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Titleupdate = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_TITLE_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-media/${id}/`,
      params,
      config
    );

    dispatch({
      type: DAM_TITLE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_TITLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteCollection = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_DELETE_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/${id}`,
      config
    );

    dispatch({
      type: COLLECTION_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: COLLECTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const CollectionView = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_VIEW_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-media/get_multiple?id=${id}`,
      config
    );

    dispatch({
      type: COLLECTION_VIEW_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: COLLECTION_VIEW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const collectionfilespost = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_FILES_POST_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/create_collection/`,
      params,
      config
    );

    dispatch({
      type: COLLECTION_FILES_POST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: COLLECTION_FILES_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DAMMovePost = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOVE_FILES_POST_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/${id}/`,
      params,
      config
    );

    dispatch({
      type: MOVE_FILES_POST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MOVE_FILES_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamMovefolderdata = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_MOVE_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-duplicate/?parent=${id}&type=1`,
      config
    );

    dispatch({
      type: DAM_MOVE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_MOVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamrootMovefolderdata = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_ROOT_MOVE_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-duplicate/?root=1&type=1`,
      config
    );

    dispatch({
      type: DAM_ROOT_MOVE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_ROOT_MOVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Damcopypost = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_ROOT_COPY_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/copy_to/`,
      params,
      config
    );

    dispatch({
      type: DAM_ROOT_COPY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_ROOT_COPY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Renamefolder = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_RENAME_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/${id}/`,
      params,
      config
    );

    dispatch({
      type: DAM_RENAME_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_RENAME_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamrootMoveCollection = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_COLLECTION_COPY_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-duplicate/?root=1&type=2`,
      config
    );

    dispatch({
      type: DAM_COLLECTION_COPY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_COLLECTION_COPY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamrootMoveCollectionID = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_COLLECTION_COPY_ID_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-duplicate/?parent=${id}&type=2`,
      config
    );

    dispatch({
      type: DAM_COLLECTION_COPY_ID_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_COLLECTION_COPY_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamMutipledelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_COLLECTION_MULTIPLE_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-media/delete_multiple?id=${id}`,
      config
    );

    dispatch({
      type: DAM_COLLECTION_MULTIPLE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_COLLECTION_MULTIPLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamMoveMultiple = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_MOVE_MULTIPLE_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/move_to/`,
      params,
      config
    );

    dispatch({
      type: DAM_MOVE_MULTIPLE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_MOVE_MULTIPLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamMoveCollectioninside =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAM_MOVE_COLLECTION_REQUEST,
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
        `${BACKEND_API_URL}agency/dam-media/move_collection/`,
        params,
        config
      );

      dispatch({
        type: DAM_MOVE_COLLECTION_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: DAM_MOVE_COLLECTION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
export const DamSearch = (id, parentid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_SEARCH_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-media?search=${id}&dam__parent=${parentid}`,
      config
    );

    dispatch({
      type: DAM_SEARCH_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_SEARCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamSearchfolder = (id, parentid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_SEARCH1_REQUEST,
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
      `${BACKEND_API_URL}agency/dam?search=${id}&parent=${parentid}`,
      config
    );

    dispatch({
      type: DAM_SEARCH1_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_SEARCH1_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamVideo = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_VIDEOS_REQUEST,
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
      `${BACKEND_API_URL}agency/dam/move_to/`,
      params,
      config
    );

    dispatch({
      type: DAM_VIDEOS_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_VIDEOS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamFilterFavourate = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_FAVOURATE_FILTER_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-filter/favourites/`,
      config
    );

    dispatch({
      type: DAM_FAVOURATE_FILTER_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_FAVOURATE_FILTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamFilterFavourate1 = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_FAVOURATE_FILTER_ID_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-filter/favourites?id=${id}`,
      config
    );

    dispatch({
      type: DAM_FAVOURATE_FILTER_ID_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_FAVOURATE_FILTER_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamFilterFavourateCount = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_FAVOURATE_FILTER_COUNT_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-filter/count/`,
      config
    );

    dispatch({
      type: DAM_FAVOURATE_FILTER_COUNT_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_FAVOURATE_FILTER_COUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamFilterFavourateCountID = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-media-filter/?${id}`,
      config
    );

    dispatch({
      type: DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_FAVOURATE_FILTER_COUNT_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllMostUsedcount = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAM_MostUsed_REQUEST,
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
      `${BACKEND_API_URL}agency/dam-filter/count?id=${id}`,
      config
    );

    dispatch({
      type: DAM_MostUsed_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DAM_MostUsed_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllParentFilter =
  (filter, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAM_PARENT_FILTER_REQUEST,
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
        `${BACKEND_API_URL}agency/dam-media-filter/?${filter}&parent=${id}`,
        config
      );

      dispatch({
        type: DAM_PARENT_FILTER_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: DAM_PARENT_FILTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


export const listCompanies =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAM_Company_REQUEST,
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
        `${BACKEND_API_URL}agency/company-media-count?${params}`,
        config
      );

      dispatch({
        type: DAM_Company_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: DAM_Company_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


export const listCompaniesID =
  (id, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAM_Company_ID_REQUEST,
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
          `${BACKEND_API_URL}agency/company-media-count?id=${id}${params}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}agency/company-media-count?id=${id}`,
          config
        );
      }


      dispatch({
        type: DAM_Company_ID_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: DAM_Company_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


export const CountCompanies =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAM_Company_COUNT_REQUEST,
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
        `${BACKEND_API_URL}agency/dam-filter/count?company=${id}`,
        config
      );

      dispatch({
        type: DAM_Company_COUNT_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: DAM_Company_COUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const CountCompaniesID =
  (parentid, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAM_Company_COUNT_ID_REQUEST,
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
        `${BACKEND_API_URL}agency/dam-filter/count?id=${parentid}&company=${id}`,
        config
      );

      dispatch({
        type: DAM_Company_COUNT_ID_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: DAM_Company_COUNT_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


export const DamDataDetails =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DAM_DATA_REQUEST,
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
        type: DAM_DATA_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: DAM_DATA_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


export const DamCollectionSearch = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_DAM_SEARCH_REQUEST,
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
      `${BACKEND_API_URL}agency/collection-filter/?dam_id=${params}&search=${id}`,
      config
    );

    dispatch({
      type: COLLECTION_DAM_SEARCH_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: COLLECTION_DAM_SEARCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Collectionfilter =
  (id, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COLLECTION_DAM_FILTER_REQUEST,
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

      data = await api.get(
        `${BACKEND_API_URL}agency/collection-filter?dam_id=${id}${params}`,
        config
      );



      dispatch({
        type: COLLECTION_DAM_FILTER_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: COLLECTION_DAM_FILTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


export const CollectionIDfilter =
  (id, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COLLECTION_DAM_FILTER_ID_REQUEST,
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
          `${BACKEND_API_URL}agency/company-media-count?id=${id}${params}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}agency/company-media-count?id=${id}`,
          config
        );
      }


      dispatch({
        type: COLLECTION_DAM_FILTER_ID_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: COLLECTION_DAM_FILTER_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


export const DamCollectioncount = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_DAM_COUNT_REQUEST,
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
      `${BACKEND_API_URL}agency/collection-count/?id=${id}`,
      config
    );

    dispatch({
      type: COLLECTION_DAM_COUNT_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: COLLECTION_DAM_COUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


