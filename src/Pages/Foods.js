import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function Foods({ location }) {
  return (
    <div>
      { location.pathname === '/foods' ? <Header title="Foods" iconSearch /> : <> </> }
    </div>
  );
}
Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
