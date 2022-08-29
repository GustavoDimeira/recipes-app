import React from 'react';
import PropTypes from 'prop-types';

export default function FoodsInProgress({ match }) {
  return (
    <div>
      {match.path}
    </div>
  );
}

FoodsInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
}.isRequired;
