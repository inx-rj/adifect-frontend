import {
  PROPOSALS_LIST_REQUEST,
  PROPOSALS_LIST_SUCCESS,
  PROPOSALS_LIST_FAIL,
  REJECT_PROPOSAL_REQUEST,
  REJECT_PROPOSAL_SUCCESS,
  REJECT_PROPOSAL_FAIL,
  //   REJECT_PROPOSAL_RESET,
  ACCEPT_PROPOSAL_REQUEST,
  ACCEPT_PROPOSAL_SUCCESS,
  ACCEPT_PROPOSAL_FAIL,
  PROPOSALS_SEEN_REQUEST,
  PROPOSALS_SEEN_SUCCESS,
  PROPOSALS_SEEN_FAIL,
  PROPOSALS_SEEN_COUNT_REQUEST,
  PROPOSALS_SEEN_COUNT_SUCCESS,
  PROPOSALS_SEEN_COUNT_FAIL,
} from "../../constants/proposal-constants";

export const proposalsListReducer = (state = { proposalsData: [] }, action) => {
  switch (action.type) {
    case PROPOSALS_LIST_REQUEST:
      return {
        loading: true,
      };

    case PROPOSALS_LIST_SUCCESS:
      return {
        loading: false,
        proposalsData: action.payload.data,
        // not_seen_count: action.payload.not_seen_count,
        success: true,
      };

    case PROPOSALS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const proposalsSeenCountReducer = (state = {}, action) => {
  switch (action.type) {
    case PROPOSALS_SEEN_COUNT_REQUEST:
      return {
        loading: true,
      };

    case PROPOSALS_SEEN_COUNT_SUCCESS:
      return {
        loading: false,
        not_seen_count: action.payload.not_seen_count,
      };

    case PROPOSALS_SEEN_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const proposalsSeenReducer = (state = {}, action) => {
  switch (action.type) {
    case PROPOSALS_SEEN_REQUEST:
      return {
        loading: true,
      };

    case PROPOSALS_SEEN_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case PROPOSALS_SEEN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const rejectProposalReducer = (state = {}, action) => {
  switch (action.type) {
    case REJECT_PROPOSAL_REQUEST:
      return { loading: true };

    case REJECT_PROPOSAL_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REJECT_PROPOSAL_FAIL:
      return { loading: false, error: action.payload };
    // case SKILL_DETAILS_RESET:
    //   return { skillDetails: {} };
    default:
      return state;
  }
};

export const acceptProposalReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_PROPOSAL_REQUEST:
      return { loading: true };

    case ACCEPT_PROPOSAL_SUCCESS:
      return { loading: false, success: true };

    case ACCEPT_PROPOSAL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
