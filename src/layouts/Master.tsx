import { API_URL } from "helper/env";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useSingleEffect } from "react-haiku";
import { Navigate, Outlet } from "react-router-dom";
import { SET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { IS_PERSISTED } from "redux/reducers/config/app/app.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import { AUTH_ROUTE } from "routes/baseRoute";

const Master = () => {
  //Hooks
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  // Redux states
  const isPersist = useAppSelector(IS_PERSISTED);

  console.log({ isPersist }, 'InMaster');

  // To retrive user profile data on refresh
  useSingleEffect(() => {
    if (isPersist) {
      axiosPrivate.get(`${API_URL.AUTH.EDIT_PROFILE}`).then((response) => {
        if (response.status === 200) {
          dispatch(SET_USER_PROFILE_DATA(response?.data?.[0]));
        }
      });
    }
  });

  return isPersist ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={AUTH_ROUTE.LOGIN} />
  );
};

export default Master;
