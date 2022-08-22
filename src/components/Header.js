import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header({ title, iconSearch }) {
  const history = useHistory();
  return (
    <div>
      <header>
        <h1 data-testid="page-title">{title}</h1>
        <button
          type="button"
          onClick={ () => { history.push('/profile'); } }
        >
          <img
            src={ ProfileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </button>
        { iconSearch && <img
          src={ SearchIcon }
          alt="search"
          data-testid="search-top-btn"
        /> }
      </header>
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
