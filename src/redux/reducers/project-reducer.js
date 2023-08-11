import {
  AGENCY_PROJECTS_LIST_FILTER_REQUEST,
  AGENCY_PROJECTS_LIST_FILTER_SUCCESS,
  AGENCY_PROJECTS_LIST_FILTER_FAIL,
  AGENCY_PROJECTS_LIST_FILTER_RESET,
  AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_REQUEST,
  AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_SUCCESS,
  AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_FAIL,
  AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_RESET,
  PROJECTS_LIST_FILTER_REQUEST,
  PROJECTS_LIST_FILTER_SUCCESS,
  PROJECTS_LIST_FILTER_FAIL,
  PROJECTS_LIST_FILTER_RESET,
  PROJECTS_LIST_FILTER_DUPLICATE_REQUEST,
  PROJECTS_LIST_FILTER_DUPLICATE_SUCCESS,
  PROJECTS_LIST_FILTER_DUPLICATE_FAIL,
  PROJECTS_LIST_FILTER_DUPLICATE_RESET,
} from "../../constants/project-constants";

export const agencyProjectsByFilterReducer = (
  state = { agencyProjectsByFilterData: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_PROJECTS_LIST_FILTER_REQUEST:
      return { ...state, loading: true };

    case AGENCY_PROJECTS_LIST_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyProjectsByFilterData: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
      };

    case AGENCY_PROJECTS_LIST_FILTER_FAIL:
      return { loading: false, error: action.payload };

    case AGENCY_PROJECTS_LIST_FILTER_RESET:
      return { agencyProjectsByFilterData: [] };

    default:
      return state;
  }
};

export const agencyProjectsByFilterDuplicateReducer = (
  state = { agencyProjectsByFilterDuplicateData: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_REQUEST:
      return { ...state, loading: true };

    case AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyProjectsByFilterDuplicateData: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
      };

    case AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_FAIL:
      return { loading: false, error: action.payload };

    case AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_RESET:
      return { agencyProjectsByFilterDuplicateData: [] };

    default:
      return state;
  }
};

export const projectsByFilterReducer = (
  state = { projectsByFilterData: [] },
  action
) => {
  switch (action.type) {
    case PROJECTS_LIST_FILTER_REQUEST:
      return { ...state, loading: true };

    case PROJECTS_LIST_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        projectsByFilterData: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
      };

    case PROJECTS_LIST_FILTER_FAIL:
      return { loading: false, error: action.payload };

    case PROJECTS_LIST_FILTER_RESET:
      return { projectsByFilterData: [] };

    default:
      return state;
  }
};

export const projectsByFilterDuplicateReducer = (
  state = { projectsByFilterDuplicateData: [] },
  action
) => {
  switch (action.type) {
    case PROJECTS_LIST_FILTER_DUPLICATE_REQUEST:
      return { ...state, loading: true };

    case PROJECTS_LIST_FILTER_DUPLICATE_SUCCESS:
      return {
        loading: false,
        success: true,
        projectsByFilterDuplicateData: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
      };

    case PROJECTS_LIST_FILTER_DUPLICATE_FAIL:
      return { loading: false, error: action.payload };

    case PROJECTS_LIST_FILTER_DUPLICATE_RESET:
      return { projectsByFilterDuplicateData: [] };

    default:
      return state;
  }
};
