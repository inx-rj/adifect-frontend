import {
  AGENCY_TOP_ADS_LIST_REQUEST,
  AGENCY_TOP_ADS_LIST_SUCCESS,
  AGENCY_TOP_ADS_LIST_FAIL,
  AGENCY_ADS_CHART_REQUEST,
  AGENCY_ADS_CHART_SUCCESS,
  AGENCY_ADS_CHART_FAIL,
} from "../../constants/Agency-analytics-constants";

// Agency Top ads list*******
export const AgencyAnalyticsAdsListReducer = (
  state = { agencyTopAdsList: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_TOP_ADS_LIST_REQUEST:
      return { loading: true };
    case AGENCY_TOP_ADS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyTopAdsList: action.payload,
      };
    case AGENCY_TOP_ADS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
// Agency Top ads list*******

export const AgencyAnalyticsChartReducer = (
  state = { agencyAdsChartData: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_ADS_CHART_REQUEST:
      return { loading: true };
    case AGENCY_ADS_CHART_SUCCESS:
      return {
        loading: false,
        success: true,
        agencyAdsChartData: action.payload,
      };
    case AGENCY_ADS_CHART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
