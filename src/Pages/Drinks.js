import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Drinks() {
  const history = useHistory();
  return (
    <div>
      {history.location.pathname === '/drinks' ? <Header title="Drinks" iconSearch />
        : <p> Drinks </p>}
      {history.location.pathname === '/drinks' ? <Footer />
        : <p> Drinks </p>}
    </div>
  );
}
Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
