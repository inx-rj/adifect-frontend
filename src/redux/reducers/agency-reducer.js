import {
  AGENCY_ADMIN_LIST_REQUEST,
  AGENCY_ADMIN_LIST_SUCCESS,
  AGENCY_ADMIN_LIST_FAIL,
} from "../../constants/agency-constants";

export const agencyAdminReducer = (state = { agencyadminData: [] }, action) => {
  switch (action.type) {
    case AGENCY_ADMIN_LIST_REQUEST:
      return { loading: true };
    case AGENCY_ADMIN_LIST_SUCCESS:
      return { loading: false, success: true, agencyadminData: action.payload };
    case AGENCY_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
