import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useApp from './useApp';

function DrinksProvider({ children }) {
  const [foods, setfoods] = useState({
    filter: {
      valueIngrents: '',
      inputValue: '',
    } });
  const [filtro, setfiltro] = useState(false);
  const [results, setresults] = useState('');
  const contextValue = {
    foods,
    setfoods,
    filtro,
    setfiltro,
    results,
  };
  useEffect(() => {
    const fetchApi = async () => {
      const { filter } = foods;
      if (filter.valueIngrents === 'Ingredient') {
        const fet = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter.inputValue}`).then((data) => data.json());
        setresults(fet.drinks);
      }
      if (filter.valueIngrents === 'Name') {
        const fet = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter.inputValue}`).then((data) => data.json());
        setresults(fet.drinks);
      }
      if (filter.valueIngrents === 'First letter') {
        if (filter.inputValue.length === 1) {
          const fet = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter.inputValue}`).then((data) => data.json());
          setresults(fet.drinks);
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
      }
    };
    fetchApi();
  }, [filtro]);
  return <useApp.Provider value={ contextValue }>{children}</useApp.Provider>;
}

DrinksProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DrinksProvider;
