import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useApp from './useApp';
import fetchDrinksApi from '../service/fetchDrinksApi';

function DrinksProvider({ children }) {
  const history = useHistory();
  const [foods, setfoods] = useState({
    filter: {
      valueIngrents: '',
      inputValue: '',
    } });
  const [filtro, setfiltro] = useState(false);
  const [results, setresults] = useState('');
  const [category, setcategory] = useState([]);
  const contextValue = {
    foods,
    setfoods,
    filtro,
    setfiltro,
    results,
    category,
  };
  useEffect(() => {
    const fetchApi = async () => {
      const { valueIngrents, inputValue } = foods.filter;
      const request = await fetchDrinksApi(valueIngrents, inputValue);
      if (results?.length === 0) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setresults(request);
    };
    fetchApi();
  }, [filtro]);

  useEffect(() => {
    const fetchApi = async () => {
      const fet = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((data) => data.json());

      setresults(fet);
      const cat = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((data) => data.json());
      setcategory(cat);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    if (results?.drinks && results?.drinks.length === 1) {
      history.push(`/drinks/${results.drinks[0].idDrink}`);
    }
  }, [history, results, filtro]);

  return <useApp.Provider value={ contextValue }>{children}</useApp.Provider>;
}

DrinksProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DrinksProvider;

// if (valueIngrents === 'Ingredient') {
//   const fet = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`).then((data) => data.json());
//   setresults(fet);
// }
// if (valueIngrents === 'Name') {
//   const fet = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`).then((data) => data.json());
//   setresults(fet);
//   console.log(results);
// }
// if (valueIngrents === 'First letter') {
//   if (inputValue.length === 1) {
//     const fet = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`).then((data) => data.json());
//     setresults(fet);
//   } else {
//     global.alert('Your search must have only 1 (one) character');
//   }
//   if (results?.length === 0) {
//     global.alert('Sorry, we haven\'t found any recipes for these filters.');
//   }
// }
