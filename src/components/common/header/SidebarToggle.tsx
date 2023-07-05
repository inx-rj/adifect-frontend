import { useAppDispatch, useAppSelector } from "redux/store";
import { TOGGLE_SIDEBAR } from "redux/actions/config/app/app.actions";
import { IS_SIDEBAR_OPEN } from "redux/reducers/config/app/app.slice";
import { Menu } from "@mui/icons-material";

const SidebarToggle = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(IS_SIDEBAR_OPEN);

  return (
    <button
      className="toggle-btn"
      onClick={() => dispatch(TOGGLE_SIDEBAR(!isSidebarOpen))}
    >
      <Menu />
    </button>
  );
};
export default SidebarToggle;
