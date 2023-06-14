import {
  MEMBER_APPROVER_COMPANY_FAILURE,
  MEMBER_APPROVER_COMPANY_REQUEST,
  MEMBER_APPROVER_COMPANY_SUCCESS,
  MEMBER_APPROVER_COMPANY_RESET,
  MEMBER_APPROVER_COMPANY_DATA_FAILURE,
  MEMBER_APPROVER_COMPANY_DATA_REQUEST,
  MEMBER_APPROVER_COMPANY_DATA_RESET,
  MEMBER_APPROVER_COMPANY_DATA_SUCCESS,
} from "../../constants/Member-approver-company-constants";
export const memberApproverComapnyReducer = (
  state = { getMemberApproverCompany: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_APPROVER_COMPANY_REQUEST:
      return { ...state, loading: true };

    case MEMBER_APPROVER_COMPANY_SUCCESS:
      return {
        loading: false,
        getMemberApproverCompany: action.payload,
        success: true,
      };

    case MEMBER_APPROVER_COMPANY_FAILURE:
      return { loading: false, error: action.payload };

    case MEMBER_APPROVER_COMPANY_RESET:
      return { getMemberApproverCompany: [] };

    default:
      return state;
  }
};

export const memberApproverComapnyDataReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_APPROVER_COMPANY_DATA_REQUEST:
      return { loading: true };
    case MEMBER_APPROVER_COMPANY_DATA_SUCCESS:
      return {
        loading: false,
        success: true,
        memberCompanyData: action.payload.data,
        memberCompanyTotalJobCount: action.payload.Total_Job_count,
      };
    case MEMBER_APPROVER_COMPANY_DATA_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
