import {
  AGENCY_COMPANY_PROJECT_LIST_REQUEST,
  AGENCY_COMPANY_PROJECT_LIST_SUCCESS,
  AGENCY_COMPANY_PROJECT_LIST_FAIL,
  AGENCY_COMPANY_PROJECT_FILTERS_LIST_REQUEST,
  AGENCY_COMPANY_PROJECT_FILTERS_LIST_SUCCESS,
  AGENCY_COMPANY_PROJECT_FILTERS_LIST_FAIL,
  AGENCY_COMPANY_TAGS_LIST_REQUEST,
  AGENCY_COMPANY_TAGS_LIST_SUCCESS,
  AGENCY_COMPANY_TAGS_LIST_FAIL,
  AGENCY_COMPANY_PROJECT_LIST,
  AGENCY_COMPANY_TAGS_LIST,
  AGENCY_COMPANY_ADD_TAG_REQUEST,
  AGENCY_COMPANY_ADD_TAG_SUCCESS,
  AGENCY_COMPANY_ADD_TAG_FAIL,
  AGENCY_COMPANY_ADD_TAG_RESET,
  AGENCY_COMMUNITY_SETTINGS_LIST_REQUEST,
  AGENCY_COMMUNITY_SETTINGS_LIST_SUCCESS,
  AGENCY_COMMUNITY_SETTINGS_LIST_FAIL,
  AGENCY_AUDIENCES_LIST_REQUEST,
  AGENCY_AUDIENCES_LIST_SUCCESS,
  AGENCY_AUDIENCES_LIST_FAIL,
  AGENCY_COMPANY_STORY_DETAILS_REQUEST,
  AGENCY_COMPANY_STORY_DETAILS_SUCCESS,
  AGENCY_COMPANY_STORY_DETAILS_FAIL,
} from "../../constants/Agency-companies-constants";

// Agency Company Projects list*******
export const AgencyCompanyProjectsReducer = (
  state = { agencyCompanyProjectsList: [], agencyCompanyProjectListData: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_COMPANY_PROJECT_LIST_REQUEST:
      return { loading: true };
    case AGENCY_COMPANY_PROJECT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyCompanyProjectsList: action.payload,
      };
    case AGENCY_COMPANY_PROJECT_LIST:
      return {
        ...state,
        loading: false,
        success: true,
        agencyCompanyProjectListData: action.payload,
      };
    case AGENCY_COMPANY_PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
// Agency Company Projects list*******

// Agency Company Story details*******
export const AgencyCompanyStoryDetailReducer = (
  state = { loading: null, aagencyCompanyStoryDetails: {} },
  action
) => {
  switch (action.type) {
    case AGENCY_COMPANY_STORY_DETAILS_REQUEST:
      return { loading: action.payload };
    case AGENCY_COMPANY_STORY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyCompanyStoryDetails: action.payload,
      };
    case AGENCY_COMPANY_STORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
// Agency Company Story details*******

// Agency Company Projects filters list*******
export const AgencyCompanyProjectsFiltersReducer = (
  state = { agencyCompanyProjectsFiltersList: null },
  action
) => {
  switch (action.type) {
    case AGENCY_COMPANY_PROJECT_FILTERS_LIST_REQUEST:
      return { loading: true };
    case AGENCY_COMPANY_PROJECT_FILTERS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyCompanyProjectsFiltersList: action.payload,
      };
    case AGENCY_COMPANY_PROJECT_FILTERS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
// Agency Company Projects filters list*******

// Agency tags list*******
export const AgencyCompanyTagsReducer = (
  state = { agencyCompanyTagsList: [], agencyCompanyTagsListData: {} },
  action
) => {
  switch (action.type) {
    case AGENCY_COMPANY_TAGS_LIST_REQUEST:
      return { loading: true };
    case AGENCY_COMPANY_TAGS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        agencyCompanyTagsList: action.payload,
      };
    case AGENCY_COMPANY_TAGS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case AGENCY_COMPANY_TAGS_LIST:
      return {
        ...state,
        loading: false,
        success: true,
        agencyCompanyTagsListData: action.payload,
      };
    default:
      return state;
  }
};
// Agency tags list*******

// Agency tags list*******
export const AgencyAddCompanyTagReducer = (
  state = { agencyCompanyAddTagStatus: "" },
  action
) => {
  switch (action.type) {
    case AGENCY_COMPANY_ADD_TAG_REQUEST:
      return { loading: true };
    case AGENCY_COMPANY_ADD_TAG_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyCompanyAddTagStatus: action.payload,
      };
    case AGENCY_COMPANY_ADD_TAG_FAIL:
      return { loading: false, error: action.payload };
    case AGENCY_COMPANY_ADD_TAG_RESET:
      return { agencyCompanyAddTagStatus: "" };
    default:
      return state;
  }
};
// Agency Community Settings states*******
export const AgencyCommunitySettingsReducer = (
  state = { agencyCommunitySettingsData: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_COMMUNITY_SETTINGS_LIST_REQUEST:
      return { loading: true };
    case AGENCY_COMMUNITY_SETTINGS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyCommunitySettingsData: action.payload,
      };
    case AGENCY_COMMUNITY_SETTINGS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
// Agency Audiences states*******
export const AgencyAudiencesReducer = (
  state = { agencyAudiencesData: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_AUDIENCES_LIST_REQUEST:
      return { loading: true };
    case AGENCY_AUDIENCES_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyAudiencesData: action.payload,
      };
    case AGENCY_AUDIENCES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
