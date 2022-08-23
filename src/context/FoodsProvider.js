import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFoods from './useFoods';

function FoodsProvider({ children }) {
  const [foods1, setfoods1] = useState({
    filter1: {
      valueIngrents: '',
      inputValue: '',
    } });
  const [filtroFoods, setfiltroFoods] = useState(false);
  const [resultsFood, setresultsFood] = useState('');
  const contextValue = {
    foods1,
    setfoods1,
    filtroFoods,
    setfiltroFoods,
    resultsFood,
    setresultsFood,
  };
  useEffect(() => {
    const fetchApi = async () => {
      const { filter1 } = foods1;
      if (filter1.valueIngrents === 'Ingredient') {
        const fet = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter1.inputValue}`).then((data) => data.json());
        setresultsFood(fet.meals);
      }
      if (filter1.valueIngrents === 'Name') {
        const fet = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${filter1.inputValue}`).then((data) => data.json());
        setresultsFood(fet.meals);
      }
      if (filter1.valueIngrents === 'First letter' && filter1.inputValue.length === 1) {
        const fet = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${filter1.inputValue}`).then((data) => data.json());
        setresultsFood(fet.meals);
      }
    };
    fetchApi();
  }, [filtroFoods]);
  return <useFoods.Provider value={ contextValue }>{children}</useFoods.Provider>;
}

FoodsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default FoodsProvider;
