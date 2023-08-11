import {
  MEMBER_PROJECT_APPLIED_RESET,
  MEMBER_PROJECT_APPLIED_FAILURE,
  MEMBER_PROJECT_APPLIED_REQUEST,
  MEMBER_PROJECT_APPLIED_SUCCESS,
  MEMBER_INHOUSE_PROJECT_APPLIED_FAIL,
  MEMBER_INHOUSE_PROJECT_APPLIED_REQUEST,
  MEMBER_INHOUSE_PROJECT_APPLIED_RESET,
  MEMBER_INHOUSE_PROJECT_APPLIED_SUCCESS,
} from "../../constants/Member-Project-Constants";
export const MemberProjectsByFilterReducer = (
  state = { MemberProjectsByFilterData: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_PROJECT_APPLIED_REQUEST:
      return { ...state, loading: true };

    case MEMBER_PROJECT_APPLIED_SUCCESS:
      return {
        loading: false,
        success: true,
        MemberProjectsByFilterData: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
      };

    case MEMBER_PROJECT_APPLIED_FAILURE:
      return { loading: false, error: action.payload };

    case MEMBER_PROJECT_APPLIED_RESET:
      return { MemberProjectsByFilterData: [] };

    default:
      return state;
  }
};

export const MemberInhouseProjectsByFilterReducer = (
  state = { MemberInhouseProjectsByFilterData: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_INHOUSE_PROJECT_APPLIED_REQUEST:
      return { ...state, loading: true };

    case MEMBER_INHOUSE_PROJECT_APPLIED_SUCCESS:
      return {
        loading: false,
        success: true,
        MemberInhouseProjectsByFilterData: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
      };

    case MEMBER_INHOUSE_PROJECT_APPLIED_FAIL:
      return { loading: false, error: action.payload };

    case MEMBER_INHOUSE_PROJECT_APPLIED_RESET:
      return { MemberInhouseProjectsByFilterData: [] };

    default:
      return state;
  }
};
