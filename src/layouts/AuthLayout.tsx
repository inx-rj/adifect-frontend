import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div role="main" className="bg-[#2472fc0f] w-full min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
