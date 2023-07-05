import React from "react";
import { Images } from "helper/images";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container-bg">
      <div className={`spinner-container`}>
        <div className="loading-spinner">
          <img className="loader-svg" src={Images.Loader} alt="" />
        </div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
