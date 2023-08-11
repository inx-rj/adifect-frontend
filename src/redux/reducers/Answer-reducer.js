import {
  Answer_LIST_REQUEST,
  Answer_LIST_SUCCESS,
  Answer_LIST_FAIL,
  Answer_DETAILS_REQUEST,
  Answer_DETAILS_SUCCESS,
  Answer_DETAILS_FAIL,
  Answer_DETAILS_RESET,
  Answer_DELETE_REQUEST,
  Answer_DELETE_SUCCESS,
  Answer_DELETE_FAIL,
  Answer_LIST_POST_REQUEST,
  Answer_LIST_POST_SUCCESS,
  Answer_LIST_POST_FAIL,
} from "../../constants/Answer-constant";

export const AnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case Answer_LIST_REQUEST:
      return { loading: true };
    case Answer_LIST_SUCCESS:
      return { loading: false, success: true, AnswerData: action.payload };
    case Answer_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const PostAnswerReducer = (state = {}, action) => {
  switch (action.type) {
    case Answer_LIST_POST_REQUEST:
      return { loading: true };
    case Answer_LIST_POST_SUCCESS:
      return { loading: false, success: true, AnswerPostData: action.payload };
    case Answer_LIST_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AnswerDetailsReducer = (state = { AnswerDetails: {} }, action) => {
  switch (action.type) {
    case Answer_DETAILS_REQUEST:
      return { loading: true };
    case Answer_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        AnswerDetails: action.payload,
      };
    case Answer_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case Answer_DETAILS_RESET:
      return { AnswerDetails: {} };
    default:
      return state;
  }
};

export const AnswerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case Answer_DELETE_REQUEST:
      return { loading: true };
    case Answer_DELETE_SUCCESS:
      return { loading: false, success: true };
    case Answer_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
