import PropTypes from "prop-types";
import React from "react";

const BadgeUI = (props) => {
  const { variant, customClass = "" } = props;

  return (
    <>
      <div className={`capitalize p-2 badge badge-${variant} ${customClass}`}>
        {props.children}
      </div>
    </>
  );
};

BadgeUI.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.element,
  ]),
  variant: PropTypes.string,
  customClass: PropTypes.string,
};

export default BadgeUI;
