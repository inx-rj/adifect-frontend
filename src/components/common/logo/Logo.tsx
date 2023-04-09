import React from "react";
import { Link } from "react-router-dom";
import { Images } from "../../../helper/images";
import { SYSTEM } from "routes/baseRoute";

const Logo: React.FC = () => {
  return (
    <Link
      className="brand inline-flex items-center text-theme w-full h-full img img-contain"
      to={SYSTEM.HOME}
    >
      <img src={Images.Logo} alt="Rails" className="hidden md:block" />
      <img src={Images.MiniLogo} alt="Rails" className="block md:hidden" />
    </Link>
  );
};
export default Logo;
