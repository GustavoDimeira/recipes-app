import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useFoods from './useFoods';
import fetchFoodApi from '../service/fetchFoodApi';

function FoodsProvider({ children }) {
  const history = useHistory();
  const [foods1, setfoods1] = useState({
    filter1: {
      valueIngrents: '',
      inputValue: '',
    },
  });
  const [filtroFoods, setfiltroFoods] = useState(false);
  const [categoryFood, setcategoryFood] = useState([]);
  const [resultsFood, setresultsFood] = useState('');
  const contextValue = {
    foods1,
    setfoods1,
    filtroFoods,
    setfiltroFoods,
    resultsFood,
    setresultsFood,
    categoryFood,
  };
  useEffect(() => {
    // const loc = history.location.pathname.toString();
    // if (loc.includes('/foods')) {
    const fetchApi = async () => {
      // const { filter1 } = foods1;
      const { valueIngrents, inputValue } = foods1.filter1;
      const request = await fetchFoodApi(valueIngrents, inputValue);
      if (resultsFood?.length === 0) {
       window.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setresultsFood(request);
    };

    fetchApi();
    // }
  }, [filtroFoods]);

  useEffect(() => {
    if (resultsFood?.meals
      && resultsFood?.meals.length
      === 1) history.push(`/foods/${resultsFood.meals[0].idMeal}`);
  }, [history, resultsFood]);
  useEffect(() => {
    const fetchApi = async () => {
      const fet = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((data) => data.json());
      setresultsFood(fet);
      const cat = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((data) => data.json());
      setcategoryFood(cat);
    };
    fetchApi();
  }, []);

  return <useFoods.Provider value={ contextValue }>{children}</useFoods.Provider>;
}

FoodsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FoodsProvider;

// if (valueIngrents === 'Ingredient') {
//   const fet = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`).then((data) => data.json());
//   setresultsFood(fet);
// }
// if (valueIngrents === 'Name') {
//   const fet = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`).then((data) => data.json());
//   setresultsFood(fet);
// }
// if (valueIngrents === 'First letter' && inputValue.length === 1) {
//   const fet = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`).then((data) => data.json());
//   setresultsFood(fet);
// }
