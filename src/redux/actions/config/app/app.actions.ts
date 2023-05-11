import { AppDispatch } from "../../../store";
import {
  SET_HEADER_COMPANY,
  SET_PERSIST,
  SET_SIDEBAR,
} from "../../../reducers/config/app/app.slice";

// Triger Persist mode
const TRIGGER_PERSIST_MODE = (payload: boolean) => {
  return async (dispatch: AppDispatch) => dispatch(SET_PERSIST(payload));
};

// Handle sidebar
const TOGGLE_SIDEBAR = (payload: boolean) => {
  return async (dispatch: AppDispatch) => dispatch(SET_SIDEBAR(payload));
};

// Header company
const TRIGGER_HEADER_COMPANY = (payload: number | string) => {
  return async (dispatch: AppDispatch) => dispatch(SET_HEADER_COMPANY(payload));
};

export { TOGGLE_SIDEBAR, TRIGGER_PERSIST_MODE, TRIGGER_HEADER_COMPANY };
