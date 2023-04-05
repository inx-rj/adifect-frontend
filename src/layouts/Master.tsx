import { Navigate, Outlet } from "react-router-dom";
import { IS_PERSISTED } from "redux/reducers/config/app/app.slice";
import { useAppSelector } from "redux/store";

const Master = () => {
  // Redux states
  const isPersist = useAppSelector(IS_PERSISTED);

  return isPersist ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Master;
