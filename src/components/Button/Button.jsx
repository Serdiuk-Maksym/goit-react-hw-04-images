import React from 'react';
import PropTypes from 'prop-types';

import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
