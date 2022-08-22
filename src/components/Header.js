import React from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header({ title, iconSearch }) {
  return (
    <div>
      <header>
        <h1 data-testid="page-title">{title}</h1>
        <img
          src={ ProfileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
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
