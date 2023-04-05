import { useAppDispatch, useAppSelector } from "redux/store";
import { TOGGLE_SIDEBAR } from "redux/actions/config/app/app.actions";
import { IS_SIDEBAR_COLLAPSED } from "redux/reducers/config/app/app.slice";
import { Menu } from "@mui/icons-material";

const SidebarToggle = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(IS_SIDEBAR_COLLAPSED);

  return (
    <button
      className="btn-ic"
      onClick={() => dispatch(TOGGLE_SIDEBAR(!isSidebarCollapsed))}
    >
      <Menu />
    </button>
  );
};
export default SidebarToggle;
