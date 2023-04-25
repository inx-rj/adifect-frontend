import { Navigate, Outlet } from "react-router-dom";
import { MAIN_ROUTE } from "../routes/baseRoute";
import { useAppSelector } from "redux/store";
import { IS_PERSISTED } from "redux/reducers/config/app/app.slice";

const AuthLayout = () => {

  const isPersist = useAppSelector(IS_PERSISTED);

  // To be updated with redux
  if (isPersist) {
    return <Navigate to={MAIN_ROUTE.HOME} replace={true} state={true} />;
  }

  return (
    <main role="main" className="min-h-screen">
      <section className="relative">
        <Outlet />
      </section>
    </main>
  );
};

export default AuthLayout;
