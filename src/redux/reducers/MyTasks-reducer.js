import {
    AGENCY_MY_TASKS_LIST_FILTER_REQUEST,
    AGENCY_MY_TASKS_LIST_FILTER_SUCCESS,
    AGENCY_MY_TASKS_LIST_FILTER_FAIL,
    AGENCY_MY_TASKS_LIST_FILTER_RESET,
    MY_TASKS_DETAILS_AGENCY_REQUEST,
    MY_TASKS_DETAILS_AGENCY_SUCCESS,
    MY_TASKS_DETAILS_AGENCY_FAIL,
    MY_TASKS_DETAILS_AGENCY_RESET,
    UPDATE_MY_TASK_REQUEST,
    UPDATE_MY_TASK_SUCCESS,
    UPDATE_MY_TASK_FAIL,
    UPDATE_MY_TASK_RESET,
} from "../../constants/MyTasks-constants";

export const agencyMyTasksByFilterReducer = (
    state = { agencyMyTasksByFilterData: [] },
    action
) => {
    switch (action.type) {
        case AGENCY_MY_TASKS_LIST_FILTER_REQUEST:
            return { ...state, loading: true };

        case AGENCY_MY_TASKS_LIST_FILTER_SUCCESS:
            return {
                loading: false,
                success: true,
                agencyMyTasksByFilterData: action.payload.results,
                next: action.payload.next,
                previous: action.payload.previous,
                count: action.payload.count,
            };

        case AGENCY_MY_TASKS_LIST_FILTER_FAIL:
            return { loading: false, error: action.payload };

        case AGENCY_MY_TASKS_LIST_FILTER_RESET:
            return { agencyMyTasksByFilterData: [] };

        default:
            return state;
    }
};

export const myTasksDetailsAgencyReducer = (state = { myTaskDetails: {} }, action) => {
    switch (action.type) {
        case MY_TASKS_DETAILS_AGENCY_REQUEST:
            return { ...state, loading: true };

        case MY_TASKS_DETAILS_AGENCY_SUCCESS:
            return { loading: false, myTaskDetails: action.payload, success: true };

        case MY_TASKS_DETAILS_AGENCY_FAIL:
            return { loading: false, error: action.payload };

        case MY_TASKS_DETAILS_AGENCY_RESET:
            return { myTaskDetails: {} };

        default:
            return state;
    }
};

export const updatemyTaskReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_MY_TASK_REQUEST:
        return { loading: true };
  
      case UPDATE_MY_TASK_SUCCESS:
        return { loading: false, success: true };
  
      case UPDATE_MY_TASK_FAIL:
        return { loading: false, error: action.payload };
  
      case UPDATE_MY_TASK_RESET:
        return {};
  
      default:
        return state;
    }
  };