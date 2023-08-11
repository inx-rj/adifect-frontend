import {
  HELP_POST_COMMON_FAIL,
  HELP_POST_COMMON_REQUEST,
  HELP_POST_COMMON_SUCCESS,
  GET_HELP_POST_COMMON_FAIL,
  GET_HELP_POST_COMMON_REQUEST,
  GET_HELP_POST_COMMON_SUCCESS,
  GET_DETAILS_HELP_COMMON_FAIL,
  GET_DETAILS_HELP_COMMON_REQUEST,
  GET_DETAILS_HELP_COMMON_RESET,
  GET_DETAILS_HELP_COMMON_SUCCESS,
  HELP_MESSAGE_SEND_FAIL,
  HELP_MESSAGE_SEND_REQUEST,
  HELP_MESSAGE_SEND_SUCCESS,
  ADMIN_GET_HELP_USER_LIST_FAIL,
  ADMIN_GET_HELP_USER_LIST_REQUEST,
  ADMIN_GET_HELP_USER_LIST_SUCCESS,
  ADMIN_SHWO_MESSAGE_FAIL,
  ADMIN_SHWO_MESSAGE_REQUEST,
  ADMIN_SHWO_MESSAGE_SUCCESS,
  ADMIN_HELP_MESSAGE_SEND_FAIL,
  ADMIN_HELP_MESSAGE_SEND_REQUEST,
  ADMIN_HELP_MESSAGE_SEND_SUCCESS,
  AGENCY_HELP_CHAT_MESSAGE_SEND_FAIL,
  AGENCY_HELP_CHAT_MESSAGE_SEND_SUCCESS,
  AGENCY_HELP_CHAT_MESSAGE_SEND_REQUEST,
  AGENCY_HELP_CHAT_MESSAGE_RECEIVED_FAIL,
  AGENCY_HELP_CHAT_MESSAGE_RECEIVED_REQUEST,
  AGENCY_HELP_CHAT_MESSAGE_RECEIVED_SUCCESS,
} from "../../constants/Help-common-constant";
import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";
export const HelpCommonPostAction = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HELP_POST_COMMON_REQUEST,
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
      `${BACKEND_API_URL}help/`,
      params,
      config
    );

    dispatch({
      type: HELP_POST_COMMON_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: HELP_POST_COMMON_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const GetHelpCommonAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_HELP_POST_COMMON_REQUEST,
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
      `${BACKEND_API_URL}help/`,
      config
    );

    dispatch({
      type: GET_HELP_POST_COMMON_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: GET_HELP_POST_COMMON_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const GetDetailsHelpCommonAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_DETAILS_HELP_COMMON_REQUEST,
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
      `${BACKEND_API_URL}help/${id}/`,
      config
    );

    dispatch({
      type: GET_DETAILS_HELP_COMMON_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: GET_DETAILS_HELP_COMMON_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const HelpMessageSendAction = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HELP_MESSAGE_SEND_REQUEST,
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
      `${BACKEND_API_URL}help-chat/`,
      params,
      config
    );

    dispatch({
      type: HELP_MESSAGE_SEND_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: HELP_MESSAGE_SEND_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AdminGetHelpUserListAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_GET_HELP_USER_LIST_REQUEST,
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
      `${BACKEND_API_URL}admin-help/`,
      config
    );

    dispatch({
      type: ADMIN_GET_HELP_USER_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ADMIN_GET_HELP_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AdminGetHelpMessageAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_SHWO_MESSAGE_REQUEST,
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
      `${BACKEND_API_URL}admin-help/${id}/`,
      config
    );

    dispatch({
      type: ADMIN_SHWO_MESSAGE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ADMIN_SHWO_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AdminHelpMessageSendAction = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_HELP_MESSAGE_SEND_REQUEST,
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
      `${BACKEND_API_URL}help-chat/`,
      params,
      config
    );

    dispatch({
      type: ADMIN_HELP_MESSAGE_SEND_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ADMIN_HELP_MESSAGE_SEND_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AgencyHelpMessageSendAction = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGENCY_HELP_CHAT_MESSAGE_SEND_REQUEST,
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
      `${BACKEND_API_URL}agency-help-chat/`,
      params,
      config
    );

    dispatch({
      type: AGENCY_HELP_CHAT_MESSAGE_SEND_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCY_HELP_CHAT_MESSAGE_SEND_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


// export const AgencyHelpMessageReceiveAction = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: AGENCY_HELP_CHAT_MESSAGE_RECEIVED_REQUEST,
//     });

//     const {
//       authReducer: { userData },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userData.token}`,
//       },
//     };

//     const { data } = await api.get(
//       `${BACKEND_API_URL}agency-help-chat/${id}/`,
//       config
//     );

//     dispatch({
//       type: AGENCY_HELP_CHAT_MESSAGE_RECEIVED_SUCCESS,
//       payload: data,
//     });

//     return true;
//   } catch (error) {
//     dispatch({
//       type: AGENCY_HELP_CHAT_MESSAGE_RECEIVED_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };