import React from 'react';
import PropTypes from 'prop-types';
import useApp from './useApp';

function FoodsProvider({ children }) {
  const contextValue = {
  };

  return <useApp.Provider value={ contextValue }>{children}</useApp.Provider>;
}

FoodsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FoodsProvider;
