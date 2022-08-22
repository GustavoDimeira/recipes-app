import React from 'react';
import PropTypes from 'prop-types';
import useApp from './useApp';

function DrinksPrivider({ children }) {
  const contextValue = {
  };

  return <useApp.Provider value={ contextValue }>{children}</useApp.Provider>;
}

DrinksPrivider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DrinksPrivider;
