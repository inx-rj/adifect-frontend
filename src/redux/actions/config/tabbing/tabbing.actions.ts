import { RESET_TAB_NAVIGATION_CONFIG, SET_TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { AppDispatch } from "redux/store";

const TRIGGER_NAVIGATION_TAB_CONFIG = (type: string, active:string) => {
    return async (dispatch: AppDispatch) => dispatch(SET_TAB_NAVIGATION_CONFIG({ type, active }));
};

const TRIGGER_RESET_NAVIGATION_TAB_CONFIG = () => {
    return async (dispatch: AppDispatch) => dispatch(RESET_TAB_NAVIGATION_CONFIG());
};

export { TRIGGER_NAVIGATION_TAB_CONFIG, TRIGGER_RESET_NAVIGATION_TAB_CONFIG}