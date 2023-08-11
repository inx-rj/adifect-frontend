import {
  Question_LIST_REQUEST,
  Question_LIST_SUCCESS,
  Question_LIST_FAIL,
  Question_DETAILS_REQUEST,
  Question_DETAILS_SUCCESS,
  Question_DETAILS_FAIL,
  Question_DETAILS_RESET,
  Question_DELETE_REQUEST,
  Question_DELETE_SUCCESS,
  Question_DELETE_FAIL,
  Question_LIST_SEARCH,
  Question_LIST_SUCCESS_SEARCH,
  Question_LIST_FAIL_SEARCH,
  Question_LIST_SEARCH_ADMIN_REQUEST,
  Question_LIST_SEARCH_ADMIN_SUCCESS,
  Question_LIST_SEARCH_ADMIN_FAIL,
  QUESTION_ADD_REQUEST,
  QUESTION_ADD_SUCCESS,
  QUESTION_ADD_FAIL,
} from "../../constants/Question-constant";

export const QuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case Question_LIST_REQUEST:
      return { loading: true };
    case Question_LIST_SUCCESS:
      return { loading: false, search: true, QuestionData: action.payload };
    case Question_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const SearchQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case Question_LIST_SEARCH:
      return { loading: true };
    case Question_LIST_SUCCESS_SEARCH:
      return {
        loading: false,
        search: true,
        QuestionSearchData: action.payload.data,
      };
    case Question_LIST_FAIL_SEARCH:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const SearchQuestionAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case Question_LIST_SEARCH_ADMIN_REQUEST:
      return { loading: true };
    case Question_LIST_SEARCH_ADMIN_SUCCESS:
      return {
        loading: false,
        search: true,
        QuestionSearchData: action.payload.data,
      };
    case Question_LIST_SEARCH_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const QuestionDetailsReducer = (
  state = { QuestionDetails: {} },
  action
) => {
  switch (action.type) {
    case Question_DETAILS_REQUEST:
      return { loading: true };
    case Question_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        QuestionDetails: action.payload,
      };
    case Question_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case Question_DETAILS_RESET:
      return { QuestionDetails: {} };
    default:
      return state;
  }
};

export const QuestionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case Question_DELETE_REQUEST:
      return { loading: true };
    case Question_DELETE_SUCCESS:
      return { loading: false, success: true };
    case Question_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const PostQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_ADD_REQUEST:
      return { loading: true };
    case QUESTION_ADD_SUCCESS:
      return { loading: false, search: true, add_success: action.payload };
    case QUESTION_ADD_FAIL:
      return { loading: false, error_question: action.payload };
    default:
      return state;
  }
};
