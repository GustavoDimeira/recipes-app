import React from 'react';
import PropTypes from 'prop-types';
import useApp from './useApp';

function Provider({ children }) {
  const contextValue = {
  };

  return <useApp.Provider value={ contextValue }>{children}</useApp.Provider>;
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
