import React from 'react';
import PropTypes from 'prop-types';

export default function DrinksInProgress({ match }) {
  return (
    <div>
      {match.path}
    </div>
  );
}

DrinksInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
}.isRequired;
