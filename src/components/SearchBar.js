import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <label htmlFor="search-radio">
        ingredient
        <input
          name="search-radio"
          type="radio"
          id="1"
          data-testid="ingredient-search-radio"
          value=""
        />
        Name
        <input
          name="search-radio"
          type="radio"
          id="2"
          data-testid="name-search-radio"
        />
        First letter
        <input
          name="search-radio"
          type="radio"
          id="3"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>

    </div>
  );
}
