import {
  MEMBER_DAM_ROOT_LIST_REQUEST,
  MEMBER_DAM_ROOT_LIST_SUCCESS,
  MEMBER_DAM_ROOT_LIST_FAIL,
  MEMBER_DAM_ID_LIST_REQUEST,
  MEMBER_DAM_ID_LIST_SUCCESS,
  MEMBER_DAM_ID_LIST_FAIL,
  MEMBER_DAM_DETAILS_REQUEST,
  MEMBER_DAM_DETAILS_SUCCESS,
  MEMBER_DAM_DETAILS_FAIL,
  MEMBER_DAM_DETAILS_RESET,
  MEMBER_DAM_DELETE_REQUEST,
  MEMBER_DAM_DELETE_SUCCESS,
  MEMBER_DAM_DELETE_FAIL,
  MEMBER_DAM_LIST_POST_REQUEST,
  MEMBER_DAM_LIST_POST_SUCCESS,
  MEMBER_DAM_LIST_POST_FAIL,
  MEMBER_DAM_PARENT_LIST_POST_REQUEST,
  MEMBER_DAM_PARENT_LIST_POST_SUCCESS,
  MEMBER_DAM_PARENT_LIST_POST_FAIL,
  MEMBER_DAM_IMAGES_REQUEST,
  MEMBER_DAM_IMAGES_SUCCESS,
  MEMBER_DAM_IMAGES_FAIL,
  MEMBER_DAM_ID_IMAGES_REQUEST,
  MEMBER_DAM_ID_IMAGES_SUCCESS,
  MEMBER_DAM_ID_IMAGES_FAIL,
  MEMBER_DAM_ID_REQUEST,
  MEMBER_DAM_ID_SUCCESS,
  MEMBER_DAM_ID_FAIL,
  MEMBER_DAM_LIST_COLLECTION_REQUEST,
  MEMBER_DAM_LIST_COLLECTION_SUCCESS,
  MEMBER_DAM_LIST_COLLECTION_FAIL,
  MEMBER_DAM_POST_COLLECTION_REQUEST,
  MEMBER_DAM_POST_COLLECTION_FAIL,
  MEMBER_DAM_POST_COLLECTION_SUCCESS,
  MEMBER_DAM_POST_ID_COLLECTION_REQUEST,
  MEMBER_DAM_POST_ID_COLLECTION_FAIL,
  MEMBER_DAM_POST_ID_COLLECTION_SUCCESS,
  MEMBER_DAM_COLLECTION_LIST_REQUEST,
  MEMBER_DAM_COLLECTION_LIST_SUCCESS,
  MEMBER_DAM_COLLECTION_LIST_FAIL,
  MEMBER_DAM_COLLECTION_ID_LIST_REQUEST,
  MEMBER_DAM_COLLECTION_ID_LIST_SUCCESS,
  MEMBER_DAM_COLLECTION_ID_LIST_FAIL,
  MEMBER_DAM_ROOT_IMAGES_REQUEST,
  MEMBER_DAM_ROOT_IMAGES_SUCCESS,
  MEMBER_DAM_ROOT_IMAGES_FAIL,
  MEMBER_DAM_Favourite_REQUEST,
  MEMBER_DAM_Favourite_SUCCESS,
  MEMBER_DAM_Favourite_FAIL,
  MEMBER_DAM_TITLE_REQUEST,
  MEMBER_DAM_TITLE_SUCCESS,
  MEMBER_DAM_TITLE_FAIL,
  MEMBER_COLLECTION_DELETE_REQUEST,
  MEMBER_COLLECTION_DELETE_SUCCESS,
  MEMBER_COLLECTION_DELETE_FAIL,
  MEMBER_COLLECTION_VIEW_REQUEST,
  MEMBER_COLLECTION_VIEW_SUCCESS,
  MEMBER_COLLECTION_VIEW_FAIL,
  MEMBER_COLLECTION_FILES_POST_REQUEST,
  MEMBER_COLLECTION_FILES_POST_SUCCESS,
  MEMBER_COLLECTION_FILES_POST_FAIL,
  MEMBER_MOVE_FILES_POST_REQUEST,
  MEMBER_MOVE_FILES_POST_SUCCESS,
  MEMBER_MOVE_FILES_POST_FAIL,
  MEMBER_DAM_MOVE_REQUEST,
  MEMBER_DAM_MOVE_SUCCESS,
  MEMBER_DAM_MOVE_FAIL,
  MEMBER_DAM_ROOT_MOVE_REQUEST,
  MEMBER_DAM_ROOT_MOVE_SUCCESS,
  MEMBER_DAM_ROOT_MOVE_FAIL,
  MEMBER_DAM_ROOT_COPY_REQUEST,
  MEMBER_DAM_ROOT_COPY_SUCCESS,
  MEMBER_DAM_ROOT_COPY_FAIL,
  MEMBER_DAM_RENAME_REQUEST,
  MEMBER_DAM_RENAME_SUCCESS,
  MEMBER_DAM_RENAME_FAIL,
  MEMBER_DAM_COLLECTION_COPY_REQUEST,
  MEMBER_DAM_COLLECTION_COPY_SUCCESS,
  MEMBER_DAM_COLLECTION_COPY_FAIL,
  MEMBER_DAM_COLLECTION_COPY_ID_REQUEST,
  MEMBER_DAM_COLLECTION_COPY_ID_SUCCESS,
  MEMBER_DAM_COLLECTION_COPY_ID_FAIL,
  MEMBER_DAM_COLLECTION_MULTIPLE_REQUEST,
  MEMBER_DAM_COLLECTION_MULTIPLE_SUCCESS,
  MEMBER_DAM_COLLECTION_MULTIPLE_FAIL,
  MEMBER_DAM_MOVE_MULTIPLE_REQUEST,
  MEMBER_DAM_MOVE_MULTIPLE_SUCCESS,
  MEMBER_DAM_MOVE_MULTIPLE_FAIL,
  MEMBER_DAM_MOVE_COLLECTION_REQUEST,
  MEMBER_DAM_MOVE_COLLECTION_SUCCESS,
  MEMBER_DAM_MOVE_COLLECTION_FAIL,
  MEMBER_DAM_SEARCH_REQUEST,
  MEMBER_DAM_SEARCH_SUCCESS,
  MEMBER_DAM_SEARCH_FAIL,
  MEMBER_DAM_VIDEOS_REQUEST,
  MEMBER_DAM_VIDEOS_SUCCESS,
  MEMBER_DAM_VIDEOS_FAIL,
  MEMBER_DAM_SEARCH1_REQUEST,
  MEMBER_DAM_SEARCH1_SUCCESS,
  MEMBER_DAM_SEARCH1_FAIL,
  MEMBER_DAM_FAVOURATE_FILTER_REQUEST,
  MEMBER_DAM_FAVOURATE_FILTER_SUCCESS,
  MEMBER_DAM_FAVOURATE_FILTER_FAIL,
  MEMBER_DAM_FAVOURATE_FILTER_ID_REQUEST,
  MEMBER_DAM_FAVOURATE_FILTER_ID_SUCCESS,
  MEMBER_DAM_FAVOURATE_FILTER_ID_FAIL,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_REQUEST,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_SUCCESS,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_FAIL,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS,
  MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_FAIL,
  MEMBER_DAM_MostUsed_REQUEST,
  MEMBER_DAM_MostUsed_SUCCESS,
  MEMBER_DAM_MostUsed_FAIL,
  MEMBER_DAM_PARENT_FILTER_REQUEST,
  MEMBER_DAM_PARENT_FILTER_SUCCESS,
  MEMBER_DAM_PARENT_FILTER_FAIL,
  MEMBER_DAM_SHARE_REQUEST,
  MEMBER_DAM_SHARE_SUCCESS,
  MEMBER_DAM_SHARE_FAIL,
  MEMBER_DAM_Company_REQUEST,
  MEMBER_DAM_Company_SUCCESS,
  MEMBER_DAM_Company_FAIL,
  MEMBER_DAM_Company_ID_REQUEST,
  MEMBER_DAM_Company_ID_SUCCESS,
  MEMBER_DAM_Company_ID_FAIL,
  MEMBER_DAM_Company_COUNT_REQUEST,
  MEMBER_DAM_Company_COUNT_SUCCESS,
  MEMBER_DAM_Company_COUNT_FAIL,
  MEMBER_DAM_Company_COUNT_ID_REQUEST,
  MEMBER_DAM_Company_COUNT_ID_SUCCESS,
  MEMBER_DAM_Company_COUNT_ID_FAIL,
  INHOUSE_COMPANY_ID_REQUEST,
  INHOUSE_COMPANY_ID_SUCCESS,
  INHOUSE_Company_ID_FAIL,
  INHOUSE_COMPANY_FILTER_REQUEST,
  INHOUSE_COMPANY_FILTER_SUCCESS,
  INHOUSE_Company_FILTER_FAIL,
  INHOUSE_COMPANY_SEARCH_REQUEST,
  INHOUSE_COMPANY_SEARCH_SUCCESS,
  INHOUSE_Company_SEARCH_FAIL,
  INHOUSE_COMPANY_COUNT_REQUEST,
  INHOUSE_COMPANY_COUNT_SUCCESS,
  INHOUSE_Company_COUNT_FAIL,
} from "../../constants/Member-Dam-Constants";

