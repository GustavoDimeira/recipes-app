import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeInProgress({ match }) {
  return (
    <div>
      {match.path}
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
}.isRequired;
