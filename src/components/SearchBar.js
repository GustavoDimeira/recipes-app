import React, { useContext } from 'react';
import useApp from '../context/useApp';
import useFoods from '../context/useFoods';

export default function SearchBar() {
  const {
    foods,
    setfoods,
    setfiltro,
    filtro,
  } = useContext(useApp);

  const {
    filtroFoods,
    setfiltroFoods,
    foods1,
    setfoods1,
  } = useContext(useFoods);

  const { filter } = foods;
  const { filter1 } = foods1;

  return (
    <div className="search-bar">
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => {
          setfoods({
            filter: { ...filter, inputValue: target.value },
          });
          setfoods1({
            filter1: { ...filter1, inputValue: target.value },
          });
        } }
      />
      <label
        htmlFor="search-radio"
        onChange={ ({ target }) => {
          setfoods({
            filter: { ...filter, valueIngrents: target.value },
          });
          setfoods1({
            filter1: { ...filter1, valueIngrents: target.value },
          });
        } }
      >

        <input
          name="search-radio"
          type="radio"
          id="1"
          data-testid="ingredient-search-radio"
          value="Ingredient"
        />
        ingredient

        <input
          name="search-radio"
          type="radio"
          id="2"
          data-testid="name-search-radio"
          value="Name"
        />
        {' '}
        Name

        <input
          name="search-radio"
          type="radio"
          id="3"
          data-testid="first-letter-search-radio"
          value="First letter"
        />
        {' '}
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          setfiltro(!filtro);
          setfiltroFoods(!filtroFoods);
        } }
      >
        Buscar
      </button>
    </div>
  );
}
