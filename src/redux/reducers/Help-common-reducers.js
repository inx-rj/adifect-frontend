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

export const HelpCommonPostReducer = (state = {}, action) => {
  switch (action.type) {
    case HELP_POST_COMMON_REQUEST:
      return { loading: true };
    case HELP_POST_COMMON_SUCCESS:
      return { loading: false, success: true, helpPost: action.payload };
    case HELP_POST_COMMON_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const GetHelpCommonReducer = (state = { GetHelpCommon: [] }, action) => {
  switch (action.type) {
    case GET_HELP_POST_COMMON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_HELP_POST_COMMON_SUCCESS:
      return {
        loading: false,
        GetHelpCommon: action.payload,
        success: true,
      };
    case GET_HELP_POST_COMMON_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // case ADMIN_WORKFLOW_LIST_RESET:
    //   return {
    //     GetHelpCommon: [],
    //   };
    default:
      return state;
  }
};

export const GetDetailsHelpCommonReducer = (
  state = { GetDetailsHelpCommon: {} },
  action
) => {
  switch (action.type) {
    case GET_DETAILS_HELP_COMMON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DETAILS_HELP_COMMON_SUCCESS:
      return {
        loading: false,
        GetDetailsHelpCommon: action.payload,
        success: true,
      };
    case GET_DETAILS_HELP_COMMON_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // case GET_DETAILS_HELP_COMMON_RESET:
    //   return {
    //     GetDetailsHelpCommon: [],
    //   };
    default:
      return state;
  }
};


export const HelpMessageSendReducer = (state = {}, action) => {
  switch (action.type) {
    case HELP_MESSAGE_SEND_REQUEST:
      return { loading: true };
    case HELP_MESSAGE_SEND_SUCCESS:
      return { loading: false, success: true, helpMessageSend: action.payload };
    case HELP_MESSAGE_SEND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AdminGetHelpUsersListReducer = (state = { adminUserListHelp: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_HELP_USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_GET_HELP_USER_LIST_SUCCESS:
      return {
        loading: false,
        adminUserListHelp: action.payload,
        success: true,
      };
    case ADMIN_GET_HELP_USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const AdminGetHelpMessageReducer = (state = { adminHelpMessage: [] }, action) => {
  switch (action.type) {
    case ADMIN_SHWO_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_SHWO_MESSAGE_SUCCESS:
      return {
        loading: false,
        adminHelpMessage: action.payload,
        success: true,
      };
    case ADMIN_SHWO_MESSAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AdminHelpCommonPostReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_HELP_MESSAGE_SEND_REQUEST:
      return { loading: true };
    case ADMIN_HELP_MESSAGE_SEND_SUCCESS:
      return { loading: false, success: true, adminMessagePost: action.payload };
    case ADMIN_HELP_MESSAGE_SEND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AgencyHelpMessageSendReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_HELP_CHAT_MESSAGE_SEND_REQUEST:
      return { loading: true };
    case AGENCY_HELP_CHAT_MESSAGE_SEND_SUCCESS:
      return { loading: false, success: true, agencyMessagePost: action.payload };
    case AGENCY_HELP_CHAT_MESSAGE_SEND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// export const AgencyHelpMessageReceiveReducer = (state = { agencyHelpMessageRec: [] }, action) => {
//   switch (action.type) {
//     case AGENCY_HELP_CHAT_MESSAGE_RECEIVED_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case AGENCY_HELP_CHAT_MESSAGE_RECEIVED_SUCCESS:
//       return {
//         loading: false,
//         agencyHelpMessageRec: action.payload,
//         success: true,
//       };
//     case AGENCY_HELP_CHAT_MESSAGE_RECEIVED_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
