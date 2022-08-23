import React, { useContext } from 'react';
import useApp from '../context/useApp';

export default function SearchBar() {
  const {
    foods,
    setfoods,
    setfiltro,
    filtro,
  } = useContext(useApp);
  const { filter } = foods;

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => {
          setfoods({
            filter: { ...filter, inputValue: target.value },
          });
        } }
      />
      <label
        htmlFor="search-radio"
        onChange={ ({ target }) => {
          setfoods({
            filter: { ...filter, valueIngrents: target.value },
          });
        } }
      >
        ingredient
        <input
          name="search-radio"
          type="radio"
          id="1"
          data-testid="ingredient-search-radio"
          value="Ingredient"
        />
        Name
        <input
          name="search-radio"
          type="radio"
          id="2"
          data-testid="name-search-radio"
          value="Name"
        />
        First letter
        <input
          name="search-radio"
          type="radio"
          id="3"
          data-testid="first-letter-search-radio"
          value="First letter"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          setfiltro(!filtro);
        } }
      >
        Buscar
      </button>
    </div>
  );
}
