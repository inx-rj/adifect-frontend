import React from "react";
import { Link } from "react-router-dom";
import { Images } from "../../../helper/images";
import { SYSTEM } from "routes/baseRoute";

const Logo: React.FC = () => {
  return (
    <Link
      className="brand inline-flex items-center text-theme w-full h-full"
      to={SYSTEM.HOME}
    >
      <img src={Images.Logo} alt="Rails" className=" h-full w-full" />
    </Link>
  );
};
export default Logo;
