import React from "react";
import { Images } from "helper/images";

const LoadingSpinner = ({
  positionClass = "left-[calc(50%_-_50px)] top-[calc(50%_-_50px)",
}) => {
  return (
    <div className="spinner-container-bg">
      <div className={`spinner-container ${positionClass}`}>
        <div className="loading-spinner">
          <img className="loader-svg" src={Images.Loader} alt="" />
        </div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