import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";

export const damShare = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_DAM_SHARE_REQUEST,
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
      type: MEMBER_DAM_SHARE_SUCCESS,
      payload: data,
    });
    // console.log("data", data);

    return true;
  } catch (error) {
    // console.log("error", error);
    dispatch({
      type: MEMBER_DAM_SHARE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllDam =
  (id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_ID_REQUEST,
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
      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?id=${id}&type=1&agency=${agencyid}&company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?id=${id}&type=1&agency=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_ID_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listAllRootImages =
  (id, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_ROOT_IMAGES_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-root/?type=3&ordering=-created&agency=${id}&company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-root/?type=3&ordering=-created&agency=${id}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_ROOT_IMAGES_SUCCESS,
        payload: data?.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_ROOT_IMAGES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listAllCollectionDAM =
  (id, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_LIST_COLLECTION_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-root/?type=2&ordering=-created&agency=${id}&company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-root/?type=2&ordering=-created&agency=${id}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_LIST_COLLECTION_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_LIST_COLLECTION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listAllROOTDam =
  (id, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_ROOT_LIST_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-root/?type=1&ordering=-created&agency=${id}&company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-root/?type=1&ordering=-created&agency=${id}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_ROOT_LIST_SUCCESS,
        payload: data?.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_ROOT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listAllDamImages =
  (id, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_IMAGES_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media/latest_records?dam__agency=${id}&dam__company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media/latest_records?dam__agency=${id}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_IMAGES_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_IMAGES_FAIL,
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
      type: MEMBER_DAM_DELETE_REQUEST,
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
      `${BACKEND_API_URL}members/member-dam/selected_delete/`,
      params,
      config
    );

    dispatch({
      type: MEMBER_DAM_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DAM_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getdamDetailswithid =
  (id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_ID_LIST_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?parent=${id}&type=1&ordering=-created/&agency=${agencyid}&company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?parent=${id}&type=1&ordering=-created/&agency=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_ID_LIST_SUCCESS,
        payload: data.data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_ID_LIST_FAIL,
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
        type: MEMBER_DAM_COLLECTION_ID_LIST_REQUEST,
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

      let data = [];
      if (id) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?id=${id}&type=2&ordering=-created`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?parent=${parentid}&type=2&ordering=-created`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_COLLECTION_ID_LIST_SUCCESS,
        payload: data.data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_COLLECTION_ID_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getdamImageswithid =
  (id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_ID_IMAGES_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?parent=${id}&type=3&ordering=-created&agency=${agencyid}&${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?parent=${id}&type=3&ordering=-created&agency=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_ID_IMAGES_SUCCESS,
        payload: data.data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_ID_IMAGES_FAIL,
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
      type: MEMBER_DAM_DETAILS_REQUEST,
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
      type: MEMBER_DAM_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DAM_DETAILS_FAIL,
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
      type: MEMBER_DAM_LIST_POST_REQUEST,
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
      `${BACKEND_API_URL}members/member-dam/`,
      params,
      config
    );

    dispatch({
      type: MEMBER_DAM_LIST_POST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DAM_LIST_POST_FAIL,
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
      type: MEMBER_DAM_POST_COLLECTION_REQUEST,
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
      `${BACKEND_API_URL}members/member-dam/`,
      params,
      config
    );

    dispatch({
      type: MEMBER_DAM_POST_COLLECTION_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DAM_POST_COLLECTION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DAMParentPostCollection =
  (params, id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_POST_ID_COLLECTION_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam/?parent=${id}/`,
        params,
        config
      );

      dispatch({
        type: MEMBER_DAM_POST_ID_COLLECTION_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_POST_ID_COLLECTION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DAMParentPost =
  (params, id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_PARENT_LIST_POST_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam/?parent=${id}/`,
        params,
        config
      );

      dispatch({
        type: MEMBER_DAM_PARENT_LIST_POST_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_PARENT_LIST_POST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DAMParentCollection =
  (id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_COLLECTION_LIST_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?parent=${id}&type=2&ordering=-created&agency=${agencyid}&${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam/?parent=${id}&type=2&ordering=-created&agency=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_COLLECTION_LIST_SUCCESS,
        payload: data.data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_COLLECTION_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const Favorites =
  (params, id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_Favourite_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam/${id}/`,
        params,
        config
      );

      dispatch({
        type: MEMBER_DAM_Favourite_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_Favourite_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const Titleupdate =
  (params, id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_TITLE_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam-media/${id}/`,
        params,
        config
      );

      dispatch({
        type: MEMBER_DAM_TITLE_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_TITLE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteCollection =
  (id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_COLLECTION_DELETE_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam/${id}/`,
        config
      );

      dispatch({
        type: MEMBER_COLLECTION_DELETE_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_COLLECTION_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const CollectionView =
  (id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_COLLECTION_VIEW_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media/get_multiple?id=${id}&dam__agency=${agencyid}&${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media/get_multiple?id=${id}&dam__agency=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_COLLECTION_VIEW_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_COLLECTION_VIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const collectionfilespost =
  (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_COLLECTION_FILES_POST_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam/create_collection/`,
        params,
        config
      );

      dispatch({
        type: MEMBER_COLLECTION_FILES_POST_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_COLLECTION_FILES_POST_FAIL,
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
      type: MEMBER_MOVE_FILES_POST_REQUEST,
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
      `${BACKEND_API_URL}members/member-dam/${id}/`,
      params,
      config
    );

    dispatch({
      type: MEMBER_MOVE_FILES_POST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_MOVE_FILES_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamMovefolderdata =
  (id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_MOVE_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam-duplicate/?parent=${id}&type=1&agency=${agencyid}`,
        config
      );

      dispatch({
        type: MEMBER_DAM_MOVE_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_MOVE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamrootMovefolderdata =
  (id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_ROOT_MOVE_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam-duplicate/?root=1&type=1&agency=${id}`,
        config
      );

      dispatch({
        type: MEMBER_DAM_ROOT_MOVE_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_ROOT_MOVE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const Damcopypost = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_DAM_ROOT_COPY_REQUEST,
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
      `${BACKEND_API_URL}members/member-dam/copy_to/`,
      params,
      config
    );

    dispatch({
      type: MEMBER_DAM_ROOT_COPY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DAM_ROOT_COPY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Renamefolder =
  (params, id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_RENAME_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam/${id}/`,
        params,
        config
      );

      dispatch({
        type: MEMBER_DAM_RENAME_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_RENAME_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamrootMoveCollection =
  (id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_COLLECTION_COPY_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam-duplicate/?root=1&type=2&agency=${id}`,
        config
      );

      dispatch({
        type: MEMBER_DAM_COLLECTION_COPY_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_COLLECTION_COPY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamrootMoveCollectionID =
  (id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_COLLECTION_COPY_ID_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam-duplicate/?parent=${id}&type=2&agency=${agencyid}`,
        config
      );

      dispatch({
        type: MEMBER_DAM_COLLECTION_COPY_ID_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_COLLECTION_COPY_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamMutipledelete =
  (id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_COLLECTION_MULTIPLE_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam-media/delete_multiple?id=${id}&dam__agency=${agencyid}`,
        config
      );

      dispatch({
        type: MEMBER_DAM_COLLECTION_MULTIPLE_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_COLLECTION_MULTIPLE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamMoveMultiple = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_DAM_MOVE_MULTIPLE_REQUEST,
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
      `${BACKEND_API_URL}members/member-dam/move_to`,
      params,
      config
    );

    dispatch({
      type: MEMBER_DAM_MOVE_MULTIPLE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DAM_MOVE_MULTIPLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamMoveCollectioninside =
  (params, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_MOVE_COLLECTION_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam-media/move_collection`,
        params,
        config
      );

      dispatch({
        type: MEMBER_DAM_MOVE_COLLECTION_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_MOVE_COLLECTION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
export const DamSearch =
  (id, agencyid, companyidinhouse, parentid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_SEARCH_REQUEST,
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
      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media?search=${id}&dam__agency=${agencyid}&company=${companyidinhouse}&dam__parent=${parentid}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media?search=${id}&dam__agency=${agencyid}&dam__parent=${parentid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_SEARCH_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_SEARCH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamSearchfolder =
  (id, agencyid, companyidinhouse, parentid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_SEARCH1_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam?search=${id}&agency=${agencyid}&company=${companyidinhouse}&parent=${parentid}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam?search=${id}&agency=${agencyid}&parent=${parentid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_SEARCH1_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_SEARCH1_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamVideo = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_DAM_VIDEOS_REQUEST,
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
      `${BACKEND_API_URL}members/member-dam/move_to`,
      params,
      config
    );

    dispatch({
      type: MEMBER_DAM_VIDEOS_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DAM_VIDEOS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DamFilterFavourate =
  (id, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/favourites?agency=${id}&company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/favourites?agency=${id}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamFilterFavourate1 =
  (id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_ID_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/favourites?id=${id}&agency=${agencyid}&company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/favourites?id=${id}&agency=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_ID_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamFilterFavourateCount =
  (id, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_COUNT_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/count/?&user_id=${id}&company_id=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/count/?&user_id=${id}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_COUNT_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_COUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DamFilterFavourateCountID =
  (id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media-filter/?${id}&agency=${agencyid}&company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media-filter/?${id}&agency=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_FAVOURATE_FILTER_COUNT_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listAllMostUsedcount =
  (id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_MostUsed_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/count?id=${id}&user_id=${agencyid}&company_id=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/count?id=${id}&user_id=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_MostUsed_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_MostUsed_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listAllParentFilter =
  (filter, id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_PARENT_FILTER_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media-filter/?${filter}&parent=${id}&agency=${agencyid}&company=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-media-filter/?${filter}&parent=${id}&agency=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_PARENT_FILTER_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_PARENT_FILTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listCompanies =
  (agencyid, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_Company_REQUEST,
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
        `${BACKEND_API_URL}members/company-media-count?&user_id=${agencyid}${params}`,
        config
      );

      dispatch({
        type: MEMBER_DAM_Company_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_Company_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listCompaniesID =
  (id, agencyid, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_Company_ID_REQUEST,
      });

      let data = [];

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
          `${BACKEND_API_URL}members/company-media-count/?id=${id}&user_id=${agencyid}${params}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/company-media-count/?id=${id}&user_id=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_Company_ID_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_Company_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const CountCompanies =
  (id, agencyid, companyidinhouse) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_Company_COUNT_REQUEST,
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

      let data = [];

      if (userData?.user?.user_level == 4) {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/count?company=${id}&user_id=${agencyid}&company_id=${companyidinhouse}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}members/member-dam-filter/count?company_id=${id}&user_id=${agencyid}`,
          config
        );
      }

      dispatch({
        type: MEMBER_DAM_Company_COUNT_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_Company_COUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const CountCompaniesID =
  (parentid, id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_DAM_Company_COUNT_ID_REQUEST,
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
        `${BACKEND_API_URL}members/member-dam-filter/count?id=${parentid}&company_id=${id}&agency=${agencyid}`,
        config
      );

      dispatch({
        type: MEMBER_DAM_Company_COUNT_ID_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_DAM_Company_COUNT_ID_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const InHouseCompanyId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INHOUSE_COMPANY_ID_REQUEST,
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
    let data = [];

    if (userData?.user?.user_level == 4) {
      data = await api.get(
        `${BACKEND_API_URL}inhouse-user-list/?user__user=${id}`,
        config
      );
    } else {
    }

    dispatch({
      type: INHOUSE_COMPANY_ID_SUCCESS,
      payload: data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: INHOUSE_Company_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const InhouseDamCollectionSearch =
  (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INHOUSE_COMPANY_SEARCH_REQUEST,
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
        `${BACKEND_API_URL}members/member-collection-filter/?dam_id=${params}&search=${id}`,
        config
      );

      dispatch({
        type: INHOUSE_COMPANY_SEARCH_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: INHOUSE_Company_SEARCH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const InhouseCollectionfilter =
  (id, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INHOUSE_COMPANY_FILTER_REQUEST,
      });
      let data = [];
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
        `${BACKEND_API_URL}members/member-collection-filter?dam_id=${id}${params}`,
        config
      );

      dispatch({
        type: INHOUSE_COMPANY_FILTER_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: INHOUSE_Company_FILTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const InhouseCountfilter =
  (id, agencyid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INHOUSE_COMPANY_COUNT_REQUEST,
      });
      let data = [];
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
        `${BACKEND_API_URL}members/collection-count/?id=${id}&agency=${agencyid}`,
        config
      );

      dispatch({
        type: INHOUSE_COMPANY_COUNT_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: INHOUSE_Company_COUNT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };