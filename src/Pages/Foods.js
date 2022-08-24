import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Foods() {
  const history = useHistory();
  return (
    <div>
      {history.location.pathname === '/foods' ? <Header title="Foods" iconSearch />
        : <p> foods</p>}
    </div>
  );
}
Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
