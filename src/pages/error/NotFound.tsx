import React from "react";
import { Images } from "helper/images";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <img src={Images.NotFoundImg} alt="" />
    </div>
  );
}

export default NotFound;