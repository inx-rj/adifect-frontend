import { AppDispatch } from "../../../store";
import {
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

export {
  TOGGLE_SIDEBAR,
  TRIGGER_PERSIST_MODE
};
