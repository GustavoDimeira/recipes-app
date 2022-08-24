import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useApp from './useApp';

function DrinksProvider({ children }) {
  const history = useHistory();
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
    const fetchApi = () => {
      const { filter } = foods;
      if (filter.valueIngrents === 'Ingredient') {
        const fet = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter.inputValue}`).then((data) => data.json());
        setresults(fet.drinks);
      }
      if (filter.valueIngrents === 'Name') {
        const fet = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter.inputValue}`).then((data) => data.json());
        setresults(fet.drinks);
      }
      if (filter.valueIngrents === 'First letter') {
        if (filter.inputValue.length === 1) {
          const fet = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter.inputValue}`).then((data) => data.json());
          setresults(fet.drinks);
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
      }
    };
    fetchApi();
  }, [filtro]);

  useEffect(() => {
    if (results?.length === 1) {
      history.push(`/drinks/${results[0].idDrink}`);
    }
    if (results?.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [history, results]);

  return <useApp.Provider value={ contextValue }>{children}</useApp.Provider>;
}

DrinksProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DrinksProvider;
