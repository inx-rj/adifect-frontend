import PropTypes from 'prop-types';
import React from 'react';

const BadgeUI = props => {
  const { variant, customClass = '' } = props;

  return (
    <>
      <span className={`capitalize min-w-[95px] whitespace-nowrap badge badge-${variant} ${customClass}`}>
        {props.children}
      </span>
    </>
  );
};

BadgeUI.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.element]),
  variant: PropTypes.string,
  customClass: PropTypes.string
};

export default BadgeUI;
