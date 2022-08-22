import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default function Drinks({ location }) {
  return (
    <div>
      { location.pathname === '/drinks' ? <Header title="Drinks" iconSearch /> : <> </> }
    </div>
  );
}
Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
