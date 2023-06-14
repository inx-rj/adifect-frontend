import React, { useState } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { Link } from "react-router-dom";

export default function Footer(props) {
  return (
    <>
      <div className="footersec">
        <Link to="/home">
          <img src="/img/logonew.svg" className="mx-auto" />
        </Link>
      </div>
    </>
  );
}
